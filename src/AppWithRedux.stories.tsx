import React from 'react';
import {Meta, Story} from '@storybook/react';
import {EditableSpanPropsType} from "./EditableSpan";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    argTypes: {
    },
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <AppWithRedux/>;

export const AppWithReduxBaseExample = Template.bind({});
