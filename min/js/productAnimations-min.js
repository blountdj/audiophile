import { CONFIG as e } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v11/min/js/config-min.js"; let { navBarFadeIn: t, animateSpin: r, fadeIn: o, addShuffleEffect: a, scaleToZero: p, updateH1AfterShuffle: c } = await import(`${e.path}${e.jsPath}animations${e.min}.js`), getHeroElement = e => ({ productImgWrapper: e.querySelector(".product-image-wrapper-wrapper"), productImgTextWrapper: e.querySelector(".product-page-text-wrapper"), productTextParagraph: e.querySelector(".headphone-text-paragraph"), productNavBarA: e.querySelectorAll(".navbar > a, nav > a, .nav-cart-icon-wrapper"), productH2: e.querySelector(".category-item-h2"), productH2Chars: e.querySelectorAll(".category-item-h2 > .word > .char"), productPrice: e.querySelector(".product-price-wrapper-title"), productPriceChars: e.querySelectorAll(".product-price > .word > .char"), addToCartBtn: e.querySelector("#add-to-cart"), btnElemTop: e.querySelector(".btn-elem-top"), btnElemBottom: e.querySelector(".btn-elem-bottom"), prodBtnText: e.querySelector(".btn-1-text") }); export function initProductAnimations(e) { new SplitType(e.querySelector("h1"), { types: "words, chars" }), new SplitType(e.querySelector(".product-price"), { types: "words, chars" }); let t = getHeroElement(e); gsap.set([t.productTextParagraph, t.prodBtnText], { opacity: 0 }), gsap.set([t.btnElemTop, t.btnElemBottom], { scaleY: 1 }), gsap.set(t.productH2Chars, { color: "transparent" }), gsap.set([t.productPrice], { yPercent: -285, rotate: -15 }), gsap.set([t.productPriceChars], { yPercent: -100 }), gsap.set([t.productImgWrapper], { opacity: 0, xPercent: -100 }), gsap.set([t.productImgTextWrapper], { opacity: 0, xPercent: 100 }) } function heroMoveTest(e) { gsap.to(e, { opacity: 1, xPercent: 1, duration: .75, ease: "power4.inout" }) } export const productsHeroEnter = async e => { let d = getHeroElement(e); gsap.timeline({ defaults: { ease: "power4.inout" } }).add(() => t(d.productNavBarA), 0).add(() => heroMoveTest(d.productImgWrapper), .5).add(() => heroMoveTest(d.productImgTextWrapper), .5).add(() => a(d.productH2, d.productH2Chars, "black"), .75).add(() => o(d.productTextParagraph), 1).add(() => r(d.productPrice, d.productPriceChars), 1.1).add(() => p(d.btnElemTop, "top"), 1.7).add(() => p(d.btnElemBottom, "bottom"), 1.7).add(() => o(d.prodBtnText), 1.7).add(() => c(d.productH2Chars, "black"), 3) };