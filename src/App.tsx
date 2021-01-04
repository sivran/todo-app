import React, { useState } from 'react';
import 'dnb-ui-lib/style';
import './App.scss';
import { H1 } from 'dnb-ui-lib';
import { Todo } from './components/todo/Todo';
import { TodoItem } from './types/TodoItem';
import { nanoid } from 'nanoid';
import { AddTodoForm } from './components/todo/add-todo-form/AddTodoForm';

const startingTodos = [
  {
    name: 'eat',
    id: 'todo1'
  },
  {
    name: 'sleep',
    id: 'todo2'
  },
  {
    name: 'repeat',
    completed: true,
    id: 'todo3'
  }
];

function App() {
  const [todos, setTodos] = useState<TodoItem[]>(startingTodos);

  const addTodo = (name: string) => {
    setTodos([...todos, { name, id: nanoid(), completed: false }]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (editedTodo: TodoItem) => {
    setTodos(
      todos.map(todo => {
        if (editedTodo.id === todo.id) {
          return editedTodo;
        }
        return todo;
      })
    );
  };

  const toggleTodoCompleted = (id: string) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  return (
    <div className="App">
      <H1 bottom="1rem">Todo app</H1>
      <AddTodoForm addTodo={addTodo} />
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          toggleTodoCompleted={toggleTodoCompleted}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
}

export default App;
