import './TaskItem.css';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.done ? 'done' : ''}>
      <input
        type='checkbox'
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>❌</button>
    </li>
  );
}

export default TaskItem;