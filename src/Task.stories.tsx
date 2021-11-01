import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";

export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        changeTaskStatus: action('Status changed'),
        changeTaskTitle: action('Title changed'),
        removeTask: action('Task deleted')
    }
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;


export const TaskIsDoneBaseExample = Template.bind({});
TaskIsDoneBaseExample.args = {
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId: 'todolistId1'
}

export const TaskIsNotDoneBaseExample = Template.bind({});
TaskIsNotDoneBaseExample.args = {
    task: {id: '1', isDone: false, title: 'JS'},
    todolistId: 'todolistId1'
}