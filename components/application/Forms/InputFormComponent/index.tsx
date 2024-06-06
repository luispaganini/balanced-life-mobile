import React from 'react';
import { TextInputComponent, TextInputContainer } from './styles';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { FieldError } from 'react-hook-form';
import { Keyboard } from 'react-native';

interface InputFormProps {
    onChangeText: (value: string) => void;
    value: string;
    placeholder: string;
    onBlur: () => void;
    errors: FieldError | undefined
    editable?: boolean
    password?: boolean
}

export default function InputFormComponent(props: InputFormProps) {
    const colorTheme = useColorScheme();

    return (
        <TextInputContainer>
            <TextInputComponent
                placeholder={props.placeholder}
                placeholderTextColor={`black`}
                onChangeText={props.onChangeText}
                value={props.value}
                theme={colorTheme}
                onBlur={props.onBlur}
                editable={props.editable}
                secureTextEntry={props.password}
            />
            {props.errors && <ThemedText>This is required.</ThemedText>}
        </TextInputContainer>
    );
};