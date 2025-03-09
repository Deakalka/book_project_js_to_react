import axios from 'axios';



const slistGalleryEl = document.querySelector('.slist-card-section');
const background = document.querySelector('.slist-demo-thumb');


// import { STORAGE_KEY } from "./local-storage"          //ключ
const STORAGE_KEY = "local-storage-books"; 
let booksIDarray = [];


//  закидаємо до ЛС обєкт 
function loadFromLS(key) {
  try {
   
      const data = localStorage.getItem(key);
      const result = JSON.parse(data);
      console.log(result);
      booksIDarray = result.map(item => item.dataId);   
      console.log(booksIDarray);
        return booksIDarray;
  } catch {console.log('error');
    showbackground(); }
         
};
const arrOfId = loadFromLS(STORAGE_KEY);
console.log(booksIDarray);


renderImages(arrOfId);     //рендеримо розмітку

async function renderImages(array) {
   let booksArr = [];
  if (array === null || array.length===0 || !STORAGE_KEY) {
    
      showbackground(); 
      
  } else {
      for (const item of array) {
          
          
          const currentBook = await getbook(item);
        booksArr.push(currentBook);
        const amazonLink = currentBook.buy_links.find(link => link.name === 'Amazon');
        console.log(amazonLink.url);
          // return booksArr;
           
      }
           const markup = imagesTemplate(booksArr);
            slistGalleryEl.innerHTML = markup;
            slistGalleryEl.addEventListener('click', onBtnClick);
    } 
};


import amazon from "../img/amazon.png";
import ibook from "../img/ibook.png";
import whiteAmazon from "../img/white-amazon.png"
  

function imageTemplate({ _id, book_image, title, list_name, description, author, buy_links }) {
 

  let am = buy_links.map(item => item).find(link => link.name === 'Amazon')
 let apple = buy_links.map(item => item).find(link =>link.name === 'Apple Books')
   if (localStorage.getItem('theme') === 'dark') {
    const whiteamazon = whiteAmazon; 
    return `<div class="slist-card-list">
            <li class="slist-card-item">
              <button type="button" data-id=${_id} class="slist-del-btn js-slist-del-btn">
              </button>
              <div class="slist-card-picture">
                <img src="${book_image}" class="slist-book-img" alt="books" />
              </div>
              <div class="slist-info-container">
                <h3 class="slist-book-header">${title}</h3>
                <h4 class="slist-book-category">${list_name}</h4>
                <p class="slist-book-description">${description}</p>
                <h5 class="slist-book-autor">${author}</h5>

                <div class="slist-nav">
                  <ul class="slist-nav-list">
                    <li class="slist-nav-item">
                      <a href="${am.url}" class="slist-nav-link">

                      <img class="img-amazone logo" src="${whiteamazon}" alt="app">
                     </a>

                    </li>

                    <li class="slist-nav-item">
                      <a href="${apple.url}" class="slist-nav-link"><img class="img-app logo" src="${ibook}" alt="app"></a>
                      
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </div>`
  } else {
    return `<div class="slist-card-list">
            <li class="slist-card-item">
              <button type="button" data-id=${_id} class="slist-del-btn js-slist-del-btn">
              </button>
              <div class="slist-card-picture">
                <img src="${book_image}" class="slist-book-img" alt="books" />
              </div>
              <div class="slist-info-container">
                <h3 class="slist-book-header">${title}</h3>
                <h4 class="slist-book-category">${list_name}</h4>
                <p class="slist-book-description">${description}</p>
                <h5 class="slist-book-autor">${author}</h5>

                <div class="slist-nav">
                  <ul class="slist-nav-list">
                    <li class="slist-nav-item">
                      <a href="${am.url}" class="slist-nav-link">

                      <img class="img-amazone logo" src="${amazon}" alt="app">
                     </a>

                    </li>

                    <li class="slist-nav-item">
                      <a href="${apple.url}" class="slist-nav-link"><img class="img-app logo" src="${ibook}" alt="app"></a>
                      
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </div>`
  }
   };

          function imagesTemplate(array) {
  return array.map(imageTemplate).join('');
      
};


function onBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  
  const liElem = e.target.closest('li');
  console.log(liElem);
  const bookId = e.target.dataset.id;
  console.log(bookId);

  liElem.remove();
  

  const jsonString = localStorage.getItem(STORAGE_KEY);
 
  let currentArray = JSON.parse(jsonString);
 
  console.log(currentArray);
     let newArrofLS = currentArray.splice(
      currentArray.findIndex(item => item.dataId === bookId),
      1
       );
        // масив обєктів по ЛС
  console.log(currentArray);
   if (currentArray.length === 0) {
     showbackground(); 
      }
     const updatedJsonString = JSON.stringify(currentArray);
  localStorage.setItem(STORAGE_KEY, updatedJsonString);
   
}


async function getbook(bookId) {
    const BASE_URL = `https://books-backend.p.goit.global/books/${bookId}`;
    
    try {
        const res = await axios.get(BASE_URL);
        return res.data;

   
    } catch (error) {
        console.log('Результатів не знайдено.');
    };

};


function showbackground() {
  background.classList.remove('is-hidden');

};







