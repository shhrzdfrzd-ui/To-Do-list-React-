import { useEffect, useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import SearchBar from './components/SearchBar'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks')
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch {
      return []
    }
  })
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask(text) {
    const newTask = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      updatedAt: new Date().toLocaleString(),
    }
    setTasks((currentTasks) => [...currentTasks, newTask])
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function editTask(taskId, newText) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, text: newText, updatedAt: new Date().toLocaleString() }
          : task,
      ),
    )
  }

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <main className="app-container">
      <header className="app-header">
        <p className="eyebrow">TASK MANAGER</p>
        <h1>My To-Do List</h1>
        <p className="subtitle">Keep your tasks simple and organized.</p>
      </header>

      <SearchBar searchText={searchText} onSearchChange={setSearchText} />
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
      />
    </main>
  )
}

export default App
