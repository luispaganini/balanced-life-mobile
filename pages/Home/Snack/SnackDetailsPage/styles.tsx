import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

export const PageContainer = styled.View`
    flex: 1;
    background-color: ${Colors.dark.background};
`;

export const ScrollContainer = styled.ScrollView`
    flex: 1;
    padding-horizontal: 20px;
`;

export const HeaderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-vertical: 15px;
    padding-horizontal: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.dark.border};
`;

export const HeaderButton = styled.TouchableOpacity`
    padding: 5px;
`;

export const HeaderTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${Colors.dark.text};
`;

export const HeaderActionText = styled.Text<{ active?: boolean }>`
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.active ? Colors.color.red : Colors.color.green};
`;

export const CenterProgressWrapper = styled.View`
    align-items: center;
    justify-content: center;
    margin-vertical: 25px;
`;

export const CircularProgressInner = styled.View`
    position: absolute;
    align-items: center;
    justify-content: center;
`;

export const CalorieValue = styled.Text`
    font-size: 38px;
    font-weight: 800;
    color: ${Colors.dark.text};
    margin-top: 2px;
`;

export const CalorieLabel = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: ${Colors.color.grey};
`;

export const MacrosRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const MacroCard = styled.View`
    flex: 1;
    background-color: ${Colors.dark.card};
    border-radius: 12px;
    padding: 12px;
    margin-horizontal: 5px;
    border-width: 1px;
    border-color: ${Colors.dark.border};
`;

export const MacroLabelRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 6px;
`;

export const MacroDot = styled.View<{ color: string }>`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${props => props.color};
    margin-right: 6px;
`;

export const MacroLabel = styled.Text`
    font-size: 11px;
    font-weight: 600;
    color: ${Colors.color.grey};
    text-transform: uppercase;
`;

export const MacroValueText = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: ${Colors.dark.text};
    margin-bottom: 8px;
`;

export const MacroProgressLine = styled.View`
    height: 4px;
    background-color: ${Colors.dark.border};
    border-radius: 2px;
    overflow: hidden;
`;

export const MacroProgressFill = styled.View<{ color: string; width: number }>`
    height: 100%;
    width: ${props => props.width}%;
    background-color: ${props => props.color};
    border-radius: 2px;
`;

export const SectionTitle = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: ${Colors.dark.text};
    margin-top: 10px;
    margin-bottom: 15px;
`;

export const FoodListContainer = styled.View`
    margin-bottom: 15px;
`;

export const FoodCard = styled.TouchableOpacity`
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

export const FoodCalorieContainer = styled.View`
    align-items: flex-end;
    margin-right: 8px;
`;

export const FoodCalorieText = styled.Text`
    font-size: 15px;
    font-weight: 700;
    color: ${Colors.dark.text};
`;

export const FoodCalorieLabel = styled.Text`
    font-size: 11px;
    color: ${Colors.color.grey};
`;

export const AddFoodButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width: 1.5px;
    border-style: dashed;
    border-color: ${Colors.color.green};
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 20px;
`;

export const AddFoodText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: ${Colors.color.green};
    margin-left: 8px;
`;

export const ActionButton = styled.TouchableOpacity`
    background-color: ${Colors.color.green};
    border-radius: 12px;
    padding: 16px;
    align-items: center;
    justify-content: center;
    margin-vertical: 10px;
    shadow-color: ${Colors.color.green};
    shadow-offset: 0px 4px;
    shadow-opacity: 0.2;
    shadow-radius: 5px;
    elevation: 3;
`;

export const ActionButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${Colors.color.white};
`;

export const PhotoUploadContainer = styled.TouchableOpacity`
    border-width: 1.5px;
    border-style: dashed;
    border-color: ${Colors.dark.border};
    border-radius: 12px;
    background-color: ${Colors.dark.card};
    padding: 25px;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
`;

export const PhotoUploadText = styled.Text`
    font-size: 13px;
    color: ${Colors.color.grey};
    margin-top: 8px;
`;

export const ObservationContainer = styled.View`
    margin-bottom: 30px;
`;

export const ObservationInput = styled.TextInput`
    background-color: ${Colors.dark.card};
    border-radius: 12px;
    border-width: 1px;
    border-color: ${Colors.dark.border};
    padding: 15px;
    min-height: 100px;
    color: ${Colors.dark.text};
    font-size: 14px;
    text-align-vertical: top;
`;

export const EmptyStateContainer = styled.View`
    align-items: center;
    justify-content: center;
    padding: 30px;
    background-color: ${Colors.dark.card};
    border-radius: 12px;
    margin-bottom: 15px;
    border-width: 1px;
    border-style: dashed;
    border-color: ${Colors.dark.border};
`;

export const EmptyStateText = styled.Text`
    font-size: 14px;
    color: ${Colors.color.grey};
    text-align: center;
    margin-top: 10px;
`;

// Skeleton Loading Styled Components
export const SkeletonPulse = styled.View`
    background-color: ${Colors.dark.card};
    border-radius: 8px;
`;