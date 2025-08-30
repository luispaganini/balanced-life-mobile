import { useState } from 'react';
import { router } from 'expo-router';
import { UserRole } from '@/enums/UserRole';
import { Alert } from 'react-native';
import { TFunction } from 'i18next';
import IUserInterface from '@/interfaces/User/IUserInterface';
import { createAccount } from '@/services/login/login';
import { AxiosError } from 'axios';

export const useCreateAccount = () => {
    const [loading, setLoading] = useState(false);

    const submitAccount = async (
            data: any, 
            setUser: (user: IUserInterface) => void, 
            t: TFunction<"translation", undefined>
        ) => {
        setLoading(true);
        const userData = {
            ...data,
            birth: new Date(data.birthDate),
            idUserRole: UserRole.CLIENT,
            isCompleteProfile: false,
        };

        try {
            const response = await createAccount(userData);
            if (response?.status === 201) {
                setUser(response.data);
                router.navigate("/(login)/login-two");
            }
        } catch (error: AxiosError | any) {
            console.error(error);
            const message = error?.response?.data?.message ?? "Unknown error";
            Alert.alert(t("Create Account"), t(message));
        } finally {
            setLoading(false);
        }
    };

    return { loading, submitAccount };
};
