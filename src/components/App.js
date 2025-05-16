import {useState} from 'react';
import './App.scss';
import NewTaskBar from './NewTaskBar';
import TaskDisplay from './TaskDisplay';

function App() {

  const [tasksNumber, setTasksNumber] = useState(0);

  function handleTaskSubmit(){
    setTasksNumber(tasksNumber + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>What do you want <br /> ToDo today?</h1>
      </header>
      <main>
        <NewTaskBar handleSubmit={handleTaskSubmit}/>
        <TaskDisplay tasksNumber={tasksNumber} />
      </main>
    </div>
  );
}

export default App;
