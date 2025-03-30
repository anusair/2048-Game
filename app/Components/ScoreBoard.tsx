"use client"

import { useContext, useEffect, useState } from "react"
import { motion } from "motion/react"
import gameOverContext from "../context/GameOver";
import winningContext from "../context/Winning";


function Header({score}: {
    score: number ,
}) {


    const [bestScore , setBestScore] = useState(0);
    const {gameOver} = useContext(gameOverContext);
    const { win } = useContext(winningContext);

    useEffect(() => {
        const storageBestScore = JSON.parse(localStorage.getItem("best-score") || "0");
        setBestScore(storageBestScore);

        if (score > JSON.parse(localStorage.getItem("best-score") || "0")) {
            localStorage.setItem("best-score" , JSON.stringify(score))
        }

    } , [score])
    

  return (
    <div className={`${gameOver ? "" : "flex flex-col justify-center items-center"}`}>
        <h1 className="text-6xl text-[#8F7A66] font-bold float-left mr-5 mb-5
        animate-fade-up">
            {gameOver ? win ? "You Won!" : "2048" : "Game Over"}
        </h1>
        <div className="flex flex-col gap-8 float-right">
            {(gameOver || win) && <div className="flex gap-5"> 
                <div className="bg-[#BBADA0] px-4 py-2 rounded-md flex flex-col items-center relative">
                    <h1 className="bg-[#BBADA0] text-[#EEE4DA] text-md font-bold uppercase">Score</h1>
                        <motion.div
                        key={score} 
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.2}}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="bg-[#BBADA0] text-white  rounded-lg font-bold text-xl"
                        >
                            {score}
                        </motion.div>
                </div>
                <div className="bg-[#BBADA0] px-4 py-2 rounded-md flex flex-col items-center">
                    <h1 className="bg-[#BBADA0] text-[#EEE4DA] text-md font-bold uppercase">Best</h1>
                    <p className="text-white font-bold text-xl">{bestScore}</p>
                </div>
            </div>
            }
            <button className="bg-[#8F7A66] text-[#F9F6F2] w-32 px-3 py-1 rounded-sm 
            font-bold ml-auto cursor-pointer" style={{marginBottom: gameOver ? "10px" : "0"}} onClick={() => window.location.reload()}>New Game</button>
            {!gameOver && <h2 className="font-bold">Your score is {score}</h2>}
        </div>
    </div>
  )
}
export default Header