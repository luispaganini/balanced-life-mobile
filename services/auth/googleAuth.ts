export async function signInWithGoogle(): Promise<{ success: boolean; idToken: string | null; email: string | null; name: string | null }> {
  let GoogleSignin: any;

  try {
    GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
  } catch {
    throw new Error(
      'Google Sign-In não está disponível neste ambiente. ' +
      'Para autenticação real com Google, execute o app usando um Development Build (npx expo run:android / npx expo run:ios).',
    );
  }

  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    
    // Cast to any to safely extract values regardless of the SDK's exact return type structure
    const userInfo = response as any;
    const idToken = userInfo?.data?.idToken || userInfo?.idToken || null;
    const email = userInfo?.data?.user?.email || userInfo?.user?.email || null;
    const name = userInfo?.data?.user?.name || userInfo?.user?.name || null;

    return {
      success: true,
      idToken,
      email,
      name,
    };
  } catch (error) {
    console.warn('Google Sign-In native helper error:', error);
    throw error;
  }
}
