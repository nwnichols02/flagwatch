import Colors from '@/theme/colors';
import { NotificationItem } from '@/types';
import { formatDistance } from '@/utils/dateUtils';
import { getNotificationHistory } from '@/utils/notificationUtils';
import { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';

export default function NotificationHistoryList() {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    useEffect(() => {
        const loadNotifications = async () => {
            const history = await getNotificationHistory();
            setNotifications(history);
        };

        loadNotifications();
    }, []);

    if (notifications.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No notification history</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Notifications</Text>

            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <View style={styles.notificationContent}>
                            <Text style={styles.notificationTitle}>{item.title}</Text>
                            <Text style={styles.notificationBody}>{item.body}</Text>
                        </View>
                        <Text style={styles.notificationTime}>
                            {formatDistance(item.time)}
                        </Text>
                    </View>
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: Colors.neutral[900],
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.neutral[900],
        marginBottom: 16,
    },
    list: {
        paddingBottom: 16,
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.neutral[100],
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.neutral[900],
        marginBottom: 4,
    },
    notificationBody: {
        fontSize: 14,
        color: Colors.neutral[700],
    },
    notificationTime: {
        fontSize: 12,
        color: Colors.neutral[500],
        marginLeft: 8,
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: Colors.neutral[900],
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    emptyText: {
        fontSize: 16,
        color: Colors.neutral[600],
        textAlign: 'center',
        padding: 30,
    },
});