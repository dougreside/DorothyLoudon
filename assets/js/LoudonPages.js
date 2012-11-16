itemImages=[];
showNum=262505;
function getHashParts(){
	hashparts=[];
	hash = window.location.href;
	if (hash.indexOf("#")>0){
 		 hash = hash.substring(hash.indexOf("#")+1);
 		 
 		 hashparts = hash.split("/");
	 }
	
	 return hashparts;
	}
function shrinkPage(img){
	thisimg = $(img);
	oih = parseFloat(thisimg.height());
	oiw = parseFloat(thisimg.width());
	vp = thisimg.parent().parent().parent();
	vph = parseFloat(vp.height());
	vpw = parseFloat(vp.width());
	
	if (oih>oiw){
	nih = parseFloat(vph)-50;
	niw = parseFloat((nih*oiw)/oih);
	
	}
	else{
		niw = parseFloat(vpw)-50;
		nih = parseFloat((niw*oih)/oiw);
		
	}
	thisimg.css({"height":nih+"px","width":niw+"px"});
	return;
}
function showZoom(id){
	$("#magazine-viewport").hide();
	$("#zoomWindow").show();
	zoomLevel = 0;	 

	hparts = getHashParts();
	$("#imageDiv").html("<img id='mainImage' src='http://images.nypl.org/index.php?t=w&id="+id+"'/>");

	
	
}



function loadApp(hashparts) {
 if (hashparts==undefined){

	 hashparts=getHashParts();
 }

 showNum = hashparts[0];

 itemImages=[];

 thisItem= _.find(LoudonMMS,function(val){
	 return val.id==showNum;
 });
 if ((typeof thisItem.type!="undefined")&&(thisItem.type=="audio")){
 	 $("#itemTitle").html(thisItem.title); 
 	 showNum = showNum.substring(1);
	 $("#all").html("<div style=\"display:none\"></div><object id=\"myExperience"+showNum+"\" class=\"BrightcoveExperience\">  <param name=\"bgcolor\" value=\"#FFFFFF\" />  <param name=\"width\" value=\"480\" />  <param name=\"height\" value=\"100\" />  <param name=\"playerID\" value=\"1592571451001\" />  <param name=\"playerKey\" value=\"AQ~~,AAABchwNFVk~,kE6q8YogD3vpn3QfnsIdak7n1kINhcVF\" />  <param name=\"isVid\" value=\"true\" />  <param name=\"isUI\" value=\"true\" />  <param name=\"dynamicStreaming\" value=\"true\" />    <param name=\"@videoPlayer\" value=\""+showNum+"\" /></object>");
	 $("#all").append("<div class='audiocaption'>"+thisItem.caption+"</div>");
	 
	 $("#zoomInstructions").hide();
	 brightcove.createExperiences();
 }
 else if ((typeof thisItem.type!="undefined")&&(thisItem.type=="special")){
 	 $("#itemTitle").html(thisItem.title); 
 	
	 $("#all").html(thisItem.content);
	 $("#zoomInstructions").hide();
 }
 else{
	 
 $("#itemTitle").html(thisItem.title);
 _.each(thisItem.images,function(val,key){
	caption = val.titles;
	
	if (typeof thisItem.title!="undefined"){
	if (thisItem.title.toLowerCase().indexOf("scrapbook")>=0){
		caption= "";
	}
	}
	if (val.imgNums.length>1) {
		_.each(val.imgNums,function(img){
			itemImages.push({"caption":caption,"image":img});
		})
	}
	else{
			itemImages.push({"caption":caption,"image":val.imgNums[0]});
	}
 });

 $('#all').fadeIn(1000);

bookWidth=800;
bookDisplay="double";
if (thisItem.display=="single"){
	bookWidth = 500;
	bookDisplay= "single";
}
	// Create the flipbook

	$('.magazine').turn({
			page: 1,
			// Magazine width
			display:bookDisplay,
			width: bookWidth,

			// Magazine height

			height: 521,

			// Elevation will move the peeling corner this number of pixels by default

			elevation: 50,
			
			// Hardware acceleration

			acceleration: !isChrome(),

			// Enables gradients

			gradients: true,
			
			// Auto center this flipbook

			autoCenter: true,

			// The number of pages

			pages: itemImages.length,

			// Events
			when: {

			turning: function(event, page, view) {
				
				var book = $(this),
				currentPage = book.turn('page'),
				pages = book.turn('pages');
			
				// Update the current URI
			
				Hash.go(showNum+'/' + page).update();

				// Show and hide navigation buttons

				disableControls(page);
				

				$('.thumbnails .page-'+currentPage).
					parent().
					removeClass('current');

				$('.thumbnails .page-'+page).
					parent().
					addClass('current');
				
			},

			turned: function(event, page, view) {
				
				disableControls(page);
				$("#captions").empty();
				if ($(this).turn("display")=="single"){
				vizimgs = $(".page img").filter(":visible").each(function(key,val){
					thisimg = $(val);
					oih = parseFloat(thisimg.height());
					oiw = parseFloat(thisimg.width());
					vp = thisimg.parent().parent().parent();
					vph = parseFloat(vp.height());
					vpw = parseFloat(vp.width());
					
					if (oih>oiw){
					nih = parseFloat(vph)-50;
					niw = parseFloat((nih*oiw)/oih);
					
					}
					else{
						niw = parseFloat(vpw)-50;
						nih = parseFloat((niw*oih)/oiw);
						
					}
					thisimg.css({"height":nih+"px","width":niw+"px"});
					return;
				
				$(this).turn('resize');
				});
				}
				
				$(this).turn('center');
				
				if (page<2) { 
					$(this).turn('peel', 'br');
			
					$("#captions").html("<div class='captionLeft'>"+itemImages[0].caption+" [Image id: "+itemImages[0].image+"]</div>")
				}
				else{
				
					$("#sidebar").html("<div id='captions'></div>");
					
					if ((page%2==0)||($(this).turn("display")!="double")){
						cap = page
					}
					else{
						cap = page-1;
					}
				sidebarText = "<div class='captionLeft'>"+itemImages[cap-1].caption+" [Left image id: "+itemImages[cap-1].image+"]</div>";
				if  (typeof itemImages[page]!="undefined"){
			
				if ($(this).turn("display")=="double"){
						sidebarText = sidebarText+"<br/><br/><div class='captionRight'>"+itemImages[cap].caption+" [Right image id: "+itemImages[cap].image+"]</div>";
				
					}
					
				}
				$("#captions").html(sidebarText);
				}
		
			},

			missing: function (event, pages) {

				// Add pages that aren't in the magazine

				for (var i = 0; i < pages.length; i++)
					addPage(pages[i], $(this), bookDisplay);

			}
		}

	});
	//resizeViewport();
	// Zoom.js
	
	$('.magazine-viewport').zoom({
		flipbook: $('.magazine'),
		max: function() { 
			
			return largeMagazineWidth()/$('.magazine').width();

		}, 
		when: {
			doubleTap: function(event) {
				if (bookDisplay=="double"){
				thisImg = $(event.originalEvent.target).next().attr("src");
				}
				else{
			
				thisImg = $(".page img").filter(":visible:first").attr("src");
				}
				id = thisImg.substring(thisImg.indexOf("id=")+3);
				
				//window.location.href="zoom.html#"+id;
				showZoom(id);
				/*(if ($(this).zoom('value')==1) {
					$('.magazine').
						removeClass('animated').
						addClass('zoom-in');
					$(this).zoom('zoomIn', event);
				} else {
					$(this).zoom('zoomOut');
				}*/
			},

			resize: function(event, scale, page, pageElement) {

				if (scale==1)
					loadSmallPage(page, pageElement);
				else
					loadLargePage(page, pageElement);

			},

			zoomIn: function () {
				
				
				
				$('.thumbnails').hide();
				$('.made').hide();
				$('.magazine').addClass('zoom-in');

				if (!window.escTip && !$.isTouch) {
					escTip = true;

					$('<div />', {'class': 'esc'}).
						html('<div>Press ESC to exit</div>').
							appendTo($('body')).
							delay(2000).
							animate({opacity:0}, 500, function() {
								$(this).remove();
							});
				}
			},

			zoomOut: function () {

				$('.esc').hide();
				$('.thumbnails').fadeIn();
				$('.made').fadeIn();

				setTimeout(function(){
					$('.magazine').addClass('animated').removeClass('zoom-in');
					resizeViewport();
				}, 0);

			},

			swipeLeft: function() {

				$('.magazine').turn('next');

			},

			swipeRight: function() {
				
				$('.magazine').turn('previous');

			}
		}
		
	
	});

	// Using arrow keys to turn the page
	$(document).unbind("keydown");
	$(document).keydown(function(e){

		var previous = 37, next = 39, esc = 27;

		switch (e.keyCode) {
			case previous:

				// left arrow
				$('.magazine').turn('previous');
				e.preventDefault();

			break;
			case next:
				
				//right arrow
				$('.magazine').turn('next');
				e.preventDefault();

			break;
			case esc:
				
				$('.magazine-viewport').zoom('zoomOut');	
				e.preventDefault();

			break;
		}
	});
	
	
$(window).ready(function(){
	$("#ZoomIn").click(function(e){
		e.preventDefault();
		nh = 2*parseFloat($("#mainImage").height());
		zoomLevel = zoomLevel+1;
		$("#mainImage").height(nh);
	});
	$("#ZoomOut").click(function(e){
		e.preventDefault();
		nh = parseFloat($("#mainImage").height())/2;
		$("#mainImage").height(nh);
		zoomLevel = zoomLevel-1;
	});
	$("#Reset").click(function(e){
		e.preventDefault();
		isrc = $("#mainImage").attr("src");
		$("#mainImage").replaceWith("<img src='"+isrc+"'/>");
		//window.location.reload();
	});
	$("#BackButton").click(function(e){
		e.preventDefault();
		$("#zoomWindow").hide();
		$("#magazine-viewport").show();
	
	});
});
 	$(window).on("hashchange",function(){
 
 		hashparts = getHashParts();
 		 if (hashparts.length>0){
 
 		 if (hashparts[0]!=showNum){
 		 	$(".thumbnails>div>ul").empty();
		 	$(".magazine").turn("destroy");
 			loadApp(parts);
 		 }
 		
 			if (typeof page!="undefined") {
 		
				if ($('.magazine').turn('is')){
					$('.magazine').turn('page', page);
				}
 			}
 	}});
	$(window).resize(function() {
		resizeViewport();
	}).bind('orientationchange', function() {
		resizeViewport();
	});

	// Events for thumbnails

	$('.thumbnails').click(function(event) {
		
		var page;

		if (event.target && (page=/page-([0-9]+)/.exec($(event.target).attr('class'))) ) {
		
			$('.magazine').turn('page', page[1]);
		}
	});

	$('.thumbnails li').
		bind($.mouseEvents.over, function() {
			
			$(this).addClass('thumb-hover');

		}).bind($.mouseEvents.out, function() {
			
			$(this).removeClass('thumb-hover');

		});

	if ($.isTouch) {
	
		$('.thumbnails').
			addClass('thumbanils-touch').
			bind($.mouseEvents.move, function(event) {
				event.preventDefault();
			});

	} else {

		$('.thumbnails ul').mouseover(function() {

			$('.thumbnails').addClass('thumbnails-hover');

		}).mousedown(function() {

			return false;

		}).mouseout(function() {

			$('.thumbnails').removeClass('thumbnails-hover');

		});

	}


	// Regions



	// Events for the next button

	$('.next-button').bind($.mouseEvents.over, function() {
		
		$(this).addClass('next-button-hover');

	}).bind($.mouseEvents.out, function() {
		
		$(this).removeClass('next-button-hover');

	}).bind($.mouseEvents.down, function() {
		
		$(this).addClass('next-button-down');

	}).bind($.mouseEvents.up, function() {
		
		$(this).removeClass('next-button-down');

	}).click(function() {
		
		$('.magazine').turn('next');

	});

	// Events for the next button
	
	$('.previous-button').bind($.mouseEvents.over, function() {
		
		$(this).addClass('previous-button-hover');

	}).bind($.mouseEvents.out, function() {
		
		$(this).removeClass('previous-button-hover');

	}).bind($.mouseEvents.down, function() {
		
		$(this).addClass('previous-button-down');

	}).bind($.mouseEvents.up, function() {
		
		$(this).removeClass('previous-button-down');

	}).click(function() {
		
		$('.magazine').turn('previous');

	});


	resizeViewport();

	$('.magazine').addClass('animated');

}
}




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
		yep: ['https://s3.amazonaws.com/dorothyloudon.nypl.org/assets/vendor/lib/turn.js'],
		nope: ['https://s3.amazonaws.com/dorothyloudon.nypl.org/assets/vendor/lib/turn.html4.min.js'],
		both: ['https://s3.amazonaws.com/dorothyloudon.nypl.org/assets/js/magazine.js', 'https://s3.amazonaws.com/dorothyloudon.nypl.org/assets/css/magazine.css', 'https://s3.amazonaws.com/dorothyloudon.nypl.org/assets/vendor/lib/zoom.min.js'],
		complete: loadApp
	});
}
