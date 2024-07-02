import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";

export const ContainerPage = styled(ThemedView)`
    flex: 1;
`;

export const EditIcon = styled.TouchableOpacity`
    margin-left: 10px;
`;

export const GoalContainer = styled(ThemedView)`
    align-items: center;
    margin-top: 20px;
    justify-content: center;
    flex-direction: row;
`;

export const PieContainer = styled.View`
    align-items: center;
    margin-top: 20px;
`;

export const PercentContainer = styled(ThemedView)`
    margin-top: 20px;
    align-items: center;
`;

export const AddWaterContainer = styled(ThemedView)`
    margin-top: 30px;
`;