import { Colors } from "@/constants/Colors";
import { Dimensions, ColorSchemeName } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get('window').width;

export const ContainerPage = styled.View<{ theme?: ColorSchemeName }>`
    flex: 1;
    background-color: ${(props) => props.theme === "light" ? Colors.light.background : Colors.dark.background};
`;

export const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

export const ImageItem = styled.Image`
    width: ${screenWidth/2.5}px;
    height: ${screenWidth/2.5}px;
    resize-mode: contain;
`;

export const TitleItem = styled.Text<{ theme?: ColorSchemeName }>`
    align-self: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => props.theme === "light" ? Colors.light.text : Colors.dark.text};
`;

export const ButtonsContainer = styled.View`
    margin-top: 15px;
    margin-bottom: 25px;
`;