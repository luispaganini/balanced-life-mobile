import { Text } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper'
import { AddWaterContainer, ModalContainer } from './styles';
import InputWithTagComponent from '../../Inputs/InputWithTagComponent';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/Colors';
import ButtonComponent from '../../Forms/ButtonComponent';

type WaterEditModalProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onPress: (value: number) => void;
}

export default function WaterEditModal(props: WaterEditModalProps) {
    const { t } = useTranslation();
    const [textAddWater, setTextAddWater] = React.useState('');

    const onPressEdit = () => {
        if (textAddWater) {
            props.onPress(parseInt(textAddWater));
            setTextAddWater('');
            props.setVisible(!props.visible)
        }
    }
    return (
        <Portal>
            <ModalContainer visible={props.visible} onDismiss={() => props.setVisible(!props.visible)}>
                <AddWaterContainer>
                    <InputWithTagComponent colorTag='red' onChangeText={setTextAddWater} placeholder={t('Amount of water')} value={textAddWater} tagText='ml' />
                    <ButtonComponent onPress={onPressEdit} title={t('Add water')} color={Colors.color.blue} />
                </AddWaterContainer>
            </ModalContainer>
        </Portal>
    )
}