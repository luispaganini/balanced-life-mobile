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
    padding-horizontal: 24px;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme === 'light' ? Colors.light.border : Colors.dark.border};
`;

export const HeaderIconContainer = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background-color: #00B38C1F;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
`;

export const HeaderTitle = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme === 'light' ? Colors.light.text : Colors.dark.text};
`;

export const EmptyContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 32px;
`;

export const EmptyText = styled.Text`
    font-size: 16px;
    color: ${Colors.color.grey};
    text-align: center;
    margin-top: 12px;
`;

export const EmptySubtitle = styled.Text`
    font-size: 14px;
    color: ${Colors.color.grey}80;
    text-align: center;
    margin-top: 6px;
`;