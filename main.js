var twinkle = function(star){
	setTimeout(function(){
		star.toggle(500);
		star.toggle(500);
		twinkle(star);
	}, Math.floor(Math.random() * 10000));
}

var buildStars = function(container){

 	var getTop = function(){
 		var top = Math.random() * 70;
 		if ((Math.random() * 100) >= 25){
 			top -= (top*.5);
 		}

 		return Math.floor(top);
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

 	/* make sure the stars are underneath the content */
 	container.find(".my-content").css("z-index", 1);

 	for (var i = 0; i < 400; i++){
 		if (i < 200){
	 		var size = Math.floor(Math.random() * 3) * 2;
	 	}else{
	 		var size = 2;
	 	}
 		var color = getColor();
 		var top = getTop();
 		var left = Math.floor(Math.random() * 100);
 		var g = "(" + color + ", rgba(0,0,0,0))";
 		var starColors = {
 			"background": "-webkit-radial-gradient" + g, /* Safari 5.1- 6.0 */
  			"background": "-o-radial-gradient" + g, /* Opera 11.6-12.0 */
  			"background": "-moz-radial-gradient" + g, /* Firefox 3.6-15 */
  			"background": "radial-gradient" + g
 		}
 		var star = $("<div class=\"star\"></div>").css($.extend({
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
 		}, starColors));
 		container.append(star);

 		with ({x:star}){
	 		twinkle(x);
	 	}
 	}
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

	buildStars($('#about'));

	// window.setTimeout(function(){
	// 	$(".star").css({"width": "50px", "height": "50px"});
	// }, 5000);
});