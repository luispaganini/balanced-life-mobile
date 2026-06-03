import { Alert, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { 
    PageContainer, 
    HeaderContainer, 
    HeaderButton, 
    HeaderTitle, 
    ScrollContent, 
    ProfileSection, 
    InitialsCircle, 
    InitialsText, 
    AvatarImageLarge, 
    NutritionistName, 
    InfoCard, 
    InfoRow, 
    InfoIconWrapper, 
    InfoContent, 
    InfoLabel, 
    InfoValue, 
    SocialMediaSection, 
    SocialTitle, 
    SocialMediaRow, 
    SocialCircle, 
    ButtonsContainer,
    ActiveStatusMessageCard,
    ActiveStatusTextColumn,
    ActiveStatusTitle,
    ActiveStatusDesc
} from './styles'
import { useTranslation } from 'react-i18next'
import { formatToBr } from '@/utils/functionsApp'
import { useNutritionistStore } from '@/store/NutritionistStore'
import ButtonComponent from '@/components/application/Forms/ButtonComponent'
import StatusNutritionist from '@/enums/StatusNutritionist'
import { updateNutritionistLink } from '@/services/user/user'
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as Linking from 'expo-linking'

export default function NutritionistPage() {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const { nutritionistSelected, setNutritionistSelected } = useNutritionistStore();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation()

    const { nutritionist, link } = nutritionistSelected;
    const isSelected = link?.isCurrentNutritionist;

    const getInitials = (name?: string | null) => {
        if (!name) return 'N';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const updateStatus = async (status: StatusNutritionist) => {
        setLoading(true)
        try {
            const response = await updateNutritionistLink({
                id: link.id,
                idNutritionist: link.idNutritionist,
                idPatient: link.idPatient,
                isCurrentNutritionist: link.isCurrentNutritionist,
                linkStatus: status
            })

            if (response.status === 200) {
                setNutritionistSelected({
                    nutritionist: nutritionist,
                    link: response.data
                })
                Alert.alert(t('Sucesso'), t('Status do nutricionista atualizado.'));
            }
        } catch (error) {
            Alert.alert(t('Erro'), t('Falha ao atualizar o status do nutricionista.'));
        } finally {
            setLoading(false)
        }
    }

    const selectAsActual = async () => {
        setLoading(true)
        try {
            const response = await updateNutritionistLink({
                id: link.id,
                idNutritionist: link.idNutritionist,
                idPatient: link.idPatient,
                isCurrentNutritionist: true,
                linkStatus: link.linkStatus
            })
            
            if (response.status === 200) {
                setNutritionistSelected({
                    nutritionist: nutritionist,
                    link: response.data
                });
                Alert.alert(t('Sucesso'), t('Nutricionista definido como atual!'));
            }

        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || t('Falha ao definir como atual.');
            Alert.alert(t('Erro'), errorMsg)
        } finally {
            setLoading(false)
        }
    }

    const redirectLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }

    const renderSocials = () => {
        const hasSocials = nutritionist.facebook || nutritionist.instagram || nutritionist.whatsapp;
        if (!hasSocials) return null;

        return (
            <SocialMediaSection>
                <SocialTitle>{t('Redes Sociais & Contato')}</SocialTitle>
                <SocialMediaRow>
                    {nutritionist.facebook && (
                        <SocialCircle theme={colorScheme} onPress={() => redirectLink(nutritionist.facebook as string)}>
                            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                        </SocialCircle>
                    )}
                    {nutritionist.instagram && (
                        <SocialCircle theme={colorScheme} onPress={() => redirectLink(nutritionist.instagram as string)}>
                            <Ionicons name="logo-instagram" size={24} color="#E1306C" />
                        </SocialCircle>
                    )}
                    {nutritionist.whatsapp && (
                        <SocialCircle theme={colorScheme} onPress={() => redirectLink(`https://wa.me/+55${(nutritionist.whatsapp as string).replace(/\D/g, '')}`)}>
                            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                        </SocialCircle>
                    )}
                </SocialMediaRow>
            </SocialMediaSection>
        );
    };

    return (
        <PageContainer theme={colorScheme}>
            {/* Custom Header with Back Button */}
            <HeaderContainer topInset={insets.top} theme={colorScheme}>
                <HeaderButton onPress={() => router.back()}>
                    <Ionicons 
                        name="arrow-back" 
                        size={24} 
                        color={colorScheme === 'light' ? Colors.light.text : Colors.dark.text} 
                    />
                </HeaderButton>
                <HeaderTitle theme={colorScheme}>{t('Nutritionist')}</HeaderTitle>
                {/* Visual balance placeholder */}
                <View style={{ width: 40 }} />
            </HeaderContainer>

            {loading ? (
                <LoadingPageComponent />
            ) : (
                <ScrollContent showsVerticalScrollIndicator={false}>
                    
                    {/* Profile Section */}
                    <ProfileSection>
                        {nutritionist.urlImage ? (
                            <AvatarImageLarge source={{ uri: nutritionist.urlImage }} />
                        ) : (
                            <InitialsCircle theme={colorScheme} isSelected={isSelected}>
                                <InitialsText isSelected={isSelected}>
                                    {getInitials(nutritionist.name)}
                                </InitialsText>
                            </InitialsCircle>
                        )}
                        <NutritionistName theme={colorScheme}>
                            {nutritionist.name}
                        </NutritionistName>
                    </ProfileSection>

                    {/* Active Message Notification Card */}
                    {isSelected && (
                        <ActiveStatusMessageCard>
                            <Ionicons name="checkmark-circle-outline" size={28} color={Colors.color.green} />
                            <ActiveStatusTextColumn>
                                <ActiveStatusTitle>{t('Nutricionista Ativo')}</ActiveStatusTitle>
                                <ActiveStatusDesc>
                                    {t('Todas as recomendações e dietas exibidas no seu diário são geradas por este profissional.')}
                                </ActiveStatusDesc>
                            </ActiveStatusTextColumn>
                        </ActiveStatusMessageCard>
                    )}

                    {/* Information Grid/List */}
                    <InfoCard theme={colorScheme}>
                        <InfoRow theme={colorScheme} showBorder={true}>
                            <InfoIconWrapper>
                                <Ionicons name="mail-outline" size={18} color={Colors.color.grey} />
                            </InfoIconWrapper>
                            <InfoContent>
                                <InfoLabel>{t('E-mail')}</InfoLabel>
                                <InfoValue theme={colorScheme}>{nutritionist.email || '-'}</InfoValue>
                            </InfoContent>
                        </InfoRow>

                        <InfoRow theme={colorScheme} showBorder={true}>
                            <InfoIconWrapper>
                                <Ionicons name="call-outline" size={18} color={Colors.color.grey} />
                            </InfoIconWrapper>
                            <InfoContent>
                                <InfoLabel>{t('Number')}</InfoLabel>
                                <InfoValue theme={colorScheme}>{nutritionist.phoneNumber || '-'}</InfoValue>
                            </InfoContent>
                        </InfoRow>

                        <InfoRow theme={colorScheme} showBorder={true}>
                            <InfoIconWrapper>
                                <Ionicons name="person-outline" size={18} color={Colors.color.grey} />
                            </InfoIconWrapper>
                            <InfoContent>
                                <InfoLabel>{t('Gender')}</InfoLabel>
                                <InfoValue theme={colorScheme}>{nutritionist.gender || '-'}</InfoValue>
                            </InfoContent>
                        </InfoRow>

                        <InfoRow theme={colorScheme} showBorder={false}>
                            <InfoIconWrapper>
                                <Ionicons name="calendar-outline" size={18} color={Colors.color.grey} />
                            </InfoIconWrapper>
                            <InfoContent>
                                <InfoLabel>{t('Birthdate')}</InfoLabel>
                                <InfoValue theme={colorScheme}>
                                    {nutritionist.birth ? formatToBr(new Date(nutritionist.birth)) : '-'}
                                </InfoValue>
                            </InfoContent>
                        </InfoRow>
                    </InfoCard>

                    {/* Social networks section */}
                    {renderSocials()}

                    {/* Bottom Action buttons */}
                    <ButtonsContainer>
                        {(!isSelected && link?.linkStatus === StatusNutritionist.Accepted) && (
                            <ButtonComponent 
                                title={t('Set as Actual')} 
                                onPress={selectAsActual} 
                                color={Colors.color.green} 
                            />
                        )}
                        {link?.linkStatus === StatusNutritionist.Pending && (
                            <View style={{ gap: 12 }}>
                                <ButtonComponent 
                                    title={t('Accept')} 
                                    onPress={() => updateStatus(StatusNutritionist.Accepted)} 
                                    color={Colors.color.green} 
                                />
                                <ButtonComponent 
                                    title={t('Reject')} 
                                    onPress={() => updateStatus(StatusNutritionist.Rejected)} 
                                    color={Colors.color.red} 
                                />
                            </View>
                        )}
                    </ButtonsContainer>

                </ScrollContent>
            )}
        </PageContainer>
    )
}