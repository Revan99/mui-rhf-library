import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { SelectController } from '../components/InputController/SelectController/SelectController';
import { useForm } from 'react-hook-form';
import { SelectControllerProps } from '../fields';

const meta: Meta = {
    title: 'Select Controller',
    component: SelectController,
    argTypes: {
        children: {
            control: {
                type: 'text'
            }
        }
    },
    parameters: {
        controls: { expanded: true }
    }
};

export default meta;

const Template: StoryFn<SelectControllerProps> = (args) => {
    const { control } = useForm();

    return <SelectController {...args} control={control} />;
};

export const Select = Template.bind({});

Select.args = {
    name: 'select',
    label: 'Select Controller',
    defaultValue: '',
    options: [
        { label: 'Option One', value: 'option-one', entity: { id: 'entity-one' } },
        { label: 'Option Two', value: 'option-two', entity: { id: 'entity-two' } }
    ],
    optionValue: 'entity.id',
    variant: 'outlined',
    fullWidth: true
};

export const SelectMultiple = Template.bind({});

SelectMultiple.args = {
    name: 'selectMultiple',
    label: 'Select Multiple Controller',
    defaultValue: [],
    options: [
        { label: 'Option One', value: 'option-one', entity: { id: 'entity-one' } },
        { label: 'Option Two', value: 'option-two', entity: { id: 'entity-two' } }
    ],
    optionValue: 'entity.id',
    variant: 'outlined',
    multiple: true,
    fullWidth: true,
};
