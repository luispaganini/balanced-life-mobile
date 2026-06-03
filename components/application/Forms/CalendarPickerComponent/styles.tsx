import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const InputContainer = styled.View`
    width: 90%;
    align-self: center;
`;

export const CalendarPickerComponentContainer = styled.TouchableOpacity<{theme: ColorSchemeName}>`
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    border-width: 1px;
    border-radius: 12px;
    background-color: ${(props) => props.theme === "light" ? '#FFFFFF' : Colors.dark.card};
    padding: 12px;
`;

export const DateTextText = styled.Text<{theme: ColorSchemeName}>`
    color: ${(props) => props.theme === "light" ? Colors.color.black : Colors.dark.text};
    font-size: 14px;
`;

export const ErrorText = styled(ThemedText)`
    color: ${Colors.color.red};
    margin-left: 5px;
`;

export const TitleInput = styled(ThemedText)`
    font-weight: bold;
    margin-bottom: 5px;
    padding-left: 5px;
`;