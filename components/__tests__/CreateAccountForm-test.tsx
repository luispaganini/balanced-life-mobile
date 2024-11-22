import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import useUserStore from '@/store/UserStore';
import { useCreateAccount } from '@/hooks/useCreateAccount';
import { validationRules } from '@/validations/validationRules';
import CreateAccountForm from '../application/Forms/CreateAccountForm';

// Mock hooks e dependências
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
  },
}));

describe('CreateAccountForm', () => {
  const mockNavigate = jest.fn();
  const mockSubmitAccount = jest.fn();

  beforeEach(() => {
    (useCreateAccount as jest.Mock).mockReturnValue({
      loading: false,
      submitAccount: mockSubmitAccount,
    });
  });

  it('renders all fields correctly', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <CreateAccountForm navigate={mockNavigate} testID="test-create-account" />
    );

    const calendarPickerText = getByTestId('calendar-picker-text');
    expect(calendarPickerText.props.children).toBe('Birthdate');

    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('CPF')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByPlaceholderText('Cellphone')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
    expect(getByText('Back')).toBeTruthy();
  });

  it('validates required fields', async () => {
    const { getByText, getByPlaceholderText } = render(
      <CreateAccountForm navigate={mockNavigate} testID="test-create-account" />
    );

    fireEvent.press(getByText('Create Account'));

    await waitFor(() => {
      expect(getByText('Name is required')).toBeTruthy();
      expect(getByText('E-mail is required')).toBeTruthy();
      expect(getByText('CPF is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
      expect(getByText('Confirm Password is required')).toBeTruthy();
      expect(getByText('Cellphone is required')).toBeTruthy();
      expect(getByText('Birth Date is required')).toBeTruthy();
      expect(getByText('Gender is required')).toBeTruthy();
    });
  });

//   it('submits form with valid data', async () => {
//     const { getByText, getByPlaceholderText, getByTestId } = render(
//         <CreateAccountForm navigate={mockNavigate} testID="test-create-account" />
//     );

//     fireEvent.changeText(getByPlaceholderText('Name'), 'Test User');
//     fireEvent.changeText(getByPlaceholderText('E-mail'), 'test@example.com');
//     fireEvent.changeText(getByPlaceholderText('CPF'), '123.456.789-09');
//     fireEvent.changeText(getByPlaceholderText('Password'), 'Password123!');
//     fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'Password123!');
//     fireEvent.changeText(getByPlaceholderText('Cellphone'), '(11) 99999-9999');
    
//     // Simula a seleção de data no CalendarPickerComponent
//     fireEvent.press(getByTestId('calendar-picker-component'));
//     fireEvent(getByTestId('calendar-picker-component'), 'onChange', { nativeEvent: { timestamp: new Date('2000-01-01').getTime() } });

//     fireEvent.press(getByText('Create Account'));

//     await waitFor(() => {
//         expect(mockSubmitAccount).toHaveBeenCalledWith(
//           expect.objectContaining({
//             name: 'Test User',
//             email: 'test@example.com',
//             cpf: '123.456.789-09',
//             password: 'Password123!',
//             confirmPassword: 'Password123!',
//             phoneNumber: '(11) 99999-9999',
//             birthDate: '2000-01-01', // Certifique-se de que o formato da data está correto
//           }),
//           expect.any(Function),
//           expect.any(Function)
//         );
//       });
      
// });

  // it('handles navigation back', () => {
  //   const { getByText } = render(
  //     <CreateAccountForm navigate={mockNavigate} testID="test-create-account" />
  //   );

  //   fireEvent.press(getByText('Back'));
  //   expect(mockNavigate).toHaveBeenCalled();
  // });
});