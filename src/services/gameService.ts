import { supabase } from '@/lib/supabase';
import { Movie } from '@/data/movies';

export interface Room {
    id: string;
    pin: string;
    host_user_id: string;
    player2_user_id: string | null;
    movie_ids: number[];
    status: string;
}

export const gameService = {
    // Generate a random 4-digit PIN
    generatePin: () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    },

    // Create a new room
    createRoom: async (hostUserId: string, movies: Movie[]) => {
        // Retry finding a unique PIN a few times
        let pin = gameService.generatePin();
        let retries = 3;

        while (retries > 0) {
            // Check if PIN exists
            const { data: existing } = await supabase
                .from('rooms')
                .select('id')
                .eq('pin', pin)
                .single();

            if (!existing) break;

            pin = gameService.generatePin();
            retries--;
        }

        const { data, error } = await supabase
            .from('rooms')
            .insert({
                pin,
                host_user_id: hostUserId,
                movie_ids: movies.map(m => m.id),
                status: 'waiting'
            })
            .select()
            .single();

        if (error) throw error;
        return data as Room;
    },

    // Join an existing room
    joinRoom: async (pin: string, userId: string) => {
        // First check if room exists and is waiting
        const { data: room, error: fetchError } = await supabase
            .from('rooms')
            .select('*')
            .eq('pin', pin)
            .eq('status', 'waiting')
            .single();

        if (fetchError || !room) throw new Error('Room not found or game already started');

        // Update the room with player 2
        const { data, error } = await supabase
            .from('rooms')
            .update({
                player2_user_id: userId,
                status: 'active'
            })
            .eq('id', room.id)
            .select()
            .single();

        if (error) throw error;
        return data as Room;
    },

    // Subscribe to room updates
    subscribeToRoom: (roomId: string, onUpdate: (room: Room) => void) => {
        return supabase
            .channel(`room:${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'rooms',
                    filter: `id=eq.${roomId}`
                },
                (payload) => {
                    onUpdate(payload.new as Room);
                }
            )
            .subscribe();
    }
};
