
// console.log('cart-quantity-icon.js loaded')

import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v4/min/js/config-min.js";
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
    // console.log('updateCartCountIcon')
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
    // console.log('cartQtyIconInit')
    const cartItems = getCartItems();
    const cartItemsQty = getCartItemsQty(cartItems)
    // console.log('cartItemsQty:', cartItemsQty)
    if (cartItemsQty !== 0) {
        showCartCountIcon()
    }
    updateCartCountIcon(cartItemsQty);
}
