import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const InputWithTagContainer = styled.View<{ theme: ColorSchemeName}>`
    flex-direction: row;
    align-items: center;
    border-color: ${(props) => props.theme == "light" ? Colors.light.border : Colors
        .dark.border};
    border-width: 1px;
    border-radius: 5px;
    color: ${Colors.color.black};
    background-color: ${Colors.color.white};
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
    width: 90%;
    align-self: center;
`;

export const TextContainer = styled(ThemedText)<{ color: string }>`
    font-weight: bold;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
    border-width: 1px;
    border-color: ${(props) => props.color};
    color: ${(props) => props.color};
`;

export const TextInputComponent = styled.TextInput`
    padding: 10px;
    flex: 1
`;