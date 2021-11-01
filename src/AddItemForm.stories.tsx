import React from 'react';
import { Story, Meta } from '@storybook/react';

import {AddItemForm, AddItemFormPropsType} from './AddItemForm';
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button clicked'
        }
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormBaseExample = Template.bind({});
AddItemFormBaseExample.args = {
    addItem: action('Button inside from clicked')
}