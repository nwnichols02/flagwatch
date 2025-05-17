import Colors from '@/theme/colors';
import { ExternalLink } from 'lucide-react-native';
import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type NewsCardProps = {
    title: string;
    summary: string;
    source: string;
    imageUrl?: string;
    linkUrl?: string;
};

export default function NewsCard({
    title,
    summary,
    source,
    imageUrl,
    linkUrl
}: NewsCardProps) {
    const handleOpenLink = async () => {
        if (linkUrl && await Linking.canOpenURL(linkUrl)) {
            await Linking.openURL(linkUrl);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {imageUrl && (
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            <Text style={styles.summary}>{summary}</Text>

            <View style={styles.footer}>
                <Text style={styles.source}>Source: {source}</Text>

                {linkUrl && (
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={handleOpenLink}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.linkText}>Read More</Text>
                        <ExternalLink size={16} color={Colors.primary[700]} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.neutral[900],
        marginBottom: 12,
    },
    image: {
        width: '100%',
        height: 160,
        borderRadius: 8,
        marginBottom: 12,
    },
    summary: {
        fontSize: 15,
        lineHeight: 22,
        color: Colors.neutral[800],
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: Colors.neutral[100],
    },
    source: {
        fontSize: 14,
        color: Colors.neutral[600],
    },
    linkButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.primary[700],
        marginRight: 4,
    },
});