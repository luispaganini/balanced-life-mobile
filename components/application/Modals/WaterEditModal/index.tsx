import React from 'react'
import { Modal, View, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { AddWaterContainer, TitleModal } from './styles';
import InputWithTagComponent from '../../Inputs/InputWithTagComponent';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/Colors';
import ButtonComponent from '../../Forms/ButtonComponent';
import { useColorScheme } from '@/hooks/useColorScheme';

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
        <Modal
            visible={props.visible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => props.setVisible(false)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.overlay}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardAvoid}
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
                                    keyboardType="numeric"
                                />
                            </View>
                            
                            <ButtonComponent onPress={onPressEdit} title={t('Apply goal')} color={Colors.color.blue} />
                            <ButtonComponent onPress={() => props.setVisible(false)} title={t('Back')} color={Colors.color.lightRed} />
                        </AddWaterContainer>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    keyboardAvoid: {
        width: '100%',
        alignItems: 'center',
    }
});