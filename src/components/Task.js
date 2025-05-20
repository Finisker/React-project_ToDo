import { useState } from 'react';
import './Task.scss';

function Task (props) {
  
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="Task">
        <label className="Task-label">
          <button 
            className={`Task-text ${isChecked? ' isChecked ':''}`} 
            onClick={() => setIsChecked(!isChecked)}
          >{props.task.body}</button>
        </label>
        <button 
          className="Task-delete-button" 
          onClick={() => props.handleTaskDelete(props.task.id)}
        >X</button>
      </div>
    </>
  )
}

export default Task;
