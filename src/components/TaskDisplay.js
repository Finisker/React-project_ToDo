import React from 'react';
import Task from './Task';
import './TaskDisplay.scss';

class TaskDisplay extends React.Component {
  render() {
    return (
      <div className="TaskDisplay">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    );
  }
}

export default TaskDisplay;
