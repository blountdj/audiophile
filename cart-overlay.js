// document.addEventListener('DOMContentLoaded', function() {
//   console.log('cart-overlay.js - DOM LOADED (VSCODE)')

import { disableCheckoutBtn } from "./common.js";
import { enableCheckoutBtn } from "./common.js";
import { addCartItemsCount, minusCartItemsCount } from "./cart-quantity-icon.js";
import { updateCartCountIcon } from "./cart-quantity-icon.js";

  // IMAGES
  const productImages = {
      "XX59 headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp",
      "XX99 Mark II Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp",
      "XX99 Mark I Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp",
      "YX1 Wireless Earphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp",
      "ZX7 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp",
      "ZX9 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp"
  };
    
  function goToCheckoutBtnClick(container) {
    const overlay = container.querySelector('#cart-overlay');
    const displayStyle = overlay.style.display === 'none' ? 'flex' : 'none';
    overlay.style.display = displayStyle;
  }

  function toggleOverlayDisplay(event, container) {
    console.log('toggleOverlayDisplay')

    const overlay = document.querySelector('#cart-overlay');
    const cartSummaryBlock = document.querySelector('#cart-summary-block')

    const buttonWrapper = event.target.closest('[data-toggle="close-cart-overlay"]');
    if (buttonWrapper) {
      if (overlay.classList.contains('is-closed')) {
        overlay.classList.remove('is-closed');        
        setTimeout(() => {
          cartSummaryBlock.classList.remove('is-closed');
        }, 0);
        overlay.style.display = 'flex'
        cartDisplayCartItems(container)
      } else {
        overlay.classList.add('is-closed');
        cartSummaryBlock.classList.add('is-closed');
        setTimeout(() => {
          overlay.style.display = 'none'
        }, 200);
        
      }
    }
  }
  
   
  function cartDisplayCartItems(container, cartItems = null) {

    if (!cartItems) {
      cartItems = getCartItems();
    }

    let total = 0;
    let cartTotalQty = 0;
    let cartItemsContainer = document.querySelector('.cart-items');
    const cartQtyText = document.querySelector('#cart-qty');  
    const totalText = document.querySelector('#total');  

    // console.log('cartItems.length:', cartItems.length)
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      totalText.textContent = `$ 0`;
      disableCheckoutBtn(container);
      return;
    } else {
      cartItemsContainer.innerHTML = '';
    }
			  
    const itemDictionary = getItemDictionary(cartItems)
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
      deleteBtn.addEventListener('click', (e) => removeItemFromCart(e, container));
    });

    const pathname = window.location.pathname;
    const currentPage = pathname.substring(pathname.lastIndexOf('/') + 1);
    if (currentPage === 'checkout') {
      checkoutRemoveCartItems(container);
    }
  }
  
  function checkoutRemoveCartItems(container) {

    
    let checkoutCartItemsContainer = container.querySelector('.checkout-cart-items');
    const checkoutTotalTextElem = container.querySelector('#Total');

    checkoutCartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    checkoutTotalTextElem.textContent = `$ 0`;

    // Display the totals
    const checkoutShippingTextElem = container.querySelector('#Shipping');
    const checkoutVatTextElem = container.querySelector('#VAT');
    const checkoutGrandTotalTextElem = container.querySelector('#Grand-Total');

    // UPDATE SUMMARY SECTION
    checkoutTotalTextElem.textContent = `$ 0`;
    checkoutShippingTextElem.textContent = `$ 0`;
    checkoutVatTextElem.textContent = `$ 0`;
    checkoutGrandTotalTextElem.textContent = `$ 0`;
  
    const orderConfirmationGoHomeButton = container.querySelector('#order-confirmation-home');
    orderConfirmationGoHomeButton.addEventListener('click', function() {
        checkoutOverlayElem.style.display = 'none';  
        clearCart(container)
    })
  }  

   
  function cartHandleQtyChangeClick(event, container) {
   	// console.log('cartHandleQtyChangeClick')
    let cartItems = getCartItems();
    let cartItemsQty = getCartItemsQty(cartItems)
 		const itemDictionary = getItemDictionary(cartItems)
    navCartQtyCountElem
		const button = event.target;
    const name = button.dataset.name;    
    const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');
    if (event.target.classList.contains('is-plus')) {
      itemDictionary[name].quantity = parseInt(itemDictionary[name].quantity) + 1
      localStorage.setItem('cart', JSON.stringify(Object.values(itemDictionary)));
      cartItems = getCartItems();
      cartDisplayCartItems(container, cartItems)
  
      cartItemsQtyUpdated = cartItemsQty + 1;
      if (cartItemsQtyUpdated === 1) {
        enableCheckoutBtn(container);
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
        cartDisplayCartItems(container, cartItems)
    
        cartItemsQtyUpdated = cartItemsQty - 1;

        if (cartItemsQtyUpdated === 0) {
          disableCheckoutBtn(container);
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

  function clearCart(container) {
   	localStorage.removeItem('cart');
    const navCartQtyCountElem = container.querySelector('#nav-cart-items-count');
    const cartQtyText = container.querySelector('#cart-qty');  
    
    applyAnimationClass(navCartQtyCountElem, 'pop-to-nothing')
    setTimeout(() => {
      updateCartCountIcon(0);
    }, 400);
    cartDisplayCartItems(container);
    cartQtyText.textContent = ``;
    disableCheckoutBtn(container)
  }
  

  // CART DELETE BUTTONS
  function removeItemFromCart(event, container) {
    const button = event.target.closest('.cart-bin-icon-wrapper');
    const itemId = button.dataset.id; // Access the data-id attribute
    const navCartQtyCountElem = container.querySelector('#nav-cart-items-count');
    const itemToDelete = event.target.closest('.cart-item'); 
    const cartQtyText = document.querySelector('#cart-qty');  
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
      cartDisplayCartItems(container, cartItems); 
      cartQtyText.textContent = `(${cartTotalQty})`
      // Update the cart count icon

    }, 500);

  }

  export function cartOverlayInit(container) {
    console.log('cartOverlayInit')

    const cartIcon = container.querySelector('#nav-cart-icon');
    const overlay = container.querySelector('#cart-overlay');
    const removeAllLink = document.querySelector('.remove-all-link');   
    console.log('removeAllLink:', removeAllLink)
    const overlayCloseBtn = container.querySelector('#overlay-close-btn');
     
    const goToCheckoutBtn = container.querySelector('#go-to-checkout-btn') 
    

    cartIcon.addEventListener('click', (e) => toggleOverlayDisplay(e, container));
    removeAllLink.addEventListener('click', (e) => clearCart(container)); 
    // overlayCloseBtn.addEventListener('click', (e) => toggleOverlayDisplay(e, container)); 
    // goToCheckoutBtn.addEventListener('click', goToCheckoutBtnClick);

    // cartDisplayCartItems(container);
    // overlay.style.display = 'none'
  }


