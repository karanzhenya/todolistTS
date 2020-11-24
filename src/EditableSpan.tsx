import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string,
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("")
    const ActivateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    };
    const ActivateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    };
    let onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    return editMode ?
        <input autoFocus value={title} onBlur={ActivateViewMode} onChange={onChangeTitleHandler}/> :
        <span onDoubleClick={ActivateEditMode}>{props.title}</span>
}