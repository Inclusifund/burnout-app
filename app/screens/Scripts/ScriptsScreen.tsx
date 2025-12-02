import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, useTheme, Divider, Text, ActivityIndicator, TouchableRipple } from 'react-native-paper';
import { useScripts, Script } from './useScripts';
import ScriptViewer from './ScriptViewer';

const ScriptsScreen = () => {
    const theme = useTheme();
    const { data: scripts, isLoading, error } = useScripts();
    const [selectedScript, setSelectedScript] = useState<Script | null>(null);
    const [viewerVisible, setViewerVisible] = useState(false);

    const handlePress = (script: Script) => {
        setSelectedScript(script);
        setViewerVisible(true);
    };

    const handleDismiss = () => {
        setViewerVisible(false);
        setSelectedScript(null);
    };

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
                <Text variant="bodyLarge" style={{ color: theme.colors.error }}>Failed to load scripts.</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Script }) => (
        <TouchableRipple onPress={() => handlePress(item)}>
            <List.Item
                title={item.title}
                description={item.category}
                left={props => <List.Icon {...props} icon="script-text-outline" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
            />
        </TouchableRipple>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <FlatList
                data={scripts}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={Divider}
                contentContainerStyle={styles.listContent}
            />

            <ScriptViewer
                visible={viewerVisible}
                onDismiss={handleDismiss}
                script={selectedScript}
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
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default ScriptsScreen;
