import { memo } from 'react';

function BookSkeleton() {
  return (
    <div className="book-card skeleton">
      <div className="book-thumb skeleton-animate">
        <div className="book-cover-skeleton"></div>
      </div>
      <div className="book-descr">
        <div className="book-title-skeleton skeleton-animate"></div>
        <div className="book-author-skeleton skeleton-animate"></div>
      </div>
    </div>
  );
}

export default memo(BookSkeleton); 