import { Colors } from "@/constants/Colors";
import { ColorSchemeName, Dimensions } from "react-native";
import styled from "styled-components/native";

export const CardContainer = styled.View<{ themed: ColorSchemeName }>`
    background-color: ${(props) => props.themed === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 16px;
    padding: 16px;
    margin: 8px;
    border-width: 1px;
    border-color: ${(props) => props.themed === 'light' ? Colors.light.border : Colors.dark.border};
    width: 44%;
    align-items: center;
    justify-content: center;
`;

export const CardContent = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const CardChildren = styled.View<{ themed: ColorSchemeName }>`
    width: 100%;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.themed === 'light' ? Colors.light.border : Colors.dark.border};
    padding-bottom: 8px;
`;

export const IconWrapper = styled.View`
    margin-bottom: 6px;
`;

export const CardTitle = styled.Text<{ themed: ColorSchemeName }>`
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.themed === 'light' ? '#6B7280' : '#9CA3AF'};
    text-align: center;
`;

export const CardDescription = styled.Text<{ themed: ColorSchemeName }>`
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.themed === 'light' ? Colors.color.black : Colors.dark.text};
    margin-top: 10px;
    text-align: center;
`;