import { useState } from "react";
import "./NewTaskBar.scss";

const dataPath = "/api/data";

export default function NewTaskBar(props) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!value) {
      return;
    }

    const uuid = localStorage.getItem("clientId");

    fetch(dataPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid, value }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        props.propegateNewTask(newTask);
        console.log("New task added: ", newTask);
      });

    setValue("");
  }

  return (
    <div className="NewTaskBar">
      <form className="NewTaskBar-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="NewTaskBar-input"
          placeholder="What do you want to do?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="NewTaskBar-button">
          Add
        </button>
      </form>
    </div>
  );
}
