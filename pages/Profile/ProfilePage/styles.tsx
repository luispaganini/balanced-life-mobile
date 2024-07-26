import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ColorSchemeName } from "react-native";
import { Avatar, Divider, Icon } from "react-native-paper";
import styled from "styled-components/native";

export const PageContainer = styled(ThemedView)`
    flex: 1;
    padding: 20px;
`;

export const ProfileInfoContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ProfileInfoContent = styled.View`
    flex-direction: row;
    flex-shrink: 1;
`;

export const UserInfoContainer = styled.View`
    flex-shrink: 1;
    padding-left: 15px;
`;

export const NameText = styled(ThemedText)`
    font-size: 18px;
    font-weight: bold;
    padding-top: 10px;
    padding-right: 20px;
    flex-shrink: 1;
`;

export const DividerContent = styled(Divider)<{ theme: ColorSchemeName }>`
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: ${(props) => Colors[props.theme as "light" | "dark"].border};
`;

export const ButtonLogOut = styled.TouchableOpacity`
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
`;

export const LogoutText = styled(ThemedText)`
    font-size: 16px;
    font-weight: bold;
    padding-left: 10px;
    color: ${Colors.color.red};
`;

export const InfoExtraUserContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const InfoExtraUserItems = styled.View`
    flex-shrink: 1;
`;