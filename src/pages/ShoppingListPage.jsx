import { useShoppingList } from '../contexts/ShoppingListContext';
import SupportUkraine from '../components/SupportUkraine';
import booksImage from '../img/books.png';
import ShoppingListItem from '../components/ShoppingListItem';
import Pagination from '../components/Pagination';
import { useCallback, memo, useState, useEffect } from 'react';
import styles from './ShoppingListPage.module.css';

function ShoppingListPage() {
  const { loadedBooks, loading, removeFromShoppingList } = useShoppingList();
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Константи для пагінації
  const itemsPerPage = 3;
  
  // Розрахунок індексів для поточної сторінки
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = loadedBooks.slice(indexOfFirstItem, indexOfLastItem);
  
  // Повертаємося до першої сторінки, коли змінюється список книг
  useEffect(() => {
    setCurrentPage(1);
  }, [loadedBooks.length]);
  
  // Обробник зміни сторінки
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);
  
  // Мемоізований обробник видалення для уникнення перерендерів
  const handleRemove = useCallback((bookId) => {
    removeFromShoppingList(bookId);
  }, [removeFromShoppingList]);

  return (
    <div className={styles.slistSection}>
      <div className={styles.container}>
        <div className={styles.shoppingListContent}>
          <div className={styles.shoppingSupport}>
            <SupportUkraine />
          </div>
          <div className={styles.shoppingMain}>
            <div className={styles.slistTittleContainer}>
              <h1 className={styles.slistHeader}>Shopping <span className={styles.slistHeaderSpan}>List</span></h1>
            </div>
            
            {loading ? (
              <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
              </div>
            ) : loadedBooks.length === 0 ? (
              <div className={styles.slistDemoThumb}>
                <p className={styles.slistDemoText}>
                  This page is empty, add some books and proceed to order.
                </p>
                <img src={booksImage} alt="Books" />
              </div>
            ) : (
              <>
                <section className={styles.slistCardSection}>
                  {currentItems.map(book => (
                    <ShoppingListItem 
                      key={book._id}
                      book={book} 
                      onRemove={handleRemove}
                      isDarkTheme={isDarkTheme}
                    />
                  ))}
                </section>
                
                <Pagination 
                  totalItems={loadedBooks.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ShoppingListPage); 