'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'balanced' | 'immersive' | 'gamified';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('balanced');

    useEffect(() => {
        // Load saved theme from local storage if available
        const savedTheme = localStorage.getItem('movie-matchmaker-theme') as Theme;
        if (savedTheme && ['balanced', 'immersive', 'gamified'].includes(savedTheme)) {
            setTheme(savedTheme);
        }
    }, []);

    const handleSetTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('movie-matchmaker-theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
