import { useState, useEffect, useCallback, useRef } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'resets_bookmarks';

export type ResetType = 'audio' | 'breath' | 'animation';

export interface ResetItem {
    id: string;
    title: string;
    duration: number; // in seconds
    type: ResetType;
    source: any; // require path
}

export const useResetPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentReset, setCurrentReset] = useState<ResetItem | null>(null);
    const [bookmarks, setBookmarks] = useState<string[]>([]);

    // Load bookmarks on mount
    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        try {
            const stored = await AsyncStorage.getItem(BOOKMARKS_KEY);
            if (stored) {
                setBookmarks(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load bookmarks', e);
        }
    };

    const toggleBookmark = async (id: string) => {
        try {
            let newBookmarks;
            if (bookmarks.includes(id)) {
                newBookmarks = bookmarks.filter((b) => b !== id);
            } else {
                newBookmarks = [...bookmarks, id];
            }
            setBookmarks(newBookmarks);
            await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
        } catch (e) {
            console.error('Failed to toggle bookmark', e);
        }
    };

    const isBookmarked = (id: string) => bookmarks.includes(id);

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
            setIsPlaying(status.isPlaying);
            if (status.didJustFinish) {
                setIsPlaying(false);
                setPosition(0);
                // Optional: loop or stop
            }
        }
    };

    const loadSound = async (reset: ResetItem) => {
        try {
            // Unload previous sound if exists
            if (sound) {
                await sound.unloadAsync();
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                reset.source,
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );

            setSound(newSound);
            setCurrentReset(reset);
            setIsPlaying(true);
        } catch (e) {
            console.error('Failed to load sound', e);
        }
    };

    const play = async () => {
        if (sound) {
            await sound.playAsync();
        }
    };

    const pause = async () => {
        if (sound) {
            await sound.pauseAsync();
        }
    };

    const seek = async (positionMillis: number) => {
        if (sound) {
            await sound.setPositionAsync(positionMillis);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    return {
        sound,
        currentReset,
        isPlaying,
        position,
        duration,
        bookmarks,
        loadSound,
        play,
        pause,
        seek,
        toggleBookmark,
        isBookmarked,
    };
};
