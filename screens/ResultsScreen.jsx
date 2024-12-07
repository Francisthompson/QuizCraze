import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultsScreen = ({ route, navigation }) => {
  const { score, totalQuestions, category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete</Text>
      <Text style={styles.scoreText}>You scored {score}/{totalQuestions}!</Text>

      <Button
        title="Try Again"
        onPress={() => navigation.navigate('Quiz', { category })}
        color="#262626" 
      />
      <Button
        title="Choose a Different Category"
        onPress={() => navigation.navigate('Welcome to QuizCraze!')}
        color="#262626" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 3,      
    borderColor: '#000',     
    borderRadius: 5,
    padding: 20,
    margin: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 40,
  },
});

export default ResultsScreen;
