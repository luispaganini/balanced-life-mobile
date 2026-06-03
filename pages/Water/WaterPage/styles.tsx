import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const ContainerPage = styled.View<{ theme: ColorSchemeName }>`
    flex: 1;
    background-color: ${(props) => props.theme === "light" ? Colors.light.background : Colors.dark.background};
`;

export const HeaderContainer = styled.View<{ theme: ColorSchemeName }>`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-vertical: 15px;
    padding-horizontal: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
`;

export const HeaderTitle = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.theme === "light" ? Colors.light.text : Colors.dark.text};
`;

export const ContentContainer = styled.ScrollView`
    flex: 1;
`;

export const GoalCard = styled.View<{ theme: ColorSchemeName }>`
    margin: 20px;
    padding: 20px;
    border-radius: 16px;
    border-width: 1px;
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    background-color: ${(props) => props.theme === "light" ? Colors.light.card : Colors.dark.card};
    align-items: center;
    justify-content: center;
`;

export const GoalHeaderRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 15px;
`;

export const GoalTitle = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.theme === "light" ? '#4B5563' : '#9CA3AF'};
    margin-right: 8px;
`;

export const EditIcon = styled.TouchableOpacity`
    padding: 4px;
`;

export const ProgressContainer = styled.View`
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const StatsText = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme === "light" ? '#4B5563' : '#9CA3AF'};
    margin-top: 10px;
`;

export const SectionTitle = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.theme === "light" ? Colors.light.text : Colors.dark.text};
    margin-horizontal: 20px;
    margin-top: 10px;
    margin-bottom: 12px;
`;

export const QuickAddRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-horizontal: 15px;
    margin-bottom: 15px;
`;

export const QuickAddCapsule = styled.TouchableOpacity<{ theme: ColorSchemeName }>`
    flex: 1;
    margin-horizontal: 5px;
    padding-vertical: 12px;
    border-radius: 12px;
    border-width: 1px;
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    background-color: ${(props) => props.theme === "light" ? Colors.light.card : Colors.dark.card};
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const QuickAddText = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.theme === "light" ? Colors.light.text : Colors.dark.text};
    margin-left: 6px;
`;

export const CustomInputCard = styled.View<{ theme: ColorSchemeName }>`
    margin-horizontal: 20px;
    margin-bottom: 20px;
    padding: 16px;
    border-radius: 16px;
    border-width: 1px;
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    background-color: ${(props) => props.theme === "light" ? Colors.light.card : Colors.dark.card};
`;

export const InputRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const InputWrapper = styled.View`
    flex: 1;
`;

export const AddButton = styled.TouchableOpacity`
    background-color: ${Colors.color.blue};
    width: 48px;
    height: 48px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
`;

export const RemoveButton = styled.TouchableOpacity`
    background-color: ${Colors.color.lightRed};
    width: 48px;
    height: 48px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
`;

export const SettingsCard = styled.View<{ theme: ColorSchemeName }>`
    margin-horizontal: 20px;
    margin-bottom: 30px;
    padding: 16px;
    border-radius: 16px;
    border-width: 1px;
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    background-color: ${(props) => props.theme === "light" ? Colors.light.card : Colors.dark.card};
`;

export const SettingsRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-vertical: 8px;
`;

export const SettingsLabelContainer = styled.View`
    flex-direction: column;
    flex: 1;
`;

export const SettingsTitle = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme === "light" ? Colors.light.text : Colors.dark.text};
`;

export const SettingsDescription = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 13px;
    color: ${(props) => props.theme === "light" ? '#6B7280' : '#9CA3AF'};
    margin-top: 2px;
`;

export const Divider = styled.View<{ theme: ColorSchemeName }>`
    height: 1px;
    background-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    margin-vertical: 12px;
`;

export const PillRow = styled.View`
    flex-direction: row;
    margin-top: 10px;
    flex-wrap: wrap;
`;

export const IntervalPill = styled.TouchableOpacity<{ active: boolean; theme: ColorSchemeName }>`
    padding-vertical: 8px;
    padding-horizontal: 14px;
    border-radius: 20px;
    margin-right: 8px;
    margin-bottom: 8px;
    background-color: ${(props) => props.active ? Colors.color.blue : (props.theme === "light" ? '#E5E7EB' : '#374151')};
`;

export const IntervalPillText = styled.Text<{ active: boolean; theme: ColorSchemeName }>`
    font-size: 13px;
    font-weight: 600;
    color: ${(props) => props.active ? Colors.color.white : (props.theme === "light" ? Colors.light.text : Colors.dark.text)};
`;

export const TimePickersRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 12px;
`;

export const TimePickerButton = styled.TouchableOpacity<{ theme: ColorSchemeName }>`
    flex: 1;
    margin-horizontal: 4px;
    padding: 12px;
    border-radius: 12px;
    border-width: 1px;
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    background-color: ${(props) => props.theme === "light" ? '#F3F4F6' : '#111827'};
    align-items: center;
`;

export const TimePickerLabel = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 12px;
    color: ${(props) => props.theme === "light" ? '#6B7280' : '#9CA3AF'};
    margin-bottom: 4px;
`;

export const TimePickerValue = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 15px;
    font-weight: bold;
    color: ${(props) => props.theme === "light" ? Colors.light.text : Colors.dark.text};
`;