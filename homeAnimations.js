console.log('homeAnimations.js')
import { 
    initTransition, 
    leaveTransition, 
    productsHeroEnter, 
    categoryAnimation, 
    fadeOutNavA,
    navBarFadeIn
 } from "./transitionAnimation.js";


const heroBgImgUrl = 'https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514116ceadfaa71809766_image-hero.webp'


export function heroIntroLoad(container, selector, delay = 0) {
    console.log('heroIntroLoad')
    const heroElem = container.querySelector(selector)
    gsap.to(heroElem, {
        yPercent: 0,
        duration: 0.75,
        delay: delay,
        ease: 'power4.inOut'
    })
}

export function heroIntroLoad2(elem, delay = 0) {
    // console.log('heroIntroLoad2')
    gsap.to(elem, {
        yPercent: 0,
        duration: 0.75,
        delay: delay,
        ease: 'power4.inOut'
    })
}

function colorChange(element) {
    gsap.to(element,  {
        color: '#fff',
        duration: 0.75,
        ease: 'power3.inout',
    })
}

const getHomeElement = (container) => {
    return {

        hero: container.querySelector('.home-hero'),
        heroMask: container.querySelector('.hero-mask'),
        navBarA: container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper'),
        heroMain: container.querySelector('.hero-main'),
        typedTextElem: container.querySelector('.typed-text'),
        btnElemTop: container.querySelector('.btn-elem-top'),
        btnElemBottom: container.querySelector('.btn-elem-bottom'),
        btnText: container.querySelector('.btn-1-text'),
        heroParagraph: container.querySelector('.hero-text-paragraph'),
        
        title: container.querySelector('.home-hero-h1'),
        titleChars: container.querySelectorAll('.home-hero-h1 > .word > .char'),

        // catImgWrapper: container.querySelector('.category-item-image-wrapper-wrapper'),
        // catH2: container.querySelector('.category-item-h2'),
        // catH2Chars: container.querySelectorAll('.category-item-h2 > div > div'),

        // catNewProduct: container.querySelector('.typed-text'),
    
    }
}

const homeInit = (homeElem) => {
    gsap.set(homeElem.hero, { yPercent: -105 })
    homeElem.typedTextElem.textContent = '';
    gsap.set(homeElem.heroMask, { opacity: 1 })
    gsap.set([homeElem.btnElemTop, homeElem.btnElemBottom], {
        scaleY: 1,
    });
    gsap.set(homeElem.btnText, {
        color: '#d87d4a',
    });
    gsap.set([homeElem.title, homeElem.titleChars, homeElem.heroParagraph], {
        opacity: 0
    });
}

const heroMaskFadeOut = (elem) => {
    gsap.to(elem, { opacity: 0, duration: 0.75, ease: 'power4.inOut' })
}

function scaleToZero(element, origin) {
    gsap.to(element, {
        duration: 0.5, // Adjust the duration as needed
        ease: 'power2.inOut', // Adjust the easing as needed
        scaleY: 0, // Scale back to the original value (1)
        transformOrigin: origin
    });
}

function fadeIn(element) {
    gsap.to(element, { 
        opacity: 1, 
        duration: 2.5, 
        ease: 'power4.inout',
        // onComplete: resolve
     })
}

function addShuffleEffect(element, chars) {
    // console.log('addShuffleEffect')

    return new Promise((resolve, reject) => {
        // const chars = element.querySelectorAll(".char");
        const originalText = [...chars].map((char) => char.textContent);
        const shuffleInterval = 10;
        const resetDelay = 5; // 75
        const additionalDelay = 80; // 150
        const opacityDelay = 50; // Adjust this to fine-tune the opacity change timing
        const initialDelay = 100; // Introduce a slight initial delay for all characters

        gsap.set(element, {
            opacity: 1,
        });

        chars.forEach((char, index) => {
            if (index === 0) {
                gsap.set(char, { opacity: 1 }); // Explicitly set opacity to 1 for the first character
            }
        });

        chars.forEach((char, index) => {
            // Delay the start of each character's animation based on its index, plus the initial delay
            setTimeout(() => {
                if (index > 0) { // Skip the first character as it's already handled
                    // Start with the character having opacity 0, then set it to 1 after a brief delay
                    gsap.to(char, { opacity: 1, duration: 0.1, delay: opacityDelay });
                }

                // Shuffle the character
                const interval = setInterval(() => {
                    char.textContent = String.fromCharCode(
                        97 + Math.floor(Math.random() * 26)
                    );
                }, shuffleInterval);

                // Stop the shuffle, reset the text, and then allow the next character to start
                setTimeout(() => {
                    clearInterval(interval);
                    char.textContent = originalText[index];
                    // If not the last character, delay the next character's start
                    if (index < chars.length - 1) {
                        // The next character's opacity will be set to 1 after this delay
                        setTimeout(() => {
                            gsap.to(chars[index + 1], { opacity: 1, duration: 0.1 });
                        }, resetDelay + opacityDelay); // Adjusted delay to account for opacity change
                    }
                }, resetDelay + index * additionalDelay);
            }, index * (shuffleInterval + opacityDelay) + (index > 0? initialDelay : 0));
        });
        globalThis.setTimeout(resolve, 0);
    });
}


export function homeLoadController(container) {
    console.log('homeLoadController')

    new SplitType(container.querySelector('.home-hero-h1'), {types: "words, chars"});

    const homeElem = getHomeElement(container)
    console.log('homeElem:', homeElem)

    homeInit(homeElem)

    gsap.timeline({ defaults: { ease: 'power4.inout' }})

        .add(() => navBarFadeIn(homeElem.navBarA), 0.4)
        .add(() => heroIntroLoad2(homeElem.hero), 0.8)
        .add(() => addShuffleEffect(homeElem.title, homeElem.titleChars), 1.7)
        .add(() => heroMaskFadeOut(homeElem.heroMask), 1.5)
        .add(() => fadeIn(homeElem.heroParagraph), 2.5) 
        .add(() => scaleToZero(homeElem.btnElemTop, 'top'), 3) // Starts 1s after the previous animation
        .add(() => scaleToZero(homeElem.btnElemBottom, 'bottom'), 3) // Starts 1s after the previous animation
        .add(() => colorChange(homeElem.btnText), 1.7) // Starts 0.75s after the previous animation
        .add(() => {
            let typingAnimation = typeTextIndividual(container, 'new product');
            typingAnimation.play()
        }, 4.5)
}

export function heroOutro(container, selector) {
    console.log('heroOutro')
    const hero = container.querySelector(selector)
    return new Promise((resolve) => {
        gsap.to(hero, {
            yPercent: -100,
            duration: 0.75,
            ease: 'power4.inOut',
            onComplete: resolve
        });
    });
}

export function typeTextMultipleLines(container, textToType) {
    console.log('typeTextMultipleLines')

    const typedTextElement = container.querySelector('.typed-text');
    typedTextElement.textContent = '';

    const cursorElement = container.querySelector('.cursor');

    const lines = textToType.split('\n');
    console.log('lines:', lines)
    // const lines = [textToType]

    let timeline = gsap.timeline();

    const typingSpeed = 1.075;
    const pauseBetweenLine = 0.175;
    let currentContent = "";  // This stores the already typed content

    // Create a separate timeline for the cursor blinking
    let cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTimeline.to(cursorElement, { opacity: 0, duration: 0.5 });

    lines.forEach((line, index) => {
        console.log('--line:', line, 'index:', index, 'currentContent:', currentContent)
        // Append the current line character by character
        timeline.to(typedTextElement, {
            duration: line.length * typingSpeed,  // Typing speed (based on line length)
            text: {
                value: () => {
                    // Append the new line to the current content
                    return currentContent + (currentContent ? '<br>' : '') + line.slice(0, gsap.getProperty(typedTextElement, "text").length - currentContent.length);
                },
                delimiter: ""
            },
            ease: "none",  // No easing to make the typing uniform
            onComplete: () => {
                currentContent += (currentContent ? '<br>' : '') + line; // Update the current content after line completes
            }
        });

        if (index < lines.length - 1) {
            timeline.to({}, { duration: pauseBetweenLine });  // Add a pause between lines
        }
    });

    // After all typing is done, stop the cursor blinking
    timeline.call(() => {
        cursorTimeline.pause();  // Pause the blinking animation
        gsap.set(cursorElement, { opacity: 0 });  // Ensure the cursor is visible
    });

    // Play the cursor timeline
    cursorTimeline.play();

    // gsap.to(cursorElement, { opacity: 0 });

    return timeline;  // Return the timeline for potential further control

}

export function typeTextIndividual(container, textToType) {
    console.log('typeTextIndividual')

    const typedTextElement = container.querySelector('.typed-text');
    typedTextElement.textContent = '';

    const cursorElement = container.querySelector('.cursor');

    const typingSpeed = 0.275; // Adjusted typing speed for individual characters
    let timeline = gsap.timeline();

    // Create a separate timeline for the cursor blinking
    let cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTimeline.to(cursorElement, { opacity: 0, duration: 0.5 });

    let currentText = ""; // This stores the already typed content

    Array.from(textToType).forEach((char) => {
        timeline.to(typedTextElement, {
            duration: typingSpeed,
            text: currentText += char, // Add the new character to the current text
            ease: "none"
        });
    });

    timeline.call(() => {
        cursorTimeline.pause();  // Pause the blinking animation
        gsap.set(cursorElement, { opacity: 0 });  // Ensure the cursor is visible
    });

    // Play the cursor timeline
    cursorTimeline.play();

    return timeline;  // Return the timeline for potential further control
}
