import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get('window').width;

export const ContainerPage = styled(ThemedView)`
    flex: 1;
    justify-content: space-between;
`;

export const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

export const ImageItem = styled.Image`
    width: ${screenWidth/2}px;
    height: ${screenWidth/2}px;
`;

export const Title = styled(ThemedText)`
    align-self: center;
    margin-bottom: 20px;
`;

export const ButtonComponent = styled.TouchableOpacity`
    background-color: ${Colors.color.green};
    padding: 14px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 90%;
    align-self: center;
`;

export const TextComponent = styled.Text`
    color: ${Colors.color.white};
    font-size: 18px;
    font-weight: bold;
`;

export const ForgotPassword = styled.TouchableOpacity`
    width: 90%;
    flex-direction: row;
    align-self: center;
    margin-top: 5px;
    justify-content: flex-end;
`;

export const DividerContainer = styled.View`
    flex-direction: row;
    align-items: center;
    width: 90%;
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const DividerLine = styled.View`
    flex: 1;
    height: 1px;
    background-color: ${Colors.dark.border};
`;

export const DividerText = styled(ThemedText)`
    margin-horizontal: 10px;
    font-size: 14px;
    color: ${Colors.color.grey};
`;

export const GoogleButton = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${Colors.color.white};
    border-width: 1px;
    border-color: #d1d5db;
    padding: 14px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    width: 90%;
    align-self: center;
`;

export const GoogleButtonText = styled.Text`
    color: #374151;
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
`;