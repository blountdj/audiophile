// console.log('categoriesAnimations.js')
import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v7/min/js/config-min.js";
const {
    navBarFadeIn,
    animateSpin,
    fadeIn,
    addShuffleEffect,
    scaleToZero,
    heroIntroLoad
} = await import(`${CONFIG.path}${CONFIG.jsPath}animations${CONFIG.min}.js`);


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

    new SplitType(container.querySelector('.category-h1'), { types: "words, chars" });
    new SplitType(container.querySelector('.category-item-h2'), { types: "words, chars" });

    const elem = getCategoryElement(container)

    gsap.set(elem.catHero, {
        yPercent: -100
    })

    gsap.set(elem.catImgWrapper, { opacity: 0, xPercent: -100 })

    gsap.set(elem.catNewProduct, { opacity: 0, yPercent: 100 })

    gsap.set([elem.catTitle], { yPercent: -250, rotate: -15 });
    gsap.set([elem.catTitleChars], { yPercent: -100 });

    gsap.set([elem.catBtnElemTop, elem.catBtnElemBottom], {
        scaleY: 1,
    });

    gsap.set(elem.catH2Chars, {
        color: 'transparent'
    });

    gsap.set([elem.catParagraph, elem.catBtnText], {
        opacity: 0,
    });
}

function catHeroMoveTest(elem) {
    // console.log('heroMoveTest')
    const tl = gsap.timeline({ defaults: { duration: 0.75, ease: 'power4.inout' } });
    tl.to(elem.catImgWrapper, { opacity: 1, xPercent: 0, duration: 0.25, ease: 'power4.inout' })
}

const moveToZeroYPercent = (element) => {
    gsap.to(element, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power4.inout'
    })
}

export const categoryAnimation = async (container, introSelector) => {

    const catElem = getCategoryElement(container)

    gsap.timeline({ defaults: { ease: 'power4.inout' } })
        .add(() => navBarFadeIn(catElem.catNavBarA), 0) // Starts 0.75s after the previous animation
        .add(() => heroIntroLoad(container, introSelector), 0.5)
        .add(() => animateSpin(catElem.catTitle, catElem.catTitleChars), 0.8) // Starts 0.75s after the previous animation
        .add(() => catHeroMoveTest(catElem), 1.5) // Starts 0.75s after the previous animation
        .add(() => addShuffleEffect(catElem.catH2, catElem.catH2Chars, 'black'), 1.7) // Starts 0.5s after the previous animation
        .add(() => fadeIn(catElem.catParagraph), 2.3) // Starts 0.75s after the previous animation
        .add(() => scaleToZero(catElem.catBtnElemTop, 'top'), 2.4) // Starts 1s after the previous animation
        .add(() => scaleToZero(catElem.catBtnElemBottom, 'bottom'), 2.4) // Starts 1s after the previous animation
        .add(() => fadeIn(catElem.catBtnText), 2.6) // Starts 0.75s after the previous animation
        .add(() => moveToZeroYPercent(catElem.catNewProduct), 3) // Starts 0.75s after the previous animation         
    // .add(() => updateH1AfterShuffle(elems.productH2Chars, 'black'), 4)
}
