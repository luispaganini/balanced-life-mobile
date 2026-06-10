import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Dimensions } from "react-native";
import { ColorSchemeName } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get('window').width;

export const ContainerPage = styled.View<{ theme?: ColorSchemeName }>`
    flex: 1;
    justify-content: space-between;
    background-color: ${(props) => props.theme === "light" ? Colors.light.background : Colors.dark.background};
    padding-vertical: 20px;
`;

export const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 40px;
`;

export const ImageItem = styled.Image`
    width: ${screenWidth/2.2}px;
    height: ${screenWidth/2.2}px;
    resize-mode: contain;
`;

export const Title = styled(ThemedText)<{ theme?: ColorSchemeName }>`
    align-self: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => props.theme === "light" ? Colors.light.text : Colors.dark.text};
`;

export const FormWrapper = styled.View`
    width: 100%;
`;

export const ButtonComponent = styled.TouchableOpacity`
    background-color: ${Colors.color.green};
    padding: 15px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    width: 90%;
    align-self: center;
    shadow-color: ${Colors.color.green};
    shadow-offset: 0px 4px;
    shadow-opacity: 0.2;
    shadow-radius: 5px;
    elevation: 3;
`;

export const TextComponent = styled.Text`
    color: ${Colors.color.white};
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.5px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    width: 90%;
    flex-direction: row;
    align-self: center;
    margin-top: 8px;
    justify-content: flex-end;
`;

export const ForgotPasswordText = styled.Text`
    color: ${Colors.color.green};
    font-size: 14px;
    font-weight: 600;
`;

export const DividerContainer = styled.View`
    flex-direction: row;
    align-items: center;
    width: 90%;
    align-self: center;
    margin-top: 25px;
    margin-bottom: 25px;
`;

export const DividerLine = styled.View<{ theme?: ColorSchemeName }>`
    flex: 1;
    height: 1px;
    background-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
`;

export const DividerText = styled.Text`
    margin-horizontal: 15px;
    font-size: 14px;
    font-weight: 500;
    color: ${Colors.color.grey};
`;

export const GoogleButton = styled.TouchableOpacity<{ theme?: ColorSchemeName }>`
    flex-direction: row;
    background-color: ${(props) => props.theme === "light" ? Colors.light.card : Colors.dark.card};
    border-width: 1px;
    border-color: ${(props) => props.theme === "light" ? Colors.light.border : Colors.dark.border};
    padding: 15px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    width: 90%;
    align-self: center;
`;

export const GoogleButtonText = styled.Text<{ theme?: ColorSchemeName }>`
    color: ${(props) => props.theme === "light" ? Colors.light.text : Colors.dark.text};
    font-size: 16px;
    font-weight: bold;
    margin-left: 12px;
`;