import React from 'react'
import { ColorSchemeName } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import InputWithTagComponent from '@/components/application/Inputs/InputWithTagComponent'
import { useTranslation } from 'react-i18next'
import {
    CustomInputCard,
    InputRow,
    InputWrapper,
    AddButton,
    RemoveButton
} from '../styles'

type WaterCustomInputProps = {
    colorTheme: ColorSchemeName;
    textAddWater: string;
    setTextAddWater: (val: string) => void;
    onAddPress: () => void;
    onRemovePress: () => void;
}

export default function WaterCustomInput({
    colorTheme,
    textAddWater,
    setTextAddWater,
    onAddPress,
    onRemovePress
}: WaterCustomInputProps) {
    const { t } = useTranslation();

    return (
        <CustomInputCard theme={colorTheme}>
            <InputRow>
                <InputWrapper>
                    <InputWithTagComponent 
                        colorTag={Colors.color.blue} 
                        onChangeText={setTextAddWater} 
                        placeholder={t('Amount of water')} 
                        value={textAddWater} 
                        tagText='ml' 
                        style={{ width: '100%' }}
                    />
                </InputWrapper>
                <AddButton onPress={onAddPress} testID="add-water-btn">
                    <Ionicons name="add" size={24} color={Colors.color.white} />
                </AddButton>
                <RemoveButton onPress={onRemovePress} testID="remove-water-btn">
                    <Ionicons name="remove" size={24} color={Colors.color.white} />
                </RemoveButton>
            </InputRow>
        </CustomInputCard>
    );
}
