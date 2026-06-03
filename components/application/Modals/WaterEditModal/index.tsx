import React from 'react'
import { Modal, Portal } from 'react-native-paper'
import { AddWaterContainer, TitleModal } from './styles';
import InputWithTagComponent from '../../Inputs/InputWithTagComponent';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/Colors';
import ButtonComponent from '../../Forms/ButtonComponent';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';

type WaterEditModalProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onPress: (value: number) => void;
}

export default function WaterEditModal(props: WaterEditModalProps) {
    const { t } = useTranslation();
    const colorTheme = useColorScheme();
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
            <Modal 
                visible={props.visible} 
                onDismiss={() => props.setVisible(!props.visible)}
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <AddWaterContainer theme={colorTheme}>
                    <TitleModal type='subtitle'>{t('Water goal')}</TitleModal>
                    
                    <View style={{ width: '100%', marginBottom: 10 }}>
                        <InputWithTagComponent 
                            colorTag={Colors.color.blue} 
                            onChangeText={setTextAddWater} 
                            placeholder={t('Water goal')} 
                            value={textAddWater} 
                            tagText='ml' 
                            style={{ width: '100%' }}
                        />
                    </View>
                    
                    <ButtonComponent onPress={onPressEdit} title={t('Apply goal')} color={Colors.color.blue} />
                    <ButtonComponent onPress={() => props.setVisible(false)} title={t('Back')} color={Colors.color.lightRed} />
                </AddWaterContainer>
            </Modal>
        </Portal>
    )
}