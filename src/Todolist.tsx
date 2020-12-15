import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type PropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
    id: string
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
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
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    };
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    };
    return (
        <div className={"todolist"}>

            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.task.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    };
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    };

                    function onChangeTitleHandler(newValue: string) {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    };
                    return <li className={t.isDone ? "isDone" : "isntDone"} key={t.id}>
                        <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onRemoveHandler}><Delete/>
                        </IconButton>
                    </li>
                })}
            </ul>
            <div style={{padding: "10px"}}>
                <Button style={{color: "white", backgroundColor: "lightskyblue"}} variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllChangeFilter}>All
                </Button>
                <Button style={{color: "white", backgroundColor: "lightskyblue"}} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveChangeFilter}>Active
                </Button>
                <Button style={{color: "white", backgroundColor: "lightskyblue"}} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedChangeFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

