<?PHP
# $prefix = "https://s3.amazonaws.com/dorothyloudon.nypl.org/";
 $prefix = "./";	
  $p = $_GET["v"];


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
 	case "LoudonMetadata":
 		$html = file_get_contents($prefix."assets/data/LoudonMetadata.js");
 	break;
 	case "LoudonTimeline":
 		$html = file_get_contents($prefix."assets/data/LoudonTimeline.js");
 	break;
 	case "scripts":
 		$html = file_get_contents($prefix."assets/js/scripts.js");
 	break;
 	case "LoudonPages":
 		$html = file_get_contents($prefix."assets/js/LoudonPages.js");
 	break;
 	case "finding-aid-js":
 		$html = file_get_contents($prefix."assets/js/finding-aid.js");
 	break;
 	default:
 		$html = file_get_contents($prefix."assets/timeline.html");	
 	break;	
 }
  	echo $html;
?>
