<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
 xmlns:ead="urn:isbn:1-931666-22-9"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" exclude-result-prefixes="ead xsi xlink" version="1.0">

  <xsl:output method="html"/>
     <xsl:template match="/ead/frontmatter">
     </xsl:template>
          <xsl:template match="eadheader">
     </xsl:template>
    <xsl:template match="/">


<div id="NYPLFA_body">
<xsl:apply-templates/>
</div>

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
  <xsl:apply-templates/>
  </div> 
  </xsl:otherwise>
</xsl:choose> 
 
  </xsl:template>
  

</xsl:stylesheet>
