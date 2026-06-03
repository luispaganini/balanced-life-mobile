import { Alert } from 'react-native'
import React, { useState } from 'react'
import { 
    BackButton, 
    ButtonWrapper, 
    FormCard, 
    HeaderContainer, 
    HeaderPlaceholder, 
    HeaderTitle, 
    ImageCard, 
    InfoText, 
    InputsContainer, 
    PageContainer, 
    ScrollContainer 
} from './styles'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputWithTagComponent from '@/components/application/Inputs/InputWithTagComponent';
import ButtonComponent from '@/components/application/Forms/ButtonComponent';
import { Colors } from '@/constants/Colors';
import useUserStore from '@/store/UserStore';
import IUserInterface from '@/interfaces/User/IUserInterface';
import { addBodyData } from '@/services/body/body';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AddBodyDataPage() {
    const colorTheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const { user } = useUserStore() as { user: IUserInterface };
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

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
            // Parse masked values: height mask is '9.99' → e.g. "1.75"
            // weight money mask → e.g. "85,50" or "85.50"
            const parsedHeight = parseFloat(data.height.replace(',', '.'));
            const parsedWeight = parseFloat(data.weight.replace('.', '').replace(',', '.'));
            await addBodyData({
                height: parsedHeight,
                weight: parsedWeight,
                idUser: user.id as number
            });
            Alert.alert(
                t("Body Data"),
                t("Body data updated"),
                [
                    {
                        text: "OK",
                        onPress: () => router.push('/body')
                    }
                ]
            );
        } catch (error) {
            console.error(error);
            Alert.alert(t("Body Data"), t("Error updating body data"));
        } finally {
            setLoading(false);
        }
    }

    const isLight = colorTheme === 'light';
    const iconColor = isLight ? '#000000' : '#FFFFFF';

    return (
        <PageContainer theme={colorTheme} style={{ paddingTop: insets.top }}>
            {/* Custom Header with Back Button */}
            <HeaderContainer theme={colorTheme}>
                <BackButton onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={iconColor} />
                </BackButton>
                <HeaderTitle theme={colorTheme}>{t('Update body data')}</HeaderTitle>
                <HeaderPlaceholder />
            </HeaderContainer>

            <ScrollContainer showsVerticalScrollIndicator={false}>
                {/* Creative Info/Motivational Card */}
                <ImageCard theme={colorTheme}>
                    <Ionicons name="stats-chart-outline" size={42} color={Colors.color.green} style={{ marginBottom: 10 }} />
                    <InfoText theme={colorTheme}>
                        {t('Atualize seus dados para manter seus indicadores e gráficos sempre precisos.')}
                    </InfoText>
                </ImageCard>

                {/* Form Inputs Container */}
                <FormCard theme={colorTheme}>
                    <InputsContainer>
                        <Controller
                            control={control}
                            rules={{
                                required: t("Height is required"),
                                validate: (v) => {
                                    const n = parseFloat(v.replace(',', '.'));
                                    return (!isNaN(n) && n > 0.5 && n < 3.0) || t("Invalid height");
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <InputWithTagComponent
                                    placeholder={t("Height in meters")}
                                    onChangeText={onChange}
                                    value={value}
                                    errors={errors.height}
                                    editable={true}
                                    keyboardType="numeric"
                                    title={true}
                                    colorTag={Colors.color.purple}
                                    tagText="m"
                                    mask={true}
                                    typeMask="custom"
                                    options={{ mask: '9.99' }}
                                />
                            )}
                            name="height"
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: t("Weight is required"),
                                validate: (v) => {
                                    const n = parseFloat(v.replace('.', '').replace(',', '.'));
                                    return (!isNaN(n) && n > 1 && n < 500) || t("Invalid weight");
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <InputWithTagComponent
                                    placeholder={t("Weight in kilograms")}
                                    onChangeText={onChange}
                                    value={value}
                                    errors={errors.weight}
                                    editable={true}
                                    keyboardType="numeric"
                                    title={true}
                                    colorTag={Colors.color.blue}
                                    tagText="kg"
                                    mask={true}
                                    typeMask="money"
                                    options={{ precision: 1, separator: ',', delimiter: '.', unit: '', suffixUnit: '' }}
                                />
                            )}
                            name="weight"
                        />
                    </InputsContainer>
                </FormCard>

                {/* Submit Action Button */}
                <ButtonWrapper>
                    <ButtonComponent 
                        color={Colors.color.green} 
                        onPress={handleSubmit(updateData)} 
                        title={t('Update body data')} 
                        loading={loading}
                    />
                </ButtonWrapper>
            </ScrollContainer>
        </PageContainer>
    )
}