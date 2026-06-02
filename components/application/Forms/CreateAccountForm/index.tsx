import { View, Text, Alert, Keyboard } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import useUserStore from '@/store/UserStore';
import { useForm } from 'react-hook-form';
import { FormField } from '../FormField';
import { validationRules } from '@/validations/validationRules';
import { ButtonsContainer } from '@/pages/Profile/ChangePasswordPage/styles';
import ButtonComponent from '../ButtonComponent';
import { Href, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useCreateAccount } from '@/hooks/useCreateAccount';
import IFormCreateAccountValues from '@/interfaces/App/Form/IFormCreateAccountValues';

type CreateAccountFormProps = {
    navigate: (href: any) => void
    testID: string
}

import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

const DividerContainer = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const DividerLine = styled.View`
    flex: 1;
    height: 1px;
    background-color: ${Colors.dark.border};
`;

const DividerText = styled(ThemedText)`
    margin-horizontal: 10px;
    font-size: 14px;
    color: ${Colors.color.grey};
`;

const GoogleButton = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${Colors.color.white};
    border-width: 1px;
    border-color: #d1d5db;
    padding: 14px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
`;

const GoogleButtonText = styled.Text`
    color: #374151;
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
`;

export default function CreateAccountForm(props: CreateAccountFormProps) {
    const { t } = useTranslation();
    const { user, setUser } = useUserStore();
    const { loading, submitAccount } = useCreateAccount();
    const onSubmit = async (data: any) => await submitAccount(data, setUser, t);

    const handleGoogleSignUp = () => {
        Alert.alert(
            t('Google Sign-Up'),
            t('Deseja criar sua conta utilizando os seus dados do Google?'),
            [
                {
                    text: t('Simular'),
                    onPress: async () => {
                        try {
                            const mockData = {
                                name: "Paciente Teste Google",
                                email: "paciente.google@balancedlife.com",
                                password: "password123",
                            };
                            await onSubmit(mockData);
                        } catch (err) {
                            Alert.alert(t('Error'), t('Failed to create account with Google'));
                        }
                    }
                },
                {
                    text: t('Cancelar'),
                    style: 'cancel'
                }
            ]
        );
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IFormCreateAccountValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const password = watch('password');
    const rules = validationRules(t)
    return (
        <View testID={props.testID}>
            <FormField
                control={control}
                name="name"
                rules={rules.name}
                placeholder={t("Name")}
                title
            />
            <FormField
                control={control}
                name="email"
                rules={rules.email}
                placeholder={t("E-mail")}
                title
            />
            <FormField
                control={control}
                name="password"
                rules={rules.password}
                placeholder={t("Password")}
                title
                password
            />
            <FormField
                control={control}
                name="confirmPassword"
                rules={rules.confirmPassword(password, t)}
                placeholder={t("Confirm Password")}
                title
                password
            />
            <ButtonsContainer>
                <ButtonComponent onPress={handleSubmit(onSubmit)} title="Create Account" color={Colors.color.green} loading={loading} testID='create-account-button'/>
                
                <DividerContainer>
                    <DividerLine />
                    <DividerText>{t('OU')}</DividerText>
                    <DividerLine />
                </DividerContainer>

                <GoogleButton onPress={handleGoogleSignUp}>
                    <AntDesign name="google" size={20} color="#DB4437" />
                    <GoogleButtonText>{t('Cadastrar com o Google')}</GoogleButtonText>
                </GoogleButton>

                <ButtonComponent onPress={() => router.back()} title="Back" color={Colors.color.blue} />
            </ButtonsContainer>
        </View>
    )
}