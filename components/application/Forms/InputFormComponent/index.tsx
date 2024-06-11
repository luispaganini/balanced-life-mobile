import React from 'react';
import { ErrorText, TextInputComponent, TextInputComponentWithMask, TextInputContainer, TitleInput } from './styles';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { FieldError } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInputMaskTypeProp } from 'react-native-masked-text';

interface InputFormProps {
    onChangeText: (value: string) => void;
    value: string;
    placeholder: string;
    onBlur: () => void;
    errors: FieldError | undefined
    mask?: boolean
    typeMask?: TextInputMaskTypeProp
    editable?: boolean
    password?: boolean
    keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad"
    title?: boolean
}

export default function InputFormComponent(props: InputFormProps) {
    const colorTheme = useColorScheme();
    const { t } = useTranslation();

    return (
        <TextInputContainer>
            {props.mask && props.typeMask ?
                <View>
                    {props.title && <TitleInput>{t(props.placeholder)}</TitleInput>}
                    <TextInputComponentWithMask
                        type={props.typeMask}
                        placeholder={props.placeholder}
                        placeholderTextColor={`black`}
                        onChangeText={props.onChangeText}
                        value={props.value}
                        theme={colorTheme}
                        onBlur={props.onBlur}
                        editable={props.editable}
                        keyboardType={props.keyboardType}
                    />
                </View>
                :
                <View>
                    {props.title && <TitleInput>{t(props.placeholder)}</TitleInput>}
                    <TextInputComponent
                        placeholder={props.placeholder}
                        placeholderTextColor={`black`}
                        onChangeText={props.onChangeText}
                        value={props.value}
                        theme={colorTheme}
                        onBlur={props.onBlur}
                        editable={props.editable}
                        secureTextEntry={props.password}
                        keyboardType={props.keyboardType}
                    />
                </View>
            }
            {props.errors && <ErrorText>{t(props.errors.message ?? "This is required")}</ErrorText>}
        </TextInputContainer>
    );
};