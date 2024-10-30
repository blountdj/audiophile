document.addEventListener('DOMContentLoaded', function() {
    console.log('category pages')
    // Get all elements with the class 'category-item-img-wrapper'
    const items = document.querySelectorAll('.category-item-image-wrapper-wrapper');
    
    // Iterate over the items and add 'is-last' class to every other item
    items.forEach((item, index) => {
        if (index % 2 === 1) {
            item.classList.add('is-last');
        }
    });
});

export function categoryPageInit() {
    new SplitType(".category-item-h2", {
        types: "words, chars",
    });
    
    const textContainers = document.querySelectorAll(".category-item-h2 >.word");
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
