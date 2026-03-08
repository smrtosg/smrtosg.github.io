(function ($) {
    'use strict';

    var pw_window = $(window);

    // ****************************
    // :: 1.0 Preloader Active Code
    // ****************************

    pw_window.on('load', function () {
        $('#preloader').fadeOut('1000', function () {
            $(this).remove();
        });
    });

    // ****************************
    // :: 2.0 ClassyNav Active Code
    // ****************************

    if ($.fn.classyNav) {
        $('#pwNav').classyNav();
    }

    // *********************************
    // :: 3.0 Welcome Slides Active Code
    // *********************************

    if ($.fn.owlCarousel) {
        var welcomeSlider = $('.welcome-slides');
        welcomeSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            autoplayTimeout: 10000,
            nav: true,
            navText: [('<i class="ti-arrow-left"></i>'), ('<i class="ti-arrow-right"></i>')]
        })

        welcomeSlider.on('translate.owl.carousel', function () {
            var layer = $("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        welcomeSlider.on('translated.owl.carousel', function () {
            var layer = welcomeSlider.find('.owl-item.active').find("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });
    }

    // ************************************
    // :: 4.0 Instragram Slides Active Code
    // ************************************

    if ($.fn.owlCarousel) {
        var instagramFeedSlider = $('.instragram-feed-area');
        instagramFeedSlider.owlCarousel({
            items: 6,
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    items: 2
                },
                576: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                },
                1200: {
                    items: 6
                }
            }
        })
    }

    // *********************************
    // :: 5.0 Masonary Gallery Active Code
    // *********************************

    if ($.fn.imagesLoaded) {
        $('.pw-portfolio').imagesLoaded(function () {
            // filter items on button click
            $('.portfolio-menu').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });
            // init Isotope
            var $grid = $('.pw-portfolio').isotope({
                itemSelector: '.single_gallery_item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.single_gallery_item'
                }
            });
        });
    }

    // ***********************************
    // :: 6.0 Portfolio Button Active Code
    // ***********************************

    $('.portfolio-menu button.btn').on('click', function () {
        $('.portfolio-menu button.btn').removeClass('active');
        $(this).addClass('active');
    })

    // ********************************
    // :: 7.0 Search Button Active Code
    // ********************************
    $('.search-btn').on('click', function () {
        $('.search-form').toggleClass('search-form-active');
    })

    // ************************
    // :: 8.0 Stick Active Code
    // ************************

    pw_window.on('scroll', function () {
        if (pw_window.scrollTop() > 0) {
            $('.main-header-area').addClass('sticky');
        } else {
            $('.main-header-area').removeClass('sticky');
        }
    });

    // *********************************
    // :: 9.0 Magnific Popup Active Code
    // *********************************
    if ($.fn.magnificPopup) {
        $('.video-play-btn').magnificPopup({
            type: 'iframe'
        });
        $('.portfolio-img').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
                preload: [0, 2],
                navigateByImgClick: true,
                tPrev: 'Previous',
                tNext: 'Next'
            }
        });
    }

    // **************************
    // :: 10.0 Tooltip Active Code
    // **************************
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // ***********************
    // :: 11.0 WOW Active Code
    // ***********************
    if (pw_window.width() > 767) {
        new WOW().init();
    }

    // ****************************
    // :: 12.0 Jarallax Active Code
    // ****************************
    if ($.fn.jarallax) {
        $('.jarallax').jarallax({
            speed: 0.5
        });
    }

    // ****************************
    // :: 13.0 Scrollup Active Code
    // ****************************
    if ($.fn.scrollUp) {
        pw_window.scrollUp({
            scrollSpeed: 1000,
            scrollText: '<i class="fa-solid fa-arrow-up-to-line"></i>',
            scrollDistance: 9999999, // Disable the plugin's own show/hide; we control it manually
            animation: 'none',
            animationSpeed: 0
        });

        // Custom visibility: show when scrolling up (past threshold), hide when scrolling down
        (function () {
            var lastScrollY = window.scrollY;
            var btn = document.getElementById('scrollUp');
            var visible = false;
            var THRESHOLD = 200;
            var ticking = false;

            function syncBtn() {
                if (!btn) { btn = document.getElementById('scrollUp'); }
                if (!btn) return;
                if (visible) {
                    btn.classList.add('btt-visible');
                } else {
                    btn.classList.remove('btt-visible');
                }
            }

            window.addEventListener('scroll', function () {
                if (!ticking) {
                    window.requestAnimationFrame(function () {
                        var currentScrollY = window.scrollY;
                        if (currentScrollY < THRESHOLD) {
                            visible = false;
                        } else if (currentScrollY < lastScrollY - 4) {
                            // Scrolling up
                            visible = true;
                        } else if (currentScrollY > lastScrollY + 4) {
                            // Scrolling down
                            visible = false;
                        }
                        lastScrollY = currentScrollY;
                        syncBtn();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        })();
    }

    // *********************************
    // :: 14.0 Prevent Default 'a' Click
    // *********************************
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

})(jQuery);


// *********************************
// :: 15.0 Calculate Age
// *********************************
function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// *********************************
// :: 16.0 Align Paragraphs
// *********************************

var alignParagraphsConfig = {
  // CSS selector for elements to process
  selector: "p",
  // Class that opts an element out of auto-alignment
  excludeClass: "no-align",
  // Number of lines at or below which the "few" alignment is applied
  lineThreshold: 1,
  // Alignment for paragraphs at or below lineThreshold lines
  fewLinesAlign: "center",
  // Alignment for paragraphs above lineThreshold lines
  manyLinesAlign: "left",
};

function alignParagraphs() {
  var cfg = alignParagraphsConfig;
  document.querySelectorAll(cfg.selector).forEach(function (p) {
    // Skip excluded elements
    if (p.classList.contains(cfg.excludeClass)) return;

    // Per-element overrides via data attributes:
    //   data-align-few="left"   → overrides fewLinesAlign
    //   data-align-many="left"  → overrides manyLinesAlign
    //   data-align-threshold="2" → overrides lineThreshold
    var few       = p.dataset.alignFew       || cfg.fewLinesAlign;
    var many      = p.dataset.alignMany      || cfg.manyLinesAlign;
    var threshold = p.dataset.alignThreshold != null
                      ? parseInt(p.dataset.alignThreshold, 10)
                      : cfg.lineThreshold;

    var lineHeight = parseFloat(window.getComputedStyle(p).lineHeight);
    var lines = lineHeight > 0 ? Math.round(p.offsetHeight / lineHeight) : 1;

    p.style.textAlign = lines <= threshold ? few : many;
  });
}

document.addEventListener("DOMContentLoaded", alignParagraphs);
window.addEventListener("resize", alignParagraphs);

// Recalculate alignment when Bootstrap accordion items are shown
document.addEventListener('show.bs.collapse', function(event) {
  if (event.target.classList.contains('accordion-collapse')) {
    // Realign immediately when accordion opens
    alignParagraphs();
    // Also realign during animation (every 50ms) and after
    var interval = setInterval(alignParagraphs, 50);
    setTimeout(function() {
      clearInterval(interval);
      alignParagraphs();
    }, 500);
  }
}, true);
