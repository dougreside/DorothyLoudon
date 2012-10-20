
	
	
	$(document).ready(function() {
		$(".requestLink").click(function(e){
			var folder = $(e.target).parent().parent().prev().html();
	    	var box = $(e.target).parent().parent().prev().prev().html();
	  
	    	$.fancybox({
				'content': $("#callslip").parent().html(),
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'onComplete': function(){
					
				
					$(".boxVal").html(box);
					
					$(".folderVal").html(folder);
				}
			});	
		});
		
		
    oTable = $('#eadTable').dataTable({"bAutoWidth": false,
    	 "bScrollInfinite": true,
         "bScrollCollapse": true,
         "sScrollY": "500px",
      /*  "fnDrawCallback": function ( oSettings ) {
            if ( oSettings.aiDisplay.length == 0 )
            {
                return;
            }
             
            var nTrs = $('#eadTable tbody tr');
            var iColspan = nTrs[0].getElementsByTagName('td').length;
            var sLastGroup = "";
            for ( var i=0 ; i<nTrs.length ; i++ )
            {
                var iDisplayIndex = oSettings._iDisplayStart + i;
                var sGroup = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[0];
                if ( sGroup != sLastGroup )
                {
                    var nGroup = document.createElement( 'tr' );
                    var nCell = document.createElement( 'td' );
                    nCell.colSpan = iColspan;
                    nCell.className = "group";
              
                    nCell.innerHTML = sGroup;
                    nGroup.appendChild( nCell );
                    nTrs[i].parentNode.insertBefore( nGroup, nTrs[i] );
                    sLastGroup = sGroup;
                   
                    }
      
                }
                
            
        },*/
        "aoColumnDefs": [
           // { "bVisible": false, "aTargets": [ 0 ] }
        ],
        "aaSortingFixed": [[ 0, 'asc' ]],
        "aaSorting": [[ 1, 'asc' ]],
        "sDom": 'lpfr<"giveHeight"t>i'
    });
    $(".subseriesTab>a").click( function ( e ) {
    	var filterVal = $(e.target).html();
    	$(".selectedSubseries").removeClass("selectedSubseries");
    	$(e.target).parent().addClass("selectedSubseries");
    	filterVal = filterVal.replace(/\s+/g," ");
    	if (filterVal=="All"){
    		oTable.fnFilter( "", 0, false, true, false);
    	}
    	else{
    		
    		var sc = $(e.target).parent().parent().children(".scopeContent").html();
    		
    		if (sc){
    			$("#rightCol").html(sc);
    		}
            oTable.fnFilter( filterVal, 1, false, true, false);
    	}
    });  
    $(".seriesTab>a").click( function ( e ) {
    	oTable.fnFilter( "", 1, false, true, false);
    	var filterVal = $(e.target).html();
    	$(".selectedSubseries").removeClass("selectedSubseries");
    	$(".selectedSeries").removeClass("selectedSeries");
    	$(e.target).parent().addClass("selectedSeries");
    	filterVal = filterVal.replace(/\s+/g," ");
    	$(".subseriesList").hide();
    	if (filterVal=="All"){
    		oTable.fnFilter( "", 0, false, true, false);
    	}
    	else{
    		
    		var sc = $(e.target).parent().parent().children(".scopeContent").html();
    		
    		if (sc){
    			$("#rightCol").html(sc);
    		}
    		$(e.target).parent().parent().find(".subseriesList").show();
            oTable.fnFilter( filterVal, 0, false, true, false);
    	}
    } );
   /* $(".requestItem").click(function(e){
    	
    	var folder = $(e.target).parent().parent().prev().html();
    	var box = $(e.target).parent().parent().prev().prev().html();
    	alert(callNumber+" box: "+box+" folder: "+folder);
    });*/
} );