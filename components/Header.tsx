import Colors from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderProps = {
    title: string;
};

export default function Header({ title }: HeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: Math.max(0, insets.top) }]}>
            <LinearGradient
                colors={[Colors.accent[600], Colors.accent[500]]}
                style={styles.redStripe}
            />
            <View style={styles.whiteStripe}>
                <View style={styles.contentContainer}>
                    <View style={styles.starContainer}>
                        <Ionicons name="star" size={20} color={Colors.white} style={styles.star} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
            <LinearGradient
                colors={[Colors.primary[600], Colors.primary[500]]}
                style={styles.blueStripe}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginBottom: 8,
        ...Platform.select({
            ios: {
                shadowColor: Colors.neutral[900],
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    redStripe: {
        height: 16,
        width: '100%',
    },
    whiteStripe: {
        backgroundColor: Colors.white,
        paddingVertical: 12,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    blueStripe: {
        height: 16,
        width: '100%',
    },
    starContainer: {
        backgroundColor: Colors.primary[700],
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    star: {
        textShadowColor: Colors.primary[900],
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.neutral[800],
        flex: 1,
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});