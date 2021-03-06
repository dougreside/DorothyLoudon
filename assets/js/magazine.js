/*
 * Magazine sample
*/

function addPage(page, book, bookDisplay) {

	var id, pages = book.turn('pages');

	// Create a new element for this page
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {

		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');

		// Load the page
		loadPage(page, element, bookDisplay);
	}

}

function loadPage(page, pageElement,bookDisplay) {

	// Create an image element

	var img = $('<img />');

	img.mousedown(function(e) {
		e.preventDefault();
	});

	img.load(function() {
		
	if (bookDisplay!="single"){
		// Set the size
		
		$(this).css({width: '100%', height: '100%'});
		$(this).appendTo(pageElement);
	}
	else{		
		$(this).appendTo(pageElement);
		shrinkPage(img);
	}
		// Add the image to the page after loaded
		
		
		// Remove the loader indicator
		
		pageElement.find('.loader').remove();
	});

	// Load the page
	lPage = itemImages[page-1].image;

	img.attr('src', 'http://images.nypl.org/index.php?t=w&id=' +  lPage );
	
	
	

}


// Load large page

function loadLargePage(page, pageElement) {
	
	var img = $('<img />');

	img.load(function() {

		var prevImg = pageElement.find('img');
		if (bookDisplay=="single"){
		if ($(prevImg).height()>$(prevImg).width()){
		$(this).css({height: '100%'});
		}
		else{
			$(this).css({width: '100%'});
		}
	}
	else{
		$(this).css({height: '100%', width: '100%'});
	}
		$(this).appendTo(pageElement);
		prevImg.remove();
		
	});

	// Loadnew page
	
	lPage = itemImages[page-1].image;
	img.attr('src', 'http://images.nypl.org/index.php?t=w&id=' +  lPage );
	

}

// Load small page

function loadSmallPage(page, pageElement) {
	
	var img = pageElement.find('img');
	if (bookDisplay=="single"){
	if ($(img).height()>$(img).width()){
		$(this).css({height: '100%'});
		}
		else{
			$(this).css({width: '100%'});
		}
	}
	else{
		$(this).css({height: '100%', width: '100%'});
	}


	img.unbind('load');
	// Loadnew page

	lPage = itemImages[page-1].image;
	img.attr('src', 'http://images.nypl.org/index.php?t=w&id=' +  lPage );

}

// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

function disableControls(page) {
		if (page==1)
			$('.previous-button').hide();
		else
			$('.previous-button').show();
					
		if (page==$('.magazine').turn('pages'))
			$('.next-button').hide();
		else
			$('.next-button').show();
}

// Set the width and height for the viewport

function resizeViewport() {
	
	var width = parseInt($("#all").width());
	width = width-200;
	width=width+"px";
	var height = $(window).height(),
		options = $('.magazine').turn('options');
	$('.magazine').removeClass('animated');

	$('.magazine-viewport').css({
		width: width,
		height: height
	}).
	zoom('resize');


	if ($('.magazine').turn('zoom')==1) {
		var bound = calculateBound({
			width: options.width,
			height: options.height,
			boundWidth: Math.min(options.width, width),
			boundHeight: Math.min(options.height, height)
		});

		if (bound.width%2!==0)
			bound.width-=1;

			
		if (bound.width!=$('.magazine').width() || bound.height!=$('.magazine').height()) {

			$('.magazine').turn('size', bound.width, bound.height);

			if ($('.magazine').turn('page')==1)
				$('.magazine').turn('peel', 'br');

			$('.next-button').css({height: bound.height, backgroundPosition: '-38px '+(bound.height/2-32/2)+'px'});
			$('.previous-button').css({height: bound.height, backgroundPosition: '-4px '+(bound.height/2-32/2)+'px'});
		}

		$('.magazine').css({top: -bound.height/2, left: -bound.width/2});
	}

	var magazineOffset = $('.magazine').offset(),
		boundH = height - magazineOffset.top - $('.magazine').height(),
		marginTop = (boundH - $('.thumbnails > div').height()) / 2;

	if (marginTop<0) {
		$('.thumbnails').css({height:1});
	} else {
		$('.thumbnails').css({height: boundH});
		$('.thumbnails > div').css({marginTop: marginTop});
	}

	if (magazineOffset.top<$('.made').height())
		$('.made').hide();
	else
		$('.made').show();

	$('.magazine').addClass('animated');
	
}

// Width of the flipbook when zoomed in

function largeMagazineWidth() {
	
	return 2214;

}

// decode URL Parameters

function decodeParams(data) {

	var parts = data.split('&'), d, obj = {};

	for (var i =0; i<parts.length; i++) {
		d = parts[i].split('=');
		obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
	}

	return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {
	
	var bound = {width: d.width, height: d.height};

	if (bound.width>d.boundWidth || bound.height>d.boundHeight) {
		
		var rel = bound.width/bound.height;

		if (d.boundWidth/rel>d.boundHeight && d.boundHeight*rel<=d.boundWidth) {
			
			bound.width = Math.round(d.boundHeight*rel);
			bound.height = d.boundHeight;

		} else {
			
			bound.width = d.boundWidth;
			bound.height = Math.round(d.boundWidth/rel);
		
		}
	}
		
	return bound;
}