import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, useTheme, IconButton, Surface } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { Script } from './useScripts';

interface ScriptViewerProps {
    visible: boolean;
    onDismiss: () => void;
    script: Script | null;
}

const ScriptViewer: React.FC<ScriptViewerProps> = ({ visible, onDismiss, script }) => {
    const theme = useTheme();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (script?.content) {
            await Clipboard.setStringAsync(script.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!script) return null;

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
                <Surface style={[styles.surface, { backgroundColor: theme.colors.surface }]} elevation={4}>
                    <View style={styles.header}>
                        <Text variant="titleLarge" style={styles.title}>{script.title}</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>

                    <ScrollView style={styles.contentScroll}>
                        <Text variant="bodyLarge" style={styles.content}>{script.content}</Text>
                    </ScrollView>

                    <View style={styles.actions}>
                        <Button
                            mode="contained"
                            onPress={handleCopy}
                            icon={copied ? "check" : "content-copy"}
                            style={styles.copyButton}
                        >
                            {copied ? "Copied!" : "Copy to Clipboard"}
                        </Button>
                    </View>
                </Surface>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    surface: {
        borderRadius: 12,
        padding: 20,
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
    },
    contentScroll: {
        marginBottom: 20,
    },
    content: {
        lineHeight: 24,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    copyButton: {
        width: '100%',
    },
});

export default ScriptViewer;
