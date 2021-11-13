import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "api-key": "35899fcf-477f-4127-b8a1-4bc92d297428"
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

type TodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseDataType<Data = {}> = {
    resultCode: number
    messages: Array<string>,
    data: Data
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    error: string
    totalCount: number
    items: Array<TaskType>
}
type CreateUpdateTaskResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TaskType
    }
}
export type UpdateTaskPayloadType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistsType>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseDataType<{ item: TodolistsType }>>('todo-lists', {title: title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseDataType>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseDataType>(`todo-lists/${todolistId}`, {title: title})
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<CreateUpdateTaskResponseType>(`todo-lists/${todolistId}/tasks`, {title: title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseDataType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, payload: UpdateTaskPayloadType) {
        return instance.put<CreateUpdateTaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {...payload})
    }
}