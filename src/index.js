import "./styles.css";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoApp() {
  const [todo, setTodo] = useState("");
  //initialise the todos List as array
  const [todosList, setTodosList] = useState(
    () => JSON.parse(window.localStorage.getItem("todosList")) || []
  );

  useEffect(() => {
    window.localStorage.setItem("todosList", JSON.stringify(todosList));
  }, [todosList]);

  function handleSubmit(e) {
    e.preventDefault();
    setTodosList([...todosList, { id: uuidv4(), text: todo, complete: false }]);
    setTodo("");
  }

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function toggleComplete(item) {
    const updatedTodos = todosList.map((todo) => {
      if (todo.id === item.id) {
        return { ...todo, complete: !todo.complete };
      } else {
        return todo;
      }
    });
    setTodosList(updatedTodos);
  }

  function removeItem(item) {
    setTodosList(todosList.filter((i) => i !== item));
  }

  const [edit, setEdit] = useState(null);
  //console.log(edit);

  function handleUpdate(e) {
    e.preventDefault();
    const updatedTodos = todosList.map((todo) => {
      //console.log(todo);
      if (todo.id === edit.id) {
        return { ...todo, text: e.target[0].value };
      } else {
        return todo;
      }
    });

    setTodosList(updatedTodos);
    setEdit(null);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          value={todo}
          onChange={handleChange}
          placeholder="New todo..."
        />
        <button type="submit"></button>
      </form>
      <ul>
        {todosList.map((item) => {
          if (edit?.id === item.id) {
            return (
              <form key={item.id} onSubmit={handleUpdate}>
                <input
                  autoFocus
                  defaultValue={edit.text}
                  onFocus={(e) => e.currentTarget.select()}
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            );
          } else if (item.complete === true) {
            return (
              <li key={item.id} className="strikethrough">
                <label>
                  <input
                    type="checkbox"
                    checked={item.complete}
                    onChange={() => toggleComplete(item)}
                  />
                  <span>{item.text}</span>
                </label>
                <div className="button-wrapper">
                  <button onClick={() => setEdit(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button onClick={() => removeItem(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            );
          } else {
            return (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.complete}
                    onChange={() => toggleComplete(item)}
                  />
                  <span>{item.text}</span>
                </label>
                <div className="button-wrapper">
                  <button onClick={() => setEdit(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button onClick={() => removeItem(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);
