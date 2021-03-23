import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {Menu} from "@material-ui/icons";
import Typography from '@material-ui/core/Typography';
import {Button, Container, Grid, Paper, Toolbar} from "@material-ui/core";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterType = "all" | "completed" | "active";

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}

    ])
    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false}],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Pen", isDone: true},
        ]
    })

    const addItem = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTask = [...tasks, task];
        tasksObj[todolistId] = newTask
        setTasks({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasksObj})
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
        }
        setTasks({...tasksObj})
    }

    const removeTask = (taskId: string, todolistId: string) => {
        let tasks = tasksObj[todolistId] //тудулист, из которого нужно удалить таску(по id)
        let filteredTasks = tasks.filter(t => t.id !== taskId); // пропускаем таски, которые не надо удалять
        tasksObj[todolistId] = filteredTasks //к таскам конкретного тудулиста присваеваем отфильтрованные таски
        setTasks({...tasksObj})
    };

    const changeFilter = (status: FilterType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = status
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (todolistId: string) => {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists);
        delete tasksObj[todolistId];
        setTasks({...tasksObj})
    }

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        };
        setTodolists([todolist, ...todolists])
        setTasks({...tasksObj, [todolist.id]: []})
    }

    const changeTodolist = (newTitle: string, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id];
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }
                            ;
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            }
                            ;
                            return <Grid item>
                                <Paper style={ {padding: "10px"} }>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              tasks={tasksForTodolist}
                                              filter={tl.filter}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addItem={addItem}
                                              changeTaskStatus={changeStatus}
                                              removeTodolist={removeTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolist={changeTodolist}/>
                                </Paper>
                            </Grid>
                        })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;