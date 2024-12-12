
import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v8/min/js/config-min.js";
const { getCartItems, getCartLength, getItemDictionary } = await import(`${CONFIG.path}${CONFIG.jsPath}common${CONFIG.min}.js`);


const getCheckoutElems = (container) => {
    return {
        emoneyElements: container.querySelectorAll('.form-input-wrapper.is-emoney'),
        cashOnDeliveryElement: container.querySelector('#cash-on-delivery'),
        eMoneyInput: container.querySelector('#emoney'),
        cashOnDeliveryRadioButton: container.querySelector('#cash-on-delivery-radio'),
        eMoneyRadioButton: container.querySelector('#e-money-radio'),
        cashOnDeliveryRadioButton: container.querySelector('#cash-on-delivery-radio'),

        // SUBMIT ORDER & FORM CHECKING
        nameInputWrapperElem: container.querySelector('#name-input-wrapper'),
        emailInputWrapperElem: container.querySelector('#email-input-wrapper'),
        phoneInputWrapperElem: container.querySelector('#phone-input-wrapper'),
        addressInputWrapperElem: container.querySelector('#address-input-wrapper'),
        zipInputWrapperElem: container.querySelector('#zip-input-wrapper'),
        cityInputWrapperElem: container.querySelector('#city-input-wrapper'),
        countryInputWrapperElem: container.querySelector('#country-input-wrapper'),
        successConfirmationNameElem: container.querySelector('#confirmation-text-name'),

        checkoutCartItemsContainer: container.querySelector('.checkout-cart-items'),
        checkoutTotalTextElem: container.querySelector('#Total'),

        checkoutTotalTextElemHidden: container.querySelector('#Total-Hidden'),
        checkoutShippingTextElem: container.querySelector('#Shipping'),
        checkoutShippingTextElemHidden: container.querySelector('#Shipping-Hidden'),
        checkoutVatTextElem: container.querySelector('#VAT'),
        checkoutVatTextElemHidden: container.querySelector('#VAT-Hidden'),
        checkoutGrandTotalTextElem: container.querySelector('#Grand-Total'),
        checkoutGrandTotalTextElemHidden: container.querySelector('#Grand-Total-Hidden'),

        // OVERLAY ELEMENTS
        checkoutOverlayGrandTotalText: container.querySelector('#overlay-grand-total'),
        checkoutOverlayOtherItemsCountText: container.querySelector('#overlay-other-items-count'),
        checkoutOverlayOtherItemsPlural: container.querySelector('#overlay-other-items-plural'),
        checkoutOverlayOtherItemImage: container.querySelector('#overlay-cart-item-img'),
        checkoutOverlayBottomWrapper: container.querySelector('#overlay-items-bottom-wrapper'),
        checkoutOverlayItemName: container.querySelector('#overlay-item-name'),
        checkoutOverlayItemPrice: container.querySelector('#overlay-item-price'),
        checkoutOverlayItemQty: container.querySelector('#overlay-item-qty'),

        checkoutProductImages: {
            "XX59 headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp",
            "XX99 Mark II Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp",
            "XX99 Mark I Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp",
            "YX1 Wireless Earphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp",
            "ZX7 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp",
            "ZX9 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp"
        },

        orderConfirmationGoHomeButton: container.querySelector('#order-confirmation-home'),
        productInput: container.querySelector('#Products'),
    }
}


// E-MONEY TOGGLE
function toggleEmoneyDisplay(checkoutElems) {
    // console.log('toggleEmoneyDisplay')

    const eMoneyDisplayStyle = checkoutElems.eMoneyInput.checked ? 'block' : 'none';
    const cashOnDeliveryDisplayStyle = checkoutElems.cashOnDeliveryRadioButton.checked ? 'flex' : 'none';

    checkoutElems.emoneyElements.forEach(element => {
        element.style.display = eMoneyDisplayStyle;
    });

    checkoutElems.cashOnDeliveryElement.style.display = cashOnDeliveryDisplayStyle;
}

function closeCartOverlay() {
    const cartOverlay = document.querySelector('#cart-overlay')
    cartOverlay.classList.add('is-closed')
}


export function checkoutInit(container) {
    // console.log('checkoutInit')

    closeCartOverlay()
    const elems = getCheckoutElems(container)


    // Add event listener to the radio button
    elems.eMoneyRadioButton.addEventListener('change', () => toggleEmoneyDisplay(elems));
    elems.cashOnDeliveryRadioButton.addEventListener('change', () => toggleEmoneyDisplay(elems));

    toggleEmoneyDisplay(elems);
    checkoutDisplayCartItems(elems)

    $('[wr-type="submit"]').click(function (event) {
        // console.log('submit clicked')

        // event.preventDefault();

        let errors = [];
        const noItemsInCart = getCartLength();
        if (noItemsInCart === 0) {
            alert('Cart is empty');
            return;
        }

        errors.push(checkInput(elems.nameInputWrapperElem, 'text'))
        errors.push(checkInput(elems.emailInputWrapperElem, 'email'))
        errors.push(checkInput(elems.phoneInputWrapperElem, 'phone'))
        errors.push(checkInput(elems.addressInputWrapperElem, 'text'))
        errors.push(checkInput(elems.zipInputWrapperElem, 'text'))
        errors.push(checkInput(elems.cityInputWrapperElem, 'text'))
        errors.push(checkInput(elems.countryInputWrapperElem, 'text'))
        errors.push(checkRadioInputs(container))

        if (errors.includes(true)) {
            alert("Some data is invalid, please check highlighted fields")
        } else {
            elems.successConfirmationNameElem.innerHTML = elems.nameInputWrapperElem.querySelector('input').value;

            localStorage.removeItem('cart');
            const navCartItemsCountElem = document.querySelector('#nav-cart-items-count');
            navCartItemsCountElem.textContent = '0';

            const form = this.closest('form');
            if (form) {
                const submitEvent = new Event('submit', {
                    bubbles: true,
                    cancelable: true
                });
                form.dispatchEvent(submitEvent);
            }
        }
    });
}

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

function setElementsToReadOnly(elements) {
    // console.log('setElementsToReadOnly')
    // console.log(elements)
    const readOnlyElems = [
        document.querySelector('#Grand-Total'),
        document.querySelector('#Total-Hidden'),
        document.querySelector('#Shipping'),
        document.querySelector('#Shipping-Hidden'),
        document.querySelector('#VAT'),
        document.querySelector('#Grand-Total'),
        document.querySelector('#Total'),
    ]

    readOnlyElems.forEach(element => {
        element.readOnly = true
        element.style.cursor = 'auto';
    })

}

// const productImages = {
//     "XX59 headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp",
//     "XX99 Mark II Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp",
//     "XX99 Mark I Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp",
//     "YX1 Wireless Earphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp",
//     "ZX7 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp",
//     "ZX9 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp"
// };

// Function to display cart items
export function checkoutDisplayCartItems(elems) {

    // VARS
    let hiddenProductText = '';
    let checkoutTotal = 0;
    let index = 0;
    let checkoutProductImages = {
        "XX59 headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp",
        "XX99 Mark II Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp",
        "XX99 Mark I Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp",
        "YX1 Wireless Earphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp",
        "ZX7 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp",
        "ZX9 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp"
    }
    let productInput = elems.productInput ? elems.productInput : document.querySelector('#Products');
    let checkoutTotalTextElem = elems.checkoutTotalTextElem ? elems.checkoutTotalTextElem : document.querySelector('#Total');
    let checkoutTotalTextElemHidden = elems.checkoutTotalTextElemHidden ? elems.checkoutTotalTextElemHidden : document.querySelector('#Total-Hidden');
    let checkoutShippingTextElem = elems.checkoutShippingTextElem ? elems.checkoutShippingTextElem : document.querySelector('#Shipping');
    let checkoutShippingTextElemHidden = elems.checkoutShippingTextElemHidden ? elems.checkoutShippingTextElemHidden : document.querySelector('#Shipping-Hidden');
    let checkoutVatTextElem = elems.checkoutVatTextElem ? elems.checkoutVatTextElem : document.querySelector('#VAT');
    let checkoutVatTextElemHidden = elems.checkoutVatTextElemHidden ? elems.checkoutVatTextElemHidden : document.querySelector('#VAT-Hidden');
    let checkoutGrandTotalTextElem = elems.checkoutGrandTotalTextElem ? elems.checkoutGrandTotalTextElem : document.querySelector('#Grand-Total');
    let checkoutGrandTotalTextElemHidden = elems.checkoutGrandTotalTextElemHidden ? elems.checkoutGrandTotalTextElemHidden : document.querySelector('#Grand-Total-Hidden');
    let checkoutOverlayItemName = elems.checkoutOverlayItemName ? elems.checkoutOverlayItemName : document.querySelector('#overlay-item-name');
    let checkoutOverlayItemPrice = elems.checkoutOverlayItemPrice ? elems.checkoutOverlayItemPrice : document.querySelector('#overlay-item-price');
    let checkoutOverlayItemQty = elems.checkoutOverlayItemQty ? elems.checkoutOverlayItemQty : document.querySelector('#overlay-item-qty');
    let checkoutOverlayGrandTotalText = elems.checkoutOverlayGrandTotalText ? elems.checkoutOverlayGrandTotalText : document.querySelector('#overlay-grand-total');
    let checkoutOverlayBottomWrapper = elems.checkoutOverlayBottomWrapper ? elems.checkoutOverlayBottomWrapper : document.querySelector('#overlay-items-bottom-wrapper');
    let checkoutOverlayOtherItemsCountText = elems.checkoutOverlayOtherItemsCountText ? elems.checkoutOverlayOtherItemsCountText : document.querySelector('#overlay-other-items-count');
    let checkoutOverlayOtherItemsPlural = elems.checkoutOverlayOtherItemsPlural ? elems.checkoutOverlayOtherItemsPlural : document.querySelector('#overlay-other-items-plural');
    let checkoutOverlayOtherItemImage = elems.checkoutOverlayOtherItemImage ? elems.checkoutOverlayOtherItemImage : document.querySelector('#overlay-cart-item-img');
    let orderConfirmationGoHomeButton = elems.orderConfirmationGoHomeButton ? elems.orderConfirmationGoHomeButton : document.querySelector('#order-confirmation-home');

    // let checkoutCartItemsContainer = elems.checkoutCartItemsContainer ? elems.checkoutCartItemsContainer : document.querySelector('.checkout-cart-items')

    // let checkoutCartItems = checkoutGetCartItems();
    let checkoutCartItems = getCartItems();
    // console.log('checkoutCartItems:', checkoutCartItems);
    // console.log('checkoutCartItems.length:', checkoutCartItems.length);

    // Clear the current content
    elems.checkoutCartItemsContainer.innerHTML = '';

    if (checkoutCartItems.length === 0) {
        // console.log("checkoutCartItems.length === 0")
        elems.checkoutCartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        elems.checkoutTotalTextElem.textContent = `$ 0`;
        return;
    }

    // Create a dictionary to aggregate items by name
    const checkoutItemDictionary = getItemDictionary(checkoutCartItems)
    // console.log('checkoutItemDictionary:', checkoutItemDictionary);

    // Iterate over itemDictionary to display each unique item
    for (let key in checkoutItemDictionary) {
        index++;
        if (checkoutItemDictionary.hasOwnProperty(key)) {
            let checkoutItem = checkoutItemDictionary[key];
            // console.log('checkoutItem:', checkoutItem)
            // console.log('### checkoutItem.subtotal:', checkoutItem.subtotal)
            checkoutTotal += (checkoutItem.price * checkoutItem.quantity);
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
            elems.checkoutCartItemsContainer.appendChild(checkoutItemElement);
        }
    }

    // UPDATE HIDDEN PRODUCT INPUT
    productInput.readOnly = true;
    productInput.value = hiddenProductText.slice(0, -2);

    // Display the totals
    checkoutTotalTextElemHidden.readOnly = true;

    // checkoutGrandTotalTextElem.readOnly = true;
    const readOnlyElems = [
        elems.checkoutGrandTotalTextElem,
        elems.checkoutTotalTextElemHidden,
        elems.checkoutShippingTextElem,
        elems.checkoutShippingTextElemHidden,
        elems.checkoutVatTextElem,
        elems.checkoutGrandTotalTextElem,
        elems.checkoutTotalTextElem,
    ]
    // readOnlyElems.forEach(elem => {
    //     console.log('elem:', elem)
    // })
    setElementsToReadOnly(readOnlyElems)


    // CALCULATED VALUES
    const checkoutGrandTotal = (checkoutTotal + 50)
    const checkoutVatTotal = checkoutGrandTotal * 0.20

    // console.log('checkoutTotal:', checkoutTotal)
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


    orderConfirmationGoHomeButton.addEventListener('click', function () {
        // checkoutOverlayElem.style.display = 'none';  
        clearCart()
    })
}


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
            // console.log("The email is invalid.");
            updateInputActions(inputElem, labelElem, errorElem, errorMsgs[type], true)
            errors = true;
        } else {
            // console.log("The email is valid.");
            updateInputActions(inputElem, labelElem, errorElem, '', false)
        }
    } else if (type === 'phone') {
        if (isNumericAndLength(value, 9)) {
            // console.log("The phone is invalid.");
            updateInputActions(inputElem, labelElem, errorElem, errorMsgs[type], true)
            errors = true;
        } else {
            // console.log("The phone is valid.");
            updateInputActions(inputElem, labelElem, errorElem, '', false)
        }
    } else if (type === 'emoneyNumber') {
        if (!isNumericAndLength(value, 9)) {
            // console.log("The emoneyNumber is invalid.");
            updateInputActions(inputElem, labelElem, errorElem, errorMsgs[type], true)
            errors = true;
        } else {
            // console.log("The emoneyNumber is valid.");
            updateInputActions(inputElem, labelElem, errorElem, '', false)
        }
    } else if (type === 'emoneyPin') {
        if (!isNumericAndLength(value, 4)) {
            // console.log("The emoneyPin is invalid.");
            updateInputActions(inputElem, labelElem, errorElem, errorMsgs[type], true)
            errors = true;
        } else {
            // console.log("The emoneyPin is valid.");
            updateInputActions(inputElem, labelElem, errorElem, '', false)
        }
    }

    return errors;
}

function checkRadioInputs(container) {
    let radioError = true;

    // Get radio button elements
    const emoneyRadioWrapperElem = container.querySelector('#e-money-radio');
    const cashOnDeliveryRadioWrapperElem = container.querySelector('#cash-on-delivery-radio');
    const emoneyRadioInput = emoneyRadioWrapperElem.querySelector('input');
    const cashOnDeliveryRadioInput = cashOnDeliveryRadioWrapperElem.querySelector('input');
    const labelElem = container.querySelector('#payment-method-label');
    const paymentMethodErrorTextElem = container.querySelector('#payment-method-error-text');

    const emoneyNumberInputWrapperElem = container.querySelector('#e-money-number-input-wrapper');
    const emoneyPinInputWrapperElem = container.querySelector('#e-money-pin-input-wrapper');


    // emoneyRadioInput if each radio button is checked
    if (emoneyRadioInput.checked) {
        // console.log('emoney is checked');
        radioError = false;
        updateInputActions(emoneyRadioWrapperElem, labelElem, paymentMethodErrorTextElem, '', false)
        updateInputActions(cashOnDeliveryRadioWrapperElem, labelElem, paymentMethodErrorTextElem, '', false)
        checkInput(emoneyNumberInputWrapperElem, 'emoneyNumber')
        checkInput(emoneyPinInputWrapperElem, 'emoneyPin')

    } else if (cashOnDeliveryRadioInput.checked) {
        // console.log('cash on delivery is checked');
        radioError = false;
        updateInputActions(emoneyRadioWrapperElem, labelElem, paymentMethodErrorTextElem, '', false)
        updateInputActions(cashOnDeliveryRadioWrapperElem, labelElem, paymentMethodErrorTextElem, '', false)
    } else {
        // console.log('No option is checked');
        updateInputActions(emoneyRadioWrapperElem, labelElem, paymentMethodErrorTextElem, 'Please select a payment method', true)
        updateInputActions(cashOnDeliveryRadioWrapperElem, labelElem, paymentMethodErrorTextElem, 'Please select a payment method', true)
    }

    return radioError;
}
