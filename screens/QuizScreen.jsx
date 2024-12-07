import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import { fetchQuestions } from '../api/TriviaAPI';
import he from 'he';
import ProgressTracker from '../ProgressTracker';

const QuizScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const data = await fetchQuestions(10, category);
        const decodedQuestions = data.map(q => ({
          ...q,
          question: he.decode(q.question),
          incorrect_answers: q.incorrect_answers.map(ans => he.decode(ans)),
          correct_answer: he.decode(q.correct_answer),
        }));
        setQuestions(decodedQuestions);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [category]);

  const handleAnswerPress = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_answer;

    setSelectedAnswer(selectedOption);
    setIsCorrect(selectedOption === correctAnswer);
    setShowFeedback(true);

    // Move to the next question after a delay
    setTimeout(() => {
      if (selectedOption === correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  useEffect(() => {
    if (quizCompleted) {
      navigation.navigate('Results', { score, totalQuestions: questions.length, category });
    }
  }, [quizCompleted, navigation, score, questions.length]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading Questions...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return <Text>No questions available</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <ProgressTracker currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length} />
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            selectedAnswer === option && styles.selectedAnswerButton,
          ]}
          onPress={() => handleAnswerPress(option)}
        >
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
      {showFeedback && (
        <Modal transparent={true} animationType="slide">
          <View style={[styles.feedbackContainer, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
            <Text style={styles.feedbackText}>{isCorrect ? 'Correct!' : 'Incorrect!'}</Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  questionText: { fontSize: 20, marginBottom: 20 },
  answerButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#dedede',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedAnswerButton: { backgroundColor: '#8a8a8a' },
  buttonText: { fontSize: 18, textAlign: 'center' },
  feedbackContainer: {
    position: 'absolute',
    top: '65%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  feedbackText: { color: '#fff', fontSize: 18 },
  correctFeedback: { backgroundColor: '#006616' },
  incorrectFeedback: { backgroundColor: '#8c0000' },
});

export default QuizScreen;
