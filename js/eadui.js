ead = null;
function xmlToString(xmlData) { 
	// Taken from: http://www.mail-archive.com/jquery-en@googlegroups.com/msg27059.html
    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
}   

function loadEAD(xml){
	ead = xml;

	//hash = hash.replace(/\&/g,">");
  
	//c = $(ead.documentElement).find(hash).eq(0);
	
	//$("#answer").html(c.text());
	
}
function processHash(){
	hash = window.location.hash;
	if (hash.substring(0,1)=="#"){
	hash = hash.substring(1);

	}
}
function loadXML(ead,xslt){


		 
	
		 //alert(xslt);
		 var processor = new XSLTProcessor();
		 processor.importStylesheet(xslt);
		 var XmlDom = processor.transformToDocument(ead)
		 var rootEle  = $(XmlDom).find(".ead").eq(0); 
		// var serializer = new XMLSerializer(); 
		// var output = serializer.serializeToString(XmlDom.documentElement);
		
		 var outputDiv = $("#mainContent").append(rootEle);
		 sidebarText ="";
		
		 if ($(rootEle).find(".archdesc")!=undefined){
		
			 var ad = $(rootEle).find(".archdesc");
			 var children = $(ad).children("div");
			 for (c in children){
				 
				 if ($(children[c]).children(".head")[0]!=undefined){
					 $(children[c]).children(".head").prepend("<a name='head"+c+"'> </a>"); 
					sidebarText =sidebarText+"<li><a class='headlink' href='#head"+c+"'>"+$(children[c]).children(".head").text()+"</a></li>";		
				 }
				 
			 }
			
			 $("#navBar").html(sidebarText);
			
		 }
		 $(".box").each(function(key,value){
			 if (key==1){
				 console.log($(value).next()[0].className);
			 }
			 if ($(value).next().hasClass("folder"))
			 {
			
				 
				 box = $(value).text();
				 folder = $(value).next().text();
				 
				 $(value).parent().click(function(e){
					 
					 box = $(e.target).parent().find(".box").eq(0).text();
					 folder = $(e.target).parent().find(".folder").eq(0).text();
					 showImage(box,folder)});
			 }
			 else{
				
			 }
		 });
		 
							
	
}
function showImage(box,folder){

	fimages = [];

	filtered = _.filter(TildenImages,function(image){
		return ((image.Box == box)&&(image.Folder==folder))
	});
	
	_.each(filtered,function(val){
		fimages.push({"href": "http://images.nypl.org/index.php?id="+val.image+"&t=w","title":val.title});
	});
	$.fancybox(fimages,{
		'padding'		: 0,
	
		'type'			: 'image',
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic'
	});
	
}
$(document).ready(function(){
	var mainH= parseFloat($(window).height())-50;


	uri = window.location.href;
	$('#mainContent').css({'height':mainH+'px'});
	$('#sidebar').css({'height':mainH+'px'});
	$('#sidebar .headlink').each(function(key,val){
		$(val).attr({"href":"#head_"+key});
	});
	$('.archdesc>*>.head').each(function(key,val){
		$(val).attr({"id":"head_"+key});
	});
	$('#sidebar .seriestitle ').each(function(key,val){
		$(val).attr({"href":"#st_"+key});
	});
	$('.c01>.did>.unittitle').each(function(key,val){
		$(val).attr({"id":"st_"+key});
	});
	
		
	
	
	
})