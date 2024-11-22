console.log('transitionAnimation.js')

import { heroIntroLoad, addShuffleEffect } from "./animations.js";
import { 
    homeImagesUrls,
    exampleImagesUrls,
    speakersImagesUrls,
    headphonesImagesUrls,
    checkoutImagesUrls,
    earphonesImagesUrls
 } from "./utilities.js";


const pagetoImageUrl = {
    "home": homeImagesUrls,
    "headphones": headphonesImagesUrls,
    "earphones": earphonesImagesUrls,   
    "speakers": speakersImagesUrls,
    "checkout": checkoutImagesUrls,
    "products": homeImagesUrls,
}


const getTransition = (container) => {
    return {
        element: container.querySelector('.transition-smooth'),
        wrapper: container.querySelector('.transition_wrapper-smooth'),
        figures: container.querySelectorAll('.transition_figure'),
    }
}


export const transitionInit = (container, nextPage, what) => {
    // console.log('###### transitionInit - what:', what, 'nextPage:', nextPage)
    
    const element = container.querySelector('.transition-smooth')
    const figures = container.querySelectorAll('.transition_figure')
    const images = container.querySelectorAll('.transition_image')

    const imagesUrls = pagetoImageUrl[nextPage]
    images.forEach((image, index) => {
        gsap.set(images[index], { 
            src: imagesUrls[index],
            srcset: imagesUrls[index]
        })
    })


    gsap.set(element, { 
        yPercent: -150,
        display: 'block',
     })

    gsap.set(figures, { 
        yPercent: -50,
        rotateY: 5,
        rotateX: 5,

    });
}


export const leaveTransition = (container) => {
    // console.log('leaveTransition')
    let transition = getTransition(container)
    
    gsap.timeline({ 
        defaults: { duration: 1.8, ease: 'expo.out' },
            // This will resolve the promise when timeline completes
    })
    .add(() => {
        gsap.to(transition.element, {
            yPercent: 25,
        })
    }, 0)
    .add(() => {
        gsap.to(transition.figures, {
            duration: 2.4,
            rotateY: -5,
            rotateX: -5,
            yPercent: 115,
            ease: 'power2.in',
            stagger: {
                amount: 0.25,
                grid: 'auto',
                from: 'center',
            },
        })
    }, 0)
    .add(() => {
        gsap.to(transition.figures, {
            autoAlpha: 0,
            ease: 'power2.inOut',
            duration: 0.25,
        })
    }, 2.5)

};

//////////////////////////////////////////////////////////////////////////////////////////


// export function setNavOpacityZero(container) {
//     const elems = container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper')
//     gsap.set(elems, { opacity: 0 })
// }



