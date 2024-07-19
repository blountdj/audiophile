document.addEventListener('DOMContentLoaded', function() {
	// console.log('page loaded!')

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
    

    // Attach event listeners to all 'add to cart' buttons
    const addToCartBtn = document.querySelector('#add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        // Get product details from data attributes
        // console.log('add to cart - with Jiggle')
        let item = {
            id: this.getAttribute('data-id'),
            name: document.querySelector('#product-name').getAttribute('data-name'),
            cartName: document.querySelector('#product-name').getAttribute('data-cart-name'),
            price: parseFloat(document.querySelector('#product-price').getAttribute('data-price')),
            quantity: 1,
            subtotal: parseFloat(document.querySelector('#product-price').getAttribute('data-price'))
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

});
