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
    InputGroup,
    InputLabel, 
    ButtonsContainer 
} from './styles';
import InputFormComponent from '@/components/application/Inputs/InputFormComponent';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import CalendarPickerComponent from '@/components/application/Forms/CalendarPickerComponent';
import { formatDate } from '@/utils/functionsApp';
import GenderRadioComponent from '@/components/application/Forms/GenderRadioComponent';
import { patchUser } from '@/services/user/user';
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type FormData = {
    email: string;
    phoneNumber: string;
    birthDate: string;
    gender: string;
}

export default function ProfileEditExtraPage() {
    const [loading, setLoading] = React.useState(false)
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const { user, setUser } = useUserStore() as { user: IUserInterface, setUser: (user: IUserInterface) => void };

    if (!user) {
        return (
            <PageContainer style={{ paddingTop: insets.top, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <LoadingPageComponent />
            </PageContainer>
        );
    }

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: user.email ? user.email : '',
            phoneNumber: user.phoneNumber ? user.phoneNumber : '',
            birthDate: user?.birth ? formatDate(user.birth) : "",
            gender: user?.gender ? user.gender : "",
        },
    })

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        Keyboard.dismiss()
        try {
            const response = await patchUser({
                email: data.email,
                birth: new Date(data.birthDate),
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                id: undefined,
                name: undefined,
                password: undefined,
                urlImage: undefined,
                cpf: undefined,
                street: undefined,
                number: undefined,
                zipCode: undefined,
                location: undefined,
                userRole: undefined,
                instagram: undefined,
                facebook: undefined,
                whatsapp: undefined,
                expirationLicence: undefined,
                isCompleteProfile: undefined,
                district: undefined
            }, user.id as number)

            if ('id' in response) {
                setUser(response)
                Alert.alert(t('Sucesso'), t('Perfil atualizado com sucesso!'))
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
                <HeaderTitle>{t('Editar Informações')}</HeaderTitle>
                <View style={{ width: 36 }} />
            </HeaderContainer>

            {loading ? (
                <LoadingPageComponent />
            ) : (
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <FormWrapper>
                        <CardContainer>
                            <InputGroup>
                                <InputLabel>E-mail</InputLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: t("E-mail é obrigatório"),
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: t("E-mail inválido"),
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputFormComponent
                                            placeholder={t("E-mail")}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            errors={errors.email}
                                            editable={true}
                                            title={false}
                                            keyboardType='email-address'
                                        />
                                    )}
                                    name="email"
                                />
                            </InputGroup>

                            <InputGroup>
                                <InputLabel>{t('Telefone')}</InputLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: t("Telefone é obrigatório"),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputFormComponent
                                            placeholder={t("Telefone")}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            errors={errors.phoneNumber}
                                            editable={true}
                                            title={false}
                                            mask={true}
                                            keyboardType='numeric'
                                            typeMask='cel-phone'
                                        />
                                    )}
                                    name="phoneNumber"
                                />
                            </InputGroup>

                            <InputGroup>
                                <InputLabel>{t('Data de Nascimento')}</InputLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: t("Data de nascimento é obrigatória"),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CalendarPickerComponent
                                            value={value}
                                            errors={errors.birthDate}
                                            onChange={onChange}
                                            maximumDate={new Date}
                                            title={false}
                                            placeholder={t("Data de nascimento")}
                                        />
                                    )}
                                    name="birthDate"
                                />
                            </InputGroup>

                            <InputGroup style={{ marginBottom: 0 }}>
                                <InputLabel>{t('Gênero')}</InputLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: t("Gênero é obrigatório"),
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <GenderRadioComponent onChange={onChange} value={value} errors={errors.gender} title={false} />
                                    )}
                                    name="gender"
                                />
                            </InputGroup>
                        </CardContainer>

                        <ButtonsContainer>
                            <ButtonComponent 
                                onPress={handleSubmit(onSubmit)} 
                                title={t("Salvar Alterações")} 
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