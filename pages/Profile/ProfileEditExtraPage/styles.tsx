import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const PageContainer = styled.View`
    flex: 1;
    background-color: ${Colors.dark.background};
`;

export const HeaderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-vertical: 15px;
    padding-horizontal: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.dark.border};
`;

export const HeaderButton = styled.TouchableOpacity`
    padding: 5px;
`;

export const HeaderTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${Colors.dark.text};
`;

export const FormWrapper = styled.View`
    padding: 20px;
`;

export const CardContainer = styled.View`
    background-color: ${Colors.dark.card};
    border-radius: 16px;
    padding: 20px;
    border-width: 1px;
    border-color: ${Colors.dark.border};
    margin-bottom: 25px;
`;

export const InputGroup = styled.View`
    margin-bottom: 18px;
`;

export const InputLabel = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${Colors.dark.text};
    margin-bottom: 8px;
`;

export const ButtonsContainer = styled.View`
    margin-top: 10px;
    margin-bottom: 30px;
`;