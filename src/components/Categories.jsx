import { useState, useEffect, memo, useCallback } from 'react';
import { getCategories } from '../services/api';
import CategoriesSkeleton from './CategoriesSkeleton';

function Categories({ activeCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategories();
        setCategories(['All categories', ...response.map(cat => cat.list_name)]);
      } catch (error) {
        console.error('Помилка при завантаженні категорій:', error);
        setCategories(['All categories']);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = useCallback((e, category) => {
    e.preventDefault();
    onCategoryChange(category);
  }, [onCategoryChange]);

  return (
    <div className="sidebar-categories">
      {/* <h2 className="sidebar-title">Categories</h2> */}
      
      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <ul className="sidebar-categories-list">
          {categories.map(category => (
            <li key={category} className="sidebar-categories-item">
              <a 
                href="#" 
                className={`sidebar-categories-link ${activeCategory === category ? 'active' : ''}`}
                onClick={(e) => handleCategoryClick(e, category)}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(Categories); 