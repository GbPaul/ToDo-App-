interface Todo {
  text: string
  complete: boolean
}
type ToggleTodo = (selectedTodo: Todo) => void
type AddTodo = (text: string) => void

interface ErrorProps {
  title: string
  message: string
}
