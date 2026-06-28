import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API = "https://task-tracker-wue6.onrender.com/api/tasks";
function App() {
  const [tasks, setTasks] = useState([]);

  // ---------------- Fetch Tasks ----------------
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------- Add Task ----------------
  const addTask = async (title) => {
    try {
      const res = await axios.post(API, {
        title,
      });

      setTasks([res.data, ...tasks]);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Delete ----------------
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Toggle Complete ----------------
  const toggleTask = async (task) => {
    try {
      const res = await axios.put(`${API}/${task._id}`, {
        title: task.title,
        completed: !task.completed,
      });

      setTasks(
        tasks.map((t) =>
          t._id === task._id ? res.data : t
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Edit ----------------
  const updateTask = async (id, title) => {
    try {
      const current = tasks.find((t) => t._id === id);

      const res = await axios.put(`${API}/${id}`, {
        title,
        completed: current.completed,
      });

      setTasks(
        tasks.map((task) =>
          task._id === id ? res.data : task
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Statistics ----------------
  const pendingTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks]
  );

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  return (
    <div className="container">

      <h1>📋 My Task Manager</h1>

      <p className="subtitle">
       Stay productive. Complete your goals.
      </p>

      <div className="stats">

        <div className="card">
          <h3>{tasks.length}</h3>
          <p>Total</p>
        </div>

        <div className="card">
          <h3>{pendingTasks.length}</h3>
          <p>Pending</p>
        </div>

        <div className="card">
          <h3>{completedTasks.length}</h3>
          <p>Completed</p>
        </div>

      </div>

      <TaskForm addTask={addTask} />

      <TaskList
        title="📋 Pending Tasks"
        tasks={pendingTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        updateTask={updateTask}
        emptyMessage="No pending tasks 🎉"
      />

      <TaskList
        title="✅ Completed Tasks"
        tasks={completedTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        updateTask={updateTask}
        emptyMessage="No completed tasks yet."
      />

    </div>
  );
}

export default App;