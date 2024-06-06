import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const ContainerPage = styled(ThemedView)`
    flex: 1;
    justify-content: space-between;
`;

export const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

export const Title = styled(ThemedText)`
    align-self: center;
    margin-bottom: 20px;
`;

export const ButtonComponent = styled.TouchableOpacity`
    background-color: ${Colors.color.green};
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 70%;
    align-self: center;
`;

export const TextComponent = styled.Text`
    color: ${Colors.color.white};
    font-size: 20px;
`;