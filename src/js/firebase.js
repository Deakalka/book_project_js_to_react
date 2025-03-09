const signUpBtn = document.querySelector('.signup-btn');
const fireBase = document.querySelector('.form-container');
const closeBtn = document.querySelector('.close-btn');
signUpBtn.addEventListener('click', () => {
    fireBase.classList.add('visible')
});
closeBtn.addEventListener('click', () => {
    fireBase.classList.remove('visible')
})