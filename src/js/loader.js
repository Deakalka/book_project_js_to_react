const loader = document.querySelector('.loader'); /*селектор*/

export function showLoader() {
    loader.style.display = 'flex';
}

export function hideLoader() {
    loader.style.display = 'none';
}