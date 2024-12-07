import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { fetchCategories } from '../api/TriviaAPI';

const WelcomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData.trivia_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    loadCategories();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Button
        title="Start Quiz"
        color="#262626"
        onPress={() => navigation.navigate('Quiz', { category: selectedCategory })}
        disabled={!selectedCategory} // Disable until a category is selected
      />
      <Text style={styles.title}>Select a Category:</Text>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategory === category.id && styles.selectedButton,
          ]}
          onPress={() => setSelectedCategory(category.id)}
        >
          <Text style={styles.buttonText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
      <Button
        title="Start Quiz"
        color="#262626"
        onPress={() => navigation.navigate('Quiz', { category: selectedCategory })}
        disabled={!selectedCategory} // Disable until a category is selected
      />
    </ScrollView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { padding: 30 },
  title: { fontSize: 20, marginBottom: 10, marginTop: 15 },
  categoryButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedButton: { backgroundColor: '#919090' },
  buttonText: { textAlign: 'center', fontSize: 16 },
});
