import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useCreateAccount } from '@/hooks/useCreateAccount';
import CreateAccountForm from '../application/Forms/CreateAccountForm';

jest.mock('@/store/UserStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    user: null,
    setUser: jest.fn(),
  })),
}));

jest.mock('@/hooks/useCreateAccount', () => ({
  useCreateAccount: jest.fn(() => ({
    loading: false,
    submitAccount: jest.fn(),
  })),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
    navigate: jest.fn(),
  },
}));

describe('CreateAccountForm', () => {
  const mockNavigate = jest.fn();
  const mockSubmitAccount = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateAccount as jest.Mock).mockReturnValue({
      loading: false,
      submitAccount: mockSubmitAccount,
    });
  });

  it('renders all fields correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <CreateAccountForm navigate={mockNavigate} testID="test-create-account" />
    );

    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
    expect(getByText('Back')).toBeTruthy();
  });

  it('validates required fields', async () => {
    const { getByText } = render(
      <CreateAccountForm navigate={mockNavigate} testID="test-create-account" />
    );

    fireEvent.press(getByText('Create Account'));

    await waitFor(() => {
      expect(getByText('Name is required')).toBeTruthy();
      expect(getByText('E-mail is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
      expect(getByText('Confirm Password is required')).toBeTruthy();
    });
  });

  it('submits form with valid data', async () => {
    const { getByText, getByPlaceholderText } = render(
      <CreateAccountForm navigate={mockNavigate} testID="test-create-account" />
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('E-mail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'Password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'Password123');

    fireEvent.press(getByText('Create Account'));

    await waitFor(() => {
      expect(mockSubmitAccount).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123',
          confirmPassword: 'Password123',
        }),
        expect.any(Function),
        expect.any(Function)
      );
    });
  });
});