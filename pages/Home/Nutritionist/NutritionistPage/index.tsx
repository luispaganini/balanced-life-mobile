import { Dimensions } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { ImageContainer, InfoContainer, PageContainer } from './styles'
import ProfileInfoComponent from '@/components/application/Lists/ProfileInfoComponent'
import { useTranslation } from 'react-i18next'
import { formatToBr } from '@/utils/functionsApp'
import useUserStore from '@/store/UserStore'
import IUserInterface from '@/interfaces/User/IUserInterface'

export default function NutritionistPage() {
    const colorScheme = useColorScheme();
    const { user } = useUserStore() as { user: IUserInterface };
    const { t } = useTranslation()
    const widthPage = Dimensions.get('window').width;
    return (
        <PageContainer>
            <ImageContainer>
                <Icon size={widthPage / 3} source="account-circle-outline" color={Colors[colorScheme ?? 'light'].border} />
            </ImageContainer>
            <InfoContainer>
                <ProfileInfoComponent title={'E-mail'} description={user.email as string} />
                <ProfileInfoComponent title={t('Number')} description={user.phoneNumber as string} />
                <ProfileInfoComponent title={t('Gender')} description={user.gender as string} />
                <ProfileInfoComponent title={t('Birthdate')} description={formatToBr(user.birth as Date)} />
            </InfoContainer>
        </PageContainer>
    )
}