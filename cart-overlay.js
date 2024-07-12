document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM LOADED (VSCODE)')
    
  // IMAGES
  const productImages = {
      "XX59 headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp",
      "XX99 Mark II Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp",
      "XX99 Mark I Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp",
      "YX1 Wireless Earphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp",
      "ZX7 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp",
      "ZX9 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp"
  };
    
  // Get the elements
  const cartIcon = document.getElementById('nav-cart-icon');
  const overlay = document.getElementById('cart-overlay');
  const removeAllLink = document.querySelector('.remove-all-link');   
  const overlayCloseBtn = document.getElementById('overlay-close-btn');
  const cartQtyText = document.querySelector('#cart-qty');   
  const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');
  const totalText = document.querySelector('#total');  
  let cartItemsContainer = document.querySelector('.cart-items');
  
  
  
  function toggleNavCartItemsCount() {
    navCartQtyCountElem.style.display = navCartQtyCountElem.textContent === '0' ? 'none' : 'flex';
  }

  // FUNCTIONS
  function toggleOverlayDisplay(event) {
    console.log('toggleOverlayDisplay')
    const buttonWrapper = event.target.closest('[data-toggle="close-cart-overlay"]');
    if (buttonWrapper) {
      const displayStyle = overlay.style.display === 'none' ? 'flex' : 'none';
      overlay.style.display = displayStyle;
      if (overlay.style.display === 'flex') {
        cartDisplayCartItems()
      }
    }
  }

     
  function updateCartItemQty(qty) {
    // console.log('qty:', qty)
    navCartQtyCountElem.textContent = `${qty}`;
    toggleNavCartItemsCount()
  }
    
  function updateCartCountIcon(qty) {
   	
    if (qty === 0) {
      navCartQtyCountElem.textContent = '0';
    } else {
     	console.log('TO UPDATE QTY:', qty)
    }
      toggleNavCartItemsCount()
  }
    
  // Function to get all items in the cart
  function getCartItems() {
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
  }


  function getItemDictionary(cartItems) {
    // console.log('cartItems:', cartItems)
      
    // Create a dictionary to aggregate items by name
    let itemDictionary = {};
          
    // Iterate over cart items to aggregate quantities and calculate subtotals
    cartItems.forEach(item => {
      const price = parseFloat(item.price);            
      let qty = item.quantity !== undefined ? item.quantity : 1
      if (!itemDictionary[item.name]) {
        itemDictionary[item.name] = {
          id: item.id,
          name: item.name,
          cartName: item.cartName,
          price: price,
          quantity: qty,
          subtotal: 0
        };
      } else {
        itemDictionary[item.name].quantity = itemDictionary[item.name].quantity + qty;
      }
          
      itemDictionary[item.name].subtotal += price;
    });
          
    return itemDictionary;
  }

  function getCartItemsQty(cartItems) {
    let cartTotalQty = 0;
    cartItems.forEach(item => {
      cartTotalQty += item.quantity
    })
    return cartTotalQty;
  }

  // Function to display cart items
  function cartDisplayCartItems() {
    console.log('cartDisplayCartItems')

    // let cartItemsContainer = document.querySelector('.cart-items'); 
 
    // Display the totals   
    let cartItems = getCartItems();
    console.log('cartItems:', cartItems)
    // Clear the current content

    // console.log('cartItems.length:', cartItems.length)
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      totalText.textContent = `$ 0`;
      return;
    } else {
      cartItemsContainer.innerHTML = '';
    }
			  
    itemDictionary = getItemDictionary(cartItems)
    // console.log('itemDictionary:', itemDictionary)
    let total = 0;
    let cartTotalQty = 0;
        
    // Iterate over itemDictionary to display each unique item
    for (let key in itemDictionary) {
      if (itemDictionary.hasOwnProperty(key)) {
        let item = itemDictionary[key];
        total += item.price * item.quantity;
        cartTotalQty += item.quantity;
        let imgUrl = productImages[item.name]
        let itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <div class="cart-item">
        		<img class="cart-item-img" src="${imgUrl}">
            <div class="cart-item-text-wrapper">
              <p class="cart-summary-item-heading">${item.cartName}</p>
              <p class="cart-summary-item-price">$ ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>            
            <div class="cart-number-input-wrapper">
             	<p class="cart-number-adjuster is-minus" data-id=${item.id} data-name="${item.name}" data-price=${item.price} data-cartname="${item.cartName}">-</p>
              <p class="cart-input-number">${item.quantity}</p>
              <p class="cart-number-adjuster is-plus" data-id=${item.id} data-name="${item.name}" data-price=${item.price} data-cartname="${item.cartName}">+</p>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(itemElement);
      }
    }

    // UPDATE SUMMARY SECTION
    const cartQty = Object.keys(itemDictionary).length;
    totalText.textContent = `$ ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    cartQtyText.textContent = `(${cartTotalQty})`
    console.log('cartTotalQty:', cartTotalQty)
          
    // UPDATE navCartItemsCount
    if (cartItems.length === 0) {
      navCartQtyCountElem.style.display = 'none';
    } else {
      navCartQtyCountElem.style.display = 'absolute';
      navCartQtyCountElem.textContent = `${cartTotalQty}`;
    }

    updateCartItemQty(cartTotalQty);
    cartSetQtyAdjustmentBtns()

    const cartDeleteBtns = document.querySelectorAll('.cart-bin-icon-wrapper');
    cartDeleteBtns.forEach(deleteBtn => {
      deleteBtn.addEventListener('click', removeItemFromCart);
    });

    const pathname = window.location.pathname;
    const currentPage = pathname.substring(pathname.lastIndexOf('/') + 1);
    if (currentPage === 'checkout') {
      checkoutRemoveCartItems();
    }
  }
  

  function checkoutRemoveCartItems() {

    let checkoutCartItemsContainer = document.querySelector('.checkout-cart-items');
    const checkoutTotalTextElem = document.querySelector('#checkout-total');

    checkoutCartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    checkoutTotalTextElem.textContent = `$ 0`;

    // Display the totals
    const checkoutShippingTextElem = document.querySelector('#shipping');
    const checkoutVatTextElem = document.querySelector('#vat');
    const checkoutGrandTotalTextElem = document.querySelector('#grand-total');

    // UPDATE SUMMARY SECTION
    checkoutTotalTextElem.textContent = `$ 0`;
    checkoutShippingTextElem.textContent = `$ 0`;
    checkoutVatTextElem.textContent = `$ 0`;
    checkoutGrandTotalTextElem.textContent = `$ 0`;
  
    
    const orderConfirmationGoHomeButton = document.getElementById('order-confirmation-home');
    orderConfirmationGoHomeButton.addEventListener('click', function() {
        checkoutOverlayElem.style.display = 'none';  
        clearCart()
    })
  }  



  // QTY CHANGER    
  function cartHandleQtyChangeClick(event) {
   	console.log('cartHandleQtyChangeClick')
    let cartItems = getCartItems();
 		itemDictionary = getItemDictionary(cartItems)
    
		const button = event.target;
    const name = button.dataset.name;    
    
    if (event.target.classList.contains('is-plus')) {
      console.log('increase')
      itemDictionary[name].quantity = parseInt(itemDictionary[name].quantity) + 1
    }
        
    if (event.target.classList.contains('is-minus')) {
      if (itemDictionary[name].quantity === 0) {
       	// Do nothing
      } else {
      	itemDictionary[name].quantity = parseInt(itemDictionary[name].quantity) - 1       
      }
    }
    	
    localStorage.setItem('cart', JSON.stringify(Object.values(itemDictionary)));
    cartDisplayCartItems()
  }

  function cartSetQtyAdjustmentBtns() {
  
    const cartIncreaseBtns = document.querySelectorAll('.cart-number-adjuster.is-plus'); 
    const cartDecreaseBtns = document.querySelectorAll('.cart-number-adjuster.is-minus');

    cartIncreaseBtns.forEach(increaseBtn => {
      increaseBtn.addEventListener('click', cartHandleQtyChangeClick); //cartHandleQtyChangeClick
    });
            
    cartDecreaseBtns.forEach(decreaseBtn => {
      decreaseBtn.addEventListener('click', cartHandleQtyChangeClick); //cartHandleQtyChangeClick
    });
  }

  // CLEAR CART
  function clearCart() {
   	localStorage.removeItem('cart');
     updateCartCountIcon(0);
    cartDisplayCartItems();
    cartQtyText.textContent = ``
  }
  
  
  // CART DELETE BUTTON
  function removeItemFromCart(event) {
    console.log('removeItemFromCart'); // This logs when the function is called
    const button = event.target.closest('.cart-bin-icon-wrapper');
    const itemId = button.dataset.id; // Access the data-id attribute
    console.log('event:', event);
    console.log('button', button);
    console.log('Item ID to remove:', itemId);

    // Your logic to remove the item from the cart using itemId
    let cartItems = getCartItems(); // Assuming you have a function to get the cart items

    console.log('cartItems:')
    console.log(cartItems)

    // Filter out the item with the matching itemId
    cartItems = cartItems.filter(item => item.id !== itemId);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Optionally, refresh the cart display
    cartDisplayCartItems(); // Assuming you have a function to display cart items

    // Update the cart count icon
    const cartTotalQty = getCartItemsQty(cartItems)
    updateCartCountIcon(cartTotalQty)
    cartQtyText.textContent = `(${cartTotalQty})`
  }


  // // EVENT LISTENERS
  cartIcon.addEventListener('click', toggleOverlayDisplay);
  removeAllLink.addEventListener('click', clearCart); 
  overlayCloseBtn.addEventListener('click', toggleOverlayDisplay); 

  // INIT
  cartDisplayCartItems();
  overlay.style.display = 'none'
  
});

