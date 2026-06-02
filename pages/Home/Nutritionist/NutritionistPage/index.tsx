import { Alert, Dimensions, Linking, ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { ButtonsContainer, ImageContainer, InfoContainer, PageContainer, SocialMedia, SocialCircle } from './styles'
import ProfileInfoComponent from '@/components/application/Lists/ProfileInfoComponent'
import { useTranslation } from 'react-i18next'
import { formatToBr } from '@/utils/functionsApp'
import { useNutritionistStore } from '@/store/NutritionistStore'
import ButtonComponent from '@/components/application/Forms/ButtonComponent'
import StatusNutritionist from '@/enums/StatusNutritionist'
import { updateNutritionistLink } from '@/services/user/user'
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent'

export default function NutritionistPage() {
    const colorScheme = useColorScheme();
    const { nutritionistSelected, setNutritionistSelected } = useNutritionistStore();
    const [loading, setLoading] = React.useState(false);
    const { t } = useTranslation()
    const widthPage = Dimensions.get('window').width;

    const updateStatus = async (status: StatusNutritionist) => {
        try {
            const response = await updateNutritionistLink({
                id: nutritionistSelected.link.id,
                idNutritionist: nutritionistSelected.link.idNutritionist,
                idPatient: nutritionistSelected.link.idPatient,
                isCurrentNutritionist: nutritionistSelected.link.isCurrentNutritionist,
                linkStatus: status
            })

            if (response.status == 200) {
                setNutritionistSelected({
                    nutritionist: nutritionistSelected.nutritionist,
                    link: response.data
                })
            }
        } catch (error) {
            Alert.alert(t('Error'))
        } finally {
            setLoading(false)
        }
    }

    const selectAsActual = async () => {
        try {
            const response = await updateNutritionistLink({
                id: nutritionistSelected.link.id,
                idNutritionist: nutritionistSelected.link.idNutritionist,
                idPatient: nutritionistSelected.link.idPatient,
                isCurrentNutritionist: true,
                linkStatus: nutritionistSelected.link.linkStatus
            })
            if (response.status == 200) {
                setNutritionistSelected({
                    nutritionist: nutritionistSelected.nutritionist,
                    link: response.data
                })
            }

        } catch (error: any) {
            Alert.alert(t('Error'), error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const redirectLink = (link: string) => {
        Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
    }
    return (
        <PageContainer>
            <ScrollView>
                {loading ? <LoadingPageComponent /> : (
                    <View>
                        <ImageContainer>
                            <Icon size={widthPage / 3} source="account-circle-outline" color={Colors[colorScheme === 'dark' ? 'dark' : 'light'].border} />
                        </ImageContainer>
                        <InfoContainer>
                            <ProfileInfoComponent title={t('Name')} description={nutritionistSelected.nutritionist.name as string} />
                            <ProfileInfoComponent title={'E-mail'} description={nutritionistSelected.nutritionist.email as string} />
                            <ProfileInfoComponent title={t('Number')} description={nutritionistSelected.nutritionist.phoneNumber as string} />
                            <ProfileInfoComponent title={t('Gender')} description={nutritionistSelected.nutritionist.gender as string} />
                            <ProfileInfoComponent title={t('Birthdate')} description={formatToBr(nutritionistSelected.nutritionist.birth as Date)} />
                        </InfoContainer>
                        <SocialMedia>
                            {nutritionistSelected.nutritionist.facebook &&
                                <SocialCircle theme={colorScheme === 'dark' ? 'dark' : 'light'} onPress={() => redirectLink(nutritionistSelected.nutritionist.facebook as string)}>
                                    <Icon size={widthPage / 12} source="facebook" color="#1877F2" />
                                </SocialCircle>
                            }
                            {nutritionistSelected.nutritionist.instagram &&
                                <SocialCircle theme={colorScheme === 'dark' ? 'dark' : 'light'} onPress={() => redirectLink(nutritionistSelected.nutritionist.instagram as string)}>
                                    <Icon size={widthPage / 12} source="instagram" color="#E1306C" />
                                </SocialCircle>
                            }
                            {nutritionistSelected.nutritionist.whatsapp &&
                                <SocialCircle theme={colorScheme === 'dark' ? 'dark' : 'light'} onPress={() => redirectLink(`https://wa.me/+55${(nutritionistSelected.nutritionist.whatsapp as string).replace(/\D/g, '')}`)}>
                                    <Icon size={widthPage / 12} source="whatsapp" color="#25D366" />
                                </SocialCircle>
                            }
                        </SocialMedia>
                        <ButtonsContainer>
                            {(!nutritionistSelected.link.isCurrentNutritionist && nutritionistSelected.link.linkStatus == StatusNutritionist.Accepted) &&
                                <ButtonComponent title={t('Set as Actual')} onPress={selectAsActual} color={Colors.color.blue} />
                            }
                            {nutritionistSelected.link.linkStatus == StatusNutritionist.Pending &&
                                <View>
                                    <ButtonComponent title={t('Accept')} onPress={() => updateStatus(StatusNutritionist.Accepted)} color={Colors.color.green} />
                                    <ButtonComponent title={t('Reject')} onPress={() => updateStatus(StatusNutritionist.Rejected)} color={Colors.color.red} />
                                </View>
                            }
                        </ButtonsContainer>
                    </View>
                )}
            </ScrollView >
        </PageContainer>
    )
}