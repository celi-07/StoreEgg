import { useState } from "react"

export const DarkMode = () => {
    const [isDark, setIsDark] = useState(false)
    return {isDark, setIsDark}
}