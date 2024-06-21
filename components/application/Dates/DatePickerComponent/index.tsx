import React from 'react'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';
import { CalendarPickerComponentContainer, DateText, InputContainer } from './styles';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type DatePickerComponentProps = {
    value: Date;
    onChange: (date: Date) => void;
    maximumDate?: Date;
    title?: boolean;
}

export default function DatePickerComponent(props: DatePickerComponentProps) {
    const colorTheme = useColorScheme();
    const { t } = useTranslation();
    const [show, setShow] = React.useState(false);

    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return (
        <View>
            <InputContainer>
                <CalendarPickerComponentContainer onPress={() => setShow(!show)} theme={colorTheme}>
                    <DateText theme={colorTheme}>
                        {new Date(props.value).toLocaleDateString('pt-BR', options).replace(/ de /g, ' ').replace('.', '').toUpperCase()}
                    </DateText>
                    <Ionicons name="caret-down" size={16} color={colorTheme == 'light' ? Colors.light.text : Colors.dark.text} />
                </CalendarPickerComponentContainer>
            </InputContainer>
                {show &&
                    <RNDateTimePicker
                        mode="date"
                        value={props.value}
                        themeVariant={colorTheme === 'light' ? 'light' : 'dark'}
                        onChange={(event, selectedDate) => {
                            setShow(false);
                            if (event.type === 'set')
                                props.onChange(selectedDate || props.value);
                        }}
                        disabled={false}
                        maximumDate={props.maximumDate}
                    />
                }
        </View>
    )
}