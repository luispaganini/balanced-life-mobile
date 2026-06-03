import React, { useEffect, useState } from 'react'
import CardNutritionist from '@/components/application/Cards/CardNutritionist'
import { getNutritionistList } from '@/services/user/user'
import INutritionistListInterface from '@/interfaces/User/INutritionistListInterface'
import { FlatList, RefreshControl } from 'react-native'
import { router } from 'expo-router'
import { useNutritionistStore } from '@/store/NutritionistStore'
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent'
import { 
    PageContainer, 
    HeaderContainer, 
    HeaderTitle, 
    HeaderIconContainer, 
    EmptyContainer, 
    EmptyText,
    EmptySubtitle
} from './styles'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

export default function NutritionistListPage() {
    const [nutritionists, setNutritionists] = useState<Array<INutritionistListInterface>>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const colorScheme = useColorScheme()
    const insets = useSafeAreaInsets()
    const { t } = useTranslation()

    const { nutritionistSelected, setNutritionistSelected } = useNutritionistStore()

    const getNutritionists = async (showLoadingIndicator = true) => {
        if (showLoadingIndicator) setLoading(true)
        try {
            const response = await getNutritionistList()

            if (response.status === 200 && Array.isArray(response.data)) {
                setNutritionists(response.data)
                
                // Keep the store in sync with whichever nutritionist is marked isCurrentNutritionist
                const current = response.data.find((item) => item.link.isCurrentNutritionist)
                if (current) {
                    setNutritionistSelected(current)
                }
            }
        } catch (error) {
            console.log("Error loading nutritionists:", error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        getNutritionists()
    }, [nutritionistSelected?.link?.idNutritionist])

    const onRefresh = () => {
        setRefreshing(true)
        getNutritionists(false)
    }

    const onSelectNutritionist = (nutri: INutritionistListInterface) => {
        setNutritionistSelected(nutri)
        router.navigate(`/nutritionist/${nutri.nutritionist.id}`)
    }

    const renderEmptyList = () => {
        return (
            <EmptyContainer>
                <Ionicons name="people-outline" size={48} color={Colors.color.grey} />
                <EmptyText>{t('Nenhum nutricionista vinculado')}</EmptyText>
                <EmptySubtitle>{t('Quando você se vincular a um profissional, ele aparecerá aqui.')}</EmptySubtitle>
            </EmptyContainer>
        )
    }

    return (
        <PageContainer theme={colorScheme}>
            {/* Custom Header */}
            <HeaderContainer topInset={insets.top} theme={colorScheme}>
                <HeaderIconContainer>
                    <Ionicons name="nutrition" size={22} color={Colors.color.green} />
                </HeaderIconContainer>
                <HeaderTitle theme={colorScheme}>{t('Nutritionists')}</HeaderTitle>
            </HeaderContainer>

            {loading ? (
                <LoadingPageComponent />
            ) : (
                <FlatList
                    data={nutritionists}
                    renderItem={({ item }) => (
                        <CardNutritionist
                            onPress={onSelectNutritionist}
                            nutri={item} 
                        />
                    )}
                    keyExtractor={item => item.link.id.toString()}
                    contentContainerStyle={nutritionists.length === 0 ? { flex: 1 } : { paddingVertical: 12 }}
                    ListEmptyComponent={renderEmptyList}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh} 
                            colors={[Colors.color.green]} 
                            tintColor={Colors.color.green}
                        />
                    }
                />
            )}
        </PageContainer>
    )
}