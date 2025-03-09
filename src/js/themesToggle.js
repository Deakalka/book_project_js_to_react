const checkBox = document.querySelector('#toggle');
const body = document.querySelector('body');
const p = document.querySelectorAll('p');
const h1 = document.querySelectorAll('h1');
const h2 = document.querySelectorAll('h2');
const h3 = document.querySelectorAll('h3');
const h4 = document.querySelectorAll('h4');
const h5 = document.querySelectorAll('h5');
const h6 = document.querySelectorAll('h6');
const a = document.querySelectorAll('a');

// Load the saved theme from localStorage
// if (localStorage.getItem('theme') === 'dark') {
//     body.classList.add('blackTheme');
//     checkBox.checked = true;
//     const elements = [p, h1, h2, h3, h4, h5, h6, a];
//     elements.forEach(nodeList => {
//         nodeList.forEach(el => {
//             el.classList.add('newText');
//         });
//     });
// }

// checkBox.addEventListener('change', function () {
//     const elements = [p, h1, h2, h3, h4, h5, h6, a];

//     elements.forEach(nodeList => {
//         nodeList.forEach(el => {
//             if (this.checked) {
//                 el.classList.add('newText');
//                 body.classList.add('blackTheme');
                // Save the theme to localStorage
            //     localStorage.setItem('theme', 'dark');
            // } else {
            //     el.classList.remove('newText');
            //     body.classList.remove('blackTheme');
                // Save the theme to localStorage
//                 localStorage.setItem('theme', 'light');
//             }
//         });
//     });
// });

