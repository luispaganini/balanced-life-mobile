import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styled from 'styled-components/native';

export const LoadingMoreContainer = styled(ThemedView)`
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const LoadingMoreText = styled(ThemedText)`
  font-size: 16px;
  margin-top: 10px;
`;