import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const CardFoodContainer = styled.TouchableOpacity<{ theme: ColorSchemeName}>`
    background-color: ${(props) => Colors[props.theme as "light" | "dark"].card};
    border-radius: 12px;
    border-width: 1px;
    border-color: ${(props) => Colors[props.theme as "light" | "dark"].border};
    padding: 12px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const TableInfo = styled.View`
    border-width: 1px;
    padding: 4px 8px;
    border-radius: 8px;
    border-color: ${Colors.color.grey};
`;
