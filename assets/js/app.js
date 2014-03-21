// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

/* Expandable lists */
function expandableList() {
	// expandable lists
	var collapsedClass = "fa fa-caret-right";
	var expandedClass = "fa fa-caret-down";
    $("section[data-section='expandable'] .list-header a.ctrl").click(function () {
		if ( $(this).attr("data-collapsed-text") ) {
			collapsedText = $(this).attr("data-collapsed-text");
		} else {
			collapsedText = '';
		}
		if ( $(this).attr("data-expanded-text") ) {
			expandedText = $(this).attr("data-expanded-text");
		} else {
			expandedText = '';
		}
        if ($(this).hasClass("expand")) {
            $(this).parent().parent().parent().find(".list-content").slideDown(400, function () {
                // finished
            });
            $(this).removeClass("expand").addClass("collapse");
            $(this).find("i").removeClass(collapsedClass).addClass(expandedClass);
			if ( expandedText !='') {
				$(this).find(".ctrl-link-title").text(expandedText);
			}
        } else if ($(this).hasClass("collapse")) {
            $(this).parent().parent().parent().find(".list-content").slideUp();
            $(this).removeClass("collapse").addClass("expand");
            $(this).find("i").removeClass(expandedClass).addClass(collapsedClass);
			if ( collapsedText !='') {
				$(this).find(".ctrl-link-title").text(collapsedText);
			}
        }

        return false;
    });
	// end expandable lists
}

/* Faceted browsing functions */
/* Update browse results */
function updateBrowseResults() {
	$("#loading").addClass("spinner-active");
	$("#results-section").addClass("overlay-active");
	setTimeout(function() { 
		$("#results-section").removeClass("overlay-active"); 
		$("#loading").removeClass("spinner-active");
	 }, 500);
	 $("#no-filters").css("display","none");
	
}




// extra javascript
$(document).ready( function() {
	
	// expandable lists
	expandableList();
	
	// faceted navigation
	$("section[data-expandable-group-member='facets'] .ctrl.select").click( function() {
		updateBrowseResults();
	});
	// remove facet
	$(".selected-filter .ctrl.remove").click( function() {
		$(this).parent().parent().remove();
		updateBrowseResults();
	});
	// remove all facets
	$(".filters-header").click( function() {
		$("dl.selected-filter").remove();
		updateBrowseResults();
		$("dd#no-filters").css("display","block");
	});
	// slider
	$("#date-slider").slider({
		range: true,
      	values: [1914,1918],
      	min: 1914,
      	max: 1918,
      	step: 1,
		slide: function( event, ui ) {
		        $("#person-date-lower" ).val( ui.values[ 0 ]);
				lower = ui.values[0];
				upper = ui.values[1];
				$("#date-lower").text(lower);
				$("#date-upper").text(upper);
		      },
	    stop: function() {
				 // refresh results if auto-refreshing
				 updateBrowseResults();
			 } 
     	
    });
	
	
});