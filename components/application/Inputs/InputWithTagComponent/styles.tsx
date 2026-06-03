import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";
import { ThemedText } from "@/components/ThemedText";
import { TextInputMask } from 'react-native-masked-text';

export const InputWithTagWrapper = styled.View`
    width: 90%;
    align-self: center;
    margin-bottom: 10px;
`;

export const TitleInput = styled(ThemedText)`
    font-weight: bold;
    margin-bottom: 5px;
    padding-left: 5px;
`;

export const ErrorText = styled(ThemedText)`
    color: ${Colors.color.red};
    margin-left: 5px;
    margin-top: 3px;
`;

export const InputWithTagContainer = styled.View<{ theme: ColorSchemeName }>`
    flex-direction: row;
    align-items: center;
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    border-width: 1px;
    border-radius: 12px;
    background-color: ${(props) => props.theme === "light" ? Colors.light.card : Colors.dark.background};
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 0px;
    height: 50px;
    overflow: hidden;
    width: 100%;
`;

export const TextContainer = styled.View<{ theme: ColorSchemeName }>`
    background-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    padding-horizontal: 20px;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const TagText = styled.Text<{ theme: ColorSchemeName; color?: string }>`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.color ? props.color : (props.theme === "light" ? Colors.light.text : Colors.dark.text)};
`;

export const TextInputComponent = styled.TextInput<{ theme: ColorSchemeName }>`
    padding-vertical: 12px;
    flex: 1;
    color: ${(props) => props.theme === "light" ? Colors.light.text : Colors.dark.text};
    font-size: 16px;
    font-weight: 600;
`;

export const TextInputMaskComponent = styled(TextInputMask)<{ theme: ColorSchemeName }>`
    padding-vertical: 12px;
    flex: 1;
    color: ${(props) => props.theme === "light" ? Colors.light.text : Colors.dark.text};
    font-size: 16px;
    font-weight: 600;
`;