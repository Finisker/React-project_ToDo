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

  function deleteTask(index){
    console.log("Deleting task at index:", index);
    const newTasks = tasks.filter((tasks, i) => i !== index);
    setTasks(newTasks);
    console.log("Tasks Array after deletion:", newTasks);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>What do you want <br /> ToDo today?</h1>
      </header>
      <main>
        <NewTaskBar handleSubmit={handleTaskSubmit}/>
        <TaskDisplay tasks={tasks} deleteTask={deleteTask} />
      </main>
    </div>
  );
}

export default App;
