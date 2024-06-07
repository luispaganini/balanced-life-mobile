import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";
import { TextInputMask } from 'react-native-masked-text'

export const TextInputContainer = styled.View`
    width: 90%;
    align-self: center;
    margin-bottom: 10px;
`;

export const TextInputComponent = styled.TextInput<{ theme: ColorSchemeName}>`
    border-color: ${(props) => props.theme == "light" ? Colors.light.border : Colors.dark.border};
    border-width: 1px;
    border-radius: 5px;
    color: ${Colors.color.black};
    background-color: ${Colors.color.white};
    padding: 10px;

`;

export const TextInputComponentWithMask = styled(TextInputMask)<{ theme: ColorSchemeName}>`
    border-color: ${(props) => props.theme == "light" ? Colors.light.border : Colors.dark.border};
    border-width: 1px;
    border-radius: 5px;
    color: ${Colors.color.black};
    background-color: ${Colors.color.white};
    padding: 10px;
`;