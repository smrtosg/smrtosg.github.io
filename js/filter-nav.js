document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("filterDropdown");
    const button = dropdown?.querySelector(".eicw-nav-btn");
    const label = dropdown?.querySelector(".eicw-nav-label");

    if (!dropdown || !button || !label) {
        return;
    }

    const filterButtons = document.querySelectorAll(".btn-filter");

    function closeDropdown() {
        dropdown.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
    }

    button.addEventListener("click", function (event) {
        event.stopPropagation();
        const isOpen = dropdown.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
    });

    filterButtons.forEach(function (filterButton) {
        filterButton.addEventListener("click", function () {
            const icon = filterButton.querySelector("i");
            if (icon) {
                label.replaceChildren(icon.cloneNode(true), document.createTextNode(filterButton.textContent.trim()));
            }
            closeDropdown();
        });
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            closeDropdown();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && dropdown.classList.contains("open")) {
            closeDropdown();
            button.focus();
        }
    });
});

(function () {
    const navWrap = document.querySelector(".sticky-nav-wrap");
    if (!navWrap) {
        return;
    }

    const placeholder = document.createElement("div");
    placeholder.className = "sticky-nav-placeholder";
    placeholder.style.display = "none";
    navWrap.after(placeholder);

    let originalTop = null;
    let isSticky = false;

    function calculateOriginalTop() {
        const rect = navWrap.getBoundingClientRect();
        originalTop = rect.top + window.scrollY;
    }

    function checkSticky() {
        if (originalTop === null || window.innerWidth > 994) {
            return;
        }

        const threshold = originalTop - 20;
        if (!isSticky && window.scrollY >= threshold) {
            isSticky = true;
            navWrap.classList.add("is-sticky");
            placeholder.style.height = navWrap.offsetHeight + "px";
            placeholder.style.display = "block";
        } else if (isSticky && window.scrollY < threshold) {
            isSticky = false;
            navWrap.classList.remove("is-sticky");
            placeholder.style.display = "none";
        }
    }

    function refreshStickyState() {
        if (isSticky) {
            navWrap.classList.remove("is-sticky");
            placeholder.style.display = "none";
            isSticky = false;
        }
        calculateOriginalTop();
        checkSticky();
    }

    if (document.readyState === "complete") {
        refreshStickyState();
    } else {
        window.addEventListener("load", refreshStickyState, { once: true });
    }

    window.addEventListener("scroll", checkSticky, { passive: true });
    window.addEventListener("resize", refreshStickyState, { passive: true });
})();

(function () {
    const dropdown = document.getElementById("filterDropdown");
    const navWrap = document.querySelector(".sticky-nav-wrap");
    const navbar = document.querySelector(".navbar");
    const navbarContainer = document.querySelector(".navbar-container");

    if (!dropdown || !navWrap || !navbar || !navbarContainer) {
        return;
    }

    let isMerged = false;
    let escapedMenu = null;

    const observer = new MutationObserver(function () {
        if (!escapedMenu) {
            return;
        }

        const isOpen = dropdown.classList.contains("open");
        escapedMenu.style.opacity = isOpen ? "1" : "";
        escapedMenu.style.visibility = isOpen ? "visible" : "";
        escapedMenu.style.pointerEvents = isOpen ? "auto" : "";
        escapedMenu.style.transform = isOpen ? "translateY(0)" : "";
    });
    observer.observe(dropdown, { attributes: true, attributeFilter: ["class"] });

    function mergeDropdown() {
        if (isMerged) {
            return;
        }

        escapedMenu = dropdown.querySelector(".eicw-nav-menu");
        const navbarNav = navbar.querySelector(".navbar-nav");
        navbar.insertBefore(dropdown, navbarNav);
        if (escapedMenu) {
            navbarContainer.appendChild(escapedMenu);
            escapedMenu.classList.add("navbar-escaped-menu");
        }
        navbar.classList.add("has-section-nav");
        dropdown.classList.add("navbar-merged");
        navWrap.classList.add("nav-merged-desktop");
        isMerged = true;
    }

    function unmergeDropdown() {
        if (!isMerged) {
            return;
        }

        if (escapedMenu) {
            dropdown.appendChild(escapedMenu);
            escapedMenu.classList.remove("navbar-escaped-menu");
            escapedMenu.style.opacity = "";
            escapedMenu.style.visibility = "";
            escapedMenu.style.pointerEvents = "";
            escapedMenu.style.transform = "";
            escapedMenu = null;
        }

        navWrap.insertBefore(dropdown, null);
        navbar.classList.remove("has-section-nav");
        dropdown.classList.remove("navbar-merged");
        navWrap.classList.remove("nav-merged-desktop");
        isMerged = false;
    }

    function updateMerge() {
        if (window.innerWidth > 994) {
            mergeDropdown();
        } else {
            unmergeDropdown();
        }
    }

    updateMerge();
    window.addEventListener("resize", updateMerge, { passive: true });
})();
