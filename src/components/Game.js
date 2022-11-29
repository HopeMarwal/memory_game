import React, { useState, useEffect } from 'react'
import Board from './Board'
import Aside from './Aside'
import './components.scss'

export default function Game(props) {
  // Cell values
  const [cells, setCells] = useState([
    {
      value: 'a',
      img: 'cat2.webp',
      active: false,
      id: 1,
    },
    {
      value: 'b',
      img: 'cat1.png',
      active: false,
      id: 2,
    },
    {
      value: 'c',
      img: 'cat3.png',
      active: false,
      id: 3
    },
    {
      value: 'd',
      img: 'cat4.png',
      active: false,
      id: 4
    },
    {
      value: 'e',
      img: 'cat5.png',
      active: false,
      id: 5
    },
    {
      value: 'f',
      img: 'cat6.png',
      active: false,
      id: 6
    },
    {
      value: 'g',
      img: 'cat7.png',
      active: false,
      id: 7
    },
    {
      value: 'h',
      img: 'cat8.png',
      active: false,
      id: 8
    },
    {
      value: 'a',
      img: 'cat2.webp',
      active: false,
      id: 9,
    },
    {
      value: 'b',
      img: 'cat1.png',
      active: false,
      id: 10,
    },
    {
      value: 'c',
      img: 'cat3.png',
      active: false,
      id: 11
    },
    {
      value: 'd',
      img: 'cat4.png',
      active: false,
      id: 12
    },
    {
      value: 'e',
      img: 'cat5.png',
      active: false,
      id: 13
    },
    {
      value: 'f',
      img: 'cat6.png',
      active: false,
      id: 14
    },
    {
      value: 'g',
      img: 'cat7.png',
      active: false,
      id: 15
    },
    {
      value: 'h',
      img: 'cat8.png',
      active: false,
      id: 16
    },

  ])
  const [currentPlayer, setCurrentPlayer] = useState(props.userX)

  const [clickedCells, setClickedCells] = useState([])

  const [playerInFo, setPlayerInfo] = useState([
    {
      player: props.userX,
      successSteps: 0
    },
    {
      player: props.userY,
      successSteps: 0
    },
  ])
  
  const images = [
    {
      value: 'a',
      img: 'cat1.png'
    },
    {
      value: 'b',
      img: 'cat2.webp'
    },
    {
      value: 'c',
      img: 'cat3.png'
    },
    {
      value: 'd',
      img: 'cat4.png'
    },
    {
      value: 'e',
      img: 'cat5.png'
    },
    {
      value: 'f',
      img: 'cat6.png'
    },
    {
      value: 'g',
      img: 'cat7.png'
    },
    {
      value: 'h',
      img: 'cat8.png'
    }
  ]

  useEffect(() => {
    let newArr = mixArray(images)
    for(let i = 0; i < cells.length; i++) {
      cells[i].img = newArr[i].img
      cells[i].value = newArr[i].value
    }
  }, [])

  const handleClick = (index) => {
    if(calculateWinner()) {
      return
    }

    let newCellsData = [...cells]
    let newClickedCells = [...clickedCells]
    let newPlayerInfo = [...playerInFo]


    //activate clicked cell
    for(let i = 0; i < newCellsData.length; i++) {
      if(newCellsData[i].id === index && newCellsData[i].active) {
        return
      } else if(newCellsData[i].id === index && !newCellsData[i].active){
        newCellsData[i].active = true
      }
    }
    
    setCells(newCellsData)

    //check steps
    newClickedCells.push(index)

    let valueFirst;
    let valueSecond;
    
    if(newClickedCells.length === 2) {
      console.log(`check ${newClickedCells}`)
      //calculate value of clicked cells
      for(let i = 0; i < newCellsData.length; i++) {
        if(newCellsData[i].id === newClickedCells[0]) {
          valueFirst = newCellsData[i].value
        }
        if(newCellsData[i].id === newClickedCells[1]) {
          valueSecond = newCellsData[i].value
        }
      }

      /*compare values 
        if two values are equal => add +1 to success player steps
      */
      if(valueFirst === valueSecond) {
        for(let i = 0; i < newPlayerInfo.length; i++) {
          if(newPlayerInfo[i].player === currentPlayer) {
            newPlayerInfo[i].successSteps ++
          }
        }
        setPlayerInfo(newPlayerInfo)
        setClickedCells([])
        
        // else change current player and desactive opened by this user cells
      } else {
        if(currentPlayer === props.userX) {
          setCurrentPlayer(props.userY)
        } else {
          setCurrentPlayer(props.userX)
        }

        setTimeout(() => {
          for(let i = 0; i < newCellsData.length; i++) {
            if(newCellsData[i].id === newClickedCells[0] || newCellsData[i].id === newClickedCells[1]) {
              newCellsData[i].active = false
            }
          }
          setClickedCells([])
        }, 1000);
        
        setCells(newCellsData)
      }
    } else { //setting first opened cell by current user
      setClickedCells(newClickedCells)
    }
  }

  const handleReset = () => {
    setCurrentPlayer(props.userX)
    setClickedCells([])

    const newCells = [...cells]
    const newPlayerInfo = [...playerInFo]

    const newImgArr = mixArray(images)

    for(let i = 0; i < newCells.length; i++) {
      newCells[i].active = false
      newCells[i].img = newImgArr[i].img
      newCells[i].value = newImgArr[i].value
      
    }

    setCells(newCells)

    for(let i = 0; i < newPlayerInfo.length; i++) {
      newPlayerInfo[i].successSteps = 0
    }

    setPlayerInfo(newPlayerInfo)
  }

  const status = () => {
    let winner = calculateWinner()
    if(winner) {
      if(winner === 'dead heat') {
        return `${winner}`
      }
      return `${winner} win`
    } else {
      return `${currentPlayer} turn`
    }
  }

  // Calculate winner 
  const calculateWinner = () => {

    if(playerInFo[0].successSteps + playerInFo[1].successSteps !== 8) {
      for (let i = 0; i < playerInFo.length; i++) {
        if(playerInFo[i].successSteps === 5) {
          return playerInFo[i].player
        }
      }
      return null
    } 

    if(playerInFo[0].successSteps === playerInFo[1].successSteps && playerInFo[0].successSteps === 4 ) {
      return 'dead heat'
    } else if(playerInFo[0].successSteps > playerInFo[1].successSteps) {
      return playerInFo[0].player
    } else {
      return playerInFo[1].player
    }
  }

  return (
    <div className="game">
      <p className="status">{status()}</p>
      <Board cells={cells} onClick={(i) => handleClick(i)}/>
      <Aside playerData={playerInFo}/>
      <button className="btn" onClick={handleReset}>Reset</button>
    </div>
  )
}

function mixArray(arr) {
  let newArr = [...arr, ...arr]
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr
}