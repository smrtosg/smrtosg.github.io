// Update Indicator - Shows a dot on navbar if there's a recent update
(function () {
const scriptSrc = document.currentScript ? document.currentScript.src : null;

document.addEventListener('DOMContentLoaded', function () {
    const DAYS_THRESHOLD = 7; // Show indicator if update is within last 7 days
    let releaseDataPromise;
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
        const diffTime = new Date() - parseDate(dateString);
        return diffTime >= 0 && diffTime <= DAYS_THRESHOLD * 24 * 60 * 60 * 1000;
    }

    function parseReleaseDate(value) {
        const match = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/.exec(value);
        if (!match) return null;
        const year = Number(match[3]) + (match[3].length === 2 ? 2000 : 0);
        const month = Number(match[2]);
        const day = Number(match[1]);
        const date = new Date(Date.UTC(year, month - 1, day));
        if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
            return null;
        }
        return date.toISOString().slice(0, 10);
    }

    function loadReleaseDates() {
        if (!releaseDataPromise) {
            const url = scriptSrc ? new URL('../releases/releases-data.json', scriptSrc).href : 'releases/releases-data.json';
            releaseDataPromise = fetch(url).then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            }).catch(error => {
                console.error('Unable to load release dates:', error);
                return null;
            });
        }
        return releaseDataPromise;
    }

    async function updateOpenBveDates(doc) {
        const data = await loadReleaseDates();
        if (!data) return;

        doc.querySelectorAll('.wbnrfz-grid .card[data-date]').forEach(card => {
            const link = card.querySelector('a[href^="releases/"]');
            if (!link) return;
            const key = card.dataset.releaseKey || link.getAttribute('href').split('/').pop().replace(/\.html$/, '');
            const release = data[key];
            if (!release || !release.versions) {
                console.warn(`No release data for ${key}`);
                return;
            }
            const dates = Object.values(release.versions).map(version => {
                if (/^\d{4}$/.test(version.date)) return `${version.date}-01-01`;
                const date = parseReleaseDate(version.date);
                if (!date) console.warn(`Invalid release date for ${key}: ${version.date}`);
                return date;
            }).filter(Boolean).sort();
            const latest = dates[dates.length - 1];
            if (latest && card.dataset.date.slice(0, 10) !== latest) {
                card.dataset.date = latest;
            }
        });
    }

    function findAllNavLinks(pageHref) {
        // Find all links matching the href pattern (for both desktop and mobile nav)
        const links = [];
        
        // Try exact match
        links.push(...document.querySelectorAll(`a[href="${pageHref}"]`));
        
        // Try with relative path prefix
        links.push(...document.querySelectorAll(`a[href="../${pageHref}"]`));
        
        // Try with ./ prefix
        links.push(...document.querySelectorAll(`a[href="./${pageHref}"]`));
        
        // Try wildcard match by filename
        const allLinks = document.querySelectorAll(`a[href*="${pageHref}"]`);
        allLinks.forEach(link => {
            if (!links.includes(link)) {
                links.push(link);
            }
        });
        
        return links.filter(link => !link.closest('nav[aria-label="Back"]'));
    }

    function checkForUpdates() {
        pages.forEach(page => {
            // Only check the update if we're not on that page
            const pageFilename = window.location.pathname.split('/').pop() || 'index.html';
            if (pageFilename !== page.href) {
                // Resolve from the site root (the parent of /js/) so subpages don't request missing files
                const fetchPaths = scriptSrc
                    ? [new URL('../' + page.href, scriptSrc).href]
                    : [page.href, '../' + page.href];
                
                function tryFetch(paths, index) {
                    if (index >= paths.length) return;
                    
                    fetch(paths[index])
                        .then(response => {
                            if (!response.ok) throw new Error('Not found');
                            return response.text();
                        })
                        .then(async html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            if (page.href === 'openbve.html') {
                                await updateOpenBveDates(doc);
                            }
                            const cards = doc.querySelectorAll(`[${page.dataAttr}]`);
                            
                            if (Array.from(cards).some(card => isRecentUpdate(card.getAttribute(page.dataAttr)))) {
                                addUpdateIndicators(page.href);
                            }
                        })
                        .catch(err => {
                            if (index + 1 < paths.length) {
                                tryFetch(paths, index + 1);
                            } else {
                                console.error(`Unable to check updates for ${page.href}:`, err);
                            }
                        });
                }
                
                tryFetch(fetchPaths, 0);
            }
        });
    }

    function addUpdateIndicators(pageHref) {
        const navLinks = findAllNavLinks(pageHref);
        navLinks.forEach(navLink => {
            if (navLink && !navLink.querySelector('.update-indicator')) {
                const indicator = document.createElement('span');
                indicator.className = 'update-indicator';
                indicator.setAttribute('title', 'New updates available');
                
                // Store the page on click to trigger highlighting
                navLink.addEventListener('click', function(e) {
                    // Store in sessionStorage so we can access it on the target page
                    sessionStorage.setItem('highlightRecentUpdates', 'true');
                });
                
                // Check if this link is in mobile-bottom-nav
                const isMobileNav = navLink.closest('.mobile-bottom-nav');
                
                if (isMobileNav) {
                    // For mobile nav, append to the icon span
                    const iconSpan = navLink.querySelector('.icon');
                    if (iconSpan) {
                        iconSpan.appendChild(indicator);
                    } else {
                        navLink.appendChild(indicator);
                    }
                } else {
                    // For desktop nav, append to the link
                    navLink.appendChild(indicator);
                }
            }
        });
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
    if ((window.location.pathname.split('/').pop() || 'index.html') === 'openbve.html') {
        updateOpenBveDates(document).then(() => {
            document.dispatchEvent(new Event('release-dates-updated'));
            highlightRecentUpdates();
        });
    } else {
        highlightRecentUpdates();
    }
});
})();
