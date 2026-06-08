import React from 'react';
import { ErrorText, TextInputComponent, TextInputComponentWithMask, TextInputContainer, TitleInput } from './styles';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { FieldError } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInputMaskOptionProp, TextInputMaskTypeProp } from 'react-native-masked-text';

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
    options?: TextInputMaskOptionProp
    testID?: string
}

export default function InputFormComponent(props: InputFormProps) {
    const colorTheme = useColorScheme();
    const { t } = useTranslation();
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <TextInputContainer>
            {props.mask && props.typeMask ?
                <View>
                    {props.title && <TitleInput>{t(props.placeholder)}</TitleInput>}
                    <TextInputComponentWithMask
                        testID={props.testID}
                        type={props.typeMask}
                        placeholder={props.placeholder}
                        onChangeText={props.onChangeText}
                        value={props.value}
                        theme={colorTheme}
                        isFocused={isFocused}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false);
                            props.onBlur();
                        }}
                        editable={props.editable}
                        keyboardType={props.keyboardType}
                        options={props.options}
                        placeholderTextColor={colorTheme === 'dark' ? '#9BA1A6' : '#687076'}
                    />
                </View>
                :
                <View>
                    {props.title && <TitleInput>{t(props.placeholder)}</TitleInput>}
                    <TextInputComponent
                        testID={props.testID}
                        placeholder={props.placeholder}
                        onChangeText={props.onChangeText}
                        value={props.value}
                        theme={colorTheme}
                        isFocused={isFocused}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setIsFocused(false);
                            props.onBlur();
                        }}
                        editable={props.editable}
                        secureTextEntry={props.password}
                        keyboardType={props.keyboardType}
                        placeholderTextColor={colorTheme === 'dark' ? '#9BA1A6' : '#687076'}
                    />
                </View>
            }
            {props.errors && <ErrorText testID={props.testID ? `${props.testID}-error` : undefined}>{t(props.errors.message ?? "This is required")}</ErrorText>}
        </TextInputContainer>
    );
};