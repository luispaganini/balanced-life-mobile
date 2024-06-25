import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaViewComponent } from '@/styles/pages'
import { CardsInfoBody, ChartContainer, ImageContainer, Loading, NoDataFound, PageContainer } from './styles'
import { LineChart } from 'react-native-chart-kit';
import { useColorScheme } from '@/hooks/useColorScheme';
import CardInfoBody from '@/components/application/Cards/CardInfoBody';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { Colors } from '@/constants/Colors';
import useUserStore from '@/store/UserStore';
import IUserInterface from '@/interfaces/User/IUserInterface';
import { calculateAge, calculateBMI } from '@/utils/functionsUser';
import { router } from 'expo-router';
import { IBodyDataInterface } from '@/interfaces/Body/IBodyDataInterface';
import { getLastFourBodyData } from '@/services/body/body';
import { chartConfig } from '@/constants/charts/chartConfig';

const screenWidth = Dimensions.get("window").width;

export default function MyBodyPage() {
    const colorTheme = useColorScheme();
    const { user } = useUserStore() as { user: IUserInterface };
    const { t } = useTranslation();
    const [loadingPage, setLoadingPage] = React.useState(true);
    const [height, setHeight] = React.useState(0);
    const [weight, setWeight] = React.useState(0);
    const [bodyData, setBodyData] = React.useState([] as IBodyDataInterface[]);

    useEffect(() => {
        const fetchData = async () => await getBodyData();

        fetchData();
    }, []);

    const getBodyData = async () => {
        setLoadingPage(true);
        try {
            const response = await getLastFourBodyData(user.id as number);
            setBodyData(response);
            setHeight(response[response.length - 1].height);
            setWeight(response[response.length - 1].weight);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingPage(false);
        }
    }

    const sortedBodyData = bodyData.sort((a, b) => new Date(a.datetime as Date).getTime() - new Date(b.datetime as Date).getTime());

    const data = {
        labels: sortedBodyData.length ? bodyData.map(item => new Date(item.datetime as Date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })) : [""],
        datasets: [
            {
                data: sortedBodyData.length ? bodyData.map(item => item.weight) : [0],
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
        <PageContainer>
            <ScrollView>
                <ImageContainer source={images[colorTheme == 'light' ? 'light' : 'dark']} />
                {loadingPage ? (
                    <Loading size="large" color={Colors.color.cyan} />
                ) : (
                    <View>
                        {bodyData.length > 0 ? (
                            <View>
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
                                    <CardInfoBody title={t('Weight')} description={weight.toFixed(2) + ' kg'} />
                                    <CardInfoBody title={t('Height')} description={height.toFixed(2) + ' m'} />
                                    <CardInfoBody title={t('BMI')} description={calculateBMI(weight, height) + ' kg/m²'} />
                                    <CardInfoBody title={t('Age')} description={calculateAge(new Date(user.birth as string)) + ' anos'} />
                                </CardsInfoBody>
                            </View>
                        ) : (
                            <NoDataFound>{t('No data found')}</NoDataFound>
                        )}
                        <ButtonComponent title={t('Update body data')} onPress={() => router.navigate('body/add-body-data')} color={Colors.color.blue} />
                    </View>
                )}
            </ScrollView>
        </PageContainer>
    )
}