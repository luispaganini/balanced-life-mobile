import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";

export const PageContainer = styled(ThemedView)`
    flex: 1;
    padding: 20px;
`;

export const MenuContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;