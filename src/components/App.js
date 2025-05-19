import {useState} from 'react';
import './App.scss';
import NewTaskBar from './NewTaskBar';
import TaskDisplay from './TaskDisplay';

function App() {

  const [tasks,setTasks] = useState([]);

  function handleTaskSubmit(value){
    setTasks([...tasks,value]);
    console.log("Tasks Array:", [...tasks,value]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>What do you want <br /> ToDo today?</h1>
      </header>
      <main>
        <NewTaskBar handleSubmit={handleTaskSubmit}/>
        <TaskDisplay />
      </main>
    </div>
  );
}

export default App;
