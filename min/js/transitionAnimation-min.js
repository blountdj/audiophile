import{CONFIG as e}from"https://cdn.jsdelivr.net/gh/blountdj/audiophile@v3/min/js/config-min.js";let{homeImagesUrls:t,speakersImagesUrls:r,headphonesImagesUrls:o,checkoutImagesUrls:i,earphonesImagesUrls:a}=await import(`${e.path}${e.jsPath}utilities${e.min}.js`),pagetoImageUrl={home:t,headphones:o,earphones:a,speakers:r,checkout:i,products:t},getTransition=e=>({element:e.querySelector(".transition-smooth"),wrapper:e.querySelector(".transition_wrapper-smooth"),figures:e.querySelectorAll(".transition_figure")});export const transitionInit=(e,t,r)=>{let o=e.querySelector(".transition-smooth"),i=e.querySelectorAll(".transition_figure"),a=e.querySelectorAll(".transition_image"),n=pagetoImageUrl[t];a.forEach((e,t)=>{gsap.set(a[t],{src:n[t],srcset:n[t]})}),gsap.set(o,{yPercent:-150,display:"block"}),gsap.set(i,{yPercent:-50,rotateY:5,rotateX:5})};export const leaveTransition=e=>{let t=getTransition(e);gsap.timeline({defaults:{duration:1.8,ease:"expo.out"}}).add(()=>{gsap.to(t.element,{yPercent:25})},0).add(()=>{gsap.to(t.figures,{duration:2.4,rotateY:-5,rotateX:-5,yPercent:115,ease:"power2.in",stagger:{amount:.25,grid:"auto",from:"center"}})},0).add(()=>{gsap.to(t.figures,{autoAlpha:0,ease:"power2.inOut",duration:.25})},2.5)};