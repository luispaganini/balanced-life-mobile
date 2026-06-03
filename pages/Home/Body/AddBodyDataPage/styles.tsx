import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

export const PageContainer = styled.View<{ theme: ColorSchemeName }>`
    flex: 1;
    background-color: ${(props) => props.theme === "light" ? Colors.light.background : Colors.dark.background};
`;

export const HeaderContainer = styled.View<{ theme: ColorSchemeName }>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

export const BackButton = styled.TouchableOpacity`
    padding: 4px;
`;

export const HeaderPlaceholder = styled.View`
    width: 32px;
`;

export const ScrollContainer = styled.ScrollView`
    flex: 1;
`;

export const ImageCard = styled.View<{ theme: ColorSchemeName }>`
    background-color: ${(props) => props.theme === "light" ? Colors.light.card : Colors.dark.card};
    border-radius: 16px;
    border-width: 1px;
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    margin: 20px;
    padding: 20px;
    align-items: center;
    justify-content: center;
`;

export const InfoText = styled.Text<{ theme: ColorSchemeName }>`
    font-size: 14px;
    text-align: center;
    color: ${(props) => props.theme === "light" ? '#4B5563' : '#9CA3AF'};
    line-height: 20px;
`;


export const FormCard = styled.View<{ theme: ColorSchemeName }>`
    background-color: ${(props) => props.theme === "light" ? Colors.light.card : Colors.dark.card};
    border-radius: 16px;
    border-width: 1px;
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    margin-horizontal: 20px;
    margin-bottom: 20px;
    padding: 20px;
`;

export const InputsContainer = styled.View`
    width: 100%;
`;

export const ButtonWrapper = styled.View`
    padding-horizontal: 20px;
    margin-bottom: 30px;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
