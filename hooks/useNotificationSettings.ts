import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const STORAGE_KEY = 'halfmast_notification_settings';

interface NotificationSettings {
  pushEnabled: boolean;
  nationalAlertsEnabled: boolean;
  stateAlertsEnabled: boolean;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  pushEnabled: false,
  nationalAlertsEnabled: true,
  stateAlertsEnabled: true,
};

export function useNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  
  // Load notification settings from storage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.error('Failed to load notification settings:', error);
      }
    };
    
    loadSettings();
  }, []);
  
  // Save settings to storage
  const saveSettings = async (newSettings: NotificationSettings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    }
  };
  
  // Request permission for push notifications
  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    }
    return false;
  };
  
  // Toggle push notifications
  const togglePush = async () => {
    const newPushEnabled = !settings.pushEnabled;
    
    if (newPushEnabled) {
      const granted = await requestPermissions();
      if (!granted) return; // Don't update if permission denied
    }
    
    const newSettings = {
      ...settings,
      pushEnabled: newPushEnabled,
    };
    
    setSettings(newSettings);
    saveSettings(newSettings);
  };
  
  // Toggle national alerts
  const toggleNationalAlerts = () => {
    const newSettings = {
      ...settings,
      nationalAlertsEnabled: !settings.nationalAlertsEnabled,
    };
    
    setSettings(newSettings);
    saveSettings(newSettings);
  };
  
  // Toggle state alerts
  const toggleStateAlerts = () => {
    const newSettings = {
      ...settings,
      stateAlertsEnabled: !settings.stateAlertsEnabled,
    };
    
    setSettings(newSettings);
    saveSettings(newSettings);
  };
  
  return {
    ...settings,
    togglePush,
    toggleNationalAlerts,
    toggleStateAlerts,
  };
}