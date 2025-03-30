"use client";
import {  useCallback, useContext, useEffect, useState } from "react";
import gameOverContext from "../context/GameOver";
import winningContext from "../context/Winning";


function Board({ setScore, addScore }: {
  setScore: number,
  addScore: number
}) {
  const [cells, setCells] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const tileColors = {
    2: "bg-[#EEE4DA] text-[#776E65]",
    4: "bg-[#EDE0C8] text-[#776E65]",
    8: "bg-[#F2B179] text-[#F9F6F2]",
    16: "bg-[#F59563] text-[#F9F6F2]",
    32: "bg-[#F67C5F] text-[#F9F6F2]",
    64: "bg-[#F65E3B] text-[#F9F6F2]",
    128: "bg-[#EDCF72] text-[#F9F6F2]",
    256: "bg-[#EDCC61] text-[#F9F6F2]",
    512: "bg-[#EDC850] text-[#F9F6F2]",
    1024: "bg-[#EDC53F] text-[#F9F6F2]",
    2048: "bg-[#EDC22E] text-[#F9F6F2]",
    4096: "bg-[#3C3A32] text-[#F9F6F2]",
  };

  const { gameOver, setGameOver } = useContext(gameOverContext);
  const {win , setWin} = useContext(winningContext);

  
  const  moveRight = useCallback(() => {
    let zerosToAdd;
    let finalArray = [];
    const finalCellsArray: number[] = [];

    for (let i = 0; i < 4; i++) {
      const tempArray: number | number[] = [];
      for (let j = 4 * i; j < cells.length; j++) {
        if (j < 4 * (i + 1)) tempArray.push(cells[j]);
      }

      let filteredArray = tempArray.filter((item) => item != 0);

      for (let k = 0; k < filteredArray.length - 1; k++) {
        if (filteredArray[k] === filteredArray[k + 1]) {
          const mergedValue = (filteredArray[k + 1] *= 2);
          filteredArray[k] = 0;

          filteredArray[k + 1] = mergedValue;

          const newValue = isNaN(filteredArray[k + 1])
            ? 0
            : Number(filteredArray[k + 1]);
          setScore((prevScore: number) => {
            if (isNaN(prevScore)) {
              return newValue;
            } else {
              addScore(mergedValue);
              return prevScore + newValue;
            }
          });
        }
      }

      filteredArray = filteredArray.filter((item) => item != 0);
      zerosToAdd = tempArray.length - filteredArray.length;
      finalArray = Array(zerosToAdd).fill(0).concat(filteredArray);

      finalCellsArray.push(...finalArray);
    }
    setCells(() => finalCellsArray);
  } , [addScore, cells, setScore])
  
  const moveLeft = useCallback(() => {
    let zerosToAdd;
    let finalArray: number[] = [];
    const finalCellsArray: number[] = [];

    for (let i = 0; i < 4; i++) {
      const tempArray: number | number[] = [];
      for (let j = 4 * i; j < cells.length; j++) {
        if (j < 4 * (i + 1)) tempArray.push(cells[j]);
      }

      let filteredArray = tempArray.filter((item) => item != 0);

      for (let k = 0; k < filteredArray.length - 1; k++) {
        if (filteredArray[k] === filteredArray[k + 1]) {
          const mergedValue = (filteredArray[k] += filteredArray[k + 1]);
          filteredArray[k + 1] = 0;

          filteredArray[k] = mergedValue;

          const newValue = isNaN(filteredArray[k])
            ? 0
            : Number(filteredArray[k]);
          // setScore(prevScore => isNaN(prevScore) ? newValue : prevScore + newValue);
          setScore((prevScore: number) => {
            if (isNaN(prevScore)) {
              return newValue;
            } else {
              addScore(mergedValue);
              return prevScore + newValue;
            }
          });
        }
      }
      filteredArray = filteredArray.filter((item) => item != 0);
      zerosToAdd = tempArray.length - filteredArray.length;
      finalArray = filteredArray.concat(Array(zerosToAdd).fill(0));

      finalCellsArray.push(...finalArray);
    }
    setCells(() => finalCellsArray);
  } , [addScore, cells, setScore])

  
  const moveUp = useCallback(() => {
    let filledArray: number[] = [];
    const finalCellsArray: number[] = [];
    for (let i = 0; i < 4; i++) {
      const tempArray = [];
      for (let j = i; j < cells.length; j += 4) {
        tempArray.push(cells[j]);
      }

      let filteredArray = tempArray.filter((item) => item !== 0);

      for (let k = 0; k < filteredArray.length - 1; k++) {
        if (filteredArray[k] === filteredArray[k + 1]) {
          const mergedValue = (filteredArray[k] *= 2);
          filteredArray[k + 1] = 0;

          filteredArray[k] = mergedValue;
          const newValue = isNaN(filteredArray[k])
            ? 0
            : Number(filteredArray[k]);
            setScore((prevScore: number) => {
            if (isNaN(prevScore)) {
              return newValue;
            } else {
              addScore(mergedValue);
              return prevScore + newValue;
            }
          });
        }
      }

      filteredArray = filteredArray.filter((item) => item !== 0);
      const zeros = tempArray.length - filteredArray.length;
      filledArray = filteredArray.concat(Array(zeros).fill(0));

      for (let k = 0; k < filledArray.length; k++) {
        finalCellsArray[i + k * 4] = filledArray[k];
      }
    }
    setCells(() => finalCellsArray);
  } , [addScore, cells, setScore])
  

  const moveDown = useCallback(() => {
    let filledArray: number[] = [];
    const finalCellsArray: number[] = [];
    for (let i = 0; i < 4; i++) {
      const tempArray = [];
      for (let j = i; j < cells.length; j += 4) {
        tempArray.push(cells[j]);
      }

      let filteredArray = tempArray.filter((item) => item !== 0);

      for (let k = 0; k < filteredArray.length - 1; k++) {
        if (filteredArray[k] === filteredArray[k + 1]) {
          const mergedValue = (filteredArray[k] *= 2);
          filteredArray[k + 1] = 0;

          filteredArray[k] = mergedValue;

          const newValue = isNaN(filteredArray[k])
            ? 0
            : Number(filteredArray[k]);

          setScore((prevScore: number) => {
            if (isNaN(prevScore)) {
              return newValue;
            } else {
              addScore(mergedValue);
              return prevScore + newValue;
            }
          });
        }
      }

      filteredArray = filteredArray.filter((item) => item !== 0);
      const zeros = tempArray.length - filteredArray.length;
      filledArray = Array(zeros).fill(0).concat(filteredArray);

      for (let k = 0; k < filledArray.length; k++) {
        finalCellsArray[i + k * 4] = filledArray[k];
      }
    }
    setCells(() => finalCellsArray);
  } , [addScore, cells, setScore])


  const generateTiles: () => void = () => {
    setCells((prevCells) => {
      const newCells = [...prevCells];

      const emptyIndexes = newCells
        .map((cell, i) => (cell == 0 ? i : null))
        .filter((i) => i != null);

      if (emptyIndexes.length == 0) return prevCells;

      const randomIndex =
        emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

      newCells[randomIndex] = Math.random() > 0.5 ? 2 : 4;

      return newCells;
    });
  };


  useEffect(() => {
  
    generateTiles();
    generateTiles();
  }, []);

  useEffect(() => {

    function handleGameOver() {
      let flag = false;
      for (let i = 0; i < cells.length; i++) {
        if (cells[i] == 0) {
          flag = true;
        }
      }
  
      return flag;
    }

    const handleWinning = () => {
      for (let i = 0 ; i  < cells.length ; i++) {
        if (cells[i] == 2048) {
          setWin(true);
        }
      }
    }
    
    if (!gameOver) return;

    function handleKeyPressed(e: { key: string }) {
      if (e.key.startsWith("Arrow")) {
        switch (e.key) {
          case "ArrowUp":
            moveUp();
            break;
          case "ArrowDown":
            moveDown();
            break;
          case "ArrowLeft":
            moveLeft();
            break;
          case "ArrowRight":
            moveRight();
            break;
          default:
            break;
        }
        setTimeout(() => {
          generateTiles();
        }, 100);
      }
    }

    handleWinning();

    if (!handleGameOver()) {
      setTimeout(() => {
        setGameOver(false);
      }, 200);
    }

    document.addEventListener("keydown", handleKeyPressed);

    return () => {
      document.removeEventListener("keydown", handleKeyPressed);
    };
  }, [cells, gameOver, moveDown, moveLeft, moveRight, moveUp, setGameOver, setWin]);

  return (
    <div
      className={`relative w-full ${
        gameOver ? "h-1/2" : "h-72"
      } flex items-center justify-center duration-700`}
    >
      <div
        className={`bg-[#BBADA0] p-2 rounded-md absolute  top-[50%] -translate-y-[50%] 
      left-[50%] -translate-x-[50%]
      grid grid-cols-4 grid-rows-4 gap-1 ${
        gameOver || win ? "scale-100" : "scale-75"
      } duration-700`}
      >
        {/* initial the empty cells */}
        {cells.map((rowCells, i) => (
          <div
            key={i}
            className={`w-20 h-20 bg-[#CDC1B4]
          flex items-center justify-center text-2xl font-bold
          ${tileColors[rowCells] || ""} ${
              rowCells == 0 ? "text-[#BBADA0]" : ""
            }`}
          >
            {rowCells}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Board;
