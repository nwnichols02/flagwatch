import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'halfmast_subscribed_states';

export function useStateSubscriptions() {
  const [subscribedStates, setSubscribedStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load subscribed states from storage
  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const storedStates = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedStates) {
          setSubscribedStates(JSON.parse(storedStates));
        }
      } catch (error) {
        console.error('Failed to load subscribed states:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSubscriptions();
  }, []);
  
  // Save subscribed states to storage
  const saveSubscriptions = async (states: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(states));
    } catch (error) {
      console.error('Failed to save subscribed states:', error);
    }
  };
  
  // Toggle subscription status for a state
  const toggleStateSubscription = (stateCode: string) => {
    setSubscribedStates(prevStates => {
      const isCurrentlySubscribed = prevStates.includes(stateCode);
      const newStates = isCurrentlySubscribed 
        ? prevStates.filter(code => code !== stateCode)
        : [...prevStates, stateCode];
      
      saveSubscriptions(newStates);
      return newStates;
    });
  };
  
  return {
    subscribedStates,
    toggleStateSubscription,
    loading,
  };
}