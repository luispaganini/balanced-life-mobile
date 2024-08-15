import { Dimensions } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { ImageContainer, InfoContainer, PageContainer } from './styles'
import ProfileInfoComponent from '@/components/application/Lists/ProfileInfoComponent'
import { useTranslation } from 'react-i18next'
import { formatToBr } from '@/utils/functionsApp'
import { useNutritionistStore } from '@/store/NutritionistStore'

export default function NutritionistPage() {
    const colorScheme = useColorScheme();
    const { nutritionistSelected } = useNutritionistStore();
    const { t } = useTranslation()
    const widthPage = Dimensions.get('window').width;
    return (
        <PageContainer>
            <ImageContainer>
                <Icon size={widthPage / 3} source="account-circle-outline" color={Colors[colorScheme ?? 'light'].border} />
            </ImageContainer>
            <InfoContainer>
                <ProfileInfoComponent title={t('Name')} description={nutritionistSelected.nutritionist.name as string} />
                <ProfileInfoComponent title={'E-mail'} description={nutritionistSelected.nutritionist.email as string} />
                <ProfileInfoComponent title={t('Number')} description={nutritionistSelected.nutritionist.phoneNumber as string} />
                <ProfileInfoComponent title={t('Gender')} description={nutritionistSelected.nutritionist.gender as string} />
                <ProfileInfoComponent title={t('Birthdate')} description={formatToBr(nutritionistSelected.nutritionist.birth as Date)} />
            </InfoContainer>
        </PageContainer>
    )
}