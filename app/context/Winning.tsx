import { createContext } from "react";


const winningContext = createContext({
    winning: false ,
    setWinning: () => {},
})

export default winningContext;