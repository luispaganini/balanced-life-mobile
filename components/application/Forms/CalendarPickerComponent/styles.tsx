import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const InputContainer = styled.View`
    width: 90%;
    align-self: center;
`;

export const CalendarPickerComponentContainer = styled.TouchableOpacity<{theme: ColorSchemeName}>`
    border-color: ${(props) => props.theme == "light" ? Colors.light.border : Colors.dark.border};
    border-width: 1px;
    border-radius: 5px;
    color: ${Colors.color.black};
    background-color: ${Colors.color.white};
    padding: 10px;
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