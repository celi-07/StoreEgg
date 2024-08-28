import { useState } from "react"

export const getBalance = (initial: number) => {
    const [balance, setBalance] = useState(initial)
    return {balance, setBalance}
}