import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './app/navigation/RootNavigator';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavDefaultTheme,
    reactNavigationDark: NavDarkTheme,
});

const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...LightTheme.colors,
    },
};

const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...DarkTheme.colors,
    },
};

export default function App() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                    <RootNavigator />
                </NavigationContainer>
            </PaperProvider>
        </QueryClientProvider>
    );
}
