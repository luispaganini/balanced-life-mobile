import { Colors } from "@/constants/Colors";
import { ColorSchemeName, Dimensions, View } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get('window').width;
export const CardContainer = styled.View<{ themed: ColorSchemeName }>`
    background-color: ${(props) => props.themed === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 12px;
    padding: 12px;
    margin: 10px;
    border-width: 1px;
    border-color: ${(props) => props.themed === 'light' ? Colors.light.border : Colors.dark.border};
    width: ${width / 2.5}px;
`;

export const CardContent = styled.View`
    justify-content: space-between;
    align-items: center;
`;

export const CardTitle = styled.Text<{ themed: ColorSchemeName }>`
    font-size: 16px;
    color: ${(props) => props.themed === 'light' ? Colors.color.black : Colors.dark.text};
`;

export const CardChildren = styled.View<{ themed: ColorSchemeName }>`
    width: 90%;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.themed === 'light' ? Colors.light.border : Colors.dark.border};
`;

export const CardDescription = styled.Text<{ themed: ColorSchemeName }>`
    font-size: 16px;
    color: ${(props) => props.themed === 'light' ? Colors.color.black : Colors.dark.text};
    margin-top: 10px;
`;