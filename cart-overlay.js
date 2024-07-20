document.addEventListener('DOMContentLoaded', function() {
  console.log('cart-overlay.js - DOM LOADED (VSCODE)')
    
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
  const goToCheckoutBtn = document.querySelector('#go-to-checkout-btn') 
  const cartSummaryBlock = document.querySelector('#cart-summary-block')

  function goToCheckoutBtnClick() {
    const displayStyle = overlay.style.display === 'none' ? 'flex' : 'none';
    overlay.style.display = displayStyle;
  }

  function toggleOverlayDisplay(event) {
    // console.log('toggleOverlayDisplay')
    const buttonWrapper = event.target.closest('[data-toggle="close-cart-overlay"]');
    if (buttonWrapper) {
      if (overlay.classList.contains('is-closed')) {
        overlay.classList.remove('is-closed');        
        setTimeout(() => {
          cartSummaryBlock.classList.remove('is-closed');
        }, 0);
        overlay.style.display = 'flex'
        cartDisplayCartItems()
      } else {
        overlay.classList.add('is-closed');
        cartSummaryBlock.classList.add('is-closed');
        setTimeout(() => {
          overlay.style.display = 'none'
        }, 200);
        
      }
    }
  }
  
   
  function cartDisplayCartItems(cartItems = null) {

    if (!cartItems) {
      cartItems = getCartItems();
    }

    let total = 0;
    let cartTotalQty = 0;

    // console.log('cartItems.length:', cartItems.length)
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      totalText.textContent = `$ 0`;
      disableCheckoutBtn();
      return;
    } else {
      cartItemsContainer.innerHTML = '';
    }
			  
    itemDictionary = getItemDictionary(cartItems)
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
            <div class="cart-item-block-left">
        		  <img class="cart-item-img" src="${imgUrl}">
              <div class="cart-item-text-wrapper">
                <p class="cart-summary-item-heading">${item.cartName}</p>
                <p class="cart-summary-item-price">$ ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>            
            </div>            
            <div class="cart-item-block-left">
              <div class="cart-number-input-wrapper">
                <p class="cart-number-adjuster is-minus" data-id=${item.id} data-name="${item.name}" data-price=${item.price} data-cartname="${item.cartName}">-</p>
                <p class="cart-input-number">${item.quantity}</p>
                <p class="cart-number-adjuster is-plus" data-id=${item.id} data-name="${item.name}" data-price=${item.price} data-cartname="${item.cartName}">+</p>
              </div>
              <div class="cart-bin-icon-wrapper" data-id=${item.id}>
                <div class="cart-bin-icon">
                  <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.73708 6.54391V18.9857C5.73708 19.7449 6.35257 20.3604 7.11182 20.3604H16.8893C17.6485 20.3604 18.264 19.7449 18.264 18.9857V6.54391M2.90906 6.54391H21.0909" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path> <path d="M8 6V4.41421C8 3.63317 8.63317 3 9.41421 3H14.5858C15.3668 3 16 3.63317 16 4.41421V6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path> </g></svg>
                </div>
              </div>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(itemElement);
      }
    }

    // UPDATE SUMMARY SECTION
    // const cartQty = Object.keys(itemDictionary).length;
    totalText.textContent = `$ ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    cartQtyText.textContent = `(${cartTotalQty})`
   
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
    const checkoutTotalTextElem = document.querySelector('#Total');

    checkoutCartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    checkoutTotalTextElem.textContent = `$ 0`;

    // Display the totals
    const checkoutShippingTextElem = document.querySelector('#Shipping');
    const checkoutVatTextElem = document.querySelector('#VAT');
    const checkoutGrandTotalTextElem = document.querySelector('#Grand-Total');

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

   
  function cartHandleQtyChangeClick(event) {
   	// console.log('cartHandleQtyChangeClick')
    let cartItems = getCartItems();
    let cartItemsQty = getCartItemsQty(cartItems)
 		itemDictionary = getItemDictionary(cartItems)
    
		const button = event.target;
    const name = button.dataset.name;    
    
    if (event.target.classList.contains('is-plus')) {
      itemDictionary[name].quantity = parseInt(itemDictionary[name].quantity) + 1
      localStorage.setItem('cart', JSON.stringify(Object.values(itemDictionary)));
      cartItems = getCartItems();
      cartDisplayCartItems(cartItems)
  
      cartItemsQtyUpdated = cartItemsQty + 1;
      if (cartItemsQtyUpdated === 1) {
        enableCheckoutBtn();
        showCartCountIcon()
        addCartItemsCount() 
      } else {
        applyAnimationClass(navCartQtyCountElem, 'pop-part-1')
        setTimeout(() => {
          addCartItemsCount()  
        }, 250);
      }
    }
        
    if (event.target.classList.contains('is-minus')) {

      if (itemDictionary[name].quantity !== 0) {
      	itemDictionary[name].quantity = parseInt(itemDictionary[name].quantity) - 1   
        localStorage.setItem('cart', JSON.stringify(Object.values(itemDictionary)));
        cartItems = getCartItems();
        cartDisplayCartItems(cartItems)
    
        cartItemsQtyUpdated = cartItemsQty - 1;

        if (cartItemsQtyUpdated === 0) {
          disableCheckoutBtn();
          applyAnimationClass(navCartQtyCountElem, 'pop-to-nothing')
          setTimeout(() => {
            updateCartCountIcon(0);
        }, 400);
        } else {
          applyAnimationClass(navCartQtyCountElem, 'pop-part-1')
          setTimeout(() => {
            minusCartItemsCount()  
          }, 250);
        }  
      }
    }
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

  function clearCart() {
   	localStorage.removeItem('cart');
    applyAnimationClass(navCartQtyCountElem, 'pop-to-nothing')
    setTimeout(() => {
      updateCartCountIcon(0);
  }, 400);
    cartDisplayCartItems();
    cartQtyText.textContent = ``;
    disableCheckoutBtn()
  }
  

  // CART DELETE BUTTONS
  function removeItemFromCart(event) {
    const button = event.target.closest('.cart-bin-icon-wrapper');
    const itemId = button.dataset.id; // Access the data-id attribute

    const itemToDelete = event.target.closest('.cart-item'); 
    itemToDelete.classList.add('to-delete');

    // // Your logic to remove the item from the cart using itemId
    let cartItems = getCartItems(); 
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    const cartTotalQty = getCartItemsQty(cartItems)
    if (cartTotalQty === 0) {
      updateCartCountIcon(cartTotalQty)
    } else {
      applyAnimationClass(navCartQtyCountElem, 'pop-part-1')
      setTimeout(() => {
        updateCartCountIcon(cartTotalQty)
      }, 250);
      
    }
    

    setTimeout(() => {
      cartDisplayCartItems(cartItems); 
      cartQtyText.textContent = `(${cartTotalQty})`
      // Update the cart count icon

    }, 500);

  }

  function init() {
    cartIcon.addEventListener('click', toggleOverlayDisplay);
    removeAllLink.addEventListener('click', clearCart); 
    overlayCloseBtn.addEventListener('click', toggleOverlayDisplay); 
    goToCheckoutBtn.addEventListener('click', goToCheckoutBtnClick);

    cartDisplayCartItems();
    overlay.style.display = 'none'
  }

  init()
  
});
