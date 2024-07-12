// CART NUMBER ICON DISPLAY TOGGLE
document.addEventListener('DOMContentLoaded', function() {
    const navCartQtyCountElem = document.querySelector('#nav-cart-items-count');
    navCartQtyCountElem.style.display = navCartQtyCountElem.textContent === '0' ? 'none' : 'flex';
});

// MENU DROPDOWN
document.addEventListener('DOMContentLoaded', function() {
    const dropDownMenuElem = document.querySelector('#nav-dropdown-menu');
    const navMenuOverlayElem = document.querySelector('#nav-menu-overlay');
    
    
    let menuState = 'closed'

    function toggleNavMenu() {

        if (menuState === 'closed') {
            console.log('menu clicked - opening')
            dropDownMenuElem.classList.remove('is-closed');
            navMenuOverlayElem.classList.remove('is-closed');
            menuState = 'open'
            const webflowNavOverlay = document.querySelector('.w-nav-overlay');
            webflowNavOverlay.style.width = '0px'
        } else if (menuState === 'open') {
            console.log('menu clicked - closing')
            dropDownMenuElem.classList.add('is-closed');
            navMenuOverlayElem.classList.add('is-closed');
            menuState = 'closed'
        }

    }

    const navHamburger = document.getElementById('nav-hamburger');
    navHamburger.addEventListener('click', toggleNavMenu);


    const webflowNavOverlay = document.querySelector('.w-nav-overlay');
    // webflowNavOverlay.style.display = 'none'
    console.log('remove webflow overlay')
});

