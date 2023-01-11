import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle_1: string = "What to learn"
    // const todoListTitle_2: string = "What to buy"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "Html", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},
    ])
    // console.log(result)
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    /*    const tasks_2: Array<TaskType> = [
            {id: 1, title: "Monitor", isDone: false},
            {id: 2, title: "Keyboard", isDone: false},
            {id: 3, title: "Headphones", isDone: true},
        ]*/
    const [filter, setFilter] = useState<FilterValuesType>("all");
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
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
            />
            {/*<TodoList title={todoListTitle_2} tasks={tasks_2}/>*/}
        </div>
    );
}

export default App;
