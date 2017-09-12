var timeOuts = [];

var twinkle = function(star){
	timeOuts.push(setTimeout(function(){
		star.toggle(500);
		star.toggle(500);
		twinkle(star);
	}, Math.floor(Math.random() * 15000)));
}

var buildStars = function(container){

 	var getTop = function(){
 		var top = Math.random() * 70;
 		if ((Math.random() * 100) >= 25){
 			top -= (top*.5);
 		}

 		// return Math.floor(top);
 		return top;
 	}

 	var getColor = function(){
 		return [
 			"rgba(255, 255, 255, 1)", /* white */
 			"rgba(255, 255, 255, 1)", /* white */
 			"rgba(255, 255, 255, 1)", /* white */
 			"rgba(200, 225, 255, 1)", /* blue */
 			"rgba(255, 225, 200, 1)", /* red */
 			"rgba(255, 240, 240, 1)"][Math.floor(Math.random() * 6)]; /* yellow */
 	}

 	var getStarColors = function(g){
 		return {
 			"background": "-webkit-radial-gradient" + g, /* Safari 5.1- 6.0 */
  			"background": "-o-radial-gradient" + g, /* Opera 11.6-12.0 */
  			"background": "-moz-radial-gradient" + g, /* Firefox 3.6-15 */
  			"background": "radial-gradient" + g
 		};
 	}

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
 	}

 	/* make sure the stars are underneath the content */
 	container.find(".my-content").css("z-index", 1);
 	var sky = $("<div id=\"star-container\"></div>");
 	container.append(sky);

 	/* generate stars */
 	for (var i = 0; i < 400; i++){
 		if (i < 200){
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
 		if (i <= 100){
	 		with ({x:star}){
		 		twinkle(x);
		 	}
		}
 	}

	var sky = $("<div id=\"comet-container\"></div>");
 	container.append(sky);

 	var makeComet = function(){
	 	/* Comets */
		// TODO: this needs work
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
		// comet.animate({
		// 	"opacity": "0"
		// }, {duration: 1500, queue: false});
		comet.toggle(1500);

		/* wait for the next comet */
		timeOuts.push(setTimeout(function(){
			makeComet();
		}, Math.floor(Math.random() * 15000)));
	};

	makeComet();
};

var stopTwinkling = function(){
	console.log("gunna stop");
	$(timeOuts).each(function(timeOut){
		clearTimeout(timeOut);
		timeOuts = [];
	});
};

var restartTwinkling = function () {
	$('.star').each(function(i, star){
		if (i > 100){
			return false;
		}
		// console.log($(star));
		twinkle($(star));
	});
};

$(document).ready(function(){
	$('a[href^="#"]').on('click', function(e){
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing');
	});

	/* inactive tab, stop twinkling */
	$(window).blur(function(){
		stopTwinkling();
	});

	/* active tab, start twinkling again*/
	$(window).focus(function(){
		restartTwinkling();
	});

	$('#twinkleToggle').data({'twinkles': 'on'});
	$('#twinkleToggle').click(function(){
		if ($(this).data('twinkles') == 'on'){
			stopTwinkling();
			$(this).html("<i class=\"em em-sparkles\"></i>").data({'twinkles': 'off'});
		}else{
			restartTwinkling();
			$(this).html("Stop Twinkling").data({'twinkles': 'on'});
		}
	});

	buildStars($('#about'));
});