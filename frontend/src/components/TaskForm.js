import { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='New task...'
      />
      <button type='submit'>Add</button>
    </form>
  );
}

export default TaskForm;