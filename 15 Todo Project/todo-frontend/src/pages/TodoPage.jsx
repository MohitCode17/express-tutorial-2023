import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import "../styles/todo.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const server = "http://localhost:8000/api/v1";

const TodoPage = () => {
  const { user, setIsAuthenticated } = useContext(Context);
  const [popupActive, setPopupActive] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [refresh, setRefresh] = useState(false);

  // ================= Add Todo ======================
  const addTodo = async () => {
    try {
      const { data } = await axios.post(
        `${server}/task/addTask`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setPopupActive(false);
      setText("");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //  Update Todo
  const updateTask = async (id) => {
    try {
      const { data } = await axios.get(`${server}/task/updateTask/${id}`, {
        withCredentials: true,
      });
      setTasks((todos) =>
        todos.map((todo) => {
          if (todo._id === data._id) {
            todo.isCompleted = data.isCompleted;
          }
          return todo;
        })
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/deleteTask/${id}`, {
        withCredentials: true,
      });
      setTasks((tasks) => tasks.filter((task) => task._id !== data.task._id));
      toast.success(data.message);
    } catch (error) {
        toast.success(error.response.data.message);
    }
  };

  // ================= Get Todos ======================
  const getTodos = async () => {
    try {
      const { data } = await axios.get(`${server}/task/getTasks`, {
        withCredentials: true,
      });
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [refresh]);

  console.log(tasks);
  return (
    <div className="todo-wrapper">
      <h1>Welcome, {user?.name}</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              className={"todo" + (task.isCompleted ? " is-complete" : "")}
              key={task._id}
              onClick={() => updateTask(task._id)}
            >
              <div className="checkbox"></div>
              <div className="text">{task.text}</div>
              <div className="delete-todo" onClick={() => deleteTask(task._id)}>
                x
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              placeholder="Add a task"
              onChange={(e) => setText(e.target.value)}
              required
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TodoPage;
