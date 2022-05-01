import type { FunctionComponent } from "react"

interface TodoProps {
  todo: Todo
  toggleTodo: ToggleTodo
  classname?: string
}

export const TodoListItem: FunctionComponent<TodoProps> = ({
  todo,
  toggleTodo,
}) => {
  return (
    <li>
      <label
        style={{
          textDecoration: todo.complete ? "line-through" : undefined,
        }}
      >
        <input
          type="checkbox"
          checked={todo.complete}
          onClick={() => {
            toggleTodo(todo)
          }}
        />{" "}
        {todo.text}
      </label>
    </li>
  )
}
