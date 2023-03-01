import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import todoList from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const todoListTitle_1: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "Html", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false}
    ])

    let [todolists, setTodolists] = useState<Array<TodolistType>>( [
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to buy", filter: "completed"}
    ])

    // const [filter, setFilter] = useState<FilterValuesType>("all");
    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        let todolist = (todolists.find( el => el.id === todolistID))
        if (todolist) {
            todolist.filter= filter;
            setTodolists([...todolists])
        }

    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            // id: Number(new Date()),
            id: v1(),
            title: title,
            isDone: false
        }
//создаем новый массив не изменяя исходный(иммутабельно) ...spread, и добавляем новую таску
        setTasks([newTask,...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone: isDone} : t))
    }


    return (
        <div className="App">
            {todolists.map((tl) => {

                const getFilteredTaskForRender =
                    (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
                        switch (tl.filter) {
                            case "active":
                                return tasks.filter(task => task.isDone === false)
                            case "completed":
                                return tasks.filter(task => task.isDone === true)
                            default:
                                return tasks
                        }
                    }
                const filteredTasksForRender = getFilteredTaskForRender(tasks, tl.filter)

                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTasksForRender}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                    />
                )
            })}


            {/*<TodoList title={todoListTitle_2} tasks={tasks_2}/>*/}
        </div>
    );
}

export default App;
