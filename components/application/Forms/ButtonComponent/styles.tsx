import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const ButtonComponentContainer = styled.TouchableOpacity<{color: string}>`
    background-color: ${props => props.color};
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    width: 90%;
    align-self: center;
`;

export const TextComponent = styled.Text`
    color: ${Colors.color.white};
    font-size: 18px;
    font-weight: bold;
`;