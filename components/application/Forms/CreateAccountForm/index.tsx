import { View, Alert } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import useUserStore from '@/store/UserStore';
import useTokenStore from '@/store/TokenStore';
import { useForm } from 'react-hook-form';
import { FormField } from '../FormField';
import { validationRules } from '@/validations/validationRules';
import { ButtonsContainer } from '@/pages/Profile/ChangePasswordPage/styles';
import ButtonComponent from '../ButtonComponent';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useCreateAccount } from '@/hooks/useCreateAccount';
import IFormCreateAccountValues from '@/interfaces/App/Form/IFormCreateAccountValues';
import { signInWithGoogle } from '@/services/auth/googleAuth';
import { googleLogin, loginVerifyCPF } from '@/services/login/login';

import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

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

const DividerText = styled.Text`
    margin-horizontal: 10px;
    font-size: 14px;
    color: ${Colors.color.grey};
`;

const GoogleButton = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${Colors.dark.card};
    border-width: 1px;
    border-color: ${Colors.dark.border};
    padding: 14px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 15px;
`;

const GoogleButtonText = styled.Text`
    color: ${Colors.dark.text};
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
`;

type CreateAccountFormProps = {
    navigate: (href: any) => void
    testID: string
}

export default function CreateAccountForm(props: CreateAccountFormProps) {
    const { t } = useTranslation();
    const { setUser } = useUserStore();
    const { setAccessToken, setRefreshToken } = useTokenStore();
    const { loading, submitAccount } = useCreateAccount();
    const onSubmit = async (data: any) => await submitAccount(data, setUser, t);

    const handleGoogleSignUp = async () => {
        try {
            const googleRes = await signInWithGoogle();
            if (googleRes.success && googleRes.idToken) {
                // Role ID 1 is Patient/User for mobile registrations
                const response = await googleLogin(googleRes.idToken, 1);
                if (response.status === 200) {
                    setAccessToken(response.data.accessToken)
                    setRefreshToken(response.data.refreshToken)

                    if (googleRes.email) {
                        try {
                            const userResponse = await loginVerifyCPF(googleRes.email)
                            if (userResponse) {
                                setUser(userResponse)
                            }
                        } catch (userError) {
                            console.log("Failed to fetch user profile for Google register email", userError)
                        }
                    }
                    router.navigate("/")
                } else {
                    Alert.alert(t('Google Sign-Up'), t('Failed to create account with Google'));
                }
            }
        } catch (error: any) {
            console.error('Google Sign-Up failed:', error);
            Alert.alert(
                t('Google Sign-Up'),
                `Error: ${error.message || error}\n}`
            );
        }
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
        <View testID={props.testID} style={{ paddingHorizontal: 20 }}>
            <FormField
                control={control}
                name="name"
                rules={rules.name}
                placeholder={t("Name")}
                testID="register-name-input"
                title
            />
            <FormField
                control={control}
                name="email"
                rules={rules.email}
                placeholder={t("E-mail")}
                testID="register-email-input"
                title
            />
            <FormField
                control={control}
                name="password"
                rules={rules.password}
                placeholder={t("Password")}
                testID="register-password-input"
                title
                password
            />
            <FormField
                control={control}
                name="confirmPassword"
                rules={rules.confirmPassword(password, t)}
                placeholder={t("Confirm Password")}
                testID="register-confirm-password-input"
                title
                password
            />
            <ButtonsContainer>
                <ButtonComponent onPress={handleSubmit(onSubmit)} title="Create Account" color={Colors.color.green} loading={loading} testID='create-account-button' />

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