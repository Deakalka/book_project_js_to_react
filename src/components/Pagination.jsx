import { memo } from 'react';
import styles from './Pagination.module.css';

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;
  
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  
  return (
    <div className={styles.pagination}>
      <button 
        className={styles.paginationBtn} 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Попередня
      </button>
      
      {pages.map(page => (
        <button 
          key={page} 
          className={`${styles.paginationBtn} ${currentPage === page ? styles.active : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      
      <button 
        className={styles.paginationBtn} 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Наступна &raquo;
      </button>
    </div>
  );
}

Pagination.displayName = 'Pagination';

export default memo(Pagination); 