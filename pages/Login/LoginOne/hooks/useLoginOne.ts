import React from 'react';
import { Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { login, googleLogin, getUserMe } from '@/services/login/login';
import useUserStore from '@/store/UserStore';
import useTokenStore from '@/store/TokenStore';
import { signInWithGoogle } from '@/services/auth/googleAuth';
import { getFriendlyErrorMessage } from '@/utils/errorHelper';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useLoginOne() {
    const { t } = useTranslation();
    const colorScheme = useColorScheme();
    const { setUser } = useUserStore();
    const { setRefreshToken, setAccessToken } = useTokenStore();
    const [loading, setLoading] = React.useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: { email: string; password: string }) => {
        Keyboard.dismiss();
        setLoading(true);
        try {
            const response = await login(data.email, data.password);

            if (response.status === 200) {
                setAccessToken(response.data.accessToken);
                setRefreshToken(response.data.refreshToken);

                try {
                    const userResponse = await getUserMe();
                    if (userResponse) {
                        setUser(userResponse);
                    }
                } catch (userError) {
                    console.log("Failed to fetch user profile", userError);
                }

                router.navigate("/");
            }
        } catch (error: any) {
            console.log(error);
            const friendlyMessage = getFriendlyErrorMessage(error, t("Error on login"));
            Alert.alert("Login", friendlyMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const googleRes = await signInWithGoogle();
            if (googleRes.success && googleRes.idToken) {
                const response = await googleLogin(googleRes.idToken, 1);
                if (response.status === 200) {
                    setAccessToken(response.data.accessToken);
                    setRefreshToken(response.data.refreshToken);

                    try {
                        const userResponse = await getUserMe();
                        if (userResponse) {
                            setUser(userResponse);
                        }
                    } catch (userError) {
                        console.log("Failed to fetch user profile for Google email", userError);
                    }

                    router.navigate("/");
                } else {
                    Alert.alert(t('Google Sign-In'), t('Failed to authenticate with Google'));
                }
            }
        } catch (error: any) {
            console.error('Google Sign-In failed:', error);
            const friendlyMessage = getFriendlyErrorMessage(error, t("Failed to authenticate with Google"));
            Alert.alert(
                t('Google Sign-In'),
                friendlyMessage
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        control,
        handleSubmit,
        errors,
        loading,
        colorScheme,
        onSubmit,
        handleGoogleLogin,
        t,
    };
}
