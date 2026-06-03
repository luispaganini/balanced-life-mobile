import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const CardFoodContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${Colors.dark.card};
    border-radius: 12px;
    padding: 12px 15px;
    margin-bottom: 10px;
    border-width: 1px;
    border-color: ${Colors.dark.border};
`;

export const FoodIconContainer = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #00B38C1A;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
`;

export const FoodTextColumn = styled.View`
    flex: 1;
`;

export const FoodNameText = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: ${Colors.dark.text};
    margin-bottom: 2px;
`;

export const FoodDescText = styled.Text`
    font-size: 13px;
    color: ${Colors.color.grey};
`;
