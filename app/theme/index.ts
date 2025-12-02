import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightPalette, darkPalette } from './palette';

const THEME_STORAGE_KEY = 'app_theme_preference';

export type ThemeMode = 'light' | 'dark' | 'auto';

export const lightTheme = {
    ...MD3LightTheme,
    colors: lightPalette,
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: darkPalette,
};

export const useAppTheme = () => {
    const systemColorScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
    const [isLoading, setIsLoading] = useState(true);

    // Load theme preference from AsyncStorage
    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
                    setThemeMode(savedTheme as ThemeMode);
                }
            } catch (error) {
                console.warn('Failed to load theme preference', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadThemePreference();
    }, []);

    // Save theme preference to AsyncStorage
    const updateThemeMode = async (mode: ThemeMode) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
            setThemeMode(mode);
        } catch (error) {
            console.warn('Failed to save theme preference', error);
        }
    };

    // Determine which theme to use
    const getActiveTheme = () => {
        if (themeMode === 'auto') {
            return systemColorScheme === 'dark' ? darkTheme : lightTheme;
        }
        return themeMode === 'dark' ? darkTheme : lightTheme;
    };

    const activeTheme = getActiveTheme();
    const isDark = activeTheme === darkTheme;

    return {
        theme: activeTheme,
        themeMode,
        isDark,
        isLoading,
        setThemeMode: updateThemeMode,
    };
};
