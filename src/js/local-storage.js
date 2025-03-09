// const addBn = document.querySelector('.added');   кнопка додавання картки до локал сторедж

import axios from 'axios';

export const STORAGE_KEY = "local-storage-books";   // назву залишити

// const bookId = "643282b1e85766588626a085";      // ключ -id


// const addBn = document.querySelector('.added');
// console.log(addBn);
// addBn.addEventListener('click', onAddBtnClick);
export async function onAddBtnClick() {

    // Получаем текущий массив объектов из localStorage
    const jsonString = localStorage.getItem(STORAGE_KEY);
    let currentArray = jsonString ? JSON.parse(jsonString) : [];

    
    // додаємо новий обьект в масив
    const newObject = await getbook(bookId);              //тут саме обьєкт
    // перевіряємо  на співпадіння
    if (currentArray.every(item => item._id !== newObject._id)) {
        
        currentArray.push(newObject);
        // масив в строку JSON
        const updatedJsonString = JSON.stringify(currentArray);

        // зберігаємо строку JSON в localStorage під ключем
        localStorage.setItem(STORAGE_KEY, updatedJsonString);

   
    };
}

export async function getbook(bookId) {
    const BASE_URL = `https://books-backend.p.goit.global/books/${bookId}`;
      
    try {
        const res = await axios.get(BASE_URL);
        return res.data;
 
    } catch (error) {
        console.log('Результатів не знайдено.');
    };

};


// onAddBtnClick(STORAGE_KEY);













