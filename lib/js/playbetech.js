/* IMPORTS */
$.each($('link[rel="import"]'), function() {
	var $parent = $(this);
	// var $location = '/' + $parent.attr("href");
	var $location = $parent.attr("href");
	
	$.get($location, function(data) {
	     $parent.replaceWith(data);
	     // if($location == '/_navbar.html') {
	     if($location == '_navbar.html') {
	     	var href = $(location).attr("href").split('/');
			var url = href[href.length-1];
			var page = url.split('.')[0];
			var cat = page.split('-')[0];

			$.each($('[data-nav-link]'), function() {
				var link = $(this).data("nav-link");
				if(page == '') {
					$('.home-link').addClass('active');
				} else if(link == page || link == cat) {
					$(this).parent().addClass('active');
				}
			});
	     }
	});
});

/* BANNER */
banner_resize();
$(window).on('resize', function(){
	banner_resize();
});
function banner_resize() {
	var $scene = $('.scene');
	var $parallax = $scene.parallax(); 
	$parallax.parallax('friction', 0.01, 0.01);

	var sheight = $('#banner').height() - ($('#navigation-top').height() + $('.banner-title').height());

	$scene.css({'height': sheight});

	var $sh = $scene.height(); 
	var $sw = $(window).width();
	
	$.each($('.scene li img'), function() {
		if($sh < $sw)
			$(this).height('100%');
			// $(this).height($sh);
		else
			$(this).width($sw-20);
	});
	
	// $.each($('.scene li img.full-height'), function() {
	// 	if($sh < $sw)
	// 		$(this).height('100%');
	// 	else
	// 		$(this).width($sw-20);
	// });

	var $ih = $('.scene li img').height();
	var $iw = $('.scene li img').width();

	var mleft = ($sw / 2) - ($iw / 2);

	$scene.css({'margin-left': mleft});

	var $header = $('#header');
	var hheight = $('#navigation-top').height() + $('#banner').height() - 35;
	$header.css({'height': hheight});
}

var pageX, pageY; //Declare these globally
$('#banner .container').mousemove(function(e){
    //console.log(e.pageY);
});

/* CUSTOM */
$.each($('[data-width]'), function() {
	$(this).css({"width": $(this).data("width")});
});

/* CAROUSEL */
$('.carousel').bind('slide.bs.carousel', function (e) {
   currentIndex = $('div.active').index();
   //console.log(currentIndex);
});