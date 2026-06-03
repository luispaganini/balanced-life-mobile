import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ColorSchemeName, Dimensions } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get('window').width;

export const PageContainer = styled(ThemedView)`
    flex: 1;
    padding: 16px;
`;

// Header Components
export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
`;

export const HeaderSideButton = styled.TouchableOpacity<{ theme: ColorSchemeName }>`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: ${props => props.theme === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)'};
    align-items: center;
    justify-content: center;
`;

export const HeaderTitleColumn = styled.View`
    align-items: center;
    justify-content: center;
`;

export const HeaderTitleText = styled(ThemedText)`
    font-size: 18px;
    font-weight: bold;
`;

export const HeaderSubtitleText = styled(ThemedText)`
    font-size: 12px;
    color: ${Colors.color.grey};
    margin-top: 2px;
`;

// Weekly Calendar Components
export const CalendarScrollView = styled.ScrollView`
    margin-bottom: 20px;
`;

export const DayNode = styled.TouchableOpacity<{ active: boolean; theme: ColorSchemeName }>`
    width: 60px;
    padding: 12px 6px;
    border-radius: 16px;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    background-color: ${props => props.active 
        ? '#00B38C' 
        : (props.theme === 'light' ? '#FFFFFF' : Colors.dark.card)
    };
    border-width: 1px;
    border-color: ${props => props.active 
        ? '#00B38C' 
        : (props.theme === 'light' ? Colors.light.border : Colors.dark.border)
    };
    min-height: 75px;
    shadow-color: #00B38C;
    shadow-offset: 0px 4px;
    shadow-opacity: ${props => props.active ? 0.3 : 0};
    shadow-radius: 6px;
    elevation: ${props => props.active ? 6 : 1};
`;

export const DayOfWeekText = styled(ThemedText)<{ active: boolean }>`
    font-size: 11px;
    font-weight: bold;
    color: ${props => props.active ? '#111827' : Colors.color.grey};
`;

export const DayOfMonthText = styled(ThemedText)<{ active: boolean }>`
    font-size: 18px;
    font-weight: bold;
    margin-top: 4px;
    color: ${props => props.active ? '#111827' : undefined};
`;

// Nutritional Summary Components (Resumo Diário)
export const NutritionalSummaryCard = styled.View<{ theme: ColorSchemeName }>`
    background-color: ${props => props.theme === 'light' ? '#FFFFFF' : Colors.dark.card};
    border-radius: 18px;
    border-width: 1px;
    border-color: ${props => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
    padding: 18px;
    margin-bottom: 20px;
`;

export const CardHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
`;

export const CardTitle = styled(ThemedText)`
    font-size: 17px;
    font-weight: bold;
`;

export const CaloriesLabel = styled(ThemedText)`
    font-size: 13px;
    color: ${Colors.color.grey};
    margin-bottom: 4px;
`;

export const CaloriesProgressRow = styled.View`
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const CaloriesValuesContainer = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

export const CaloriesValuesText = styled(ThemedText)`
    font-size: 26px;
    font-weight: 800;
`;

export const CaloriesMetaText = styled(ThemedText)`
    font-size: 14px;
    color: ${Colors.color.grey};
    margin-left: 4px;
    margin-bottom: 3px;
`;

export const PercentageText = styled.Text`
    color: #00B38C;
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 3px;
`;

export const ProgressBarContainer = styled.View<{ theme: ColorSchemeName }>`
    height: 8px;
    background-color: ${props => props.theme === 'light' ? '#E5E7EB' : '#374151'};
    border-radius: 4px;
    width: 100%;
    overflow: hidden;
    margin-bottom: 20px;
`;

export const ProgressBarFill = styled.View<{ percent: number }>`
    height: 100%;
    width: ${props => Math.min(props.percent, 100)}%;
    background-color: #00B38C;
    border-radius: 4px;
`;

// Macro Columns
export const MacrosRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const MacroItemCard = styled.View<{ theme: ColorSchemeName }>`
    background-color: ${props => props.theme === 'light' ? '#F9FAFB' : '#111827'};
    border-width: 1px;
    border-color: ${props => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
    border-radius: 14px;
    padding: 12px 10px;
    width: 31%;
    position: relative;
    overflow: hidden;
`;

export const MacroHeader = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 6px;
`;

export const MacroLabelText = styled.Text<{ color: string }>`
    font-size: 10px;
    font-weight: bold;
    color: ${props => props.color};
    margin-left: 4px;
`;

export const MacroValueContainer = styled.View`
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 6px;
`;

export const MacroCurrentText = styled(ThemedText)`
    font-size: 15px;
    font-weight: bold;
`;

export const MacroGoalText = styled(ThemedText)`
    font-size: 11px;
    color: ${Colors.color.grey};
`;

export const MacroProgressUnderline = styled.View<{ theme: ColorSchemeName }>`
    height: 3px;
    background-color: ${props => props.theme === 'light' ? '#E5E7EB' : '#374151'};
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
`;

export const MacroProgressUnderlineFill = styled.View<{ percent: number; color: string }>`
    height: 100%;
    width: ${props => Math.min(props.percent, 100)}%;
    background-color: ${props => props.color};
`;

// Meals List Components
export const MealsHeaderRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
`;

export const MealsTitle = styled(ThemedText)`
    font-size: 18px;
    font-weight: bold;
`;

export const MealsCountBadge = styled.View`
    background-color: #00B38C1F;
    border-radius: 6px;
    padding: 4px 8px;
`;

export const MealsCountText = styled.Text`
    color: #00B38C;
    font-weight: bold;
    font-size: 11px;
`;

export const MealsListContainer = styled.View`
    margin-bottom: 30px;
`;

// Meal Card component
export const MealTrackingCard = styled.TouchableOpacity<{ active: boolean; theme: ColorSchemeName }>`
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.theme === 'light' ? '#FFFFFF' : Colors.dark.card};
    border-radius: 16px;
    border-width: 1px;
    border-color: ${props => props.active 
        ? '#00B38C' 
        : (props.theme === 'light' ? Colors.light.border : Colors.dark.border)
    };
    padding: 16px;
    margin-bottom: 12px;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.03;
    shadow-radius: 3px;
    elevation: 1;
`;

export const MealIconCircle = styled.View<{ bgColor: string }>`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background-color: ${props => props.bgColor};
    align-items: center;
    justify-content: center;
    margin-right: 12px;
`;

export const MealContentColumn = styled.View`
    flex: 1;
    margin-right: 10px;
`;

export const MealTitleText = styled(ThemedText)`
    font-size: 16px;
    font-weight: bold;
`;

export const MealTimeText = styled(ThemedText)`
    font-size: 12px;
    color: ${Colors.color.grey};
    margin-top: 2px;
`;

export const MealDescriptionText = styled(ThemedText)`
    font-size: 13px;
    color: ${Colors.color.grey};
    line-height: 18px;
    margin-top: 6px;
`;

export const MealBadgesRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

export const MealCaloriesBadge = styled.View<{ theme: ColorSchemeName }>`
    background-color: ${props => props.theme === 'light' ? '#F3F4F6' : '#111827'};
    border-radius: 6px;
    padding: 3px 8px;
    margin-right: 10px;
`;

export const MealCaloriesText = styled(ThemedText)`
    font-size: 11px;
    font-weight: bold;
    color: ${Colors.color.grey};
`;

export const MealStatusText = styled.Text<{ completed: boolean }>`
    font-size: 11px;
    font-weight: bold;
    color: ${props => props.completed ? '#00B38C' : Colors.color.grey};
`;

export const CheckboxContainer = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
`;

export const CheckboxCircle = styled.View<{ checked: boolean; theme: ColorSchemeName }>`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.checked ? '#00B38C' : 'transparent'};
    border-width: 2px;
    border-color: ${props => props.checked 
        ? '#00B38C' 
        : (props.theme === 'light' ? '#D1D5DB' : '#4B5563')
    };
`;

// Dropdown Components
export const DropdownContainer = styled.View<{ theme: ColorSchemeName; topInset: number }>`
    position: absolute;
    right: 16px;
    top: ${props => props.topInset + 60}px;
    z-index: 1000;
    width: 220px;
    background-color: ${({ theme }) => theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 12px;
    border-width: 1px;
    border-color: ${({ theme }) => theme === 'light' ? Colors.light.border : Colors.dark.border};
    padding: 6px;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.15;
    shadow-radius: 12px;
    elevation: 5;
`;

export const DropdownItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
`;

export const DropdownItemText = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme === 'light' ? Colors.light.text : Colors.dark.text};
    margin-left: 10px;
`;

// Modal Components
export const ModalOverlay = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const ModalCard = styled.View<{ theme: ColorSchemeName }>`
    width: 100%;
    max-width: 360px;
    background-color: ${({ theme }) => theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 16px;
    border-width: 1px;
    border-color: ${({ theme }) => theme === 'light' ? Colors.light.border : Colors.dark.border};
    padding: 20px;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.2;
    shadow-radius: 12px;
    elevation: 5;
`;

export const ModalTitle = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme === 'light' ? Colors.light.text : Colors.dark.text};
    margin-bottom: 16px;
    text-align: center;
`;

export const MealPillsContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
`;

export const MealPill = styled.TouchableOpacity<{ active: boolean }>`
    padding: 8px 14px;
    border-radius: 20px;
    background-color: ${({ active }) => active ? Colors.color.green : 'rgba(155,161,166,0.1)'};
    border-width: 1px;
    border-color: ${({ active }) => active ? Colors.color.green : 'transparent'};
`;

export const MealPillText = styled.Text<{ active: boolean; theme: ColorSchemeName }>`
    font-size: 13px;
    font-weight: 600;
    color: ${({ active, theme }) => 
        active 
            ? '#FFF' 
            : (theme === 'light' ? Colors.light.text : Colors.dark.text)};
`;

export const CustomInputWrapper = styled.View`
    margin-bottom: 16px;
`;

export const ModalTextInput = styled.TextInput<{ theme: ColorSchemeName }>`
    width: 100%;
    padding: 12px 16px;
    background-color: ${({ theme }) => theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)'};
    border-radius: 12px;
    border-width: 1px;
    border-color: ${({ theme }) => theme === 'light' ? Colors.light.border : Colors.dark.border};
    color: ${({ theme }) => theme === 'light' ? Colors.light.text : Colors.dark.text};
    font-size: 14px;
    margin-top: 8px;
`;

export const TimePickerRow = styled.TouchableOpacity<{ theme: ColorSchemeName }>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background-color: ${({ theme }) => theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)'};
    border-radius: 12px;
    border-width: 1px;
    border-color: ${({ theme }) => theme === 'light' ? Colors.light.border : Colors.dark.border};
    margin-bottom: 20px;
`;

export const TimeLabel = styled.Text`
    font-size: 14px;
    color: ${Colors.color.grey};
    font-weight: 500;
`;

export const TimeValue = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme === 'light' ? Colors.light.text : Colors.dark.text};
`;

export const ModalActionsRow = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    gap: 12px;
`;

export const ModalActionButton = styled.TouchableOpacity<{ isCancel?: boolean }>`
    padding: 10px 18px;
    border-radius: 8px;
    background-color: ${({ isCancel }) => isCancel ? 'transparent' : Colors.color.green};
`;

export const ModalActionButtonText = styled.Text<{ isCancel?: boolean }>`
    font-size: 14px;
    font-weight: 600;
    color: ${({ isCancel }) => isCancel ? Colors.color.grey : '#FFF'};
`;