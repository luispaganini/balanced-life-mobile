import React from 'react'
import { AddFoodContainer,  } from './styles'
import InputWithTagComponent from '../../Inputs/InputWithTagComponent'
import ButtonComponent from '../ButtonComponent'
import { Colors } from '@/constants/Colors'
import { useTranslation } from 'react-i18next'

type AddFoodComponentProps = {
    onPress: () => void,
    quantity: string,
    setQuantity: (quantity: string) => void
}

export default function AddFoodComponent(props: AddFoodComponentProps) {
    const { t } = useTranslation()
    return (
        <AddFoodContainer>
            <InputWithTagComponent colorTag={Colors.color.red} onChangeText={props.setQuantity} placeholder={t('Quantity')} tagText='g' value={props.quantity} />
            <ButtonComponent color={Colors.color.blue} onPress={props.onPress} title={t('Add food')} />
        </AddFoodContainer>
    )
}