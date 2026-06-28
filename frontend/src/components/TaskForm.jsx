import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Task title cannot be empty.");
      return;
    }

    addTask(title);

    setTitle("");
    setError("");
  };

  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter a new task..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
        />

        <button type="submit">
          + Add Task
        </button>

      </form>

      {error && <p className="error">{error}</p>}
    </>
  );
}

export default TaskForm;