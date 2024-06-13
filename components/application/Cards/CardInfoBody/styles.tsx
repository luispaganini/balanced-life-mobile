import { Colors } from "@/constants/Colors";
import { ColorSchemeName, Dimensions, View } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get('window').width;
export const CardContainer = styled.View<{ themed: ColorSchemeName }>`
    background-color: ${Colors.color.white};
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    border-width: 1px;
    border-color: ${(props) => props.themed == 'light' ? Colors.light.border : Colors.dark.border};
    width: ${width / 2.5}px;
`;

export const CardContent = styled.View`
    justify-content: space-between;
    align-items: center;
`;

export const CardTitle = styled.Text`
    font-size: 16px;
    color: ${Colors.color.darkBlue};
`;

export const CardChildren = styled.View`
    width: 90%;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.color.darkBlue};
`;

export const CardDescription = styled.Text`
    font-size: 16px;
    color: ${Colors.color.darkBlue};
    margin-top: 10px;
`;