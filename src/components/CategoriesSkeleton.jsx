import { memo } from 'react';

function CategoriesSkeleton() {
  return (
    <div className="sidebar-categories">
      <h2 className="sidebar-title">Categories</h2>
      <ul className="sidebar-categories-list">
        {Array.from({ length: 8 }, (_, index) => (
          <li key={index} className="sidebar-categories-item">
            <div 
              className="sidebar-categories-link-skeleton skeleton-animate"
              style={{ width: `${Math.floor(Math.random() * 60) + 40}%`, height: '16px', marginBottom: '8px' }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(CategoriesSkeleton); 