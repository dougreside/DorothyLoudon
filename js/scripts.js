
	jQuery(function($) {
		fb = $.fancybox;
		//monthstring = ["Unknown","January","February","March","April","May","June","July","August","September","October","November","December"];
		sorted = [];
		function getHash(){
			 hash = window.location.hash;
			 if (hash.length>1){
				 
				  if (hash.indexOf("#")>0){
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
				 case "items":
					 framestring = "<iframe id='itemList' height=700 width=1000 src='./itemList.html#"+parts[1]+"'></iframe>";
					 
				break;
				 case "item":
			 
				framestring = "<iframe id='bookframe' height=550 width=1200 src='./LoudonPages.html#"+parts[3]+"/1'></iframe>";
			     break;
				 }
				fb(framestring, {
					'hideOnOverlayClick' : false,
					'hideOnContentClick' : false,
					'scrolling' : true,
					'autoScale' : true,
					'autoDimensions' : true,
					'onCleanup' : function(e) {
						$("#bookframe").focus();
					}
					}
				);
				fb.init();
				$(window).on("resize",function(){
					console.log("resize");
					console.log(fb);
					fb.resize();
				})
			  }
			  
		
		}

		function pageLoaded( event, data ) {
			if (data.page>0){
			row = $("#overviewTable").find("tr").eq(parseInt(data.page-1)).find("a");
		
			$(".selectedRow").removeClass("selectedRow");
			$(row).addClass("selectedRow");
			window.location.hash = "event/"+data.page;
			
			// populate related items
			
				}
			else{
				$(".selectedRow").removeClass("selectedRow");
				window.location.hash = "";
			}
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
			
			itemText = "<div class='slide'><div class='span-8 append-1 clear'><a href='"+captionLink+"'><img width=300 src='"+val.asset.media+"' alt='Scrapbook Image' /><p class='title'>"+val.asset.caption+"</p></a></div><div class='span-10 append-1 last'><h3 class='showTitle'>"+val.headline+"</h3><div class='date'>"+humanyear+"</div><div class=\"relatedHead\"><span class='relatedItems'>View items related to this event</span><div class='relatedItemList'><ul>";
			
			relatedItems = val.relatedItems;
			
			
			_.each(relatedItems,function(v,k){
				
				anItem=_.find(LoudonMMS,function(i){
					return i.id==v;
				});
				if (anItem!=undefined){
				thumbCoverId = anItem.images[0].imgNums[0];
				caption = anItem.title;
				
				
				itemText=itemText+"<li><a href='#event/"+(key+1)+"/item/"+anItem.id+"'>"+caption+"</a></li>";
				}
			});
			itemText=itemText+"</ul></div></div><div>"+val.text+"</div></div>";	
			
			$("#carousel").append(itemText);
			
			
			
			
			thisclass="span-8";
		
			if ((parseInt(sorted.length/9))==(parseInt(key/9))){
				thisclass="span-8 last";
			}
			
			if (key%9==0){
				$("#show-list").append("<div class='"+thisclass+"'><ul></ul></div>");
			}
			
			$("#show-list>div").last().find("ul").append("<li><a class='showLink' href='#' id='event_"+(key+1)+"'>"+val.headline+"</a></li>");
			
			//$("#overviewTable").append("<tr><td><span class='showTitle'><a class='showLink' id='event_"+(key+1)+"'>"+val.headline+"</a></span></td></tr>");
			
	
		});
		$(".showLink").click(function(e){
			id = $(this).attr("id");
			page = id.substring(id.indexOf("_")+1);
			row = $("#overviewTable").find("tr").eq(parseInt(page)).find("a");
			$(".selectedRow").removeClass("selectedRow");
			$(row).addClass("selectedRow");
		
		    window.location.hash= "#event/"+page;
			processHash();
			e.preventDefault();

		});


		$ri =  $(".relatedItems");
        $ri.bind('mouseenter',function(){

			var $this = $(this);
			$(".relatedHead ul").css({"display":"block"});
		});
        $(".relatedHead").bind('mouseleave',function(){
			var $this = $(this);
			$(".relatedHead ul").css({"display":"none"});
		});


		
		
		

		
		
		
		
		
		
		
		
		startCarousel();
		processHash();
		});	

	});