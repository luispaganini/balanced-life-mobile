import React, { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { Colors } from '@/constants/Colors';
import {
    PageContainer,
    HeaderContainer,
    HeaderButton,
    HeaderTitle,
    ContentPage,
    SearchInputWrapper,
    ListFoodContainer,
} from './styles';
import CardFood from '@/components/application/Cards/CardFood';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { useFoodStore } from '@/store/FoodStore';
import { findFoodBySearch } from '@/services/snack/food';
import LoadingMoreComponent from '@/components/application/Lists/LoadingMoreComponent';
import NoDataComponent from '@/components/application/Lists/NoDataComponent';
import IFoodInterface from '@/interfaces/Snack/Food/IFoodInterface';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SearchFoodPage() {
    const QUANTITY_RESULTS = 10;
    const [searchQuery, setSearchQuery] = useState('');
    const { idMeal, idTypeSnack } = useLocalSearchParams()
    const foodStore = useFoodStore();
    const [foods, setFoods] = useState<Array<IFoodInterface>>([]);
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        foodStore.setLoading(false);
        if (searchQuery !== '') {
            const delayDebounceFn = setTimeout(() => {
                loadData();
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        }
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

    const foodDetailsRedirect = (idFood: number) => router.navigate({
        pathname: "/snack/food/[idMeal]/[idTypeSnack]/[idFood]",
        params: {
            idMeal: idMeal as string,
            idTypeSnack: idTypeSnack as string,
            idFood: idFood.toString()
        }
    })

    return (
        <PageContainer style={{ paddingTop: insets.top }}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Custom Header */}
            <HeaderContainer>
                <HeaderButton onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={26} color={Colors.dark.text} />
                </HeaderButton>
                <HeaderTitle>{t("Buscar Alimento")}</HeaderTitle>
                <View style={{ width: 36 }} />
            </HeaderContainer>

            <ContentPage>
                <SearchInputWrapper>
                    <Searchbar
                        placeholder={t("Pesquisar alimento...")}
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        inputStyle={{ color: Colors.dark.text }}
                        iconColor={Colors.color.green}
                        placeholderTextColor={Colors.color.grey}
                        style={{
                            backgroundColor: Colors.dark.card,
                            borderWidth: 1,
                            borderColor: Colors.dark.border,
                            borderRadius: 12
                        }}
                        theme={{ colors: { primary: Colors.color.green } }}
                    />
                </SearchInputWrapper>

                <ListFoodContainer>
                    {foodStore.loading && foods.length === 0 ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={Colors.color.green} />
                        </View>
                    ) : (
                        <FlatList
                            data={foods}
                            renderItem={({ item }) => (
                                <CardFood
                                    id={item.id as number}
                                    name={item.name}
                                    table={item.referenceTable}
                                    onPress={foodDetailsRedirect}
                                />
                            )}
                            keyExtractor={item => (item.id as number).toString()}
                            onEndReached={loadMoreData}
                            onEndReachedThreshold={0.2}
                            ListFooterComponent={renderFooter}
                            ListEmptyComponent={foodStore.noDataFound ? () => <NoDataComponent onPress={loadData} /> : null}
                            onRefresh={loadData}
                            refreshing={foodStore.loading}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </ListFoodContainer>

                {/* <ActionButton onPress={() => router.push('/snack/food/add')}>
                    <ActionButtonText>{t("Criar Alimento Personalizado")}</ActionButtonText>
                </ActionButton> */}
            </ContentPage>
        </PageContainer>
    )
}