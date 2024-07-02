import { View, Text } from 'react-native'
import React from 'react'
import { InputWithTagContainer, TextContainer, TextInputComponent } from './styles'
import { useColorScheme } from '@/hooks/useColorScheme';

type InputWithTagComponentProps = {
    onChangeText: (value: string) => void;
    value: string;
    placeholder: string;
    colorTag: string;
    tagText: string;
}

export default function InputWithTagComponent(props: InputWithTagComponentProps) {
    const colorTheme = useColorScheme();
    return (
        <InputWithTagContainer theme={colorTheme}>
            <TextInputComponent
                placeholder={props.placeholder}
                onChangeText={(text) => {
                    const filteredText = text.replace(/[^0-9]/g, '');
                    props.onChangeText(filteredText);
                }}
                value={props.value}
                keyboardType='numeric'
            />
            <TextContainer color={props.colorTag}>{props.tagText}</TextContainer>
        </InputWithTagContainer>

    )
}