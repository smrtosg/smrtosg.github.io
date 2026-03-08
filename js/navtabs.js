// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    const navLinks = document.querySelectorAll('.nav-link');

    // Store the scroll position before opening mobile menu
    let previousScrollPosition = 0;

    // Function to open mobile menu
    function openMobileMenu() {
        // Store current scroll position
        previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.classList.add('no-scroll'); // Prevent page scroll
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('no-scroll'); // Re-enable page scroll
        
        // Return to previous scroll position
        window.scrollTo(0, previousScrollPosition);
    }
        

    // Toggle mobile menu when hamburger is clicked
    mobileToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close mobile menu when close button is clicked
    mobileMenuClose.addEventListener('click', function (e) {
        e.preventDefault();
        closeMobileMenu();
    });

    // Close mobile menu when overlay is clicked
    mobileMenuOverlay.addEventListener('click', function () {
        closeMobileMenu();
    });

    // Close mobile menu when clicking on mobile menu links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMobileMenu();

            // Remove active class from all mobile links
            mobileMenuLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Also update desktop nav active state
            const href = this.getAttribute('href');
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('href') === href) {
                    navLink.classList.add('active');
                }
            });
        });
    });

    // Close mobile menu when clicking on desktop nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMobileMenu();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link (except CTA button)
            if (!this.classList.contains('cta-button')) {
                this.classList.add('active');

                // Also update mobile nav active state
                const href = this.getAttribute('href');
                mobileMenuLinks.forEach(mobileLink => {
                    mobileLink.classList.remove('active');
                    if (mobileLink.getAttribute('href') === href) {
                        mobileLink.classList.add('active');
                    }
                });
            }
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Navbar scroll effect - Remove auto-hide, keep it sticky
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar-container');
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scroll class for styling changes if needed
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add hover effect to floating circles
    const floatingCircles = document.querySelectorAll('.floating-circle');
    floatingCircles.forEach(circle => {
        circle.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.2)';
        });

        circle.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');

            // Skip if href is just "#" or empty
            if (href === '#' || href === '' || href.length <= 1) {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});