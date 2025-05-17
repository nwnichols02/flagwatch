import AnimatedFlag from '@/components/AnimatedFlag';
import Header from '@/components/Header';
import NewsCard from '@/components/NewsCard';
import StatusCard from '@/components/StatusCard';
import Colors from '@/theme/colors';
import { FlagStatus } from '@/types';
import { getCurrentStatus } from '@/utils/flagUtils';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [status, setStatus] = useState<FlagStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useSharedValue(0);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from an API
      const data = await getCurrentStatus();
      setStatus(data);
    } catch (error) {
      console.error('Failed to fetch flag status:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 800 });
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <Header title="Flag Watch" />

      <View style={styles.content}>
        <Animated.View style={[styles.flagSection, { opacity: fadeAnim }]}>
          <AnimatedFlag isHalfMast={status?.isHalfMast ?? false} />
        </Animated.View>

        {!loading && status && (
          <>
            <StatusCard
              isHalfMast={status.isHalfMast}
              startDate={status.startDate}
              endDate={status.endDate}
              location="United States"
            />

            {status.isHalfMast && status.reason && (
              <NewsCard
                title={status.reason.title}
                summary={status.reason.summary}
                source={status.reason.source}
                imageUrl={status.reason.imageUrl}
                linkUrl={status.reason.linkUrl}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  flagSection: {
    height: 240,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});