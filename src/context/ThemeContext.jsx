import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(false);

    const toggleTheme = () => setDark(d => !d);

    useEffect(() => {
        document.body.className = dark ? 'bg-dark text-light' : 'bg-light text-dark';
    }, [dark]);

    return (
        <ThemeContext.Provider value={{ dark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
