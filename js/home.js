
export function homeInit(container) {
    const speakerWrapper = container.querySelector('#home-zx9-speaker-wrapper');
    const speakerBgCircles = container.querySelector('#speaker-bg-circles');
    const speakerImg = container.querySelector('#zx9-image');
    
    speakerWrapper.addEventListener('mouseover', function() {
        speakerBgCircles.classList.add('active');
        speakerImg.classList.add('active');
    })

    speakerWrapper.addEventListener('mouseout', function() {
        speakerBgCircles.classList.remove('active');
        speakerImg.classList.remove('active');
    })
}
