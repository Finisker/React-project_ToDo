import { useState, useEffect } from 'react';
import './App.scss';
import NewTaskBar from './NewTaskBar';
import TaskDisplay from './TaskDisplay';

function App() {

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

    const newTasks = tasks.filter(item => item.id !== id);
    setTasks(newTasks);
  }

  function handleSubmit(value) {

    const newTask = {
      "body": value
    };

    fetch('http://localhost:3001/tasks',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
    .then(res => res.json())
    .then(data => ({
      "body": value,
      "id": data.id
    }))
    .then(newTask => setTasks([...tasks, newTask]))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>What do you want <br /> ToDo today?</h1>
      </header>
      <main>
        <NewTaskBar handleSubmit={handleSubmit}/>
        <TaskDisplay tasks={tasks} handleTaskDelete={handleTaskDelete}/>
      </main>
    </div>
  );
}

export default App;
