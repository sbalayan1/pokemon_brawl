import { createContext, useState } from "react";
const GlobalStateContext = createContext()

function GlobalStateProvider({ children }) {
    const [globalState, setGlobalState] = useState('hello world')
    const value = [globalState, setGlobalState]

    return (
        <GlobalStateContext.Provider value={value}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export { GlobalStateContext, GlobalStateProvider }