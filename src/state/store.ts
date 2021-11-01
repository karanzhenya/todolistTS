import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers, createStore} from 'redux';

//объединяем редьюсеры в один общий
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
//создаем стор
export const store = createStore(rootReducer);
// автоматически определяем тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;