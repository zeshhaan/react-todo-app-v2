import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function TodoApp() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    console.log(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);
