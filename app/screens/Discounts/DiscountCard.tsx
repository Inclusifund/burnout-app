import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, useTheme, Chip, Divider } from 'react-native-paper';
import * as Linking from 'expo-linking';
import { Discount } from './useDiscounts';

interface DiscountCardProps {
    discount: Discount;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ discount }) => {
    const theme = useTheme();

    const handlePress = () => {
        if (discount.externalUrl) {
            Linking.openURL(discount.externalUrl);
        }
    };

    return (
        <Card style={styles.card} mode="elevated">
            <Card.Content>
                <View style={styles.header}>
                    <Text variant="titleMedium" style={styles.title}>{discount.title}</Text>
                    <Chip style={styles.chip} textStyle={styles.chipText} compact>{discount.category}</Chip>
                </View>

                <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
                    📍 {discount.location}
                </Text>

                <Divider style={styles.divider} />

                <Text variant="bodyMedium" style={styles.description}>
                    {discount.description}
                </Text>

                {discount.eligibility && (
                    <Text variant="labelSmall" style={{ color: theme.colors.outline, marginTop: 8 }}>
                        Eligibility: {discount.eligibility}
                    </Text>
                )}
            </Card.Content>

            <Card.Actions style={styles.actions}>
                <Button
                    mode="contained"
                    onPress={handlePress}
                    icon="open-in-new"
                >
                    Claim Offer
                </Button>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        marginHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        marginRight: 8,
    },
    chip: {
        height: 24,
    },
    chipText: {
        fontSize: 10,
        lineHeight: 10,
    },
    divider: {
        marginVertical: 12,
    },
    description: {
        marginBottom: 8,
    },
    actions: {
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});

export default DiscountCard;
