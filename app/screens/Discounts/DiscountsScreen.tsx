import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useTheme, Chip, ActivityIndicator, Text } from 'react-native-paper';
import { useDiscounts, Discount } from './useDiscounts';
import DiscountCard from './DiscountCard';

const CATEGORIES = ['All', 'Sauna', 'Gym', 'Therapy', 'Community'];

const DiscountsScreen = () => {
    const theme = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { data: discounts, isLoading, error } = useDiscounts();

    const filteredDiscounts = discounts?.filter(d =>
        selectedCategory === 'All' || d.category.toLowerCase() === selectedCategory.toLowerCase()
    );

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.background }]}>
                <Text variant="bodyLarge" style={{ color: theme.colors.error }}>Failed to load discounts.</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.categoryContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
                    {CATEGORIES.map((cat) => (
                        <Chip
                            key={cat}
                            selected={selectedCategory === cat}
                            onPress={() => setSelectedCategory(cat)}
                            style={styles.chip}
                            showSelectedOverlay
                        >
                            {cat}
                        </Chip>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredDiscounts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <DiscountCard discount={item} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.centered}>
                        <Text variant="bodyMedium">No discounts found for this category.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    categoryContainer: {
        paddingVertical: 12,
    },
    chipsScroll: {
        paddingHorizontal: 16,
    },
    chip: {
        marginRight: 8,
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default DiscountsScreen;
