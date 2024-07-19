document.addEventListener('DOMContentLoaded', function() {
    console.log('home.js 5500')

    const speakerWrapper = document.querySelector('#home-zx9-speaker-wrapper');
    const speakerBgCircles = document.querySelector('#speaker-bg-circles');
    const speakerImg = document.querySelector('#zx9-image');
    
    speakerWrapper.addEventListener('mouseover', function() {
        speakerBgCircles.classList.add('active');
        speakerImg.classList.add('active');
    })

    speakerWrapper.addEventListener('mouseout', function() {
        speakerBgCircles.classList.remove('active');
        speakerImg.classList.remove('active');
    })

});