import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const PageContainer = styled.View<{ theme: ColorSchemeName }>`
    flex: 1;
    background-color: ${({ theme }) => theme === 'light' ? Colors.light.background : Colors.dark.background};
`;

export const HeaderContainer = styled.View<{ topInset: number; theme: ColorSchemeName }>`
    padding-top: ${({ topInset }) => topInset + 16}px;
    padding-bottom: 16px;
    padding-horizontal: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme === 'light' ? Colors.light.border : Colors.dark.border};
`;

export const HeaderButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
`;

export const HeaderTitle = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme === 'light' ? Colors.light.text : Colors.dark.text};
`;

export const ScrollContent = styled.ScrollView`
    flex: 1;
`;

export const ProfileSection = styled.View`
    align-items: center;
    margin-top: 24px;
    padding-horizontal: 24px;
`;

export const InitialsCircle = styled.View<{ theme: ColorSchemeName; isSelected: boolean }>`
    width: 104px;
    height: 104px;
    border-radius: 52px;
    background-color: ${({ isSelected }) => isSelected ? '#00B38C1F' : '#00A3FF1F'};
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-color: ${({ isSelected }) => isSelected ? '#00B38C40' : '#00A3FF40'};
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.1;
    shadow-radius: 12px;
    elevation: 4;
`;

export const InitialsText = styled.Text<{ isSelected: boolean }>`
    font-size: 36px;
    font-weight: 700;
    color: ${({ isSelected }) => isSelected ? Colors.color.green : Colors.color.blue};
`;

export const AvatarImageLarge = styled.Image`
    width: 104px;
    height: 104px;
    border-radius: 52px;
    border-width: 2px;
    border-color: ${Colors.color.green}3F;
`;

export const NutritionistName = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme === 'light' ? Colors.light.text : Colors.dark.text};
    margin-top: 16px;
    text-align: center;
`;

export const InfoCard = styled.View<{ theme: ColorSchemeName }>`
    background-color: ${({ theme }) => theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 16px;
    border-width: 1px;
    border-color: ${({ theme }) => theme === 'light' ? Colors.light.border : Colors.dark.border};
    margin: 20px 16px;
    padding-vertical: 8px;
`;

export const InfoRow = styled.View<{ theme: ColorSchemeName; showBorder: boolean }>`
    flex-direction: row;
    align-items: center;
    padding-vertical: 14px;
    padding-horizontal: 16px;
    border-bottom-width: ${({ showBorder }) => showBorder ? 1 : 0}px;
    border-bottom-color: ${({ theme }) => theme === 'light' ? Colors.light.border : Colors.dark.border};
`;

export const InfoIconWrapper = styled.View`
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background-color: #9BA1A61A;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
`;

export const InfoContent = styled.View`
    flex: 1;
`;

export const InfoLabel = styled.Text`
    font-size: 12px;
    color: ${Colors.color.grey};
    font-weight: 500;
    margin-bottom: 2px;
`;

export const InfoValue = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme === 'light' ? Colors.light.text : Colors.dark.text};
`;

export const SocialMediaSection = styled.View`
    align-items: center;
    margin-top: 10px;
    padding-horizontal: 24px;
`;

export const SocialTitle = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${Colors.color.grey};
    margin-bottom: 12px;
`;

export const SocialMediaRow = styled.View`
    flex-direction: row;
    justify-content: center;
    gap: 16px;
    width: 100%;
`;

export const SocialCircle = styled.TouchableOpacity<{ theme: ColorSchemeName }>`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: ${({ theme }) => theme === 'light' ? Colors.light.card : Colors.dark.card};
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: ${({ theme }) => theme === 'light' ? Colors.light.border : Colors.dark.border};
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.05;
    shadow-radius: 6px;
    elevation: 2;
`;

export const ButtonsContainer = styled.View`
    padding: 24px 16px;
    gap: 12px;
`;

export const ActiveStatusMessageCard = styled.View`
    flex-direction: row;
    background-color: #00B38C15;
    border-width: 1px;
    border-color: #00B38C30;
    border-radius: 12px;
    padding: 14px;
    margin: 16px;
    align-items: center;
`;

export const ActiveStatusTextColumn = styled.View`
    flex: 1;
    margin-left: 12px;
`;

export const ActiveStatusTitle = styled.Text`
    font-size: 14px;
    font-weight: 700;
    color: ${Colors.color.green};
    margin-bottom: 2px;
`;

export const ActiveStatusDesc = styled.Text`
    font-size: 12px;
    color: ${Colors.color.green}BF;
    line-height: 16px;
`;