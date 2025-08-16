document.addEventListener("DOMContentLoaded", function () {
    // Initialize Isotope
    const portfolioContainer = document.querySelector(".pw-portfolio");
    const iso = new Isotope(portfolioContainer, {
        itemSelector: ".single_gallery_item",
        layoutMode: "fitRows",
        getSortData: {
            date: function (itemElem) {
                // Get the data-date attribute and convert to a timestamp for accurate sorting
                const dateStr = itemElem.getAttribute("data-date");
                return dateStr ? Date.parse(dateStr) : 0;
            },
            year: "[data-year] parseInt",
            title: ".hover-content-blog h4",
        },
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll(".btn-filter");
    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");
            const filterValue = this.getAttribute("data-filter");
            iso.arrange({ filter: filterValue });
        });
    });

    // Sort functionality
    const sortSelect = document.getElementById("sort-options");
    if (sortSelect) {
        sortSelect.value = ""; // Show blank on load

        sortSelect.addEventListener("change", function () {
            const sortValue = this.value;

            if (sortValue === "newest") {
                iso.arrange({ sortBy: "date", sortAscending: false }); // Sort by date descending
            } else if (sortValue === "oldest") {
                iso.arrange({ sortBy: "date", sortAscending: true }); // Sort by date ascending
            } else if (sortValue === "alphabetical") {
                iso.arrange({ sortBy: "title", sortAscending: true }); // Sort by title alphabetically
            } else {
                iso.arrange({ sortBy: "original-order" }); // Default order
            }
        });
    }

    // Recalculate Isotope layout after images load
    imagesLoaded(portfolioContainer, function () {
        iso.arrange();
    });

    // Recalculate Isotope layout after window resize
    $(window).on('resize', function () {
        iso.arrange();
    });
});

//Dynamic Title Update
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".btn-filter");
    const titleElement = document.getElementById("filter-title");

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const filterText = this.textContent.trim();
            titleElement.textContent = filterText;
        });
    });
});