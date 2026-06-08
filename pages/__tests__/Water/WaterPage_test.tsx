import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WaterPage from '../../Water/WaterPage';

const mockWaterStore = {
  goalWater: 2000,
  currentWater: 500,
  consumedWaterPercent: 25,
  waterDay: new Date(),
  notificationsEnabled: false,
  notificationInterval: 120,
  notificationStartTime: '08:00',
  notificationEndTime: '20:00',
  setGoalWater: jest.fn(),
  setCurrentWater: jest.fn(),
  setConsumedWaterPercent: jest.fn(),
  setWaterDay: jest.fn(),
  setNotificationsEnabled: jest.fn(),
  setNotificationInterval: jest.fn(),
  setNotificationStartTime: jest.fn(),
  setNotificationEndTime: jest.fn(),
};

jest.mock('@/store/WaterStore', () => ({
  __esModule: true,
  default: () => mockWaterStore,
}));

jest.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: () => 'dark',
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 20 }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@/utils/notifications', () => ({
  scheduleWaterReminders: jest.fn(() => Promise.resolve()),
}));

describe('WaterPage Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders water progress and goal correctly', () => {
    const { getByText } = render(<WaterPage />);
    expect(getByText('Water')).toBeTruthy();
    expect(getByText('500 / 2000ml')).toBeTruthy();
    expect(getByText('Goal: 2000ml')).toBeTruthy();
    expect(getByText('Missing: 1500ml')).toBeTruthy();
  });

  it('triggers custom water addition on button press', () => {
    const { getByPlaceholderText, getByTestId } = render(<WaterPage />);
    const input = getByPlaceholderText('Amount of water');
    fireEvent.changeText(input, '250');
    const addButton = getByTestId('add-water-btn');
    fireEvent.press(addButton);
    expect(mockWaterStore.setCurrentWater).toHaveBeenCalledWith(750);
  });

  it('triggers custom water subtraction on button press', () => {
    const { getByPlaceholderText, getByTestId } = render(<WaterPage />);
    const input = getByPlaceholderText('Amount of water');
    fireEvent.changeText(input, '150');
    const removeButton = getByTestId('remove-water-btn');
    fireEvent.press(removeButton);
    expect(mockWaterStore.setCurrentWater).toHaveBeenCalledWith(350);
  });

  it('adds quick add preset volume correctly', () => {
    const { getByText } = render(<WaterPage />);
    const presetButton = getByText('+250ml');
    fireEvent.press(presetButton);
    expect(mockWaterStore.setCurrentWater).toHaveBeenCalledWith(750);
  });

  it('toggles notifications', () => {
    const { getByRole } = render(<WaterPage />);
    const toggle = getByRole('switch');
    fireEvent(toggle, 'valueChange', true);
    expect(mockWaterStore.setNotificationsEnabled).toHaveBeenCalledWith(true);
  });
});
