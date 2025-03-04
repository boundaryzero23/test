// LNB slideDown, Up
function slideDown(element, duration = 300) {
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;
    if (display === 'none') display = 'block';
    element.style.display = display;

    let height = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = '0px';
    element.offsetHeight; // force reflow

    element.style.transitionProperty = 'height';
    element.style.transitionDuration = duration + 'ms';
    element.style.height = height + 'px';

    window.setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-duration');
    }, duration);
}

function slideUp(element, duration = 300) {
    element.style.height = element.offsetHeight + 'px';
    element.style.overflow = 'hidden';
    element.offsetHeight; // force reflow
    element.style.transitionProperty = 'height';
    element.style.transitionDuration = duration + 'ms';
    element.style.height = '0px';

    window.setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-duration');
    }, duration);
}

document.addEventListener('DOMContentLoaded', function () {
    const gnbMenus = document.querySelectorAll('.menu-item');
    const lnb = document.getElementById('lnb');
    const lnbToggleBtn = document.getElementById('lnbToggleBtn');
    const lnbToggleElements = document.querySelectorAll('.lnb-tab, .lnb-menu, .lnb-search, .access-info');

    // GNB 2depth
    gnbMenus.forEach(item => {
        const submenu = item.querySelector('.sub-menu');

        item.addEventListener('mouseenter', function () {
            if (submenu) {
                submenu.style.visibility = 'visible';
                submenu.style.opacity = 1;
                submenu.style.height = submenu.scrollHeight + 'px';
            }
        });

        item.addEventListener('mouseleave', function () {
            if (submenu) {
                submenu.style.height = 0;
                submenu.style.opacity = 0;
                submenu.style.visibility = 'hidden';
            }
        });
    });

    // lnb Collpase toggle
    lnbToggleBtn.addEventListener('click', () => {
        lnb.classList.toggle('collapsed');
        lnbToggleElements.forEach(el => el.classList.toggle('hide'));
    });

    // Open initially active menus (without animation)
    document.querySelectorAll('.lnb-menu > li.active').forEach(function (li) {
        let ul = li.querySelector(':scope > ul');
        if (ul) {
            ul.style.display = 'block';
            // Auto-activate first 4th menu item
            let firstDepth4 = ul.querySelector(':scope > li');
            if (firstDepth4) {
                firstDepth4.classList.add('active');
                let depth4ul = firstDepth4.querySelector(':scope > ul');
                if (depth4ul) {
                    depth4ul.style.display = 'block';
                    // Auto-activate first 5th menu item
                    let firstDepth5 = depth4ul.querySelector(':scope > li');
                    if (firstDepth5) {
                        firstDepth5.classList.add('active');
                    }
                }
            }
        }
    });

    // 3rd menu (Top-level) click event
    document.querySelectorAll('.lnb-menu > li > a').forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            let li = this.parentElement;
            let ul = li.querySelector(':scope > ul');
            if (!li.classList.contains('active')) {
                li.classList.add('active');
                // Close other 3rd menus
                Array.from(li.parentElement.children).forEach(function (sibling) {
                    if (sibling !== li) {
                        sibling.classList.remove('active');
                        let sibUl = sibling.querySelector(':scope > ul');
                        if (sibUl) slideUp(sibUl);
                    }
                });
                if (ul) {
                    slideDown(ul);
                    // Auto-activate first 4th menu item
                    let firstDepth4 = ul.querySelector(':scope > li');
                    if (firstDepth4) {
                        firstDepth4.classList.add('active');
                        Array.from(ul.children).forEach(function (sib) {
                            if (sib !== firstDepth4) sib.classList.remove('active');
                        });
                        let depth4ul = firstDepth4.querySelector(':scope > ul');
                        if (depth4ul) {
                            slideDown(depth4ul);
                            // Auto-activate first 5th menu item
                            let firstDepth5 = depth4ul.querySelector(':scope > li');
                            if (firstDepth5) {
                                firstDepth5.classList.add('active');
                                Array.from(depth4ul.children).forEach(function (sib) {
                                    if (sib !== firstDepth5) sib.classList.remove('active');
                                });
                            }
                        }
                    }
                }
            } else {
                li.classList.remove('active');
                if (ul) slideUp(ul);
            }
        });
    });

    // 4th menu click event
    document.querySelectorAll('.depth-4 > li > a').forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            let li = this.parentElement;
            let ul = li.querySelector(':scope > ul');
            if (!li.classList.contains('active')) {
                li.classList.add('active');
                // Close sibling 4th menus
                Array.from(li.parentElement.children).forEach(function (sibling) {
                    if (sibling !== li) {
                        sibling.classList.remove('active');
                        let sibUl = sibling.querySelector(':scope > ul');
                        if (sibUl) slideUp(sibUl);
                    }
                });
                if (ul) {
                    slideDown(ul);
                    // Auto-activate first 5th menu item (if exists)
                    let firstDepth5 = ul.querySelector(':scope > li');
                    if (firstDepth5) {
                        firstDepth5.classList.add('active');
                        Array.from(ul.children).forEach(function (sibling) {
                            if (sibling !== firstDepth5) sibling.classList.remove('active');
                        });
                    }
                }
            } else {
                li.classList.remove('active');
                if (ul) slideUp(ul);
            }
        });
    });

    // 5th menu click event
    document.querySelectorAll('.depth-5 > li > a').forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            let li = this.parentElement;
            li.classList.add('active');
            Array.from(li.parentElement.children).forEach(function (sibling) {
                if (sibling !== li) sibling.classList.remove('active');
            });
        });
    });
});