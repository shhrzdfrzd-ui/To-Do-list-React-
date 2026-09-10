import { useState } from 'react'

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  function cancelEdit() {
    setEditText(task.text)
    setIsEditing(false)
  }

  function handleEditSubmit() {
    const trimmedText = editText.trim()
    if (!trimmedText) return

    onEdit(task.id, trimmedText)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li className="task-item editing">
        <input
          className="edit-input"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditSubmit()
            if (e.key === 'Escape') cancelEdit()
          }}
          aria-label="Edit task"
          autoFocus
        />
        <div className="task-actions">
          <button type="button" onClick={handleEditSubmit}>Save</button>
          <button type="button" onClick={cancelEdit}>Cancel</button>
        </div>
      </li>
    )
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button
        type="button"
        className="task-content"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? `Mark ${task.text} as incomplete` : `Mark ${task.text} as complete`}
      >
        <span className="task-text">{task.text}</span>
        <small>{task.updatedAt}</small>
      </button>

      <div className="task-actions">
        <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        <button type="button" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  )
}

export default TaskItem
