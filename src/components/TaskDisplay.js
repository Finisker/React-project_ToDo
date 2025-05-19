import React, { useEffect, useState } from 'react';
import Task from './Task';
import './TaskDisplay.scss';

function TaskDisplay(props) {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then((res) => res.json())
      .then((data) => data.map((task) => task.body))
      .then((tasks) => setTasks(tasks))
  }, []);

  return (
    <div className="TaskDisplay">
      {tasks.map((task, index) => (
        <Task key={index} task={task} deleteTask={props.deleteTask} index={index}/>
      ))}
    </div>
  );
}

export default TaskDisplay;
