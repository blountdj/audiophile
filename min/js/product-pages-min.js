import { CONFIG as t } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v12/min/js/config-min.js"; let { showCartCountIcon: e, addCartItemsCount: a } = await import(`${t.path}${t.jsPath}cart-quantity-icon${t.min}.js`), { enableCheckoutBtn: r, getCartItems: i, applyAnimationClass: c } = await import(`${t.path}${t.jsPath}common${t.min}.js`); function addItemToCart(t) { let e = i(), a = !1; e.forEach(e => { e.id === t.id && (e.quantity += 1, e.subtotal = e.subtotal + t.price, a = !0) }), a || e.push({ id: t.id, name: t.name, cartName: t.cartName, price: t.price, quantity: 1, subtotal: t.price }), localStorage.setItem("cart", JSON.stringify(e)) } export const initProductPage = t => { let i = t.querySelector("#add-to-cart"); i.addEventListener("click", function () { let i = { id: this.getAttribute("data-id"), name: t.querySelector("#product-name").getAttribute("data-name"), cartName: t.querySelector("#product-name").getAttribute("data-cart-name"), price: parseFloat(t.querySelector("#product-price").getAttribute("data-price")), quantity: 1, subtotal: parseFloat(t.querySelector("#product-price").getAttribute("data-price")) }; addItemToCart(i); let o = document.querySelector("#nav-cart-items-count"); "0" === o.innerHTML ? (a(), e(), r()) : (c(o, "pop-part-1"), setTimeout(() => { a() }, 250)) }) };