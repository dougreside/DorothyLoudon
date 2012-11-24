// Load the HTML4 version if there's not CSS transform
hashparts = getHashParts();
if (hashparts[0].indexOf("a")>-1) {

	$.ajax({
		  url: "http://admin.brightcove.com/js/BrightcoveExperiences.js",
		  dataType: "script",
		  success: loadApp
		});	
}
else{
	yepnope({
		test : Modernizr.csstransforms,
		yep: ['./vendor/lib/turn.js'],
		nope: ['./vendor/lib/turn.html4.min.js'],
		both: ['./js/magazine.js', './css/magazine.css', './vendor/lib/zoom.min.js'],
		complete: loadApp
	});
}