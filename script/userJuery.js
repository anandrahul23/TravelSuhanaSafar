$(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');

        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');

        }
    });

    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});

$(document).ready(function(){

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.to-top').fadeIn();
        } else {
            $('.to-top').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.to-top').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

});


/***** Bootstrap JS Scrollspy *****/
$(document).ready(function(){
    $('body').scrollspy({target: ".navbar", offset: 50});
});




/***** Navbar smaller scroll *****/
$(document).ready(function(){

    var nav = $('.navbar'),
        doc = $(document),
        win = $(window);

    win.scroll(function() {

        if (doc.scrollTop() > 50) {
            nav.addClass('scrolled');
        } else {
            nav.removeClass('scrolled');
        }

    });

    win.scroll();


});


/***** Smooth Scrolling  *****/
$(document).ready(function(){
  // Add smooth scrolling to navbar a
    $(".navbar a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
              scrollTop: $(hash).offset().top
            }, 900, function(){
              // Add hash (#) to URL when done scrolling (default click behavior)
              window.location.hash = hash;
            });
        } // End if
    });
});
