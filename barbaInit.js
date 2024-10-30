console.log('barbaInit.js loaded')

import { 
    // textSplit,
    removeScriptsFromBody,
    addScriptsToBody,
    // addScriptsToBodyNotModule
} from "./utilities.js";

import { heroIntroLoad, heroOutro, typeTextIndividual } from "./homeAnimations.js";
import { 
    initTransition, 
    leaveTransition, 
    productsHeroEnter, 
    categoryAnimation, 
    fadeOutNavA
 } from "./transitionAnimation.js";

const categories = ['headphones', 'earphones', 'speakers']


// const pageIdentifierTextEnter = async (data) => {
//     // console.log('\n\n### pageIdentifierTextEnter')

//     let pageIdentifierTextElem = data.next.container.querySelector('.page-identifer-text')
//     // console.log('pageIdentifierTextElem - barba.hooks.enter:', pageIdentifierTextElem)

//     textSplit(pageIdentifierTextElem)

//     return new Promise((resolve) => {
//         gsap.set('.page-identifer-text', {opacity: 1})
//         gsap.set('.char', {opacity: 0})
//         gsap.to('.char', {
//             opacity: 1,
//             duration: 1.575,
//             stagger: {
//                 from: "random",
//                 each: 0.075,
//             },
//             ease: "power2.out",
//             onComplete: () => {
//                 resolve()
//             }
//         })
//     })
// }

// const pageIdentifierTextLeave = (data) => {
//     // console.log('pageIdentifierTextLeave')
//     // console.log('data.next.namespace:', data.next.namespace)
//     let pageIdentifierTextElem = document.querySelector('.page-identifer-text')
//     // console.log('pageIdentifierTextElem0:', pageIdentifierTextElem)

//     return new Promise((resolve) => {
//         // gsap.set(pageIdentifierTextSplit.chars, { opacity: 0 });
//         gsap.to('.char', {
//             opacity: 0,
//             duration: 1.575,
//             stagger: {
//                 from: "random",
//                 each: 0.075,
//             },
//             ease: "power2.out",
//             onComplete: () => {
//                 resolve()
//                 pageIdentifierTextElem.textContent = data.next.namespace;
//             }
//         })
//     })
// }

const animationFadeInEnter = ((data) => {
    console.log('------animationFadeInEnter')
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
    console.log('------animationFadeOutLeave');
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
    window.scrollTo(0, 0); // Scroll to the top of the page

    // console.log('barba.hooks.beforeEnter')
    // return new Promise((resolve) => {
    //     if (data.next.namespace === 'home') {
    //         addScriptsToBodyNotModule([gsapTextPluginUrl]);
    //     } else {
    //         removeScriptsFromBody([gsapTextPluginUrl]);
    //     }
    //     resolve();
    // });
});

barba.hooks.once((data) => {
    console.log('barba.hooks.once')
    console.log('data:', data)
    console.log('data.next.namespace:', data.next.namespace)
    if (data.next.namespace === 'home') {
        console.log('--IF')
        /* Typing Animation */
        const typedTextElement = data.next.container.querySelector('.typed-text');
        typedTextElement.textContent = '';
        setTimeout(() => {
            let typingAnimation = typeTextIndividual(data.next.container, 'new product');
            typingAnimation.play();  // Start the animation
        }, 3500);
    }
    if (categories.includes(data.next.namespace)) {
        console.log('CATEGORIES')
        heroIntroLoad(data.next.container, '.category-hero', 0.75);
    }
});


const homeAnimationsJsFileUrl = `http://127.0.0.1:5500/homeAnimations.js`
const categoriesAnimationsJsFileUrl = `http://127.0.0.1:5500/categoriesAnimations.js`
const productsAnimationsJsFileUrl = `http://127.0.0.1:5500/productsAnimations.js`
const checkoutAnimationsJsFileUrl = `http://127.0.0.1:5500/checkoutAnimations.js`
// const gsapTextPluginUrl = `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/TextPlugin.min.js`
// const pageSpecificScriptUrl = `https://cdn.jsdelivr.net/gh/blountdj/arch-studio@v1/home.js`


barba.hooks.afterEnter((data) => {
    // console.log('barba.hooks.afterEnter')
    const currentPageId = data.current.namespace;
    const nextPageId = data.next.namespace; // Assuming your container has an ID that matches the page
    // console.log('currentPageId:', currentPageId)
    
    nextPageId === 'home' ? addScriptsToBody([homeAnimationsJsFileUrl]) : removeScriptsFromBody([homeAnimationsJsFileUrl])
    categories.some(category => nextPageId.includes(category)) && !categories.some(category => currentPageId.includes(category)) ? addScriptsToBody([categoriesAnimationsJsFileUrl]) : removeScriptsFromBody([categoriesAnimationsJsFileUrl])
    nextPageId === 'products' && !currentPageId === 'products' ? addScriptsToBody([productsAnimationsJsFileUrl]) : removeScriptsFromBody([productsAnimationsJsFileUrl])
    nextPageId === 'checkout' ? addScriptsToBody([checkoutAnimationsJsFileUrl]) : removeScriptsFromBody([checkoutAnimationsJsFileUrl])
    nextPageId !== 'home' && currentPageId === 'home' ? removeScriptsFromBody([gsapTextPluginUrl]) : ''
});


barba.init({
    debug: false,
    sync: false,
    views: [
    ],
    transitions: [
        {
            name: 'home-intro-transition',
            to: { namespace: [...categories, 'home', 'products'] },
            from: { namespace: [...categories, 'home', 'products'] },
            once(data) {},
               
            beforeEnter() {
              
            },
            async leave(data) {
                console.log('\nLEAVE -', data.current.namespace)

                initTransition(data)
                animationFadeOutLeave(data);
                fadeOutNavA(data)
                await leaveTransition(data)

                // const outroSelector = categories.includes(data.current.namespace) ? '.category-hero' : '.home-hero'
                // await heroOutro(data.current.container, outroSelector);
                
            },


            async enter(data) {
                console.log('\nENTER')
                const introSelector = categories.includes(data.next.namespace) ? '.category-hero' : '.home-hero'
        

                if (data.next.namespace === 'home') {

                    //     /* Typing Animation */
                    setTimeout(() => {
                            let typingAnimation = typeTextIndividual(data.next.container, 'new product');
                            typingAnimation.play();  // Start the animation
                        }, 3500);

                        heroIntroLoad(data.next.container, introSelector)
                        await animationFadeInEnter(data);

                } else if (categories.includes(data.next.namespace)) {
                    categoryAnimation(data.next.container, introSelector)

                }

                else if (data.next.namespace === 'products') {

                    productsHeroEnter(data)

                } else {
                    heroIntroLoad(data.next.container, introSelector)
                    await animationFadeInEnter(data);
                }
            },
        },
        // {
        //     name: 'page-fade-transition',
        //     // to: { namespace: ['todo'] },
        //     once() {},
        //     async leave(data) {
        //         console.log('\n\nLEAVE')
        //         await animationFadeOutLeave(data);
        //     },
        //     async enter(data) {
        //         console.log('\n\nENTER')
        //         await animationFadeInEnter(data);
        //     },
        // },
    ]
});
