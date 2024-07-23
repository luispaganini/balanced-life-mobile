import React, { useEffect } from 'react'
import { MenuContainer, PageContainer } from './styles'
import CardRedirect from '@/components/application/Cards/CardRedirect'
import { useTranslation } from 'react-i18next'
import { Colors } from '@/constants/Colors';
import { Button } from 'react-native-paper';
import useTokenStore from '@/store/TokenStore';
import { setupTokenRefresh } from '@/services/login/refreshToken';

export default function HomePage() {
    const { t } = useTranslation();
    const { clearTokens } = useTokenStore();

    useEffect(() => {
        setupTokenRefresh();
      }, []);

    return (
        <PageContainer>
            <MenuContainer>
                <CardRedirect color={Colors.color.purple} title={t('Nutritionist')} img={require('@/assets/images/nutritionist.png')} route='/'/>
                <CardRedirect color={Colors.color.lightPurple} title={t('Schedule Appointment')} img={require('@/assets/images/clipboard.png')} route='/'/>
                <CardRedirect color={Colors.color.green} title={t('My Body')} img={require('@/assets/images/fit.png')} route='/body/'/>
                <CardRedirect color={Colors.color.lightBlue} title={t('Meals')} img={require('@/assets/images/meals.png')} route='/snack/'/>
            </MenuContainer>
            <Button onPress={() => clearTokens()}>Logout</Button>
        </PageContainer>
    )
}