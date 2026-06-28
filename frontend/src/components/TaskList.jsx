import TaskItem from "./TaskItem";

function TaskList({
  title,
  tasks,
  deleteTask,
  toggleTask,
  updateTask,
  emptyMessage,
}) {
  return (
    <div className="task-section">

      <h2>{title}</h2>

      {tasks.length === 0 ? (
        <div className="empty-card">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            updateTask={updateTask}
          />
        ))
      )}

    </div>
  );
}

export default TaskList;