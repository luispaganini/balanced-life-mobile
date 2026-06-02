import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";

export const PageContainer = styled(ThemedView)`
    flex:1
`;

export const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    align-self: center;
`;

export const InfoContainer = styled.View`
    padding: 20px;
`;

export const SocialMedia = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    align-self: center;
    width: 80%;
    margin-top: 20px;
`;

export const ButtonsContainer = styled.View`
    margin-bottom: 20px;
`;

export const SocialCircle = styled.TouchableOpacity<{ theme: 'light' | 'dark' }>`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: ${(props) => props.theme === 'light' ? '#f3f4f6' : Colors.dark.card};
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: ${(props) => props.theme === 'light' ? '#e5e7eb' : Colors.dark.border};
`;