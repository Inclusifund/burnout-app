import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

type ResultCardProps = {
  score: number;
  onRetake?: () => void;
};

type BurnoutLevel = 'Low' | 'Mild' | 'Moderate' | 'High';

const getBurnoutLevel = (score: number): BurnoutLevel => {
  if (score <= 5) return 'Low';
  if (score <= 11) return 'Mild';
  if (score <= 17) return 'Moderate';
  return 'High';
};

const getBurnoutCopy = (level: BurnoutLevel): string => {
  switch (level) {
    case 'Low':
      return 'You are showing low signs of burnout. Keep protecting your energy and routines that work for you.';
    case 'Mild':
      return 'You may be starting to feel some burnout creep in. This is a good time to add small resets into your week.';
    case 'Moderate':
      return 'You are experiencing moderate burnout. Consider prioritizing recovery and support over the next few weeks.';
    case 'High':
    default:
      return 'You are showing high levels of burnout. It may be time to lean on your support system and reset more intentionally.';
  }
};

export const ResultCard: React.FC<ResultCardProps> = ({ score, onRetake }) => {
  const level = useMemo(() => getBurnoutLevel(score), [score]);
  const copy = useMemo(() => getBurnoutCopy(level), [level]);

  const handleGoToResetToolkit = () => {
    // eslint-disable-next-line no-console
    console.log('Go to Reset Toolkit');
  };

  const handleViewSupportScripts = () => {
    // eslint-disable-next-line no-console
    console.log('View Support Scripts');
  };

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          Burnout Level: {level}
        </Text>
        <Text variant="bodyMedium" style={styles.copy}>
          {copy}
        </Text>
        <Text variant="labelMedium" style={styles.score}>
          Your score: {score} / 24
        </Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button mode="contained" style={styles.button} onPress={handleGoToResetToolkit}>
          Go to Reset Toolkit
        </Button>
        <Button mode="outlined" style={styles.button} onPress={handleViewSupportScripts}>
          View Support Scripts
        </Button>
      </Card.Actions>
      {onRetake && (
        <Card.Actions style={styles.retakeActions}>
          <Button mode="text" onPress={onRetake}>
            Retake test
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
  },
  title: {
    marginBottom: 8,
  },
  copy: {
    marginBottom: 12,
  },
  score: {
    marginTop: 4,
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  retakeActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
});

export default ResultCard;


