;(function () {

	'use strict';

	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
			var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ( $('body').hasClass('offcanvas') ) {
					$('body').removeClass('offcanvas');
					$('.js-fh5co-nav-toggle').removeClass('active');
				}
			}
		});
	};

	var offcanvasMenu = function() {
		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas').find('li').removeClass('has-dropdown');

		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);
			$this.addClass('active').find('ul').slideDown(500);
		}).mouseleave(function(){
			var $this = $(this);
			$this.removeClass('active').find('ul').slideUp(500);
		});

		$(window).resize(function(){
			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});
	};

	var burgerMenu = function() {
		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);
			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();
		});
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated animated-fast');
							} else {
								el.addClass('fadeInUp animated animated-fast');
							}
							el.removeClass('item-animate');
						}, k * 200 );
					});
				}, 100);
			}
		}, { offset: '85%' } );
	};

	var dropdown = function() {
		$('.has-dropdown').mouseenter(function(){
			var $this = $(this);
			$this.find('.dropdown').css('display', 'block').addClass('animated-fast fadeInUpMenu');
		}).mouseleave(function(){
			var $this = $(this);
			$this.find('.dropdown').css('display', 'none').removeClass('animated-fast fadeInUpMenu');
		});
	};

	var goToTop = function() {
		$('.js-gotop').on('click', function(event){
			event.preventDefault();
			$('html, body').animate({ scrollTop: $('html').offset().top }, 500);
			return false;
		});

		$(window).scroll(function(){
			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}
		});
	};

	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	/* =====================
	Filter Portfolio — Shuffle.js v6
	===================== */
	var initShuffle = function() {
		var element = document.getElementById('grid');
		if (!element) return;

		var shuffleInstance = new Shuffle(element, {
			itemSelector: '.shuffle-item',
			sizer: '.shuffle_sizer',
			buffer: 1,
			columnThreshold: 0.01
		});

		// Force a layout recalculation after images may have loaded
		setTimeout(function() {
			shuffleInstance.update();
		}, 300);

		// Set "all" as default active
		var allBtn = document.querySelector('.portfolio-sorting a[data-group="all"]');
		if (allBtn) allBtn.classList.add('active');

		var filterBtns = document.querySelectorAll('.portfolio-sorting a');
		filterBtns.forEach(function(btn) {
			btn.addEventListener('click', function(e) {
				e.preventDefault();
				var group = this.getAttribute('data-group');

				filterBtns.forEach(function(b) { b.classList.remove('active'); });
				this.classList.add('active');

				if (group === 'all') {
					shuffleInstance.filter(Shuffle.ALL_ITEMS);
				} else {
					shuffleInstance.filter(group);
				}
			});
		});
	};

	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		initShuffle();
	});

	// Papers section
	var paperCarousel = $('.active-paper-carusel').owlCarousel({
		items: 3,
		loop: true,
		autoplay: true,
		autoplayHoverPause: true,
		nav: true,
		navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
		dots: true,
		dotsEach: true,
		responsive: {
			0: { items: 1 },
			600: { items: 2 },
			1000: { items: 3 }
		},
		onInitialized: function() {
			var $nav = $('.papers .owl-nav');
			var $dots = $('.papers .owl-dots');
			$dots.detach().insertBefore($nav.find('.owl-next'));
		}
	});

	// Awards slide
	$('.awards-slide').owlCarousel({
		items: 3,
		loop: true,
		autoplay: true,
		autoplaySpeed: 2000,
		autoplayHoverPause: true,
		nav: false,
		dots: false,
		responsive: {
			0: { items: 1 },
			600: { items: 2 },
			900: { items: 3 }
		}
	});

}());
