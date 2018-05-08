/* Template: Rose Event Landing Page Template
   Author: InovatikThemes
   Version: 1.0.0
   Created: April 2017
   Description: Custom JS file
*/


/* Preloader */
//<![CDATA[
$(window).on('load', function() { // makes sure the whole site is loaded 
	"use strict";
	$('#status').delay(50).fadeOut(); // will first fade out the loading animation 
	$('#preloader').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website. 
	$('body').delay(550).css({'overflow':'visible'});
});
//]]>


(function($) {
    "use strict"; 
				
	/* Countdown Timer */
	$('#clock').countdown('2018/06/29 13:00:00') /* change here your "countdown to" date */
	.on('update.countdown', function(event) {
		var format = '<span class="counter-number">%D<br><span class="timer-text">Days</span></span><span class="separator">:</span><span class="counter-number">%H<br><span class="timer-text">Hours</span></span><span class="separator">:</span><span class="counter-number">%M<br><span class="timer-text">Min</span></span><span class="separator">:</span><span class="counter-number">%S<br><span class="timer-text">Sec</span></span>';
		
		
		$(this).html(event.strftime(format));
	})
	.on('finish.countdown', function(event) {
	$(this).html('This offer has expired!')
		.parent().addClass('disabled');
	});
	
	
	/* Navbar Scripts */
	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 800, 'easeInOutExpo');
			event.preventDefault();
		});
	});
    // closes the responsive menu on menu item click
    $(".navbar-nav li a").click(function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
	});
	
		
	/* Event Image Gallery Swiper */
	var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationType: 'progress',
		autoplay: 2500
    });
	
	
	/* Registration Form */
    $("#RegistrationForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formRError();
            submitRMSG(false, "Check if all fields are filled in!");
        } else {
            // everything looks good!
            event.preventDefault();
            submitRForm();
        }
    });

    function submitRForm() {
        // initiate variables with form content
        var rfirstname = $("#rfirstname").val();
        var rlastname = $("#rlastname").val();
        var remail = $("#remail").val();
		var rphone = $("#rphone").val();
		var rcompany = $("#rcompany").val();

        $.ajax({
            type: "POST",
            url: "php/registrationform-process.php",
            data: "firstname=" + rfirstname + "&lastname=" + rlastname + "&email=" + remail + "&phone=" + rphone + "&company=" + rcompany, 
            success: function(text) {
                if (text == "success") {
                    formRSuccess();
                } else {
                    formRError();
                    submitRMSG(false, text);
                }
            }
        });
	}

    function formRSuccess() {
        $("#RegistrationForm")[0].reset();
        submitRMSG(true, "Message Submitted!")
    }

    function formRError() {
        $("#RegistrationForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function submitRMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#rmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
	
	
	/* Initialize Magnificent PopUp For Event Gallery Swiper */
	$('.popup-link').magnificPopup({
		removalDelay: 300,
		type: 'image',
		callbacks: {
			beforeOpen: function() {
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure ' + this.st.el.attr('data-effect'));
			}
		},
		gallery:{
			enabled:true //enable gallery mode
		}
	});
	
	
	/* Initialize Magnific PopUp For Speakers */
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		
		fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
	
	
	/* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="#header" class="back-to-top scrolling">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });
	
	
	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function(){
		$(this).blur();
	});
		
})(jQuery);