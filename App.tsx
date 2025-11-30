import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
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

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <RootNavigator />
            </NavigationContainer>
        </PaperProvider>
    );
}
