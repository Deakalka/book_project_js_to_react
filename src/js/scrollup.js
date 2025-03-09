const scrollBtn = document.querySelector('.scroll-btn');

const scrollToElement = (element) => {
    window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
};

const checkElem = () => {
    const elem = document.querySelector('.collection-title');
    if (elem) {
        scrollBtn.addEventListener('click', () => {
            scrollToElement(elem);
        });
        /*При "доскролюванні" вверх до елменетну кнопка ховається, при скролі нижче елементу - з'являється*/
        window.addEventListener('scroll', () => {
            let scrolled = window.scrollY || window.pageYOffset;
            if (scrolled > elem.offsetTop) {
                scrollBtn.classList.add('show-scroll-btn');
            } else {
                scrollBtn.classList.remove('show-scroll-btn');
            }
        });
    } else {
        setTimeout(checkElem, 100);
    }
};

checkElem();
