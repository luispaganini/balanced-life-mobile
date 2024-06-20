import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";

export const PageContainer = styled(ThemedView)`
    flex: 1;
    padding: 10px;
`;

export const TitleText = styled(ThemedText)`
    text-align: center;
    margin-top: 10px;
`;