import { useEffect, memo } from 'react';
import { NavLink } from 'react-router-dom';
import '../img/symbol-defs.svg';

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
        <img src="/src/img/user-profile.png" alt="User" className="menu-user-img" />
        <p className="menu-user-name">User Name</p>
      </div>
      <button className="menu-signup-btn">
        Sign up
        <svg className="sign-arrow" width="20" height="20">
          <use href="/src/img/symbol-defs.svg#icon-arrow-narrow-right"></use>
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
            <use href="/src/img/symbol-defs.svg#icon-Vector"></use>
          </svg>
        </div>
      </div>
      <button className="menu-logout-btn">Log out</button>
      <div className="menu-background-image"></div>
    </div>
  );
}

export default memo(MobileMenu); 