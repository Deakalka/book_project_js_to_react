import axios from 'axios';
import iziToast from 'izitoast';
import { showLoader } from './loader';
import { hideLoader } from './loader';
const bestBooksGallery = document.querySelector('.best-books-gallery');

const apiInstance = axios.create({
  baseURL: 'https://books-backend.p.goit.global/books',
});
async function getBestsellersBooks() {
  try {
    showLoader();
    const result = await apiInstance.get('/top-books');
    hideLoader();
    return result.data;
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Sorry, no books were found. Please try again.',
    });
  }
}
getBestsellersBooks();

function createCategoryBooksMarkup({ list_name, books }) {
  return `
    <li class="book-category-item">
      <p class="book-category">${list_name}</p>
      <ul class="top-books">
        ${books
          .map(book => {
            return `
              <li class="book-card" data-id="${book._id}">
              <div class="book-card-hover">
                <img class="book-cover" src="${book.book_image}" alt="${book.title}"/>
                <div class="view-more">
                <p class="view-more-text">quick view</p>
                </div>
                </div>
                <div class="book-descr">
                <h2 class="book-name">${book.title}</h2>
                <h3 class="book-author">${book.author}</h3>
                </div>
              </li>
            `;
          })
          .join('')}
      </ul>
      <button class="book-card-btn" type="button" data-category="${list_name}">see more</button>
    </li>
  `;
}

async function renderBooksCategory() {
  const topBooks = await getBestsellersBooks();
  let booksCategories = '';
  for (let category of topBooks) {
    booksCategories += createCategoryBooksMarkup(category);
  }
  const categoriesList = `<ul class="top-books-all">${booksCategories}</ul>`;
  const booksHomePage = ` <h1 class="collection-title">Best Sellers <span>Books</span></h1>${categoriesList}`;
  bestBooksGallery.innerHTML = booksHomePage;
}
renderBooksCategory();

