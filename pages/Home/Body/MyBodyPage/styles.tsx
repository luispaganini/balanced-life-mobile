import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ColorSchemeName, Dimensions } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const PageContainer = styled(ThemedView)`
    flex: 1;
`;

export const ImageContainer = styled.Image`
    width: ${width * 0.3}px;
    height: ${height * 0.2}px;
    align-self: center;
    margin-top: 20px;
`;

export const ChartContainer = styled.View<{theme: ColorSchemeName}>`
    background-color: ${Colors.color.white};
    border-radius: 10px;
    border-width: 1px;
    border-color: ${(props) => props.theme == 'light' ? Colors.light.border : Colors.dark.border};
    margin: 0 10px;
    margin-top: 20px;
`;

export const CardsInfoBody = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
`;

export const Loading = styled.ActivityIndicator`
    margin-top: ${height / 2 - (height * 0.2)}px;
`;

export const NoDataFound = styled(ThemedText)`
    text-align: center;
    margin-top: 70px;
    margin-bottom: 30px;
    font-size: 25px;
    font-weight: bold;
`;

export const BodyContainer = styled.View`
    margin-bottom: 20px;
`;