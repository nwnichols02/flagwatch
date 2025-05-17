import EmptyStateView from '@/components/EmptyStateView';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import StateItem from '@/components/StateItem';
import { useStateSubscriptions } from '@/hooks/useStateSubscriptions';
import Colors from '@/theme/colors';
import { State } from '@/types';
import { getAllStates } from '@/utils/statesUtils';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StatesScreen() {
    const [allStates, setAllStates] = useState<State[]>([]);
    const [filteredStates, setFilteredStates] = useState<State[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { subscribedStates, toggleStateSubscription } = useStateSubscriptions();

    useEffect(() => {
        const states = getAllStates();
        setAllStates(states);
        setFilteredStates(states);
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredStates(allStates);
        } else {
            const filtered = allStates.filter(state =>
                state.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredStates(filtered);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredStates(allStates);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Header title="States" />

            <View style={styles.content}>
                <Text style={styles.subtitle}>
                    Subscribe to states to receive flag status updates
                </Text>

                <SearchBar
                    value={searchQuery}
                    onChangeText={handleSearch}
                    onClear={clearSearch}
                    placeholder="Search states..."
                />

                <FlatList
                    data={filteredStates}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                        <StateItem
                            state={item}
                            isSubscribed={subscribedStates.includes(item.code)}
                            onToggle={() => toggleStateSubscription(item.code)}
                        />
                    )}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <EmptyStateView
                            message={
                                searchQuery
                                    ? "No states match your search"
                                    : "No states available"
                            }
                        />
                    }
                />
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
        paddingTop: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.neutral[700],
        marginBottom: 16,
        textAlign: 'center',
    },
    list: {
        paddingBottom: 20,
    },
});