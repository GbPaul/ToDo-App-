import React, { useState } from "react"
import Button from "../UI/Button/Button"
import Card from "../UI/Card/Card"
import classes from "../UserForm/UserForm.module.css"
import ErrorModal from "../UI/ErrorModal"

interface Props {
  addTodo: AddTodo
}

export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState("")
  const [error, setError] = useState<ErrorProps>()

  const inputChangeHadler = (event: any) => {
    setText(event.target.value)
  }

  const inputButtonHadler = (e: any) => {
    e.preventDefault()
    if (text.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "An error has occured, Please enter a valid word",
      })
      return
    }
    addTodo(text)
    setText("")
  }

  return (
    <>
      {error && <ErrorModal message={error.message} title={error.title} />}
      <Card className={classes.input}>
        <form>
          <input
            type="text"
            value={text}
            onChange={inputChangeHadler}
            required={true}
          />

          <Button type="submit" onClick={inputButtonHadler}>
            Add ToDo
          </Button>
        </form>
      </Card>
    </>
  )
}
