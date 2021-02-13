import React, { useState, useEffect } from "react";
import "./globalStyles.css";
import "./stopwatch.css";
import {Route,Switch} from "react-router-dom"
import TaskHistoryList from "./TaskHistoryList";

function Stopwatch(props) {
  const [theInterval, setTheInterval] = useState();
  const [times, setTimes] = useState({
    msec:0,
    sec: 0,
    min: 0,
    hr: 0,
  });
  const [status, setStatus] = useState("started");
  const [taskHistoryList, setTaskHistoryList] = useState([]);

  useEffect(() => {
    if (!localStorage.taskList) {
      return;
    } else {
      const taskList = JSON.parse(localStorage.getItem("taskList"));
      setTaskHistoryList(taskList);
    }
  }, []);


  let updatedmSec = times.msec;
  let updatedSec = times.sec;
  let updatedMin = times.min;
  let updatedHr = times.hr;

  const start = () => {
    run();
    setTheInterval(setInterval(run, 10));
    setStatus("started");
  };

  useEffect(() => {
    start();
  }, []);

  const run = () => {
    if (updatedMin === 60) {
      updatedHr++;
      updatedMin = 0;
    }

    if (updatedSec === 60) {
      updatedMin++;
      updatedSec = 0;
    }

    if(updatedmSec === 99) {
      updatedSec++;
      updatedmSec=0;
    }
    updatedmSec++;
    return setTimes({ msec:updatedmSec, sec: updatedSec, min: updatedMin, hr: updatedHr });
  };

  
  const pause = () => {
    clearInterval(theInterval);
    setStatus("paused");
  };

  const resume = () => {
    run();
    setTheInterval(setInterval(run, 10));
    setStatus("started");
  };

  const reset = () => {
    clearInterval(theInterval);
    let newTask = {
      date: new Date().toDateString(),
      msec: updatedmSec,
      sec: updatedSec,
      min: updatedMin,
      hr: updatedHr,
      id: Date.now(),
    };
    setTaskHistoryList([newTask, ...taskHistoryList]);
    localStorage.setItem(
      "taskList",
      JSON.stringify([newTask, ...taskHistoryList])
    );
    clearInterval(theInterval);
    setTimes({
      msec:0,
      sec: 0,
      min: 0,
      hr: 0,
    });
    setStatus("reset");
  };


  const displayBtns = () => {
    switch (status) {
      case "paused":
        return (
          <>
            <button className={`btn`} onClick={resume}>
              Resume
            </button>
            <button className={`btn`} onClick={reset}>
              Reset
            </button>
          </>
        );
        break;

      case "reset":
        return (
          <>
            <button className={`btn `} onClick={start}>
              Start
            </button>
            <button className={`btn `} onClick="/history">History</button>

          </>
        );
        break;

      default:
        return (
          <>
            <button className={`btn `} onClick={pause}>
              <span class="material-icons">pause</span> Pause
            </button>
            <button className={`btn `} onClick={reset}>
              Reset
            </button>
          </>
        );
    }
  };

  return (
    <div className="outer-container">
      <div className="stopwatch-container">
        <div className={`timer`}>
          <h1>
            {times.hr < 10 ? <span>0{times.hr}</span> : <span>{times.hr}</span>}
            :
            {times.min < 10 ? (
              <span>0{times.min}</span>
            ) : (
              <span>{times.min}</span>
            )}
            :
            <span className="seconds">
              {times.sec < 10 ? (
                <span>0{times.sec}</span>
              ) : (
                <span>{times.sec}</span>
              )}
            </span>
             : 
            <span className="seconds">
              {times.msec < 10 ? (
                <span>0{times.msec}</span>
              ) : (
                <span>{times.msec}</span>
              )}
            </span>
          </h1>
        </div>
      </div>
      <div className="btn-group">{displayBtns()}</div>

      
      <section>
        <h2><center>History</center></h2>
        {taskHistoryList.length < 1 ? (
          <p>You have no Previous History</p>
        ) : (
          <TaskHistoryList
            taskHistoryList={taskHistoryList}
          />
        )}
      </section>
    </div>
  );
}

export default Stopwatch;
