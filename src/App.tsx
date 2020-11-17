import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let [style, setStyle] = useState("style");
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Computer", isDone: false}]
    });

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTask = [task, ...tasks];
        tasksObj[todolistId] = newTask
        setTasks({...tasksObj});
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id
        );
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let task = tasksObj[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
        }
        setTodolist([...todolists])
    }

    function removeTodolist (todolistId: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolist(filteredTodolists)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]);

    return (
        <div className={"AppStyle"}>
            <AddItemForm addTask={()=>{}} id={"asd"}/>
            {todolists.map((tl) => {
                let taskFortodolist = tasksObj[tl.id];
                if (tl.filter === "completed") {
                    taskFortodolist = taskFortodolist.filter(t => t.isDone === true)
                }
                if (tl.filter === "active") {
                    taskFortodolist = taskFortodolist.filter(t => t.isDone === false)
                }
                return <div className={style}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        task={taskFortodolist}
                        title={tl.title}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                        removeTodolist={removeTodolist}/>
                </div>
            })}
        </div>)
}

export default App;