import { ScrollView, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
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
import { patchUser, uploadProfilePicture, getUser } from '@/services/user/user'
import { useColorScheme } from '@/hooks/useColorScheme'

const decodeBase64 = (str: string): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let output = '';
    str = str.replace(/=+$/, '').replace(/-/g, '+').replace(/_/g, '/');
    for (let bc = 0, bs = 0, buffer, i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        const idx = chars.indexOf(char);
        if (idx === -1) continue;
        buffer = bc % 4 ? (buffer ?? 0) * 64 + idx : idx;
        if (bc++ % 4) {
            output += String.fromCharCode(255 & (buffer >> ((-2 * bc) & 6)));
        }
    }
    return output;
};

const decodeJwt = (token: string) => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const decoded = decodeBase64(parts[1]);
        return JSON.parse(decoded);
    } catch (e) {
        return null;
    }
};

export default function ProfilePage() {
    const { user, setUser } = useUserStore() as { user: IUserInterface | null, setUser: (user: IUserInterface | null) => void };
    const { clearTokens, accessToken } = useTokenStore();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const colorTheme = useColorScheme();
    const [uploading, setUploading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [fetchingUser, setFetchingUser] = useState(false);

    useEffect(() => {
        if (!user && accessToken) {
            const fetchUserProfile = async () => {
                setFetchingUser(true);
                try {
                    const decoded = decodeJwt(accessToken);
                    const userId = decoded?.jti || decoded?.sub || decoded?.id;
                    if (userId) {
                        const userData = await getUser(Number(userId));
                        if (userData) {
                            setUser(userData);
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch user profile in ProfilePage:", error);
                } finally {
                    setFetchingUser(false);
                }
            };
            fetchUserProfile();
        }
    }, [user, accessToken]);

    if (!user) {
        return (
            <PageContainer theme={colorTheme} style={{ paddingTop: insets.top, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator size="large" color={Colors.color.green} />
            </PageContainer>
        );
    }

    const getInitials = (name?: string | null) => {
        if (!name) return 'U';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const handlePickImage = () => {
        Alert.alert(
            t('Selecionar Foto'),
            t('Escolha como deseja obter a foto:'),
            [
                {
                    text: t('Tirar Foto'),
                    onPress: () => processImageSelection(true),
                },
                {
                    text: t('Escolher da Galeria'),
                    onPress: () => processImageSelection(false),
                },
                {
                    text: t('Cancelar'),
                    style: 'cancel',
                },
            ]
        );
    };

    const processImageSelection = async (useCamera: boolean) => {
        try {
            let status = '';
            if (useCamera) {
                const permission = await ImagePicker.requestCameraPermissionsAsync();
                status = permission.status;
            } else {
                const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                status = permission.status;
            }

            if (status !== 'granted') {
                Alert.alert(
                    t('Permissão necessária'),
                    useCamera
                        ? t('Precisamos de permissão para acessar sua câmera.')
                        : t('Precisamos de permissão para acessar sua galeria.')
                );
                return;
            }

            const pickerOptions: ImagePicker.ImagePickerOptions = {
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7, // Compress quality (70%)
            };

            const result = useCamera
                ? await ImagePicker.launchCameraAsync(pickerOptions)
                : await ImagePicker.launchImageLibraryAsync(pickerOptions);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const pickedUri = result.assets[0].uri;
                setUploading(true);
                try {
                    const uploadResult = await uploadProfilePicture(pickedUri);
                    if (uploadResult && uploadResult.url) {
                        setUser({ ...user, urlImage: uploadResult.url });
                        setImageError(false);
                        Alert.alert(t('Sucesso'), t('Foto de perfil atualizada!'));
                    } else {
                        Alert.alert(t('Erro'), t('Falha ao atualizar foto.'));
                    }
                } catch (error) {
                    console.error(error);
                    Alert.alert(t('Erro'), t('Falha ao enviar imagem.'));
                } finally {
                    setUploading(false);
                }
            }
        } catch (error) {
            console.error(error);
            Alert.alert(t('Erro'), t('Falha ao obter imagem.'));
        }
    };

    return (
        <PageContainer theme={colorTheme} style={{ paddingTop: insets.top }}>
            <HeaderContainer theme={colorTheme}>
                <HeaderTitle theme={colorTheme} testID="profile-header">{t('Meu Perfil')}</HeaderTitle>
                <View style={{ width: 24 }} />
            </HeaderContainer>

            <ScrollContainer showsVerticalScrollIndicator={false}>
                <ProfileCard theme={colorTheme}>
                    <AvatarWrapper>
                        {user.urlImage && !imageError ? (
                            <AvatarImage
                                source={{ uri: user.urlImage }}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <AvatarFallback>
                                <AvatarFallbackText>
                                    {getInitials(user.name)}
                                </AvatarFallbackText>
                            </AvatarFallback>
                        )}
                        <CameraBadge theme={colorTheme} onPress={handlePickImage} disabled={uploading}>
                            {uploading ? (
                                <ActivityIndicator size="small" color={Colors.color.white} />
                            ) : (
                                <Ionicons name="camera" size={16} color={Colors.color.white} />
                            )}
                        </CameraBadge>
                    </AvatarWrapper>

                    <NameText theme={colorTheme}>{user?.name}</NameText>
                    {user?.birth && calculateAge(user.birth) ? (
                        <AgeText>{calculateAge(user.birth)} {t('anos')}</AgeText>
                    ) : null}

                    <OutlineButton testID="change-password-button" onPress={() => router.navigate('/change-password-page')}>
                        <OutlineButtonText>{t('Alterar Senha')}</OutlineButtonText>
                    </OutlineButton>
                </ProfileCard>

                <SectionHeader>
                    <SectionTitle theme={colorTheme}>{t('Informações Básicas')}</SectionTitle>
                    <EditLink onPress={() => router.navigate('/edit-page')}>
                        <EditLinkText>{t('Editar')}</EditLinkText>
                        <Ionicons name="pencil" size={14} color={Colors.color.green} />
                    </EditLink>
                </SectionHeader>

                <InfoListCard theme={colorTheme}>
                    <InfoItemRow style={{ borderBottomWidth: 1, borderBottomColor: colorTheme === 'dark' ? Colors.dark.border : Colors.light.border }}>
                        <InfoIconWrapper theme={colorTheme}>
                            <Ionicons name="person-outline" size={18} color={Colors.color.green} />
                        </InfoIconWrapper>
                        <InfoTextColumn>
                            <InfoLabel>{t('Nome Completo')}</InfoLabel>
                            <InfoValue theme={colorTheme}>{user.name}</InfoValue>
                        </InfoTextColumn>
                    </InfoItemRow>
                </InfoListCard>

                <SectionHeader>
                    <SectionTitle theme={colorTheme}>{t('Informações de Contato')}</SectionTitle>
                    <EditLink onPress={() => router.navigate('/edit-extra-page')}>
                        <EditLinkText>{t('Editar')}</EditLinkText>
                        <Ionicons name="pencil" size={14} color={Colors.color.green} />
                    </EditLink>
                </SectionHeader>

                <InfoListCard theme={colorTheme}>
                    <InfoItemRow style={{ borderBottomWidth: 1, borderBottomColor: colorTheme === 'dark' ? Colors.dark.border : Colors.light.border }}>
                        <InfoIconWrapper theme={colorTheme}>
                            <Ionicons name="mail-outline" size={18} color={Colors.color.green} />
                        </InfoIconWrapper>
                        <InfoTextColumn>
                            <InfoLabel>E-mail</InfoLabel>
                            <InfoValue theme={colorTheme}>{user.email}</InfoValue>
                        </InfoTextColumn>
                    </InfoItemRow>

                    <InfoItemRow style={{ borderBottomWidth: 1, borderBottomColor: colorTheme === 'dark' ? Colors.dark.border : Colors.light.border }}>
                        <InfoIconWrapper theme={colorTheme}>
                            <Ionicons name="call-outline" size={18} color={Colors.color.green} />
                        </InfoIconWrapper>
                        <InfoTextColumn>
                            <InfoLabel>{t('Telefone')}</InfoLabel>
                            <InfoValue theme={colorTheme}>{user.phoneNumber || t('Não informado')}</InfoValue>
                        </InfoTextColumn>
                    </InfoItemRow>

                    <InfoItemRow style={{ borderBottomWidth: 1, borderBottomColor: colorTheme === 'dark' ? Colors.dark.border : Colors.light.border }}>
                        <InfoIconWrapper theme={colorTheme}>
                            <Ionicons name="transgender-outline" size={18} color={Colors.color.green} />
                        </InfoIconWrapper>
                        <InfoTextColumn>
                            <InfoLabel>{t('Gênero')}</InfoLabel>
                            <InfoValue theme={colorTheme}>{user.gender || t('Não informado')}</InfoValue>
                        </InfoTextColumn>
                    </InfoItemRow>

                    <InfoItemRow>
                        <InfoIconWrapper theme={colorTheme}>
                            <Ionicons name="calendar-outline" size={18} color={Colors.color.green} />
                        </InfoIconWrapper>
                        <InfoTextColumn>
                            <InfoLabel>{t('Data de Nascimento')}</InfoLabel>
                            <InfoValue theme={colorTheme}>{user.birth ? formatToBr(user.birth) : t('Não informado')}</InfoValue>
                        </InfoTextColumn>
                    </InfoItemRow>
                </InfoListCard>

                <LogOutButton testID="logout-button" onPress={() => clearTokens()}>
                    <Ionicons name="log-out-outline" size={22} color={Colors.color.red} />
                    <LogOutText>{t('Sair da Conta')}</LogOutText>
                </LogOutButton>
            </ScrollContainer>
        </PageContainer>
    )
}