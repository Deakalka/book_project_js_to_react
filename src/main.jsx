import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './css/styles.css';

// Імпортуємо основний SVG файл з іконками
import './img/symbol-defs.svg';

// Визначаємо базовий шлях для маршрутизації
const basename = '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
); 