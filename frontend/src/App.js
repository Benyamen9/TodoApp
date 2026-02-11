import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_URL = 'http://localhost:3001';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (title) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const toggleTask = async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
      method: 'PATCH'
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(t => t.id === id ? updatedTask : t));
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className='App'>
      <h1>My Todo List</h1>
      <TaskForm onAdd={addTask} />
      <p>Amount of tasks: {tasks.length}</p>
      <TaskList 
        tasks={tasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask} 
      />
    </div>
  );
}

export default App;