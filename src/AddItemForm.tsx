import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addTask: (newTaskTitle: string, todolistId: string) => void
    id: string
}

export function AddItemForm(props: AddItemFormType) {
    let [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
            setNewTaskTitle("")
        }
    };
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle("")
        } else {
            setError("Nelzya tak pisat'")
        }
    };
    return <div>
        <input className={error ? "error" : ""} value={newTaskTitle} onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}