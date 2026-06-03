import { View, Keyboard, ScrollView, Alert } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import useUserStore from '@/store/UserStore';
import { Controller, useForm } from 'react-hook-form';
import IUserInterface from '@/interfaces/User/IUserInterface';
import { 
    PageContainer, 
    HeaderContainer, 
    HeaderButton, 
    HeaderTitle, 
    FormWrapper, 
    CardContainer, 
    InputLabel, 
    ButtonsContainer 
} from './styles';
import InputFormComponent from '@/components/application/Inputs/InputFormComponent';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { patchUser } from '@/services/user/user';
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type FormData = {
    name: string;
}

export default function ProfileEditPage() {
    const [loading, setLoading] = React.useState(false)
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const { user, setUser } = useUserStore() as { user: IUserInterface, setUser: (user: IUserInterface) => void };

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: user.name ? user.name : '',
        },
    })

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        Keyboard.dismiss()
        try {
            const response = await patchUser({
                name: data.name,
                id: undefined,
                birth: undefined,
                password: undefined,
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
            }, user.id as number)

            if ('id' in response) {
                setUser(response)
                Alert.alert(t('Sucesso'), t('Nome de perfil atualizado!'))
                router.back()
            } else {
                Alert.alert(t('Erro'), response.message || t('Falha ao atualizar perfil.'))
            }
        } catch (error) {
            console.error(error)
            Alert.alert(t('Erro'), t('Falha ao salvar as alterações.'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <PageContainer style={{ paddingTop: insets.top }}>
            {/* Header */}
            <HeaderContainer>
                <HeaderButton onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={26} color={Colors.dark.text} />
                </HeaderButton>
                <HeaderTitle>{t('Editar Nome')}</HeaderTitle>
                <View style={{ width: 36 }} />
            </HeaderContainer>

            {loading ? (
                <LoadingPageComponent />
            ) : (
                <ScrollView keyboardShouldPersistTaps="handled">
                    <FormWrapper>
                        <CardContainer>
                            <InputLabel>{t('Nome Completo')}</InputLabel>
                            <Controller
                                control={control}
                                rules={{
                                    required: t("Nome é obrigatório"),
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <InputFormComponent
                                        placeholder={t("Nome")}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        errors={errors.name}
                                        editable={true}
                                        title={false}
                                    />
                                )}
                                name="name"
                            />
                        </CardContainer>

                        <ButtonsContainer>
                            <ButtonComponent 
                                onPress={handleSubmit(onSubmit)} 
                                title={t("Salvar Nome")} 
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