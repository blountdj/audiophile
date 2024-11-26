import { CONFIG as t } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v4/min/js/config-min.js"; let { navBarFadeIn: e, animateSpin: a, fadeIn: r, addShuffleEffect: o, scaleToZero: c, heroIntroLoad: n } = await import(`${t.path}${t.jsPath}animations${t.min}.js`), getCategoryElement = t => ({ catHero: t.querySelector(".category-hero"), catNavBarA: t.querySelectorAll(".navbar > a, nav > a, .nav-cart-icon-wrapper"), catTitle: t.querySelector(".category-h1"), catTitleChars: t.querySelector(".category-h1 > div"), catImgWrapper: t.querySelector(".category-item-image-wrapper-wrapper"), catH2: t.querySelector(".category-item-h2"), catH2Chars: t.querySelectorAll(".category-item-h2 > .word > .char"), catNewProduct: t.querySelector(".typed-text"), catParagraph: t.querySelector(".headphone-text-paragraph"), catBtnElemTop: t.querySelector(".btn-elem-top"), catBtnElemBottom: t.querySelector(".btn-elem-bottom"), catBtn: t.querySelector(".btn-1"), catBtnText: t.querySelector(".btn-1-text") }); export function initCategoriesAnimations(t) { new SplitType(t.querySelector(".category-h1"), { types: "words, chars" }), new SplitType(t.querySelector(".category-item-h2"), { types: "words, chars" }); let e = getCategoryElement(t); gsap.set(e.catHero, { yPercent: -100 }), gsap.set(e.catImgWrapper, { opacity: 0, xPercent: -100 }), gsap.set(e.catNewProduct, { opacity: 0, yPercent: 100 }), gsap.set([e.catTitle], { yPercent: -250, rotate: -15 }), gsap.set([e.catTitleChars], { yPercent: -100 }), gsap.set([e.catBtnElemTop, e.catBtnElemBottom], { scaleY: 1 }), gsap.set([e.catParagraph, e.catH2, e.catH2Chars, e.catBtnText], { opacity: 0 }) } function catHeroMoveTest(t) { let e = gsap.timeline({ defaults: { duration: .75, ease: "power4.inout" } }); e.to(t.catImgWrapper, { opacity: 1, xPercent: 0, duration: .25, ease: "power4.inout" }) } let moveToZeroYPercent = t => { gsap.to(t, { yPercent: 0, opacity: 1, duration: .75, ease: "power4.inout" }) }; export const categoryAnimation = async (t, i) => { let l = getCategoryElement(t); gsap.timeline({ defaults: { ease: "power4.inout" } }).add(() => e(l.catNavBarA), 0).add(() => n(t, i), .5).add(() => a(l.catTitle, l.catTitleChars), .8).add(() => catHeroMoveTest(l), 1.5).add(() => o(l.catH2, l.catH2Chars), 1.7).add(() => r(l.catParagraph), 2.3).add(() => c(l.catBtnElemTop, "top"), 2.4).add(() => c(l.catBtnElemBottom, "bottom"), 2.4).add(() => r(l.catBtnText), 2.6).add(() => moveToZeroYPercent(l.catNewProduct), 3) };