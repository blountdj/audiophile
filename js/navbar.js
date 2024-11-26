
let menuState = 'closed'

const getMenuElement = (contaier) => {
    return {
        dropDownMenuElem: document.querySelector('#nav-dropdown-menu'),
        navMenuOverlayElem: document.querySelector('#nav-menu-overlay'),
        menuLinks: document.querySelectorAll('a.menu-btn-3'),
        navHamburger: contaier.querySelector('#nav-hamburger'),
        webflowNavOverlay: document.querySelector('.w-nav-overlay')
    }
}

function toggleNavMenu( menuElem) {
    // event.preventDefault()
    // console.log('toggleNavMenu: menuState:', menuState)
    const webflowNavOverlay = document.querySelector('.w-nav-overlay')
    if (menuState === 'closed') {
        menuElem.dropDownMenuElem.classList.remove('is-closed');
        menuElem.navMenuOverlayElem.classList.remove('is-closed');
        menuState = 'open'
        // TODO - prevent scoll
        
        // webflowNavOverlay.style.width = '0px'

    } else if (menuState === 'open') {
        menuElem.dropDownMenuElem.classList.add('is-closed');
        menuElem.navMenuOverlayElem.classList.add('is-closed');
        setTimeout(() => {
            menuElem.navMenuOverlayElem.display = 'none';
        }, 200);
        menuState = 'closed'
    }
}

export const navbarInit = (contaier) => {
    // console.log('navbarInit')
    const menuElem = getMenuElement(contaier)

    menuElem.navHamburger.addEventListener('click', () => toggleNavMenu(menuElem));

    menuElem.menuLinks.forEach(link => {
        if (!link.hasEventListener) {
            link.hasEventListener = true;
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Stops page navigation
                toggleNavMenu(menuElem)
            })
        }
    })
};
