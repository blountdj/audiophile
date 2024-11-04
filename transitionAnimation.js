console.log('transitionAnimation.js')

import { heroIntroLoad, addShuffleEffect } from "./animations.js";

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
    // console.log('### transitionElementsTest -', data.next.namespace)
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
                    // console.log('ON COMPLETE')
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


// export function setNavOpacityZero(container) {
//     const elems = container.querySelectorAll('.navbar > a, nav > a, .nav-cart-icon-wrapper')
//     gsap.set(elems, { opacity: 0 })
// }



