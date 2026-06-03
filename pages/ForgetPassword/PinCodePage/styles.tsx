import { Colors } from "@/constants/Colors";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get('window').width;

export const ContainerPage = styled.View`
    flex: 1;
    background-color: ${Colors.dark.background};
    justify-content: space-between;
    padding-vertical: 20px;
`;

export const TitleItem = styled.Text`
    align-self: center;
    margin-bottom: 8px;
    font-size: 24px;
    font-weight: bold;
    color: ${Colors.dark.text};
`;

export const DescriptionText = styled.Text`
    align-self: center;
    text-align: center;
    font-size: 14px;
    color: ${Colors.color.grey};
    margin-horizontal: 30px;
    margin-bottom: 25px;
    line-height: 20px;
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

export const FormWrapper = styled.View`
    width: 100%;
    flex: 1;
    justify-content: center;
`;

export const InputContainer = styled.View`
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-horizontal: 10px;
    margin-bottom: 10px;
`;

export const ButtonContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    align-self: center;
    justify-content: flex-end;
    padding-bottom: 20px;
`;

export const SendCodeButton = styled.TouchableOpacity`
    flex-direction: row;
    align-self: flex-end;
    margin-top: 12px;
    margin-right: 20px;
`;

export const SendCodeButtonText = styled.Text`
    color: ${Colors.color.green};
    font-size: 14px;
    font-weight: 600;
`;