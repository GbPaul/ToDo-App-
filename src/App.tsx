import { useState } from "react"
import { TodoList } from "./components/UserForm/TodoList"
import { AddTodoForm } from "./components/UserForm/AddTodoForm"
import Card from "./components/UI/Card/Card"
import "./App.css"

const initialTodos: Todo[] = [
  {
    text: "Call Mum",
    complete: false,
  },
  {
    text: "Go for shopping",
    complete: false,
  },
  {
    text: "Write app",
    complete: true,
  },
]

function App() {
  const [todos, setTodos] = useState(initialTodos)

  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { text, complete: false }
    setTodos([...todos, newTodo])
  }

  return (
    <Card>
      <div className="app">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <AddTodoForm addTodo={addTodo} />
      </div>
    </Card>
  )
}

export default App
