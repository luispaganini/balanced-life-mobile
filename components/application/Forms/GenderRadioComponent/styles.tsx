import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const PageContainer = styled.View`
    width: 90%;
    align-self: center;
    margin-top: 10px;
`;

export const RadioContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const ErrorText = styled(ThemedText)`
    color: ${Colors.color.red};
    margin-left: 5px;
`;

export const TitleInput = styled(ThemedText)`
    font-weight: bold;
    margin-bottom: 5px;
    padding-left: 5px;
`;