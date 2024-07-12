import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";

export const PageContainer = styled(ThemedView)`
    flex: 1;
`;

export const TitleText = styled(ThemedText)`
    font-weight: bold;
    margin: 20px 0;
    text-align: center;
`;

export const NutritionalInformationContainer = styled(ThemedView)`
    flex: 1;
    padding: 20px;
`;

export const NutritionalInformationDataContainer = styled(ThemedView)`
    padding: 10px 20px 20px 20px;
`;