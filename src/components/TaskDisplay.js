import React, { useEffect, useState } from 'react';
import Task from './Task';
import './TaskDisplay.scss';

function TaskDisplay() {

  const [tasks, setTasks] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  function handleTaskDelete (id){
    fetch('http://localhost:3001/tasks/' + id, {
      method: 'DELETE'
    });
  }

  return (
    <div className="TaskDisplay">
        {tasks && tasks.map((task, index) => (
          <Task 
            key={index} 
            task={task}
            handleTaskDelete={handleTaskDelete}
          />
        ))}
    </div>
  );
}

export default TaskDisplay;
