import { CONFIG as e } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v7/min/js/config-min.js"; let { xPercentZero: t, yPercentZero: a, navBarFadeIn: c } = await import(`${e.path}${e.jsPath}animations${e.min}.js`), getElems = e => ({ productNavBarA: e.querySelectorAll(".navbar > a, nav > a, .nav-cart-icon-wrapper"), navBar: e.querySelector(".container-1440.is-nav"), goBackLink: e.querySelector(".go-back-link"), checkoutBlock: e.querySelector(".checkout-block"), summaryBlock: e.querySelector(".summary-block") }); export function checkoutAnimationsInit(e) { let t = getElems(e); gsap.set(t.navBar, { opacity: 0, yPercent: -100 }), gsap.set(t.goBackLink, { opacity: 0, yPercent: 100 }), gsap.set(t.checkoutBlock, { opacity: 0, xPercent: -100 }), gsap.set(t.summaryBlock, { opacity: 0, xPercent: 100 }) } export function checkoutAnimations(e) { let o = getElems(e); gsap.timeline({ defaults: { ease: "power4.inout" } }).add(() => a(o.navBar), 0).add(() => c(o.productNavBarA), .25).add(() => t(o.checkoutBlock), .65).add(() => t(o.summaryBlock), .65).add(() => a(o.goBackLink), 1) }