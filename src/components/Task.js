import { useState } from 'react';
import './Task.scss';

function Task () {
  
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="Task">
      <button className={`Task-text ${checked? ' checked ':''}`} onClick={() => setChecked(!checked)}>Learn React</button>
      <button className="Task-delete-button">X</button>
    </div>
  )
}

export default Task;
