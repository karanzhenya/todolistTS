import React, {ChangeEvent} from 'react';
import {FilterType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";

type PropsType = {
    id: string
    title: string,
    changeFilter: (status: FilterType, todolistId: string) => void
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
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);

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
    const changeTodolist = (newTitle: string) => {
        props.changeTodolist(newTitle, props.id)
    }

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;
    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolist}/>
            <IconButton>
                <Delete onClick={removeTodolist}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={(title) => {
            dispatch(addTaskAC(title, props.id))
        }}/>
        <div>
            {tasksForTodolist.map(t => {
                const onClickHandler = () => {
                    dispatch(removeTaskAC(t.id, props.id))
                }

                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))
                }

                const onChangeTitleHandler = (newValue: string) => {
                    dispatch(changeTaskTitleAC(t.id, newValue, props.id));
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
        <div style={{paddingTop: "5px"}}>
            <Button size={"small"} variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All
            </Button>
            <Button size={"small"} variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button size={"small"} variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

