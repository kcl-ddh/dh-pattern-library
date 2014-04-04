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

/* Reveal panel */
function revealPanel(page) {
	/*	this assumes the content you are loading in from the external
		file is in a div/section etc. with id="content-section"
	*/
	var page = page + " #content-section > *";
	$('#panel-content').removeClass('show');
	$("#panel-content").html("");

	$(".reveal-panel").css("display","block");
	$(".reveal-panel").addClass("slide-out");

	$(".updating").css("display","block");
	
	$("#panel-content").load( page, function() {
		// Hide the spinner
		$(".updating").css("display","none");
		// fade in the content
		$('#panel-content').addClass("show");

	});
	return false;	
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
		$(".selected-filter").remove();
		updateBrowseResults();
		$("#no-filters").css("display","block");
	});
	// slider
	if ( $.fn.slider) {
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
	}
	
	/* Activate reveal panel */
	$(".ctrl.show-reveal-panel").click( function() {
		externalPage = $(this).attr("data-reveal-page");
		revealPanel(externalPage);
	});
	$("#panel-closer").click( function() {
		$(".reveal-panel").removeClass("slide-out");
		return false;
	});	
	
});