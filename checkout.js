
// E-MONEY TOGGLE
document.addEventListener('DOMContentLoaded', function() {
    // Get the radio button element
    const eMoneyRadioButton = document.getElementById('e-money');
    const cashOnDeliveryRadioButton = document.getElementById('cash-on-delivery-radio');
    
    // Function to toggle display based on radio button state
    function toggleEmoneyDisplay() {
        // Get all elements with the class 'form-input-wrapper is-emoney'
        const emoneyElements = document.querySelectorAll('.form-input-wrapper.is-emoney');
        const cashOnDeliveryElement = document.getElementById('cash-on-delivery');
        
        // Determine the display style based on the radio button's checked state
        const eMoneyDisplayStyle = eMoneyRadioButton.checked ? 'block' : 'none';
        const cashOnDeliveryDisplayStyle = cashOnDeliveryRadioButton.checked ? 'flex' : 'none';
        
        // Set the display style for each element
        emoneyElements.forEach(element => {
            element.style.display = eMoneyDisplayStyle;
        });
        
        cashOnDeliveryElement.style.display = cashOnDeliveryDisplayStyle;
    }
    
    // Add event listener to the radio button
    eMoneyRadioButton.addEventListener('change', toggleEmoneyDisplay);
    cashOnDeliveryRadioButton.addEventListener('change', toggleEmoneyDisplay);
    
    // Initial check to set the correct display state on page load
    toggleEmoneyDisplay();
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    const checkoutTotalTextElem = document.querySelector('#checkout-total');
    
    const checkoutProductImages = {
		"XX59 headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp",
        "XX99 Mark II Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp",
        "XX99 Mark I Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp",
        "YX1 Wireless Earphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp",
        "ZX7 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp",
        "ZX9 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp"
    };

    // Function to get all items in the cart
    function checkoutGetCartItems() {
        // Get the current cart from localStorage
        let checkoutCart = JSON.parse(localStorage.getItem('cart')) || [];
        return checkoutCart;
    }
    
    function updateCartCountIcon(qty) {
        const navCartItemsCountElem = document.querySelector('#nav-cart-items-count');
        if (qty === 0) {
      	navCartItemsCountElem.textContent = '0';
        } else {
      	    console.log('TO UPDATE QTY:', qty)
        }
        toggleNavCartItemsCount()
    }

    function toggleNavCartItemsCount() {
        const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');
        navCartQtyCountElem.style.display = navCartQtyCountElem.textContent === '0' ? 'none' : 'flex';
    }
    
    function clearCart() {
    	localStorage.removeItem('cart');
        // displayCartItems();
        updateCartCountIcon(0);
    }
        
    function checkoutGetItemDictionary(checkoutCartItems) {
        // Create a dictionary to aggregate items by name
        let checkoutItemDictionary = {};
            
        // Iterate over cart items to aggregate quantities and calculate subtotals
        checkoutCartItems.forEach(checkoutItem => {
            const checkoutPrice = parseFloat(checkoutItem.price);            
            let checkoutQty = checkoutItem.quantity !== undefined ? checkoutItem.quantity : 1
            if (!checkoutItemDictionary[checkoutItem.name]) {
                checkoutItemDictionary[checkoutItem.name] = {
                    id: checkoutItem.id,
                    name: checkoutItem.name,
                    cartName: checkoutItem.cartName,
                    price: checkoutPrice,
                    quantity: checkoutQty,
                    subtotal: 0
                };
            } else {
                checkoutItemDictionary[checkoutItem.name].quantity = checkoutItemDictionary[checkoutItem.name].quantity + checkoutQty;
            }
            checkoutItemDictionary[checkoutItem.name].subtotal += (checkoutPrice * checkoutQty);
        });
            
    	return checkoutItemDictionary;
    }

    // Function to display cart items
    function checkoutDisplayCartItems() {
        let checkoutCartItems = checkoutGetCartItems();
        //console.log('checkoutCartItems:', checkoutCartItems);
        let checkoutCartItemsContainer = document.querySelector('.checkout-cart-items');

        // Clear the current content
        checkoutCartItemsContainer.innerHTML = '';

        if (checkoutCartItems.length === 0) {
            console.log("checkoutCartItems.length === 0")
            checkoutCartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            checkoutTotalTextElem.textContent = `$ 0`;
            return;
        }

        // Create a dictionary to aggregate items by name
        checkoutItemDictionary = checkoutGetItemDictionary(checkoutCartItems)
        let checkoutTotal = 0;     
        console.log('checkoutTotal1:', checkoutTotal)
   
        // Iterate over itemDictionary to display each unique item
        for (let key in checkoutItemDictionary) {
            if (checkoutItemDictionary.hasOwnProperty(key)) {
                let checkoutItem = checkoutItemDictionary[key];
                checkoutTotal += checkoutItem.subtotal;
                let checkoutImgUrl = checkoutProductImages[checkoutItem.name]
                //console.log('imgUrl:', imgUrl);
                //console.log('subtotal:', item.subtotal);
                let checkoutItemElement = document.createElement('div');
                checkoutItemElement.classList.add('cart-item');
                checkoutItemElement.innerHTML = `
                    <div class="checkout-cart-item">
                    		<img class="checkout-cart-item-img" src="${checkoutImgUrl}">
                        <div class="checkout-cart-item-text-wrapper">
                            <p class="checkout-summary-item-heading">${checkoutItem.cartName}</p>
                            <p class="checkout-summary-item-price">$ ${checkoutItem.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                        <p class="checkout-summary-item-qty">x${checkoutItem.quantity}</p>
                    </div>
                `;
                checkoutCartItemsContainer.appendChild(checkoutItemElement);
            }
        }

        console.log('checkoutTotal2:', checkoutTotal)

        // Display the totals
        
        const checkoutShippingTextElem = document.querySelector('#shipping');
        const checkoutVatTextElem = document.querySelector('#vat');
        const checkoutGrandTotalTextElem = document.querySelector('#grand-total');
        
        // OVERLAY ELEMENTS
        const checkoutOverlayGrandTotalText = document.querySelector('#overlay-grand-total');
        const checkoutOverlayOtherItemsCountText = document.querySelector('#overlay-other-items-count');
        const checkoutOverlayOtherItemsPlural = document.querySelector('#overlay-other-items-plural');
        const checkoutOverlayOtherItemImage = document.querySelector('#overlay-cart-item-img');
        const checkoutOverlayBottomWrapper = document.querySelector('#overlay-items-bottom-wrapper');
        const checkoutOverlayItemName = document.querySelector('#overlay-item-name');
        const checkoutOverlayItemPrice = document.querySelector('#overlay-item-price');
        const checkoutOverlayItemQty = document.querySelector('#overlay-item-qty');
        
        // CALCULATED VALUES
        const checkoutGrandTotal = (checkoutTotal + 50)    
        const checkoutVatTotal = checkoutGrandTotal * 0.20

        console.log('checkoutTotal3:', checkoutTotal)
		// UPDATE SUMMARY SECTION
        // checkoutTotalText = document.querySelector('#total');
        checkoutTotalTextElem.textContent = `$ ${checkoutTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        checkoutShippingTextElem.textContent = `$ 50.00`;
        checkoutVatTextElem.textContent = `$ ${checkoutVatTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        checkoutGrandTotalTextElem.textContent = `$ ${checkoutGrandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        // UPDATE OVERLAY
        const checkoutFirstKey = Object.keys(checkoutItemDictionary)[0];
        const checkoutfirstValue = checkoutItemDictionary[checkoutFirstKey];
        
        checkoutOverlayItemName.textContent = `${checkoutfirstValue.cartName}`;
        checkoutOverlayItemPrice.textContent = `$ ${checkoutfirstValue.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        checkoutOverlayItemQty.textContent = `x${checkoutfirstValue.quantity}`;
        checkoutOverlayGrandTotalText.textContent = `$ ${checkoutGrandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        const checkoutDictionaryLength = Object.keys(checkoutItemDictionary).length;
        console.log('checkoutDictionaryLength:', checkoutDictionaryLength)
        
        let checkoutOverlayImgUrl = checkoutProductImages[checkoutfirstValue.name]
        checkoutOverlayOtherItemImage.src = checkoutOverlayImgUrl;
        
        if (checkoutDictionaryLength > 1) {
            console.log('dictionaryLength > 1')
        	checkoutOverlayBottomWrapper.style.display = 'flex';
            checkoutOverlayOtherItemsCountText.textContent = `${checkoutDictionaryLength - 1}`;
            let checkoutOverlayOtherItemsPluralDisplay = checkoutDictionaryLength === 2 ? `` : `(s)`;
            checkoutOverlayOtherItemsPlural.textContent = `${checkoutOverlayOtherItemsPluralDisplay}`;
        }
        
        // Checkout overlay
        const checkoutSubmitButton = document.getElementById('submit');
        const checkoutOverlayElem = document.getElementById('checkout-overlay');

        // Function to toggle display based on radio button state
        function checkoutOverlayDisplay() {
            checkoutOverlayElem.style.display = 'flex';    
        }
      
        const orderConfirmationGoHomeButton = document.getElementById('order-confirmation-home');
        orderConfirmationGoHomeButton.addEventListener('click', function() {
      	    checkoutOverlayElem.style.display = 'none';  
            clearCart()
        })
      

        // Add event listener to the radio button
        checkoutSubmitButton.addEventListener('click', checkoutOverlayDisplay);   
    }

    // Display cart items on page load
    checkoutDisplayCartItems();
});
