$(function(){
    setTimeout(() => {
        $('#js-preloader').addClass('loaded');
        const section = window.location.href.split('#')[1];
        $(`.${section}`).click();
    }, 500);
    $('.scroll-to-section').click(function(){
        const section = this.href.split('#')[1];
        $(`.${section}`).click();
    });
})