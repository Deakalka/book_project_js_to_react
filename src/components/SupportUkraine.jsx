import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

// Import support logos
import saveTheChildren from '../img/save.png';
import projectHope from '../img/hope.png';
import united24 from '../img/united.png';
import medicalCorps from '../img/medical.png';
import medicinsSans from '../img/medicins.png';
import razom from '../img/razom.png';
import action from '../img/action.png';
import worldVision from '../img/world.png';
import prytula from '../img/prytula.png';

const supportFunds = [
  { id: 1, title: 'Save the Children', url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis', img: saveTheChildren },
  { id: 2, title: 'Project HOPE', url: 'https://www.projecthope.org/country/ukraine/', img: projectHope },
  { id: 3, title: 'UNITED24', url: 'https://u24.gov.ua/uk', img: united24 },
  { id: 4, title: 'International Medical Corps', url: 'https://internationalmedicalcorps.org/country/ukraine/', img: medicalCorps },
  { id: 5, title: 'Medicins Sans Frontieres', url: 'https://www.msf.org/ukraine', img: medicinsSans },
  { id: 6, title: 'RAZOM', url: 'https://www.razomforukraine.org/', img: razom },
  { id: 7, title: 'Action against hunger', url: 'https://www.actionagainsthunger.org/location/europe/ukraine/', img: action },
  { id: 8, title: 'World vision', url: 'https://www.wvi.org/emergencies/ukraine', img: worldVision },
  { id: 9, title: 'Serhiy Prytula Charity Foundation', url: 'https://prytulafoundation.org/en', img: prytula },
];

function SupportUkraine() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const scrollButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Встановлюємо напрямок прокрутки залежно від поточної позиції
  useEffect(() => {
    if (!swiperInstance) return;

    if (activeIndex >= supportFunds.length - (isMobile ? 4 : 6)) {
      setIsScrollDown(false);
    } else if (activeIndex <= 0) {
      setIsScrollDown(true);
    }
  }, [activeIndex, swiperInstance, isMobile]);

  // Додаємо анімацію при наведенні на кнопку
  useEffect(() => {
    const button = scrollButtonRef.current;
    if (!button) return;

    const addAnimation = () => {
      if (isScrollDown) {
        button.classList.add('pulse-down');
        button.classList.remove('pulse-up');
      } else {
        button.classList.add('pulse-up');
        button.classList.remove('pulse-down');
      }
    };

    const removeAnimation = () => {
      button.classList.remove('pulse-down', 'pulse-up');
    };

    button.addEventListener('mouseenter', addAnimation);
    button.addEventListener('mouseleave', removeAnimation);

    return () => {
      button.removeEventListener('mouseenter', addAnimation);
      button.removeEventListener('mouseleave', removeAnimation);
    };
  }, [isScrollDown]);

  const handleButtonClick = () => {
    if (!swiperInstance) return;

    if (isScrollDown) {
      // Прокрутка вниз
      const newIndex = Math.min(activeIndex + 3, supportFunds.length - 1);
      swiperInstance.slideTo(newIndex);
      setActiveIndex(newIndex);
    } else {
      // Прокрутка вгору
      const newIndex = Math.max(0, activeIndex - 3);
      swiperInstance.slideTo(newIndex);
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="block">
      <div className="block-title-wrapper">
        <h2 className="block-title">Support Ukraine</h2>
        <svg className="support-title-icon" width="20" height="32">
          <use href="./img/symbol-defs.svg#symbol"></use>
        </svg>
      </div>
      
      <div className="swiper-container">
        <Swiper
          direction="vertical"
          slidesPerView={isMobile ? 4 : 6}
          spaceBetween={20}
          className="support-list swiper-wrapper"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {supportFunds.map((fund, index) => (
            <SwiperSlide key={fund.id}>
              <div className="support-item swiper-slide">
                <a 
                  href={fund.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="support-link"
                  aria-label={`Support ${fund.title}`}
                >
                  <span className="support-number">{(index + 1).toString().padStart(2, '0')}</span>
                  <img 
                    src={fund.img} 
                    alt={fund.title} 
                    className="support-img" 
                    loading="lazy"
                  />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <button 
        ref={scrollButtonRef}
        type="button" 
        className={`support-button ${isScrollDown ? '' : 'rotate'}`}
        onClick={handleButtonClick}
        aria-label={isScrollDown ? "Scroll down" : "Scroll up"}
      >
        <svg className="support-icon" width="20" height="20">
          <use href="./img/symbol-defs.svg#arrow"></use>
        </svg>
      </button>
    </div>
  );
}

export default SupportUkraine; 