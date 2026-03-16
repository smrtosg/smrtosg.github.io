// Update Indicator - Shows a dot on navbar if there's a recent update
document.addEventListener('DOMContentLoaded', function () {
    const DAYS_THRESHOLD = 7; // Show indicator if update is within last 7 days
    const pages = [
        { href: 'openbve.html', dataAttr: 'data-date' },
        { href: 'omsi2.html', dataAttr: 'data-date' },
        { href: 'labs.html', dataAttr: 'data-date' }
    ];

    function parseDate(dateString) {
        // Handle both "YYYY-MM-DD" and "YYYY-MM-DDTHH:MM:SS" formats
        return new Date(dateString);
    }

    function isRecentUpdate(dateString) {
        try {
            const updateDate = parseDate(dateString);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - updateDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= DAYS_THRESHOLD;
        } catch (e) {
            return false;
        }
    }

    function checkForUpdates() {
        let hasRecentUpdate = false;

        pages.forEach(page => {
            // Only check the update if we're not on that page
            const pageFilename = window.location.pathname.split('/').pop() || 'index.html';
            if (pageFilename !== page.href && pageFilename !== '' && pageFilename !== '/') {
                // Fetch and check the page
                fetch(page.href)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const cards = doc.querySelectorAll(`[${page.dataAttr}]`);
                        
                        // Find the most recent date
                        let mostRecentDate = null;
                        cards.forEach(card => {
                            const dateStr = card.getAttribute(page.dataAttr);
                            if (dateStr && (!mostRecentDate || new Date(dateStr) > new Date(mostRecentDate))) {
                                mostRecentDate = dateStr;
                            }
                        });

                        if (mostRecentDate && isRecentUpdate(mostRecentDate)) {
                            addUpdateIndicator(page.href);
                        }
                    })
                    .catch(err => console.log('Could not fetch ' + page.href));
            }
        });
    }

    function addUpdateIndicator(pageHref) {
        const navLink = document.querySelector(`a[href="${pageHref}"]`);
        if (navLink && !navLink.querySelector('.update-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'update-indicator';
            indicator.setAttribute('title', 'New updates available');
            navLink.appendChild(indicator);
        }
    }

    // Run check on page load
    checkForUpdates();
});
