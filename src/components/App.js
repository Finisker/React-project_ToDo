import {useState} from 'react';
import './App.scss';
import NewTaskBar from './NewTaskBar';
import TaskDisplay from './TaskDisplay';

function App() {

  const [tasks, setTasks] = useState(0);

  // function handleTaskAdd(){

  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>What do you want <br /> ToDo today?</h1>
      </header>
      <main>
        <NewTaskBar/>
        <TaskDisplay tasksNumber={tasks} />
      </main>
    </div>
  );
}

export default App;
