import React from 'react'
import { LoadingContainer, PageContainer } from './styles'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function LoadingPageComponent() {
    const colorScheme = useColorScheme();
    return (
        <PageContainer>
            <LoadingContainer color={colorScheme == 'light' ? Colors.light.border : Colors.dark.border} size={24}/>
        </PageContainer>
    )
}