
export interface Movie {
    id: string;
    title: string;
    poster: string;
    genre: string[];
    year: number;
    rating: number;
    description: string;
}

export const mockMovies: Movie[] = [
    {
        id: '1',
        title: 'Interstellar',
        poster: 'https://image.tmdb.org/t/p/w500/gEU2QniL6C8z1dY5iuRFWnSS1e4.jpg',
        genre: ['Sci-Fi', 'Adventure', 'Drama'],
        year: 2014,
        rating: 8.7,
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    },
    {
        id: '2',
        title: 'The Dark Knight',
        poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        genre: ['Action', 'Crime', 'Drama'],
        year: 2008,
        rating: 9.0,
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    },
    {
        id: '3',
        title: 'Inception',
        poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        year: 2010,
        rating: 8.8,
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    },
    {
        id: '4',
        title: 'Pulp Fiction',
        poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
        genre: ['Crime', 'Drama'],
        year: 1994,
        rating: 8.9,
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    },
    {
        id: '5',
        title: 'Fight Club',
        poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
        genre: ['Drama'],
        year: 1999,
        rating: 8.8,
        description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    },
    {
        id: '6',
        title: 'Forrest Gump',
        poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
        genre: ['Drama', 'Romance'],
        year: 1994,
        rating: 8.8,
        description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    },
    {
        id: '7',
        title: 'The Matrix',
        poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        genre: ['Action', 'Sci-Fi'],
        year: 1999,
        rating: 8.7,
        description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    },
    {
        id: '8',
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
        genre: ['Action', 'Adventure', 'Drama'],
        year: 2001,
        rating: 8.8,
        description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    },
    {
        id: '9',
        title: 'Star Wars: Episode IV - A New Hope',
        poster: 'https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
        genre: ['Action', 'Adventure', 'Fantasy'],
        year: 1977,
        rating: 8.6,
        description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
    },
    {
        id: '10',
        title: 'Goodfellas',
        poster: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
        genre: ['Biography', 'Crime', 'Drama'],
        year: 1990,
        rating: 8.7,
        description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.',
    }
];
