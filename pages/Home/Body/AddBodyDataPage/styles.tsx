import { ThemedView } from "@/components/ThemedView";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const PageContainer = styled(ThemedView)`
    flex: 1;
`;

export const ImageContainer = styled.Image`
    width: ${width * 0.3}px;
    height: ${height * 0.2}px;
    align-self: center;
    margin-top: 20px;
`;

export const InputsContainer = styled(ThemedView)`
    margin-top: 50px;
`;
