import { Outlet } from 'react-router-dom';
import Header from './Header';
import ScrollToTop from './ScrollToTop';
import { memo } from 'react';

function Layout({ onThemeToggle }) {
  return (
    <div className="app-container">
      <Header onThemeToggle={onThemeToggle} />
      <main>
        <Outlet />
      </main>
      <ScrollToTop />
    </div>
  );
}

export default memo(Layout); 