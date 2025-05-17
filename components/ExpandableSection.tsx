import Colors from '@/theme/colors';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

type ExpandableSectionProps = {
    title: string;
    children: React.ReactNode;
    initiallyExpanded?: boolean;
};

export default function ExpandableSection({
    title,
    children,
    initiallyExpanded = false
}: ExpandableSectionProps) {
    const [expanded, setExpanded] = useState(initiallyExpanded);

    const toggleExpanded = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={toggleExpanded}
                activeOpacity={0.7}
            >
                <Text style={styles.title}>{title}</Text>
                {expanded ? (
                    <ChevronUp size={20} color={Colors.primary[700]} />
                ) : (
                    <ChevronDown size={20} color={Colors.primary[700]} />
                )}
            </TouchableOpacity>

            {expanded && (
                <View style={styles.content}>
                    {children}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.neutral[900],
    },
    content: {
        padding: 16,
        paddingTop: 0,
        borderTopWidth: 1,
        borderTopColor: Colors.neutral[100],
    },
});