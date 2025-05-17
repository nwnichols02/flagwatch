import Colors from '@/theme/colors';
import { State } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Flag } from 'lucide-react-native';
import { Platform, StyleSheet, Switch, Text, View } from 'react-native';

type StateItemProps = {
    state: State;
    isSubscribed: boolean;
    onToggle: () => void;
};

export default function StateItem({ state, isSubscribed, onToggle }: StateItemProps) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={isSubscribed ? [Colors.primary[50], Colors.white] : ['transparent', 'transparent']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
            <View style={styles.leftSection}>
                <View style={[
                    styles.flagIconContainer,
                    {
                        backgroundColor: isSubscribed
                            ? Colors.patriotic.blue
                            : Colors.neutral[300]
                    }
                ]}>
                    <Flag
                        size={20}
                        color={isSubscribed ? Colors.white : Colors.neutral[600]}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.stateName}>{state.name}</Text>
                    <Text style={[
                        styles.stateStatus,
                        state.isHalfMast ? styles.halfMastText : styles.fullStaffText
                    ]}>
                        {state.isHalfMast
                            ? 'Currently at half-mast'
                            : 'Currently at full-staff'}
                    </Text>
                </View>
            </View>

            <Switch
                value={isSubscribed}
                onValueChange={onToggle}
                trackColor={{ false: Colors.neutral[300], true: Colors.primary[400] }}
                thumbColor={isSubscribed ? Colors.patriotic.red : Colors.white}
                ios_backgroundColor={Colors.neutral[300]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.neutral[200],
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: Colors.neutral[900],
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    flagIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    stateName: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        color: Colors.neutral[900],
    },
    stateStatus: {
        fontSize: 14,
        marginTop: 2,
        fontFamily: 'Inter-Regular',
    },
    halfMastText: {
        color: Colors.patriotic.red,
    },
    fullStaffText: {
        color: Colors.primary[700],
    },
});