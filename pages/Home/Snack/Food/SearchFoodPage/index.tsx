import React, { useEffect } from 'react'
import { Searchbar } from 'react-native-paper'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ContentPage, ListFoodContainer, SearchFoodContainer } from './styles';
import CardFood from '@/components/application/Cards/CardFood';
import { FlatList } from 'react-native';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { router, useLocalSearchParams } from 'expo-router';
import { useFoodStore } from '@/store/FoodStore';
import { findFoodBySearch } from '@/services/snack/food';
import LoadingMoreComponent from '@/components/application/Lists/LoadingMoreComponent';
import NoDataComponent from '@/components/application/Lists/NoDataComponent';
import IFoodInterface from '@/interfaces/Snack/Food/IFoodInterface';

export default function SearchFoodPage() {
    const QUANTITY_RESULTS = 10;
    const [searchQuery, setSearchQuery] = React.useState('');
    const theme = useColorScheme();
    const { idMeal, idTypeSnack } = useLocalSearchParams()
    const foodStore = useFoodStore();
    const [foods, setFoods] = React.useState<Array<IFoodInterface>>([]);

    useEffect(() => {
        foodStore.setLoading(false);
        if (searchQuery !== '')
            loadData();
        else {
            setFoods([]);
            foodStore.noDataFound = false;
        }
        
    }, [searchQuery]);
    
    const loadData = async () => {
        try {
            setFoods([]);
            foodStore.noDataFound = false;
            foodStore.setLoading(true);
            const foodList = await findFoodBySearch(searchQuery, 1);
            setFoods(foodList);
            foodStore.setHasMore(foodList.length === QUANTITY_RESULTS);
            if (foodList.length == 0)
                foodStore.noDataFound = true;
        } catch (error) {
            console.error(error);
        } finally {
            foodStore.setPage(2);
            foodStore.setLoading(false);
        }
    }

    const loadMoreData = async () => {
        foodStore.setLoading(false)
        if (foodStore.loadingMore || !foodStore.hasMore || foods.length == 0) return;

        foodStore.setLoadingMore(true);
        try {
            const foodList = await findFoodBySearch(searchQuery, foodStore.page);
            setFoods(prevData => [...prevData, ...foodList]);
            foodStore.setPage(foodStore.page + 1);
            foodStore.setHasMore(foodList.length === QUANTITY_RESULTS);
        } catch (error) {
            console.error(error);
        } finally {
            foodStore.setLoadingMore(false);
        }
    };

    const renderFooter = () => {
        if (!foodStore.loadingMore) return null;

        return <LoadingMoreComponent />
    };

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
                        renderItem={({ item }) => <CardFood id={item.id} name={item.name} table={item.referenceTable} onPress={foodDetailsRedirect} />}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.2}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={foodStore.noDataFound ? () => <NoDataComponent onPress={loadData} /> : null}
                        onRefresh={loadData}
                        refreshing={foodStore.loading}
                    />
                </ListFoodContainer>
            </ContentPage>
            <ButtonComponent color={Colors.color.green} onPress={() => { }} title='Add custom food' />
        </SearchFoodContainer>
    )
}