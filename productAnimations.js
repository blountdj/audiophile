

import { 
    // colorChange, 
    navBarFadeIn,
    animateSpin,
    fadeIn,
    addShuffleEffect,
    scaleToZero,
    heroIntroLoad
 } from "./animations.js";

const getHeroElement = (container) => {
    return {
        productImgWrapper: container.querySelector('.product-image-wrapper-wrapper'),
        productImgTextWrapper: container.querySelector('.product-page-text-wrapper'),
        productTextParagraph: container.querySelector('.headphone-text-paragraph'),

        productNavBarA: container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper'),

        productH2: container.querySelector('.category-item-h2'),
        productH2Chars: container.querySelectorAll('.category-item-h2 > .word > .char'),

        productPrice: container.querySelector('.product-price-wrapper-title'),
        productPriceChars: container.querySelectorAll('.product-pirce > .word > .char'),

        addToCartBtn: container.querySelector('#add-to-cart'),
        
        btnElemTop: container.querySelector('.btn-elem-top'),
        btnElemBottom: container.querySelector('.btn-elem-bottom'),

        prodBtnText: container.querySelector('.btn-1-text'),

    }
}

export function initProductAnimations(container) {
    console.log('initProductAnimations')
    new SplitType(container.querySelector('h1'), {types: "words, chars"});
    new SplitType(container.querySelector('.product-pirce'), {types: "words, chars"});

    // container.querySelector('.product-pirce')
    // new SplitType(heroElement.productpriceWrapper, {types: "words, chars"});
    
    const heroElement = getHeroElement(container)


    // return new Promise((resolve, reject) => {

        gsap.set([heroElement.productH2, heroElement.productH2Chars, heroElement.productTextParagraph,
            heroElement.prodBtnText
        ], {
            opacity: 0,
        });

        gsap.set([heroElement.btnElemTop, heroElement.btnElemBottom], {
            scaleY: 1,
        });

        gsap.set([heroElement.productPrice], { yPercent: -285, rotate: -15 }); // 285
        gsap.set([heroElement.productPriceChars], { yPercent: -100 });

        gsap.set([heroElement.productImgWrapper], { opacity: 0, xPercent: -100 });
        gsap.set([heroElement.productImgTextWrapper], { opacity: 0, xPercent: 100 });



        // resolve();
    // });
}

function heroMoveTest(elem) {
    console.log('heroMoveTest')
    // const tl = gsap.timeline({ defaults: { duration: 0.75, ease: 'power4.inout' } });
    
    // Initial animations
    gsap.to(elem, { 
        opacity: 1, 
        xPercent: 1, 
        duration: 0.75, 
        ease: 'power4.inout' 
    })
    // tl.to(heroElement.productImgTextWrapper, { opacity: 1, xPercent: 100, duration: 0.25, ease: 'power4.inout' }, '<') // '<' means at the same time as the previous animation
        
}

export const productsHeroEnter = async (container) => {
    console.log('productsHeroEnter')
    
    const heroElement = getHeroElement(container)
    
    gsap.timeline({ defaults: { ease: 'power4.inout' } })
       .add(() => navBarFadeIn(heroElement.productNavBarA), 0) // Starts 0.75s after the previous animation
       .add(() => heroMoveTest(heroElement.productImgWrapper), 0.5) // Starts at 0s
       .add(() => heroMoveTest(heroElement.productImgTextWrapper), 0.5) // Starts at 0s
       .add(() => addShuffleEffect(heroElement.productH2, heroElement.productH2Chars), 0.5) // Starts 0.5s after the previous animation
       .add(() => fadeIn(heroElement.productTextParagraph), 1) // Starts 0.75s after the previous animation
       .add(() => animateSpin(heroElement.productPrice, heroElement.productPriceChars), 1.1) // Starts 0.75s after the previous animation
       .add(() => scaleToZero(heroElement.btnElemTop, 'top'), 1.7) // Starts 1s after the previous animation
       .add(() => scaleToZero(heroElement.btnElemBottom, 'bottom'), 1.7) // Starts 1s after the previous animation
       .add(() => fadeIn(heroElement.prodBtnText), 1.7) // Starts 0.75s after the previous animation
}