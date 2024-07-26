import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";

export const PageContainer = styled(ThemedView)`
    margin-bottom: 10px;
`;

export const TitleText = styled(ThemedText)`
    font-size: 16px;
    font-weight: bold;
    flex-shrink: 1;
`;

export const DescriptionText = styled(ThemedText)`
    font-size: 16px;
    flex-shrink: 1;
`;
