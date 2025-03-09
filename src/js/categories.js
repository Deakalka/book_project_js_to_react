import axios from 'axios';


const bookCardBtn = document.querySelectorAll('.book-card-btn');
const booksContainer = document.querySelector('.best-books-gallery');
// const chooseButton = document.querySelector('.buttonChoose');

const categoryLinks = document.querySelectorAll('.sidebar-categories-link');

categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.textContent.trim();
        loadAndRenderBooks(category);
        
    });
});

async function loadAndRenderBooks(category) {
    try {
        const books = await loadBooks(category);
        renderBooks(books, category);
    } catch (error) {
        console.error('Error loading books:', error);
    }
}


booksContainer.addEventListener('click', onSeeMoreBtnClick);

function onSeeMoreBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const target = e.target;
  try {
    if (target.matches('button[data-category]')) {
      const category = target.dataset.category;

      loadBooks(category)
        .then(result => {
          renderBooks(result, category);
        })
        .catch(err => {});
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadBooks(category) {
    try{
        
        const response = await axios.get(`https://books-backend.p.goit.global/books/category?category=${category}`);
        return response.data;
        
    }
    catch(error){
        console.log(error);
        return;
    }
}

function booksMarkup({_id, book_image, title, author}){
    return `
    <li class="book-card-category" data-id="${_id}">
      <div class="book-thumb">
        <img class="book-cover-cat" src="${book_image}" alt="${title}"/>
        <div class="view-more view-more-cat">
        <p class="view-more-text">quick view</p>
        </div>
        </div>
        <div class="book-descr">
        <h2 class="book-namne-cat">${title}</h2>
        <h3 class="book-author">${author}</h3>
        </div>
      </li>`;
}

function renderBooks(books, category){
    const markup = books.map(booksMarkup).join('');
    const categoriesList = `<ul class="category-books-cat">${markup}</ul>`;
    const booksCategory = `<h2 class="collection-title">${removeLastWord(category)} <span>${LastWord(category)}</span></h2> ${categoriesList}`;
    // console.log(markup);
    const booksContainer = document.querySelector('.best-books-gallery');
    booksContainer.innerHTML = booksCategory;
}

function removeLastWord(category) {
    let words = category.split(' ');
    words.pop();
    let result = words.join(' ');
    return result;
  }
  
  function LastWord(category) {
      let words = category.trim().split(" "); 
      return words[words.length - 1];
  }
