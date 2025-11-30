import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';

import type { BurnoutQuestion } from './BurnoutTestScreen';

type QuestionCardProps = {
  question: BurnoutQuestion;
  onAnswer: (value: number) => void;
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text variant="titleMedium" style={styles.questionText}>
          {question.text}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          mode="outlined"
          onPress={() => onAnswer(0)}
          style={styles.button}
          textColor={theme.colors.onSurface}
        >
          Not at all
        </Button>
        <Button
          mode="contained"
          onPress={() => onAnswer(question.weight)}
          style={styles.button}
        >
          Yes, often
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
  },
  questionText: {
    marginBottom: 16,
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default QuestionCard;


