import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";


type PropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone:boolean, todolistId: string) => void
    removeTodolist:  (todolistId: string) => void
    filter: FilterValuesType
    id: string

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export function Todolist(props: PropsType) {

    const onAllChangeFilter = () => {
        props.changeFilter("all", props.id)
    };
    const onActiveChangeFilter = () => {
        props.changeFilter("active", props.id)
    };
    const onCompletedChangeFilter = () => {
        props.changeFilter("completed", props.id)
    };
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    };
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (
        <div>
            <h3 className={"titleStyle"}>{props.title}<button onClick={removeTodolist}>X</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.task.map(t => {
                    const onRemoveHandler = () => {props.removeTask(t.id, props.id)};
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)};
                    return  <li className={t.isDone? "isDone": "isntDone"} key={t.id}><input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={onRemoveHandler}>X
                    </button>
                </li>})}
            </ul>
            <div className={"button-filter"}>
                <button className={props.filter === "all"? "filter-on": "filter-off"} onClick={onAllChangeFilter}>All</button>
                <button className={props.filter === "active"? "filter-on": "filter-off"} onClick={onActiveChangeFilter}>Active</button>
                <button className={props.filter === "completed"? "filter-on": "filter-off"} onClick={onCompletedChangeFilter}>Completed</button>
            </div>
        </div>
    )
}

