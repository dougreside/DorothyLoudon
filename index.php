<?PHP
#  $prefix = "https://s3.amazonaws.com/dorothyloudon.nypl.org/";
 $prefix = "./";	
  $p = $_GET["v"];
  $a = $_GET["a"];


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
 		$html = file_get_contents($prefix."assets/js/BrightcoveExperiences.js");
 	break;
 	case "zoom":
 		$html = file_get_contents($prefix."assets/zoom.html");
 	break;
 	default:
 		$html = file_get_contents($prefix."assets/timeline.html");	
 	break;	
 }
  	echo $html;
?>
