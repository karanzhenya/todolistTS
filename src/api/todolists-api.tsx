import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '35899fcf-477f-4127-b8a1-4bc92d297428'
    }
})

type TodoType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}
type ResponseDataType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    fieldsErrors: Array<string>,
    data: D
}

type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}
type GetTasksType = {
    items: Array<TaskType>,
    totalCount: number,
    error: string
}
type CreateUpdateDeleteTaskType<D = {}> = {
    data: D
    resultCode: number,
    messages: Array<string>
}
export type UpdateTaskPayloadType = {
    title: string,
    description: string,
    status: number,
    priority: number,
    startDate: string,
    deadline: string
}

export const todolistApi = {

    getTodolists() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseDataType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseDataType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseDataType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CreateUpdateDeleteTaskType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CreateUpdateDeleteTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, payload: UpdateTaskPayloadType) {
        return instance.put<CreateUpdateDeleteTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {...payload})
    }
}