<?PHP
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
 		$html = file_get_contents("https://s3.amazonaws.com/dorothyloudon.nypl.org/assets/finding-aid.html");
 	break;	
 		case "biography":
 		$html = file_get_contents("https://s3.amazonaws.com/dorothyloudon.nypl.org/assets/biography.html");
 	break;	
 	case "about":
 		$html = file_get_contents("https://s3.amazonaws.com/dorothyloudon.nypl.org/assets/about.html");
 	break;
 	default:
 		$html = file_get_contents("https://s3.amazonaws.com/dorothyloudon.nypl.org/assets/timeline.html");	
 	break;	
 }
  	echo $html;
?>
