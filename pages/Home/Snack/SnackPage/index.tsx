import React from 'react'
import { PageContainer, TitleText } from './styles'
import { PieChart } from 'react-native-chart-kit';
import { Dimensions, ScrollView, View } from 'react-native';
import { getDataPieChart } from '@/constants/charts/dataPieChart';
import { chartConfig } from '@/constants/charts/chartConfig';
import { Colors } from '@/constants/Colors';
import DatePickerComponent from '@/components/application/Dates/DatePickerComponent';
import CardSnack from '@/components/application/Cards/CardSnack';

export default function SnackPage() {
    const screenWidth = Dimensions.get("window").width;
    const [date, setDate] = React.useState(new Date());

    const data = [
        { nameKey: "Carbohydrates", population: 2500, color: Colors.color.orange },
        { nameKey: "Protein", population: 2500, color: Colors.color.red },
        { nameKey: "Fat", population: 2500, color: Colors.color.green },
        { nameKey: "Others", population: 2500, color: Colors.color.blue },
    ];
    
    const pieChartData = getDataPieChart(data);
    return (
        <PageContainer>
            <ScrollView>
                <PieChart
                    data={pieChartData}
                    width={screenWidth}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"0"}
                />
                <TitleText type='title'>2895 Cal</TitleText>
                <DatePickerComponent onChange={setDate} value={date}/>
                <CardSnack title="Breakfast" description="Oatmeal, Milk, Banana"/>
            </ScrollView>
        </PageContainer>
    )
}