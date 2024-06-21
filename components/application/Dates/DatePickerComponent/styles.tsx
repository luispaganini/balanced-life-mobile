import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const InputContainer = styled.View`
    align-self: center;
    padding: 0 50px;
`;

export const CalendarPickerComponentContainer = styled.TouchableOpacity<{ theme: ColorSchemeName }>`
    border-color: ${(props) => props.theme == "light" ? Colors.light.border : Colors.dark.border};
    border-width: 1px;
    border-radius: 5px;
    color: ${Colors.color.black};
    background-color: ${(props) => props.theme == "light" ? Colors.light.background : Colors.dark.background};
    padding: 10px;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

export const TitleInput = styled(ThemedText)`
    font-weight: bold;
    margin-bottom: 5px;
    padding-left: 5px;
`;

export const DateText = styled(ThemedText)<{ theme: ColorSchemeName }>`
    color: ${(props) => props.theme == "light" ? Colors.light.text : Colors.dark.text};
    font-size: 16px;
    font-weight: bold;
    padding-left: 5px;
    padding-right: 25px;
`;