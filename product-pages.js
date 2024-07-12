document.addEventListener('DOMContentLoaded', function() {
	console.log('page loaded!')
    // Function to add an item to the cart
    function addItemToCart(itemToAdd) {
        // Get the current cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

        console.log(cart)
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    function toggleNavCartItemsCount() {
    	const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');
        navCartQtyCountElem.style.display = navCartQtyCountElem.textContent === '0' ? 'none' : 'flex';
    }
    
    function addCartItemsCount() {
        const currentCountElem = document.querySelector('#nav-cart-items-count');
        console.log('currentCountElem.textContent:', currentCountElem.textContent, 'parseInt(currentCountElem.textContent):', parseInt(currentCountElem.textContent)); 
        currentCountElem.textContent = parseInt(currentCountElem.textContent) + 1;
            
        toggleNavCartItemsCount()
    }

    // Attach event listeners to all 'add to cart' buttons
    const addToCartBtn = document.querySelector('#add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        // Get product details from data attributes
        console.log('add to cart')
        let item = {
            id: this.getAttribute('data-id'),
            name: document.querySelector('#product-name').getAttribute('data-name'),
            cartName: document.querySelector('#product-name').getAttribute('data-cart-name'),
            price: parseFloat(document.querySelector('#product-price').getAttribute('data-price')),
            quantity: 1,
            subtotal: parseFloat(document.querySelector('#product-price').getAttribute('data-price'))
        };
        addItemToCart(item);
        alert('Item added to cart');
        addCartItemsCount()            
    });
});

