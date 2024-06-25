import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const NoDataContainer = styled(ThemedView)`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export const RefreshButton = styled.TouchableOpacity`
    padding: 10px;
    margin-top: 10px;
    background-color: ${Colors.light.tabIconSelected};
    border-radius: 5px;
`;

export const RefreshButtonText = styled.Text`
    color: ${Colors.dark.text};
`;