<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
 xmlns:ead="urn:isbn:1-931666-22-9"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" exclude-result-prefixes="ead xsi xlink" version="1.0">



    <xsl:template match="/">
    
<html>
<head>
<title><xsl:value-of select="//ead:titleproper"></xsl:value-of></title>

<style type="text/css" title="currentStyle">

		.eadheader{
		display: none;
		}
		.unitdate {
		display: inline;
		}
		 .date{
		display: inline;
		}
		.titleproper{
		font-weight:bold;
		font-size: 16pt;
		padding-bottom: 1em;
		padding-top: 1em;
		}
		.num{
		font-weight:bold;
		}
		.titlepage{
		line-height:1.5;
		text-align: center;
		}
		.publisher{
		padding-top: 1em;
		padding-bottom: 1em;
		line-height:1;
		}
		.address{
		padding-top: 1em;
		padding-bottom: 1em;
		line-height:1;
		}
		.label{
		display: inline;
		font-weight:bold;
		}
		.defitem>.item{
		display: inline;
		}
		.list{
		padding-top: 1em;
		padding-bottom: 2em;
		}
		.titlepage{
		padding-bottom: 3em;
		}
		.head{
		padding-top: 2px;
		padding-bottom: 2px;
		}
		.descgrp>.head{
		font-weight: bold;
		font-size: 14pt;
		padding-bottom: 1em;
		padding-top: 1em;
		}
		.descgrp>div{
		padding-left: 20px;
		}
		
		.descgrp>div.head{
		padding-left: 0px;
		
		}
			.controlaccess>div{
		padding-left: 20px;
		}
		.controllaccess>div.head{
		padding-left: 0px;
		}
		.FindingAid{
		width: 600px;
		}
		.head{
		font-weight:bold;
		}
		div.p{
		padding-bottom: 1ex;
		width: 500px;
		}
		.title{
		display: inline;
		font-style: italic;
		}
		.item{
		display: block;
		}
		.c01{
		padding-left:20px;
		}
		.c01>.did{
		font-weight: bold;
		padding: 5px;
		}
		.physdesc{
		padding-left:50px;
		}
		
		.c02>.did{
		font-weight: bold;
		}
		.c02{
		padding-left:20px;
		}
		.c03{
		padding-left:20px;
		}
			.c04{
		padding-left:20px;
		}
			.c05{
		padding-left:20px;
		}
			.c06{
		padding-left:20px;
		}
			.c07{
		padding-left:20px;
		}
			.c08{
		padding-left:20px;
		}
			.c09{
		padding-left:20px;
		}
			.c10{
		padding-left:20px;
		}
			.c11{
		padding-left:20px;
		}
			.c12{
		padding-left:20px;
		}
		.unittitle{
		
		padding: 10px;
		display: inline;
		border-bottom: thin grey dotted;
		padding-bottom:1px;
		cursor: pointer;
		}
	
		
		.container{
		display:inline;
		}
		#mainContent{
		float:left;
		width: 50%;
		overflow: auto;
		padding-left: 50px;
		}
		#sidebar{
		float: left;
		
		width: 20%;
		overflow:auto;
		background-color:#666;
		}
		#navBar{
		list-style: none;
		padding-left:0;
		}
		#navBar>li{
		padding: 5px;
		border: thin solid #888;
		color: white;
		}
		.headlink{
		text-decoration: none;
		color: white;
		}
		.box{
		display: inline;
		}
		.folder{
		display: inline;
		}
		#popBox{
		display: none;
		}
		#viewBar{
	
		float: left;
		padding-left:2px;
		width: 25%;
		overflow:auto;
		}
		
</style>
<script type="text/JavaScript" src="./js/jquery-1.6.4.min.js"></script>
<script type="text/JavaScript" src="./js/sarissa/sarissa.js"></script>
<script type="text/javascript" src="./js/eadui.js"></script>
<script type="text/javascript" src="./js/jquery-scrollTo.js"></script>
	<script type="text/javascript" src="./vendor/fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
	<script type="text/javascript" src="./vendor/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
			<script type="text/javascript" src="./js/underscore-min.js"></script>
	<link rel="stylesheet" type="text/css" href="./vendor/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
</head>
<body>

<div id="bodyContent">
<div class="sidebar" id="sidebar">
<ul id="navBar">

<xsl:for-each select="//ead:archdesc/*/ead:head">
<li><a class='headlink' href='#'><xsl:value-of select="."/></a></li>
</xsl:for-each>
</ul>
</div>
<div id="mainContent">
<div id="NYPLFA_body">
<xsl:apply-templates/>
</div>
</div>
<div id="viewBar">

</div>
</div>
<div id="footer">
</div>


</body>
</html>

</xsl:template>
     <xsl:template match="/ead/frontmatter">
     </xsl:template>
          <xsl:template match="eadheader">
     </xsl:template>
   




  <xsl:template match="//ead:archdesc/*/ead:head">
  
     <xsl:variable name="headanchor" select="."/>
     <a><xsl:attribute name="id"><xsl:value-of select="headanchor"></xsl:value-of></xsl:attribute>
         <xsl:apply-templates/>
     </a>
   </xsl:template>
   <xsl:template match="//ead:eadheader">
  
   </xsl:template>

  <xsl:template match="//ead:*">
	
  <xsl:choose>
  <xsl:when test="local-name()='container'">
      <xsl:variable name="conType" select="@type"/>
     <div>
      <xsl:attribute name="class"><xsl:value-of select="$conType"/></xsl:attribute>
        <xsl:value-of select="$conType"/>: <xsl:apply-templates/>
    </div>
  </xsl:when>
  <xsl:otherwise>
    <xsl:variable name="myname" select="local-name()"/>
  <div>
  <xsl:attribute name="class"><xsl:value-of select="$myname"/></xsl:attribute>
 <xsl:attribute name="id"><xsl:text>EAD_</xsl:text>
 <xsl:number/>
 </xsl:attribute>
  <xsl:apply-templates/>
  </div> 
  </xsl:otherwise>
</xsl:choose> 
 
  </xsl:template>
  
  
  
</xsl:stylesheet>