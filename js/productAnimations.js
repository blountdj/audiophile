
import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v9/min/js/config-min.js";

const {
    navBarFadeIn,
    animateSpin,
    fadeIn,
    addShuffleEffect,
    scaleToZero,
    updateH1AfterShuffle
} = await import(`${CONFIG.path}${CONFIG.jsPath}animations${CONFIG.min}.js`);

const getHeroElement = (container) => {
    return {
        productImgWrapper: container.querySelector('.product-image-wrapper-wrapper'),
        productImgTextWrapper: container.querySelector('.product-page-text-wrapper'),
        productTextParagraph: container.querySelector('.headphone-text-paragraph'),

        productNavBarA: container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper'),

        productH2: container.querySelector('.category-item-h2'),
        productH2Chars: container.querySelectorAll('.category-item-h2 > .word > .char'),

        productPrice: container.querySelector('.product-price-wrapper-title'),
        productPriceChars: container.querySelectorAll('.product-price > .word > .char'),

        addToCartBtn: container.querySelector('#add-to-cart'),

        btnElemTop: container.querySelector('.btn-elem-top'),
        btnElemBottom: container.querySelector('.btn-elem-bottom'),

        prodBtnText: container.querySelector('.btn-1-text'),
    }
}

export function initProductAnimations(container) {
    // console.log('initProductAnimations1')
    new SplitType(container.querySelector('h1'), { types: "words, chars" });
    new SplitType(container.querySelector('.product-price'), { types: "words, chars" });

    const heroElement = getHeroElement(container)
    gsap.set([heroElement.productTextParagraph, heroElement.prodBtnText
    ], {
        opacity: 0,
    });

    gsap.set([heroElement.btnElemTop, heroElement.btnElemBottom], {
        scaleY: 1,
    });

    gsap.set(heroElement.productH2Chars, {
        color: 'transparent'
    });

    gsap.set([heroElement.productPrice], { yPercent: -285, rotate: -15 }); // 285
    gsap.set([heroElement.productPriceChars], { yPercent: -100 });

    gsap.set([heroElement.productImgWrapper], { opacity: 0, xPercent: -100 });
    gsap.set([heroElement.productImgTextWrapper], { opacity: 0, xPercent: 100 });
}

function heroMoveTest(elem) {
    // console.log('heroMoveTest')

    // Initial animations
    gsap.to(elem, {
        opacity: 1,
        xPercent: 1,
        duration: 0.75,
        ease: 'power4.inout'
    })
}

export const productsHeroEnter = async (container) => {
    // console.log('productsHeroEnter')

    const elems = getHeroElement(container)
    gsap.timeline({ defaults: { ease: 'power4.inout' } })
        .add(() => navBarFadeIn(elems.productNavBarA), 0)
        .add(() => heroMoveTest(elems.productImgWrapper), 0.5)
        .add(() => heroMoveTest(elems.productImgTextWrapper), 0.5)
        .add(() => addShuffleEffect(elems.productH2, elems.productH2Chars, 'black'), 0.75)
        .add(() => fadeIn(elems.productTextParagraph), 1)
        .add(() => animateSpin(elems.productPrice, elems.productPriceChars), 1.1)
        .add(() => scaleToZero(elems.btnElemTop, 'top'), 1.7)
        .add(() => scaleToZero(elems.btnElemBottom, 'bottom'), 1.7)
        .add(() => fadeIn(elems.prodBtnText), 1.7)
        .add(() => updateH1AfterShuffle(elems.productH2Chars, 'black'), 3)
}
