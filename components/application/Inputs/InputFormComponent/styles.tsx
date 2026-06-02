import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";
import { TextInputMask } from 'react-native-masked-text'
import { ThemedText } from "@/components/ThemedText";

export const TextInputContainer = styled.View`
    width: 90%;
    align-self: center;
    margin-bottom: 10px;
`;

export const TitleInput = styled(ThemedText)`
    font-weight: bold;
    margin-bottom: 5px;
    padding-left: 5px;
`;

export const TextInputComponent = styled.TextInput<{ theme: ColorSchemeName; isFocused: boolean }>`
    border-color: ${(props) => props.isFocused ? '#00B38C' : (props.theme == "light" ? '#D1D5DB' : '#4B5563')};
    border-width: 1px;
    border-radius: 12px;
    color: ${(props) => props.theme == "light" ? Colors.color.black : Colors.dark.text};
    background-color: ${(props) => props.theme == "light" ? '#FFFFFF' : '#111827'};
    padding: 12px;
`;

export const TextInputComponentWithMask = styled(TextInputMask)<{ theme: ColorSchemeName; isFocused: boolean }>`
    border-color: ${(props) => props.isFocused ? '#00B38C' : (props.theme == "light" ? '#D1D5DB' : '#4B5563')};
    border-width: 1px;
    border-radius: 12px;
    color: ${(props) => props.theme == "light" ? Colors.color.black : Colors.dark.text};
    background-color: ${(props) => props.theme == "light" ? '#FFFFFF' : '#111827'};
    padding: 12px;
`;

export const ErrorText = styled(ThemedText)`
    color: ${Colors.color.red};
    margin-left: 5px;
`;