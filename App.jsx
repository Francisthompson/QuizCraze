import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultsScreen';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Welcome to QuizCraze!" component={WelcomeScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
