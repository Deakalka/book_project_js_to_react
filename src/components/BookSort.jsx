import { useState, memo } from 'react';
import styles from './BookSort.module.css';

function BookSort({ onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Default');
  
  const sortOptions = [
    { id: 'default', label: 'Default' },
    { id: 'title-asc', label: 'Title (A-Z)' },
    { id: 'title-desc', label: 'Title (Z-A)' },
    { id: 'author-asc', label: 'Author (A-Z)' },
    { id: 'author-desc', label: 'Author (Z-A)' }
  ];
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    
    if (onSortChange) {
      onSortChange(option.id);
    }
  };
  
  return (
    <div className={styles.sortContainer}>
      <div className={styles.sortLabel}>Sort by:</div>
      
      <div className={styles.sortDropdown}>
        <div 
          className={styles.sortSelected}
          onClick={toggleDropdown}
        >
          <span>{selectedOption}</span>
          <svg 
            className={`${styles.sortArrow} ${isOpen ? styles.sortArrowUp : ''}`} 
            width="14" 
            height="8" 
            viewBox="0 0 14 8" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {isOpen && (
          <div className={styles.sortOptions}>
            {sortOptions.map(option => (
              <div 
                key={option.id}
                className={`${styles.sortOption} ${selectedOption === option.label ? styles.sortOptionSelected : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(BookSort); 