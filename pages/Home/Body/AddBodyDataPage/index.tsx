import { ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { ImageContainer, InputsContainer, PageContainer } from './styles'
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaViewComponent } from '@/styles/pages';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputFormComponent from '@/components/application/Forms/InputFormComponent';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { Colors } from '@/constants/Colors';
import useUserStore from '@/store/UserStore';
import IUserInterface from '@/interfaces/IUserInterface';
import { addBodyData } from '@/services/body/body';
import { router } from 'expo-router';

export default function AddBodyDataPage() {
    const colorTheme = useColorScheme();
    const { user } = useUserStore() as { user: IUserInterface };
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const images = {
        light: require('@/assets/images/fullbody-light.png'),
        dark: require('@/assets/images/fullbody.png'),
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            height: "",
            weight: "",
        },
    })

    const updateData = async (data: { height: string, weight: string }) => {
        setLoading(true);
        try {
            await addBodyData({
                height: parseFloat(data.height),
                weight: parseFloat(data.weight),
                idUser: user.id as number
            });
            Alert.alert(
                t("Body data"),
                t("Body data updated successfully"),
                [
                    {
                        text: "OK",
                        onPress: () => router.back()
                    }
                ]
            );
        } catch (error) {
            console.error(error);
            Alert.alert(t("Body data"), t("Error updating body data"));
        } finally {
            setLoading(false);
        }
    }
    return (
        <PageContainer>
            <ScrollView>
                <ImageContainer source={images[colorTheme == 'light' ? 'light' : 'dark']} />
                <InputsContainer>
                    <Controller
                        control={control}
                        rules={{
                            required: t("Height is required"),
                            pattern: {
                                value: /^\d+(\.\d{1,2})?$/,
                                message: "Invalid height"
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                placeholder={t("Height in meters")}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.height}
                                editable={true}
                                keyboardType="numeric"
                                title={true}
                                typeMask='custom'
                                mask={true}
                                options={{ mask: '9.99' }}
                            />
                        )}
                        name="height"
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: t("Weight is required"),
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputFormComponent
                                placeholder={t("Weight in kilograms")}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                errors={errors.weight}
                                editable={true}
                                keyboardType="numeric"
                                title={true}
                                mask={true}
                                typeMask='money'
                                options={{ precision: 2, separator: ',', delimiter: '.', unit: '', suffixUnit: '' }}
                            />
                        )}
                        name="weight"
                    />
                </InputsContainer>
                <ButtonComponent color={Colors.color.green} onPress={handleSubmit(updateData)} title='Update body data' loading={loading}></ButtonComponent>
            </ScrollView>
        </PageContainer>
    )
}