document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".btn-filter");
    const sortDropdown = document.getElementById("sort-options");
    const searchInput = document.getElementById("search-input");
    const gridContainers = document.querySelectorAll(".wbnrfz-grid");
    const cards = Array.from(document.querySelectorAll(".wbnrfz-grid .card"));

    // Helper to update grid classes after fade animations
    function updateGridClass(isFiltered = false) {
        setTimeout(() => {
            gridContainers.forEach(container => {
                const visibleCards = Array.from(container.querySelectorAll(".card")).filter(card => card.style.display !== "none");
                container.classList.remove("two-cards", "one-card");
                // Only apply sizing classes when showing all releases
                if (!isFiltered) {
                    if (visibleCards.length === 2) {
                        container.classList.add("two-cards");
                    } else if (visibleCards.length === 1) {
                        container.classList.add("one-card");
                    }
                }
            });
        }, 350); // Wait for fade-out animation to finish
    }

    // Filter functionality
    const filterTitle = document.getElementById("filter-title");
    const routesHeading = document.getElementById("routes-heading-section");
    const trainsHeading = document.getElementById("trains-heading-section");
    const devfilesopHeading = document.getElementById("devfilesop-heading-section");
    const busesHeading = document.getElementById("buses-heading-section");
    const mapsHeading = document.getElementById("maps-heading-section");
    const devfilesHeading = document.getElementById("devfiles-heading-section");
    let currentFilter = "*"; // Track the current filter

    filterButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Update the page title to match the active filter
            if (filterTitle) {
                filterTitle.textContent = this.textContent.trim();
            }

            const filter = this.getAttribute("data-filter");
            currentFilter = filter; // Update current filter

            // Show/hide section headings based on filter
            const isAllReleases = filter === "*";
            if (routesHeading) {
                routesHeading.style.display = isAllReleases ? "block" : "none";
            }
            if (trainsHeading) {
                trainsHeading.style.display = isAllReleases ? "block" : "none";
            }
            if (busesHeading) {
                busesHeading.style.display = isAllReleases ? "block" : "none";
            }
            if (mapsHeading) {
                mapsHeading.style.display = isAllReleases ? "block" : "none";
            }
            if (devfilesHeading) {
                devfilesHeading.style.display = isAllReleases ? "block" : "none";
            }
            if (devfilesopHeading) {
                devfilesopHeading.style.display = isAllReleases ? "block" : "none";
            }

            // Apply/remove filtered class to grids
            gridContainers.forEach(container => {
                if (isAllReleases) {
                    container.classList.remove("filtered");
                } else {
                    container.classList.add("filtered");
                }
            });

            cards.forEach(card => {
                if (filter === "*" || card.classList.contains(filter.substring(1))) {
                    card.style.display = "block";
                    card.classList.remove("fade-out");
                    card.classList.add("fade-in");
                } else {
                    card.classList.remove("fade-in");
                    card.classList.add("fade-out");
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });

            // Pass isFiltered flag to updateGridClass
            updateGridClass(!isAllReleases);
        });
    });

    // Sort functionality
    sortDropdown.addEventListener("change", function () {
        const sortValue = this.value;

        // Store original grid for each card
        const cardGridMap = new Map();
        gridContainers.forEach(container => {
            container.querySelectorAll(".card").forEach(card => {
                cardGridMap.set(card, container);
            });
        });

        const sortedCards = [...cards].sort((a, b) => {
            if (sortValue === "newest") {
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            } else if (sortValue === "oldest") {
                return new Date(a.dataset.date) - new Date(b.dataset.date);
            } else if (sortValue === "alphabetical") {
                const titleA = a.querySelector("h3").textContent.toLowerCase();
                const titleB = b.querySelector("h3").textContent.toLowerCase();
                return titleA.localeCompare(titleB);
            }
        });

        // Clear all containers
        gridContainers.forEach(container => container.innerHTML = "");

        // Redistribute sorted cards back to their original grids
        sortedCards.forEach(card => {
            const originalGrid = cardGridMap.get(card);
            if (originalGrid) {
                originalGrid.appendChild(card);
            }
        });

        // Maintain the filtered class and current filter state when sorting
        gridContainers.forEach(container => {
            if (currentFilter !== "*") {
                container.classList.add("filtered");
            } else {
                container.classList.remove("filtered");
            }
        });

        updateGridClass(currentFilter !== "*");
    });

    // Search functionality
    searchInput.addEventListener("input", function () {
        const searchText = this.value.toLowerCase();

        cards.forEach(card => {
            const cardTitle = card.querySelector("h3").textContent.toLowerCase();
            if (cardTitle.includes(searchText)) {
                card.style.display = "block";
                card.classList.remove("fade-out");
                card.classList.add("fade-in");
            } else {
                card.classList.remove("fade-in");
                card.classList.add("fade-out");
                setTimeout(() => {
                    card.style.display = "none";
                }, 300);
            }
        });

        // When searching, don't apply the filtered class - keep card sizing flexible
        gridContainers.forEach(container => {
            container.classList.remove("filtered");
        });

        // Only keep consistent sizing when search is active, don't restrict grid columns
        updateGridClass(false);
    });

    // Sort by newest on page load by default
    if (sortDropdown) {
        sortDropdown.value = "newest";
        sortDropdown.dispatchEvent(new Event("change"));
    }
});