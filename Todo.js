import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        todos: [
          ...state.todos,
          {
            id: state.todos[state.todos.length - 1].id + 1,
            text: state.text,
            done: false,
          },
        ],
        text: "",
      };

    case "CHANGE": // on input
      return {
        ...state,
        text: action.text,
      };

    case "TOGGLE_DONE":
      let newtodos = state.todos.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });

      return {
        ...state,
        todos: newtodos,
      };

    case "REMOVE_ITEM":
      let items = state.todos.filter((todo) => todo.id !== action.id);

      return {
        ...state,
        todos: items,
      };

    default:
      return state;
  }
};

const initialState = {
  todos: [
    { id: 1, text: "TODO 1", done: false },
    { id: 2, text: "TODO 2", done: true },
    { id: 3, text: "TODO 3", done: false },
  ],
  text: "",
};

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleDoneHandler = (id) => {
    dispatch({
      type: "TOGGLE_DONE",
      id,
    });
  };

  const addItemHandler = () => {
    dispatch({
      type: "ADD_ITEM",
    });
  };

  const onInputHandler = (event) => {
    dispatch({
      type: "CHANGE",
      text: event.target.value,
    });
  };

  const removeItemHandler = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      id,
    });
  };

  return (
    <>
      <h2>Todo's App</h2>
      <hr />
      <input type="text" value={state.text} onInput={onInputHandler} />
      <button type="button" onClick={addItemHandler}>
        ADD
      </button>
      <hr />
      <ul>
        {state.todos &&
          state.todos.map((todo) => (
            <li key={todo.id}>
              <p>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => {
                    toggleDoneHandler(todo.id);
                  }}
                />{" "}
                {todo.text}{" "}
                <button
                  onClick={() => {
                    removeItemHandler(todo.id);
                  }}
                >
                  X
                </button>
              </p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Todo;
