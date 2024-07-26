import { Dimensions, ScrollView, View } from 'react-native'
import React from 'react'
import { ButtonLogOut, DividerContent, InfoExtraUserContainer, InfoExtraUserItems, LogoutText, NameText, PageContainer, ProfileInfoContainer, ProfileInfoContent, UserInfoContainer } from './styles'
import useUserStore from '@/store/UserStore'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Divider, Icon, IconButton } from 'react-native-paper'
import { AgeText } from '@/components/application/Lists/ItemSnackComponent/styles'
import { calculateAge } from '@/utils/functionsUser'
import IUserInterface from '@/interfaces/User/IUserInterface'
import { useTranslation } from 'react-i18next'
import ProfileInfoComponent from '@/components/application/Lists/ProfileInfoComponent'
import { Colors } from '@/constants/Colors'

export default function ProfilePage() {
    const { user } = useUserStore() as { user: IUserInterface };
    const colorScheme = useColorScheme()
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
                        </UserInfoContainer>
                    </ProfileInfoContent>
                    <IconButton icon="pencil" onPress={() => { }} size={30} />
                </ProfileInfoContainer>
                <DividerContent theme={colorScheme} />
                <InfoExtraUserContainer>
                    <InfoExtraUserItems>
                        <ProfileInfoComponent title={'E-mail'} description={user.email as string} />
                        <ProfileInfoComponent title={t('Number')} description={user.phoneNumber as string} />
                        <ProfileInfoComponent title={t('City')} description={user.location?.city.name as string} />
                        <ProfileInfoComponent title={t('State')} description={user.location?.state.name as string} />
                        <ProfileInfoComponent title={t('Country')} description={user.location?.state.country as string} />
                    </InfoExtraUserItems>
                    <IconButton icon="pencil" onPress={() => { }} size={30} />
                </InfoExtraUserContainer>
                <ButtonLogOut>
                    <Icon source="logout" size={30} color={Colors.color.red} />
                    <LogoutText>{t('Log out')}</LogoutText>
                </ButtonLogOut>
            </ScrollView>
        </PageContainer>
    )
}