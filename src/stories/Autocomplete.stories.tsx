import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AutocompleteController } from '../components/InputController/AutocompleteController/AutocompleteController';
import { useForm } from 'react-hook-form';
import { AutocompleteControllerProps } from '../fields';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const meta: Meta = {
    title: 'Autocomplete Controller',
    component: AutocompleteController,
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

const Template: StoryFn<AutocompleteControllerProps> = (args) => {
    const schema = yup.object().shape({
        autocomplete: args.multiple ? yup.array().of(yup.string()).min(2).required() : yup.string()
    });

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    });

    const handleFormSubmit = (data: any) => {
        console.log({ data });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <AutocompleteController {...args} name="autocomplete" control={control} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Autocomplete = Template.bind({});

Autocomplete.args = {
    name: 'autocomplete',
    textFieldProps: {
        label: 'Autocomplete Controller',
        fullWidth: true,
        variant: 'outlined',
        placeholder: 'Search...'
    },
    optionLabel: 'entity.id',
    optionValue: 'entity.id',
    options: [
        { title: 'Option One', entity: { id: 'entity-one' }, value: 'option-one' },
        { title: 'Option two', entity: { id: 'entity-two' }, value: 'option-two' }
    ],
    onBlur: () => console.log('Autocomplete onBlur called')
};

export const AutocompleteMultiple = Template.bind({});

AutocompleteMultiple.args = {
    name: 'autocompleteMultiple',
    textFieldProps: {
        label: 'Autocomplete Multiple Controller',
        fullWidth: true
    },
    defaultValue: [],
    optionLabel: 'title',
    optionValue: 'entity.id',
    options: [
        { title: 'Option One', entity: { id: 'entity-one' }, value: 'option-one' },
        { title: 'Option Two', entity: { id: 'entity-two' }, value: 'option-two' }
    ],
    multiple: true
};
