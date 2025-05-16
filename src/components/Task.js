import { useState } from 'react';
import './Task.scss';

function Task () {
  
  const [isChecked, setIsChecked] = useState(false);
  const [isVisable, setIsVisable] = useState(true);
  
  return (
    <>
    {isVisable  && <div className="Task">
      <button className={`Task-text ${isChecked? ' isChecked ':''}`} onClick={() => setIsChecked(!isChecked)}>Learn React</button>
      <button className="Task-delete-button" onClick={() => setIsVisable(!isVisable)}>X</button>
    </div>}
    </>
  )
}

export default Task;
