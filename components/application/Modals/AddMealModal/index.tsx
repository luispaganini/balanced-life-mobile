import React from 'react'
import { Button, Modal, Portal } from 'react-native-paper'
import InputWithTagComponent from '../../Inputs/InputWithTagComponent';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/Colors';
import ButtonComponent from '../../Forms/ButtonComponent';
import { Container, TitleModal } from './styles';
import InputFormComponent from '../../Inputs/InputFormComponent';
import { TimePickerModal } from 'react-native-paper-dates';

type AddMealModalProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onPress: (value: number) => void;
}

export default function AddMealModal(props: AddMealModalProps) {
    const { t } = useTranslation();
    const [nameSnack, setNameSnack] = React.useState('');
    const [visibleClock, setVisibleClock] = React.useState(false);

    const onPressEdit = () => {
        if (nameSnack) {
            props.onPress(parseInt(nameSnack));
            setNameSnack('');
            props.setVisible(!props.visible)
        }
    }
    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={() => props.setVisible(!props.visible)}>
                <Container>
                    <TitleModal type='subtitle'>{t('Meal')}</TitleModal>
                    <InputFormComponent onChangeText={setNameSnack} placeholder={t('Meal name')} value={nameSnack} errors={undefined} onBlur={() => { }} title={true} />
                    <Button onPress={() => setVisibleClock(true)}>Escolher horário</Button>
                    <TimePickerModal
                        visible={visibleClock}
                        onDismiss={() => setVisibleClock(false)}
                        onConfirm={() => setVisibleClock(false)}
                        hours={0}
                        minutes={0}
                        label="Selecione o horário"
                        locale='pt-BR'
                    />
                    <ButtonComponent onPress={onPressEdit} title={t('Apply goal')} color={Colors.color.blue} />
                    <ButtonComponent onPress={() => props.setVisible(false)} title={t('Back')} color={Colors.color.lightRed} />
                </Container>
            </Modal>
        </Portal>
    )
}