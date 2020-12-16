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
    <div>
      <form onSubmit={handleSubmit}>
        <input value={todo} type="search" onChange={handleChange} />
        <button type="submit">ADD</button>
      </form>
      <ul>
        {todosList.map((item) => {
          if (edit?.id === item.id) {
            return (
              <form key={item.id} onSubmit={handleUpdate}>
                <input defaultValue={edit.text} />
                <button>SAV</button>
              </form>
            );
          } else {
            return (
              <div key={item.id}>
                <li>{item.text}</li>
                <button onClick={() => removeItem(item)}>DEL</button>
                <button onClick={() => setEdit(item)}>EDIT</button>
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
