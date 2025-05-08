import './NewTaskBar.scss';

function NewTaskBar() {
  return (
    <div className="NewTaskBar">
      <form className="NewTaskBar-form">
        <input type="text" className="NewTaskBar-input" placeholder="What do you want to do?" />
        <button type="submit" className="NewTaskBar-button">Add</button>
      </form>
    </div>
  );
}

export default NewTaskBar;
