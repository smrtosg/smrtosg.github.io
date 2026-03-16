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

    function getNormalizedPath(href) {
        // Extract just the filename from various path formats
        return href.split('/').pop();
    }

    function findNavLink(pageHref) {
        // Try to find link by exact href first
        let link = document.querySelector(`a[href="${pageHref}"]`);
        if (link) return link;
        
        // Try with relative path prefix
        link = document.querySelector(`a[href="../${pageHref}"]`);
        if (link) return link;
        
        // Try with ./ prefix
        link = document.querySelector(`a[href="./${pageHref}"]`);
        if (link) return link;
        
        // Fallback: find by matching the normalized filename
        const allLinks = document.querySelectorAll('a[href*="' + pageHref + '"]');
        return allLinks.length > 0 ? allLinks[0] : null;
    }

    function checkForUpdates() {
        pages.forEach(page => {
            // Only check the update if we're not on that page
            const pageFilename = window.location.pathname.split('/').pop() || 'index.html';
            if (pageFilename !== page.href) {
                // Try multiple fetch paths (relative and absolute)
                const fetchPaths = [page.href, '../' + page.href];
                
                function tryFetch(paths, index) {
                    if (index >= paths.length) return;
                    
                    fetch(paths[index])
                        .then(response => {
                            if (!response.ok) throw new Error('Not found');
                            return response.text();
                        })
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
                                addUpdateIndicator(page.href, mostRecentDate);
                            }
                        })
                        .catch(err => {
                            // Try next path
                            tryFetch(paths, index + 1);
                        });
                }
                
                tryFetch(fetchPaths, 0);
            }
        });
    }

    function addUpdateIndicator(pageHref, mostRecentDate) {
        const navLink = findNavLink(pageHref);
        if (navLink && !navLink.querySelector('.update-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'update-indicator';
            indicator.setAttribute('title', 'New updates available');
            
            // Store the page on click to trigger highlighting
            navLink.addEventListener('click', function(e) {
                // Store in sessionStorage so we can access it on the target page
                sessionStorage.setItem('highlightRecentUpdates', 'true');
            });
            
            navLink.appendChild(indicator);
        }
    }

    // Highlight all cards updated in the last 7 days on current page
    function highlightRecentUpdates() {
        const shouldHighlight = sessionStorage.getItem('highlightRecentUpdates');
        if (shouldHighlight) {
            // Clear it so it only applies once
            sessionStorage.removeItem('highlightRecentUpdates');
            
            // Find all cards with data-date attribute
            const cards = document.querySelectorAll('[data-date]');
            let highlightedAny = false;
            
            cards.forEach(card => {
                const cardDate = card.getAttribute('data-date');
                if (cardDate && isRecentUpdate(cardDate)) {
                    card.classList.add('highlight-update');
                    highlightedAny = true;
                }
            });
            
            // Scroll to first highlighted card if any exist
            if (highlightedAny) {
                const firstHighlighted = document.querySelector('.highlight-update');
                if (firstHighlighted) {
                    setTimeout(() => {
                        firstHighlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                }
            }
        }
    }

    // Run checks on page load
    checkForUpdates();
    highlightRecentUpdates();
});
