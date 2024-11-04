
export function alternateCategoryItems(container) {
    const items = container.querySelectorAll('.category-item-image-wrapper-wrapper');
    
    // Iterate over the items and add 'is-last' class to every other item
    items.forEach((item, index) => {
        if (index % 2 === 1) {
            item.classList.add('is-last');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // console.log('category pages')
    // Get all elements with the class 'category-item-img-wrapper'
    // const items = document.querySelectorAll('.category-item-image-wrapper-wrapper');
    
    // // Iterate over the items and add 'is-last' class to every other item
    // items.forEach((item, index) => {
    //     if (index % 2 === 1) {
    //         item.classList.add('is-last');
    //     }
    // });
    alternateCategoryItems(document)
});

export function categoryPageInit(container) {
    console.log('categoryPageInit')

    alternateCategoryItems(container)

    new SplitType(".category-item-h2", {
        types: "words, chars",
    });
    
    const textContainers = container.querySelectorAll(".category-item-h2 >.word");
    const defaultScale = 1;
    const maxScale = 1.6;
    const neighborScale = 1.3;
    
    textContainers.forEach((textContainer) => {
    const spans = textContainer.querySelectorAll(".char");
    
    textContainer.addEventListener("mousemove", (e) => {
        const target = e.target;
        const index = Array.from(spans).indexOf(target);
    
        spans.forEach((span, i) => {
        let scale = defaultScale;
    
        if (i === index) {
            // Scale the hovered span to 2
            scale = maxScale;
        } else if (i === index - 1 || i === index + 1) {
            // Scale the side neighbors to 1.5
            scale = neighborScale;
        }
    
        span.style.transform = `scaleY(${scale})`;
        });
    });
    
    textContainer.addEventListener("mouseleave", () => {
        spans.forEach((span) => {
            span.style.transform = `scaleY(${defaultScale})`;
            });
        });
    });


}


/////////////////////////////////////////////////////////////////////////
/* Btn Hover Animation */

export const btnHoverAnimation = (container) => {

    const wrapper = container.querySelectorAll(".btn-wrapper");
    const btnText = container.querySelectorAll(".btn-wrapper > .btn-1");

    wrapper.forEach((wrapper) => {
        wrapper.addEventListener("mousemove", (e) => moveEvent(e, wrapper, btnText));
        wrapper.addEventListener("mouseleave", (e) => leaveEvent(e, wrapper, btnText));
    })
}

const moveEvent = (e, wrapper, btnText) => {
    // console.log('moveEvent')
  const wrapperRect = wrapper.getBoundingClientRect();

  const relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
  const relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);

  const textMaxDisplacement = 35;

  const textDisplacementX = (relX / wrapperRect.width) * textMaxDisplacement;
  const textDisplacementY = (relY / wrapperRect.height) * textMaxDisplacement;

  gsap.to(btnText, {
    x: textDisplacementX,
    y: textDisplacementY,
    // ease: "power3.inout",
    duration: 0.35,
  });
};

const leaveEvent = (e, wrapper, btnText) => {
    // console.log('leaveEvent')
  gsap.to([btnText], {
    x: 0,
    y: 0,
    // ease: "power3.inout",
    duration: 1,
  });
};


