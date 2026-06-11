import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SnackDetailsPage from '../../Home/Snack/SnackDetailsPage';
import { getSnackDetailsAsync, deleteSnack, sendSnack, updateSnack } from '@/services/snack/snack';

const mockSnackStore = {
    snackDetails: {
        id: 1,
        appointment: "2026-06-11T08:00:00.000Z",
        observation: "Senti-me bem",
        status: 0,
        typeSnack: { id: 1, name: "Café da Manhã" },
        snacks: [
            {
                id: 100,
                quantity: 100,
                unitMeasurement: { id: 1, name: "g" },
                food: {
                    id: 201,
                    name: "Pão Integral",
                    foodNutritionInfo: [
                        { idNutritionalCompositionNavigation: { item: "energia" }, quantity: 250 }
                    ]
                },
                substitutions: [
                    {
                        id: 101,
                        quantity: 50,
                        unitMeasurement: { id: 1, name: "g" },
                        food: {
                            id: 202,
                            name: "Tapioca",
                            foodNutritionInfo: [
                                { idNutritionalCompositionNavigation: { item: "energia" }, quantity: 350 }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    setSnackDetails: jest.fn(),
    setObservation: jest.fn(),
    deleteSnackFromDetails: jest.fn()
};

jest.mock('@/store/SnackStore', () => ({
    useSnackStore: () => mockSnackStore
}));

jest.mock('@/hooks/useColorScheme', () => ({
    useColorScheme: () => 'light',
}));

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: () => ({ top: 20 }),
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
        push: jest.fn(),
    },
    useLocalSearchParams: () => ({ idMeal: '1', idTypeSnack: '1' }),
    Stack: {
        Screen: () => null,
    },
}));

jest.mock('@/services/snack/snack', () => ({
    getSnackDetailsAsync: jest.fn(() => Promise.resolve(mockSnackStore.snackDetails)),
    deleteSnack: jest.fn(() => Promise.resolve()),
    sendSnack: jest.fn(() => Promise.resolve()),
    updateSnack: jest.fn(() => Promise.resolve())
}));

jest.mock('@/services/user/user', () => ({
    uploadMealPicture: jest.fn(() => Promise.resolve({ url: "mock-url" })),
    deleteMealPicture: jest.fn(() => Promise.resolve())
}));

describe('SnackDetailsPage Substitution Feature', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the main food, calories, and shows inline substitute option', async () => {
        const { getByText, queryByText, getAllByText } = render(<SnackDetailsPage />);

        await waitFor(() => {
            expect(getByText('Pão Integral')).toBeTruthy();
            expect(getByText('100 g')).toBeTruthy();
            expect(getByText('Tapioca')).toBeTruthy();
            expect(getAllByText('250').length).toBeGreaterThanOrEqual(1); 
        });
    });

    it('allows selecting a substitute inline directly', async () => {
        const { getByText, queryByText, getAllByText } = render(<SnackDetailsPage />);

        await waitFor(() => {
            expect(getByText('Tapioca')).toBeTruthy();
        });

        fireEvent.press(getByText('Tapioca'));

        await waitFor(() => {
            expect(getByText('Substituído')).toBeTruthy();
            expect(getByText('Tapioca')).toBeTruthy();
            expect(getByText('50 g')).toBeTruthy();
            expect(getByText('Pão Integral')).toBeTruthy(); 
        });
    });

    it('persists selected substitute in database when saving', async () => {
        const { getByText } = render(<SnackDetailsPage />);

        await waitFor(() => {
            expect(getByText('Tapioca')).toBeTruthy();
        });

        fireEvent.press(getByText('Tapioca'));

        await waitFor(() => {
            expect(getByText('Salvar Alterações')).toBeTruthy();
        });

        fireEvent.press(getByText('Salvar Alterações'));

        await waitFor(() => {
            expect(updateSnack).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: 100,
                    idFood: 202,
                    quantity: 50,
                    idUnitMeasurement: 1,
                    idParentSnack: null
                }),
                100
            );
            expect(deleteSnack).toHaveBeenCalledWith(101);
            expect(sendSnack).toHaveBeenCalledWith(
                1,
                'Senti-me bem',
                1
            );
        });
    });
});
