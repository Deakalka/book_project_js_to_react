import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ShoppingListProvider } from './contexts/ShoppingListContext';

// Використовуємо lazy loading для сторінок
const HomePage = lazy(() => import('./pages/HomePage'));
const ShoppingListPage = lazy(() => import('./pages/ShoppingListPage'));

// Компонент для відображення під час завантаження сторінок
const PageLoader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Імітація завантаження даних або ініціалізації
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Обробник для перемикання теми
  const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  };

  // Перевірка збереженої теми при завантаженні
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }, []);

  return (
    <ShoppingListProvider>
      {loading ? (
        <PageLoader />
      ) : (
        <Routes>
          <Route path="/" element={<Layout onThemeToggle={toggleTheme} />}>
            <Route index element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            } />
            <Route path="/shopping-list" element={
              <Suspense fallback={<PageLoader />}>
                <ShoppingListPage />
              </Suspense>
            } />
          </Route>
        </Routes>
      )}
    </ShoppingListProvider>
  );
}

export default App; 