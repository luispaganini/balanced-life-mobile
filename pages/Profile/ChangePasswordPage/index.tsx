import { View, Keyboard, ScrollView, Alert } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';
import useUserStore from '@/store/UserStore';
import { Controller, useForm } from 'react-hook-form';
import IUserInterface from '@/interfaces/User/IUserInterface';
import { useColorScheme } from '@/hooks/useColorScheme';
import { 
    PageContainer, 
    HeaderContainer, 
    HeaderButton, 
    HeaderTitle, 
    FormWrapper, 
    CardContainer, 
    InputGroup,
    InputLabel, 
    ButtonsContainer 
} from './styles';
import InputFormComponent from '@/components/application/Inputs/InputFormComponent';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { patchUser } from '@/services/user/user';
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useTokenStore from '@/store/TokenStore';

type FormData = {
    password: string;
    confirmPassword: string
}

export default function ChangePasswordPage() {
    const [loading, setLoading] = React.useState(false)
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const colorTheme = useColorScheme();
    const { userId: paramUserId } = useLocalSearchParams<{ userId?: string }>();
    const isRecovery = !!paramUserId;
    const { user, setUser } = useUserStore() as { user: IUserInterface | null, setUser: (user: IUserInterface) => void };

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: ''
        },
    })
    const password = watch('password');

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        Keyboard.dismiss()
        const targetUserId = isRecovery ? parseInt(paramUserId!) : (user?.id as number);
        
        try {
            const response = await patchUser({
                password: data.password,
                id: undefined,
                name: undefined,
                birth: undefined,
                email: undefined,
                urlImage: undefined,
                gender: undefined,
                cpf: undefined,
                street: undefined,
                number: undefined,
                zipCode: undefined,
                location: undefined,
                userRole: undefined,
                phoneNumber: undefined,
                instagram: undefined,
                facebook: undefined,
                whatsapp: undefined,
                expirationLicence: undefined,
                isCompleteProfile: undefined,
                district: undefined
            }, targetUserId)

            if ('id' in response) {
                if (isRecovery) {
                    const { clearTokens } = useTokenStore.getState();
                    clearTokens();
                    Alert.alert(t('Sucesso'), t('Senha recuperada com sucesso!'))
                    router.replace('/login-one')
                } else {
                    setUser(response)
                    Alert.alert(t('Sucesso'), t('Senha atualizada com sucesso!'))
                    router.back()
                }
            } else {
                Alert.alert(t('Erro'), response.message || t('Falha ao atualizar senha.'))
            }
        } catch (error) {
            console.error(error)
            Alert.alert(t('Erro'), t('Falha ao salvar a nova senha.'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <PageContainer theme={colorTheme} style={{ paddingTop: insets.top }}>
            <StatusBar style={colorTheme === 'light' ? 'dark' : 'light'} />
            {/* Header */}
            <HeaderContainer theme={colorTheme}>
                <HeaderButton onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={26} color={colorTheme === 'dark' ? Colors.dark.text : Colors.light.text} />
                </HeaderButton>
                <HeaderTitle theme={colorTheme}>{isRecovery ? t('Recuperar Senha') : t('Alterar Senha')}</HeaderTitle>
                <View style={{ width: 36 }} />
            </HeaderContainer>

            {loading ? (
                <LoadingPageComponent />
            ) : (
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <FormWrapper>
                        <CardContainer theme={colorTheme}>
                            <InputGroup>
                                <InputLabel theme={colorTheme}>{t('Nova Senha')}</InputLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: t("Senha é obrigatória"),
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                            message: t("A senha deve conter pelo menos 8 caracteres, incluindo uma letra e um número"),
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputFormComponent
                                            testID="new-password-input"
                                            placeholder={t("Senha")}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            errors={errors.password}
                                            editable={true}
                                            password={true}
                                            title={false}
                                        />
                                    )}
                                    name="password"
                                />
                            </InputGroup>

                            <InputGroup style={{ marginBottom: 0 }}>
                                <InputLabel theme={colorTheme}>{t('Confirmar Nova Senha')}</InputLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: t("Confirmação de senha é obrigatória"),
                                        validate: (value) =>
                                            value === password || t("As senhas não coincidem"),
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                            message: t("A senha deve conter pelo menos 8 caracteres, incluindo uma letra e um número"),
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputFormComponent
                                            testID="confirm-password-input"
                                            placeholder={t("Confirmar Senha")}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            errors={errors.confirmPassword}
                                            editable={true}
                                            password={true}
                                            title={false}
                                        />
                                    )}
                                    name="confirmPassword"
                                />
                            </InputGroup>
                        </CardContainer>

                        <ButtonsContainer>
                            <ButtonComponent 
                                testID="save-password-button"
                                onPress={handleSubmit(onSubmit)} 
                                title={t("Salvar Nova Senha")} 
                                color={Colors.color.green} 
                                loading={loading} 
                            />
                        </ButtonsContainer>
                    </FormWrapper>
                </ScrollView>
            )}
        </PageContainer>
    )
}