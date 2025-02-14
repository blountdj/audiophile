
// console.log('cart-quantity-icon.js loaded')

import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v9/min/js/config-min.js";
const { getCartItems, getCartItemsQty } = await import(`${CONFIG.path}${CONFIG.jsPath}common${CONFIG.min}.js`);

export function showCartCountIcon() {
    const counterElem = document.querySelector('#nav-cart-items-count');
    counterElem.style.opacity = 1;
    counterElem.style.transform = 'scale(1)';
}

export function hideCartCountIcon() {
    const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');
    navCartQtyCountElem.style.opacity = 0;
    navCartQtyCountElem.style.transform = 'scale(0)';
}

export function updateCartCountIcon(qty) {
    const countElem = document.querySelector('#nav-cart-items-count');

    if (qty === 0) {
        hideCartCountIcon();
        setTimeout(() => {
            countElem.textContent = '0';
        }, 250);
    } else {
        countElem.textContent = `${qty}`;
    }
}

export function addCartItemsCount() {
    // console.log('addCartItemsCount')
    const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');
    navCartQtyCountElem.textContent = parseInt(navCartQtyCountElem.textContent) + 1;
}

export function minusCartItemsCount() {
    const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');
    navCartQtyCountElem.textContent = parseInt(navCartQtyCountElem.textContent) - 1;
}

export function cartQtyIconInit(container = document) {
    const cartItems = getCartItems();
    const cartItemsQty = getCartItemsQty(cartItems)
    if (cartItemsQty !== 0) {
        showCartCountIcon()
    }
    updateCartCountIcon(cartItemsQty);
}
