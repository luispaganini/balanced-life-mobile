import { Colors } from "@/constants/Colors";
import { ColorSchemeName, Dimensions, View } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get('window').width;
export const CardContainer = styled.TouchableOpacity<{ themed: ColorSchemeName }>`
    background-color: ${(props) => props.themed === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 12px;
    padding: 12px;
    margin-top: 10px;
    border-width: 1px;
    border-color: ${(props) => props.themed === 'light' ? Colors.light.border : Colors.dark.border};
    width: 90%;
    align-self: center;
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
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.themed === 'light' ? Colors.light.border : Colors.dark.border};
    padding-left: 10px;
`;

export const CardDescription = styled.Text<{ themed: ColorSchemeName }>`
    font-size: 16px;
    color: ${(props) => props.themed === 'light' ? Colors.color.black : Colors.dark.text};
    margin-top: 10px;
    align-self: center;
    width: 90%;
    padding-left: 10px;
`;