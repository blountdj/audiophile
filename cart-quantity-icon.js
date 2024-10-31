
console.log('cart-quantity-icon.js loaded')

const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');

function showCartCountIcon(container) {
    const counterElem = container.querySelector('#nav-cart-items-count');
    counterElem.style.opacity = 1;
    counterElem.style.transform = 'scale(1)';
}

function hideCartCountIcon() {
    navCartQtyCountElem.style.opacity = 0;
    navCartQtyCountElem.style.transform = 'scale(0)';
}

function updateCartCountIcon(container, qty) {
    const countElem = container.querySelector('#nav-cart-items-count');

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

function addCartItemsCount() {
    navCartQtyCountElem.textContent = parseInt(navCartQtyCountElem.textContent) + 1;
}

function minusCartItemsCount() {
    navCartQtyCountElem.textContent = parseInt(navCartQtyCountElem.textContent) - 1;
}

export function cartQtyIconInit(container = document) {
    console.log('cartQtyIconInit')
    const cartItems = getCartItems();
    const cartItemsQty = getCartItemsQty(cartItems)
    console.log('cartItemsQty:', cartItemsQty)
    if (cartItemsQty !== 0) {
        showCartCountIcon(container)
    } 
    updateCartCountIcon(container, cartItemsQty);
}


document.addEventListener('DOMContentLoaded', function() {
    cartQtyIconInit()

    window.showCartCountIcon = showCartCountIcon;
    window.hideCartCountIcon = hideCartCountIcon;
    window.updateCartCountIcon = updateCartCountIcon;
    window.addCartItemsCount = addCartItemsCount;
    window.minusCartItemsCount = minusCartItemsCount;
});

