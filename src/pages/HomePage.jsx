import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import Categories from '../components/Categories';
import BookModal from '../components/BookModal';
import SupportUkraine from '../components/SupportUkraine';
import BookListSkeleton from '../components/BookListSkeleton';
import BookSort from '../components/BookSort';
import { getBestsellersBooks, getBooksByCategory, getBookById } from '../services/api';

// Мемоізований компонент для лінивого завантаження зображень книги
const LazyBookImage = memo(({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  return (
    <>
      {!isLoaded && !isError && (
        <div className="book-cover-placeholder skeleton-animate"></div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </>
  );
});

LazyBookImage.displayName = 'LazyBookImage';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All categories');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookData, setSelectedBookData] = useState(null);
  const [sortOption, setSortOption] = useState('default');

  // Завантаження книг при зміні категорії
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        
        if (activeCategory === 'All categories') {
          const topBooks = await getBestsellersBooks();
          console.log('Отримані бестселери:', topBooks);
          setBooks(topBooks || []);
        } else {
          const categoryBooks = await getBooksByCategory(activeCategory);
          console.log('Отримані книги категорії:', categoryBooks);
          setBooks(categoryBooks || []);
        }
      } catch (error) {
        console.error('Помилка при завантаженні книг:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [activeCategory]);

  // Отримання детальної інформації про книгу для модального вікна
  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!selectedBook) return;
      
      try {
        const bookData = await getBookById(selectedBook);
        setSelectedBookData(bookData);
      } catch (error) {
        console.error('Помилка при завантаженні деталей книги:', error);
        setSelectedBookData(null);
      }
    };

    fetchBookDetails();
  }, [selectedBook]);

  // Обробник зміни категорії - мемоізований
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  // Функція для отримання останнього слова з категорії
  const getLastWord = useCallback((category) => {
    if (!category) return '';
    const words = category.trim().split(" ");
    return words[words.length - 1];
  }, []);

  // Функція для видалення останнього слова з категорії
  const removeLastWord = useCallback((category) => {
    if (!category) return '';
    const words = category.split(' ');
    words.pop();
    return words.join(' ');
  }, []);

  // Обробник для кнопки "See More" - мемоізований
  const handleSeeMore = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  // Обробник для відкриття модального вікна - мемоізований
  const openBookModal = useCallback((bookId) => {
    setSelectedBook(bookId);
  }, []);

  // Обробник для закриття модального вікна - мемоізований
  const closeBookModal = useCallback(() => {
    setSelectedBook(null);
    setSelectedBookData(null);
  }, []);

  // Обробник для зміни сортування
  const handleSortChange = useCallback((option) => {
    setSortOption(option);
  }, []);

  // Сортування книг
  const sortedBooks = useMemo(() => {
    if (!books || books.length === 0) return books;

    const sortBooks = (booksToSort) => {
      if (!Array.isArray(booksToSort)) return booksToSort;

      return [...booksToSort].sort((a, b) => {
        switch (sortOption) {
          case 'title-asc':
            return a.title?.localeCompare(b.title || '');
          case 'title-desc':
            return b.title?.localeCompare(a.title || '');
          case 'author-asc':
            return a.author?.localeCompare(b.author || '');
          case 'author-desc':
            return b.author?.localeCompare(a.author || '');
          default:
            return 0;
        }
      });
    };

    // Якщо книги згруповані за категоріями (на головній сторінці)
    if (activeCategory === 'All categories') {
      return books.map(category => {
        if (category.books && Array.isArray(category.books)) {
          return {
            ...category,
            books: sortBooks(category.books)
          };
        }
        return category;
      });
    }

    // Якщо книги у плоскому списку (у конкретній категорії)
    return sortBooks(books);
  }, [books, sortOption, activeCategory]);

  // Рендеринг списку кращих книг по категоріям
  const renderTopBooks = () => {
    // Якщо завантаження - відображаємо скелетони
    if (loading) {
      return (
        <div className="best-books-container">
          {Array.from({ length: 4 }, (_, i) => (
            <BookListSkeleton key={i} />
          ))}
        </div>
      );
    }
    
    // Перевіряємо, чи дані є масивом і чи не порожній він
    if (!Array.isArray(sortedBooks) || sortedBooks.length === 0) {
      return <p>Немає доступних книг</p>;
    }

    return (
      <div className="best-books-container">
        <div className="books-header">
          <h1 className="collection-title">Best Sellers <span>Books</span></h1>
          <BookSort onSortChange={handleSortChange} />
        </div>
        
        <ul className="top-books-all">
          {sortedBooks.map((categoryBooks, categoryIndex) => (
            <li key={categoryBooks?.list_name || `category-${categoryIndex}`} className="book-category-item">
              <p className="book-category">{categoryBooks?.list_name || 'Unknown Category'}</p>
              
              <ul className="top-books">
                {categoryBooks?.books && Array.isArray(categoryBooks.books) ? 
                  categoryBooks.books.map((book, bookIndex) => (
                    <li 
                      key={book?._id || `book-${categoryIndex}-${bookIndex}`} 
                      className="book-card" 
                      data-id={book?._id}
                      onClick={() => book?._id && openBookModal(book._id)}
                    >
                      <div className="book-card-hover">
                        <img 
                          className="book-cover" 
                          src={book?.book_image || 'placeholder.jpg'} 
                          alt={book?.title || 'Book cover'}
                        />
                        <div className="view-more">
                          <p className="view-more-text">quick view</p>
                        </div>
                      </div>
                      <div className="book-descr">
                        <h2 className="book-name">{book?.title || 'Unknown title'}</h2>
                        <h3 className="book-author">{book?.author || 'Unknown author'}</h3>
                      </div>
                    </li>
                  )) : <li>Немає книг в цій категорії</li>
                }
              </ul>
              
              {categoryBooks?.list_name && (
                <button 
                  className="book-card-btn" 
                  type="button" 
                  data-category={categoryBooks.list_name}
                  onClick={() => handleSeeMore(categoryBooks.list_name)}
                >
                  see more
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Рендеринг книг по конкретній категорії
  const renderCategoryBooks = () => {
    // Якщо завантаження - відображаємо скелетони
    if (loading) {
      return (
        <div className="best-books-container">
          <BookListSkeleton count={10} />
        </div>
      );
    }

    if (!Array.isArray(sortedBooks) || sortedBooks.length === 0) {
      return <p>Немає доступних книг у цій категорії</p>;
    }

    return (
      <div className="best-books-container">
        <div className="books-header">
          <h2 className="collection-title">
            {removeLastWord(activeCategory)} <span>{getLastWord(activeCategory)}</span>
          </h2>
          <BookSort onSortChange={handleSortChange} />
        </div>
        
        <ul className="category-books-cat">
          {sortedBooks.map((book, index) => (
            <li 
              key={book?._id || `category-book-${index}`} 
              className="book-card-category" 
              data-id={book?._id}
              onClick={() => book?._id && openBookModal(book._id)}
            >
              <div className="book-thumb">
                <img 
                  className="book-cover-cat" 
                  src={book?.book_image || 'placeholder.jpg'} 
                  alt={book?.title || 'Book cover'} 
                />
                <div className="view-more view-more-cat">
                  <p className="view-more-text">quick view</p>
                </div>
              </div>
              <div className="book-descr">
                <h2 className="book-namne-cat">{book?.title || 'Unknown title'}</h2>
                <h3 className="book-author">{book?.author || 'Unknown author'}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="home-page-container">
      <section className="sidebar">
        <div className="categories-support">
          <Categories 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          <SupportUkraine />
        </div>
      </section>
      
      <div className="best-books-gallery">
        {activeCategory === 'All categories' ? renderTopBooks() : renderCategoryBooks()}
      </div>
      
      {selectedBook && selectedBookData && (
        <BookModal 
          book={selectedBookData} 
          onClose={closeBookModal} 
        />
      )}
    </div>
  );
}

export default memo(HomePage); 