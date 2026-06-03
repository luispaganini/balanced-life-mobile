import { Dimensions, View } from 'react-native'
import React, { useEffect } from 'react'
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import {
    PageContainer,
    HeaderContainer,
    HeaderTitle,
    ScrollContainer,
    ImageCard,
    InfoText,
    ChartCard,
    ChartTitle,
    CardsInfoBody,
    Loading,
    NoDataFound,
    BodyContainer,
    ButtonWrapper
} from './styles'


const screenWidth = Dimensions.get("window").width;

export default function MyBodyPage() {
    const colorTheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const { user } = useUserStore() as { user: IUserInterface };
    const { t } = useTranslation();
    const [loadingPage, setLoadingPage] = React.useState(true);
    const [height, setHeight] = React.useState(0);
    const [weight, setWeight] = React.useState(0);
    const [bodyData, setBodyData] = React.useState([] as IBodyDataInterface[]);

    useEffect(() => {
        getBodyData();
    }, []);

    const getBodyData = async () => {
        setLoadingPage(true);
        try {
            const response = await getLastFourBodyData(user.id as number);
            setBodyData(response);
            if (response.length > 0) {
                setHeight(response[response.length - 1].height);
                setWeight(response[response.length - 1].weight);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingPage(false);
        }
    }

    const sortedBodyData = [...bodyData].sort((a, b) => new Date(a.datetime as Date).getTime() - new Date(b.datetime as Date).getTime());

    const data = {
        labels: sortedBodyData.length ? sortedBodyData.map(item => new Date(item.datetime as Date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })) : [""],
        datasets: [
            {
                data: sortedBodyData.length ? sortedBodyData.map(item => item.weight) : [0],
            }
        ]
    };

    const isLight = colorTheme === 'light';
    const cardBgColor = isLight ? Colors.light.card : Colors.dark.card;
    const textColor = isLight ? Colors.light.text : Colors.dark.text;
    const borderColor = isLight ? Colors.light.border : Colors.dark.border;

    // Custom configuration to blend the chart into the card background
    const customChartConfig = {
        backgroundGradientFrom: cardBgColor,
        backgroundGradientTo: cardBgColor,
        decimalPlaces: 1,
        color: (opacity = 1) => Colors.color.blue,
        labelColor: (opacity = 1) => isLight ? '#4B5563' : '#9CA3AF',
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: Colors.color.blue,
        },
        propsForBackgroundLines: {
            stroke: borderColor,
            strokeDasharray: '0', // Solid lines
        },
    };



    return (
        <PageContainer theme={colorTheme} style={{ paddingTop: insets.top }}>
            {/* Custom Header */}
            <HeaderContainer theme={colorTheme}>
                <HeaderTitle theme={colorTheme}>{t('My Body')}</HeaderTitle>
            </HeaderContainer>

            <ScrollContainer showsVerticalScrollIndicator={false}>
                {/* Creative Stats Summary Card */}
                <ImageCard theme={colorTheme}>
                    <Ionicons name="body-outline" size={42} color={Colors.color.blue} style={{ marginBottom: 10 }} />
                    <InfoText theme={colorTheme}>
                        {t('Acompanhe seus dados corporais e veja sua evolução ao longo do tempo.')}
                    </InfoText>
                </ImageCard>

                {loadingPage ? (
                    <Loading size="large" color={Colors.color.green} />
                ) : (
                    <BodyContainer>
                        {bodyData.length > 0 ? (
                            <View>
                                {/* Line Chart Card */}
                                <ChartCard theme={colorTheme}>
                                    <ChartTitle theme={colorTheme}>{t('Histórico de Peso')}</ChartTitle>
                                    <LineChart
                                        data={data}
                                        width={screenWidth - 72}
                                        height={180}
                                        chartConfig={customChartConfig}
                                        transparent={false}
                                        bezier
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16
                                        }}
                                    />
                                </ChartCard>

                                {/* 2x2 Grid of Metrics Cards */}
                                <CardsInfoBody>
                                    <CardInfoBody
                                        title={t('Weight')}
                                        description={weight.toFixed(1) + ' kg'}
                                        iconName="fitness-outline"
                                        iconColor={Colors.color.blue}
                                    />
                                    <CardInfoBody
                                        title={t('Height')}
                                        description={height.toFixed(2) + ' m'}
                                        iconName="resize-outline"
                                        iconColor={Colors.color.purple}
                                    />
                                    <CardInfoBody
                                        title={t('BMI')}
                                        description={calculateBMI(weight, height) + ' kg/m²'}
                                        iconName="speedometer-outline"
                                        iconColor={Colors.color.orange}
                                    />
                                    <CardInfoBody
                                        title={t('Age')}
                                        description={calculateAge(new Date(user.birth as Date)) + ' ' + t('years')}
                                        iconName="calendar-outline"
                                        iconColor={Colors.color.green}
                                    />
                                </CardsInfoBody>
                            </View>
                        ) : (
                            <NoDataFound theme={colorTheme}>{t('No data found')}</NoDataFound>
                        )}

                        {/* Full Width Update Action Button */}
                        <ButtonWrapper>
                            <ButtonComponent
                                title={t('Update body data')}
                                onPress={() => router.push('/body/add-body-data')}
                                color={Colors.color.green}
                            />
                        </ButtonWrapper>
                    </BodyContainer>
                )}
            </ScrollContainer>
        </PageContainer>
    )
}