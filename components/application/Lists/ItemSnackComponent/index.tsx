import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { EditIcon, IconsContainer, ItemContainer, TextItem } from './styles';
import StatusMeal from '@/enums/StatusMeal';

type ItemSnackComponentProps = {
    id: number;
    quantity: number;
    unitMeasurement: string;
    status: StatusMeal;
    name: string
    onPressEdit: () => void
    onPressDelete: () => void
}

export default function ItemSnackComponent(props: ItemSnackComponentProps) {
    const theme = useColorScheme();
    return (
        <ItemContainer>
            <TextItem numberOfLines={2} ellipsizeMode='tail'>• {props.quantity}{props.unitMeasurement} {props.name}</TextItem>
            {props.status == StatusMeal.NotAwnsered &&
                <IconsContainer>
                    <TouchableOpacity onPress={props.onPressEdit}>
                        <EditIcon name="pencil-sharp" size={24} color={theme == 'light' ? Colors.light.text : Colors.dark.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onPressDelete}>
                        <Ionicons name="trash-outline" size={24} color={theme == 'light' ? Colors.light.text : Colors.dark.text} />
                    </TouchableOpacity>
                </IconsContainer>
            }
        </ItemContainer>
    )
}