import { memo } from 'react';

function ShoppingListSkeleton() {
  return (
    <div className="slist-card-list skeleton">
      <div className="slist-card-item skeleton-animate">
        <div className="slist-card-picture-skeleton"></div>
        <div className="slist-info-container">
          <div className="slist-book-header-skeleton skeleton-animate"></div>
          <div className="slist-book-category-skeleton skeleton-animate"></div>
          <div className="slist-book-description-skeleton skeleton-animate"></div>
          <div className="slist-book-author-skeleton skeleton-animate"></div>
          <div className="slist-nav-skeleton skeleton-animate"></div>
        </div>
      </div>
    </div>
  );
}

export default memo(ShoppingListSkeleton); 