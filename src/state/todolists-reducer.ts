import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string

}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterType

}
export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case "CHANGE-TODOLIST-FILTER":
            let newTodolist = state.find(tl => tl.id === action.id)
            if (newTodolist) {
                newTodolist.filter = action.filter
            }
            return [...state]
        default:
            throw new Error("Ne rabotaet");
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId};
}

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: newTodolistTitle, todolistId: v1()};
}

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: newTodolistTitle}
}

export const changeTodolistFilterAC = (todolistId: string, newTodolistFilter: FilterType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: newTodolistFilter}
}