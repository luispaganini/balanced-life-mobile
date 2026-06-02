import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ColorSchemeName, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const PageContainer = styled.TouchableOpacity<{ theme: ColorSchemeName}>`
    border-radius: 12px;
    padding: 12px;
    margin: 10px;
    flex-direction: row;
    align-items: center;
    background-color: ${({theme}) => theme === 'light' ? Colors.light.card : Colors.dark.card};
    border: 1px solid ${({theme}) => theme === 'light' ? Colors.light.border : Colors.dark.border};
`;

export const DataCard = styled.View`
    flex: 1;
    flex-direction: column;
`;

export const InfoCard = styled.View`
    margin-left: 10px;
    flex: 1;
`;

export const CheckCard = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    align-self: flex-end;
`;