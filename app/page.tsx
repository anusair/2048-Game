"use client"

import { useState } from "react";
import Board from "./Components/Board";
import ScoreBoard from "./Components/ScoreBoard";
import GameOver from "./context/GameOver";
import Winning from "./context/Winning";



export default function Home() {

  const [gameOver , setGameOver] = useState(true);
  const [score , setScore] = useState<number>(0);
  const [points , setPoints] = useState([]);
  const [win , setWin] = useState(null);

  const gameOverValue = {gameOver , setGameOver};
  const winningValue = {win , setWin};

  function addScore (point: []) {
    const id = Date.now();
    setPoints(prevPoints => [...prevPoints , {id , point}]);

    setTimeout(() => {
      setPoints((prev) => prev.filter(point => point.id !== id));
    })
  }

  return (
    <Winning.Provider value={winningValue}>
      <GameOver.Provider value={gameOverValue}>
        <ScoreBoard score={score} points={points} />
        <Board setScore={setScore} addScore={addScore}/>
     </GameOver.Provider>
    </Winning.Provider>
  );
}
