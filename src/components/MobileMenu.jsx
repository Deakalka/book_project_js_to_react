import { useEffect, memo } from 'react';
import { NavLink } from 'react-router-dom';
// Замінюємо імпорт зображення на іконку користувача
// import userProfileImg from '../img/user-profile.png';
// Видаляємо прямий імпорт SVG
// import '../img/symbol-defs.svg';

function MobileMenu({ isOpen, onClose }) {
  // Запобігаємо скролу body коли меню відкрите
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Закриття меню при кліку на посилання
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className={`menu-modal ${isOpen ? 'menu-is-open' : ''}`}>
      <div className="name-caption">
        {/* Замінюємо зображення на іконку */}
        <svg className="menu-user-icon" width="37" height="37" viewBox="0 0 37 37">
          <circle cx="18.5" cy="18.5" r="18.5" fill="#f6f6f6" />
          <path d="M18.5 10a5 5 0 100 10 5 5 0 000-10zm0 15c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" fill="#4f2ee8" />
        </svg>
        <p className="menu-user-name">User Name</p>
      </div>
      <button className="menu-signup-btn">
        Sign up
        <svg className="sign-arrow" width="20" height="20">
          <use href="#icon-arrow-narrow-right"></use>
        </svg>
      </button>
      <div className="menu-central-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? "menu-home-link active" : "menu-link"
          }
          onClick={handleLinkClick}
        >
          Home
        </NavLink>
        <div className="menu-shopping-caption">
          <NavLink 
            to="/shopping-list" 
            className={({ isActive }) => 
              isActive ? "menu-list-link active" : "menu-list-link"
            }
            onClick={handleLinkClick}
          >
            Shopping list
          </NavLink>
          <svg className="menu-shopping-svg" width="20" height="20">
            <use href="#icon-Vector"></use>
          </svg>
        </div>
      </div>
      <button className="menu-logout-btn">Log out</button>
      <div className="menu-background-image"></div>
    </div>
  );
}

export default memo(MobileMenu); 