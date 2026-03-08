document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".btn-filter-blog");
    const sortDropdown = document.getElementById("sort-options");
    const cardsContainer = document.querySelector(".wbnrfz-grid");
    const cards = Array.from(cardsContainer.querySelectorAll(".card"));

    // Filter functionality
    const filterTitle = document.getElementById("filter-title");

    filterButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Update the page title to match the active filter
            if (filterTitle) {
                filterTitle.textContent = this.textContent.trim();
            }

            const filter = this.getAttribute("data-filter");

            let visibleCards = 0;
            cards.forEach(card => {
                if (filter === "*" || card.classList.contains(filter.substring(1))) {
                    card.style.display = "block";
                    card.classList.remove("fade-out");
                    card.classList.add("fade-in");
                    visibleCards++;
                } else {
                    card.classList.remove("fade-in");
                    card.classList.add("fade-out");
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300); // Match the animation duration
                }
            });

            // Adjust container size dynamically based on visible cards
            if (visibleCards === 2) {
                cardsContainer.classList.add("two-cards");
            } else {
                cardsContainer.classList.remove("two-cards");
            }
        });
    });

    // Sort functionality
    sortDropdown.addEventListener("change", function () {
        const sortValue = this.value;

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

        // Clear and re-append sorted cards
        cardsContainer.innerHTML = "";
        sortedCards.forEach(card => cardsContainer.appendChild(card));
    });
});