import React from 'react'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { CalendarPickerComponentContainer, ErrorText, InputContainer, TitleInput } from './styles';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type CalendarPickerComponentProps = {
    value: string;
    onChange: (date: string) => void;
    errors: FieldError | undefined;
    maximumDate?: Date;
    title?: boolean;
    placeholder: string;
}

export default function CalendarPickerComponent(props: CalendarPickerComponentProps) {
    const colorTheme = useColorScheme();
    const { t } = useTranslation();
    const [show, setShow] = React.useState(false);
    return (
        <View>
            <InputContainer>
                {props.title && <TitleInput>{t(props.placeholder)}</TitleInput>}
                <CalendarPickerComponentContainer onPress={() => setShow(!show)}>
                    <Text>{props.value ? new Date(props.value).toLocaleDateString('pt-BR') : t(props.placeholder)}</Text>
                </CalendarPickerComponentContainer>
                {props.errors && <ErrorText>{t(props.errors.message ?? "This is required")}</ErrorText>}
            </InputContainer>
                {show &&
                    <RNDateTimePicker
                        mode="date"
                        value={props.value.length > 0 ? new Date(props.value) : new Date()}
                        themeVariant={colorTheme === 'light' ? 'light' : 'dark'}
                        onChange={(event, selectedDate) => {
                            setShow(false);
                            if (event.type === 'set')
                                props.onChange(selectedDate?.toString() || props.value.toString());
                        }}
                        disabled={false}
                        maximumDate={props.maximumDate}
                    />
                }
        </View>
    )
}