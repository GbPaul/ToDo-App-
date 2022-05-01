import React from "react"
import Card from "../UI/Card/Card"
import Button from "../UI/Button/Button"
import classes from "./ErrorModal.module.css"

interface ErrorProps {
  title: string
  message: string
}

export const ErrorModal: React.FC<ErrorProps> = ({ title, message }) => {
  return (
    <div>
      <div className={classes.backdrop} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{title}</h2>
        </header>
        <div className={classes.content}>
          <p>{message}</p>
        </div>
        <footer className={classes.actions}>
          <Button>Okay</Button>
        </footer>
      </Card>
    </div>
  )
}

export default ErrorModal
