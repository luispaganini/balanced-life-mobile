import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const PageContainer = styled(ThemedView)`
    flex: 1;
    padding: 10px;
`;

export const TitleText = styled(ThemedText)`
    text-align: center;
    margin-top: 10px;
`;

export const InfoContainer = styled.View`
    width: 90%;
    align-self: center;
    margin-bottom: 20px;
`;

export const SubTitleText = styled(ThemedText)`
    text-align: flex-start;
    margin-top: 10px;
    font-size: 16px;
`;

export const SnackInfoContainer = styled(ThemedView)`
    width: 95%;
    align-self: flex-end;
`;

export const AddItemContainer = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const IconAdd = styled(Ionicons)`
    margin-right: 10px;
    margin-left: 10px;
`;

export const ButtonText = styled.Text`
    text-align: center;
    color: ${Colors.color.white};
    font-weight: bold;
    font-size: 16px;
`;

export const NotesContainer = styled.View`
    margin-top: 20px;
    width: 90%;
    align-self: center;
`;

export const NotesInputContainer = styled.TextInput<{theme: ColorSchemeName}>`
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 100px;
    border-width: 1px;
    border-radius: 8px;
    border-color: ${(props) => (props.theme == 'light' ? Colors.light.border : Colors.dark.border)};
    color: ${(props) => (props.theme == 'light' ? Colors.light.text : Colors.dark.text)};
    text-align: left;
    text-align-vertical: top;
    text-wrap: wrap;
    padding: 10px;
`;