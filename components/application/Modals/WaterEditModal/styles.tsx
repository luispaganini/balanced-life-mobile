import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";

export const AddWaterContainer = styled(ThemedView)`
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 10px;
    border-width: 1px;
    border-color: white;
`;

export const TitleModal = styled(ThemedText)`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;