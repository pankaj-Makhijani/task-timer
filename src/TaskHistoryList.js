import React, { useState, useEffect } from 'react';
import './stopwatch.css';
import './themeStyles.css';
import {ThemeContextConsumer} from './ThemeContext';


function TaskHistoryList(props) {
  return ( 
      <ul className={`task-history-list`}>
      {props.taskHistoryList.map(task => (
          <li key={task.id} className={`task`}>
            <span>{task.date}</span>
            <span className="bold">{task.task}</span>
            <span>{`${task.hr}h ${task.min}m ${task.sec}s ${task.msec}ms`}</span>
          </li>
          )
        )
      }
      </ul>
  )
}

export default TaskHistoryList;
