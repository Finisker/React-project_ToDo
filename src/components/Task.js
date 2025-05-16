import { useState } from 'react';
import './Task.scss';

function Task (props) {
  
  const [isChecked, setIsChecked] = useState(false);
  const [isVisable, setIsVisable] = useState(true);
  
  return (
    <>
    {isVisable  && <div className="Task">
      <button className={`Task-text ${isChecked? ' isChecked ':''}`} onClick={() => setIsChecked(!isChecked)}>{props.task}</button>
      <button className="Task-delete-button" onClick={() => setIsVisable(!isVisable)}>X</button>
    </div>}
    </>
  )
}

export default Task;
