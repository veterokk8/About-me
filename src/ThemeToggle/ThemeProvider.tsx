import { useState, useEffect, type ReactNode } from "react";
import { ThemeContext } from './ThemeContext'
import type { Theme } from './ThemeContext'

export function ThemeProvider({children}: {children: ReactNode}) {
    const[theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        document.body.className = theme
    }, [theme])

    function toggleTheme() {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            toggleTheme
        }}>{children}</ThemeContext.Provider>
    )
}