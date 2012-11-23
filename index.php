<?PHP
  $prefix = "https://s3.amazonaws.com/dorothyloudon.nypl.org/";
  #$prefix = "./";	
  $page = $_GET["v"];
  $hash = strpos($page,"#");
  $h = "";
  if ($hash){
  $p = substr($page,0,$hash); 
  }
  else{
  	$p=$page;
  }
 switch ($p){
 	case "finding-aid":
 		$html = file_get_contents($prefix."assets/finding-aid.html");
 	break;	
 		case "biography":
 		$html = file_get_contents($prefix."assets/biography.html");
 	break;	
 	case "about":
 		$html = file_get_contents($prefix."assets/about.html");
 	break;
 	case "turner":
 		$html = file_get_contents($prefix."assets/LoudonPages.html");
 	break;
 	case "brightcovejs":
 		$html = file_get_contents("http://admin.brightcove.com/js/BrightcoveExperiences.js");
 	break;
 	default:
 		$html = file_get_contents($prefix."assets/timeline.html");	
 	break;	
 }
  	echo $html;
?>
