import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const PageContainer = styled.View<{ theme: ColorSchemeName }>`
    flex: 1;
    background-color: ${(props) => props.theme === 'light' ? Colors.light.background : Colors.dark.background};
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

export const ContentPage = styled.View`
    padding: 20px;
    flex: 1;
`;

export const SearchInputWrapper = styled.View`
    margin-bottom: 20px;
`;

export const ListFoodContainer = styled.View`
    flex: 1;
`;

export const ActionButton = styled.TouchableOpacity`
    background-color: ${Colors.color.green};
    border-radius: 12px;
    padding: 16px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 20px;
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