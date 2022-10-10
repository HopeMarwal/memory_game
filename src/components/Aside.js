import React from 'react'

export default function Aside(props) {
  return (
    <div className="aside">
      <p>{props.playerData[0].player}'s points: {props.playerData[0].successSteps}</p>
      <p>{props.playerData[1].player}'s points: {props.playerData[1].successSteps}</p>
    </div>
  )
}
