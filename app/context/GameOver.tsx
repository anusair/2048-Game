import { createContext } from "react";

const gameOverContext = createContext({
    gameOver: false ,
    setGameOver: () => {},
});


export default gameOverContext ;