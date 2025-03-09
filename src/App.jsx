import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShoppingListPage from './pages/ShoppingListPage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Імітація завантаження даних або ініціалізації
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader">Завантаження...</div>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/shopping-list" element={<ShoppingListPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App; 