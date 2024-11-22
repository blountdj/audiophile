console.log('categoriesAnimations.js')

import { 
    navBarFadeIn,
    animateSpin,
    fadeIn,
    addShuffleEffect,
    scaleToZero,
    heroIntroLoad
 } from "./animations.js";


// export function categoriesHeroOutro(data) {
//     console.log('categoriesHeroOutro')
//     const categoryHero = data.current.container.querySelector('.category-hero')
//     return new Promise((resolve) => {
//         gsap.to(categoryHero, {
//             yPercent: -100,
//             duration: 1,
//             ease: 'power2.inOut',
//             onComplete: resolve
//         });
//     });
// }

// export function categoriesHeroIntro(data) {
//     console.log('categoriesHeroOutro')
//     const categoryHero = data.current.container.querySelector('.category-hero')
//     return new Promise((resolve) => {
//         gsap.to(categoryHero, {
//             yPercent: -100,
//             duration: 1,
//             ease: 'power2.inOut',
//             onComplete: resolve
//         });
//     });
// }



const getCategoryElement = (container) => {
    return {

        catHero: container.querySelector('.category-hero'),
        // catNavBarA: document.querySelectorAll('.navbar > a, nav > a'),
        catNavBarA: container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper'),
        catTitle: container.querySelector('.category-h1'),
        catTitleChars: container.querySelector('.category-h1 > div'),

        catImgWrapper: container.querySelector('.category-item-image-wrapper-wrapper'),
        catH2: container.querySelector('.category-item-h2'),
        catH2Chars: container.querySelectorAll('.category-item-h2 > .word > .char'),

        catNewProduct: container.querySelector('.typed-text'),
        catParagraph: container.querySelector('.headphone-text-paragraph'),
        catBtnElemTop: container.querySelector('.btn-elem-top'),
        catBtnElemBottom: container.querySelector('.btn-elem-bottom'),

        catBtn: container.querySelector('.btn-1'),
        catBtnText: container.querySelector('.btn-1-text'),
    }
}

export function initCategoriesAnimations(container) {
    // return new Promise((resolve, reject) => {

        // console.log('initCategories')
        // console.log('elem.catTitleChars:', elem.catTitleChars)
        new SplitType(container.querySelector('.category-h1'), {types: "words, chars"});
        new SplitType(container.querySelector('.category-item-h2'), {types: "words, chars"});
        
        const elem = getCategoryElement(container)

        gsap.set(elem.catHero, {
            yPercent: -100
        })
    
        gsap.set(elem.catImgWrapper, { opacity: 0, xPercent: -100 })

        gsap.set(elem.catNewProduct, { opacity: 0, yPercent: 100 })

        gsap.set([elem.catTitle], { yPercent: -250, rotate: -15 });
        gsap.set([elem.catTitleChars], { yPercent: -100 });

        // gsap.set(elem.catBtnText, {
        //     color: '#d87d4a',
        // });

        gsap.set([elem.catBtnElemTop, elem.catBtnElemBottom], {
            scaleY: 1,
        });

        gsap.set([elem.catParagraph, elem.catH2, elem.catH2Chars, elem.catBtnText], {
            opacity: 0,
        });

        // resolve();
    // });
}

function catHeroMoveTest(elem) {
    // console.log('heroMoveTest')
    const tl = gsap.timeline({ defaults: { duration: 0.75, ease: 'power4.inout' } });
    
    // Initial animations
    tl.to(elem.catImgWrapper, { opacity: 1, xPercent: 0, duration: 0.25, ease: 'power4.inout' })
    // tl.from(elem.productImgTextWrapper, { opacity: 0, xPercent: 100, duration: 0.25, ease: 'power4.inout' }, '<') // '<' means at the same time as the previous animation
        
}

const moveToZeroYPercent = (element) => {
    gsap.to(element, { 
        yPercent: 0, 
        opacity: 1,
        duration: 0.75, 
        ease: 'power4.inout' })
}

export const categoryAnimation = async (container, introSelector) => {
    
    const catElem = getCategoryElement(container)

    gsap.timeline({ defaults: { ease: 'power4.inout' }})
        .add(() => navBarFadeIn(catElem.catNavBarA), 0) // Starts 0.75s after the previous animation
        .add(() => heroIntroLoad(container, introSelector), 0.5)
        .add(() => animateSpin(catElem.catTitle, catElem.catTitleChars), 0.8) // Starts 0.75s after the previous animation
        .add(() => catHeroMoveTest(catElem), 1.5) // Starts 0.75s after the previous animation
        .add(() => addShuffleEffect(catElem.catH2, catElem.catH2Chars), 1.7) // Starts 0.5s after the previous animation
        .add(() => fadeIn(catElem.catParagraph), 2.3) // Starts 0.75s after the previous animation
        .add(() => scaleToZero(catElem.catBtnElemTop, 'top'), 2.4) // Starts 1s after the previous animation
        .add(() => scaleToZero(catElem.catBtnElemBottom, 'bottom'), 2.4) // Starts 1s after the previous animation
        .add(() => fadeIn(catElem.catBtnText), 2.6) // Starts 0.75s after the previous animation
        .add(() => moveToZeroYPercent(catElem.catNewProduct), 3) // Starts 0.75s after the previous animation
            
}
