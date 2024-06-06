import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const TextInputContainer = styled.View`
    width: 90%;
    align-self: center;
`;

export const TextInputComponent = styled.TextInput<{ theme: ColorSchemeName}>`
    border-color: ${(props) => props.theme == "light" ? Colors.light.border : Colors.dark.border};
    border-width: 1;
    border-radius: 5px;
    color: ${Colors.color.black};
    background-color: ${Colors.color.white};
    padding: 10px;
`;