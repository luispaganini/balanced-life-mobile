import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Android Expo Go doesn't support FCM/expo-notifications initialization on SDK 53+.
// We detect it at runtime and skip native modules to prevent crashes.
const isAndroidExpoGo = Platform.OS === 'android' && Constants.appOwnership === 'expo';

let notificationsModuleCache: any = null;
let isHandlerSet = false;

async function getNotificationsModule(): Promise<any | null> {
  if (isAndroidExpoGo) {
    console.log('Hydration reminders: notifications are skipped on Android Expo Go to prevent native module crashes.');
    return null;
  }

  if (notificationsModuleCache) {
    return notificationsModuleCache;
  }

  try {
    // Modern ES6 dynamic import
    const module = await import('expo-notifications');
    
    // Configure default foreground notification behavior upon successful load
    if (module && typeof module.setNotificationHandler === 'function' && !isHandlerSet) {
      module.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
      isHandlerSet = true;
    }

    // Only cache if the module initializes without throwing an error
    notificationsModuleCache = module;
    return notificationsModuleCache;
  } catch (error) {
    console.warn('expo-notifications is not supported or failed to load dynamically in this environment:', error);
    return null;
  }
}

export async function requestNotificationPermissions(): Promise<boolean> {
  const Notifications = await getNotificationsModule();
  if (!Notifications || typeof Notifications.getPermissionsAsync !== 'function' || typeof Notifications.requestPermissionsAsync !== 'function') {
    console.warn('Notifications permission APIs are not available in this environment.');
    return false;
  }
  
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    return finalStatus === 'granted';
  } catch (error) {
    console.warn('Failed to request notification permissions:', error);
    return false;
  }
}

export async function scheduleWaterReminders(
  enabled: boolean,
  intervalMinutes: number,
  startTimeStr: string, // "HH:MM"
  endTimeStr: string    // "HH:MM"
): Promise<void> {
  const Notifications = await getNotificationsModule();
  if (!Notifications || typeof Notifications.cancelAllScheduledNotificationsAsync !== 'function' || typeof Notifications.scheduleNotificationAsync !== 'function') {
    console.log('Notifications scheduling APIs are not available. Hydration reminders skipped.');
    return;
  }

  try {
    // Always clear previous scheduled reminders to avoid duplication
    await Notifications.cancelAllScheduledNotificationsAsync();

    if (!enabled) {
      console.log('Water reminders disabled. Cleared all scheduled notifications.');
      return;
    }

    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      console.warn('Cannot schedule water reminders: Notification permissions not granted.');
      return;
    }

    // Set up Android notification channel
    if (Platform.OS === 'android' && typeof Notifications.setNotificationChannelAsync === 'function') {
      await Notifications.setNotificationChannelAsync('water-reminders', {
        name: 'Lembretes de Água',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#00A3FF',
      });
    }

    // Parse start and end times
    const [startHour, startMin] = startTimeStr.split(':').map(Number);
    const [endHour, endMin] = endTimeStr.split(':').map(Number);

    let startMinutes = startHour * 60 + startMin;
    let endMinutes = endHour * 60 + endMin;

    if (endMinutes <= startMinutes) {
      endMinutes += 24 * 60; // add 24 hours in minutes
    }

    const timesToSchedule: { hour: number; minute: number }[] = [];
    let currentMinutes = startMinutes;

    while (currentMinutes <= endMinutes) {
      const hour = Math.floor(currentMinutes / 60) % 24;
      const minute = currentMinutes % 60;
      
      if (!timesToSchedule.some(t => t.hour === hour && t.minute === minute)) {
        timesToSchedule.push({ hour, minute });
      }
      
      currentMinutes += intervalMinutes;
    }

    console.log(`Scheduling ${timesToSchedule.length} water reminders between ${startTimeStr} and ${endTimeStr} every ${intervalMinutes} minutes.`);

    for (const time of timesToSchedule) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Hora de beber água! 💧',
            body: 'Mantenha-se hidratado. Que tal beber um copo de água agora?',
            sound: true,
            ...Platform.select({
              android: {
                channelId: 'water-reminders',
              },
              default: {},
            }),
          },
          trigger: {
            hour: time.hour,
            minute: time.minute,
            repeats: true,
          } as any,
        });
        console.log(`Scheduled reminder for ${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`);
      } catch (err) {
        console.error('Failed to schedule notification at', time, err);
      }
    }
  } catch (error) {
    console.error('Failed to manage notifications:', error);
  }
}
