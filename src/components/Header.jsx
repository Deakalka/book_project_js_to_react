import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">Bookshelf</Link>
        
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"
              }>
                Головна
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/shopping-list" className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"
              }>
                Список покупок
              </NavLink>
            </li>
          </ul>
        </nav>

        <button 
          className="menu-toggle"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'Закрити' : 'Меню'}
        </button>
      </div>
    </header>
  );
}

export default Header; 