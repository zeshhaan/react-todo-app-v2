import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function TodoApp() {
  return (
    <div>
      <form>
        <input />
        <button>ADD</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);
