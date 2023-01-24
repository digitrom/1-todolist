import React, {ChangeEvent, FC, KeyboardEvent, useRef, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    addTask: (title: string) => void
    filter: FilterValuesType

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)


    let tasksList = props.tasks.length //список лишек
        ? props.tasks.map((task) => {
            const removeTask = () => props.removeTask(task.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
            // const taskClasses = task.isDone ? "task-done" : "task"
            return (
                // <li key={task.id} className ={taskClasses}>
                <li key={task.id} className={task.isDone ? "task-done" : "task"}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(title)
        } else {
            setError(true)
        }
        //trim обрезает пробелы слева и справа
        console.error("Строка пустая")
        setTitle("")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)

    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const errorMessage = error && <p style={{color: "red", fontWeight: "bold", margin: "0"}}>Title is required</p>
    const inputErrorClasses = error ? "input-error" : ""




return (
    <div>
        <h3>{props.title}</h3>
        <div>
            <input
                //onChange -  изменение события в input.
                // все что польз. напечатает мы будем передавать в переменную  title
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={inputErrorClasses}
            />
            <button onClick={addTask}>+</button>
            {errorMessage}
        </div>
        <ul>
            {tasksList}
        </ul>
        <div>
            <button
                className={props.filter === "all" ? "btn-active" : ""}
                onClick={handlerCreator("all")}>All
            </button>
            <button
                className={props.filter === "active" ? "btn-active" : ""}
                onClick={handlerCreator("active")}>Active
            </button>
            <button
                className={props.filter === "completed" ? "btn-active" : ""}
                onClick={handlerCreator("completed")}>Completed
            </button>
        </div>
    </div>
);
}

export default TodoList;