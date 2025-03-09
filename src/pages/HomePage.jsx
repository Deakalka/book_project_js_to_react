import { useState, useEffect } from 'react';
import Categories from '../components/Categories';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Всі книги');

  useEffect(() => {
    // Імітація завантаження даних з API
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // Тут буде реальний виклик API
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(1000);
        
        // Імітація даних
        setBooks([
          { id: 1, title: 'Книга 1', author: 'Автор 1', category: 'Фантастика' },
          { id: 2, title: 'Книга 2', author: 'Автор 2', category: 'Драма' },
          { id: 3, title: 'Книга 3', author: 'Автор 3', category: 'Детектив' },
        ]);
      } catch (error) {
        console.error('Помилка при завантаженні книг:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="sidebar">
          <Categories 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>
        
        <div className="content">
          <h1>Бестселери книг в Україні</h1>
          
          {loading ? (
            <p>Завантаження книг...</p>
          ) : (
            <div className="books-grid">
              {books.map(book => (
                <div key={book.id} className="book-card">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <p>Категорія: {book.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage; 