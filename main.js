var timeOuts = [];

var twinkle = function(star){
	timeOuts.push(setTimeout(function(){
		star.toggle(500);
		star.toggle(500);
		twinkle(star);
	}, Math.floor(Math.random() * 15000)));
};

var getStarColors = function(g){
	return {
		"background": "-webkit-radial-gradient" + g, /* Safari 5.1- 6.0 */
		"background": "-o-radial-gradient" + g, /* Opera 11.6-12.0 */
		"background": "-moz-radial-gradient" + g, /* Firefox 3.6-15 */
		"background": "radial-gradient" + g
	};
};

var getStarCSS = function(size, top, left, color){
	var g = "(" + color + " 25%, rgba(0,0,0,0)) 100%";
	return $.extend({
		"display": "block",
		"background": color,
		"position": "absolute",
		"z-index": "0",
		"top": top + "%",
		"left": left + "%",
		"width": size + "px",
		"height": size + "px",
		"-moz-border-radius": (size/2) + "px",
		"-webkit-border-radius": (size/2) + "px",
		"border-radius": (size/2) + "px"
	}, getStarColors(g));
};

var startComets = function(container){
	var sky = $("<div id=\"comet-container\"></div>");
 	container.append(sky);

	var color = "#FFFFFF";
	var left = Math.floor(Math.random() * 75) + 25; /* comets will go right to left */
	var comet = $("<div class=\"comet\"></div>")
		.css($.extend(getStarCSS(6, 0, left, color), {
			"box-shadow": "4px -4px 5px rgba(200, 225, 255, 1)"
		}));
	sky.append(comet);
	comet.animate({
		"top": "70%",
		"left": (left - 50) + "%"
	}, {duration: 1500, queue: false, complete: function(){
		comet.remove();
	}});
	comet.toggle(1500);

	/* wait for the next comet */
	timeOuts.push(setTimeout(function(){
		startComets(container);
	}, Math.floor(Math.random() * 15000)));
};

var buildStars = function(container, stars){

 	var getTop = function(){
 		var top = Math.random() * 70;
 		if ((Math.random() * 100) >= 25){
 			top -= (top*.5);
 		}

 		// return Math.floor(top);
 		return top;
 	};

 	var getColor = function(){
 		return [
 			"rgba(255, 255, 255, 1)", /* white */
 			"rgba(255, 255, 255, 1)", /* white */
 			"rgba(255, 255, 255, 1)", /* white */
 			"rgba(200, 225, 255, 1)", /* blue */
 			"rgba(255, 225, 200, 1)", /* red */
 			"rgba(255, 240, 240, 1)"][Math.floor(Math.random() * 6)]; /* yellow */
 	};

 	/* make sure the stars are underneath the content */
 	container.find(".my-content").css("z-index", 1);
 	var sky = $("<div id=\"star-container\"></div>");
 	container.append(sky);

 	/* generate stars */
 	for (var i = 0; i < stars; i++){
 		if (i < stars/2){
	 		var size = Math.floor(Math.random() * 3) * 2;
	 	}else{
	 		var size = 2;
	 	}
 		var color = getColor();
 		var top = getTop();
 		var left = Math.random() * 100;
 		var star = $("<div class=\"star\"></div>").css(getStarCSS(size, top, left, color));
 		sky.append(star);

 		/* make some of them twinkle */
 		if (i <= stars/4){
	 		with ({x:star}){
		 		twinkle(x);
		 	}
		}
 	}

	startComets(container);
};

var stopTwinkling = function(container){
	for (i = 0; i < timeOuts.length; i++){
		clearTimeout(timeOuts[i]);
	}

	timeOuts = [];
};

var restartTwinkling = function (container) {
	container.find('.star').each(function(i, star){
		if (i > 100){
			return false;
		}
		twinkle($(star));
	});
	startComets(container);
};

$(document).ready(function(){
	var starCometContainer = $('#about');
	var stars = 400;

	/* Animate scrolling for anchor links */
	$('a[href^="#"]').on('click', function(e){
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing');
	});

	/* mobile stuff */
	if ($('.not-for-mobile').is(':hidden')){
		/* mobile content placement */
		$('.my-content').css('top', $('#navbar1').height() + 40 + 'px');
		/* less stars */
		stars = 100;
	}

	/* inactive tab, stop twinkling */
	$(window).blur(function(){
		stopTwinkling(starCometContainer);
	});

	/* active tab, start twinkling again*/
	$(window).focus(function(){
		restartTwinkling(starCometContainer);
	});

	/* twinkle button */
	$('#twinkleToggle').data({'twinkles': 'on'});
	$('#twinkleToggle').click(function(){
		if ($(this).data('twinkles') == 'on'){
			stopTwinkling(starCometContainer);
			$(this).html("<i class=\"em em-sparkles\"></i>").data({'twinkles': 'off'});
		}else{
			restartTwinkling(starCometContainer);
			$(this).html("Stop Twinkling").data({'twinkles': 'on'});
		}
	});

	/* stars + comets */
	buildStars(starCometContainer, stars);
	startComets(starCometContainer);


	/* social media buttons */
	$('button.linkedin').click(function(){
		console.log("click");
		window.location = "https://www.linkedin.com/in/mikky-cecil-86545658/";
	});
	$('button.github').click(function(){
		window.location = "https://github.com/mikky-cecil";
	});
});