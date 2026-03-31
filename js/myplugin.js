$(document).ready(function () {

    /* =====================
    Loading Animation
    ===================== */
    if (document.readyState === 'complete') {
        // Page already loaded by the time this runs
        $("body").css("overflow", "auto");
        $(".lodaing-overlay").fadeOut(1000);
    } else {
        $(window).on('load', function () {
            $("body").css("overflow", "auto");
            $(".lodaing-overlay").fadeOut(1000);
        });
    }

    /* =====================
    Navbar Animation
    ===================== */
    $(".menu .menu-items a, #home a").click(function (e) {
        if (this.getAttribute("href").charAt(0) == "#") {
            e.preventDefault();
            $(this).parent().addClass("active").siblings().removeClass("active");
            $("html, body").stop().animate({
                scrollTop: $($(this).attr("href")).offset().top
            }, 1400);
        } else {
            $(this).attr("target", "_blank");
        }
    });

    $('.menu-trigger').click(function () {
        $(".nested-menu").toggleClass('open');
        $('.nested-menu .menu-items').removeClass('menu-visible');
        $('.nested-menu .menu-items').delay(100).queue(function () {
            $(this).addClass('menu-visible').dequeue();
        });
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {
            $(".menu").addClass("scroll");
        } else {
            $(".menu").removeClass("scroll");
        }
    });

    /* =====================
    Happy (statistics)
    ===================== */
    $.fn.inViewport = function (cb) {
        return this.each(function (i, el) {
            function visPx() {
                var H = $(window).height(),
                    r = el.getBoundingClientRect(), t = r.top, b = r.bottom;
                return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
            }
            visPx();
            $(window).on("resize scroll", visPx);
        });
    };

    $(".counter").inViewport(function (px) {
        if (px > 0 && !this.initNumAnim) {
            this.initNumAnim = true;
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        }
    });

    /* =====================
    Carousel / News Animation
    ===================== */
    ; (function ($) {
        "use strict";

        $(".carousel .carousel-item h3").html(function (index, html) {
            return html.replace(/\S/g, '<span>$&</span>');
        });

        var animationDelay = .5;
        for (var i = 1; i < 20; i++) {
            $(".carousel-inner .carousel-item span:nth-child(" + i + "n)").css("animation-delay", animationDelay + "s");
            animationDelay += .1;
        }

        var animationsItems = $(".carousel .carousel-item span");
        function animationContents() {
            $(animationsItems).addClass("rotateInUpLeft animated").delay(200000).queue(function (next) {
                $(this).removeClass("rotateInUpLeft animated");
                next();
            });
        }
        animationContents();

        // BS5 carousel
        var carouselEl = document.getElementById('news');
        var bsCarousel = new bootstrap.Carousel(carouselEl, {
            interval: 15000,
            ride: 'carousel',
            pause: 'hover'
        });

        // Custom arrow buttons
        $(document).on('click', '#news-prev', function() {
            bsCarousel.prev();
        });
        $(document).on('click', '#news-next', function() {
            bsCarousel.next();
        });

        carouselEl.addEventListener('slide.bs.carousel', function () {
            animationContents();
        });

        // Native touch/swipe support — no jQuery plugin needed
        var carouselInner = document.querySelector('#news .carousel-inner');
        var touchStartX = 0;
        var touchEndX = 0;

        carouselInner.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselInner.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) { // minimum swipe distance
                if (diff > 0) {
                    bsCarousel.next(); // swipe left
                } else {
                    bsCarousel.prev(); // swipe right
                }
            }
        }, { passive: true });

    })(jQuery);

});
