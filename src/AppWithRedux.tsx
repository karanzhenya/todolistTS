import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterType = "all" | "completed" | "active";

function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);

    const changeFilter = (status: FilterType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, status)
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const changeTodolist = (newTitle: string, todolistId: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
        /*let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        };
        setTodolists([todolist, ...todolists])
        setTasks({...tasksObj, [todolist.id]: []})*/
    }

    return (
        <div className="App">
            {/*<AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>*/}
            <Container fixed>
                <Grid container style={{padding: "20px", justifyContent: "center"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5} style={{justifyContent: "center"}}>
                    {
                        todolists.map((tl) => {
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              filter={tl.filter}
                                              changeFilter={changeFilter}
                                              removeTodolist={removeTodolist}
                                              changeTodolist={changeTodolist}/>
                                </Paper>
                            </Grid>
                        })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;