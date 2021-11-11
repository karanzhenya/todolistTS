import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {todolistsApi} from "./api/todolists-api";

export default {
    title: 'API'
}


const settings = {
    withCredentials: true,
    headers: {
        "api-key": "35899fcf-477f-4127-b8a1-4bc92d297428"
    }
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists().then(response => {
            setState(response.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist("test todolist").then(response => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f5fbc138-68f3-422a-98d7-c7ef58306ca6'
        todolistsApi.deleteTodolist(todolistId).then(response => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ff8b99f3-e7de-4ef1-adb4-73ca93473472'
        todolistsApi.updateTodolist(todolistId, "New refactoring title").then(response => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
