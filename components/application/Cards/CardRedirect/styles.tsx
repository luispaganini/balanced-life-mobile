import { Dimensions } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const CardRedirectContainer = styled.TouchableOpacity<{ color: string}>`
    width: ${width / 2.3}px;
    background-color: ${props => props.color};
    border-radius: 10px;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;
    shadow-color: #000000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.8;
    shadow-radius: 10px;
    elevation: 10;
`;

export const ImageContainer = styled.Image`
    width: 80%;
    height: ${height / 4}px;
`;

export const TextContainer = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
`;

