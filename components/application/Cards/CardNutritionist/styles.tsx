import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const PageContainer = styled.TouchableOpacity<{ theme: ColorSchemeName; isSelected: boolean }>`
    border-radius: 16px;
    padding: 16px;
    margin: 8px 16px;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-width: 1.5px;
    border-color: ${({ isSelected, theme }) => 
        isSelected 
            ? Colors.color.green 
            : (theme === 'light' ? Colors.light.border : Colors.dark.border)};
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.05;
    shadow-radius: 8px;
    elevation: 2;
`;

export const AvatarContainer = styled.View<{ theme: ColorSchemeName; isSelected: boolean }>`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background-color: ${({ isSelected }) => isSelected ? '#00B38C1F' : '#00A3FF1F'};
    align-items: center;
    justify-content: center;
    border-width: 1.5px;
    border-color: ${({ isSelected }) => isSelected ? '#00B38C3F' : '#00A3FF3F'};
`;

export const AvatarText = styled.Text<{ isSelected: boolean }>`
    font-size: 18px;
    font-weight: 700;
    color: ${({ isSelected }) => isSelected ? Colors.color.green : Colors.color.blue};
`;

export const AvatarImage = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
`;

export const DataCard = styled.View`
    flex: 1;
    margin-left: 14px;
    justify-content: center;
`;

export const NameText = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme === 'light' ? Colors.light.text : Colors.dark.text};
    margin-bottom: 2px;
`;

export const SubtitleText = styled.Text`
    font-size: 13px;
    color: ${Colors.color.grey};
    margin-bottom: 4px;
`;

export const BadgesRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 4px;
    flex-wrap: wrap;
    gap: 6px;
`;

export const StatusBadge = styled.View<{ bgColor: string }>`
    padding: 2px 8px;
    border-radius: 6px;
    background-color: ${({ bgColor }) => bgColor};
    align-self: flex-start;
`;

export const StatusBadgeText = styled.Text<{ textColor: string }>`
    font-size: 11px;
    font-weight: 700;
    color: ${({ textColor }) => textColor};
    text-transform: uppercase;
`;

export const SelectionIconWrapper = styled.View`
    margin-left: 8px;
    justify-content: center;
    align-items: center;
`;