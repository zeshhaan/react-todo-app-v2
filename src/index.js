import "./styles.css";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoApp() {
  const [todo, setTodo] = useState("");
  //initialise the todos List as array
  const [todosList, setTodosList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setTodosList([...todosList, { id: uuidv4(), text: todo }]);
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
        {todosList.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);
