
// console.log('cart-quantity-icon.js loaded')

// const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');

import { getCartItems, getCartItemsQty } from './common.js';

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
        //  console.log('TO UPDATE QTY:', qty)
        countElem.textContent = `${qty}`;
    }
}

export function addCartItemsCount() {
    console.log('addCartItemsCount')
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


// document.addEventListener('DOMContentLoaded', function() {
//     cartQtyIconInit()

//     window.showCartCountIcon = showCartCountIcon;
//     window.hideCartCountIcon = hideCartCountIcon;
//     window.updateCartCountIcon = updateCartCountIcon;
//     window.addCartItemsCount = addCartItemsCount;
//     window.minusCartItemsCount = minusCartItemsCount;
// });

