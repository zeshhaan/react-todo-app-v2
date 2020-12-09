import ReactDOM from "react-dom";
import React, { useState } from "react";
import "./styles.css";

function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setTodos([...todos, todo]);
    setTodo("");
  }

  function handleChange(e) {
    setTodo(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={todo} type="text" onChange={handleChange} />
        <button type="submit">ADD</button>
      </form>
      <ul>
        {todos.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);
