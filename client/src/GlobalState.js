import { useContext, createContext } from "react";
const GlobalStateContext = createContext()

function GlobalStateProvider({ children }) {
    return (
        <GlobalStateContext>
            {children}
        </GlobalStateContext>
    )
}

export { GlobalStateContext, GlobalStateProvider }