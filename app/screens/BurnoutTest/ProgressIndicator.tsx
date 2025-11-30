import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';

type ProgressIndicatorProps = {
  current: number;
  total: number;
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ current, total }) => {
  const progress = total > 0 ? current / total : 0;

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} style={styles.progress} />
      <Text style={styles.label}>Question {current} of {total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
  },
  progress: {
    height: 8,
    borderRadius: 4,
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ProgressIndicator;


