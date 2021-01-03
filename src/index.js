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
    setTodosList([...todosList, { id: uuidv4(), text: todo }]);
    setTodo("");
  }

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function removeItem(item) {
    // todosList = [{id: 1, name: 'a'}, {id: 2, name: 'b'}]
    // this method -> .filter() -> returns an array
    // (todo) => todo !== item)

    // goal => delete name = 'a'
    // todosList.filter(
    //todo => todo.name !== 'a' -> true

    // );
    // // an array = [
    //   {id: 2, name: 'b'}

    // ]

    // for loop -> iterate each array (
    //   todo = {id: 1, name: 'a'}
    // )
    // setTodosList(todosList.filter((i) => i !== item));

    // setTodosList(todosList.filter(
    //   function(i) {
    //     var i;
    //     for (i = 0; i < cars.length; i++) {
    //       text += cars[i] + "<br>";
    //     }
    //   }
    // )

    setTodosList(todosList.filter((i) => i !== item));
  }

  const [edit, setEdit] = useState(null);
  console.log(edit);

  function handleUpdate(e) {
    e.preventDefault();
    const updatedTodos = todosList.map((todo) => {
      console.log(todo);
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
          } else {
            return (
              <div key={item.id}>
                <li>{item.text}</li>
                <div className="button-wrapper">
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

                  <button onClick={() => setEdit(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);
