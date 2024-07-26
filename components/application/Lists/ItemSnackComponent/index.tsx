import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { IconButtonComponent, IconsContainer, ItemContainer, TextItem } from './styles';
import StatusMeal from '@/enums/StatusMeal';
import { IconButton } from 'react-native-paper';

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
                    <IconButtonComponent onPress={props.onPressEdit} size={24} iconColor={theme == 'light' ? Colors.light.text : Colors.dark.text} icon='pencil' />
                    <IconButtonComponent onPress={props.onPressDelete} size={24} iconColor={theme == 'light' ? Colors.light.text : Colors.dark.text} icon='trash-can'/>
                </IconsContainer>
            }
        </ItemContainer>
    )
}