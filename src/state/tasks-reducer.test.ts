import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test('correct task should be deleted from correct todolist', () => {

    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Pen", isDone: true},
        ]
    }
    const action = removeTaskAC("2", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(1);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct todolist', () => {

    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Pen", isDone: true},
        ]
    }
    const action = addTaskAC("newnewnew", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].title).toBe("newnewnew");
    expect(endState["todolistId2"][0].isDone).toBe(false);
});

test('status specified task should be changed', () => {

    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Pen", isDone: true},
        ]
    }
    const action = changeTaskStatusAC("2", false, "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][0].isDone).toBe(true);
    expect(endState["todolistId2"][1].isDone).toBe(false);
});

test('title specified task should be changed', () => {

    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Pen", isDone: true},
        ]
    }
    const action = changeTaskTitleAC("2", "newnewnew", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][0].title).toBe("Book");
    expect(endState["todolistId2"][1].title).toBe("newnewnew");
});

test('new array should be add when new todolist is added', () => {

    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Pen", isDone: true},
        ]
    }
    const action = addTodolistAC("new todolist")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([])
});

test('propert with todolistId should be deleted', () => {

    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: "1", title: "Book", isDone: true},
            {id: "2", title: "Pen", isDone: true},
        ]
    }
    const action = removeTodolistAC("todolistId2")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined()
});