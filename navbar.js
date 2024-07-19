
// MENU DROPDOWN
document.addEventListener('DOMContentLoaded', function() {
    const dropDownMenuElem = document.querySelector('#nav-dropdown-menu');
    const navMenuOverlayElem = document.querySelector('#nav-menu-overlay');
    
    let menuState = 'closed'

    function toggleNavMenu() {

        if (menuState === 'closed') {
            dropDownMenuElem.classList.remove('is-closed');
            navMenuOverlayElem.classList.remove('is-closed');
            menuState = 'open'
            const webflowNavOverlay = document.querySelector('.w-nav-overlay');
            webflowNavOverlay.style.width = '0px'
        } else if (menuState === 'open') {
            dropDownMenuElem.classList.add('is-closed');
            navMenuOverlayElem.classList.add('is-closed');
            setTimeout(() => {
                navMenuOverlayElem.display = 'none';
            }, 200);
            menuState = 'closed'
        }

    }

    const navHamburger = document.getElementById('nav-hamburger');
    navHamburger.addEventListener('click', toggleNavMenu);
});

