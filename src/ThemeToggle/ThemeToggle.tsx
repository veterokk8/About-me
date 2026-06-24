import { useTheme } from "./useTheme"

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button onClick={toggleTheme}>
            {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
        </button>
    )
}