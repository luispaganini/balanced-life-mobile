import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";

export const ItemContainer = styled(ThemedView)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
`

export const TextItem = styled(ThemedText)`
    flex: 1;
    flex-wrap: wrap;
    margin-right: 10px;
`

export const IconsContainer = styled(ThemedView)`
    flex-direction: row;
    align-items: center;
`

export const IconButtonComponent = styled(IconButton)`
    margin-right: 0px;
    margin-left: 0px;
`

export const AgeText = styled(ThemedText)`
    font-size: 12px;
`
