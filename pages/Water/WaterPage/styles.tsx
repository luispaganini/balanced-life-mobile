import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";

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

export const QuickAddContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    width: 90%;
    align-self: center;
    margin-top: 15px;
    margin-bottom: 5px;
`;

export const QuickAddBtn = styled.TouchableOpacity`
    background-color: #00B38C;
    padding-vertical: 8px;
    padding-horizontal: 16px;
    border-radius: 12px;
`;

export const QuickAddBtnText = styled.Text`
    color: ${Colors.color.white};
    font-size: 14px;
    font-weight: bold;
`;