import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const AddWaterContainer = styled.View<{ theme: ColorSchemeName }>`
    padding-top: 24px;
    padding-bottom: 24px;
    padding-horizontal: 20px;
    border-radius: 16px;
    border-width: 1px;
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    background-color: ${(props) => props.theme === "light" ? Colors.light.card : Colors.dark.card};
    width: 90%;
    max-width: 360px;
    align-self: center;
`;

export const TitleModal = styled(ThemedText)`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;