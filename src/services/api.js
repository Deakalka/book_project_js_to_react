import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://books-backend.p.goit.global/books',
});

// Отримати бестселери - для головної сторінки
export const getBestsellersBooks = async () => {
  try {
    console.log('Запит на отримання бестселерів...');
    const result = await apiInstance.get('/top-books');
    console.log('Результат запиту бестселерів:', result.data);
    return result.data;
  } catch (error) {
    console.error('Error fetching bestsellers:', error.message);
    return [];
  }
};

// Отримати книги за категорією
export const getBooksByCategory = async (category) => {
  try {
    console.log(`Запит на отримання книг категорії "${category}"...`);
    const response = await apiInstance.get(`/category?category=${category}`);
    console.log('Результат запиту категорії:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by category "${category}":`, error.message);
    return [];
  }
};

// Отримати список категорій
export const getCategories = async () => {
  try {
    console.log('Запит на отримання списку категорій...');
    const response = await apiInstance.get('/category-list');
    console.log('Результат запиту категорій:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return [];
  }
};

// Отримати деталі книги за ID
export const getBookById = async (bookId) => {
  try {
    console.log(`Запит на отримання деталей книги з ID "${bookId}"...`);
    const response = await apiInstance.get(`/${bookId}`);
    console.log('Результат запиту деталей книги:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book details for ID "${bookId}":`, error.message);
    return null;
  }
}; 