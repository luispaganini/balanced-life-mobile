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

export const ButtonComponent = styled.TouchableOpacity<{color: string}>`
    background-color: ${(props) => props.color};
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    width: 70%;
    align-self: center;
`;

export const TextComponent = styled.Text`
    color: ${Colors.color.white};
    font-size: 20px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    width: 90%;
    flex-direction: row;
    align-self: center;
    margin-top: 5px;
    justify-content: flex-end;
`;
