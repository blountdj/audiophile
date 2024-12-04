export function addShuffleEffect(t,e,o="white"){return new Promise((n,r)=>{e.forEach(t=>{let e=t.textContent;t.textContent="";let n=document.createElement("div");n.textContent=e,n.className="static-char";let r=document.createElement("div");r.textContent=e,r.className="animated-char",r.style.color=o,t.style.position="relative",t.appendChild(n),t.appendChild(r)});let a=t.querySelectorAll(".animated-char"),i=[...a].map(t=>t.textContent);a.forEach((t,e)=>{0===e&&gsap.set(t,{opacity:1})}),a.forEach((t,e)=>{setTimeout(()=>{e>0&&gsap.to(t,{opacity:1,duration:.1,delay:50});let o=setInterval(()=>{t.textContent=String.fromCharCode(97+Math.floor(26*Math.random()))},10);setTimeout(()=>{clearInterval(o),t.textContent=i[e],e<a.length-1&&setTimeout(()=>{gsap.to(a[e+1],{opacity:1,duration:.1})},55)},5+80*e)},60*e+(e>0?100:0))}),globalThis.setTimeout(n,0)})}export function updateH1AfterShuffle(t,e="white"){gsap.set([t],{color:e});let o=document.querySelectorAll(".animated-char");o.forEach(t=>t.remove())}export const navBarFadeIn=t=>{gsap.to(t,{opacity:1,duration:.25,stagger:.075,ease:"power4.inout"})};export function colorChange(t){gsap.to(t,{color:"#fff",opacity:1,duration:.75,ease:"power3.inout"})}export const animateSpin=(t,e)=>{gsap.timeline({defaults:{duration:1,ease:"expo.inOut"}}).to(t,{yPercent:0,rotate:0}).to(e,{yPercent:0,stagger:.05},0)};export function fadeIn(t){gsap.to(t,{opacity:1,duration:2.5,ease:"power4.inout"})}export function scaleToZero(t,e){gsap.to(t,{duration:.5,ease:"power2.inOut",scaleY:0,transformOrigin:e})}export function heroIntroLoad(t,e,o=0){let n=t.querySelector(e);gsap.to(n,{yPercent:0,duration:.75,delay:o,ease:"power4.inOut"})}export function typeTextMultipleLines(t,e){let o=t.querySelector(".typed-text");o.textContent="";let n=t.querySelector(".cursor"),r=e.split("\n"),a=gsap.timeline(),i="",c=gsap.timeline({repeat:-1,yoyo:!0});return c.to(n,{opacity:0,duration:.5}),r.forEach((t,e)=>{a.to(o,{duration:1.075*t.length,text:{value:()=>i+(i?"<br>":"")+t.slice(0,gsap.getProperty(o,"text").length-i.length),delimiter:""},ease:"none",onComplete(){i+=(i?"<br>":"")+t}}),e<r.length-1&&a.to({},{duration:.175})}),a.call(()=>{c.pause(),gsap.set(n,{opacity:0})}),c.play(),a}export function typeTextIndividual(t,e){let o=t.querySelector(".typed-text");o.textContent="";let n=t.querySelector(".cursor"),r=gsap.timeline(),a=gsap.timeline({repeat:-1,yoyo:!0});a.to(n,{opacity:0,duration:.5});let i="";return Array.from(e).forEach(t=>{r.to(o,{duration:.275,text:i+=t,ease:"none"})}),r.call(()=>{a.pause(),gsap.set(n,{opacity:0})}),a.play(),r}export function fadeOutNavA(t){let e=t.current.container.querySelectorAll(".navbar > a, nav > a, .nav-cart-icon-wrapper");gsap.to(e,{opacity:0,duration:.25,stagger:.1,ease:"power4.inout"});let o=t.next.container.querySelectorAll(".navbar > a, nav > a, .nav-cart-icon-wrapper");gsap.set(o,{opacity:0})}export function yPercentZero(t){gsap.to(t,{yPercent:0,opacity:1,duration:.25,ease:"power4.inout"})}export function xPercentZero(t){gsap.to(t,{xPercent:0,opacity:1,duration:.25,ease:"power4.inout"})}