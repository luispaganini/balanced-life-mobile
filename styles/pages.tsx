import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";

export const SafeAreaViewComponent = styled(SafeAreaView)`
    flex: 1;
    padding-top: ${ StatusBar.currentHeight }px;
`;