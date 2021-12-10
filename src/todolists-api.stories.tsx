import React, {useEffect, useState} from 'react'
import {todolistApi, UpdateTaskPayloadType} from "./api/todolists-api";

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
        todolistApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = '123432423'
    useEffect(() => {
        todolistApi.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '7fe75a99-e89b-49ce-9204-3e8f1e0044dd'
    useEffect(() => {
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '7fe75a99-e89b-49ce-9204-3e8f1e0044dd'
    const title = 'bla bla bla123123'
    useEffect(() => {
        todolistApi.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'ce2be0f6-f32d-45e2-a179-80ac37a04230'
    useEffect(() => {
        todolistApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'ce2be0f6-f32d-45e2-a179-80ac37a04230';
    const title = 'one two three';
    useEffect(() => {
        todolistApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'ce2be0f6-f32d-45e2-a179-80ac37a04230';
    const taskId = '49e24665-88a6-4941-b611-2a35f4a0cf73';
    useEffect(() => {
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'ce2be0f6-f32d-45e2-a179-80ac37a04230';
    const taskId = '6cedd72b-45e0-4d17-914b-2456ea537a33';
    const payload: UpdateTaskPayloadType = {
        title: "new task title, OK?",
        description: "some description",
        status: 1,
        priority: 1,
        startDate: '',
        deadline: ''
    }
    useEffect(() => {
        todolistApi.updateTask(todolistId, taskId, payload)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
