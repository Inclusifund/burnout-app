import React, { useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Text, useTheme, Divider, TouchableRipple, Icon } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { useResetPlayer, ResetItem } from './useResetPlayer';
import ResetPlayer from './ResetPlayer';

const DUMMY_RESETS: ResetItem[] = [
    {
        id: '1',
        title: 'Morning Calm',
        duration: 300,
        type: 'audio',
        source: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
    },
    {
        id: '2',
        title: 'Deep Focus',
        duration: 600,
        type: 'audio',
        source: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
    },
    {
        id: '3',
        title: 'Sleep Well',
        duration: 900,
        type: 'audio',
        source: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    },
    {
        id: '4',
        title: 'Box Breathing',
        duration: 180,
        type: 'breath',
        source: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
    },
    {
        id: '5',
        title: '4-7-8 Technique',
        duration: 240,
        type: 'breath',
        source: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
    },
    {
        id: '6',
        title: 'Visual Flow',
        duration: 120,
        type: 'animation',
        source: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
    },
];

const ResetsScreen = () => {
    const theme = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const player = useResetPlayer();

    const handleItemPress = async (item: ResetItem) => {
        await player.loadSound(item);
        bottomSheetRef.current?.expand();
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'audio': return 'headphones';
            case 'breath': return 'lungs';
            case 'animation': return 'animation-play';
            default: return 'play-circle';
        }
    };

    const renderItem = ({ item }: { item: ResetItem }) => (
        <TouchableRipple onPress={() => handleItemPress(item)}>
            <List.Item
                title={item.title}
                description={`${Math.floor(item.duration / 60)} min • ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`}
                left={props => <List.Icon {...props} icon={getIcon(item.type)} />}
                right={props => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {player.isBookmarked(item.id) && (
                            <List.Icon {...props} icon="bookmark" color={theme.colors.primary} />
                        )}
                    </View>
                )}
            />
        </TouchableRipple>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <FlatList
                    data={DUMMY_RESETS}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={Divider}
                    contentContainerStyle={styles.listContent}
                />

                <ResetPlayer
                    currentReset={player.currentReset}
                    isPlaying={player.isPlaying}
                    position={player.position}
                    duration={player.duration}
                    isBookmarked={player.currentReset ? player.isBookmarked(player.currentReset.id) : false}
                    onPlayPause={() => player.isPlaying ? player.pause() : player.play()}
                    onSeek={player.seek}
                    onToggleBookmark={() => player.currentReset && player.toggleBookmark(player.currentReset.id)}
                    bottomSheetRef={bottomSheetRef}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 100, // Space for bottom sheet
    },
});

export default ResetsScreen;
