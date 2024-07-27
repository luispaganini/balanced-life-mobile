import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get('window').width;

export const PageContainer = styled(ThemedView)`
    flex: 1;
`;

export const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

export const ImageItem = styled.Image`
    width: ${screenWidth/2}px;
    height: ${screenWidth/2}px;
`;

export const TitleItem = styled(ThemedText)`
    align-self: center;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
`;

export const ButtonsContainer = styled.View`
    margin-top: 5px;
    margin-bottom: 20px;
`;