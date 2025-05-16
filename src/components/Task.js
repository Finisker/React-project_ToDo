import { useState } from 'react';
import './Task.scss';

function Task (props) {
  
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <>
      <div className="Task">
        <button className={`Task-text ${isChecked? ' isChecked ':''}`} onClick={() => setIsChecked(!isChecked)}>{props.task}</button>
        <button className="Task-delete-button" onClick={() => props.deleteTask(props.index)}>X</button>
      </div>
    </>
  )
}

export default Task;
