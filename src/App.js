import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers } from 'redux';

const todo = (state = [], action) => {
  switch(action.type) {
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}
const todos = (state = [], action) => {
  switch(action.type) {
    case "ADD_TODO":
      return [{
        id: action.id,
        text: action.text,
        completed: false
      },
      ...state];
      break;
    case "TOGGLE_TODO":
      return state.map(s => {
        todo(s, action)
      })
      break;
    default:
      return state;
  }
};
const todoApp = combineReducers({
  todos
});

const store = createStore(todoApp);

let nextTodoId = 0;
class App extends Component {
  render() {
    return (
      <div>
        <p>
           <code>TODO with redux and react</code> 
        </p>
        <input ref={node =>
          this.input = node
        }/>
        <button onClick={() => {
          if(this.input.value !== "") {
            store.dispatch({
                type: 'ADD_TODO',
                text: this.input.value,
                id: nextTodoId++
            });
            this.input.value = '';
          }
          }}>
            Add ToDo
          </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}
                onClick={() => {
                  store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                  });
                }}
                style={{
                  textDecoration:
                    todo.completed ?
                      'line-through' :
                      'none'
                }}>
              {todo.text}
            </li>
          )}
        </ul>

      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<App todos={store.getState().todos}/>, document.getElementById('root'));
};

render();
store.subscribe(render);