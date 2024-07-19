document.addEventListener('DOMContentLoaded', function() {
    console.log('cart-quantity-icon.js loaded')

    const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');
    
    function showCartCountIcon() {
        navCartQtyCountElem.style.opacity = 1;
        navCartQtyCountElem.style.transform = 'scale(1)';
    }

    function hideCartCountIcon() {
        navCartQtyCountElem.style.opacity = 0;
        navCartQtyCountElem.style.transform = 'scale(0)';
    }

    function updateCartCountIcon(qty) {
   	
        if (qty === 0) {
          navCartQtyCountElem.textContent = '0';
          hideCartCountIcon();
        } else {
            //  console.log('TO UPDATE QTY:', qty)
             navCartQtyCountElem.textContent = `${qty}`;
        }
    }

    function addCartItemsCount() {
        navCartQtyCountElem.textContent = parseInt(navCartQtyCountElem.textContent) + 1;
    }

    function minusCartItemsCount() {
        navCartQtyCountElem.textContent = parseInt(navCartQtyCountElem.textContent) - 1;
    }

    function init() {
        // console.log('init')
        const cartItems = getCartItems();
        // console.log('getCartItemsQty(cartItems):', getCartItemsQty(cartItems))
        const cartItemsQty = getCartItemsQty(cartItems)
        if (cartItemsQty !== 0) {
            showCartCountIcon()
        } 
        updateCartCountIcon(cartItemsQty);
    }


    init()

    window.showCartCountIcon = showCartCountIcon;
    window.hideCartCountIcon = hideCartCountIcon;
    window.updateCartCountIcon = updateCartCountIcon;
    window.addCartItemsCount = addCartItemsCount;
    window.minusCartItemsCount = minusCartItemsCount;
})