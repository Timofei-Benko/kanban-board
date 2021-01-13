$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop: false,
        margin: 20,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 2,
            },
            800: {
                items: 3,
            }
        }
    });
});

$('.board__next').click(function() {
    $(".owl-carousel").trigger('next.owl.carousel');
});

$('.board__prev').click(function() {
    $(".owl-carousel").trigger('prev.owl.carousel');
});
