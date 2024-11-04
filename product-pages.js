
import { showCartCountIcon, addCartItemsCount } from './cart-quantity-icon.js'
import { enableCheckoutBtn } from './common.js'

function addItemToCart(itemToAdd) {

    let cart = getCartItems()
    let itemExists = false;

    // Iterate over the cart to find the item by its ID
    cart.forEach(cartItem => {
        if (cartItem.id === itemToAdd.id) {
            // If item exists, increase its quantity and update the subtotal
            cartItem.quantity += 1;
            cartItem.subtotal = cartItem.subtotal + itemToAdd.price;
            itemExists = true;
        }
    });

    // If the item doesn't exist, add it to the cart
    if (!itemExists) {
        cart.push({
            id: itemToAdd.id,
            name: itemToAdd.name,
            cartName: itemToAdd.cartName,
            price: itemToAdd.price,
            quantity: 1,
            subtotal: itemToAdd.price
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}


export const initProductPage = (container) => {
    console.log('initProductPage')

    const addToCartBtn = container.querySelector('#add-to-cart');

    // Attach event listeners to all 'add to cart' buttons
    addToCartBtn.addEventListener('click', function() {
        console.log('addToCartBtn - click')
        // Get product details from data attributes
        // console.log('add to cart - with Jiggle')
        let item = {
            id: this.getAttribute('data-id'),
            name: container.querySelector('#product-name').getAttribute('data-name'),
            cartName: container.querySelector('#product-name').getAttribute('data-cart-name'),
            price: parseFloat(container.querySelector('#product-price').getAttribute('data-price')),
            quantity: 1,
            subtotal: parseFloat(container.querySelector('#product-price').getAttribute('data-price'))
        };
        addItemToCart(item);
        
        const navCartIconsCount = document.querySelector('#nav-cart-items-count');
        if (navCartIconsCount.innerHTML === '0') {
            addCartItemsCount();
            showCartCountIcon();
            enableCheckoutBtn();
        } else {
            applyAnimationClass(navCartIconsCount, 'pop-part-1')
            setTimeout(() => {
                addCartItemsCount()  
            }, 250);
        }
    });
}

// initProductPage()
