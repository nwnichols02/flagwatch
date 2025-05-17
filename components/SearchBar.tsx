import Colors from '@/theme/colors';
import { Search, X } from 'lucide-react-native';
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
    onClear: () => void;
    placeholder?: string;
};

export default function SearchBar({
    value,
    onChangeText,
    onClear,
    placeholder = 'Search...'
}: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Search size={20} color={Colors.neutral[500]} style={styles.searchIcon} />

            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.neutral[500]}
                autoCapitalize="none"
                autoCorrect={false}
            />

            {value.length > 0 && (
                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={onClear}
                    activeOpacity={0.7}
                >
                    <X size={20} color={Colors.neutral[500]} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        height: 48,
        paddingHorizontal: 12,
        marginBottom: 16,
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
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.neutral[900],
        height: '100%',
    },
    clearButton: {
        padding: 4,
    },
});