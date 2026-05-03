/* Sync Cookies Banner with Theme Mode */

function updateCookieBannerTheme() {
    const cookieBanner = document.querySelector('.cookiebanner');
    
    if (!cookieBanner) {
        // Banner not yet loaded, retry after a short delay
        setTimeout(updateCookieBannerTheme, 500);
        return;
    }
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        // Dark mode colors
        cookieBanner.style.background = '#1c1f2b';
        cookieBanner.style.color = '#ffffff';
        cookieBanner.style.borderTop = '1px solid #2b2b2b33';
        
        // Update link color
        const link = cookieBanner.querySelector('a');
        if (link) {
            link.style.color = '#80a8cc';
        }
    } else {
        // Light mode colors
        cookieBanner.style.background = '#f2f3e5';
        cookieBanner.style.color = '#000000';
        cookieBanner.style.borderTop = 'none';
        
        // Update link color
        const link = cookieBanner.querySelector('a');
        if (link) {
            link.style.color = '#0070bf';
        }
    }
}

// Apply theme when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCookieBannerTheme();
});

// Watch for theme changes
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            updateCookieBannerTheme();
        }
    });
});

// Start observing the body element for class changes
observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
});
