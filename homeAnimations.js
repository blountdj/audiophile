console.log('homeAnimations.js')

export function heroIntroLoad(container, selector, delay = 0) {
    console.log('heroIntroLoad')
    const heroElem = container.querySelector(selector)
    // gsap.set(heroElem, {
    //     yPercent: -100
    // })
    gsap.to(heroElem, {
        yPercent: 0,
        duration: 0.75,
        delay: delay,
        ease: 'power4.inOut'
    })
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
