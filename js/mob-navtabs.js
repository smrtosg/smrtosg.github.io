// Collapse desktop nav labels and mobile nav labels based on scroll direction.
(function () {
    var lastScrollY = window.scrollY;
    var desktopNav = document.querySelector('.navbar-container');
    var mobileNav = document.querySelector('.mobile-bottom-nav');
    var ticking = false;

    function updateNavigation() {
        var currentScrollY = window.scrollY;
        var scrollingDown = currentScrollY > lastScrollY + 4;
        var scrollingUp = currentScrollY < lastScrollY - 4;

        if (desktopNav) {
            if (currentScrollY <= 50 || scrollingUp) {
                desktopNav.classList.remove('scrolled');
            } else if (scrollingDown) {
                desktopNav.classList.add('scrolled');
            }
        }

        if (mobileNav) {
            if (window.innerWidth > 994 || scrollingUp) {
                mobileNav.classList.remove('labels-hidden');
            } else if (scrollingDown) {
                mobileNav.classList.add('labels-hidden');
            }
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', function () {
        if (ticking) return;

        window.requestAnimationFrame(function () {
            updateNavigation();
            ticking = false;
        });
        ticking = true;
    }, { passive: true });

    window.addEventListener('resize', function () {
        lastScrollY = window.scrollY;
        if (window.innerWidth > 994) {
            if (desktopNav) desktopNav.classList.remove('scrolled');
            if (mobileNav) mobileNav.classList.remove('labels-hidden');
        }
    });
})();

// Toggle .at-top class based on scroll position
function updateBreadcrumbAtTop() {
    var bc = document.getElementById('floating-breadcrumb');
    if (!bc) return;
    if (window.scrollY <= 0) {
        bc.classList.add('at-top');
    } else {
        bc.classList.remove('at-top');
    }
}
window.addEventListener('scroll', updateBreadcrumbAtTop, { passive: true });
window.addEventListener('DOMContentLoaded', updateBreadcrumbAtTop);

// Turn the fixed mobile breadcrumb into a back button while keeping desktop crumbs intact.
(function () {
    var list = document.getElementById('floating-breadcrumb');
    if (!list || list.dataset.backButtonApplied === 'true') return;

    var items = list.querySelectorAll('li.breadcrumb-item');
    var backLink = list.dataset.backHref ? null : items.length > 1
        ? items[items.length - 2].querySelector('a[href]')
        : list.querySelector('a[href]');
    var href = list.dataset.backHref || (backLink && backLink.getAttribute('href'));
    if (!href) return;

    var label = list.dataset.backLabel || 'Back';
    var nav = list.closest('nav');
    if (nav) nav.setAttribute('aria-label', label);

    var link = document.createElement('a');
    link.setAttribute('href', href);
    link.setAttribute('aria-label', label);

    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-arrow-left';
    icon.setAttribute('aria-hidden', 'true');
    link.appendChild(icon);

    var item = document.createElement('li');
    item.className = 'breadcrumb-item';
    item.appendChild(link);
    list.replaceChildren(item);
    list.dataset.backButtonApplied = 'true';
})();

// Provide light haptic feedback for touch interactions when supported.
(function () {
    if (typeof navigator.vibrate !== 'function') return;

    var selector = [
        'a',
        'button',
        '[role="button"]',
        '.nav-link',
        '.mobile-bottom-nav a',
        '.list-group-item',
        'summary'
    ].join(',');

    document.addEventListener('pointerdown', function (event) {
        if (event.pointerType !== 'touch' || !event.target.closest) return;
        var target = event.target.closest(selector);
        if (!target) return;

        var isNavItem = target.closest('.mobile-bottom-nav');
        navigator.vibrate(isNavItem ? 18 : 8);
    }, { passive: true });
})();