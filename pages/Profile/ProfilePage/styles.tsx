import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const PageContainer = styled.View`
    flex: 1;
    background-color: ${Colors.dark.background};
`;

export const ScrollContainer = styled.ScrollView`
    flex: 1;
    padding-horizontal: 20px;
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

export const HeaderTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${Colors.dark.text};
`;

export const ProfileCard = styled.View`
    background-color: ${Colors.dark.card};
    border-radius: 16px;
    padding: 24px;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    border-width: 1px;
    border-color: ${Colors.dark.border};
`;

export const AvatarWrapper = styled.View`
    position: relative;
    margin-bottom: 16px;
`;

export const AvatarImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${Colors.color.green};
`;

export const AvatarFallback = styled.View`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: #00B38C20;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-color: ${Colors.color.green};
`;

export const AvatarFallbackText = styled.Text`
    font-size: 36px;
    font-weight: bold;
    color: ${Colors.color.green};
`;

export const CameraBadge = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${Colors.color.green};
    width: 32px;
    height: 32px;
    border-radius: 16px;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-color: ${Colors.dark.card};
    elevation: 3;
`;

export const NameText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: ${Colors.dark.text};
    text-align: center;
    margin-bottom: 4px;
`;

export const AgeText = styled.Text`
    font-size: 14px;
    color: ${Colors.color.grey};
    margin-bottom: 16px;
`;

export const OutlineButton = styled.TouchableOpacity`
    border-width: 1px;
    border-color: ${Colors.color.green};
    border-radius: 8px;
    padding-vertical: 8px;
    padding-horizontal: 16px;
    align-items: center;
`;

export const OutlineButtonText = styled.Text`
    color: ${Colors.color.green};
    font-size: 14px;
    font-weight: 600;
`;

export const SectionHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-horizontal: 4px;
`;

export const SectionTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${Colors.dark.text};
`;

export const EditLink = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

export const EditLinkText = styled.Text`
    color: ${Colors.color.green};
    font-size: 14px;
    font-weight: 600;
    margin-right: 4px;
`;

export const InfoListCard = styled.View`
    background-color: ${Colors.dark.card};
    border-radius: 16px;
    border-width: 1px;
    border-color: ${Colors.dark.border};
    overflow: hidden;
    margin-bottom: 25px;
`;

export const InfoItemRow = styled.View`
    flex-direction: row;
    align-items: center;
    padding-vertical: 16px;
    padding-horizontal: 20px;
`;

export const InfoIconWrapper = styled.View`
    width: 36px;
    height: 36px;
    border-radius: 18px;
    background-color: #ffffff0a;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
`;

export const InfoTextColumn = styled.View`
    flex: 1;
`;

export const InfoLabel = styled.Text`
    font-size: 12px;
    color: ${Colors.color.grey};
    margin-bottom: 2px;
    text-transform: uppercase;
`;

export const InfoValue = styled.Text`
    font-size: 15px;
    color: ${Colors.dark.text};
    font-weight: 500;
`;

export const LogOutButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #D7595915;
    border-width: 1px;
    border-color: #D7595930;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 40px;
`;

export const LogOutText = styled.Text`
    color: ${Colors.color.red};
    font-size: 16px;
    font-weight: bold;
    margin-left: 8px;
`;