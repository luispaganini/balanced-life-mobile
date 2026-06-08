import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginOne from '../../Login/LoginOne';

jest.mock('@/store/UserStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    user: null,
    setUser: jest.fn(),
  })),
}));

jest.mock('@/store/TokenStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setAccessToken: jest.fn(),
    setRefreshToken: jest.fn(),
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

jest.mock('@/services/login/login', () => ({
  login: jest.fn(),
  loginVerifyCPF: jest.fn(),
}));

jest.mock('@/services/auth/googleAuth', () => ({
  signInWithGoogle: jest.fn(),
}));

describe('LoginOne Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all login fields and buttons', () => {
    const { getByPlaceholderText, getByText } = render(<LoginOne />);

    expect(getByPlaceholderText('E-mail or CPF')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('I forgot my password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Entrar com o Google')).toBeTruthy();
  });

  it('shows validation errors when fields are empty', async () => {
    const { getByText } = render(<LoginOne />);

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('E-mail or CPF is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });
});
