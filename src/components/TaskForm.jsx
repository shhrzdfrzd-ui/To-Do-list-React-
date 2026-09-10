import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState("")

  function handleAdd() {
    if (text.trim() === "") {
      return
    }
    onAddTask(text)
    setText("")
  }

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Enter a task.."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd()
          }
        }}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default TaskForm