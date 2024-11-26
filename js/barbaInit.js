// console.log('barbaInit.js loaded')

import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v5/min/js/config-min.js";

const {
    addFilesCssToBody,
    removeCssFilesFromBody,
    createCSSFileLink,
} = await import(`${CONFIG.path}${CONFIG.jsPath}utilities${CONFIG.min}.js`);

const { cartQtyIconInit } = await import(`${CONFIG.path}${CONFIG.jsPath}cart-quantity-icon${CONFIG.min}.js`);
const { cartOverlayInit } = await import(`${CONFIG.path}${CONFIG.jsPath}cart-overlay${CONFIG.min}.js`);
const { homeIntroAnimation, homeAnimationsInit } = await import(`${CONFIG.path}${CONFIG.jsPath}homeAnimations${CONFIG.min}.js`);
const { navbarInit } = await import(`${CONFIG.path}${CONFIG.jsPath}navbar${CONFIG.min}.js`);
const { checkoutInit } = await import(`${CONFIG.path}${CONFIG.jsPath}checkout${CONFIG.min}.js`);
const { checkoutAnimationsInit, checkoutAnimations } = await import(`${CONFIG.path}${CONFIG.jsPath}checkoutAnimations${CONFIG.min}.js`);

const {
    transitionInit,
    leaveTransition,
} = await import(`${CONFIG.path}${CONFIG.jsPath}transitionAnimation${CONFIG.min}.js`);

const { initProductPage } = await import(`${CONFIG.path}${CONFIG.jsPath}product-pages${CONFIG.min}.js`);
const { productsHeroEnter, initProductAnimations } = await import(`${CONFIG.path}${CONFIG.jsPath}productAnimations${CONFIG.min}.js`);

const {
    navBarFadeIn,
    typeTextIndividual,
    fadeOutNavA,
    heroIntroLoad
} = await import(`${CONFIG.path}${CONFIG.jsPath}animations${CONFIG.min}.js`);

const { homeInit } = await import(`${CONFIG.path}${CONFIG.jsPath}home${CONFIG.min}.js`);
const { categoryPageInit, alternateCategoryItems } = await import(`${CONFIG.path}${CONFIG.jsPath}category-pages${CONFIG.min}.js`);

const { categoryAnimation, initCategoriesAnimations } = await import(`${CONFIG.path}${CONFIG.jsPath}categoriesAnimations${CONFIG.min}.js`);

const homeCssFileUrl = `${CONFIG.path}${CONFIG.cssPath}home${CONFIG.min}.css`
const checkoutCssFileUrl = `${CONFIG.path}${CONFIG.cssPath}checkout${CONFIG.min}.css`
const categoriesCssFileUrl = `${CONFIG.path}${CONFIG.cssPath}category-pages${CONFIG.min}.css`


const categories = ['headphones', 'earphones', 'speakers']

const animationFadeInEnter = ((data) => {
    // console.log('------animationFadeInEnter')
    gsap.set('.app', {
        autoAlpha: 0,
    })
    gsap.to('.app', {
        duration: 2.5,
        autoAlpha: 1,
        ease: 'power4.out',
    })
})

const animationFadeOutLeave = (data) => {
    // console.log('------animationFadeOutLeave');
    return new Promise((resolve) => {
        gsap.to('.app', {
            duration: 1.5,
            autoAlpha: 0,
            ease: 'power4.out',
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
    // console.log('barba.hooks.beforeLeave')
    transitionInit(data.next.container, data.next.namespace, 'beforeLeave 91')
})

barba.hooks.once((data) => {
    // console.log('barba.hooks.once')

    transitionInit(data.next.container, data.next.namespace, 'once 101')

    const navBar = data.next.container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper')
    gsap.set(navBar, { opacity: 0 })

    if (data.next.namespace === 'home') {
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

barba.hooks.afterEnter((data) => {
    // console.log('barba.hooks.afterEnter')
    // const currentPageId = data.current.namespace;
    const nextPageId = data.next.namespace;

    navbarInit(data.next.container)

    if (nextPageId === 'home') {
        // addScriptsToBody(homeAnimationsJsFileUrls)
        addFilesCssToBody([homeCssFileUrl])
        homeInit(data.next.container)
    } else if (nextPageId === 'products') {
        initProductPage(data.next.container)
    } else if (nextPageId === 'checkout') {
        checkoutInit(data.next.container)
    } else {
        // removeScriptsFromBody(homeAnimationsJsFileUrls)
        removeCssFilesFromBody([homeCssFileUrl])
    }

    // categories.some(category => nextPageId.includes(category)) && !categories.some(category => currentPageId.includes(category)) ? addScriptsToBody([categoriesAnimationsJsFileUrl]) : removeScriptsFromBody([categoriesAnimationsJsFileUrl])

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
            once() { },

            beforeEnter(data) {
                //   console.log('beforeEnter')
                if (data.next.namespace === 'home') {
                    const hero = data.next.container.querySelector('.home-hero')
                    gsap.set(hero, { yPercent: -105 })
                }
            },
            async leave(data) {
                // console.log('\nLEAVE -', data.current.namespace)

                animationFadeOutLeave(data);
                fadeOutNavA(data)
                await leaveTransition(data.next.container)
            },

            async enter(data) {
                // console.log('\nENTER: namespace:', data.next.namespace)
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
                        document.head.appendChild(createCSSFileLink(categoriesCssFileUrl));
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
                // console.log('afterEnter')
                if (categories.includes(data.next.namespace)) {
                    alternateCategoryItems(data.next.container)
                    setTimeout(() => {
                        categoryPageInit(data.next.container)
                    }, 5000);
                }
            },
        }
    ]
});
