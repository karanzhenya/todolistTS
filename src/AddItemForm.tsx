import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (newTaskTitle: string) => void
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
            props.addItem(newTaskTitle.trim());
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