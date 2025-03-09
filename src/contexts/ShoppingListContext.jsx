import { createContext, useState, useEffect, useContext } from 'react';
import { getBookById } from '../services/api';

const STORAGE_KEY = 'local-storage-books';

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [loadedBooks, setLoadedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Завантаження списку ID книг з localStorage
  useEffect(() => {
    const loadShoppingList = () => {
      try {
        console.log('Завантаження списку покупок з localStorage...');
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const result = JSON.parse(data);
          console.log('Завантажені дані зі сховища:', result);
          
          if (Array.isArray(result)) {
            setShoppingList(result);
          } else {
            console.warn('Дані в localStorage не є масивом, встановлюємо пустий список');
            setShoppingList([]);
          }
        } else {
          console.log('Дані в localStorage відсутні, встановлюємо пустий список');
          setShoppingList([]);
        }
      } catch (error) {
        console.error('Помилка при завантаженні списку покупок з localStorage:', error);
        setShoppingList([]);
      } finally {
        setLoading(false);
      }
    };

    loadShoppingList();
  }, []);

  // Завантаження детальної інформації про книги
  useEffect(() => {
    const fetchBookDetails = async () => {
      if (shoppingList.length === 0) {
        console.log('Список покупок пустий, пропускаємо запит деталей книг');
        setLoadedBooks([]);
        setLoading(false);
        return;
      }

      try {
        console.log('Завантаження деталей для книг зі списку покупок...');
        setLoading(true);
        
        const bookPromises = shoppingList.map(item => {
          if (!item || !item.dataId) {
            console.warn('Елемент списку покупок не містить dataId:', item);
            return Promise.resolve(null);
          }
          return getBookById(item.dataId).catch(() => null);
        });
        
        const booksData = await Promise.all(bookPromises);
        // Фільтруємо null результати
        const filteredBooks = booksData.filter(book => book !== null);
        console.log('Отримані деталі книг:', filteredBooks);
        
        setLoadedBooks(filteredBooks);
      } catch (error) {
        console.error('Помилка при завантаженні деталей книг:', error);
        setLoadedBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [shoppingList]);

  // Перевірка, чи є книга в списку покупок
  const isBookInShoppingList = (bookId) => {
    if (!bookId) return false;
    return shoppingList.some(item => item.dataId === bookId);
  };

  // Додавання книги до списку покупок
  const addToShoppingList = (bookId) => {
    if (!bookId) {
      console.warn('Спроба додати книгу без ID в список покупок');
      return;
    }
    
    if (!isBookInShoppingList(bookId)) {
      console.log(`Додаємо книгу з ID "${bookId}" до списку покупок`);
      const updatedList = [...shoppingList, { dataId: bookId }];
      setShoppingList(updatedList);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      } catch (error) {
        console.error('Помилка при збереженні списку покупок в localStorage:', error);
      }
    } else {
      console.log(`Книга з ID "${bookId}" вже є в списку покупок`);
    }
  };

  // Видалення книги зі списку покупок
  const removeFromShoppingList = (bookId) => {
    if (!bookId) {
      console.warn('Спроба видалити книгу без ID зі списку покупок');
      return;
    }
    
    console.log(`Видаляємо книгу з ID "${bookId}" зі списку покупок`);
    const updatedList = shoppingList.filter(item => item.dataId !== bookId);
    setShoppingList(updatedList);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.error('Помилка при збереженні оновленого списку покупок в localStorage:', error);
    }
  };

  const contextValue = {
    shoppingList,
    loadedBooks,
    loading,
    isBookInShoppingList,
    addToShoppingList,
    removeFromShoppingList
  };

  return (
    <ShoppingListContext.Provider value={contextValue}>
      {children}
    </ShoppingListContext.Provider>
  );
};

// Хук для спрощеного доступу до контексту
export const useShoppingList = () => useContext(ShoppingListContext); 