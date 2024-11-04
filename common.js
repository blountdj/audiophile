
function getCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

function getCartItemsQty(cartItems) {
    let cartTotalQty = 0;
    cartItems.forEach(item => {
    cartTotalQty += item.quantity
    })
    return cartTotalQty;
}

function getCartLength() {
    let cart = getCartItems()
    return cart.length;
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

function applyAnimationClass(element, animationName) {
    element.classList.add(animationName);

    // Remove the class after the animation ends to allow for re-triggering
    element.addEventListener('animationend', function() {
        element.classList.remove(animationName);
    }, { once: true });
}

export function disableCheckoutBtn(container) {
  const goToCheckoutBtn = document.querySelector('#go-to-checkout-btn') 
    goToCheckoutBtn.classList.add('disabled')
    goToCheckoutBtn.href = "#"
}

export function enableCheckoutBtn(container) {
    console.log('enableCheckoutBtn')
    const goToCheckoutBtn = document.querySelector('#go-to-checkout-btn') 
    goToCheckoutBtn.classList.remove('disabled')
    goToCheckoutBtn.href = "/checkout"
}

function initCart() {
  const cartItems = getCartItems()
  const cartItemsQty = getCartItemsQty(cartItems)
  const cartDictionary = getItemDictionary(cartItems)
  
}


// // Export the function to the global scope
// window.getCartItems = getCartItems;
// window.getCartItemsQty = getCartItemsQty;
// window.getCartLength = getCartLength;
// window.applyAnimationClass = applyAnimationClass;
// window.getItemDictionary = getItemDictionary;
// window.disableCheckoutBtn = disableCheckoutBtn;
// window.enableCheckoutBtn = enableCheckoutBtn;
