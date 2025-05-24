import Task from './Task';
import './TaskDisplay.scss';

function TaskDisplay(props) {

  return (
    <div className="TaskDisplay">
        {props.tasks && props.tasks.map((task, index) => (
          <Task 
            key={index}
            task={task}
            handleTaskDelete={props.handleTaskDelete}
          />
        ))}
    </div>
  );
}

export default TaskDisplay;
