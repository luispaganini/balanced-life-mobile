import { describe, it, expect } from '@jest/globals';
import React from 'react';
import { render } from '@testing-library/react-native';
import CreateAccountOne from '../../CreateAccount/CreateAccountOne';

describe('CreateAccountOne Screen', () => {
    it('deve renderizar o logo e o título da página', () => {
        const { getByTestId, getByText } = render(<CreateAccountOne />);
        expect(getByTestId('logo-image')).toBeTruthy();
        expect(getByText('Create Account')).toBeTruthy();
    });

    it('deve renderizar o componente CreateAccountForm', () => {
        const { getByTestId } = render(<CreateAccountOne />);
        expect(getByTestId('create-account-form')).toBeTruthy();
    });
});
