console.log('transitionAnimation.js')

import { heroIntroLoad } from "./homeAnimations.js";

const getTransition = () => {
    return {
        element: document.querySelector('.transition-smooth'),
        wrapper: document.querySelector('.transition_wrapper-smooth'),
        figures: document.querySelectorAll('.transition_figure'),
    }
}

const exampleUrls = [
    "https://assets.lummi.ai/assets/QmQTpXmZP7n5QBAppvijbbm4LL69nR3rRKQTkjXNa4UPYZ?auto=format&w=1500",
    "https://assets.lummi.ai/assets/QmSJJ1RaYRdQiLc4ookd9mZFBvA89s7sBoJgKFrtZUYZfZ?auto=format&w=1500",
    "https://assets.lummi.ai/assets/QmNLp8R9b71HLTLBJkGssbJWCqo4LWZ3vkqpLsjZgxW7R7?auto=format&w=1500",
    "https://assets.lummi.ai/assets/QmTv7Cv4ZTrFGGtBYByfMME9feFqAbHo2ZQH5BdETGPq9A?auto=format&w=1500",
    "https://assets.lummi.ai/assets/QmNaeHZVH4xCEKVW39YN2Uzgs437iYSWiN9Bjf5hEQwgd2?auto=format&w=1500",
    "https://assets.lummi.ai/assets/QmT6DGxzW2WvPe6ecuKX5WDtwttXocJ8e1dxV3qndT6ak7?auto=format&w=1500"
];

const headphonesUrl = [
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685158f6f88836baa887ab7_image-product.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685157414c88707f3380e12_image-gallery-3.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685153e0eac814a09e2545e_image-gallery-3.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/66851511ce562bb1300b2181_image-product.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514ea5a9ed8fbff626346_image-gallery-3.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514d370d95079ea05e1ab_image-gallery-1.webp"
]

const earphonesUrl = [
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515d8e5fda663bda61c5a_image-product.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515ec8cac803568e2cc42_image-gallery-3.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6686938f7ca7bb0b59b7e34f_image-gallery-1.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515ec8cac803568e2cc42_image-gallery-3.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6686938f7ca7bb0b59b7e34f_image-gallery-1.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685142bf2eff78b4fe00fd8_image-earphones-yx1.webp",
]

const speakersUrl = [
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685b574d7aca2296742b9a8_image-speaker-zx9.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685164e87761e4ce89a1f28_image-gallery-3.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685164e2492ff79aa388873_image-gallery-1.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685164ec490eff43eb791ad_image-product.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668516a8add4786765765949_image-product.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668516a887761e4ce89a54b9_image-gallery-3.webp",
]

const homeUrl = [
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170f51d70afae77c65d6_image-xx99-mark-one-headphones.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170fdc4e39c5d2f199d6_image-xx99-mark-two-headphones.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170fec6db407d8fa8fc5_image-xx59-headphones.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170f3de22134739f3550_image-zx9-speaker.jpg",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170f9fdbb3639bbfae6f_image-zx7-speaker.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515d80c6cad858d9876b4_image-category-page-preview.webp",
]

const checkoutUrl = [
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685153e0eac814a09e2545e_image-gallery-3.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685157414c88707f3380e12_image-gallery-3.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514d370d95079ea05e1ab_image-gallery-1.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514bbddd019b6098296f7_image-gallery-3.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668516bcfca75909ddf5922c_image-gallery-1.webp",
    "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668517346225e9a7f7b26f5c_image-best-gear.webp",
]

const pagetoImageUrl = {
    "home": homeUrl,
    "headphones": headphonesUrl,
    "earphones": earphonesUrl,   
    "speakers": speakersUrl,
    "checkout": checkoutUrl,
    "products": homeUrl,
}

const createTransitionElements = (imageUrls) => {
    // Start with the opening divs
    let transitionHTML = `<div class="transition-smooth">
            <div class="transition_wrapper-smooth">`;

    // Loop through the image URLs and create figure elements
    imageUrls.forEach(url => {
        transitionHTML += `
                <figure class="transition_figure">
                    <img
                        class="transition_image"
                        src="${url}"
                        alt=""
                    />
                </figure>`;
    });

    // Close the divs
    transitionHTML += `
            </div>
        </div>`;

    return transitionHTML;
}



const transitionElementsTest = (data) => {
    const imageUrls = pagetoImageUrl[data.next.namespace]
    console.log('### transitionElementsTest -', data.next.namespace)
    return new Promise((resolve) => {
        const tempDiv = document.createElement('div');
        const createdHtml = createTransitionElements(imageUrls)
        tempDiv.innerHTML = createdHtml;
        document.body.appendChild(tempDiv.firstChild); 
        resolve();
    });
}

export const initTransition = async (data) => {
    await transitionElementsTest(data)
    let transition = getTransition()
    gsap.set(transition.element, { yPercent: -150 });
    gsap.set(transition.figures, { rotateY: 5, rotateX: 5, yPercent: -50 });
};

export const leaveTransition = () => {
    const tl = gsap.timeline({ defaults: { duration: 1.8, ease: 'expo.out' } });
    let transition = getTransition()

    // -> Returns a Promise that resolves when the "transition.wrapper" animation is complete
    return new Promise((resolve) => {
        tl.to(transition.element, {
            yPercent: 30,  
        })
        .to(
            transition.figures,
            {
                duration: 2.4,
                rotateY: -5, // helps parallex
                rotateX: -5, // helps parallex
                yPercent: 115, // helps parallex
                ease: 'power2.in',
                stagger: {
                    amount: 0.25,
                    grid: 'auto',
                    from: 'center',
                },
                onComplete: () => {
                    console.log('ON COMPLETE')
                    // gsap.set(transition.element, { yPercent: -150 }),
                    // gsap.set(transition.figures, { yPercent: 0 }),
                    document.querySelector('.transition-smooth').remove()
                    resolve()
                },
            },
            0 //-> Starts at the same time as the wrapper animation
        )
    });
};

//////////////////////////////////////////////////////////////////////////////////////////


export function fadeOutNavA(data) {
    console.log('fadeOutNavA')
    const elems = data.current.container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper')
    gsap.to(elems, { opacity: 0, duration: 0.25, stagger: 0.1, ease: 'power4.inout' })

    const elemsNext = data.next.container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper')
    gsap.set(elemsNext, { opacity: 0 })
}

function addShuffleEffect(element) {
    console.log('addShuffleEffect')

    return new Promise((resolve, reject) => {
        const chars = element.querySelectorAll(".char");
        const originalText = [...chars].map((char) => char.textContent);
        const shuffleInterval = 10;
        const resetDelay = 5; // 75
        const additionalDelay = 80; // 150
        const opacityDelay = 50; // Adjust this to fine-tune the opacity change timing
        const initialDelay = 100; // Introduce a slight initial delay for all characters

        // Initialize all characters with opacity 0
        chars.forEach((char) => {
            gsap.set(char, { opacity: 0 });
        });

        gsap.set(element, {
            opacity: 1,
        });

        chars.forEach((char, index) => {
            if (index === 0) {
                gsap.set(char, { opacity: 1 }); // Explicitly set opacity to 1 for the first character
            }
        });

        // Explicitly animate the first character's opacity to 1
        // gsap.to(chars[0], { opacity: 1, duration: 0.1, delay: initialDelay });

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
 
const getHeroElement = (data) => {
    return {
        productImgWrapper: data.next.container.querySelector('.product-image-wrapper-wrapper'),
        productImgTextWrapper: data.next.container.querySelector('.product-page-text-wrapper'),
        productTextParagraph: data.next.container.querySelector('.headphone-text-paragraph'),
        productPriceWrapperTitle: data.next.container.querySelector('.product-price-wrapper-title'),
        productPriceWrapperTitleChars: data.next.container.querySelector('.product-price-wrapper-title > div'),
        addToCartBtn: data.next.container.querySelector('#add-to-cart'),
        
        btnElemTop: data.next.container.querySelector('.btn-elem-top'),
        btnElemBottom: data.next.container.querySelector('.btn-elem-bottom'),

        h1: data.next.container.querySelector('h1'),
        // figures: document.querySelectorAll('.transition_figure'),
    }
}

function scaleToZero(element, origin) {
        gsap.to(element, {
            duration: 0.5, // Adjust the duration as needed
            ease: 'power2.inOut', // Adjust the easing as needed
            scaleY: 0, // Scale back to the original value (1)
            transformOrigin: origin
        });
}

const animateSpin = (heading, chars) => {
    gsap.timeline({ defaults: { duration: 1.0, ease: 'expo.inOut' } })
    // gsap.timeline({ defaults: { duration: 3.2, ease: 'expo.inOut' } })
        .to(heading, {
            yPercent: 0,
            rotate: 0,
        })
        .to(chars,
            {
                yPercent: 0,
                stagger: 0.05,
            },
            0
        );
};

function initHero(heroElement) {
    return new Promise((resolve, reject) => {

        // gsap.set([heroElement.h1, heroElement.productTextParagraph, heroElement.productpriceWrapper], {
        gsap.set([heroElement.h1, heroElement.productTextParagraph], {
            opacity: 0,
        });

        gsap.set(heroElement.addToCartBtn, {
            color: '#d87d4a',
        });

        gsap.set([heroElement.btnElemTop, heroElement.btnElemBottom], {
            scaleY: 1,
        });

        gsap.set([heroElement.productPriceWrapperTitle], { yPercent: -250, rotate: -15 });
        gsap.set([heroElement.productPriceWrapperTitleChars], { yPercent: -100 });

        resolve();
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

function colorChange(element) {
    gsap.to(element,  {
        color: '#fff',
        duration: 0.75,
        ease: 'power3.inout',
    })
}

function heroMoveTest(heroElement) {
    console.log('heroMoveTest')
    const tl = gsap.timeline({ defaults: { duration: 0.75, ease: 'power4.inout' } });
    
    // Initial animations
    tl.from(heroElement.productImgWrapper, { opacity: 0, xPercent: -100, duration: 0.25, ease: 'power4.inout' })
    tl.from(heroElement.productImgTextWrapper, { opacity: 0, xPercent: 100, duration: 0.25, ease: 'power4.inout' }, '<') // '<' means at the same time as the previous animation
        
}

export const productsHeroEnter = async (data) => {
    const heroElement = getHeroElement(data)
    
    await initHero(heroElement)

    const h1Split = new SplitType(heroElement.h1, {
        types: "words, chars",
      });

    const spinSplit = new SplitType(heroElement.productpriceWrapper, {
    types: "words, chars",
    });

    const animationTimeline = gsap.timeline({ defaults: { ease: 'power4.inout' } })
       .add(heroMoveTest(heroElement), 0) // Starts at 0s
       .add(() => addShuffleEffect(heroElement.h1), 0.5) // Starts 0.5s after the previous animation
       .add(() => fadeIn(heroElement.productTextParagraph), 1) // Starts 0.75s after the previous animation
       .add(() => animateSpin(heroElement.productPriceWrapperTitle, heroElement.productPriceWrapperTitleChars), 1.1) // Starts 0.75s after the previous animation
       .add(() => scaleToZero(heroElement.btnElemTop, 'top'), 1.7) // Starts 1s after the previous animation
       .add(() => scaleToZero(heroElement.btnElemBottom, 'bottom'), 1.7) // Starts 1s after the previous animation
       .add(() => colorChange(heroElement.addToCartBtn), 1.7) // Starts 0.75s after the previous animation
}


//////////////////////////////////////////////////////////////////////////////////////////
/* CATEGORIES */

const getCategoryElement = (container) => {
    return {

        catHero: container.querySelector('.category-hero'),
        // catNavBarA: document.querySelectorAll('.navbar > a, nav > a'),
        catNavBarA: container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper'),
        catTitle: container.querySelector('.category-h1'),
        catTitleChars: container.querySelector('.category-h1 > div'),

        catImgWrapper: container.querySelector('.category-item-image-wrapper-wrapper'),
        catH2: container.querySelector('.category-item-h2'),
        catNewProduct: container.querySelector('.typed-text'),
        catParagraph: container.querySelector('.headphone-text-paragraph'),
        catBtnElemTop: container.querySelector('.btn-elem-top'),
        catBtnElemBottom: container.querySelector('.btn-elem-bottom'),

        catBtn: container.querySelector('.btn-1'),
    }
}

export function initCategories(elem) {
    return new Promise((resolve, reject) => {

        gsap.set(elem.catHero, {
            yPercent: -100
        })
    
        gsap.set(elem.catImgWrapper, { opacity: 0, xPercent: -100 })

        gsap.set([elem.catParagraph, elem.catH2], {
            opacity: 0,
        });

        gsap.set(elem.catNewProduct, { opacity: 0, yPercent: 100 })


        gsap.set([elem.catTitle], { yPercent: -250, rotate: -15 });
        gsap.set([elem.catTitleChars], { yPercent: -100 });


        gsap.set(elem.catBtn, {
            color: '#d87d4a',
        });

        gsap.set([elem.catBtnElemTop, elem.catBtnElemBottom], {
            scaleY: 1,
        });

        resolve();
    });
}

function catHeroMoveTest(elem) {
    console.log('heroMoveTest')
    const tl = gsap.timeline({ defaults: { duration: 0.75, ease: 'power4.inout' } });
    
    // Initial animations
    tl.to(elem.catImgWrapper, { opacity: 1, xPercent: 0, duration: 0.25, ease: 'power4.inout' })
    // tl.from(elem.productImgTextWrapper, { opacity: 0, xPercent: 100, duration: 0.25, ease: 'power4.inout' }, '<') // '<' means at the same time as the previous animation
        
}

const navBarFadeIn = (elem) => {
    gsap.to(elem.catNavBarA, { opacity: 1, duration: 0.25, stagger: 0.075, ease: 'power4.inout' })
}


const moveToZeroYPercent = (element) => {
    gsap.to(element, { 
        yPercent: 0, 
        opacity: 1,
        duration: 0.75, 
        ease: 'power4.inout' })
}

export const categoryAnimation = async (container, introSelector) => {
    new SplitType(container.querySelector('.category-h1'), {
        types: "words, chars",
    });

    
    const categoryElement = getCategoryElement(container)
    console.log('categoryElement:', categoryElement)

    new SplitType(categoryElement.catH2, {
        types: "words, chars",
    });

    await initCategories(categoryElement)
    
    const animationTimeline = gsap.timeline({ 
        defaults: { ease: 'power4.inout' }
    })
    
        .add(() => navBarFadeIn(categoryElement), 0) // Starts 0.75s after the previous animation
        .add(() => heroIntroLoad(container, introSelector), 0.5)
        .add(() => animateSpin(categoryElement.catTitle, categoryElement.catTitleChars), 0.8) // Starts 0.75s after the previous animation
        .add(() => catHeroMoveTest(categoryElement), 1.5) // Starts 0.75s after the previous animation
        .add(() => addShuffleEffect(categoryElement.catH2), 1.7) // Starts 0.5s after the previous animation
        .add(() => fadeIn(categoryElement.catParagraph), 2.3) // Starts 0.75s after the previous animation
        .add(() => scaleToZero(categoryElement.catBtnElemTop, 'top'), 2.4) // Starts 1s after the previous animation
        .add(() => scaleToZero(categoryElement.catBtnElemBottom, 'bottom'), 2.4) // Starts 1s after the previous animation
        .add(() => colorChange(categoryElement.catBtn), 2.6) // Starts 0.75s after the previous animation
        .add(() => moveToZeroYPercent(categoryElement.catNewProduct), 3) // Starts 0.75s after the previous animation
        

    setTimeout(() => {
        // categoryElement.categoryTitle.innerHTML = categoryElement.categoryTitle.textContent
    }, 2000);
    
}
