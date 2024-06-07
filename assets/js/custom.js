(function ($) {
	
	"use strict";
	
	let bigNav = window.innerWidth > 1110;
	
	function initNav(){
		if(window.innerWidth > 1110){
			$('.header-area .nav').show();
			$('.header-area .nav').css('display', '');
			$(".menu-trigger").removeClass('active');
			$('header .sub-menu').css('display', '')
			bigNav = true;
		}else if(window.innerWidth <= 1110){
			$('header .sub-menu').hide();
			bigNav = false;
		}
	}

	initNav();
	addEventListener('resize', function(){
		if(!bigNav && window.innerWidth > 1110){
			$('.header-area .nav').show();
			$('.header-area .nav').css('display', '');
			$(".menu-trigger").removeClass('active');
			$('header .sub-menu').css('display', '')
			bigNav = true;
		}else if(bigNav && window.innerWidth <= 1110){
			$('header .sub-menu').hide();
			bigNav = false;
		}
	});

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();

	  if (scroll >= box - 80) {
	    $("header").addClass("background-header");
	} else {
		$("header").removeClass("background-header");
	}
	}); 

	$(document).on("click", ".naccs .menu div", function() {
		var numberIndex = $(this).index();
	
		if (!$(this).is("active")) {
			$(".naccs .menu div").removeClass("active");
			$(".naccs ul li").removeClass("active");
	
			$(this).addClass("active");
			$(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");
	
			var listItemHeight = $(".naccs ul")
				.find("li:eq(" + numberIndex + ")")
				.innerHeight();
			$(".naccs ul").height(listItemHeight + "px");
		}
	});

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}

	$(document).ready(function () {
		if(typeof dontAosInitAgenda === "undefined")
			setTimeout(() => {
				AOS.init({
					duration: 1000, // values from 0 to 3000, with step 50ms
				});	
			}, 500);
		$('.header-area').after('<div id="nav-separator"></div>');
		const $target = $(window.location.hash);
		if($target.length){
			$('html,body').animate({
				scrollTop: ($target.offset().top) + 80
			}, 700);
		}
		
		$('.nav-link').click(function(){
			$('.scroll-to-section.active').removeClass('active');
			const $navLink = $('.scroll-to-section[href="#'+this.classList[0]+'"]');
			if($navLink.length)
				$navLink.addClass('active');
		})

		$('.scroll-to-section').click(function(){
			$('.scroll-to-section.active').removeClass('active');
			$(this).addClass('active');
		});

		$(document).on('scroll', onScroll);

	});

	function onScroll(){
	    const scrollPos = $(document).scrollTop();
	    $('.nav .scroll-to-section').each(function () {
			const currLink = $(this);
	        const refElement = $(currLink.attr("href"));
	        if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.scroll-to-section.active').removeClass("active");
	            currLink.addClass("active");
	        }
	    });
	}
	
	$(window).on('load', function() {
		if(
			typeof dontloadagenda === "undefined"
			&&
			typeof dontloadquisommesnous === "undefined"
			&&
			typeof dontloadbiotiful === "undefined"
		)
			setTimeout(() => {
				$('#js-preloader').addClass('loaded');
			}, 500);


		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});

	

	const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    // Open/Close Submenus
    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
				if(window.innerWidth > 1110) return;
                var thisItemParent = _this.parent('li'),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                if (thisItemParent.hasClass('has-sub')) {
                    var submenu = thisItemParent.find('> ul.sub-menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450);
                        thisItemParent.removeClass('is-open-sub');
                    } else {
                        thisItemParent.addClass('is-open-sub');

                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            thisItemParent.find('.sub-menu').slideUp(400, function () {
                                submenu.slideDown(250);
                            });
                        } else {
                            thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, function () {
                                submenu.slideDown(250);
                            });
                        }
                    }
                }

                e.preventDefault();
            });
        });
    }

})(window.jQuery);