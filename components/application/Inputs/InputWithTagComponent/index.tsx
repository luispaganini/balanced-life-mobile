import React from 'react'
import { useColorScheme } from '@/hooks/useColorScheme';
import { 
    InputWithTagContainer, 
    TextContainer, 
    TagText, 
    TextInputComponent,
    TextInputMaskComponent,
    InputWithTagWrapper,
    TitleInput,
    ErrorText
} from './styles'
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextInputMaskOptionProp, TextInputMaskTypeProp } from 'react-native-masked-text';

type InputWithTagComponentProps = {
    onChangeText: (value: string) => void;
    value: string;
    placeholder: string;
    colorTag: string;
    tagText: string;
    editable?: boolean;
    style?: any;
    allowDecimals?: boolean;
    keyboardType?: 'numeric' | 'decimal-pad' | 'default';
    title?: boolean;
    errors?: FieldError | undefined;
    mask?: boolean;
    typeMask?: TextInputMaskTypeProp;
    options?: TextInputMaskOptionProp;
}

export default function InputWithTagComponent(props: InputWithTagComponentProps) {
    const colorTheme = useColorScheme();
    const { t } = useTranslation();

    return (
        <InputWithTagWrapper style={props.style}>
            {props.title && <TitleInput>{t(props.placeholder)}</TitleInput>}
            <InputWithTagContainer theme={colorTheme}>
                {props.mask && props.typeMask ? (
                    <TextInputMaskComponent
                        theme={colorTheme}
                        type={props.typeMask}
                        options={props.options}
                        placeholder={props.placeholder}
                        placeholderTextColor={colorTheme === 'light' ? '#9CA3AF' : '#6B7280'}
                        onChangeText={props.onChangeText}
                        value={props.value}
                        keyboardType={props.keyboardType || 'numeric'}
                        editable={props.editable}
                    />
                ) : (
                    <TextInputComponent
                        theme={colorTheme}
                        placeholder={props.placeholder}
                        placeholderTextColor={colorTheme === 'light' ? '#9CA3AF' : '#6B7280'}
                        onChangeText={(text) => {
                            const filteredText = props.allowDecimals
                                ? text.replace(/[^0-9.,]/g, '')
                                : text.replace(/[^0-9]/g, '');
                            props.onChangeText(filteredText);
                        }}
                        value={props.value}
                        keyboardType={props.keyboardType || 'numeric'}
                        editable={props.editable}
                    />
                )}
                <TextContainer theme={colorTheme}>
                    <TagText theme={colorTheme} color={props.colorTag}>{props.tagText}</TagText>
                </TextContainer>
            </InputWithTagContainer>
            {props.errors && <ErrorText>{t(props.errors.message ?? "This is required")}</ErrorText>}
        </InputWithTagWrapper>
    )
}