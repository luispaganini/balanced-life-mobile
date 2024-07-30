import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get('window').width;

export const ContainerPage = styled(ThemedView)`
    flex: 1;
    justify-content: space-between;
`;

export const TitleItem = styled(ThemedText)`
    align-self: center;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
`;

export const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 40px;
`;

export const ImageItem = styled.Image`
    width: ${screenWidth/2}px;
    height: ${screenWidth/2}px;
`;

export const InputContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
`;

export const ButtonContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    align-self: center;
    justify-content: flex-end;
    padding-bottom: 40px;
`;

export const SendCodeButton = styled.TouchableOpacity`
    flex-direction: row;
    align-self: flex-end;
    margin-top: 10px;
`;