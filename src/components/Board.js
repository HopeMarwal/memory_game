import React from 'react'
import Cell from './Cell'
import './components.scss'

export default function Board(props) {

  return (
    <div className="board"> 
      <div className="board-row">
        {
          props.cells.slice(0, 4).map((item) => {
           return <Cell onClick={() => props.onClick(item.id)} key={item.id} cellItem={item}/>
          })
        }
      </div>

      <div className="board-row">
        {
          props.cells.slice(4, 8).map((item) => {
            return <Cell onClick={() => props.onClick(item.id)} key={item.id} cellItem={item}/>
          })
        }
      </div>

      <div className="board-row">
        {
          props.cells.slice(8, 12).map((item) => {
           return <Cell onClick={() => props.onClick(item.id)} key={item.id} cellItem={item}/>
          })
        }
      </div>

      <div className="board-row">
        {
          props.cells.slice(12, 16).map((item) => {
            return <Cell onClick={() => props.onClick(item.id)} key={item.id} cellItem={item}/>
          })
        }
      </div>

    </div>
  )
}
