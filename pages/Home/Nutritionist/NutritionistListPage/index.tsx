import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import CardNutritionist from '@/components/application/Cards/CardNutritionist'
import { getNutritionistList } from '@/services/user/user'
import INutritionistListInterface from '@/interfaces/User/INutritionistListInterface'
import { FlatList } from 'react-native'
import { router } from 'expo-router'
import { useNutritionistStore } from '@/store/NutritionistStore'
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent'
import { PageContainer } from './styles'

export default function NutritionistListPage() {
    const [nutritionists, setNutritionists] = useState<Array<INutritionistListInterface>>([])
    const [loading, setLoading] = useState(true)

    const { nutritionistSelected, setNutritionistSelected } = useNutritionistStore()
    useEffect(() => {
        async function getNutritionists() {
            try {
                const response = await getNutritionistList()
    
                if (response.status !== 200)
                    return;
    
                setNutritionists(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getNutritionists()
    }, [nutritionistSelected])

    const onSelectNutritionist = (nutri: INutritionistListInterface) => {
        setNutritionistSelected(nutri)
        router.navigate(`/nutritionist/${nutri.nutritionist.id}`)
    }

    return (
        <PageContainer>
            {loading ? (
                <LoadingPageComponent />
            ) : (
                <FlatList
                    data={nutritionists}
                    renderItem={({ item }) => <CardNutritionist
                        onPress={onSelectNutritionist}
                        nutri={item} />}
                    keyExtractor={item => item.link.id.toString()}
                />
            )}

        </PageContainer>
    )
}