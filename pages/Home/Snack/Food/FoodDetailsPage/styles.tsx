import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const PageContainer = styled.View`
    flex: 1;
    background-color: ${Colors.dark.background};
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

export const ScrollContainer = styled.ScrollView`
    flex: 1;
    padding-horizontal: 20px;
`;

export const FoodInfoCard = styled.View`
    background-color: ${Colors.dark.card};
    border-radius: 12px;
    padding: 16px 20px;
    margin-vertical: 15px;
    border-width: 1px;
    border-color: ${Colors.dark.border};
`;

export const FoodTitleText = styled.Text`
    font-size: 20px;
    font-weight: 700;
    color: ${Colors.dark.text};
    margin-bottom: 8px;
`;

export const FoodMetaText = styled.Text`
    font-size: 13px;
    color: ${Colors.color.grey};
    margin-bottom: 4px;
`;

export const InputCard = styled.View`
    margin-bottom: 12px;
`;

export const InputLabel = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${Colors.dark.text};
    margin-bottom: 8px;
`;

export const InputRow = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${Colors.dark.card};
    border-radius: 12px;
    border-width: 1px;
    border-color: ${Colors.dark.border};
    overflow: hidden;
    height: 50px;
`;

export const PortionInput = styled.TextInput`
    flex: 1;
    padding-horizontal: 15px;
    color: ${Colors.dark.text};
    font-size: 16px;
    font-weight: 600;
`;

export const UnitTagContainer = styled.View`
    background-color: ${Colors.dark.border};
    padding-horizontal: 20px;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const UnitTagText = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${Colors.dark.text};
`;

export const SectionTitle = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: ${Colors.dark.text};
    margin-top: 15px;
    margin-bottom: 12px;
`;

export const MacrosRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const MacroCard = styled.View`
    flex: 1;
    background-color: ${Colors.dark.card};
    border-radius: 12px;
    padding: 12px;
    margin-horizontal: 4px;
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
    font-size: 10px;
    font-weight: 600;
    color: ${Colors.color.grey};
    text-transform: uppercase;
`;

export const MacroValueText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${Colors.dark.text};
    margin-bottom: 4px;
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

export const NutrientTableCard = styled.View`
    background-color: ${Colors.dark.card};
    border-radius: 12px;
    padding: 10px 20px;
    margin-bottom: 25px;
    border-width: 1px;
    border-color: ${Colors.dark.border};
`;

export const NutrientRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-vertical: 12px;
`;

export const NutrientName = styled.Text`
    font-size: 14px;
    color: ${Colors.dark.text};
`;

export const NutrientValue = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${Colors.dark.text};
`;

export const ActionButton = styled.TouchableOpacity`
    background-color: ${Colors.color.green};
    border-radius: 12px;
    padding: 14px;
    align-items: center;
    justify-content: center;
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

export const BottomFixedPanel = styled.View`
    padding-horizontal: 20px;
    padding-top: 10px;
    border-top-width: 1px;
    border-top-color: ${Colors.dark.border};
    background-color: ${Colors.dark.background};
`;