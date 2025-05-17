import Colors from '@/theme/colors';
import { formatDate, formatDateRange } from '@/utils/dateUtils';
import { Calendar, Clock } from 'lucide-react-native';
import { Platform, StyleSheet, Text, View } from 'react-native';

type StatusCardProps = {
    isHalfMast: boolean;
    startDate?: Date;
    endDate?: Date;
    location: string;
};

export default function StatusCard({
    isHalfMast,
    startDate,
    endDate,
    location
}: StatusCardProps) {
    const statusBgColor = isHalfMast ? Colors.accent[50] : Colors.success[50];
    const statusBorderColor = isHalfMast ? Colors.accent[200] : Colors.success[200];
    const statusTextColor = isHalfMast ? Colors.accent[700] : Colors.success[700];

    return (
        <View style={[styles.container, { borderColor: statusBorderColor }]}>
            <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
                <Text style={[styles.statusText, { color: statusTextColor }]}>
                    {isHalfMast ? 'HALF-MAST' : 'FULL-STAFF'}
                </Text>
            </View>

            <Text style={styles.location}>{location}</Text>

            {isHalfMast && startDate && (
                <View style={styles.dateContainer}>
                    <Calendar size={16} color={Colors.neutral[600]} />
                    <Text style={styles.dateText}>
                        {endDate ? formatDateRange(startDate, endDate) : formatDate(startDate)}
                    </Text>
                </View>
            )}

            {isHalfMast && startDate && (
                <View style={styles.timeContainer}>
                    <Clock size={16} color={Colors.neutral[600]} />
                    <Text style={styles.timeText}>
                        {endDate
                            ? `Until ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                            : `Since ${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        borderWidth: 1,
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
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal:
            12,
        paddingVertical: 4,
        borderRadius: 16,
        marginBottom: 12,
    },
    statusText: {
        fontWeight: '700',
        fontSize: 14,
    },
    location: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.neutral[900],
        marginBottom: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    dateText: {
        fontSize: 15,
        color: Colors.neutral[800],
        marginLeft: 8,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 15,
        color: Colors.neutral[800],
        marginLeft: 8,
    },
});