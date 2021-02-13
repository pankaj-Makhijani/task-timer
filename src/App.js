import React, { useState, useEffect } from 'react'
import './globalStyles.css';
import StartView from './StartView';
import Stopwatch from './Stopwatch';

function App() {
  const [ view, setView ] = useState("startView");
  const [ taskInput, setTaskInput] = useState();



  const handleStartTask = (taskInput) => {
    setView("startClicked");

    if(!taskInput) {
      setTaskInput(taskInput)
    } else {
      // Lowercase taskInput
      const lowerCaseTask = taskInput.toLowerCase();

      //Capitlize first letter of taskInput
      const firstLetter = taskInput.charAt(0).toUpperCase();
      // Combine to capitalize taskInput
      const capitalizedTaskInput = firstLetter + lowerCaseTask.slice(1)

      setTaskInput(capitalizedTaskInput);
    }
    
  }

  const handleBackClick = () => {
    setView("startView");
    setTaskInput()
  }

  const handleChange = e => {
    setTaskInput(e.target.value)
  }

  const display = () => {
    switch(view) {
      case "startClicked":
        return (
          <Stopwatch taskInput={taskInput} handleBackClick={handleBackClick}
          />
        )
        break;

      default:
      return (
        <StartView
        handleStartTask={handleStartTask}/>

      )
      break;
        }
  }

  return (
        <div>
        {display()}
      </div>
  )
}
export default App;
