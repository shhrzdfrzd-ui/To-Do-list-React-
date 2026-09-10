import './App.css'
import { useState, useEffect } from 'react'
import TaskItem from './components/TaskItem'
import TaskForm from './components/TaskForm'
import SearchBar from './components/SearchBar'

function App() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks")
  return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function deleteTask(taskToDelete) {
    setTasks(tasks.filter((task) => task !== taskToDelete))
  }

  function toggleTask(taskToToggle) {
    setTasks(
      tasks.map((task) =>
        task === taskToToggle
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function addTask(text) {
  const newTask = { 
    text: text, 
    completed: false, 
    updatedAt: new Date().toLocaleString() 
  }
  setTasks([...tasks, newTask])
  }

  function editTask(taskToEdit, newText) {
  setTasks(
    tasks.map((task) =>
      task === taskToEdit 
        ? { ...task, text: newText, updatedAt: new Date().toLocaleString() } 
        : task
    )
  )
  }

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
  <div className="app-container">
    <h1>My To-Do List</h1>
    <SearchBar searchText={searchText} onSearchChange={setSearchText} />
    <TaskForm onAddTask={addTask} />
    <ul>
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={editTask}
        />
      ))}
    </ul>
  </div>
  )
}

export default App