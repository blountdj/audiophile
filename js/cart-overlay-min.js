import{CONFIG as t}from"https://cdn.jsdelivr.net/gh/blountdj/audiophile@v3/min/js/config-min.js";let{enableCheckoutBtn:e,disableCheckoutBtn:a,getCartItems:r,getItemDictionary:c,applyAnimationClass:o,getCartItemsQty:n}=await import(`${t.path}${t.jsPath}common${t.min}.js`),{addCartItemsCount:i,minusCartItemsCount:l,updateCartCountIcon:s}=await import(`${t.path}${t.jsPath}cart-quantity-icon${t.min}.js`),{checkoutDisplayCartItems:m}=await import(`${t.path}${t.jsPath}checkout${t.min}.js`),productImages={"XX59 headphones":"https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7babf36e28a4099e1_image-xx59-headphones.webp","XX99 Mark II Headphones":"https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7a5febb3d1293a126_image-xx99-mark-two-headphones.webp","XX99 Mark I Headphones":"https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a7f2e9d0fead12a5c1_image-xx99-mark-one-headphones.webp","YX1 Wireless Earphones":"https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a9ffc4960e95071c19_image-yx1-earphones.webp","ZX7 Speaker":"https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a778d4e0d0ff09b076_image-zx7-speaker.webp","ZX9 Speaker":"https://uploads-ssl.webflow.com/668513a42a5375354f72cff0/668817a82554a6dd42ae0c7b_image-zx9-speaker.webp"};function goToCheckoutBtnClick(t,e){let a=e.overlay?e.overlay:document.querySelector("#cart-overlay"),r="none"===a.style.display?"flex":"none";a.style.display=r}function toggleOverlayDisplay(t,e){let a=t.target.closest('[data-toggle="close-cart-overlay"]'),r=e.overlay?e.overlay:document.querySelector("#cart-overlay");function c(t){let a=document.querySelector(".cart-summary-block"),r=a.contains(t.target),c=t.target.closest('[data-toggle="close-cart-overlay"]');r||c||toggleOverlayDisplay(t,e)}a&&r.classList.contains("is-closed")?(r.classList.remove("is-closed"),setTimeout(()=>{e.cartSummaryBlock.classList.remove("is-closed")},10),r.style.display="flex",cartDisplayCartItems(e),document.addEventListener("click",c)):(r.classList.add("is-closed"),e.cartSummaryBlock.classList.add("is-closed"),setTimeout(()=>{e.overlay.style.display="none"},200),document.removeEventListener("click",c))}function cartDisplayCartItems(t,e=null){let o=0,n=0,i=t.cartItemsContainer?t.cartItemsContainer:document.querySelector(".cart-items"),l=t.totalText?t.totalText:document.querySelector("p#total");if(e||(e=r()),0===e.length){i.innerHTML="<p>Your cart is empty.</p>",l.textContent="$ 0",a();return}i.innerHTML="";let s=c(e);for(let m in s)if(s.hasOwnProperty(m)){let u=s[m];o+=u.price*u.quantity,n+=u.quantity;let p=productImages[u.name],d=document.createElement("div");d.classList.add("cart-item"),d.innerHTML=`
          <div class="cart-item">
            <div class="cart-item-block-left">
        		  <img class="cart-item-img" src="${p}">
              <div class="cart-item-text-wrapper">
                <p class="cart-summary-item-heading">${u.cartName}</p>
                <p class="cart-summary-item-price">$ ${u.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
              </div>            
            </div>            
            <div class="cart-item-block-left">
              <div class="cart-number-input-wrapper">
                <p class="cart-number-adjuster is-minus" data-id=${u.id} data-name="${u.name}" data-price=${u.price} data-cartname="${u.cartName}">-</p>
                <p class="cart-input-number">${u.quantity}</p>
                <p class="cart-number-adjuster is-plus" data-id=${u.id} data-name="${u.name}" data-price=${u.price} data-cartname="${u.cartName}">+</p>
              </div>
              <div class="cart-bin-icon-wrapper" data-id=${u.id}>
                <div class="cart-bin-icon">
                  <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.73708 6.54391V18.9857C5.73708 19.7449 6.35257 20.3604 7.11182 20.3604H16.8893C17.6485 20.3604 18.264 19.7449 18.264 18.9857V6.54391M2.90906 6.54391H21.0909" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path> <path d="M8 6V4.41421C8 3.63317 8.63317 3 9.41421 3H14.5858C15.3668 3 16 3.63317 16 4.41421V6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path> </g></svg>
                </div>
              </div>
            </div>
          </div>
        `,i.appendChild(d)}l.textContent=`$ ${o.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,t.cartQtyText.textContent=`(${n})`,cartSetQtyAdjustmentBtns(t);let y=document.querySelectorAll(".cart-bin-icon-wrapper");y.forEach(e=>{e.addEventListener("click",e=>{let a=e.target.closest(".cart-bin-icon");a&&removeItemFromCart(e,t)})})}function checkoutRemoveCartItems(t){t.checkoutCartItemsContainer.innerHTML="<p>Your cart is empty.</p>",t.totalText.textContent="$ 0",t.checkoutShippingTextElem.textContent="$ 0",t.checkoutVatTextElem.textContent="$ 0",t.checkoutGrandTotalTextElem.textContent="$ 0",t.orderConfirmationGoHomeButton.addEventListener("click",function(){t.checkoutOverlayElem.style.display="none",clearCart(t)})}function cartHandleQtyChangeClick(t,m){let u=r(),p=n(u),d=c(u),y=t.target,h=y.dataset.name,g;t.target.classList.contains("is-plus")&&(d[h].quantity=parseInt(d[h].quantity)+1,d[h].subtotal=parseInt(d[h].subtotal)*(parseInt(d[h].quantity)+1),localStorage.setItem("cart",JSON.stringify(Object.values(d))),cartDisplayCartItems(m,u=r()),1===(g=p+1)?(e(m),showCartCountIcon(),i()):(o(m.navCartQtyCountElem,"pop-part-1"),setTimeout(()=>{i()},250))),t.target.classList.contains("is-minus")&&0!==d[h].quantity&&(d[h].quantity=parseInt(d[h].quantity)-1,localStorage.setItem("cart",JSON.stringify(Object.values(d))),cartDisplayCartItems(m,u=r()),0==(g=p-1)?(a(),o(m.navCartQtyCountElem,"pop-to-nothing"),setTimeout(()=>{s(0)},400)):(o(m.navCartQtyCountElem,"pop-part-1"),setTimeout(()=>{l()},250))),updateCheckoutPage(m)}function cartSetQtyAdjustmentBtns(t){let e=document.querySelectorAll(".cart-number-adjuster.is-plus"),a=document.querySelectorAll(".cart-number-adjuster.is-minus");e.forEach(e=>{e.addEventListener("click",e=>cartHandleQtyChangeClick(e,t))}),a.forEach(e=>{e.addEventListener("click",e=>cartHandleQtyChangeClick(e,t))})}function clearCart(t){localStorage.removeItem("cart");let e=t.cartQtyText?t.cartQtyText:document.querySelector("#cart-qty");o(document.querySelector("#nav-cart-items-count"),"pop-to-nothing"),setTimeout(()=>{s(0)},400),cartDisplayCartItems(t),e.textContent="",a(),updateCheckoutPage(t)}function updateCheckoutPage(t){let e=window.location.pathname,a=e.substring(e.lastIndexOf("/")+1);"checkout"===a&&m(t)}function removeItemFromCart(t,e){let a=t.target.closest(".cart-bin-icon-wrapper"),c=a.dataset.id;(e.itemToDelete?e.itemToDelete:t.target.closest(".cart-item")).classList.add("to-delete");let i=r();i=i.filter(t=>t.id!==c),localStorage.setItem("cart",JSON.stringify(i));let l=n(i);0===l?s(l):(o(e.navCartQtyCountElem,"pop-part-1"),setTimeout(()=>{s(l)},250)),setTimeout(()=>{cartDisplayCartItems(e,i),e.cartQtyText.textContent=`(${l})`},500),updateCheckoutPage(e)}function getOverlayElems(t){return{cartIcon:t.querySelector("#nav-cart-icon"),removeAllLink:document.querySelector(".remove-all-link"),overlay:document.querySelector("#cart-overlay"),cartSummaryBlock:document.querySelector("#cart-summary-block"),overlayCloseBtn:document.querySelector("#overlay-close-btn"),goToCheckoutBtn:document.querySelector("#go-to-checkout-btn"),cartItemsContainer:document.querySelector(".cart-items"),cartQtyText:document.querySelector("#cart-qty"),totalText:document.querySelector("p#total"),cartDeleteBtns:document.querySelectorAll(".cart-bin-icon-wrapper"),checkoutCartItemsContainer:document.querySelector(".checkout-cart-items"),checkoutShippingTextElem:t.querySelector("#Shipping"),checkoutVatTextElem:t.querySelector("#VAT"),checkoutGrandTotalTextElem:t.querySelector("#Grand-Total"),orderConfirmationGoHomeButton:t.querySelector("#order-confirmation-home"),navCartQtyCountElem:document.querySelector("#nav-cart-items-count"),cartIncreaseBtns:document.querySelectorAll(".cart-number-adjuster.is-plus"),cartDecreaseBtns:document.querySelectorAll(".cart-number-adjuster.is-minus")}}export function cartOverlayInit(t){let e=getOverlayElems(t);e.cartIcon.addEventListener("click",t=>toggleOverlayDisplay(t,e)),e.removeAllLink.addEventListener("click",e=>clearCart(t)),e.overlayCloseBtn.addEventListener("click",t=>toggleOverlayDisplay(t,e)),e.goToCheckoutBtn.addEventListener("click",t=>goToCheckoutBtnClick(t,e))}