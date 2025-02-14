import { CONFIG as e } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v11/min/js/config-min.js"; let { getCartItems: t, getCartLength: o, getItemDictionary: r } = await import(`${e.path}${e.jsPath}common${e.min}.js`), getCheckoutElems = e => ({ emoneyElements: e.querySelectorAll(".form-input-wrapper.is-emoney"), cashOnDeliveryElement: e.querySelector("#cash-on-delivery"), eMoneyInput: e.querySelector("#emoney"), cashOnDeliveryRadioButton: e.querySelector("#cash-on-delivery-radio"), eMoneyRadioButton: e.querySelector("#e-money-radio"), cashOnDeliveryRadioButton: e.querySelector("#cash-on-delivery-radio"), nameInputWrapperElem: e.querySelector("#name-input-wrapper"), emailInputWrapperElem: e.querySelector("#email-input-wrapper"), phoneInputWrapperElem: e.querySelector("#phone-input-wrapper"), addressInputWrapperElem: e.querySelector("#address-input-wrapper"), zipInputWrapperElem: e.querySelector("#zip-input-wrapper"), cityInputWrapperElem: e.querySelector("#city-input-wrapper"), countryInputWrapperElem: e.querySelector("#country-input-wrapper"), successConfirmationNameElem: e.querySelector("#confirmation-text-name"), checkoutCartItemsContainer: e.querySelector(".checkout-cart-items"), checkoutTotalTextElem: e.querySelector("#Total"), checkoutTotalTextElemHidden: e.querySelector("#Total-Hidden"), checkoutShippingTextElem: e.querySelector("#Shipping"), checkoutShippingTextElemHidden: e.querySelector("#Shipping-Hidden"), checkoutVatTextElem: e.querySelector("#VAT"), checkoutVatTextElemHidden: e.querySelector("#VAT-Hidden"), checkoutGrandTotalTextElem: e.querySelector("#Grand-Total"), checkoutGrandTotalTextElemHidden: e.querySelector("#Grand-Total-Hidden"), checkoutOverlayGrandTotalText: e.querySelector("#overlay-grand-total"), checkoutOverlayOtherItemsCountText: e.querySelector("#overlay-other-items-count"), checkoutOverlayOtherItemsPlural: e.querySelector("#overlay-other-items-plural"), checkoutOverlayOtherItemImage: e.querySelector("#overlay-cart-item-img"), checkoutOverlayBottomWrapper: e.querySelector("#overlay-items-bottom-wrapper"), checkoutOverlayItemName: e.querySelector("#overlay-item-name"), checkoutOverlayItemPrice: e.querySelector("#overlay-item-price"), checkoutOverlayItemQty: e.querySelector("#overlay-item-qty"), checkoutProductImages: { "XX59 headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp", "XX99 Mark II Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp", "XX99 Mark I Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp", "YX1 Wireless Earphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp", "ZX7 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp", "ZX9 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp" }, orderConfirmationGoHomeButton: e.querySelector("#order-confirmation-home"), productInput: e.querySelector("#Products") }); function toggleEmoneyDisplay(e) { let t = e.eMoneyInput.checked ? "block" : "none", o = e.cashOnDeliveryRadioButton.checked ? "flex" : "none"; e.emoneyElements.forEach(e => { e.style.display = t }), e.cashOnDeliveryElement.style.display = o } function closeCartOverlay() { let e = document.querySelector("#cart-overlay"); e.classList.add("is-closed") } export function checkoutInit(e) { closeCartOverlay(); let t = getCheckoutElems(e); t.eMoneyRadioButton.addEventListener("change", () => toggleEmoneyDisplay(t)), t.cashOnDeliveryRadioButton.addEventListener("change", () => toggleEmoneyDisplay(t)), toggleEmoneyDisplay(t), checkoutDisplayCartItems(t), $('[wr-type="submit"]').click(function (r) { let a = [], c = o(); if (0 === c) { alert("Cart is empty"); return } if (a.push(checkInput(t.nameInputWrapperElem, "text")), a.push(checkInput(t.emailInputWrapperElem, "email")), a.push(checkInput(t.phoneInputWrapperElem, "phone")), a.push(checkInput(t.addressInputWrapperElem, "text")), a.push(checkInput(t.zipInputWrapperElem, "text")), a.push(checkInput(t.cityInputWrapperElem, "text")), a.push(checkInput(t.countryInputWrapperElem, "text")), a.push(checkRadioInputs(e)), a.includes(!0)) alert("Some data is invalid, please check highlighted fields"); else { t.successConfirmationNameElem.innerHTML = t.nameInputWrapperElem.querySelector("input").value, localStorage.removeItem("cart"); let n = document.querySelector("#nav-cart-items-count"); n.textContent = "0"; let l = this.closest("form"); if (l) { let i = new Event("submit", { bubbles: !0, cancelable: !0 }); l.dispatchEvent(i) } } }) } function clearCart() { localStorage.removeItem("cart"), updateCartCountIcon(0) } function resizeInput() { this.style.width = this.value.length + "ch" } function setElementsToReadOnly(e) { let t = [document.querySelector("#Grand-Total"), document.querySelector("#Total-Hidden"), document.querySelector("#Shipping"), document.querySelector("#Shipping-Hidden"), document.querySelector("#VAT"), document.querySelector("#Grand-Total"), document.querySelector("#Total"),]; t.forEach(e => { e.readOnly = !0, e.style.cursor = "auto" }) } export function checkoutDisplayCartItems(e) {
    let o = "", a = 0, c = 0, n = { "XX59 headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp", "XX99 Mark II Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp", "XX99 Mark I Headphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp", "YX1 Wireless Earphones": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp", "ZX7 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp", "ZX9 Speaker": "https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp" }, l = e.productInput ? e.productInput : document.querySelector("#Products"), i = e.checkoutTotalTextElem ? e.checkoutTotalTextElem : document.querySelector("#Total"), u = e.checkoutTotalTextElemHidden ? e.checkoutTotalTextElemHidden : document.querySelector("#Total-Hidden"), p = e.checkoutShippingTextElem ? e.checkoutShippingTextElem : document.querySelector("#Shipping"), m = e.checkoutShippingTextElemHidden ? e.checkoutShippingTextElemHidden : document.querySelector("#Shipping-Hidden"), s = e.checkoutVatTextElem ? e.checkoutVatTextElem : document.querySelector("#VAT"), d = e.checkoutVatTextElemHidden ? e.checkoutVatTextElemHidden : document.querySelector("#VAT-Hidden"), h = e.checkoutGrandTotalTextElem ? e.checkoutGrandTotalTextElem : document.querySelector("#Grand-Total"), y = e.checkoutGrandTotalTextElemHidden ? e.checkoutGrandTotalTextElemHidden : document.querySelector("#Grand-Total-Hidden"), k = e.checkoutOverlayItemName ? e.checkoutOverlayItemName : document.querySelector("#overlay-item-name"), f = e.checkoutOverlayItemPrice ? e.checkoutOverlayItemPrice : document.querySelector("#overlay-item-price"), S = e.checkoutOverlayItemQty ? e.checkoutOverlayItemQty : document.querySelector("#overlay-item-qty"), x = e.checkoutOverlayGrandTotalText ? e.checkoutOverlayGrandTotalText : document.querySelector("#overlay-grand-total"), I = e.checkoutOverlayBottomWrapper ? e.checkoutOverlayBottomWrapper : document.querySelector("#overlay-items-bottom-wrapper"), v = e.checkoutOverlayOtherItemsCountText ? e.checkoutOverlayOtherItemsCountText : document.querySelector("#overlay-other-items-count"), g = e.checkoutOverlayOtherItemsPlural ? e.checkoutOverlayOtherItemsPlural : document.querySelector("#overlay-other-items-plural"), T = e.checkoutOverlayOtherItemImage ? e.checkoutOverlayOtherItemImage : document.querySelector("#overlay-cart-item-img"), q = e.orderConfirmationGoHomeButton ? e.orderConfirmationGoHomeButton : document.querySelector("#order-confirmation-home"), E = t(); if (e.checkoutCartItemsContainer.innerHTML = "", 0 === E.length) { e.checkoutCartItemsContainer.innerHTML = "<p>Your cart is empty.</p>", e.checkoutTotalTextElem.textContent = "$ 0"; return } let b = r(E); for (let _ in b) if (c++, b.hasOwnProperty(_)) {
        let w = b[_]; a += w.price * w.quantity; let O = n[w.name]; o += `${c}) ${w.quantity}x ${w.name} = $${w.price * w.quantity} - `; let C = document.createElement("div"); C.classList.add("cart-item"), C.innerHTML = `
                <div class="checkout-cart-item">
                        <img class="checkout-cart-item-img" src="${O}">
                    <div class="checkout-cart-item-text-wrapper">
                        <p class="checkout-summary-item-heading">${w.cartName}</p>
                        <p class="checkout-summary-item-price">$ ${w.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <p class="checkout-summary-item-qty">x${w.quantity}</p>
                </div>
            `, e.checkoutCartItemsContainer.appendChild(C)
    } l.readOnly = !0, l.value = o.slice(0, -2), u.readOnly = !0; let H = [e.checkoutGrandTotalTextElem, e.checkoutTotalTextElemHidden, e.checkoutShippingTextElem, e.checkoutShippingTextElemHidden, e.checkoutVatTextElem, e.checkoutGrandTotalTextElem, e.checkoutTotalTextElem,]; setElementsToReadOnly(H); let A = a + 50, D = .2 * A; i.value = `$ ${a.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, u.value = a, p.value = "$ 50.00", m.value = 50, s.value = `$ ${D.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, d.value = D, h.value = `$ ${A.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, y.value = A, resizeInput.call(h); let G = Object.keys(b)[0], W = b[G]; k.textContent = `${W.cartName}`, f.textContent = `$ ${W.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, S.textContent = `x${W.quantity}`, x.textContent = `$ ${A.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; let L = Object.keys(b).length, X = n[W.name]; T.src = X, L > 1 && (I.style.display = "flex", v.textContent = `${L - 1}`, g.textContent = `${2 === L ? "" : "(s)"}`), q.addEventListener("click", function () { clearCart() })
} function validateEmail(e) { return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e) } function isNumericAndLength(e, t) { return !/^[0-9]+$/.test(e) || !!(e.length < t) } function updateInputActions(e, t, o, r, a) { a ? (e.style.border = "1px solid #cd2c2c", t.style.color = "#cd2c2c", o.style.display = "block", o.textContent = r) : (e.style.border = "1px solid #cfcfcf", t.style.color = "black", o.style.display = "none") } function checkInput(e, t) { let o = !1, r = { text: "Min. 3 characters", email: "Invalid email", phone: "Invalid phone number", emoneyNumber: "Must be 9 digits", emoneyPin: "Must be 4 digits" }, a = e.querySelector("input"), c = e.querySelector("label"), n = e.querySelector(".checkout-error-text"), l = a.value; return "text" === t ? l.length < 3 ? (updateInputActions(a, c, n, r[t], !0), o = !0) : updateInputActions(a, c, n, "", !1) : "email" === t ? validateEmail(l) ? updateInputActions(a, c, n, "", !1) : (updateInputActions(a, c, n, r[t], !0), o = !0) : "phone" === t ? isNumericAndLength(l, 9) ? (updateInputActions(a, c, n, r[t], !0), o = !0) : updateInputActions(a, c, n, "", !1) : "emoneyNumber" === t ? isNumericAndLength(l, 9) ? updateInputActions(a, c, n, "", !1) : (updateInputActions(a, c, n, r[t], !0), o = !0) : "emoneyPin" === t && (isNumericAndLength(l, 4) ? updateInputActions(a, c, n, "", !1) : (updateInputActions(a, c, n, r[t], !0), o = !0)), o } function checkRadioInputs(e) { let t = !0, o = e.querySelector("#e-money-radio"), r = e.querySelector("#cash-on-delivery-radio"), a = o.querySelector("input"), c = r.querySelector("input"), n = e.querySelector("#payment-method-label"), l = e.querySelector("#payment-method-error-text"), i = e.querySelector("#e-money-number-input-wrapper"), u = e.querySelector("#e-money-pin-input-wrapper"); return a.checked ? (t = !1, updateInputActions(o, n, l, "", !1), updateInputActions(r, n, l, "", !1), checkInput(i, "emoneyNumber"), checkInput(u, "emoneyPin")) : c.checked ? (t = !1, updateInputActions(o, n, l, "", !1), updateInputActions(r, n, l, "", !1)) : (updateInputActions(o, n, l, "Please select a payment method", !0), updateInputActions(r, n, l, "Please select a payment method", !0)), t }