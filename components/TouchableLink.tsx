import Colors from '@/theme/colors';
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';

type TouchableLinkProps = {
    text: string;
    url: string;
    icon?: React.ReactNode;
};

export default function TouchableLink({ text, url, icon }: TouchableLinkProps) {
    const handlePress = async () => {
        if (await Linking.canOpenURL(url)) {
            await Linking.openURL(url);
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text style={styles.text}>{text}</Text>
            {icon}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.neutral[100],
    },
    text: {
        fontSize: 15,
        color: Colors.primary[700],
        flex: 1,
    },
});