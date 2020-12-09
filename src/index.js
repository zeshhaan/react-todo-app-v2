import ReactDOM from "react-dom";
import React, { useState } from "react";
import "./styles.css";

function TodoApp() {
  const [todo, setTodo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);
