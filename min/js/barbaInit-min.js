import { CONFIG as e } from "https://cdn.jsdelivr.net/gh/blountdj/audiophile@v10/min/js/config-min.js"; let { addFilesCssToBody: t, removeCssFilesFromBody: a, createCSSFileLink: n } = await import(`${e.path}${e.jsPath}utilities${e.min}.js`), { cartQtyIconInit: o } = await import(`${e.path}${e.jsPath}cart-quantity-icon${e.min}.js`), { cartOverlayInit: i } = await import(`${e.path}${e.jsPath}cart-overlay${e.min}.js`), { homeIntroAnimation: r, homeAnimationsInit: s } = await import(`${e.path}${e.jsPath}homeAnimations${e.min}.js`), { navbarInit: c } = await import(`${e.path}${e.jsPath}navbar${e.min}.js`), { checkoutInit: p } = await import(`${e.path}${e.jsPath}checkout${e.min}.js`), { checkoutAnimationsInit: m, checkoutAnimations: h } = await import(`${e.path}${e.jsPath}checkoutAnimations${e.min}.js`), { transitionInit: l, leaveTransition: u } = await import(`${e.path}${e.jsPath}transitionAnimation${e.min}.js`), { initProductPage: x } = await import(`${e.path}${e.jsPath}product-pages${e.min}.js`), { productsHeroEnter: $, initProductAnimations: d } = await import(`${e.path}${e.jsPath}productAnimations${e.min}.js`), { navBarFadeIn: j, typeTextIndividual: g, fadeOutNavA: w, heroIntroLoad: y } = await import(`${e.path}${e.jsPath}animations${e.min}.js`), { homeInit: P } = await import(`${e.path}${e.jsPath}home${e.min}.js`), { categoryPageInit: k, alternateCategoryItems: v } = await import(`${e.path}${e.jsPath}category-pages${e.min}.js`), { categoryAnimation: b, initCategoriesAnimations: f } = await import(`${e.path}${e.jsPath}categoriesAnimations${e.min}.js`), homeCssFileUrl = `${e.pathCss}${e.cssPath}home${e.min}.css`, checkoutCssFileUrl = `${e.pathCss}${e.cssPath}checkout${e.min}.css`, categoriesCssFileUrl = `${e.pathCss}${e.cssPath}category-pages${e.min}.css`, categories = ["headphones", "earphones", "speakers"], animationFadeInEnter = e => { gsap.set(".app", { autoAlpha: 0 }), gsap.to(".app", { duration: 2.5, autoAlpha: 1, ease: "power4.out" }) }, animationFadeOutLeave = e => new Promise(e => { gsap.to(".app", { duration: 1.5, autoAlpha: 0, ease: "power4.out", onComplete: e }) }); barba.hooks.beforeEnter(e => { window.scrollTo(0, 0), "home" === e.next.namespace ? s(e.next.container, "beforeEnter 86") : categories.includes(e.next.namespace) ? f(e.next.container) : "products" === e.next.namespace ? d(e.next.container) : "checkout" === e.next.namespace && m(e.next.container) }), barba.hooks.beforeLeave(e => { l(e.next.container, e.next.namespace, "beforeLeave 91") }), barba.hooks.once(e => { l(e.next.container, e.next.namespace, "once 101"); let t = e.next.container.querySelectorAll(".navbar > a, nav > a, .nav-cart-icon-wrapper"); if (gsap.set(t, { opacity: 0 }), "home" === e.next.namespace) { let a = document.querySelector(".intro-overlay"), n = document.querySelector(".bar-overlay"), o = document.querySelector(".intro-logo"), i = document.querySelectorAll(".bar"), s = gsap.timeline(); s.to(i, { x: 0, duration: 1, ease: "power4.inOut", stagger: { amount: .5, from: "random" } }, .25), s.to(o, { opacity: 1, duration: .5, repeat: 3, yoyo: !0 }, 1.5), s.set(a, { autoAlpha: 0 }), s.to(i, { xPercent: 101, duration: 1, ease: "power4.inOut", stagger: { amount: .5, from: "random" } }, 3), s.set(n, { autoAlpha: 0 }, 5), setTimeout(() => { r(e.next.container, "once 136") }, 4e3) } else categories.includes(e.next.namespace) ? (setTimeout(() => { j(t) }, 525), b(e.next.container, ".category-hero", .75)) : "products" === e.next.namespace ? (setTimeout(() => { j(t) }, 525), $(e.next.container)) : "checkout" === e.next.namespace ? h(e.next.container) : setTimeout(() => { j(t) }, 525) }), barba.hooks.afterEnter(e => { let n = e.next.namespace; c(e.next.container), "home" === n ? (t([homeCssFileUrl]), P(e.next.container)) : "products" === n ? x(e.next.container) : "checkout" === n ? p(e.next.container) : a([homeCssFileUrl]), "checkout" === n ? t([checkoutCssFileUrl]) : a([checkoutCssFileUrl]), setTimeout(() => { i(e.next.container), o(e.next.container) }, 3e3) }), barba.init({ debug: e.barbaDebug, sync: !1, views: [], transitions: [{ name: "home-intro-transition", to: { namespace: [...categories, "home", "products", "checkout"] }, from: { namespace: [...categories, "home", "products", "checkout"] }, once() { }, beforeEnter(e) { if ("home" === e.next.namespace) { let t = e.next.container.querySelector(".home-hero"); gsap.set(t, { yPercent: -105 }) } }, async leave(e) { animationFadeOutLeave(e), w(e), await u(e.next.container) }, async enter(e) { let t = categories.includes(e.next.namespace) ? ".category-hero" : ".home-hero"; "home" === e.next.namespace ? (setTimeout(() => { r(e.next.container) }, 3e3), setTimeout(() => { g(e.next.container, "new product").play() }, 3e3), await animationFadeInEnter(e)) : categories.includes(e.next.namespace) ? (setTimeout(() => { b(e.next.container, t) }, 3e3), setTimeout(() => { document.head.appendChild(n(categoriesCssFileUrl)) }, 4e3)) : "products" === e.next.namespace ? setTimeout(() => { $(e.next.container) }, 3e3) : "checkout" === e.next.namespace ? (p(e.next.container), setTimeout(() => { h(e.next.container) }, 3e3)) : (y(e.next.container, t), await animationFadeInEnter(e)) }, afterEnter(e) { categories.includes(e.next.namespace) && (v(e.next.container), setTimeout(() => { k(e.next.container) }, 5e3)) } }] });