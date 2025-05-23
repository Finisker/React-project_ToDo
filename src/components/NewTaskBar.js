import { useState } from 'react';
import './NewTaskBar.scss';

export default function NewTaskBar(props) {

  const [value, setValue] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();

    if(!value){
      return;
    }

    props.handleSubmit(value);
    setValue('');
  }

  return (
    <div className="NewTaskBar">
      <form
      className="NewTaskBar-form"
      onSubmit={(e) => handleSubmit(e)}
      >
        <input 
          type="text"
          className="NewTaskBar-input"
          placeholder="What do you want to do?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button 
        type="submit"
        className="NewTaskBar-button"
        >Add</button>
      </form>
    </div>
  );
}