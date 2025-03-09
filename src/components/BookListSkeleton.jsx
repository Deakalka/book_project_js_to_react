import { memo } from 'react';
import BookSkeleton from './BookSkeleton';

function BookListSkeleton({ count = 5 }) {
  return (
    <div className="booklist-skeleton">
      <div className="category-title-skeleton skeleton-animate" style={{ width: '60%', height: '24px', marginBottom: '20px' }}></div>
      <div className="books-grid">
        {Array.from({ length: count }, (_, index) => (
          <BookSkeleton key={index} />
        ))}
      </div>
      <div className="button-skeleton skeleton-animate" style={{ width: '120px', height: '36px', marginTop: '20px', marginLeft: 'auto' }}></div>
    </div>
  );
}

BookListSkeleton.displayName = 'BookListSkeleton';

export default memo(BookListSkeleton); 