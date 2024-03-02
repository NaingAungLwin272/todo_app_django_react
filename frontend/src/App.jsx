import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  // const [errors, setErrors] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/todos").then((res) => setTodos(res.data));
  });

  // add todo function
  const addTodo = (data) => {
    setTodos([
      ...todos,
      (data = {
        ...data,
        id: parseInt(todos[todos.length - 1].id) + 1,
        status: "Active",
      }),
    ]);
    axios
      .post("http://127.0.0.1:8000/todos", data)
      .then((res) => setTodos([...todos, res.data]));
  };

  // delete function
  const delTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
    axios.delete("http://127.0.0.1:8000/todos/" + id);
  };

  // update function
  const updateTodo = (e, id, text, todo) => {
    e.preventDefault();
    const updateTodo = { ...todo, task: text };
    console.log(id, "id.....");
    axios.patch("http://127.0.0.1:8000/todos/" + id, updateTodo);
  };

  const completeTodo = (e, id, todo) => {
    if (e.target.checked) {
      console.log("okay");
      setTodos(
        todos.map((todo) =>
          todo.id == id ? { ...todo, completed: true } : todo
        )
      );
      const updateTodo = { ...todo, completed: true };
      console.log(id, "id.....");
      axios.patch("http://127.0.0.1:8000/todos/" + id, updateTodo);
    } else {
      console.log("omo");
      setTodos(
        todos.map((todo) =>
          todo.id == id ? { ...todo, completed: false } : todo
        )
      );
      const updateTodo = { ...todo, completed: false };
      console.log(id, "id.....");
      axios.patch("http://127.0.0.1:8000/todos/" + id, updateTodo);
    }
  };

  const filterTodo = (cat_value) => {
    // setTodos(todos.filter(todo => todo.status == cat_value))
    setTodos(todos.filter((todo) => todo.status == cat_value));
  };

  return (
    <div className="todo-container">
      <Search addTodo={addTodo} />
      <Filter filter_todo={filterTodo} />
      <TodoList
        todos={todos}
        delTodo={delTodo}
        update_todo={updateTodo}
        complete_todo={completeTodo}
      />
    </div>
  );
}

export default App;
