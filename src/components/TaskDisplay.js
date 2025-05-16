import React from 'react';
import Task from './Task';
import './TaskDisplay.scss';

function TaskDisplay(props) {
  return (
    <div className="TaskDisplay">
      {[...Array(props.tasksNumber)].map((_, index) => (
        <Task key={index} />
      ))}
    </div>
  );
}

export default TaskDisplay;
