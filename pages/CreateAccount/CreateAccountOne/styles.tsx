import { Colors } from "@/constants/Colors";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get('window').width;

export const ContainerPage = styled.View`
    flex: 1;
    background-color: ${Colors.dark.background};
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

export const TitleItem = styled.Text`
    align-self: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: ${Colors.dark.text};
`;

export const ButtonsContainer = styled.View`
    margin-top: 15px;
    margin-bottom: 25px;
`;