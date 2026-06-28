import { useState } from "react";

function TaskItem({ task, deleteTask, toggleTask, updateTask }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const saveTask = () => {
    if (title.trim() === "") return;

    updateTask(task._id, title);
    setEditing(false);
  };

  return (
    <div className="task-item">
      <div className="task-content">

        <div className="task-header">

          <div className="task-title">

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />

            {editing ? (
              <input
                className="edit-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h3>{task.title}</h3>
            )}

          </div>

          <span
            className={
              task.completed
                ? "badge completed-status"
                : "badge pending-status"
            }
          >
            {task.completed ? "Completed" : "Pending"}
          </span>

        </div>

        <div className="task-actions">

          {editing ? (
            <>
              <button
                className="save-btn"
                onClick={saveTask}
              >
                💾 Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setEditing(false);
                  setTitle(task.title);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="edit-btn"
                onClick={() => setEditing(true)}
              >
                ✏ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                🗑 Delete
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default TaskItem;