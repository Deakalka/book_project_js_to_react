import { useEffect, useState, memo } from 'react';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Перевіряємо позицію скролу та вирішуємо, показувати кнопку чи ні
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Функція для прокрутки до верху сторінки
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button 
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Прокрутити до початку сторінки"
      title="Прокрутити до початку сторінки"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 4l8 8h-6v8h-4v-8H4z" />
      </svg>
    </button>
  );
}

export default memo(ScrollToTop); 