import React, { useCallback, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import type { NavigationProp, RouteProp } from "@react-navigation/native";
import PostHog from "posthog-react-native";

import { QuestionCard } from './QuestionCard';
import { ProgressIndicator } from './ProgressIndicator';
import { ResultCard } from './ResultCard';

type RootStackParamList = {
  BurnoutTest: undefined;
};

type BurnoutTestScreenRouteProp = RouteProp<RootStackParamList, 'BurnoutTest'>;
type BurnoutTestScreenNavProp = NavigationProp<RootStackParamList, 'BurnoutTest'>;

export type BurnoutTestScreenProps = {
  route: BurnoutTestScreenRouteProp;
  navigation: BurnoutTestScreenNavProp;
};

export type BurnoutQuestion = {
  id: number;
  text: string;
  weight: number;
};

const DUMMY_QUESTIONS: BurnoutQuestion[] = [
  {
    id: 1,
    text: 'I feel emotionally drained from my work.',
    weight: 4,
  },
  {
    id: 2,
    text: 'I feel tired when I wake up and have to face another day of work.',
    weight: 4,
  },
  {
    id: 3,
    text: 'I find it hard to be enthusiastic about my tasks.',
    weight: 4,
  },
  {
    id: 4,
    text: 'I feel like I am working on autopilot most of the time.',
    weight: 4,
  },
  {
    id: 5,
    text: 'I feel disconnected from the people I work with.',
    weight: 4,
  },
  {
    id: 6,
    text: 'I doubt the value of the work that I am doing.',
    weight: 4,
  },
];

// Simple PostHog client instance.
// Replace the placeholder API key and host with your real PostHog project settings.
const posthogClient = new PostHog('POSTHOG_API_KEY', {
  host: 'https://us.i.posthog.com',
});

export const BurnoutTestScreen: React.FC<BurnoutTestScreenProps> = () => {
  const theme = useTheme();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [resultScore, setResultScore] = useState<number | null>(null);

  const totalQuestions = DUMMY_QUESTIONS.length;

  const currentQuestion = useMemo(
    () => DUMMY_QUESTIONS[questionIndex],
    [questionIndex],
  );

  const handleAnswer = useCallback(
    (value: number) => {
      const updatedAnswers = [...answers];
      updatedAnswers[questionIndex] = value;
      setAnswers(updatedAnswers);

      const isLastQuestion = questionIndex === totalQuestions - 1;

      if (isLastQuestion) {
        const score = updatedAnswers.reduce((sum, v) => sum + (v ?? 0), 0);
        setResultScore(score);

        try {
          posthogClient.capture('burnout_test_completed', { score });
        } catch (error) {
          // Fallback to console if PostHog is not configured correctly
          // eslint-disable-next-line no-console
          console.warn('Failed to send PostHog event burnout_test_completed', error);
        }
      } else {
        setQuestionIndex((prev) => prev + 1);
      }
    },
    [answers, questionIndex, totalQuestions],
  );

  const handleRetake = useCallback(() => {
    setQuestionIndex(0);
    setAnswers([]);
    setResultScore(null);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title} variant="headlineSmall">
        Burnout Quick Test
      </Text>

      {!resultScore && (
        <>
          <ProgressIndicator current={questionIndex + 1} total={totalQuestions} />
          <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
        </>
      )}

      {typeof resultScore === 'number' && (
        <ResultCard score={resultScore} onRetake={handleRetake} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default BurnoutTestScreen;


