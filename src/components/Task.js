import { useEffect, useState } from 'react';
import './Task.scss';

function Task (props) {
  
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState('');

  // useEffect(() => {
  //   fetch('http://localhost:3001/tasks/${props.index}')
  //     .then((res) => res.json())
  //     .then((data) => setValue(data.body))
  // }, []);
  
  return (
    <>
      <div className="Task">
        <label className="Task-label">
          <button className={`Task-text ${isChecked? ' isChecked ':''}`} onClick={() => setIsChecked(!isChecked)}>{props.task}</button>
        </label>
        <button className="Task-delete-button" onClick={() => props.deleteTask(props.index)}>X</button>
      </div>
    </>
  )
}

export default Task;
