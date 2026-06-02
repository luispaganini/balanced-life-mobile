import { Colors } from "@/constants/Colors";
import { ColorSchemeName, Dimensions } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get('window').width;

export const CardRedirectContainer = styled.TouchableOpacity<{ theme: ColorSchemeName }>`
    width: ${width / 2.35}px;
    background-color: ${props => props.theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 12px;
    border-width: 1px;
    border-color: ${props => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
    padding: 20px 10px;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    min-height: 120px;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.05;
    shadow-radius: 4px;
    elevation: 2;
`;

export const IconCircle = styled.View<{ bgColor: string }>`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: ${props => props.bgColor}26; /* 15% opacity */
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
`;

export const TextContainer = styled.Text<{ theme: ColorSchemeName }>`
    color: ${props => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
    font-size: 15px;
    font-weight: 600;
    text-align: center;
`;
