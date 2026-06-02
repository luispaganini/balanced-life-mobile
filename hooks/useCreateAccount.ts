import { useState } from 'react';
import { router } from 'expo-router';
import { UserRole } from '@/enums/UserRole';
import { Alert } from 'react-native';
import { TFunction } from 'i18next';
import IUserInterface from '@/interfaces/User/IUserInterface';
import { createAccount } from '@/services/login/login';

export const useCreateAccount = () => {
    const [loading, setLoading] = useState(false);

    const submitAccount = async (
            data: any, 
            setUser: (user: IUserInterface) => void, 
            t: TFunction<"translation", undefined>
        ) => {
        setLoading(true);
        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
            cpf: undefined,
            phoneNumber: undefined,
            birth: undefined,
            gender: undefined,
            idUserRole: UserRole.CLIENT,
            isCompleteProfile: true,
        } as IUserInterface;

        try {
            const response = await createAccount(userData);
            if (typeof response === 'object' && response !== null && 'id' in response) {
                setUser(response);
                router.navigate("/login-one");
            } else {
                throw new Error(typeof response === 'string' ? response : 'Erro ao criar conta');
            }
        } catch (error) {
            Alert.alert(t("Create Account"), t("CPF or E-mail already registered"));
        } finally {
            setLoading(false);
        }
    };

    return { loading, submitAccount };
};
