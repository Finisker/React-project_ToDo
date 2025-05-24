import { useState } from 'react';
import './Task.scss';

const dataPath = '/api/data'

function Task (props) {

  const [isChecked, setIsChecked] = useState(props.task.isChecked);

  function handleCheck(id) {
    
    const newTask = {
      "isChecked": !isChecked
    }

    fetch(dataPath + '/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
    })  
    .then(res => {
      if (!res.ok) throw new Error('Update failed');
      return res.json();
    })
    .then(data => {
      console.log('Updated:', data);
      setIsChecked(!isChecked);
    })
    .catch(console.error);
  }

  return (
    <>
      <div className="Task">
        <label className="Task-label">
          <button 
            className={`Task-text ${isChecked? ' isChecked ':''}`}
            onClick={() => handleCheck(props.task.id)}
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
