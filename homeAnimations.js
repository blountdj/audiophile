console.log('homeAnimations.js')

 import { 
    scaleToZero,
    fadeIn,
    navBarFadeIn, 
    typeTextIndividual
 } from "./animations.js";

import { addShuffleEffect } from "./animations.js";




export function heroIntroLoad2(elem, delay = 0) {
    // console.log('heroIntroLoad2')
    gsap.to(elem, {
        yPercent: 0,
        duration: 0.75,
        delay: delay,
        ease: 'power4.inOut'
    })
}

function colorChange(element) {
    gsap.to(element,  {
        // color: '#fff',
        opacity: 1,
        duration: 0.75,
        ease: 'power3.inout',
    })
}

export const getHomeElement = (container) => {
    return {

        hero: container.querySelector('.home-hero'),
        heroMask: container.querySelector('.hero-mask'),
        navBarA: container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper'),
        heroMain: container.querySelector('.hero-main'),
        typedTextElem: container.querySelector('.typed-text'),
        btnElemTop: container.querySelector('.btn-elem-top'),
        btnElemBottom: container.querySelector('.btn-elem-bottom'),
        btnText: container.querySelector('.btn-1-text'),
        heroParagraph: container.querySelector('.hero-text-paragraph'),
        
        title: container.querySelector('.home-hero-h1'),
        titleChars: container.querySelectorAll('.home-hero-h1 > .word > .char'),

        // catImgWrapper: container.querySelector('.category-item-image-wrapper-wrapper'),
        // catH2: container.querySelector('.category-item-h2'),
        // catH2Chars: container.querySelectorAll('.category-item-h2 > div > div'),

        // catNewProduct: container.querySelector('.typed-text'),
    
    }
}

export const homeInit = (homeElem) => {
    gsap.set(homeElem.hero, { yPercent: -105 })
    homeElem.typedTextElem.textContent = '';
    gsap.set(homeElem.heroMask, { opacity: 1 })
    gsap.set([homeElem.btnElemTop, homeElem.btnElemBottom], {
        scaleY: 1,
    });
    gsap.set(homeElem.btnText, {
        // color: '#d87d4a',
        opacity: 0
    });
    gsap.set([homeElem.title, homeElem.titleChars, homeElem.heroParagraph], {
        opacity: 0
    });
}

const heroMaskFadeOut = (elem) => {
    gsap.to(elem, { opacity: 0, duration: 0.75, ease: 'power4.inOut' })
}



function homeIntroAnimation(homeElem, container) {
    gsap.timeline({ defaults: { ease: 'power4.inout' }})

    .add(() => navBarFadeIn(homeElem.navBarA), 0.4)
    .add(() => heroIntroLoad2(homeElem.hero), 0.8)
    .add(() => addShuffleEffect(homeElem.title, homeElem.titleChars), 1.7)
    .add(() => heroMaskFadeOut(homeElem.heroMask), 1.5)
    .add(() => fadeIn(homeElem.heroParagraph), 2.5) 
    .add(() => scaleToZero(homeElem.btnElemTop, 'top'), 3) // Starts 1s after the previous animation
    .add(() => scaleToZero(homeElem.btnElemBottom, 'bottom'), 3) // Starts 1s after the previous animation
    .add(() => colorChange(homeElem.btnText), 3.5) // Starts 0.75s after the previous animation
    .add(() => {
        let typingAnimation = typeTextIndividual(container, 'new product');
        typingAnimation.play()
    }, 4.5)
}

export function homeLoadController(container, runAnimation = true) {
    console.log('homeLoadController')

    new SplitType(container.querySelector('.home-hero-h1'), {types: "words, chars"});

    const homeElem = getHomeElement(container)
    // console.log('homeElem:', homeElem)

    homeInit(homeElem)

    if (runAnimation) {
        homeIntroAnimation(homeElem, container)
    }
}

export function heroOutro(container, selector) {
    console.log('heroOutro')
    const hero = container.querySelector(selector)
    return new Promise((resolve) => {
        gsap.to(hero, {
            yPercent: -100,
            duration: 0.75,
            ease: 'power4.inOut',
            onComplete: resolve
        });
    });
}


