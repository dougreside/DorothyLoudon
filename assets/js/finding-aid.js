fb = $.fancybox;
	$(window).ready(function(){
	    processHash();
	});
	$(window).on("hashchange",function(path,parts){
		  processHash();
	});

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
		  
			  if (parts.length>2){
					 framepage = parts[3];
				 }
				 else{
					 framepage = 1;
				 }
				 fwidth = $(window).width()*.90;
				 framestring = "<iframe id='bookframe' height=550 width="+fwidth+" src='?v=turner#"+parts[1]+"/"+framepage+"'></iframe>";
				   
			
		  
			  if (!($('#fancybox-wrap').is(":visible"))){ 
			  
		
			fb(framestring, {
				'hideOnOverlayClick' : false,
				'hideOnContentClick' : false,
				'scrolling' : true,
				'autoScale' : true,
				'autoDimensions' : true,
				'onCleanup' : function(e) {
				
					resetEventHash("",hash,0,0);
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
			 $("iframe").on("mouseover",function(e){$(this).focus()});
		  
	
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