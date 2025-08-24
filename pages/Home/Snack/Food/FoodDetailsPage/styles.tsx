import { KeyboardAvoidingView, ScrollView } from "react-native";
import styled from "styled-components/native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export const KeyboardAvoidingViewStyled = styled(KeyboardAvoidingView)`
    flex: 1;
`;

export const ScrollViewContainer = styled(ScrollView).attrs({
    contentContainerStyle: {
        flexGrow: 1,
        padding: 20,
    }
})`
    flex: 1;
    width: 100%;
`;

export const TitleText = styled(ThemedText)`
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;

export const NutritionalInformationContainer = styled(ThemedView)``;

export const NutritionalInformationDataContainer = styled(ThemedView)`
    padding: 10px 0;
`;

export const InfoAboutFoodContainer = styled(ThemedView)`
    margin-bottom: 15px;
`;