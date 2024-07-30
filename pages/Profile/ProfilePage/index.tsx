import { Dimensions, ScrollView, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ButtonLogOut, ChangePasswordText, DividerContent, InfoExtraUserContainer, InfoExtraUserItems, LogoutText, NameText, PageContainer, ProfileInfoContainer, ProfileInfoContent, UserInfoContainer } from './styles'
import useUserStore from '@/store/UserStore'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Divider, Icon, IconButton } from 'react-native-paper'
import { AgeText } from '@/components/application/Lists/ItemSnackComponent/styles'
import { calculateAge } from '@/utils/functionsUser'
import IUserInterface from '@/interfaces/User/IUserInterface'
import { useTranslation } from 'react-i18next'
import ProfileInfoComponent from '@/components/application/Lists/ProfileInfoComponent'
import { Colors } from '@/constants/Colors'
import useTokenStore from '@/store/TokenStore'
import { formatDate, formatToBr } from '@/utils/functionsApp'
import { router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'

export default function ProfilePage() {
    const { user } = useUserStore() as { user: IUserInterface };
    const colorScheme = useColorScheme()
    const { clearTokens } = useTokenStore();
    const widthPage = Dimensions.get('window').width;
    const { t } = useTranslation();
    return (
        <PageContainer>
            <ScrollView>
                <ProfileInfoContainer>
                    <ProfileInfoContent>
                        <Icon size={widthPage / 4} source="account-circle-outline" color={Colors[colorScheme ?? 'light'].border} />
                        <UserInfoContainer>
                            <NameText numberOfLines={2} ellipsizeMode='tail'>{user?.name}</NameText>
                            <AgeText>{t('Age')}: {calculateAge(new Date(user.birth as Date)) + ' ' + t('years')}</AgeText>
                        <TouchableOpacity onPress={() => router.navigate('/change-password-page')}>
                            <ChangePasswordText>{t('Change password')}</ChangePasswordText>
                        </TouchableOpacity>
                        </UserInfoContainer>
                    </ProfileInfoContent>
                    <IconButton icon="pencil" onPress={() => router.navigate('/edit-page')} size={30} />
                </ProfileInfoContainer>
                <DividerContent theme={colorScheme} />
                <InfoExtraUserContainer>
                    <InfoExtraUserItems>
                        <ProfileInfoComponent title={'E-mail'} description={user.email as string} />
                        <ProfileInfoComponent title={t('Number')} description={user.phoneNumber as string} />
                        <ProfileInfoComponent title={t('Gender')} description={user.gender as string} />
                        <ProfileInfoComponent title={t('Birthdate')} description={formatToBr(user.birth as Date)} />
                    </InfoExtraUserItems>
                    <IconButton icon="pencil" onPress={() => router.navigate('/edit-extra-page')} size={30} />
                </InfoExtraUserContainer>
                <ButtonLogOut onPress={() => clearTokens()}>
                    <Icon source="logout" size={30} color={Colors.color.red} />
                    <LogoutText>{t('Log out')}</LogoutText>
                </ButtonLogOut>
            </ScrollView>
        </PageContainer>
    )
}