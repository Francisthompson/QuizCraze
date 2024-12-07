import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';

export const fetchQuestions = async (amount = 10, category = '', difficulty = '') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        amount,
        category,
        difficulty,
        type: 'multiple',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api_category.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
