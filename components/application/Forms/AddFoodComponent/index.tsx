import React from 'react'
import { AddFoodContainer,  } from './styles'
import InputWithTagComponent from '../../Inputs/InputWithTagComponent'
import ButtonComponent from '../ButtonComponent'
import { Colors } from '@/constants/Colors'
import { useTranslation } from 'react-i18next'

export default function AddFoodComponent() {
    const { t } = useTranslation()
    const [quantity, setQuantity] = React.useState('')
    return (
        <AddFoodContainer>
            <InputWithTagComponent colorTag={Colors.color.red} onChangeText={setQuantity} placeholder={t('Quantity')} tagText='g' value={quantity} />
            <ButtonComponent color={Colors.color.blue} onPress={() => { }} title={t('Add food')} />
        </AddFoodContainer>
    )
}