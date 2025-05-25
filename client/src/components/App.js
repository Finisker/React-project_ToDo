import { useState } from "react";
import "./App.scss";
import NewTaskBar from "./NewTaskBar";
import TaskDisplay from "./TaskDisplay";

function App() {
  const [newTask, setNewTask] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          What do you want <br /> ToDo today?
        </h1>
      </header>
      <main>
        <NewTaskBar propegateNewTask={setNewTask} />
        <TaskDisplay newTask={newTask} />
      </main>
    </div>
  );
}

export default App;
