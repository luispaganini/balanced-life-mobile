import { View, Text, Alert, Keyboard } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import useUserStore from '@/store/UserStore';
import { Controller, useForm } from 'react-hook-form';
import { UserRole } from '@/enums/UserRole';
import CalendarPickerComponent from '../CalendarPickerComponent';
import GenderRadioComponent from '../GenderRadioComponent';
import { FormField } from '../FormField';
import { validationRules } from '@/validations/validationRules';
import { ButtonsContainer } from '@/pages/Profile/ChangePasswordPage/styles';
import ButtonComponent from '../ButtonComponent';
import { Href, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useCreateAccount } from '@/hooks/useCreateAccount';
import IFormCreateAccountValues from '@/interfaces/App/Form/IFormCreateAccountValues';

type CreateAccountFormProps = {
    navigate: <T extends string | object>(href: Href<T>) => void
    testID: string
}

export default function CreateAccountForm(props: CreateAccountFormProps) {
    const { t } = useTranslation();
    const { user, setUser } = useUserStore();
    const { loading, submitAccount } = useCreateAccount();
    const onSubmit = async (data: any) => await submitAccount(data, setUser, t);
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IFormCreateAccountValues>({
        defaultValues: {
            name: '',
            email: '',
            cpf: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            birthDate: '',
            gender: '',
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
                name="cpf"
                rules={rules.cpf}
                placeholder={t("CPF")}
                title
                keyboardType='email-address'
                mask
                typeMask='cpf'
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
            <FormField
                control={control}
                name="phoneNumber"
                rules={{
                    required: t("Cellphone is required"),
                }}
                placeholder={t("Cellphone")}
                keyboardType="numeric"
                mask
                typeMask='cel-phone'
                title
            />
            <Controller
                control={control}
                rules={{
                    required: t("Birth Date is required"),
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CalendarPickerComponent
                        value={value}
                        errors={errors.birthDate}
                        onChange={onChange}
                        maximumDate={new Date}
                        title
                        placeholder={t("Birthdate")}
                        testID="birthdate-input"
                    />
                )}
                name="birthDate"
            />
            <Controller
                control={control}
                rules={{
                    required: t("Gender is required"),
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <GenderRadioComponent onChange={onChange} value={value} errors={errors.gender} title={true} />
                )}
                name="gender"
            />
            <ButtonsContainer>
                <ButtonComponent onPress={handleSubmit(onSubmit)} title="Create Account" color={Colors.color.green} loading={loading} testID='create-account-button'/>
                <ButtonComponent onPress={() => router.back()} title="Back" color={Colors.color.blue} />
            </ButtonsContainer>
        </View>
    )
}