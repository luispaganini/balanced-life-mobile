import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get('window').width;

export const ContainerPage = styled(ThemedView)`
    flex: 1;
`;

export const ButtonsContainer = styled.View`
    margin-top: 5px;
    margin-bottom: 20px;
`;


export const TextInputValue = styled(ThemedText)`
    font-size: 16px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 90%;
    align-self: center;
`;

export const ErrorText = styled(ThemedText)`
    color: ${Colors.color.red};
    margin-left: 5px;
    width: 90%;
    align-self: center;
`;