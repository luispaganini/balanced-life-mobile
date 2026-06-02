import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";

export const PageContainer = styled(ThemedView)`
    margin-bottom: 12px;
    flex-direction: row;
    align-items: center;
`;

export const TitleText = styled(ThemedText)`
    font-size: 16px;
    font-weight: bold;
    margin-right: 8px;
`;

export const DescriptionText = styled(ThemedText)`
    font-size: 16px;
    flex-shrink: 1;
`;
