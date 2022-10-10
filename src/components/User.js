import React from 'react'
import './components.scss'

export default function User(props) {

  const handleInput = (e) => {
    let value = e.target.value
    let dataType = e.target.getAttribute('data-type')
    props.onInput(value, dataType)
  }

  return (
    <div className='user'>
      <label htmlFor='player1'>First player: </label>
      <input 
        id="player1"
        type='text' 
        data-type='X' 
        value={props.userX} 
        onInput={handleInput}
      />
      <label htmlFor='player2'>Second player: </label>
      <input 
        id="player2"
        type='text' 
        data-type='Y' 
        value={props.userY} 
        onInput={handleInput} 
      />
      <button className='btn' onClick={props.onSubmit}>Submit</button>
    </div>
  )
}
