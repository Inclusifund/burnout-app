import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import { BurnoutTestScreen } from '../screens/BurnoutTest';
import { ResetsScreen } from '../screens/Resets';
import { DiscountsScreen } from '../screens/Discounts';
import { ScriptsScreen } from '../screens/Scripts';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.outline,
                },
                headerStyle: {
                    backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.onSurface,
            }}
        >
            <Tab.Screen
                name="BurnoutTest"
                component={BurnoutTestScreen}
                options={{
                    tabBarLabel: 'Test',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-pulse" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Resets"
                component={ResetsScreen}
                options={{
                    tabBarLabel: 'Resets',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="refresh-circle" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Discounts"
                component={DiscountsScreen}
                options={{
                    tabBarLabel: 'Discounts',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="sale" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Scripts"
                component={ScriptsScreen}
                options={{
                    tabBarLabel: 'Scripts',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="script-text" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
