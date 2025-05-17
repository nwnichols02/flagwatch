import Colors from '@/theme/colors';
import { Flag } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

type EmptyStateViewProps = {
    message: string;
};

export default function EmptyStateView({ message }: EmptyStateViewProps) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Flag size={40} color={Colors.neutral[400]} />
            </View>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        color: Colors.neutral[600],
        textAlign: 'center',
    },
});