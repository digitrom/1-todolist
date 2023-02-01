import React from 'react';
import {DataType} from "./App";

type PropsType = {
    data: DataType
}

const Tasks = (props: PropsType) => {
    return (
        <div>
            <h1>{props.data.title}</h1>
            <ul>
                {props.data.tasks.map((t, index) => {
                    return (
                        <li key={index}>
                            <span> {t.taskId} </span>
                            <input type="checkbox" checked={t.isDone}/>
                            <span> {t.title}</span>

                        </li>
                    )
                })}
            </ul>
            <ul>
                {props.data.students.map((s, index) => {
                    return (
                        <li key={index}>{s}</li>
                    )
                })}</ul>
        </div>
    );
};

export default Tasks;