itemImages=[];
showNum=262505;
function getHashParts(){
	hashparts=[];
	hash = window.location.href;
	if (hash.indexOf("#")>0){
 		 hash = hash.substring(hash.indexOf("#")+1);
 		 alert("HASH: "+hash);
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

function loadApp(inputs) {
	
 if (inputs.hashparts==undefined){
	 
	 hashparts=getHashParts();
 }
 else{
	 hashparts = inputs.hashparts;
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
if ($.isTouch){
	//bookDisplay = "single";
	//bookWidth = 500;
	$("#sidebar").hide();
	$("#all").css({"left":"20px"});
}
	// Create the flipbook
pparts = getHashParts();
firstPage = 1;

if (pparts.length>1){
	firstPage = pparts[1];
}else{
	firstPage = 1;
}

	$('.magazine').turn({
			page: firstPage,
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
			
					if (!($(thisimg)[0].complete)){
						isrc = $(thisimg).attr("src");
						
						$(thisimg).replaceWith("<img src='"+isrc+"'/>")
					}
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
				else{
					vizimgs = $(".page img").filter(":visible").each(function(key,val){
						thisimg = $(val);
						
						if (!($(thisimg)[0].complete)){
							isrc = $(thisimg).attr("src");
							
							$(thisimg).replaceWith("<img src='"+isrc+"'/>")
						}
					});
				}
				$(this).turn('center');
				plh = parent.location.href;
				
				if (plh.indexOf("/page")>0){
					pend = plh.indexOf("/page");
				}
				else{
					pend = plh.length;
				}
				parent.location.href=plh.substring(0,pend)+"/page/"+page;
				
				
				if (page<2) { 
					$(this).turn('peel', 'br');
			
					$("#captions").html("<div class='captionLeft'>"+itemImages[0].caption+"<br/> <a href='./zoom.html#"+itemImages[0].image+"' target='_popout'>Open/rotate image in new window [Image id: "+itemImages[0].image+"]</a></div>")
				}
				else{
				
					$("#sidebar").html("<div id='captions'></div>");
					
					if ((page%2==0)||($(this).turn("display")!="double")){
						cap = page
					}
					else{
						cap = page-1;
					}
			
				if  ((typeof itemImages[cap]!="undefined")&&($(this).turn("display")=="double")){
			
				
						sidebarText=" <strong>Double click image to zoom</strong> <br/> <br/><div class='captionLeft'>"+itemImages[cap-1].caption+" <a href='./zoom.html#"+itemImages[cap-1].image+"' target='_popout'>Open/rotate in new window  [Left image id: "+itemImages[cap-1].image+"]</a></div><br/><br/><div class='captionRight'>"+itemImages[cap].caption+" <a href='./zoom.html#"+itemImages[cap].image+"' target='_popout'>Open image in new window  [Right image id: "+itemImages[cap].image+"]</a></div>";
					
					
				}
				else{
					sidebarText = "<strong>Double click image to zoom</strong> <br/><br/><div class='captionLeft'>"+itemImages[cap-1].caption+" <a href='./zoom.html#"+itemImages[cap-1].image+"' target='_popout'>Open/rotate in new window  [Image id: "+itemImages[cap-1].image+"]</a></div>";
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

	$('#magazine-viewport').zoom({
		flipbook: $('.magazine'),
		max: function() { 
			
			return largeMagazineWidth()/$('.magazine').width();

		}, 
		when: {
			doubleTap: function(event) {
			
				
				event.preventDefault();
			
				

				if ($(this).zoom('value')==1) {
					$('.magazine').
						removeClass('animated').
						addClass('zoom-in');
					$(this).zoom('zoomIn', event);
				} else {
					$(this).zoom('zoomOut');
				}
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
						html('<div>Double click or press ESC to zoom out</div>').
							appendTo($('body'));
							/*.
							delay(2000).
							animate({opacity:0}, 500, function() {
								$(this).remove();
							});*/
				}
			},

			zoomOut: function () {
				escTip = false;
				$('.esc').remove();
				$('.thumbnails').fadeIn();
				$('.made').fadeIn();
				$("#zoomControls").remove();
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
				$("#zoomControls").remove();
				e.preventDefault();

			break;
		}

	});
	
	
function addZoomControls(){
	
};
 	$(window).on("hashchange",function(){
 
 		hashparts = getHashParts();
 		 if (hashparts.length>0){
 
 		 if (hashparts[0]!=showNum){
 		 	$(".thumbnails>div>ul").empty();
		 	$(".magazine").turn("destroy");
 			loadApp({"hashparts":parts});
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
		 url: "./?v=brightcovejs",
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
