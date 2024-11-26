
import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v3/min/js/config-min.js";

const {
  enableCheckoutBtn,
  disableCheckoutBtn,
  getCartItems,
  getItemDictionary,
  applyAnimationClass,
  getCartItemsQty
} = await import(`${CONFIG.path}${CONFIG.jsPath}common${CONFIG.min}.js`);
const {
  addCartItemsCount,
  minusCartItemsCount,
  updateCartCountIcon
} = await import(`${CONFIG.path}${CONFIG.jsPath}cart-quantity-icon${CONFIG.min}.js`);
const { checkoutDisplayCartItems } = await import(`${CONFIG.path}${CONFIG.jsPath}checkout${CONFIG.min}.js`);

// IMAGES
const productImages = {
  "XX59 headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp",
  "XX99 Mark II Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp",
  "XX99 Mark I Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp",
  "YX1 Wireless Earphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp",
  "ZX7 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp",
  "ZX9 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp"
};

function goToCheckoutBtnClick(e, elems) {
  // console.log('goToCheckoutBtnClick')

  let overlay = elems.overlay ? elems.overlay : document.querySelector('#cart-overlay')
  const displayStyle = overlay.style.display === 'none' ? 'flex' : 'none';
  overlay.style.display = displayStyle;
}

function toggleOverlayDisplay(event, elems) {
  // console.log('toggleOverlayDisplay')

  const buttonWrapper = event.target.closest('[data-toggle="close-cart-overlay"]');

  let overlay = elems.overlay ? elems.overlay : document.querySelector('#cart-overlay')

  if (buttonWrapper) {
    // console.log('if')
    if (overlay.classList.contains('is-closed')) {
      // Open overlay
      overlay.classList.remove('is-closed');
      setTimeout(() => {
        elems.cartSummaryBlock.classList.remove('is-closed');
      }, 10);
      overlay.style.display = 'flex'
      cartDisplayCartItems(elems)

      // Add global click listener to close overlay when clicking outside
      document.addEventListener('click', handleOutsideClick);
    } else {
      // Close overlay
      overlay.classList.add('is-closed');
      elems.cartSummaryBlock.classList.add('is-closed');
      setTimeout(() => {
        elems.overlay.style.display = 'none'
      }, 200);

      // Remove global click listener
      document.removeEventListener('click', handleOutsideClick);
    }
  } else {
    overlay.classList.add('is-closed');
    elems.cartSummaryBlock.classList.add('is-closed');
    setTimeout(() => {
      elems.overlay.style.display = 'none'
    }, 200);

    // Remove global click listener
    document.removeEventListener('click', handleOutsideClick);
  }

  // Helper function to handle clicks outside the cart summary block
  function handleOutsideClick(e) {
    // console.log('handleOutsideClick')

    const cartSummaryBlock = document.querySelector('.cart-summary-block');
    const isClickInsideCartSummary = cartSummaryBlock.contains(e.target);
    const isClickOnToggleButton = e.target.closest('[data-toggle="close-cart-overlay"]');

    if (!isClickInsideCartSummary && !isClickOnToggleButton) {
      toggleOverlayDisplay(e, elems);
    }
  }
}

function cartDisplayCartItems(elems, cartItems = null) {

  // console.log('cartDisplayCartItems')
  // VARS
  let total = 0;
  let cartTotalQty = 0;

  let cartItemsContainer = elems.cartItemsContainer ? elems.cartItemsContainer : document.querySelector('.cart-items')
  let totalText = elems.totalText ? elems.totalText : document.querySelector('p#total')

  if (!cartItems) {
    cartItems = getCartItems();
  }

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalText.textContent = `$ 0`;
    disableCheckoutBtn();
    return;
  } else {
    cartItemsContainer.innerHTML = '';
  }

  const itemDictionary = getItemDictionary(cartItems)
  // console.log('itemDictionary:', itemDictionary)
  for (let key in itemDictionary) {
    // console.log('-key:', key)
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
  totalText.textContent = `$ ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  elems.cartQtyText.textContent = `(${cartTotalQty})`

  cartSetQtyAdjustmentBtns(elems)

  const cartContainer = document.querySelectorAll('.cart-bin-icon-wrapper'); // replace with actual parent container

  cartContainer.forEach(container => {
    container.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.cart-bin-icon');
      if (deleteBtn) {
        removeItemFromCart(e, elems);
      }
    });
  });

  // const pathname = window.location.pathname;
  // const currentPage = pathname.substring(pathname.lastIndexOf('/') + 1);
  // if (currentPage === 'checkout') {
  //   checkoutRemoveCartItems(elems);
  // }
}

function checkoutRemoveCartItems(elems) {
  // console.log('checkoutRemoveCartItems')

  // const checkoutTotalTextElem = container.querySelector('#Total');

  elems.checkoutCartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  // elems.checkoutTotalTextElem.textContent = `$ 0`;

  // Display the totals
  // const checkoutShippingTextElem = container.querySelector('#Shipping');
  // const checkoutVatTextElem = container.querySelector('#VAT');
  // const checkoutGrandTotalTextElem = container.querySelector('#Grand-Total');

  // UPDATE SUMMARY SECTION
  // elems.checkoutTotalTextElem.textContent = `$ 0`;
  elems.totalText.textContent = `$ 0`;
  elems.checkoutShippingTextElem.textContent = `$ 0`;
  elems.checkoutVatTextElem.textContent = `$ 0`;
  elems.checkoutGrandTotalTextElem.textContent = `$ 0`;

  elems.orderConfirmationGoHomeButton.addEventListener('click', function () {
    elems.checkoutOverlayElem.style.display = 'none';
    clearCart(elems)
  })
}

function cartHandleQtyChangeClick(event, elems) {
  // console.log('cartHandleQtyChangeClick')
  let cartItems = getCartItems();
  let cartItemsQty = getCartItemsQty(cartItems)
  const itemDictionary = getItemDictionary(cartItems)
  const button = event.target;
  const name = button.dataset.name;
  let cartItemsQtyUpdated

  if (event.target.classList.contains('is-plus')) {
    itemDictionary[name].quantity = parseInt(itemDictionary[name].quantity) + 1
    itemDictionary[name].subtotal = parseInt(itemDictionary[name].subtotal) * (parseInt(itemDictionary[name].quantity) + 1)
    localStorage.setItem('cart', JSON.stringify(Object.values(itemDictionary)));
    cartItems = getCartItems();
    cartDisplayCartItems(elems, cartItems)

    cartItemsQtyUpdated = cartItemsQty + 1;
    if (cartItemsQtyUpdated === 1) {
      enableCheckoutBtn(elems);
      showCartCountIcon()
      addCartItemsCount()
    } else {
      applyAnimationClass(elems.navCartQtyCountElem, 'pop-part-1')
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
      cartDisplayCartItems(elems, cartItems)

      cartItemsQtyUpdated = cartItemsQty - 1;

      if (cartItemsQtyUpdated === 0) {
        disableCheckoutBtn();
        applyAnimationClass(elems.navCartQtyCountElem, 'pop-to-nothing')
        setTimeout(() => {
          updateCartCountIcon(0);
        }, 400);
      } else {
        applyAnimationClass(elems.navCartQtyCountElem, 'pop-part-1')
        setTimeout(() => {
          minusCartItemsCount()
        }, 250);
      }
    }
  }

  updateCheckoutPage(elems)
}

function cartSetQtyAdjustmentBtns(elems) {
  // console.log('cartSetQtyAdjustmentBtns')

  const cartIncreaseBtns = document.querySelectorAll('.cart-number-adjuster.is-plus');
  const cartDecreaseBtns = document.querySelectorAll('.cart-number-adjuster.is-minus');

  cartIncreaseBtns.forEach(increaseBtn => {
    increaseBtn.addEventListener('click', (e) => cartHandleQtyChangeClick(e, elems));
  });

  cartDecreaseBtns.forEach(decreaseBtn => {
    decreaseBtn.addEventListener('click', (e) => cartHandleQtyChangeClick(e, elems));
  });
}

function clearCart(elems) {
  localStorage.removeItem('cart');

  let cartQtyText = elems.cartQtyText ? elems.cartQtyText : document.querySelector('#cart-qty');

  applyAnimationClass(document.querySelector('#nav-cart-items-count'), 'pop-to-nothing')
  setTimeout(() => {
    updateCartCountIcon(0);
  }, 400);
  cartDisplayCartItems(elems);
  cartQtyText.textContent = ``;
  disableCheckoutBtn()

  updateCheckoutPage(elems)
}


function updateCheckoutPage(elems) {
  const pathname = window.location.pathname;
  const currentPage = pathname.substring(pathname.lastIndexOf('/') + 1);
  if (currentPage === 'checkout') {
    checkoutDisplayCartItems(elems);
  }
}


// CART DELETE BUTTONS
function removeItemFromCart(event, elems) {
  // console.log('removeItemFromCart')
  const button = event.target.closest('.cart-bin-icon-wrapper');
  const itemId = button.dataset.id; // Access the data-id attribute

  let itemToDelete = elems.itemToDelete ? elems.itemToDelete : event.target.closest('.cart-item');
  // const navCartQtyCountElem = container.querySelector('#nav-cart-items-count');
  // const itemToDelete = event.target.closest('.cart-item'); 
  // const cartQtyText = document.querySelector('#cart-qty');  
  itemToDelete.classList.add('to-delete');

  // // Your logic to remove the item from the cart using itemId
  let cartItems = getCartItems();
  cartItems = cartItems.filter(item => item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  const cartTotalQty = getCartItemsQty(cartItems)
  if (cartTotalQty === 0) {
    updateCartCountIcon(cartTotalQty)
  } else {
    applyAnimationClass(elems.navCartQtyCountElem, 'pop-part-1')
    setTimeout(() => {
      updateCartCountIcon(cartTotalQty)
    }, 250);
  }

  setTimeout(() => {
    cartDisplayCartItems(elems, cartItems);
    elems.cartQtyText.textContent = `(${cartTotalQty})`
  }, 500);

  updateCheckoutPage(elems)
}


function getOverlayElems(container) {

  return {
    cartIcon: container.querySelector('#nav-cart-icon'),
    removeAllLink: document.querySelector('.remove-all-link'),
    // console.log('removeAllLink:', removeAllLink)
    overlay: document.querySelector('#cart-overlay'),
    cartSummaryBlock: document.querySelector('#cart-summary-block'),
    overlayCloseBtn: document.querySelector('#overlay-close-btn'),
    goToCheckoutBtn: document.querySelector('#go-to-checkout-btn'),

    cartItemsContainer: document.querySelector('.cart-items'),
    cartQtyText: document.querySelector('#cart-qty'),
    totalText: document.querySelector('p#total'),

    cartDeleteBtns: document.querySelectorAll('.cart-bin-icon-wrapper'),
    checkoutCartItemsContainer: document.querySelector('.checkout-cart-items'),

    checkoutShippingTextElem: container.querySelector('#Shipping'),
    checkoutVatTextElem: container.querySelector('#VAT'),
    checkoutGrandTotalTextElem: container.querySelector('#Grand-Total'),

    orderConfirmationGoHomeButton: container.querySelector('#order-confirmation-home'),

    navCartQtyCountElem: document.querySelector('#nav-cart-items-count'),

    cartIncreaseBtns: document.querySelectorAll('.cart-number-adjuster.is-plus'),
    cartDecreaseBtns: document.querySelectorAll('.cart-number-adjuster.is-minus'),

  }
}

export function cartOverlayInit(container) {
  // console.log('cartOverlayInit')

  const elems = getOverlayElems(container);

  elems.cartIcon.addEventListener('click', (e) => toggleOverlayDisplay(e, elems));
  elems.removeAllLink.addEventListener('click', (e) => clearCart(container));
  elems.overlayCloseBtn.addEventListener('click', (e) => toggleOverlayDisplay(e, elems));
  elems.goToCheckoutBtn.addEventListener('click', (e) => goToCheckoutBtnClick(e, elems));
  // cartDisplayCartItems(container);
  // overlay.style.display = 'none'
}
