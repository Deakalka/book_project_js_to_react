import { memo } from 'react';
import styles from './ShoppingListItem.module.css';
import amazonIcon from '../img/amazon.png';
import ibookIcon from '../img/ibook.png';
import whiteAmazonIcon from '../img/white-amazon.png';

function ShoppingListItem({ book, onRemove, isDarkTheme }) {
  return (
    <div className={styles.slistCardList}>
      <li className={styles.slistCardItem}>
        <button 
          type="button" 
          data-id={book._id} 
          className={styles.slistDelBtn}
          onClick={() => onRemove(book._id)}
        ></button>
        
        <div className={styles.slistCardPicture}>
          <img 
            src={book.book_image} 
            className={styles.slistBookImg} 
            alt={book.title} 
          />
        </div>
        
        <div className={styles.slistInfoContainer}>
          <h3 className={styles.slistBookHeader}>{book.title}</h3>
          <h4 className={styles.slistBookCategory}>{book.list_name}</h4>
          <p className={styles.slistBookDescription}>
            {book.description || 'No description available'}
          </p>
          <h5 className={styles.slistBookAutor}>{book.author}</h5>

          <div className={styles.slistNav}>
            <ul className={styles.slistNavList}>
              {book.buy_links && (
                <>
                  <li className={styles.slistNavItem}>
                    <a 
                      href={book.buy_links.find(link => link.name === 'Amazon')?.url || '#'} 
                      className={styles.slistNavLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img 
                        className={styles.imgAmazone} 
                        src={isDarkTheme ? whiteAmazonIcon : amazonIcon} 
                        alt="Amazon" 
                      />
                    </a>
                  </li>
                  <li className={styles.slistNavItem}>
                    <a 
                      href={book.buy_links.find(link => link.name === 'Apple Books')?.url || '#'} 
                      className={styles.slistNavLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img 
                        className={styles.imgApp} 
                        src={ibookIcon} 
                        alt="Apple Books" 
                      />
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </li>
    </div>
  );
}

ShoppingListItem.displayName = 'ShoppingListItem';

export default memo(ShoppingListItem); 