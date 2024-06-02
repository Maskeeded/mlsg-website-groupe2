const options = {
    strings: ['Plongez <em>dans le monde</em> de <br> l\'emploi <span>avec nous</span>'],
    typeSpeed: 30,
    backSpeed: 40,
    loop: false,
    startDelay: 100, // Delay before start typing
    backDelay: 1000, // Delay before start backspacing
    showCursor: false, // Don't show the typing cursor
};

const typed = new Typed('#typed-text', options);

$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplaySpeed: 2000, // Same as autoplayTimeout for constant speed
    autoplayHoverPause: true, // Pause on hover
    smartSpeed: 500, // Transition speed (500ms)
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  });
