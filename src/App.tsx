import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle_1: string = "What to learn"
    // const todoListTitle_2: string = "What to buy"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "Html", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
    ])
    // console.log(result)

    /*    const tasks_2: Array<TaskType> = [
            {id: 1, title: "Monitor", isDone: false},
            {id: 2, title: "Keyboard", isDone: false},
            {id: 3, title: "Headphones", isDone: true},
        ]*/
    const [filter, setFilter] = useState<FilterValuesType>("all");

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }



    const addTask =(title: string) => {
const newTask: TaskType = {
    // id: Number(new Date()),
    id: v1(),
    title: title,
    isDone: false
}
//создаем новый массив не изменяя исходный(иммутабельно) ... spread, и добавляем новую таску
 setTasks([...tasks, newTask])
    }


    const getFilteredTaskForRender =
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case "active":
                    return tasks.filter(task => task.isDone === false)
                case "completed":
                    return tasks.filter(task => task.isDone === true)
                default:
                    return tasks
            }
        }
    const filteredTasksForRender = getFilteredTaskForRender(tasks, filter)

    return (
        <div className="App">
            <TodoList
                title={todoListTitle_1}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
            {/*<TodoList title={todoListTitle_2} tasks={tasks_2}/>*/}
        </div>
    );
}

export default App;
