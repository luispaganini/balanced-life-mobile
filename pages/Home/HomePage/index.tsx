import React, { useEffect } from 'react'
import { MenuContainer, PageContainer } from './styles'
import CardRedirect from '@/components/application/Cards/CardRedirect'
import { useTranslation } from 'react-i18next'
import { Colors } from '@/constants/Colors';
import { setupTokenRefresh } from '@/services/login/refreshToken';
import { getNutritionistByLink } from '@/services/user/user';
import { Alert, Linking } from 'react-native';

export default function HomePage() {
    const { t } = useTranslation();


    useEffect(() => {
        setupTokenRefresh();
    }, []);

    const getNutritionist = async () => {
        try {
            const response = await getNutritionistByLink();

            if (response.status === 200) {
                const formattedNumber = response.data.phoneNumber.replace(/\D/g, '');
                Linking.openURL(`tel:${formattedNumber}`).catch(err => console.error("Couldn't open dialer", err));
            } else if (response.status == 204) 
                Alert.alert(t('Error'), t('Nutritionist not found, verify if exists a nutritionist linked to your account'));
            
        } catch (error: any) {
            Alert.alert(t('Error'), t('An error occurred, try again later'));
        }
    }

    return (
        <PageContainer>
            <MenuContainer>
                <CardRedirect color={Colors.color.purple} title={t('Nutritionist')} img={require('@/assets/images/nutritionist.png')} route='/nutritionist' />
                <CardRedirect color={Colors.color.lightPurple} title={t('Schedule Appointment')} img={require('@/assets/images/clipboard.png')} route='/' onPress={getNutritionist} />
                <CardRedirect color={Colors.color.green} title={t('My Body')} img={require('@/assets/images/fit.png')} route='/body/' />
                <CardRedirect color={Colors.color.lightBlue} title={t('Meals')} img={require('@/assets/images/meals.png')} route='/snack/' />
            </MenuContainer>
        </PageContainer>
    )
}