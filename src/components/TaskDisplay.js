import React from 'react';
import Task from './Task';
import './TaskDisplay.scss';

function TaskDisplay(props) {
  return (
    <div className="TaskDisplay">
      {props.tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  );
}

export default TaskDisplay;
