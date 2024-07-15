import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const CardFoodContainer = styled.TouchableOpacity<{ theme: ColorSchemeName}>`
    background-color: ${(props) => Colors[props.theme as "light" | "dark"].card};
    border-radius: 5px;
    border-width: 1px;
    border-color: ${(props) => Colors[props.theme as "light" | "dark"].border};
    padding: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const TableInfo = styled.View`
    border-width: 1px;
    padding: 5px;
    border-radius: 5px;
    border-color: ${Colors.color.grey};
`;

export const CardFoodText = styled.Text`
    color: ${Colors.color.black};
    flex-wrap: wrap;
    flex-shrink: 1;
    font-weight: 500;
    padding-right: 10px;
`;
