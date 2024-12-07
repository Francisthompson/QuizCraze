// ProgressTracker.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressTracker = ({ currentQuestionIndex, totalQuestions }) => {
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>
        Question {currentQuestionIndex + 1}/{totalQuestions}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgressTracker;
