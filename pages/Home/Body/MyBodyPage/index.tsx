import { Dimensions, ScrollView, View } from 'react-native';
import React, { useMemo } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import useUserStore from '@/store/UserStore';

import { BodyContainer, CardsInfoBody, ChartContainer, ImageContainer, Loading, NoDataFound, PageContainer } from './styles';
import CardInfoBody from '@/components/application/Cards/CardInfoBody';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { Colors } from '@/constants/Colors';
import { chartConfig } from '@/constants/charts/chartConfig';
import { calculateAge, calculateBMI } from '@/utils/functionsUser';
import { useBodyData } from '@/hooks/body/MyBodyPage/useBodyData';

const screenWidth = Dimensions.get("window").width;
const images = {
  light: require('@/assets/images/fullbody-light.png'),
  dark: require('@/assets/images/fullbody.png'),
};

export default function MyBodyPage() {
  const colorTheme = useColorScheme();
  const { user } = useUserStore();
  const { t } = useTranslation();

  const { bodyData, isLoading } = useBodyData(user?.id ?? undefined);

  const latestData = useMemo(() => {
    if (!bodyData || bodyData.length === 0) return null;
    return bodyData[bodyData.length - 1];
  }, [bodyData]);

  const chartData = useMemo(() => ({
    labels: bodyData.length > 0
      ? bodyData.map(item => new Date(item.datetime as Date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }))
      : [""],
    datasets: [
      {
        data: bodyData.length > 0 ? bodyData.map(item => item.weight) : [0],
        color: (opacity = 1) => `rgba(50, 65, 244, ${opacity})`,
      }
    ],
    legend: [t('Weight')]
  }), [bodyData, t]); 

  if (isLoading) {
    return (
      <PageContainer>
        <Loading size="large" color={Colors.color.cyan} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ScrollView>
        <ImageContainer source={images[colorTheme ?? 'light']} />
        <BodyContainer>
          {bodyData.length > 0 && latestData ? (
            <View>
              <ChartContainer theme={colorTheme}>
                <LineChart
                  data={chartData}
                  width={screenWidth / 1.1}
                  height={180}
                  chartConfig={chartConfig}
                  transparent={true}
                />
              </ChartContainer>
              <CardsInfoBody>
                <CardInfoBody title={t('Weight')} description={`${latestData.weight.toFixed(2)} kg`} />
                <CardInfoBody title={t('Height')} description={`${latestData.height.toFixed(2)} m`} />
                <CardInfoBody title={t('BMI')} description={`${calculateBMI(latestData.weight, latestData.height)} kg/m²`} />
                <CardInfoBody title={t('Age')} description={`${calculateAge(new Date(user!.birth as Date))} ${t('years')}`} />
              </CardsInfoBody>
            </View>
          ) : (
            <NoDataFound>{t('No data found')}</NoDataFound>
          )}
          <ButtonComponent title={t('Update body data')} onPress={() => router.navigate('/body/add-body-data')} color={Colors.color.blue} />
        </BodyContainer>
      </ScrollView>
    </PageContainer>
  );
}