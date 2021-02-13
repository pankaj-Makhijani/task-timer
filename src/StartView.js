import React, { useState, useEffect } from 'react';
import './globalStyles.css';

function StartView(props) {
  const startClicked = () => {
    props.handleStartTask(props.taskInput)
  }

  return (
          <>
            <div className="start-view">
            
              <button onClick={startClicked} className={`btn start-btn `}>Start</button>
            </div>
          </>

  )
}

export default StartView;
