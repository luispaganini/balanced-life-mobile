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

export const FormWrapper = styled.View`
    padding: 20px;
`;

export const CardContainer = styled.View<{ theme: ColorSchemeName }>`
    background-color: ${(props) => props.theme === 'light' ? Colors.light.card : Colors.dark.card};
    border-radius: 16px;
    padding: 20px;
    border-width: 1px;
    border-color: ${(props) => props.theme === 'light' ? Colors.light.border : Colors.dark.border};
    margin-bottom: 25px;
`;

export const InputGroup = styled.View`
    margin-bottom: 18px;
`;

export const InputLabel = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.theme === 'light' ? Colors.light.text : Colors.dark.text};
    margin-bottom: 8px;
`;

export const ButtonsContainer = styled.View`
    margin-top: 10px;
    margin-bottom: 30px;
`;