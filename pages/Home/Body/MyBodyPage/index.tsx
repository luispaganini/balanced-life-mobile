import { View, Text, SafeAreaView, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { CardsInfoBody, ChartContainer, ImageContainer, PageContainer } from './styles'
import { LineChart } from 'react-native-chart-kit';
import { useColorScheme } from '@/hooks/useColorScheme';
import CardInfoBody from '@/components/application/Cards/CardInfoBody';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { Colors } from '@/constants/Colors';
import useUserStore from '@/store/UserStore';
import IUserInterface from '@/interfaces/IUserInterface';
import { calculateAge } from '@/utils/functionsUser';
const screenWidth = Dimensions.get("window").width;

export default function MyBodyPage() {
    const colorTheme = useColorScheme();
    const { user } = useUserStore() as { user: IUserInterface };
    const { t } = useTranslation();
    const chartConfig = {
        color: (opacity = 1) => `rgba(0,9,48, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    const data = {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
        datasets: [
            {
                data: [30, 45, 28, 25],
                color: (opacity = 1) => `rgba(50, 65, 244, ${opacity})`,
            }
        ],
        legend: [t('Weight')]
    };
    const images = {
        light: require('@/assets/images/fullbody-light.png'),
        dark: require('@/assets/images/fullbody.png'),
    };
    return (
        <SafeAreaViewComponent>
            <PageContainer>
                <ScrollView>
                    <ImageContainer source={images[colorTheme == 'light' ? 'light' : 'dark']} />
                    <ChartContainer theme={colorTheme}>
                        <LineChart
                            data={data}
                            width={screenWidth / 1.1}
                            height={180}
                            chartConfig={chartConfig}
                            transparent={true}
                        />
                    </ChartContainer>
                    <CardsInfoBody>
                        <CardInfoBody title={t('Weight')} description='69,20 kg' />
                        <CardInfoBody title={t('Height')} description='1,70 m' />
                        <CardInfoBody title={t('BMI')} description='69,20 kg/m²' />
                        <CardInfoBody title={t('Age')} description={calculateAge(new Date(user.birth as string)) + ' anos'} />
                    </CardsInfoBody>
                    <ButtonComponent title={t('Update body data')} onPress={() => { }} color={Colors.color.blue} />
                </ScrollView>
            </PageContainer>

        </SafeAreaViewComponent>
    )
}