/*
 * Soma FontFriend %version%
 * http://somadesign.ca/projects/fontfriend
 * 
 * Copyright (c) 2009-11 Matt Wiebe 
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
	html: '%html%',
	customFamiles: false
};

// closurfy it
(function($, window, undefined){

	// check if it's already been added. saves against weirdness if clicked again.
	if ( $('#font-friend').size() === 0 ) {
		var body = $("body");
		$("head").append('<style id="font-friend-stylesheet" type="text/css" media="screen">'+fntfr.css+'</style>');
		body.append("<div id='font-friend'></div>");
		$("#font-friend").html(fntfr.html).addClass("open");
		$("#ff-credit").append("<span> "+fntfr.version+"</span>");
		
		// on Web Font Specimen?
		fntfr.wfs = ( window.location.href == "http://webfontspecimen.com/demo/" ) ? true : false;
		fntfr.wfsName = ( fntfr.wfs ) ? $("h1, .bodysize tr:first-child th:first-child") : false;
		// or, on Soma Web Font Specimen?
		if ( ! fntfr.wfs && $("body").attr("id") == 'soma-web-font-specimen' ) {
			fntfr.wfs = true;
			fntfr.wfsName = $("h1, .bodysize tr:first-child th.base");
		}
		if ( fntfr.wfs ) {
			fntfr.wfsOriginalName = $("h1").text();
			fntfr.wfsTitle = $("title").text();
		}
		
		/**
		 * We can define a custom family list with the fontFriendFamilies JS array
		 * or with the data-ff-families attribute on the <body> element (comma separated).
		 * 
		 */
		if ( typeof(fontFriendFamilies) !== 'undefined' ) {
			fntfr.customFamilies = fontFriendFamilies;
		}
		else if ( body.attr("data-ff-families") ) {
			fntfr.customFamilies = body.attr("data-ff-families").split(',');
		}
		
		function addCustomFontList(list){
			var ul = $('<ul id="ff-font-family-custom" data-ff="fontFamily" class="ff-hidden"></ul>'),
			html = "",
			h6Title = 'Click to toggle between custom &amp; stock font families',
			toggler = ': <span class="ff-custom">Custom</span><span class="ff-stock ff-active">Stock</span>';
			
			$.each(list, function(index, value){
				html += "<li>" + value + "</li>";
			});
			html = ul.append(html);
			
			$("#ff-font-family").append(html);
			$("#ff-font-family > h6")
				.addClass('ff-clickable').attr("title", h6Title)
				.append(toggler)
				// click handlers for the custom/stock toggler
				.click(function() {
					var self = $(this),
					isCustom = self.hasClass("ff-custom") ? true : false,
					customList = $("#ff-font-family-custom"),
					stockList = $("#ff-font-family-sans, #ff-font-family-serif"),
					isCustom = ! customList.is(":visible"),
					togglers = self.children(),
					speed = 100,
					toHide, toShow;
					
					if ( isCustom ) {
						toHide = stockList;
						toShow = customList;
					}
					else {
						toHide = customList;
						toShow = stockList;
					}
					
					togglers.toggleClass('ff-active');
					
					toHide.fadeOut(speed, function() {
						toShow.fadeIn(speed);
					});
					
				});
			$("#ff-font-family > h6").click();
		}
		
		// Do we have a custom family list?
		if ( fntfr.customFamilies ) {
			addCustomFontList(fntfr.customFamilies);
		}
		
		function changeFontName(name) {
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
		}

		// reuse later
		var ff = $("#font-friend");
	
		fntfr.width = ff.outerWidth();
		fntfr.height = ff.outerHeight();
	
		// open and close animations
		$("#ff-toggle").toggle(function() {
			ff.removeClass("open").animate({height:16, width:16},100);
		}, function() {
			ff.addClass("open").animate({height:fntfr.height, width:fntfr.width},100);
		});


		// the main attraction: change that font
		$("#ff-drop ul > li").live("click", function() {
			// don't do anything if we clicked on an input inside an li
			if ( $(this).children("input").length ) {
				return false;
			}
			
			// set variables
			var theAttribute = $(this).parent().attr("data-ff");
			var theValue = $(this).text();
			var theSelector = $("#ff-drop ol input:checked").next().text();
			if (theSelector == "") {
				var theSelector = $("#ff-drop ol input:checked").next().attr("value");
			}
			// apply that css
			$(theSelector).css(theAttribute, theValue);
			if ( theAttribute == 'fontFamily' && fntfr.wfs )
				changeFontName(theValue);
		});
	
		$("#ff-drop select").change(function() {
			// set variables
			var theAttribute = $(this).attr("data-ff");
			var theValue = parseFloat( $(this).find("option:selected").val() );
			var theSelector = $("#ff-drop ol input:checked").next().text();
			if (theSelector == "") {
				var theSelector = $("#ff-drop ol input:checked").next().attr("value");
			}
			// debug: console.log(theAttribute + " " + theValue + " " + theSelector);
			// apply that css
			$(theSelector).css(theAttribute, theValue);
		});
	
		// unbind the click on the custom font family input (it's in a <li> element)
		$("#ff-drop li.family-custom").unbind();
	
		// just type and change that custom font
		$("#family-custom").keyup(function() {
		
			// variables
			var theValue = $("#family-custom").attr("value"),
			theSelector = $("#ff-drop ol input:checked").next().text();
			if (theSelector == "") {
				theSelector = $("#ff-drop ol input:checked").next().attr("value");
			}
			
		
			// apply that custom font
			$(theSelector).css("fontFamily", theValue);
			if ( fntfr.wfs )
				changeFontName(theValue);
		
			return false;
		});

		//move the box around
		$("#ff-controls div").click(function() {
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
		$("#ff-blah, #family-custom").each(function(index) {
			$(this).attr('data-ff', $(this).attr("value") );
		}).click(function() {
		
			$(this).prev().attr("checked", "checked");
		
			if ($(this).attr("value") == $(this).attr("data-ff") ) {
				$(this).removeAttr("value");
			} else {
				$(this).select();
			}
		
		});
	
		// clear all inline styles -> might crash large pages!
		$("#ff-clear").click(function() {
			$("*").removeAttr("style");
			buildFamilies();
			if ( fntfr.wfs )
				changeFontName(); //empty call resets
		});
	
		// add inline font-family styles
		function buildFamilies() {
			$("#ff-font-family li, #ff-font-face li").each(function() {
				$(this).css('fontFamily', '"'+$(this).text()+'",monospace' );
			});
		};
		buildFamilies();
	
		// drop functions	
		function drop(event) {
		
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
				
					buildFontList(droppedFileName, droppedFontData);
				
				
					$("#ff-font-face ul li:last-child").click();
				
				} else {
					alert("Invalid file extension. Will only accept ttf, otf, svg or woff font files");
				}
			} // end for
		
		};
	
		function buildFontList(name, data) {
		
			// Get font file and prepend it to stylsheet using @font-face rule
			$("<style type='text/css'>@font-face{font-family: "+name+"; src:url("+data+");}</style> ").appendTo("head");
		
			$("#ff-font-face ul").append("<li style='font-family:"+name+"'>"+name+"</li>");
		
		};
	
		// add event listeners for dropper

		$("#ff-font-drop")
			.bind("dragover", function(event){event.stopPropagation(); event.preventDefault();})
			.bind("dragenter dragleave", function(event){$(this).toggleClass("dropzone"); event.stopPropagation(); event.preventDefault();})
			.bind("drop", drop);

	} 
	else {
		// if they've clicked on the bookmarklet a second time, assume they want to open it
		$("#font-friend").animate({height:fntfr.height, width:fntfr.width},100).addClass("open");
	}
}(jQuery, window));