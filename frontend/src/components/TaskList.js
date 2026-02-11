import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;