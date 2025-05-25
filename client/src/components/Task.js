import "./Task.scss";

function Task(props) {
  return (
    <>
      <div className="Task">
        <label className="Task-label">
          <button
            className={`Task-text ${props.task.isChecked ? " isChecked " : ""}`}
            onClick={() => props.handleCheck(props.task.id)}
          >
            {props.task.body}
          </button>
        </label>
        <button
          className="Task-delete-button"
          onClick={() => props.handleTaskDelete(props.task.id)}
        >
          X
        </button>
      </div>
    </>
  );
}

export default Task;
