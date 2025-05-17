import { NotificationItem } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'halfmast_notification_history';

// Get notification history
export async function getNotificationHistory(): Promise<NotificationItem[]> {
  try {
    const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);
    if (storedHistory) {
      const history = JSON.parse(storedHistory);
      return history.map((item: any) => ({
        ...item,
        time: new Date(item.time),
      }));
    }
    
    // If no history exists, create mock data for demonstration
    const mockHistory = createMockNotificationHistory();
    await saveNotificationHistory(mockHistory);
    return mockHistory;
  } catch (error) {
    console.error('Failed to load notification history:', error);
    return [];
  }
}

// Save notification history
export async function saveNotificationHistory(history: NotificationItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save notification history:', error);
  }
}

// Add new notification to history
export async function addNotification(notification: Omit<NotificationItem, 'id' | 'time' | 'read'>): Promise<void> {
  try {
    const history = await getNotificationHistory();
    
    const newNotification: NotificationItem = {
      id: generateId(),
      time: new Date(),
      read: false,
      ...notification,
    };
    
    const updatedHistory = [newNotification, ...history].slice(0, 50); // Keep last 50 notifications
    await saveNotificationHistory(updatedHistory);
  } catch (error) {
    console.error('Failed to add notification:', error);
  }
}

// Mark notification as read
export async function markNotificationAsRead(id: string): Promise<void> {
  try {
    const history = await getNotificationHistory();
    const updatedHistory = history.map(item => 
      item.id === id ? { ...item, read: true } : item
    );
    await saveNotificationHistory(updatedHistory);
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
  }
}

// Helper to generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Create mock notification history for demonstration
function createMockNotificationHistory(): NotificationItem[] {
  const now = new Date();
  
  return [
    {
      id: generateId(),
      title: 'US Flag at Half-Mast',
      body: 'The US flag is now at half-mast to honor the memory of Supreme Court Justice Eleanor Matthews.',
      time: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      type: 'national',
    },
    {
      id: generateId(),
      title: 'California Flag Status',
      body: 'The California state flag is now at half-mast to honor fallen police officer John Smith.',
      time: new Date(now.getTime() - 25 * 60 * 60 * 1000), // 25 hours ago
      read: false,
      type: 'state',
      stateCode: 'CA',
    },
    {
      id: generateId(),
      title: 'US Flag Returned to Full-Staff',
      body: 'The US flag has returned to full-staff following the national day of mourning.',
      time: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      read: true,
      type: 'national',
    },
  ];
}