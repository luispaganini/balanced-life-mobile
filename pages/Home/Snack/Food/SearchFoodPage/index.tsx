import React from 'react'
import { Searchbar } from 'react-native-paper'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ContentPage, ListFoodContainer, SearchFoodContainer } from './styles';
import CardFood from '@/components/application/Cards/CardFood';
import { FlatList } from 'react-native';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { IFoodListInterface } from '@/interfaces/Snack/Food/IFoodListInterface';
import { router, useLocalSearchParams } from 'expo-router';

export default function SearchFoodPage() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const theme = useColorScheme();
    const { idMeal, idTypeSnack } = useLocalSearchParams()

    const foods: Array<IFoodListInterface> = [
        { id: 1, name: 'teste asodjasio jdasiojdoasi asiojdioasj asiojdoiasj asiodjasjio djasiodjasioj', table: 'TBCA' },
        { id: 2, name: 'teste asodjas', table: 'TBCA' },
        { id: 3, name: 'teste asodjas', table: 'TBCA' },
        { id: 4, name: 'teste asodjas', table: 'TBCA' },
        { id: 5, name: 'teste asodjas', table: 'TBCA' },
        { id: 6, name: 'teste asodjas', table: 'TBCA' },
        { id: 7, name: 'teste asodjas', table: 'TBCA' },
        { id: 8, name: 'teste asodjas', table: 'TBCA' },
        { id: 9, name: 'teste asodjas', table: 'TBCA' },
        { id: 10, name: 'teste asodjas', table: 'TBCA' }
    ]

    const foodDetailsRedirect = (idFood: number) => router.navigate(`/snack/food/${idMeal}/${idTypeSnack}/${idFood}`)
    
    
    return (
        <SearchFoodContainer>
            <ContentPage>
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    inputStyle={{ color: Colors.color.black }}
                    iconColor={Colors.color.black}
                    placeholderTextColor={Colors.color.grey}
                    style={{ backgroundColor: Colors[theme as "light" | "dark"].card, borderWidth: 1, borderColor: Colors[theme as "light" | "dark"].border }}
                    theme={{ colors: { primary: Colors.color.cyan } }}
                />
                <ListFoodContainer>
                    <FlatList
                        data={foods}
                        renderItem={({ item }) => <CardFood id={item.id} name={item.name} table={item.table} onPress={foodDetailsRedirect} />}
                        keyExtractor={item => item.id.toString()}
                    />
                </ListFoodContainer>
            </ContentPage>
            <ButtonComponent color={Colors.color.green} onPress={() => { }} title='Add custom food' />
        </SearchFoodContainer>
    )
}