import { createContext } from "react";


const winningContext = createContext({
    win: false ,
    setWin: () => {},
})

export default winningContext;