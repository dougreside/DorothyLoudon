
	jQuery(function($) {
		fb = $.fancybox;
		sorted = [];
		function getHash(){
			 hash = window.location.hash;
			 if (hash.length>1){
				 
				  if (hash.indexOf("#")>-1){
					  hash = hash.substring(hash.indexOf("#")+1);
				  }
			 }
			
			 return hash;
		}
		function processHash(){
			 hash = getHash()
			 
			
			  parts = hash.split("/");  
			
			  if (parts.length>1){
			  
			  slide = parseInt(parts[1]);
		 
			  $( "#carousel" ).rcarousel( "goToPage", slide );
			  }
			  
			  if (parts.length>2){
				 switch (parts[2]){
				
				 case "item":
			     
				//framestring = "<iframe id='bookframe' height=550 width=1200 src='https://s3.amazonaws.com/dorothyloudon.nypl.org/assets/LoudonPages.html#"+parts[3]+"/1'></iframe>";
					 if (parts.length>5){
						 framepage = parts[5];
					 }
					 else{
						 framepage = 1;
					 }
					 
					 framestring = "<iframe id='bookframe' height=550 width=1200 src='?v=turner#"+parts[3]+"/"+framepage+"'></iframe>";
					   
					 $("iframe").on("mouseover",function(e){$(this).focus()});
			    
				break;
			    
			
				 }
				 
				 if (!($('#fancybox-wrap').is(":visible"))){ 
					 
				 if (typeof framestring != "undefined"){
			
				fb(framestring, {
					'hideOnOverlayClick' : false,
					'hideOnContentClick' : false,
					'scrolling' : true,
					'centerOnScroll':false,
					'autoScale' : true,
					'autoDimensions' : true,
					'onClosed' : function(e) {
					
						$("#bookframe").focus();
						keyListen();
						hash = getHash();
						resetEventHash("",hash,0,2);
					
						
						 //window.history.back();
					}
					}
				);
				fb.init();

				$(window).unbind("keydown");
				$(window).on("resize",function(){
					if (!($.isTouch)){
					fb.resize();
					}
				})
				 }
				 }
			  }
			  
				 else{
				
					 if (typeof fb!=undefined){
					 fb.close();
					 
					 }
				 }
			  
		
		}
function resetEventHash(base,hash,s,e){
	
	//hash = getHash();
	parts = hash.split("/");
	if (e<0){
		e = parts.length;
	}
	newhash = base;
	
	for (var i = s;i<e;i++){
		
		newhash = newhash+parts[i]+"/"; 
	}
	newhash = newhash.substring(0,newhash.length-1);
	window.location.hash = newhash;
	}
		function pageLoaded( event, data ) {

			if (data.page>0){
			row = $("#overviewTable").find("tr").eq(parseInt(data.page-1)).find("a");
		
			$(".selectedRow").removeClass("selectedRow");
			$(row).addClass("selectedRow");
			hash = getHash();
			newhash =  "event/"+data.page+"/";
			resetEventHash(newhash,hash,2,-1);
			
			// populate related items
			
				}
			else{
				$(".selectedRow").removeClass("selectedRow");
				window.location.hash = "";
			}
			return;
		}
	
	function generatePages(){
		return;
	}	
	function startCarousel(){

		$("#carousel").rcarousel(
			{
				visible: 1,
				step: 1,
				speed: 400,
				auto: {
					enabled: false
				},
				width: 790,
				height: 410,
				start: generatePages,
				pageLoaded: pageLoaded
			}
		);
	
		$("#ui-carousel-next" )
			.add( "#ui-carousel-prev" )
			.add(".bullet" )
			.hover(
				function(){
					$( this ).css("opacity", 0.7 );
				},
				function(){
					$( this ).css("opacity", 1.0 );
				}
			);
	}	


	$(window).on("hashchange",function(path,parts){
		  processHash();
	});

	$(document).ready(function(){
		hash = processHash();
		 
		sorted = _.sortBy(LoudonTimeline.date,function(val){
			return val.startDate;
		} );

		_.each(sorted,function(val,key){
			
			captionLink="#";
			if (val.relatedItems!=undefined){
				captionLink ="#element/"+(key+1)+"/item/"+val.relatedItems[0];
			}
			dateparts = val.startDate.split(",");
			humanyear = dateparts[0]; 
			
			itemText = "<div class='slide'><div class='span-8 append-1 clear'><a href='"+captionLink+"'><img width=300 src='"+val.asset.media+"' alt='Scrapbook Image' /></a></div><div class='span-10 append-1 last'><h3 class='showTitle'>"+val.headline+"</h3><div class='date'>"+humanyear+"</div><div class='relatedHead'><span class='relatedItems'>View items related to this event</span><div class='relatedItemList'><ul>";
			
			relatedItems = val.relatedItems;
			
			
			_.each(relatedItems,function(v,k){
				
				anItem=_.find(LoudonMMS,function(i){
					return i.id==v;
				});
				
				if (typeof anItem!="undefined"){
					
				caption = anItem.title;
				
				
				itemText=itemText+"<li><a class='fancyBoxInvoke' href='#event/"+(key+1)+"/item/"+anItem.id+"'>"+caption+"</a></li>";
				}
			});
			itemText=itemText+"</ul></div></div><div>"+val.text+"</div></div>";	
			
			$("#carousel").append($(itemText));
			
			
			
			
			thisclass="span-8";
		
			if ((parseInt(sorted.length/10))==(parseInt(key/10))){
				thisclass="span-8 last";
			}
			
			if (key%10==0){
				$("#show-list").append("<div class='"+thisclass+"'><ul></ul></div>");
			}
			
			$("#show-list>div").last().find("ul").append("<li><a class='showLink' href='#' id='event_"+(key+1)+"'>"+val.headline+" ["+val.startDate.substring(0,4)+"]</a></li>");
						
	
		});
			 $('.fancyBoxInvoke').click(function(){
				 processHash();
			 })
		     $(".relatedHead").bind('mouseenter',function(e){


			
			$(".relatedHead ul").css({"display":"block"});
			
			 $(".relatedHead").mouseleave(function(e){
				 
			$(".relatedHead ul").css({"display":"none"});
			$(".relatedHead").unbind("mouseleave");
			
		});
		
			
			
		});
       

		$("#show-list>div").last().addClass("last");
		$(".showLink").click(function(e){
			id = $(this).attr("id");
			page = id.substring(id.indexOf("_")+1);
			row = $("#overviewTable").find("tr").eq(parseInt(page)).find("a");
			$(".selectedRow").removeClass("selectedRow");
			$(row).addClass("selectedRow");
		    $(window).scrollTop(0);
		    window.location.hash= "#event/"+page;
			processHash();
			e.preventDefault();

		});
		keyListen();
		startCarousel();
		processHash();
		});	
		function keyListen(){
			$(window).keydown(function(e){
				
				 if ((e.keyCode == 37) || (e.which == 37))
				    {   
				
					 $("#carousel").rcarousel("prev");			
					 }
				    // right arrow
				    if ((e.keyCode == 39)|| (e.which == 39))
				    {
				    	$("#carousel").rcarousel("next");	
				    }   
			
				
			});
			return;
		}
	});