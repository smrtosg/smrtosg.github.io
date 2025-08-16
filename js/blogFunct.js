document.addEventListener('DOMContentLoaded', function () {
  // Initialize Isotope
  const grid = document.querySelector('.pw-portfolio');
  const iso = new Isotope(grid, {
      itemSelector: '.single_gallery_item',
      layoutMode: 'fitRows',
  });

  // Filter buttons
  const filterButtons = document.querySelectorAll('.btn-filter-blog');
  filterButtons.forEach(button => {
      button.addEventListener('click', function () {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to the clicked button
          this.classList.add('active');
          // Get filter value from data-filter attribute
          const filterValue = this.getAttribute('data-filter');
          // Apply filter
          iso.arrange({ filter: filterValue });
      });
  });
});

   // Sort functionality
  document.addEventListener("DOMContentLoaded", function () {
    // Initialize Isotope
    const portfolioContainer = document.querySelector(".pw-portfolio");
    const iso = new Isotope(portfolioContainer, {
      itemSelector: ".single_gallery_item",
      layoutMode: "fitRows",
      getSortData: {
        date: "[data-date]", // Sort by the data-date attribute
        title: ".hover-content-blog h4", // Sort by the text content of the h4 element
      },
    });
 
    const sortSelect = document.getElementById("sort-options");
    sortSelect.addEventListener("change", function () {
      const sortValue = this.value;

      if (sortValue === "newest") {
        iso.arrange({ sortBy: "date", sortAscending: false }); // Newest first
      } else if (sortValue === "oldest") {
        iso.arrange({ sortBy: "date", sortAscending: true }); // Oldest first
      } else if (sortValue === "alphabetical") {
        iso.arrange({ sortBy: "title", sortAscending: true }); // Alphabetical order
      }
    });
  });

//Dynamic Title Update
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".btn-filter-blog");
  const titleElement = document.getElementById("filter-title");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the filter text from the button
      const filterText = this.textContent.trim();
      // Update the title
      titleElement.textContent = filterText;
    });
  });
});