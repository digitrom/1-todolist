import React, {useRef, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")

   // const ref = useRef<HTMLInputElement>(null)
    let tasksList = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id)
            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

        const addTask = () => {
            props.addTask(title)
            setTitle("")
        }

return (
    <div>
        <h3>{props.title}</h3>
        <div>
            <input
                //onChange -  изменение события в input.
                // все что польз. напечатает мы будем передавать в переменную  title
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value) }
                onKeyDown={(e) => e.key === "Enter" &&  addTask()
                }
            />
            <button onClick={addTask}>+</button>
           {/* <input
           ref={ref}
            <button onClick={() => {
             if(ref.current) {
             props.addTask(ref.current.value)
             ref.current.value = ""
             )}>+</button>*/}
        </div>
        <ul>
            {tasksList}
        </ul>
        <div>
            <button onClick={() => props.changeFilter("all")}>All</button>
            <button onClick={() => props.changeFilter("active")}>Active</button>
            <button onClick={() => props.changeFilter("completed")}>Completed</button>
        </div>
    </div>
);
}
;

export default TodoList;