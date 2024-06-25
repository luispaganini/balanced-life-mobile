import { Colors } from "@/constants/Colors";
import { ColorSchemeName, Dimensions, View } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get('window').width;
export const CardContainer = styled.TouchableOpacity<{ themed: ColorSchemeName }>`
    background-color: ${Colors.light.background};
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    border-width: 1px;
    border-color: ${(props) => props.themed == 'light' ? Colors.light.border : Colors.dark.border};
    width: 90%;
    align-self: center;
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
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.color.darkBlue};
    padding-left: 10px;
`;

export const CardDescription = styled.Text`
    font-size: 16px;
    color: ${Colors.color.darkBlue};
    margin-top: 10px;
    align-self: center;
    width: 90%;
    padding-left: 10px;
`;