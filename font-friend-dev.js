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
(function($, undefined){
	// check if it's already been added. saves against weirdness if clicked again.
	if ($('#font-friend').size() == 0 ) {
	
		$("head").append('<style id="font-friend-stylesheet" type="text/css" media="screen">'+fntfr.css+'</style>');
		$("body").append("<div id='font-friend'></div>");
		$("#font-friend").html(fntfr.html).addClass("open");
		$("#typo-credit").append("<span> "+fntfr.version+"</span>");
		
		// on Web Font Specimen?
		fntfr.wfs = ( window.location.href == "http://webfontspecimen.com/demo/" ) ? true : false;
		fntfr.wfsName = ( fntfr.wfs ) ? $("h1, .bodysize tr:first-child th:first-child") : false;
		// or, on Soma Web Font Specimen?
		if ( !fntfr.wfs && $("body").attr("id") == 'soma-web-font-specimen' ) {
			fntfr.wfs = true;
			fntfr.wfsName = $("h1, .bodysize tr:first-child th.base");
		}
		if ( fntfr.wfs ) {
			fntfr.wfsOriginalName = $("h1").text();
			fntfr.wfsTitle = $("title").text();
		}
		
		fntfr.changeFontName = function(name) {
			// not webfont specimen? leave.
			if ( ! fntfr.wfs )
				return false;

			// empty call = reset
			if ( name == undefined ) {
				fntfr.wfsName.text(fntfr.wfsOriginalName);
				$("title").text(fntfr.wfsTitle);
			}
			else {
				fntfr.wfsName.text(name);
				$("title").text( fntfr.wfsTitle.replace('Font name', name) );
			}
		};

		// reuse later
		var ff = $("#font-friend");
	
		fntfr.width = ff.outerWidth();
		fntfr.height = ff.outerHeight();
	
		// open and close animations
		$("#typo-toggle").toggle(function() {
			ff.removeClass("open").animate({height:16, width:16},100);
		}, function() {
			ff.addClass("open").animate({height:fntfr.height, width:fntfr.width},100);
		});


		// the main attraction: change that font
		$("#typo-drop ul > li").live("click", function() {
			// don't do anything if we clicked on an input inside an li
			if ( $(this).children("input").length ) {
				return false;
			}
			
			// set variables
			var theAttribute = $(this).parent().attr("rel");
			var theValue = $(this).text();
			var theSelector = $("#typo-drop ol input:checked").next().text();
			if (theSelector == "") {
				var theSelector = $("#typo-drop ol input:checked").next().attr("value");
			}
			// apply that css
			$(theSelector).css(theAttribute, theValue);
			if ( theAttribute == 'fontFamily' && fntfr.wfs )
				fntfr.changeFontName(theValue);
		});
	
		$("#typo-drop select").change(function() {
			// set variables
			var theAttribute = $(this).attr("rel");
			var theValue = parseFloat( $(this).find("option:selected").val() );
			var theSelector = $("#typo-drop ol input:checked").next().text();
			if (theSelector == "") {
				var theSelector = $("#typo-drop ol input:checked").next().attr("value");
			}
			// debug: console.log(theAttribute + " " + theValue + " " + theSelector);
			// apply that css
			$(theSelector).css(theAttribute, theValue);
		});
	
		// unbind the click on the custom font family input (it's in a <li> element)
		$("#typo-drop li.family-custom").unbind();
	
		// just type and change that custom font
		$("#family-custom").keyup(function() {
		
			// variables
			var theSelector = $("#typo-drop ol input:checked").next().text();
			if (theSelector == "") {
				var theSelector = $("#typo-drop ol input:checked").next().attr("value");
			}
			var theValue = $("#family-custom").attr("value");
		
			// apply that custom font
			$(theSelector).css("fontFamily", theValue);
			if ( fntfr.wfs )
				fntfr.changeFontName(theValue);
		
			return false;
		});

		//move the box around
		$("#typo-controls div").click(function() {
			if ($(this).hasClass("left") ) {
				$("#font-friend").css({left:30, right:"auto"});
			} 
			if ($(this).hasClass("right") ) {
					$("#font-friend").css({right:30, left:"auto"});
			}
			if ($(this).hasClass("up") ) {
				$("#font-friend").css({top:0, bottom:"auto"});
			}
			if ($(this).hasClass("down") ) {
				$("#font-friend").css({bottom:0, top:"auto"});
			}
		});

		//clearout the text input onclick
		$("#typo-blah, #family-custom").each(function(index) {
			$(this).attr('rel', $(this).attr("value") );
		}).click(function() {
		
			$(this).prev().attr("checked", "checked");
		
			if ($(this).attr("value") == $(this).attr("rel") ) {
				$(this).removeAttr("value");
			} else {
				$(this).select();
			}
		
		});
	
		// clear all inline styles -> might crash large pages!
		$("#typo-clear").click(function() {
			$("*").removeAttr("style");
			fntfr.buildFamilies();
			if ( fntfr.wfs )
				fntfr.changeFontName(); //empty call resets
		});
	
		// add inline font-family styles
		fntfr.buildFamilies = function() {
			$("#typo-font-family li, #typo-font-face li").each(function() {
				$(this).css('fontFamily', '"'+$(this).text()+'",monospace' );
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
				
				
					$("#typo-font-face ul li:last-child").click();
				
				} else {
					alert("Invalid file extension. Will only accept ttf, otf, svg or woff font files");
				}
			} // end for
		
		};
	
		fntfr.buildFontList = function (name, data) {
		
			// Get font file and prepend it to stylsheet using @font-face rule
			$("<style type='text/css'>@font-face{font-family: "+name+"; src:url("+data+");}</style> ").appendTo("head");
		
			$("#typo-font-face ul").append("<li style='font-family:"+name+"'>"+name+"</li>");
		
		};
	
		// add event listeners for dropper

		$("#typo-font-drop")
			.bind("dragover", function(event){event.stopPropagation(); event.preventDefault();})
			.bind("dragenter dragleave", function(event){$(this).toggleClass("dropzone"); event.stopPropagation(); event.preventDefault();})
			.bind("drop", fntfr.drop);

	} 
	else {
		// if they've clicked on the bookmarklet a second time, assume they want to open it
		$("#font-friend").animate({height:fntfr.height, width:fntfr.width},100).addClass("open");
	}
}(jQuery));