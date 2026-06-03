import { ScrollView, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { 
    PageContainer, 
    ScrollContainer,
    HeaderContainer,
    HeaderTitle,
    ProfileCard,
    AvatarWrapper,
    AvatarImage,
    AvatarFallback,
    AvatarFallbackText,
    CameraBadge,
    NameText,
    AgeText,
    OutlineButton,
    OutlineButtonText,
    SectionHeader,
    SectionTitle,
    EditLink,
    EditLinkText,
    InfoListCard,
    InfoItemRow,
    InfoIconWrapper,
    InfoTextColumn,
    InfoLabel,
    InfoValue,
    LogOutButton,
    LogOutText
} from './styles'
import useUserStore from '@/store/UserStore'
import { calculateAge } from '@/utils/functionsUser'
import IUserInterface from '@/interfaces/User/IUserInterface'
import { useTranslation } from 'react-i18next'
import { Colors } from '@/constants/Colors'
import useTokenStore from '@/store/TokenStore'
import { formatToBr } from '@/utils/functionsApp'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { patchUser } from '@/services/user/user'

export default function ProfilePage() {
    const { user, setUser } = useUserStore() as { user: IUserInterface, setUser: (user: IUserInterface) => void };
    const { clearTokens } = useTokenStore();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const [uploading, setUploading] = useState(false);

    const getInitials = (name?: string | null) => {
        if (!name) return 'U';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(t('Permissão necessária'), t('Precisamos de permissão para acessar sua galeria.'));
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const pickedUri = result.assets[0].uri;
            setUploading(true);
            try {
                const response = await patchUser({
                    urlImage: pickedUri,
                    id: undefined,
                    name: undefined,
                    birth: undefined,
                    password: undefined,
                    email: undefined,
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
                }, user.id as number);

                if ('id' in response) {
                    setUser(response);
                    Alert.alert(t('Sucesso'), t('Foto de perfil atualizada!'));
                } else {
                    Alert.alert(t('Erro'), response.message || t('Falha ao atualizar foto.'));
                }
            } catch (error) {
                console.error(error);
                Alert.alert(t('Erro'), t('Falha ao enviar imagem.'));
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <PageContainer style={{ paddingTop: insets.top }}>
            {/* Header */}
            <HeaderContainer>
                <HeaderTitle>{t('Meu Perfil')}</HeaderTitle>
                <View style={{ width: 24 }} />
            </HeaderContainer>

            <ScrollContainer showsVerticalScrollIndicator={false}>
                {/* Main Profile Info Card */}
                <ProfileCard>
                    <AvatarWrapper>
                        {user.urlImage ? (
                            <AvatarImage source={{ uri: user.urlImage }} />
                        ) : (
                            <AvatarFallback>
                                <AvatarFallbackText>
                                    {getInitials(user.name)}
                                </AvatarFallbackText>
                            </AvatarFallback>
                        )}
                        <CameraBadge onPress={handlePickImage} disabled={uploading}>
                            {uploading ? (
                                <ActivityIndicator size="small" color={Colors.color.white} />
                            ) : (
                                <Ionicons name="camera" size={16} color={Colors.color.white} />
                            )}
                        </CameraBadge>
                    </AvatarWrapper>

                    <NameText>{user?.name}</NameText>
                    {user?.birth && calculateAge(user.birth) ? (
                        <AgeText>{calculateAge(user.birth)} {t('anos')}</AgeText>
                    ) : null}

                    <OutlineButton onPress={() => router.navigate('/change-password-page')}>
                        <OutlineButtonText>{t('Alterar Senha')}</OutlineButtonText>
                    </OutlineButton>
                </ProfileCard>

                {/* Section: Basic Data */}
                <SectionHeader>
                    <SectionTitle>{t('Informações Básicas')}</SectionTitle>
                    <EditLink onPress={() => router.navigate('/edit-page')}>
                        <EditLinkText>{t('Editar')}</EditLinkText>
                        <Ionicons name="pencil" size={14} color={Colors.color.green} />
                    </EditLink>
                </SectionHeader>

                <InfoListCard>
                    <InfoItemRow style={{ borderBottomWidth: 1, borderBottomColor: Colors.dark.border }}>
                        <InfoIconWrapper>
                            <Ionicons name="person-outline" size={18} color={Colors.color.green} />
                        </InfoIconWrapper>
                        <InfoTextColumn>
                            <InfoLabel>{t('Nome Completo')}</InfoLabel>
                            <InfoValue>{user.name}</InfoValue>
                        </InfoTextColumn>
                    </InfoItemRow>
                </InfoListCard>

                {/* Section: Extra Data */}
                <SectionHeader>
                    <SectionTitle>{t('Informações de Contato')}</SectionTitle>
                    <EditLink onPress={() => router.navigate('/edit-extra-page')}>
                        <EditLinkText>{t('Editar')}</EditLinkText>
                        <Ionicons name="pencil" size={14} color={Colors.color.green} />
                    </EditLink>
                </SectionHeader>

                <InfoListCard>
                    <InfoItemRow style={{ borderBottomWidth: 1, borderBottomColor: Colors.dark.border }}>
                        <InfoIconWrapper>
                            <Ionicons name="mail-outline" size={18} color={Colors.color.green} />
                        </InfoIconWrapper>
                        <InfoTextColumn>
                            <InfoLabel>E-mail</InfoLabel>
                            <InfoValue>{user.email}</InfoValue>
                        </InfoTextColumn>
                    </InfoItemRow>

                    <InfoItemRow style={{ borderBottomWidth: 1, borderBottomColor: Colors.dark.border }}>
                        <InfoIconWrapper>
                            <Ionicons name="call-outline" size={18} color={Colors.color.green} />
                        </InfoIconWrapper>
                        <InfoTextColumn>
                            <InfoLabel>{t('Telefone')}</InfoLabel>
                            <InfoValue>{user.phoneNumber || t('Não informado')}</InfoValue>
                        </InfoTextColumn>
                    </InfoItemRow>

                    <InfoItemRow style={{ borderBottomWidth: 1, borderBottomColor: Colors.dark.border }}>
                        <InfoIconWrapper>
                            <Ionicons name="transgender-outline" size={18} color={Colors.color.green} />
                        </InfoIconWrapper>
                        <InfoTextColumn>
                            <InfoLabel>{t('Gênero')}</InfoLabel>
                            <InfoValue>{user.gender || t('Não informado')}</InfoValue>
                        </InfoTextColumn>
                    </InfoItemRow>

                    <InfoItemRow>
                        <InfoIconWrapper>
                            <Ionicons name="calendar-outline" size={18} color={Colors.color.green} />
                        </InfoIconWrapper>
                        <InfoTextColumn>
                            <InfoLabel>{t('Data de Nascimento')}</InfoLabel>
                            <InfoValue>{user.birth ? formatToBr(user.birth) : t('Não informado')}</InfoValue>
                        </InfoTextColumn>
                    </InfoItemRow>
                </InfoListCard>

                {/* Log Out Button */}
                <LogOutButton onPress={() => clearTokens()}>
                    <Ionicons name="log-out-outline" size={22} color={Colors.color.red} />
                    <LogOutText>{t('Sair da Conta')}</LogOutText>
                </LogOutButton>
            </ScrollContainer>
        </PageContainer>
    )
}