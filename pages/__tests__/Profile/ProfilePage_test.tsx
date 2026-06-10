import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfilePage from '../../Profile/ProfilePage';
import { router } from 'expo-router';
import useTokenStore from '@/store/TokenStore';

jest.mock('@/store/UserStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '123456789',
      gender: 'M',
      birth: '1990-01-01',
    },
    setUser: jest.fn(),
  })),
}));

jest.mock('@/store/TokenStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    clearTokens: jest.fn(),
  })),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 20 }),
}));

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

jest.mock('@/services/user/user', () => ({
  patchUser: jest.fn(),
}));

describe('ProfilePage Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders profile details correctly', () => {
    const { getByText, getAllByText } = render(<ProfilePage />);

    expect(getAllByText('John Doe').length).toBeGreaterThan(0);
    expect(getByText('john@example.com')).toBeTruthy();
    expect(getByText('123456789')).toBeTruthy();
    expect(getByText('M')).toBeTruthy();
  });

  it('navigates to change password page on button press', () => {
    const { getByText } = render(<ProfilePage />);

    fireEvent.press(getByText('Alterar Senha'));
    expect(router.navigate).toHaveBeenCalledWith('/change-password-page');
  });

  it('navigates to edit basic profile page on press', () => {
    const { getAllByText } = render(<ProfilePage />);
    const editButtons = getAllByText('Editar');

    fireEvent.press(editButtons[0]);
    expect(router.navigate).toHaveBeenCalledWith('/edit-page');
  });

  it('navigates to edit extra profile page on press', () => {
    const { getAllByText } = render(<ProfilePage />);
    const editButtons = getAllByText('Editar');

    fireEvent.press(editButtons[1]);
    expect(router.navigate).toHaveBeenCalledWith('/edit-extra-page');
  });
});
