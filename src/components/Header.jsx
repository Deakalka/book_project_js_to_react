import { useState, memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <nav className="header-naviganion">
          <Link className="header-logo" to="/">
            <svg className="logo-icon" width="24" height="24">
              <use href="#icon-logo-1"></use>
            </svg>
            <svg className="logo-text-icon" width="77" height="13">
              <use href="#icon-Bookshelf"></use>
            </svg>
          </Link>
          <ul className="header-menu">
            <li className="header-item">
              <NavLink className={({ isActive }) => 
                isActive ? "header-menu-link activeButton" : "header-menu-link"
              } to="/">Home</NavLink>
            </li>
            <li className="header-item">
              <NavLink className={({ isActive }) => 
                isActive ? "header-menu-shopping activeButton" : "header-menu-shopping"
              } to="/shopping-list">
                Shopping List
                <svg className="basket-icon" width="20" height="20">
                  <use href="#icon-Vector"></use>
                </svg>
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="box-btn">
          <ThemeToggle />

          <button type="button" className="signup-btn">
            Sign up
            <svg className="sign-arrow" width="20" height="20">
              <use href="#icon-arrow-narrow-right"></use>        
            </svg>
          </button>
          
          <button 
            type="button" 
            className={`menu-open-btn ${menuOpen ? 'hidden' : ''}`}
            onClick={toggleMenu}
            aria-label="Open mobile menu"
          >
            <svg className="menu-open-icon" width="28" height="28">
              <use href="#icon-align-left"></use>
            </svg>
          </button>
          
          <button 
            type="button" 
            className={`menu-close-btn ${menuOpen ? '' : 'hidden'}`}
            onClick={toggleMenu}
            aria-label="Close mobile menu"
          >
            <svg className="menu-close-icon" width="28" height="28">
              <use href="#icon-x-close"></use>
            </svg>
          </button>
        </div>
      </div>

      {/* Мобільне меню */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

export default memo(Header); 