/*
 * Soma FontFriend %version%
 * http://somadesign.ca/projects/fontfriend
 * 
 * Copyright (c) 2009 Matt Wiebe 
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Uses some code (c) 2009 Ryan Seddon from
 * http://labs.thecssninja.com/font_dragr/
 * Licensed under the MIT license
 *
*/

var fntfr = {
	version: "%version%",
	// style info
	css: "%css%",
	// inserted html. see font-friend.html for understandable version
	html: '%html%'
};
// closurfy it
(function(jQuery){
	// check if it's already been added. saves against weirdness if clicked again.
	if (jQuery('#font-friend').size() == 0 ) {
	
		jQuery("head").append('<style id="font-friend-stylesheet" type="text/css" media="screen">'+fntfr.css+'</style>');
		jQuery("body").append("<div id='font-friend'></div>");
		jQuery("#font-friend").html(fntfr.html).addClass("open");
		jQuery("#typo-credit").append("<span> "+fntfr.version+"</span>");

		// reuse later
		var ff = jQuery("#font-friend");
	
		fntfr.width = ff.outerWidth();
		fntfr.height = ff.outerHeight();
	
		// open and close animations
		jQuery("#typo-toggle").toggle(function() {
			ff.removeClass("open").animate({height:16, width:16},100);
		}, function() {
			ff.addClass("open").animate({height:fntfr.height, width:fntfr.width},100);
		});


		// the main attraction: change that font
		jQuery("#typo-drop ul > li").live("click", function() {

			// set variables
			var theAttribute = jQuery(this).parent().attr("rel");
			var theValue = jQuery(this).text();
			var theSelector = jQuery("#typo-drop ol input:checked").next().text();
			if (theSelector == "") {
				var theSelector = jQuery("#typo-drop ol input:checked").next().attr("value");
			}
			// apply that css
			jQuery(theSelector).css(theAttribute, theValue);

		});
	
		jQuery("#typo-drop select").change(function() {
			// set variables
			var theAttribute = jQuery(this).attr("rel");
			var theValue = parseFloat( jQuery(this).find("option:selected").val() );
			var theSelector = jQuery("#typo-drop ol input:checked").next().text();
			if (theSelector == "") {
				var theSelector = jQuery("#typo-drop ol input:checked").next().attr("value");
			}
			// debug: console.log(theAttribute + " " + theValue + " " + theSelector);
			// apply that css
			jQuery(theSelector).css(theAttribute, theValue);
		});
	
		// unbind the click on the custom font family input (it's in a <li> element)
		jQuery("#typo-drop li.family-custom").unbind();
	
		// just type and change that custom font
		jQuery("#family-custom").keyup(function() {
		
			// variables
			var theSelector = jQuery("#typo-drop ol input:checked").next().text();
			if (theSelector == "") {
				var theSelector = jQuery("#typo-drop ol input:checked").next().attr("value");
			}
			var theValue = jQuery("#family-custom").attr("value");
		
			// apply that custom font
			jQuery(theSelector).css("fontFamily", theValue);
		
		
			return false;
		});

		//move the box around
		jQuery("#typo-controls div").click(function() {
			if (jQuery(this).hasClass("left") ) {
				jQuery("#font-friend").css({left:30, right:"auto"});
			} 
			if (jQuery(this).hasClass("right") ) {
					jQuery("#font-friend").css({right:30, left:"auto"});
			}
			if (jQuery(this).hasClass("up") ) {
				jQuery("#font-friend").css({top:0, bottom:"auto"});
			}
			if (jQuery(this).hasClass("down") ) {
				jQuery("#font-friend").css({bottom:0, top:"auto"});
			}
		});

		//clearout the text input onclick
		jQuery("#typo-blah, #family-custom").each(function(index) {
			jQuery(this).attr('rel', jQuery(this).attr("value") );
		}).click(function() {
		
			jQuery(this).prev().attr("checked", "checked");
		
			if (jQuery(this).attr("value") == jQuery(this).attr("rel") ) {
				jQuery(this).removeAttr("value");
			} else {
				jQuery(this).select();
			}
		
		});
	
		// clear all inline styles -> might crash large pages!
		jQuery("#typo-clear").click(function() {
			jQuery("*").removeAttr("style");
			fntfr.buildFamilies();
		});
	
		// add inline font-family styles
		fntfr.buildFamilies = function() {
			jQuery("#typo-font-family li, #typo-font-face li").each(function() {
				jQuery(this).css('fontFamily', '"'+jQuery(this).text()+'",monospace' );
			});
		};
		fntfr.buildFamilies();
	
		// drop functions	
		fntfr.drop = function(event) {
		
			event.stopPropagation();
			event.preventDefault();
		
			var dt = event.originalEvent.dataTransfer,
				files = dt.files,
				count = files.length,
				acceptedFileExtensions = /^.*\.(ttf|otf|svg|woff)$/i,
				droppedFullFileName,
				droppedFileName,
				droppedFontData;
		
			for (var i = 0; i < count; i++) {
				droppedFullFileName = files[i].fileName;
			
				if(droppedFullFileName.match(acceptedFileExtensions)) {
					droppedFileName = droppedFullFileName.replace(/\..+$/,""); // Removes file extension from name
					droppedFileName = droppedFileName.replace(/\W+/g, "-"); // Replace any non alpha numeric characters with -
					droppedFontData = files[i].getAsDataURL();
				
					fntfr.buildFontList(droppedFileName, droppedFontData);
				
				
					jQuery("#typo-font-face ul li:last-child").click();
				
				} else {
					alert("Invalid file extension. Will only accept ttf, otf, svg or woff font files");
				}
			} // end for
		
		};
	
		fntfr.buildFontList = function (name, data) {
		
			// Get font file and prepend it to stylsheet using @font-face rule
			jQuery("<style type='text/css'>@font-face{font-family: "+name+"; src:url("+data+");}</style> ").appendTo("head");
		
			jQuery("#typo-font-face ul").append("<li style='font-family:"+name+"'>"+name+"</li>");
		
		};
	
		// add event listeners for dropper

		jQuery("#typo-font-drop")
			.bind("dragover", function(event){event.stopPropagation(); event.preventDefault();})
			.bind("dragenter dragleave", function(event){jQuery(this).toggleClass("dropzone"); event.stopPropagation(); event.preventDefault();})
			.bind("drop", fntfr.drop);

	} 
	else {
		// if they've clicked on the bookmarklet a second time, assume they want to open it
		jQuery("#font-friend").animate({height:fntfr.height, width:fntfr.width},100).addClass("open");
	}
}(jQuery));