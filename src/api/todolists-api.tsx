import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "api-key": "35899fcf-477f-4127-b8a1-4bc92d297428"
    }
}

type TodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseDataType<Data> = {
    resultCode: number
    messages: Array<string>,
    data: Data
}

export const todolistsApi = {
    getTodolists() {
        return axios.get<TodolistsType>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },

    createTodolist(title: string) {
        return axios.post<ResponseDataType<{ item: TodolistsType }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
    },

    deleteTodolist(todolistId: string) {
        return axios.delete<ResponseDataType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },

    updateTodolist(todolistId: string, title: string) {
        return axios.put<ResponseDataType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
    }
}