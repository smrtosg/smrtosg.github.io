/* Dark Mode Functionality for Individual Pages */

// Initialize theme preference system
if (!window._themePreference) {
    window._themePreference = localStorage.getItem('theme-preference') || 'system';
}
if (!window._prefersDark) {
    window._prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Helper function to determine if dark mode should be applied
function shouldBeDark() {
    if (window._themePreference === 'dark') return true;
    if (window._themePreference === 'light') return false;
    return window._prefersDark; // system preference
}

// Apply initial theme
if (shouldBeDark()) {
    document.body.classList.add('dark-mode');
    updateThemeIcon('dark');
    updateHrefForDarkMode();
} else {
    updateThemeIcon('light');
}

// Follow system theme changes when preference is set to 'system'
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    window._prefersDark = e.matches;
    if (window._themePreference === 'system') {
        if (e.matches) {
            document.body.classList.add('dark-mode');
            updateThemeIcon('dark');
            updateHrefForDarkMode();
        } else {
            document.body.classList.remove('dark-mode');
            updateThemeIcon('light');
            updateHrefForDarkMode();
        }
    }
});

// Get both toggle buttons
const toggleButtonDesktop = document.getElementById('theme-toggle-desktop');
const toggleButtonMobile = document.getElementById('theme-toggle-mobile');

// Function to cycle through themes
function cycleTheme() {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(window._themePreference);
    const nextIndex = (currentIndex + 1) % themes.length;
    window._themePreference = themes[nextIndex];
    localStorage.setItem('theme-preference', window._themePreference);
    
    // Apply the new theme
    if (shouldBeDark()) {
        document.body.classList.add('dark-mode');
        updateThemeIcon('dark');
        updateHrefForDarkMode();
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon('light');
        updateHrefForDarkMode();
    }
}

// Add event listeners to both buttons if they exist
if (toggleButtonDesktop) {
    toggleButtonDesktop.addEventListener('click', cycleTheme);
}

if (toggleButtonMobile) {
    toggleButtonMobile.addEventListener('click', cycleTheme);
}
// Function to update the theme icon with animation
function updateThemeIcon(theme) {
    const themeIconDesktop = document.getElementById('theme-icon-desktop');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    const themeTextDesktop = document.getElementById('theme-text-desktop');
    const themeTextMobile = document.getElementById('theme-text-mobile');

    // Add animation class to both icons
    if (themeIconDesktop) themeIconDesktop.classList.add('animate');
    if (themeIconMobile) themeIconMobile.classList.add('animate');

    // Update the icon based on the theme
    if (theme === 'dark') {
        if (themeIconDesktop) {
            themeIconDesktop.classList.remove('fa-sun-bright');
            themeIconDesktop.classList.add('fa-moon-stars');
        }
        if (themeIconMobile) {
            themeIconMobile.classList.remove('fa-sun-bright');
            themeIconMobile.classList.add('fa-moon-stars');
        }
    } else {
        if (themeIconDesktop) {
            themeIconDesktop.classList.remove('fa-moon-stars');
            themeIconDesktop.classList.add('fa-sun-bright');
        }
        if (themeIconMobile) {
            themeIconMobile.classList.remove('fa-moon-stars');
            themeIconMobile.classList.add('fa-sun-bright');
        }
    }

    // Update the text display
    const preferenceText = {
        'light': 'Display: Light',
        'dark': 'Display: Dark',
        'system': 'Display: Follow System'
    };
    const displayText = preferenceText[window._themePreference] || 'Display: Follow System';
    
    if (themeTextDesktop) {
        themeTextDesktop.textContent = displayText;
    }
    if (themeTextMobile) {
        themeTextMobile.textContent = displayText;
    }

    // Remove the animation class after the animation ends
    setTimeout(() => {
        if (themeIconDesktop) themeIconDesktop.classList.remove('animate');
        if (themeIconMobile) themeIconMobile.classList.remove('animate');
    }, 300); // Match the duration of the CSS transition
}

function updateHrefForDarkMode() {
    /* Banners */
    const pv4Page = document.getElementById('cv-pv4');

    const isDarkMode = document.body.classList.contains('dark-mode');

    if (isDarkMode) {
        /* Banners */
        pv4Page.style.backgroundImage = "url(../img/blog/cumulativeUpd2.png)";


    } else {
        /* Banners */
        pv4Page.style.backgroundImage = "url(../img/blog/cumulativeUpd2.png)";
    }


}

// Update the scroll indicator width based on scroll position
window.addEventListener("scroll", function () {
    const scrollIndicator = document.getElementById("scroll-indicator");
    const scrollTop = window.scrollY; // Current scroll position
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight; // Total scrollable height
    const scrollPercentage = (scrollTop / scrollHeight) * 100; // Calculate scroll percentage
    scrollIndicator.style.width = scrollPercentage + "%"; // Update the width of the indicator
});