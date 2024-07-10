document.addEventListener('DOMContentLoaded', function() {
    const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');
    navCartQtyCountElem.style.display = navCartQtyCountElem.textContent === '0' ? 'none' : 'flex';
});
