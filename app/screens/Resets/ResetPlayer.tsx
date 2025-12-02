import React, { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, IconButton, ProgressBar, useTheme, Surface } from 'react-native-paper';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { ResetItem } from './useResetPlayer';

interface ResetPlayerProps {
    currentReset: ResetItem | null;
    isPlaying: boolean;
    position: number;
    duration: number;
    isBookmarked: boolean;
    onPlayPause: () => void;
    onSeek: (positionMillis: number) => void;
    onToggleBookmark: () => void;
    bottomSheetRef: React.RefObject<BottomSheet>;
}

const ResetPlayer: React.FC<ResetPlayerProps> = ({
    currentReset,
    isPlaying,
    position,
    duration,
    isBookmarked,
    onPlayPause,
    onSeek,
    onToggleBookmark,
    bottomSheetRef,
}) => {
    const theme = useTheme();
    const snapPoints = React.useMemo(() => ['25%', '50%'], []);

    const progress = duration > 0 ? position / duration : 0;

    const handleProgressPress = (e: any) => {
        const { locationX } = e.nativeEvent;
        const screenWidth = Dimensions.get('window').width;
        // Assuming 32px padding (16 on each side)
        const barWidth = screenWidth - 32;
        const percentage = locationX / barWidth;
        const seekPos = percentage * duration;
        onSeek(seekPos);
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            backgroundStyle={{ backgroundColor: theme.colors.surface }}
            handleIndicatorStyle={{ backgroundColor: theme.colors.onSurfaceVariant }}
        >
            <BottomSheetView style={styles.contentContainer}>
                {currentReset && (
                    <>
                        <View style={styles.header}>
                            <Text variant="titleLarge" style={styles.title}>{currentReset.title}</Text>
                            <IconButton
                                icon={isBookmarked ? "bookmark" : "bookmark-outline"}
                                onPress={onToggleBookmark}
                                iconColor={theme.colors.primary}
                            />
                        </View>

                        <Text variant="bodyMedium" style={styles.type}>{currentReset.type.toUpperCase()}</Text>

                        <View style={styles.controls}>
                            <View style={styles.progressContainer} onTouchEnd={handleProgressPress}>
                                <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progressBar} />
                            </View>

                            <View style={styles.timeContainer}>
                                <Text variant="labelSmall">{formatTime(position)}</Text>
                                <Text variant="labelSmall">{formatTime(duration)}</Text>
                            </View>

                            <View style={styles.buttons}>
                                <IconButton
                                    icon="replay-10"
                                    size={30}
                                    onPress={() => onSeek(Math.max(0, position - 10000))}
                                />
                                <IconButton
                                    icon={isPlaying ? "pause-circle" : "play-circle"}
                                    size={64}
                                    onPress={onPlayPause}
                                    iconColor={theme.colors.primary}
                                />
                                <IconButton
                                    icon="forward-10"
                                    size={30}
                                    onPress={() => onSeek(Math.min(duration, position + 10000))}
                                />
                            </View>
                        </View>
                    </>
                )}
            </BottomSheetView>
        </BottomSheet>
    );
};

const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontWeight: 'bold',
    },
    type: {
        color: 'gray',
        marginBottom: 24,
    },
    controls: {
        flex: 1,
        justifyContent: 'center',
    },
    progressContainer: {
        height: 20,
        justifyContent: 'center',
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
});

export default ResetPlayer;
