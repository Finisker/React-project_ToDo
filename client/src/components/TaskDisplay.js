import Task from "./Task";
import "./TaskDisplay.scss";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const dataPath = "/api/data";

function TaskDisplay(props) {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    let clientID = localStorage.getItem("clientId");

    if (!clientID) {
      clientID = uuidv4();
      localStorage.setItem("clientId", clientID);
    }

    fetch(dataPath + "?uuid=" + clientID)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
        console.log("All tasks: ", data.tasks);
      });
  }, []);

  useEffect(() => {
    if (tasks && props.newTask) {
      console.log("Task after add: ", [...tasks, props.newTask]);
      setTasks((prevTasks) => [...prevTasks, props.newTask]);
    }
  }, [props.newTask]);

  function handleTaskDelete(id) {
    const uuid = localStorage.getItem("clientId");

    fetch(dataPath + "/" + uuid + "/" + id, {
      method: "DELETE",
    });

    const newTasks = tasks.filter((item) => item.id !== id);
    setTasks(newTasks);
    console.log("Task after delete:", newTasks);
  }

  function handleCheck(id) {
    const index = tasks.findIndex((task) => task.id === id);
    const odlIsChecked = tasks[index].isChecked;

    const newTask = {
      isChecked: !odlIsChecked,
    };

    const uuid = localStorage.getItem("clientId");

    fetch(dataPath + "/" + uuid + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((data) => {
        tasks[index] = data;
        const newTasks = JSON.parse(JSON.stringify(tasks));
        setTasks(newTasks);
        console.log("Tasks after check: ", newTasks);
      })
      .catch(console.error);
  }

  return (
    <div className="TaskDisplay">
      {tasks &&
        tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            handleTaskDelete={handleTaskDelete}
            handleCheck={handleCheck}
          />
        ))}
    </div>
  );
}

export default TaskDisplay;
