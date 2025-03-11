import { memo } from 'react';

/**
 * Компонент для відображення SVG іконок з єдиного спрайту
 * @param {string} icon - ідентифікатор іконки (без символу "#")
 * @param {number} width - ширина іконки
 * @param {number} height - висота іконки
 * @param {string} className - додатковий CSS клас
 */
function SvgIcon({ icon, width = 24, height = 24, className = '' }) {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`#${icon}`}></use>
    </svg>
  );
}

export default memo(SvgIcon); 