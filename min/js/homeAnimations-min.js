import{CONFIG as e}from"https://cdn.jsdelivr.net/gh/blountdj/audiophile@v3/min/js/config-min.js";let{scaleToZero:t,fadeIn:o,navBarFadeIn:r,typeTextIndividual:a,colorChange:n,addShuffleEffect:l}=await import(`${e.path}${e.jsPath}animations${e.min}.js`);export function heroIntroLoad2(e,t=0){gsap.to(e,{yPercent:0,duration:.75,delay:t,ease:"power4.inOut"})}export const getHomeElement=e=>({hero:e.querySelector(".home-hero"),heroMask:e.querySelector(".hero-mask"),navBarA:e.querySelectorAll(".navbar > a, nav > a, .nav-cart-icon-wrapper"),heroMain:e.querySelector(".hero-main"),typedTextElem:e.querySelector(".typed-text"),btnElemTop:e.querySelector(".btn-elem-top"),btnElemBottom:e.querySelector(".btn-elem-bottom"),btnText:e.querySelector(".btn-1-text"),heroParagraph:e.querySelector(".hero-text-paragraph"),title:e.querySelector(".home-hero-h1"),titleChars:e.querySelectorAll(".home-hero-h1 > .word > .char")});export const homeAnimationsInit=(e,t)=>{new SplitType(e.querySelector(".home-hero-h1"),{types:"words, chars"});let o=getHomeElement(e);return new Promise(e=>{gsap.set(o.hero,{yPercent:-105}),o.typedTextElem.textContent="",gsap.set(o.heroMask,{opacity:1}),gsap.set([o.btnElemTop,o.btnElemBottom],{scaleY:1}),gsap.set(o.btnText,{opacity:0}),gsap.set([o.title,o.titleChars,o.heroParagraph],{opacity:0}),e()})};export function homeIntroAnimation(e){let h=getHomeElement(e);gsap.timeline({defaults:{ease:"power4.inout"}}).add(()=>r(h.navBarA),.4).add(()=>heroIntroLoad2(h.hero),.8).add(()=>l(h.title,h.titleChars),1.7).add(()=>heroMaskFadeOut(h.heroMask),1.5).add(()=>o(h.heroParagraph),2.5).add(()=>t(h.btnElemTop,"top"),3).add(()=>t(h.btnElemBottom,"bottom"),3).add(()=>n(h.btnText),3.5).add(()=>{a(e,"new product").play()},4.5)}let heroMaskFadeOut=e=>{gsap.to(e,{opacity:0,duration:.75,ease:"power4.inOut"})};export function heroOutro(e,t){let o=e.querySelector(t);return new Promise(e=>{gsap.to(o,{yPercent:-100,duration:.75,ease:"power4.inOut",onComplete:e})})}