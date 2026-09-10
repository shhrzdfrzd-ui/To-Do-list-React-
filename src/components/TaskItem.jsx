import { useState } from 'react'

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  function handleEditSubmit() {
    if (editText.trim() === "") {
      return
    }
    onEdit(task, editText)
    setIsEditing(false)
  }

  if (isEditing) {
  return (
    <li>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEditSubmit()
          }
          if (e.key === "Escape") {
            setEditText(task.text)
            setIsEditing(false)
          }
        }}
        autoFocus
      />
      <button onClick={handleEditSubmit}>Save</button>
      <button onClick={() => {
        setEditText(task.text)
        setIsEditing(false)
      }}>Cancel</button>
    </li>
  )
}

  return (
  <li
    className={task.completed ? "completed" : ""}
    onClick={() => onToggle(task)}
  >
    <span>
      {task.text}
      {task.updatedAt && (
        <small style={{ display: "block", opacity: 0.5, fontSize: "11px" }}>
          {task.updatedAt}
        </small>
      )}
    </span>
    <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Edit</button>
    <button onClick={(e) => { e.stopPropagation(); onDelete(task); }}>Delete</button>
  </li>
    )
}

export default TaskItem