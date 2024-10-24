
// E-MONEY TOGGLE
document.addEventListener('DOMContentLoaded', function() {
    // Get the radio button element
    const eMoneyRadioButton = document.getElementById('e-money-radio');
    const cashOnDeliveryRadioButton = document.getElementById('cash-on-delivery-radio');
    const eMoneyInput = document.getElementById('emoney');

    
    // Function to toggle display based on radio button state
    function toggleEmoneyDisplay() {
        console.log('toggleEmoneyDisplay')

        console.log('eMoneyRadioButton:', eMoneyRadioButton)

        // Get all elements with the class 'form-input-wrapper is-emoney'
        const emoneyElements = document.querySelectorAll('.form-input-wrapper.is-emoney');
        const cashOnDeliveryElement = document.getElementById('cash-on-delivery');
        
        // Determine the display style based on the radio button's checked state
        const eMoneyDisplayStyle = eMoneyInput.checked ? 'block' : 'none';
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

// GENERAL CHECKOUT DISPLAY & FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    const checkoutTotalTextElem = document.querySelector('#Total');
    
    const checkoutProductImages = {
		"XX59 headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp",
        "XX99 Mark II Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp",
        "XX99 Mark I Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp",
        "YX1 Wireless Earphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp",
        "ZX7 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp",
        "ZX9 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp"
    };
    
    
    function clearCart() {
    	localStorage.removeItem('cart');
        // displayCartItems();
        updateCartCountIcon(0);
    }
        
    // function checkoutGetItemDictionary(checkoutCartItems) {
    //     // Create a dictionary to aggregate items by name
    //     let checkoutItemDictionary = {};
            
    //     // Iterate over cart items to aggregate quantities and calculate subtotals
    //     checkoutCartItems.forEach(checkoutItem => {
    //         const checkoutPrice = parseFloat(checkoutItem.price);            
    //         let checkoutQty = checkoutItem.quantity !== undefined ? checkoutItem.quantity : 1
    //         if (!checkoutItemDictionary[checkoutItem.name]) {
    //             checkoutItemDictionary[checkoutItem.name] = {
    //                 id: checkoutItem.id,
    //                 name: checkoutItem.name,
    //                 cartName: checkoutItem.cartName,
    //                 price: checkoutPrice,
    //                 quantity: checkoutQty,
    //                 subtotal: 0
    //             };
    //         } else {
    //             checkoutItemDictionary[checkoutItem.name].quantity = checkoutItemDictionary[checkoutItem.name].quantity + checkoutQty;
    //         }
    //         checkoutItemDictionary[checkoutItem.name].subtotal += (checkoutPrice * checkoutQty);
    //     });
            
    // 	return checkoutItemDictionary;
    // }

    function resizeInput() {
        this.style.width = this.value.length + "ch";
      }

    function setElementsToReadOnly(elements){
        elements.forEach(element => {
            element.readOnly = true
            element.style.cursor = 'auto';
        })

    }

    // Function to display cart items
    function checkoutDisplayCartItems() {

        // let checkoutCartItems = checkoutGetCartItems();
        let checkoutCartItems = getCartItems();
        // console.log('checkoutCartItems:', checkoutCartItems);
        let checkoutCartItemsContainer = document.querySelector('.checkout-cart-items');

        // Clear the current content
        checkoutCartItemsContainer.innerHTML = '';

        if (checkoutCartItems.length === 0) {
            // console.log("checkoutCartItems.length === 0")
            checkoutCartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            checkoutTotalTextElem.textContent = `$ 0`;
            return;
        }

        // Create a dictionary to aggregate items by name
        checkoutItemDictionary = getItemDictionary(checkoutCartItems)
        let checkoutTotal = 0;     
   
        // Iterate over itemDictionary to display each unique item
        let hiddenProductText = '';
        let index = 0;
        for (let key in checkoutItemDictionary) {
            index++;
            if (checkoutItemDictionary.hasOwnProperty(key)) {
                let checkoutItem = checkoutItemDictionary[key];
                checkoutTotal += checkoutItem.subtotal;
                let checkoutImgUrl = checkoutProductImages[checkoutItem.name]
                hiddenProductText += `${index}) ${checkoutItem.quantity}x ${checkoutItem.name} = $${checkoutItem.price * checkoutItem.quantity} - `;
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

        // UPDATE HIDDEN PRODUCT INPUT
        const productInput = document.getElementById('Products');
        productInput.readOnly = true;
        productInput.value = hiddenProductText.slice(0, -2);

        // Display the totals
        const checkoutTotalTextElemHidden = document.querySelector('#Total-Hidden');
        checkoutTotalTextElemHidden.readOnly = true;
        const checkoutShippingTextElem = document.querySelector('#Shipping');
        const checkoutShippingTextElemHidden = document.querySelector('#Shipping-Hidden');
        const checkoutVatTextElem = document.querySelector('#VAT');
        const checkoutVatTextElemHidden = document.querySelector('#VAT-Hidden');
        const checkoutGrandTotalTextElem = document.querySelector('#Grand-Total');
        const checkoutGrandTotalTextElemHidden = document.querySelector('#Grand-Total-Hidden');
        // checkoutGrandTotalTextElem.readOnly = true;
        const readOnlyElems = [
            checkoutGrandTotalTextElem, 
            checkoutTotalTextElemHidden, 
            checkoutShippingTextElem, 
            checkoutShippingTextElemHidden, 
            checkoutVatTextElem, 
            checkoutGrandTotalTextElem,
            checkoutTotalTextElem,
            checkoutTotalTextElemHidden
        ]
        setElementsToReadOnly(readOnlyElems)
        
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

        // console.log('checkoutGrandTotal:', checkoutGrandTotal)

		// UPDATE SUMMARY SECTION
        checkoutTotalTextElem.value = `$ ${checkoutTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        checkoutTotalTextElemHidden.value = checkoutTotal;

        checkoutShippingTextElem.value = `$ 50.00`;
        checkoutShippingTextElemHidden.value = 50.00;

        checkoutVatTextElem.value = `$ ${checkoutVatTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        checkoutVatTextElemHidden.value = checkoutVatTotal;

        checkoutGrandTotalTextElem.value = `$ ${checkoutGrandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        checkoutGrandTotalTextElemHidden.value = checkoutGrandTotal;
        // checkoutGrandTotalTextElem.value = checkoutGrandTotal;
        resizeInput.call(checkoutGrandTotalTextElem);

        // UPDATE OVERLAY
        const checkoutFirstKey = Object.keys(checkoutItemDictionary)[0];
        const checkoutfirstValue = checkoutItemDictionary[checkoutFirstKey];
        
        checkoutOverlayItemName.textContent = `${checkoutfirstValue.cartName}`;
        checkoutOverlayItemPrice.textContent = `$ ${checkoutfirstValue.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        checkoutOverlayItemQty.textContent = `x${checkoutfirstValue.quantity}`;
        checkoutOverlayGrandTotalText.textContent = `$ ${checkoutGrandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        const checkoutDictionaryLength = Object.keys(checkoutItemDictionary).length;
        // console.log('checkoutDictionaryLength:', checkoutDictionaryLength)
        
        let checkoutOverlayImgUrl = checkoutProductImages[checkoutfirstValue.name]
        checkoutOverlayOtherItemImage.src = checkoutOverlayImgUrl;
        
        if (checkoutDictionaryLength > 1) {
            // console.log('dictionaryLength > 1')
        	checkoutOverlayBottomWrapper.style.display = 'flex';
            checkoutOverlayOtherItemsCountText.textContent = `${checkoutDictionaryLength - 1}`;
            let checkoutOverlayOtherItemsPluralDisplay = checkoutDictionaryLength === 2 ? `` : `(s)`;
            checkoutOverlayOtherItemsPlural.textContent = `${checkoutOverlayOtherItemsPluralDisplay}`;
        }
        
        const orderConfirmationGoHomeButton = document.getElementById('order-confirmation-home');
        orderConfirmationGoHomeButton.addEventListener('click', function() {
      	    // checkoutOverlayElem.style.display = 'none';  
            clearCart()
        }) 
    }

    // Display cart items on page load
    checkoutDisplayCartItems();
});



// SUBMIT ORDER & FORM CHECKING
document.addEventListener('DOMContentLoaded', function() {

    const nameInputWrapperElem = document.getElementById('name-input-wrapper');
    const emailInputWrapperElem = document.getElementById('email-input-wrapper');
    const phoneInputWrapperElem = document.getElementById('phone-input-wrapper');
    const addressInputWrapperElem = document.getElementById('address-input-wrapper');
    const zipInputWrapperElem = document.getElementById('zip-input-wrapper');
    const cityInputWrapperElem = document.getElementById('city-input-wrapper');
    const countryInputWrapperElem = document.getElementById('country-input-wrapper');   
    const successConfirmationNameElem = document.getElementById('confirmation-text-name');
       


    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function isNumericAndLength(value, minLength) {
        // Regular expression to check if the value contains only digits
        const onlyNumbers = /^[0-9]+$/;
    
        // Check if the value matches the regular expression and has the specified length
        if (!onlyNumbers.test(value) || value.length < minLength) {
            return true;
        } else {
            return false;
        }
    }

    function updateInputActions(inputElem, labelElem, errorElem, errorMsg, error) {
        if (error) {
            inputElem.style.border = '1px solid #cd2c2c';
            labelElem.style.color = '#cd2c2c'; 
            errorElem.style.display = 'block';
            errorElem.textContent = errorMsg;

        } else {
            inputElem.style.border = '1px solid #cfcfcf';
            labelElem.style.color = 'black';
            errorElem.style.display = 'none';
        }  

    }

    function checkInput(inputWrapperElem, type) {
        let errors = false;
        // console.log('checkInput')

        const errorMsgs = {
            'text': 'Min. 3 characters',
            'email': 'Invalid email',
            'phone': 'Invalid phone number',
            'emoneyNumber': 'Must be 9 digits',
            'emoneyPin': 'Must be 4 digits',
        }
        
        const inputElem = inputWrapperElem.querySelector('input');
        const labelElem = inputWrapperElem.querySelector('label');
        const errorElem = inputWrapperElem.querySelector('.checkout-error-text');
        const value = inputElem.value;

        if (type === 'text') {
            if (value.length < 3) {
                updateInputActions(inputElem, labelElem, errorElem, errorMsgs[type], true)
                errors = true;
            } else {
                updateInputActions(inputElem, labelElem, errorElem, '', false)
            }       
        } else if (type === 'email') {
            if (!validateEmail(value)) {
                console.log("The email is invalid.");
                updateInputActions(inputElem, labelElem, errorElem, errorMsgs[type], true)
                errors = true;
            } else {
                console.log("The email is valid.");
                updateInputActions(inputElem, labelElem, errorElem, '', false)
            }
        } else if (type === 'phone') {
            if (isNumericAndLength(value, 9)) {
                console.log("The phone is invalid.");
                updateInputActions(inputElem, labelElem, errorElem, errorMsgs[type], true)
                errors = true;
            } else {
                console.log("The phone is valid.");
                updateInputActions(inputElem, labelElem, errorElem, '', false)
            }
        } else if (type === 'emoneyNumber') {
            if (!isNumericAndLength(value, 9)) {
                console.log("The emoneyNumber is invalid.");
                updateInputActions(inputElem, labelElem, errorElem, errorMsgs[type], true)
                errors = true;
            } else {
                console.log("The emoneyNumber is valid.");
                updateInputActions(inputElem, labelElem, errorElem, '', false)
            }
        } else if (type === 'emoneyPin') {
            if (!isNumericAndLength(value, 4)) {
                console.log("The emoneyPin is invalid.");
                updateInputActions(inputElem, labelElem, errorElem, errorMsgs[type], true)
                errors = true;
            } else {
                console.log("The emoneyPin is valid.");
                updateInputActions(inputElem, labelElem, errorElem, '', false)
            }
        }

        return errors;
    }

    function checkRadioInputs() {
        let radioError = true;

        // Get radio button elements
        const emoneyRadioWrapperElem = document.getElementById('e-money-radio');
        const cashOnDeliveryRadioWrapperElem = document.getElementById('cash-on-delivery-radio');
        const emoneyRadioInput = emoneyRadioWrapperElem.querySelector('input');
        const cashOnDeliveryRadioInput = cashOnDeliveryRadioWrapperElem.querySelector('input');
        const labelElem = document.getElementById('payment-method-label');
        const paymentMethodErrorTextElem = document.getElementById('payment-method-error-text');
        
        const emoneyNumberInputWrapperElem = document.getElementById('e-money-number-input-wrapper');
        const emoneyPinInputWrapperElem = document.getElementById('e-money-pin-input-wrapper');
        

        // emoneyRadioInput if each radio button is checked
        if (emoneyRadioInput.checked) {
            console.log('emoney is checked');
            radioError = false;
            updateInputActions(emoneyRadioWrapperElem, labelElem, paymentMethodErrorTextElem, '', false)
            updateInputActions(cashOnDeliveryRadioWrapperElem, labelElem, paymentMethodErrorTextElem, '', false)
            checkInput(emoneyNumberInputWrapperElem, 'emoneyNumber')
            checkInput(emoneyPinInputWrapperElem, 'emoneyPin')

        } else if (cashOnDeliveryRadioInput.checked) {
            console.log('cash on delivery is checked');
            radioError = false;
            updateInputActions(emoneyRadioWrapperElem, labelElem, paymentMethodErrorTextElem, '', false)
            updateInputActions(cashOnDeliveryRadioWrapperElem, labelElem, paymentMethodErrorTextElem, '', false)
        } else {
            console.log('No option is checked');
            updateInputActions(emoneyRadioWrapperElem, labelElem, paymentMethodErrorTextElem, 'Please select a payment method', true)
            updateInputActions(cashOnDeliveryRadioWrapperElem, labelElem, paymentMethodErrorTextElem, 'Please select a payment method', true)
        }

        return radioError;
    }

    $('[wr-type="submit"]').click(function(event) { 
        // console.log('submit3 clicked')

        // event.preventDefault();

        let errors = [];
        const noItemsInCart = getCartLength();
        if (noItemsInCart === 0) {
            alert('Cart is empty');
            return;
        }
        
        errors.push(checkInput(nameInputWrapperElem, 'text'))
        errors.push(checkInput(emailInputWrapperElem, 'email'))
        errors.push(checkInput(phoneInputWrapperElem, 'phone'))
        errors.push(checkInput(addressInputWrapperElem, 'text'))
        errors.push(checkInput(zipInputWrapperElem, 'text'))
        errors.push(checkInput(cityInputWrapperElem, 'text'))
        errors.push(checkInput(countryInputWrapperElem, 'text'))
        errors.push(checkRadioInputs())

        // console.log('errors:', errors)

        if (errors.includes(true)) {
            alert("Some data is invalid, please check highlighted fields")
        } else {
            successConfirmationNameElem.innerHTML = nameInputWrapperElem.querySelector('input').value;

            localStorage.removeItem('cart');
            const navCartItemsCountElem = document.querySelector('#nav-cart-items-count');
      	    navCartItemsCountElem.textContent = '0';

            //   console.log('submitting')
              $(this).parents('form').submit()      
        }
      }); 
})
