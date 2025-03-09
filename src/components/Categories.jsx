import { useState, useEffect } from 'react';

function Categories({ activeCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Імітація отримання категорій з API
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Тут буде реальний виклик API
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(800);
        
        // Імітація даних категорій
        setCategories([
          'Всі книги',
          'Бестселери',
          'Нові книги',
          'Фантастика',
          'Драма',
          'Детектив',
          'Романи',
          'Наукпоп',
          'Бізнес',
          'Мистецтво'
        ]);
      } catch (error) {
        console.error('Помилка при завантаженні категорій:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories">
      <h2>Категорії книг</h2>
      
      {loading ? (
        <p>Завантаження категорій...</p>
      ) : (
        <ul className="categories-list">
          {categories.map(category => (
            <li 
              key={category} 
              className={`category-item ${activeCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categories; 