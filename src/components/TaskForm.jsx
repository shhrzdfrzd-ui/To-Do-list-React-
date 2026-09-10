import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')

  function handleAdd() {
    const trimmedText = text.trim()
    if (!trimmedText) return

    onAddTask(trimmedText)
    setText('')
  }

  return (
    <form
      className="task-form"
      onSubmit={(e) => {
        e.preventDefault()
        handleAdd()
      }}
    >
      <label className="sr-only" htmlFor="new-task">New task</label>
      <input
        id="new-task"
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TaskForm
