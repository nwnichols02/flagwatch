import Header from '@/components/Header';
import NotificationHistoryList from '@/components/NotificationHistoryList';
import { useNotificationSettings } from '@/hooks/useNotificationSettings';
import Colors from '@/theme/colors';
import { Platform, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
    const {
        pushEnabled,
        nationalAlertsEnabled,
        stateAlertsEnabled,
        togglePush,
        toggleNationalAlerts,
        toggleStateAlerts
    } = useNotificationSettings();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Header title="Notification Settings" />

            <View style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Alert Preferences</Text>

                    <View style={styles.settingRow}>
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingTitle}>Push Notifications</Text>
                            <Text style={styles.settingDescription}>
                                Receive alerts on your device
                            </Text>
                        </View>
                        <Switch
                            value={pushEnabled}
                            onValueChange={togglePush}
                            trackColor={{ false: Colors.neutral[300], true: Colors.primary[400] }}
                            thumbColor={pushEnabled ? Colors.primary[700] : Colors.white}
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingTitle}>National Flag Alerts</Text>
                            <Text style={styles.settingDescription}>
                                US flag status changes
                            </Text>
                        </View>
                        <Switch
                            value={nationalAlertsEnabled}
                            onValueChange={toggleNationalAlerts}
                            disabled={!pushEnabled}
                            trackColor={{ false: Colors.neutral[300], true: Colors.primary[400] }}
                            thumbColor={nationalAlertsEnabled && pushEnabled ? Colors.primary[700] : Colors.white}
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingTitle}>State Flag Alerts</Text>
                            <Text style={styles.settingDescription}>
                                Alerts for your subscribed states
                            </Text>
                        </View>
                        <Switch
                            value={stateAlertsEnabled}
                            onValueChange={toggleStateAlerts}
                            disabled={!pushEnabled}
                            trackColor={{ false: Colors.neutral[300], true: Colors.primary[400] }}
                            thumbColor={stateAlertsEnabled && pushEnabled ? Colors.primary[700] : Colors.white}
                        />
                    </View>
                </View>

                <NotificationHistoryList />
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
        paddingTop: 16,
        paddingBottom: 16,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.neutral[900],
        marginBottom: 16,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.neutral[100],
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.neutral[900],
    },
    settingDescription: {
        fontSize: 14,
        color: Colors.neutral[600],
        marginTop: 2,
    },
});