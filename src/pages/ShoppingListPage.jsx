import { useState, useEffect } from 'react';

function ShoppingListPage() {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Імітація завантаження даних зі сховища
    const fetchShoppingList = async () => {
      try {
        setLoading(true);
        // Тут буде реальний код для отримання даних зі сховища (localStorage або бекенду)
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(800);
        
        // Перевіряємо дані зі сховища або використовуємо пусті за замовчуванням
        const storedList = localStorage.getItem('shoppingList');
        if (storedList) {
          setShoppingList(JSON.parse(storedList));
        } else {
          setShoppingList([]);
        }
      } catch (error) {
        console.error('Помилка при завантаженні списку покупок:', error);
        setShoppingList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingList();
  }, []);

  const removeFromList = (bookId) => {
    const updatedList = shoppingList.filter(book => book.id !== bookId);
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  return (
    <div className="shopping-list-page">
      <div className="container">
        <h1>Мій список покупок</h1>
        
        {loading ? (
          <p>Завантаження списку...</p>
        ) : shoppingList.length === 0 ? (
          <div className="empty-list">
            <p>Ваш список покупок порожній</p>
            <p>Додайте книги зі сторінки бестселерів, щоб придбати їх пізніше</p>
          </div>
        ) : (
          <ul className="shopping-items">
            {shoppingList.map(book => (
              <li key={book.id} className="shopping-item">
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromList(book.id)}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ShoppingListPage; 