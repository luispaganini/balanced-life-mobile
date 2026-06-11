import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const PageContainer = styled.View<{ theme: ColorSchemeName }>`
    flex: 1;
    background-color: ${(props) => props.theme === 'light' ? Colors.light.background : Colors.dark.background};
`;

export const ScrollContainer = styled.ScrollView`
    flex: 1;
    padding-horizontal: 20px;
`;

export const HeaderContainer = styled.View<{ theme: ColorSchemeName }>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-vertical: 15px;
    padding-horizontal: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
`;

export const HeaderButton = styled.TouchableOpacity`
    padding: 5px;
`;

export const HeaderTitle = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
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

export const CalorieValue = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 38px;
    font-weight: 800;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
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

export const MacroCard = styled.View<{ theme: ColorSchemeName }>`
    flex: 1;
    background-color: ${(props) => props.theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 12px;
    padding: 12px;
    margin-horizontal: 5px;
    border-width: 1px;
    border-color: ${(props) => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
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

export const MacroValueText = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
    margin-bottom: 8px;
`;

export const MacroProgressLine = styled.View<{ theme: ColorSchemeName }>`
    height: 4px;
    background-color: ${(props) => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
    border-radius: 2px;
    overflow: hidden;
`;

export const MacroProgressFill = styled.View<{ color: string; width: number }>`
    height: 100%;
    width: ${props => props.width}%;
    background-color: ${props => props.color};
    border-radius: 2px;
`;

export const SectionTitle = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
    margin-top: 10px;
    margin-bottom: 15px;
`;

export const FoodListContainer = styled.View`
    margin-bottom: 15px;
`;

export const FoodCard = styled.TouchableOpacity<{ theme: ColorSchemeName; $hasSubstitutions?: boolean }>`
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => props.theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 12px;
    padding: 12px 15px;
    margin-bottom: ${(props) => props.$hasSubstitutions ? '0px' : '10px'};
    border-width: 1px;
    border-color: ${(props) => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
    ${(props) => props.$hasSubstitutions && `
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    `}
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

export const FoodNameText = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 15px;
    font-weight: 600;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
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

export const FoodCalorieText = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 15px;
    font-weight: 700;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
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

export const PhotoUploadContainer = styled.TouchableOpacity<{ theme: ColorSchemeName }>`
    border-width: 1.5px;
    border-style: dashed;
    border-color: ${(props) => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
    border-radius: 12px;
    background-color: ${(props) => props.theme === 'light' ? Colors.light.card : Colors.dark.card};
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

export const ObservationInput = styled.TextInput<{ theme: ColorSchemeName }>`
    background-color: ${(props) => props.theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 12px;
    border-width: 1px;
    border-color: ${(props) => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
    padding: 15px;
    min-height: 100px;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
    font-size: 14px;
    text-align-vertical: top;
`;

export const EmptyStateContainer = styled.View<{ theme: ColorSchemeName }>`
    align-items: center;
    justify-content: center;
    padding: 30px;
    background-color: ${(props) => props.theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 12px;
    margin-bottom: 15px;
    border-width: 1px;
    border-style: dashed;
    border-color: ${(props) => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
`;

export const EmptyStateText = styled.Text`
    font-size: 14px;
    color: ${Colors.color.grey};
    text-align: center;
    margin-top: 10px;
`;

export const SkeletonPulse = styled.View<{ theme: ColorSchemeName }>`
    background-color: ${(props) => props.theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 8px;
`;

export const MealPhotoWrapper = styled.View`
    width: 100%;
    margin-bottom: 25px;
    position: relative;
`;

export const MealPhotoImage = styled.Image`
    width: 100%;
    height: 200px;
    border-radius: 12px;
`;

export const RemovePhotoBadge = styled.TouchableOpacity`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(220, 53, 69, 0.9);
    width: 32px;
    height: 32px;
    border-radius: 16px;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

export const ModalOverlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const ModalContent = styled.View<{ theme: ColorSchemeName }>`
    width: 100%;
    background-color: ${(props) => props.theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 16px;
    padding: 20px;
    border-width: 1px;
    border-color: ${(props) => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
`;

export const ModalHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

export const ModalTitle = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
`;

export const ModalSubtitle = styled.Text`
    font-size: 14px;
    color: ${Colors.color.grey};
    margin-bottom: 20px;
`;

export const ModalOptionCard = styled.TouchableOpacity<{ theme: ColorSchemeName; selected: boolean }>`
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => props.theme === 'light' ? Colors.light.background : Colors.dark.background};
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 10px;
    border-width: 1.5px;
    border-color: ${(props) => props.selected ? Colors.color.green : (props.theme === 'light' ? Colors.light.border : Colors.dark.border)};
`;

export const ModalOptionRadio = styled.View<{ selected: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${(props) => props.selected ? Colors.color.green : Colors.color.grey};
    align-items: center;
    justify-content: center;
    margin-right: 12px;
`;

export const ModalOptionRadioInner = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${Colors.color.green};
`;

export const ModalOptionTextColumn = styled.View`
    flex: 1;
`;

export const ModalOptionName = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 15px;
    font-weight: 600;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
    margin-bottom: 2px;
`;

export const ModalOptionDetails = styled.Text`
    font-size: 13px;
    color: ${Colors.color.grey};
`;

export const ModalOptionCalorie = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 15px;
    font-weight: 700;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
`;

export const ModalButtonGroup = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
`;

export const ModalCancelButton = styled.TouchableOpacity<{ theme: ColorSchemeName }>`
    flex: 1;
    border-width: 1px;
    border-color: ${(props) => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
    border-radius: 12px;
    padding: 14px;
    align-items: center;
    margin-right: 10px;
`;

export const ModalCancelButtonText = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
`;

export const ModalConfirmButton = styled.TouchableOpacity`
    flex: 1;
    background-color: ${Colors.color.green};
    border-radius: 12px;
    padding: 14px;
    align-items: center;
`;

export const ModalConfirmButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${Colors.color.white};
`;

export const SubstitutesContainer = styled.View`
    margin-top: 0px;
    margin-bottom: 10px;
    padding-left: 0px;
`;

export const SubstituteRow = styled.TouchableOpacity<{ theme: ColorSchemeName; $isLast?: boolean }>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => props.theme === 'light' ? '#16A34A0E' : '#16A34A25'};
    padding: 12px 15px;
    margin-bottom: 0px;
    border-width: 1px;
    border-top-width: 0px;
    border-color: ${(props) => props.theme === 'light' ? '#16A34A33' : '#16A34A55'};
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: ${(props) => props.$isLast ? '12px' : '0px'};
    border-bottom-right-radius: ${(props) => props.$isLast ? '12px' : '0px'};
`;

export const SubstituteLeft = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
`;

export const SubstituteTextColumn = styled.View`
    flex: 1;
    margin-left: 8px;
`;

export const SubstituteNameText = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 13px;
    font-weight: 600;
    color: ${(props) => props.theme === 'light' ? '#16A34A' : '#4ADE80'};
`;

export const SubstituteDescText = styled.Text`
    font-size: 11px;
    color: ${Colors.color.grey};
    margin-top: 1px;
`;

export const SubstituteCal = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 12px;
    font-weight: 700;
    color: ${(props) => props.theme === 'light' ? '#16A34A' : '#4ADE80'};
    margin-right: 4px;
`;