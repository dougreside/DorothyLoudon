fb = $.fancybox;
	$(window).ready(function(){
		resizeElements();
		$(window).on("resize",function(){resizeElements();});
	    processHash();
	});
	$(window).on("hashchange",function(path,parts){
		  processHash();
	});
	function resizeElements(){
		totalH = $(window).height();
		
		smaller = parseFloat(totalH)-$("#FA-nav").height()-$("#FA-head").height()-50;
		//$("#sidebar").height(smaller);
		$("#main").height(smaller);
		$("#mainContent").height(smaller);
	}

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
		 hash = getHash();
		 
	 
		  parts = hash.split("/");  
		
		  if (parts.length>1){
		  
		  
			  if (!($('#fancybox-wrap').is(":visible"))){ 
			framestring = "<iframe id='bookframe' height=550 width=1200 src='./?v=turner#"+parts[1]+"/1'></iframe>";
		    
		
			fb(framestring, {
				'hideOnOverlayClick' : false,
				'hideOnContentClick' : false,
				'scrolling' : true,
				'autoScale' : true,
				'autoDimensions' : true,
				'onCleanup' : function(e) {
				
					 window.history.back();
				}
				}
			);
			fb.init();
			$(window).on("resize",function(){
				fb.resize();
			})
		  }}
		  else{
				 if (typeof fb!=undefined){
				 fb.close();
				 }
			 }
			
		  
	
	}