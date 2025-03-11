import { useEffect, useState, memo } from 'react';

// Компонент для додавання SVG спрайту до DOM
function SvgSprite() {
  const [spriteContent, setSpriteContent] = useState('');

  useEffect(() => {
    // Динамічно завантажуємо SVG спрайт з папки public
    fetch('/symbol-defs.svg')
      .then(response => response.text())
      .then(data => {
        // Витягуємо вміст <svg> з отриманого файлу
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(data, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        if (svgElement) {
          // Надаємо ID для SVG елемента, щоб уникнути конфліктів
          svgElement.id = 'svg-sprite';
          svgElement.style.display = 'none';
          // Зберігаємо вміст як рядок
          setSpriteContent(svgElement.outerHTML);
        }
      })
      .catch(error => {
        console.error('Помилка завантаження SVG спрайту:', error);
      });
  }, []);

  // Використовуємо dangerouslySetInnerHTML, оскільки нам потрібно вставити SVG код
  return <div dangerouslySetInnerHTML={{ __html: spriteContent }}></div>;
}

export default memo(SvgSprite); 