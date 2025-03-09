import { useShoppingList } from '../contexts/ShoppingListContext';
import SupportUkraine from '../components/SupportUkraine';
import amazonIcon from '../img/amazon.png';
import ibookIcon from '../img/ibook.png';
import booksImage from '../img/books.png';
import whiteAmazonIcon from '../img/white-amazon.png';
import { useCallback, memo, useState, useEffect } from 'react';

// Мемоізований компонент для рендерингу окремої книги
const ShoppingListItem = memo(({ book, onRemove, isDarkTheme }) => (
  <div className="slist-card-list">
    <li className="slist-card-item">
      <button 
        type="button" 
        data-id={book._id} 
        className="slist-del-btn js-slist-del-btn"
        onClick={() => onRemove(book._id)}
      ></button>
      
      <div className="slist-card-picture">
        <img 
          src={book.book_image} 
          className="slist-book-img" 
          alt={book.title} 
        />
      </div>
      
      <div className="slist-info-container">
        <h3 className="slist-book-header">{book.title}</h3>
        <h4 className="slist-book-category">{book.list_name}</h4>
        <p className="slist-book-description">
          {book.description || 'No description available'}
        </p>
        <h5 className="slist-book-autor">{book.author}</h5>

        <div className="slist-nav">
          <ul className="slist-nav-list">
            {book.buy_links && (
              <>
                <li className="slist-nav-item">
                  <a 
                    href={book.buy_links.find(link => link.name === 'Amazon')?.url || '#'} 
                    className="slist-nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      className="img-amazone logo" 
                      src={isDarkTheme ? whiteAmazonIcon : amazonIcon} 
                      alt="Amazon" 
                    />
                  </a>
                </li>
                <li className="slist-nav-item">
                  <a 
                    href={book.buy_links.find(link => link.name === 'Apple Books')?.url || '#'} 
                    className="slist-nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      className="img-app logo" 
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
));

// Компонент пагінації
const Pagination = memo(({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;
  
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  
  return (
    <div className="pagination">
      <button 
        className="pagination-btn" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Попередня
      </button>
      
      {pages.map(page => (
        <button 
          key={page} 
          className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      
      <button 
        className="pagination-btn" 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Наступна &raquo;
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

// Встановлюємо displayName для компонента
ShoppingListItem.displayName = 'ShoppingListItem';

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
    <div className="slist-section">
      <div className="container">
        <div className="shopping-list-content">
          <div className="shopping-support">
            <SupportUkraine />
          </div>
          <div className="shopping-main">
            <div className="slist-tittle-container">
              <h1 className="slist-header">Shopping <span className="slist-header-span">List</span></h1>
            </div>
            
            {loading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : loadedBooks.length === 0 ? (
              <div className="slist-demo-thumb">
                <p className="slist-demo-text">
                  This page is empty, add some books and proceed to order.
                </p>
                <img src={booksImage} alt="Books" />
              </div>
            ) : (
              <>
                <section className="slist-card-section">
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