import React from 'react';
import './Task.scss';

class Task extends React.Component {
  render() {
    return (
      <div className="Task">
        <button className="Task-text">Learn React</button>
        <button className="Task-delete-button">X</button>
      </div>
    )
    }
}

export default Task;
