import React from 'react';
import './App.scss';
import NewTaskBar from './NewTaskBar';
import TaskDisplay from './TaskDisplay';

function App() {

  const [tasksNumber, setTasksNumber] = React.useState(0);

  const handleTaskAdd = () => {
    setTasksNumber(tasksNumber + 1);
    window.alert('Task added, number of tasks: ' + tasksNumber);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>What do you want <br /> ToDo today?</h1>
      </header>
      <main>
        <NewTaskBar onSubmit={handleTaskAdd}/>
        <TaskDisplay tasksNumber={tasksNumber} />
      </main>
    </div>
  );
}

export default App;
