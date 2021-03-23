import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (status: FilterType, todolistId: string) => void
    addItem: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTodolist: (newTitle: string, todolistId: string) => void
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addItem = (title: string) => {
        props.addItem(title, props.id)
    }
    const changeTodolist = (newTitle: string) => {
        props.changeTodolist(newTitle, props.id)
    }
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolist}/>
            <IconButton>
                <Delete onClick={removeTodolist}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addItem}/>
        <div>
            {props.tasks.map(t => {
                const onClickHandler = () => {
                    props.removeTask(t.id, props.id)
                }

                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                }

                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(t.id, newValue, props.id)
                }

                return <div
                    className={t.isDone ? "is-done" : ""}
                    key={t.id}>
                    <Checkbox size={'small'} checked={t.isDone} onChange={onChangeStatusHandler}/>
                    <EditableSpan title={t.title}
                                  onChange={onChangeTitleHandler}/>
                    <IconButton>
                        <Delete onClick={onClickHandler}/>
                    </IconButton>
                </div>
            })}
        </div>
        <div>
            <Button size={"small"} variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All
            </Button>
            <Button size={"small"} variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active
            </Button>
            <Button size={"small"} variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

