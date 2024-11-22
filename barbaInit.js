console.log('barbaInit.js loaded')

import { CONFIG } from "./config.js";
import { 
    removeScriptsFromBody,
    addScriptsToBody,
    addFilesCssToBody,
    removeCssFilesFromBody,
    createCSSFileLink,
} from "./utilities.js";

import { cartQtyIconInit } from "./cart-quantity-icon.js";
import { cartOverlayInit } from "./cart-overlay.js";
import { homeIntroAnimation, homeAnimationsInit } from "./homeAnimations.js";
import { navbarInit } from "./navbar.js";
import { checkoutInit } from "./checkout.js"
import { checkoutAnimationsInit, checkoutAnimations } from "./checkoutAnimations.js";

import { 
    // initTransition, 
    transitionInit,
    leaveTransition, 
} from "./transitionAnimation.js";

import { initProductPage } from "./product-pages.js";
import { productsHeroEnter, initProductAnimations } from "./productAnimations.js";

import { 
   navBarFadeIn,
   typeTextIndividual,
   fadeOutNavA,
   heroIntroLoad
} from "./animations.js";

import { homeInit } from "./home.js"
import { categoryPageInit, alternateCategoryItems } from "./category-pages.js";


import { categoryAnimation, initCategoriesAnimations } from "./categoriesAnimations.js";

const categories = ['headphones', 'earphones', 'speakers']

const animationFadeInEnter = ((data) => {
    // console.log('------animationFadeInEnter')
    // gsap.from(container, {
    gsap.set('.app', {
        autoAlpha: 0,
    })
    gsap.to('.app', {
        duration: 2.5,
        autoAlpha: 1,
        // scale: 0.5,
        ease: 'power4.out',
        // clearProps: true
        // onStart: async () => {
        //     if (data) {
        //         await pageIdentifierTextEnter(data)
        //     }
        // }
    })
})

// export const animationFadeOutLeave = (container) => {
const animationFadeOutLeave = (data) => {
    // console.log('------animationFadeOutLeave');
    return new Promise((resolve) => {
        // gsap.set('.char', { opacity: 0 });
        // gsap.to(container, {
        gsap.to('.app', {
            duration: 1.5,
            // duration: 3,
            autoAlpha: 0,
            // scale: 0.5,
            ease: 'power4.out',
            // clearProps: true,
            // onStart: async () => {
            //     await pageIdentifierTextLeave(data)
            // },
            onComplete: resolve, // Resolve the promise when the animation completes
        });
    });
};


barba.hooks.beforeEnter((data) => {
    // console.log('barba.hooks.beforeEnter')
    window.scrollTo(0, 0); // Scroll to the top of the page
    if (data.next.namespace === 'home') {
        homeAnimationsInit(data.next.container, 'beforeEnter 86')
    } else if (categories.includes(data.next.namespace)) {
        initCategoriesAnimations(data.next.container)
    } else if (data.next.namespace === 'products') {
        initProductAnimations(data.next.container)
    } else if (data.next.namespace === 'checkout') {
        checkoutAnimationsInit(data.next.container)
    } 
});

barba.hooks.beforeLeave((data) => {
    console.log('barba.hooks.beforeLeave')
    transitionInit(data.next.container, data.next.namespace, 'beforeLeave 91')
})


barba.hooks.once((data) => {
    console.log('barba.hooks.once')

    transitionInit(data.next.container, data.next.namespace, 'once 101')

    const navBar = data.next.container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper')
    gsap.set(navBar, { opacity: 0 })
    

    if (data.next.namespace === 'home') {

        console.log('ONCE- HOME')
        const introOverlay = document.querySelector('.intro-overlay')
        const barOverlay = document.querySelector('.bar-overlay')
        const introLogo = document.querySelector('.intro-logo')
        const introBars = document.querySelectorAll('.bar')

        const tl = gsap.timeline()
        tl.to(introBars, {
            // delay: 0.25,
            x: 0,
            duration: 1,
            ease: "power4.inOut",
            stagger: {
                amount: 0.5,
                from: "random",
            },
        }, 0.25);
        tl.to(introLogo, {
            opacity: 1,
            duration: 0.5,
            repeat: 3,
            yoyo: true
        }, 1.5);
        tl.set(introOverlay, { autoAlpha: 0 });
        tl.to(introBars, {
            xPercent: 101,
            duration: 1,
            ease: "power4.inOut",
            stagger: {
              amount: 0.5,
              from: "random",
            },
          }, 3);
        tl.set(barOverlay, { autoAlpha: 0 });

        setTimeout(() => {
            homeIntroAnimation(data.next.container, 'once 136')
        }, 4000);


    } else if (categories.includes(data.next.namespace)) {
        setTimeout(() => {
            navBarFadeIn(navBar)
        }, 525)
        categoryAnimation(data.next.container, '.category-hero', 0.75);
    } else if (data.next.namespace === 'products') {
        setTimeout(() => {
            navBarFadeIn(navBar)
        }, 525)
        productsHeroEnter(data.next.container)
    } else if (data.next.namespace === 'checkout') {
        checkoutAnimations(data.next.container)
    } else {
        setTimeout(() => {
            navBarFadeIn(navBar)
        }, 525)
    }
});


const homeAnimationsJsFileUrls = [`http://127.0.0.1:5500/homeAnimations.js`, 'https://cdn.jsdelivr.net/gh/blountdj/audiophile@v2/home.js']
const categoriesAnimationsJsFileUrl = `http://127.0.0.1:5500/categoriesAnimations.js`
const productsAnimationsJsFileUrl = `http://127.0.0.1:5500/productsAnimations.js`
// const gsapTextPluginUrl = `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/TextPlugin.min.js`
// const pageSpecificScriptUrl = `https://cdn.jsdelivr.net/gh/blountdj/arch-studio@v1/home.js`
const homeCssFileUrl = `http://127.0.0.1:5500/home.css`
const checkoutCssFileUrl = `http://127.0.0.1:5500/checkout.css`

barba.hooks.afterEnter((data) => {
    console.log('barba.hooks.afterEnter')
    const currentPageId = data.current.namespace;
    const nextPageId = data.next.namespace; // Assuming your container has an ID that matches the page
    // console.log('currentPageId:', currentPageId)
    navbarInit(data.next.container)
    
    if (nextPageId === 'home') {
        addScriptsToBody(homeAnimationsJsFileUrls)
        addFilesCssToBody([homeCssFileUrl])
        homeInit(data.next.container)
    } else if (nextPageId === 'products') {
        initProductPage(data.next.container)
    }  else if (nextPageId === 'checkout') {
        checkoutInit(data.next.container)
    } else {
        removeScriptsFromBody(homeAnimationsJsFileUrls)
        removeCssFilesFromBody([homeCssFileUrl])
    }

    categories.some(category => nextPageId.includes(category)) && !categories.some(category => currentPageId.includes(category)) ? addScriptsToBody([categoriesAnimationsJsFileUrl]) : removeScriptsFromBody([categoriesAnimationsJsFileUrl])
    nextPageId === 'products' && !currentPageId === 'products' ? addScriptsToBody([productsAnimationsJsFileUrl]) : removeScriptsFromBody([productsAnimationsJsFileUrl])    
    // nextPageId !== 'home' && currentPageId === 'home' ? removeScriptsFromBody([gsapTextPluginUrl]) : ''
    nextPageId === 'checkout' ? addFilesCssToBody([checkoutCssFileUrl]) : removeCssFilesFromBody([checkoutCssFileUrl])

    setTimeout(() => {
        cartOverlayInit(data.next.container)
        cartQtyIconInit(data.next.container)
    }, 3000);
});

barba.init({
    debug: CONFIG.barbaDebug,
    sync: false,
    views: [
    ],
    transitions: [
        {
            name: 'home-intro-transition',
            to: { namespace: [...categories, 'home', 'products', 'checkout'] },
            from: { namespace: [...categories, 'home', 'products', 'checkout'] },
            once() {},
               
            beforeEnter(data) {
            //   console.log('beforeEnter')
              if (data.next.namespace === 'home') {
                const hero = data.next.container.querySelector('.home-hero')
                gsap.set(hero, { yPercent: -105 })
              }
            },
            async leave(data) {
                console.log('\nLEAVE -', data.current.namespace)

                animationFadeOutLeave(data);
                fadeOutNavA(data)
                await leaveTransition(data.next.container)
            },

            async enter(data) {
                console.log('\nENTER: namespace:', data.next.namespace)
                const introSelector = categories.includes(data.next.namespace) ? '.category-hero' : '.home-hero'
        
                if (data.next.namespace === 'home') {
                    setTimeout(() => {
                        homeIntroAnimation(data.next.container)
                    }, 3000);
                    setTimeout(() => {
                        let typingAnimation = typeTextIndividual(data.next.container, 'new product');
                        typingAnimation.play();  // Start the animation
                    }, 3000);
                    await animationFadeInEnter(data);

                } else if (categories.includes(data.next.namespace)) {
                    setTimeout(() => {
                        categoryAnimation(data.next.container, introSelector)
                    }, 3000);
                    
                    setTimeout(() => {
                        document.head.appendChild(createCSSFileLink('http://127.0.0.1:5500/category-pages.css'));
                        // btnHoverAnimation(data.next.container)
                    }, 4000);
                } else if (data.next.namespace === 'products') {
                    setTimeout(() => {
                        productsHeroEnter(data.next.container)
                    }, 3000);

                } else if (data.next.namespace === 'checkout') {
                    checkoutInit(data.next.container) 
                    setTimeout(() => {
                        checkoutAnimations(data.next.container)
                    }, 3000);
                    
                } else {
                    heroIntroLoad(data.next.container, introSelector)
                    await animationFadeInEnter(data);
                }
            },
            afterEnter(data) {
                console.log('afterEnter')
                if (categories.includes(data.next.namespace)) {
                    alternateCategoryItems(data.next.container)
                    setTimeout(() => {
                        categoryPageInit(data.next.container)
                    }, 5000);
                } 

                // setTimeout(() => {
                //     cartOverlayInit(data.next.container)
                //     cartQtyIconInit(data.next.container)
                // }, 3000);
                
            },
        }
    ]
});
