import save from "/img/save.png";
import hope from "/img/hope.png";
import united from "/img/united.png";
import medical from "/img/medical.png";
import medicins from "/img/medicins.png";
import razom from "/img/razom.png";
import action from "/img/action.png";
import world from "/img/world.png";
import prytula from "/img/prytula.png";
const funds = [
  {
     title: 'Save the Children',
     url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
     img: save,
     img2x: save,
  },
  {
     title: 'Project HOPE',
     url: 'https://www.projecthope.org/country/ukraine/',
     img: hope,
     img2x: hope,
  },
  {
     title: 'UNITED24',
     url: 'https://u24.gov.ua/uk',
     img: united,
     img2x: united,
  },
  {
     title: 'International Medical Corps',
     url: 'https://internationalmedicalcorps.org/country/ukraine/',
     img: medical,
     img2x: medical,
  },
  {
     title: 'Medicins Sans Frontieres',
     url: 'https://www.msf.org/ukraine',
     img: medicins,
     img2x: medicins,
  },
  {
     title: 'RAZOM',
     url: 'https://www.razomforukraine.org/',
     img: razom,
     img2x: razom,
  },
  {
     title: 'Action against hunger',
     url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
     img: action,
     img2x: action,
  },
  {
     title: 'World vision',
     url: 'https://www.wvi.org/emergencies/ukraine',
     img: world,
     img2x: world,
  },
  {
     title: 'Serhiy Prytula Charity Foundation',
     url: 'https://prytulafoundation.org/en',
     img: prytula,
     img2x: prytula,
  },
]
import { markupCardFund } from './support-export/markup-support';
import Swiper from 'swiper';

const supportList = document.querySelector('.support-list');
const supportBtn = document.querySelector('.support-button');

let position = 0;
let isLastSlide = false;

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const markupSetFunds = funds
  .map((el, i) => {
    position = addLeadingZero(i + 1);
    return markupCardFund(el, position);
  })
  .join('');

supportList.innerHTML = markupSetFunds;

const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  spaceBetween: 20,
  slidesPerView: 'auto',
  rewind: true,
  speed: 500,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.support-button',
  },
});

const supportBtnClickHandler = () => {
  const lastIndex = swiper.slides.length - 1;
  const screenWidthMobile = window.innerWidth < 768;

  if (screenWidthMobile) {
    swiper.slideNext();
  } else {
    swiper.slideTo(isLastSlide ? 0 : lastIndex);
    isLastSlide = !isLastSlide;
  }
};

supportBtn.addEventListener('click', supportBtnClickHandler);


document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.querySelector('.sidebar');

    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) { 
        sidebar.classList.add('scrolled');
      } else {
        sidebar.classList.remove('scrolled');
      }
    });
  });

  const SBLink = document.querySelector('.sidebar-categories-link');
  const SBLinkList = document.querySelector('.sidebar-categories-list');
  const SBlinks = document.querySelectorAll('.sidebar-categories-link');
  SBLinkList.addEventListener('click', (event) => {
    const clickedCategory = event.target.closest('.sidebar-categories-link');
    SBlinks.forEach(elment => {
      elment.classList.remove('active-link-her');
    })
    if (clickedCategory) {
      clickedCategory.classList.add('active-link-her');
    }
  });
