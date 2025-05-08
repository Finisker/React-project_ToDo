import './Task.scss';

function Task() {
  return (
    <div className="Task">
      <div className="Task-content">
        <lable className="Task-checkbox-label">
          <input type="checkbox" className="Task-checkbox"/>
          <span className="Task-checkbox-span"></span>
        </lable>
        <p className="Task-text">Learn React</p>
      </div>
      <button className="Task-delete-button">X</button>
    </div>
  );
}

export default Task;
