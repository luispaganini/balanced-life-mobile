import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components";

export const SafeAreaViewComponent = styled(SafeAreaView)`
    flex: 1;
    padding-top: ${ StatusBar.currentHeight };
`;