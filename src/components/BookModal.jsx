import { useEffect, useState, useCallback, memo } from 'react';
import { useShoppingList } from '../contexts/ShoppingListContext';
import amazonIcon from '../img/amazon.png';
import ibookIcon from '../img/ibook.png';
import whiteAmazonIcon from '../img/white-amazon.png';
import '../img/symbol-defs.svg';
import styles from './BookModal.module.css';

function BookModal({ book, onClose }) {
  const { isBookInShoppingList, addToShoppingList, removeFromShoppingList } = useShoppingList();
  const [showNotification, setShowNotification] = useState(false);
  const isDarkTheme = document.body.classList.contains('dark-theme');

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleShoppingListClick = useCallback(() => {
    if (!book || !book._id) {
      console.warn('Спроба додати/видалити книгу без ID');
      return;
    }

    if (isBookInShoppingList(book._id)) {
      removeFromShoppingList(book._id);
      setShowNotification(false);
    } else {
      addToShoppingList(book._id);
      setShowNotification(true);
    }
  }, [book, addToShoppingList, isBookInShoppingList, removeFromShoppingList]);

  useEffect(() => {
    // Перевіряємо, чи книга вже в списку покупок при відкритті модального вікна
    if (book && book._id && isBookInShoppingList(book._id)) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }

    // Додаємо обробник для клавіші Escape
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    // Запобігаємо дьорганню сторінки при відкритті/закритті модалки
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;
    
    // Зберігаємо оригінальний стиль
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [book, isBookInShoppingList, onClose]);

  // Якщо книга не передана або не містить необхідних даних, не відображаємо модальне вікно
  if (!book) {
    return null;
  }

  // Знаходимо потрібні посилання на магазини
  const amazonLink = book.buy_links?.find(link => link.name === 'Amazon')?.url || '#';
  const appleBooksLink = book.buy_links?.find(link => link.name === 'Apple Books')?.url || '#';

  return (
    <div className={styles.modal} onClick={handleBackdropClick}>
      <div className={`${styles.content} ${styles.bookModalContent} ${showNotification ? styles.expanded : ''}`}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close modal"></button>

        <div className={styles.modalContent}>
          <div className={styles.imgModal}>
            <img 
              src={book.book_image || 'placeholder.jpg'} 
              alt={book.title || 'Book cover'} 
            />
          </div>
          
          <div className={styles.text}>
            <h2 className={styles.bookName}>{book.title || 'Unknown title'}</h2>
            <p className={styles.author}>{book.author || 'Unknown author'}</p>
            
            <p className={styles.description}>
              {book.description || 'No description available for this book.'}
            </p>
            
            <div className={styles.links}>
              <a href={amazonLink} target="_blank" rel="noopener noreferrer" name="Amazon" className={styles.modalShoppingLink}>
                <img 
                  src={isDarkTheme ? whiteAmazonIcon : amazonIcon} 
                  alt="Amazon" 
                  className={`${styles.logo} ${styles.modalAmazonIcon}`} 
                />
              </a>
              <a href={appleBooksLink} target="_blank" rel="noopener noreferrer" name="Apple Books" className={styles.modalShoppingLink}>
                <img 
                  src={ibookIcon} 
                  alt="Apple Books" 
                  className={`${styles.logo} ${styles.modalAppleIcon}`} 
                />
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.buttonPlace}>
          <button 
            type="button" 
            className={styles.buttonMod}
            onClick={handleShoppingListClick}
          >
            {isBookInShoppingList(book._id) 
              ? "Remove from the shopping list" 
              : "Add to shopping list"
            }
          </button>
        </div>
        
        <div className={`${styles.notificationContainer} ${showNotification ? styles.visible : ''}`}>
          <p className={styles.notification}>
            Congratulations! You have added the book to the shopping list. To delete, press the button &quot;Remove from the shopping list&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(BookModal); 