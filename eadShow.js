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
function loadEAD(ead){
hash = window.location.hash;
if (hash.substring(0,1)=="#"){
hash = hash.substring(1);

}
  hash = hash.replace(/\&/g,">");
  c = $(ead.documentElement).find(hash).eq(0);
  $("#answer").html(c.text());
	
}
function loadXML(){

	$.ajax( {
								type : "GET",
								url : uri,
								async : false,
								success : function(xml) {
									loadEAD(xml);
								}
							});
}

