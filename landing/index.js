$(document).ready(function() {
    // Hamburger Menu Toggle
    $('.hamburger').click(function() {
        $('nav ul').toggleClass('active');
    });

    // Smooth Scroll for Navigation Links
    $('nav ul li a').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if (target.startsWith('#')) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 60
            }, 800);
            $('nav ul').removeClass('active');
        } else {
            window.open(target, '_blank');
        }
    });

    // Scroll to Video Section on CTA Button Click
    $('.cta-button').click(function() {
        $('html, body').animate({
            scrollTop: $('#video-section').offset().top - 60
        }, 800);
    });
});
