import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";

export const PageContainer = styled(ThemedView)`
    flex: 1;
`;

export const LoadingContainer = styled.ActivityIndicator`
    flex: 1;
    justify-content: center;
    align-items: center;
`;