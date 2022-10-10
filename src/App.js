import './App.css';
import Game from './components/Game';
import User from './components/User';
import {useState} from 'react'

function App() {

  const [ userX, setUserX ] = useState('')
  const [ userY, setUserY ] = useState('')
  const [isUser, setIsUser] = useState(false)

  const handleUserInput = (value, dataType) => {
    if(dataType === 'X') {
      setUserX(value)
    } else {
      setUserY(value)
    }
  }

  const handleSubmit = () => {
    if(userX && userY) {
      setIsUser(true)
    }
  }

  const componentToDisplay = () => {
    if(isUser) {
      return <Game 
        userX={userX} 
        userY={userY}
      />
    } else {
      return <User 
        userX={userX} 
        userY={userY} 
        onInput={handleUserInput} 
        onSubmit={handleSubmit}
      />
    }
  }

  return (
    <div className="App">
      {componentToDisplay()}
    </div>
  );
}

export default App;
