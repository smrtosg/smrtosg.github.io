// ----------swiper-slider---------
const tabs = document.querySelectorAll(".scrollable-tabs-container a");

const rightArrow = document.querySelector(".scrollable-tabs-container .right-arrow svg");
const leftArrow = document.querySelector(".scrollable-tabs-container .left-arrow svg");

const tabsList = document.querySelector(".scrollable-tabs-container ul");
const leftArrowContainer = document.querySelector(".scrollable-tabs-container .left-arrow");
const rightArrowContainer = document.querySelector(".scrollable-tabs-container .right-arrow");

const removeAllActiveClasses = () => {
    tabs.forEach(tab => {
        tab.classList.remove("active");
    });
};

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        removeAllActiveClasses();
        tab.classList.add("active");
    });
});

const manageIcons = () => {
    // Check if elements exist
    if (!tabsList || !leftArrowContainer || !rightArrowContainer) {
        return;
    }

    // Force recalculate layout
    tabsList.offsetHeight;

    // Check if scrolling is needed with a small tolerance
    const isScrollable = tabsList.scrollWidth > (tabsList.clientWidth + 2);


    if (!isScrollable) {
        // Force hide both arrows if no scrolling is needed
        leftArrowContainer.style.setProperty('display', 'none', 'important');
        rightArrowContainer.style.setProperty('display', 'none', 'important');
        leftArrowContainer.classList.remove("active");
        rightArrowContainer.classList.remove("active");
        return;
    }

    // Show arrows if scrolling is needed
    leftArrowContainer.style.setProperty('display', 'flex', 'important');
    rightArrowContainer.style.setProperty('display', 'flex', 'important');

    // Manage left arrow - hide if at the beginning
    if (tabsList.scrollLeft <= 5) {
        leftArrowContainer.classList.remove("active");
        leftArrowContainer.style.setProperty('display', 'none', 'important');
    } else {
        leftArrowContainer.classList.add("active");
        leftArrowContainer.style.setProperty('display', 'flex', 'important');
    }

    // Manage right arrow
    let maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth - 5;

    if (tabsList.scrollLeft >= maxScrollValue) {
        rightArrowContainer.classList.remove("active");
        rightArrowContainer.style.setProperty('display', 'none', 'important');
    } else {
        rightArrowContainer.classList.add("active");
        rightArrowContainer.style.setProperty('display', 'flex', 'important');
    }
};

// Add event listeners only if elements exist
if (rightArrow && tabsList) {
    rightArrow.addEventListener("click", () => {
        tabsList.scrollLeft += 200;
        setTimeout(manageIcons, 10);
    });
}

if (leftArrow && tabsList) {
    leftArrow.addEventListener("click", () => {
        tabsList.scrollLeft -= 200;
        setTimeout(manageIcons, 10);
    });
}

if (tabsList) {
    tabsList.addEventListener("scroll", () => {
        setTimeout(manageIcons, 10);
    });
}

// Add resize event listener to check arrows when window is resized
window.addEventListener("resize", () => {
    setTimeout(manageIcons, 100);
});

// Initial check when page loads
document.addEventListener("DOMContentLoaded", () => {
    // Add multiple checks to ensure it works
    setTimeout(manageIcons, 100);
    setTimeout(manageIcons, 500);
    setTimeout(manageIcons, 1000);
});

// Also check on window load
window.addEventListener("load", () => {
    setTimeout(manageIcons, 100);
});

// Enable horizontal scrolling with mouse wheel
document.addEventListener("DOMContentLoaded", function () {
    const scrollableTabsContainer = document.querySelector(".scrollable-tabs-container ul");

    if (scrollableTabsContainer) {
        scrollableTabsContainer.addEventListener("wheel", (event) => {
            event.preventDefault();
            scrollableTabsContainer.scrollLeft += event.deltaY;
        });
    }
});

// Draggable scroll for scrollableTabs with smooth easing
const scrollableTabs = document.getElementById('scrollableTabs');
let isDown = false;
let startX;
let scrollLeft;
let lastTouchX = 0;
let velocity = 0;
let lastX = 0;
let lastTime = 0;
let animationId = null;

// Easing function for smooth deceleration
function easeOut(t) {
    return t * (2 - t); // Quadratic easing out
}

// Momentum scroll animation
function animateMomentum() {
    if (Math.abs(velocity) < 0.5 || !scrollableTabs) {
        if (animationId) cancelAnimationFrame(animationId);
        animationId = null;
        return;
    }
    
    velocity *= 0.95; // Friction
    scrollableTabs.scrollLeft += velocity;
    
    animationId = requestAnimationFrame(animateMomentum);
}

if (scrollableTabs) {
    // Mouse events
    scrollableTabs.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollableTabs.classList.add('dragging');
        scrollableTabs.style.scrollBehavior = 'auto';
        startX = e.pageX - scrollableTabs.offsetLeft;
        lastX = startX;
        scrollLeft = scrollableTabs.scrollLeft;
        lastTime = Date.now();
        velocity = 0;
        if (animationId) cancelAnimationFrame(animationId);
    });

    scrollableTabs.addEventListener('mouseleave', () => {
        isDown = false;
        scrollableTabs.classList.remove('dragging');
        scrollableTabs.style.scrollBehavior = 'smooth';
        // Start momentum animation
        if (Math.abs(velocity) > 0.5) {
            animateMomentum();
        }
    });

    scrollableTabs.addEventListener('mouseup', () => {
        isDown = false;
        scrollableTabs.classList.remove('dragging');
        scrollableTabs.style.scrollBehavior = 'smooth';
        // Start momentum animation
        if (Math.abs(velocity) > 0.5) {
            animateMomentum();
        }
    });

    scrollableTabs.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollableTabs.offsetLeft;
        const walk = (x - startX) * 1.5; // Slightly reduced sensitivity for smoothness
        scrollableTabs.scrollLeft = scrollLeft - walk;
        
        // Calculate velocity for momentum
        const now = Date.now();
        const timeDelta = now - lastTime;
        if (timeDelta > 0) {
            velocity = (lastX - x) / timeDelta * 16; // Normalize to ~60fps
        }
        lastX = x;
        lastTime = now;
    });

    // Touch events
    scrollableTabs.addEventListener('touchstart', (e) => {
        isDown = true;
        scrollableTabs.classList.add('dragging');
        scrollableTabs.style.scrollBehavior = 'auto';
        startX = e.touches[0].pageX - scrollableTabs.offsetLeft;
        lastX = startX;
        scrollLeft = scrollableTabs.scrollLeft;
        lastTime = Date.now();
        velocity = 0;
        lastTouchX = e.touches[0].pageX;
        if (animationId) cancelAnimationFrame(animationId);
    }, { passive: false });

    scrollableTabs.addEventListener('touchend', () => {
        isDown = false;
        scrollableTabs.classList.remove('dragging');
        scrollableTabs.style.scrollBehavior = 'smooth';
        // Start momentum animation
        if (Math.abs(velocity) > 0.5) {
            animateMomentum();
        }
    }, { passive: false });

    scrollableTabs.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const touchX = e.touches[0].pageX - scrollableTabs.offsetLeft;
        const walk = (touchX - startX) * 1.5; // Slightly reduced sensitivity for smoothness
        scrollableTabs.scrollLeft = scrollLeft - walk;

        // Calculate velocity for momentum
        const now = Date.now();
        const timeDelta = now - lastTime;
        if (timeDelta > 0) {
            velocity = (lastX - touchX) / timeDelta * 16; // Normalize to ~60fps
        }
        lastX = touchX;
        lastTime = now;

        // Prevent vertical scroll if horizontal movement is significant
        if (Math.abs(e.touches[0].pageX - lastTouchX) > 5) {
            e.preventDefault();
        }
        lastTouchX = e.touches[0].pageX;
    }, { passive: false });
}