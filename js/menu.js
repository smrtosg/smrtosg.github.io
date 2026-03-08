    // Update display mode text and icon based on dark mode
    function updateDisplayModeMenu() {
        var a = document.getElementById('dark-mode-toggle-desktop');
        if (!a) return;
        var h5 = a.querySelector('h5.lg-menu');
        var icon = h5 ? h5.querySelector('i') : null;
        var isDark = document.body.classList.contains('dark-mode');
        if (h5 && icon) {
            if (isDark) {
                h5.innerHTML = '<i class="fa-regular fa-moon"></i> Display: Dark';
            } else {
                h5.innerHTML = '<i class="fa-regular fa-sun-bright"></i> Display: Light';
            }
        }
    }
    document.addEventListener('DOMContentLoaded', updateDisplayModeMenu);
    new MutationObserver(updateDisplayModeMenu).observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Handle Other Apps link click - set flag to open installed app on index.html
    document.addEventListener('DOMContentLoaded', function() {
        var otherAppsLink = document.getElementById('other-apps-link');
        if (!otherAppsLink) return;

        otherAppsLink.addEventListener('click', function(e) {
            var isAndroid = /Android/.test(navigator.userAgent);
            var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
            if (!isAndroid && !isIOS) {
                // Desktop - allow normal navigation
                return;
            }
            
            // Set flag to try opening apps on index.html
            sessionStorage.setItem('detectAppsOnLoad', 'true');
        });
    });