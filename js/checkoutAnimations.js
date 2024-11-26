// console.log('checkoutAnimations.js')
import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v5/min/js/config-min.js";
const {
    xPercentZero,
    yPercentZero,
    navBarFadeIn
} = await import(`${CONFIG.path}${CONFIG.jsPath}animations${CONFIG.min}.js`);

const getElems = (container) => {
    return {
        productNavBarA: container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper'),
        navBar: container.querySelector('.container-1440.is-nav'),
        goBackLink: container.querySelector('.go-back-link'),
        checkoutBlock: container.querySelector('.checkout-block'),
        summaryBlock: container.querySelector('.summary-block')
    }
}

export function checkoutAnimationsInit(container) {
    const elems = getElems(container)
    gsap.set(elems.navBar, { opacity: 0, yPercent: -100 })
    gsap.set(elems.goBackLink, { opacity: 0, yPercent: 100 })
    gsap.set(elems.checkoutBlock, { opacity: 0, xPercent: -100 })
    gsap.set(elems.summaryBlock, { opacity: 0, xPercent: 100 })
}

export function checkoutAnimations(container) {
    const checkoutElems = getElems(container)
    gsap.timeline({ defaults: { ease: 'power4.inout' } })
        .add(() => yPercentZero(checkoutElems.navBar), 0)
        .add(() => navBarFadeIn(checkoutElems.productNavBarA), 0.25)
        .add(() => xPercentZero(checkoutElems.checkoutBlock), 0.65)
        .add(() => xPercentZero(checkoutElems.summaryBlock), 0.65)
        .add(() => yPercentZero(checkoutElems.goBackLink), 1)
}
