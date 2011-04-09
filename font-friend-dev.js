/*!
 * Soma FontFriend %version%
 * http://somadesign.ca/projects/fontfriend
 * 
 * Copyright (c) 2009-%current% Matt Wiebe 
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Uses some code (c) 2009-10 Ryan Seddon from
 * http://labs.thecssninja.com/font_dragr/
 * Licensed under the MIT license
 *
*/



// closurfy it
(function($, window, undef){

	// check if it's already been added. saves against weirdness if clicked again.
	if ( $('#font-friend').size() !== 0 ) {
		// if they've clicked on the bookmarklet a second time, assume they want to open it
		$("#font-friend").animate({height:fontFriend.height, width:fontFriend.width},100).addClass("open");
		return false;
	}
	// moving along
	var fontFriend = {
		version: "%version%",
		// style info
		css: "%css%",
		// inserted html. see font-friend.html for understandable version
		html: '%html%',
		customFamiles: false,
		customFamilyMap: []
	},
	body = $("body");

	$("head").append('<style id="font-friend-stylesheet" type="text/css" media="screen">'+fontFriend.css+'</style>');
	body.append("<div id='font-friend'></div>");
	$("#font-friend").html(fontFriend.html).addClass("open");
	$("#ff-credit").append("<span> "+fontFriend.version+"</span>");

	// on Web Font Specimen?
	fontFriend.wfs = ( window.location.href == "http://webfontspecimen.com/demo/" ) ? true : false;
	fontFriend.wfsName = ( fontFriend.wfs ) ? $("h1, .bodysize tr:first-child th:first-child") : false;
	// or, on Soma Web Font Specimen?
	if ( ! fontFriend.wfs && $("body").attr("id") == 'soma-web-font-specimen' ) {
		fontFriend.wfs = true;
		fontFriend.wfsName = $("h1, .bodysize tr:first-child th.base");
	}
	if ( fontFriend.wfs ) {
		fontFriend.wfsOriginalName = $("h1").text();
		fontFriend.wfsTitle = $("title").text();
	}

	/**
	 * We can define a custom family list with the fontFriendFamilies JS array/object
	 * or with the data-ff-families attribute on the <body> element (comma separated).
	 * 
	 */
	if ( typeof(fontFriendFamilies) !== 'undefined' ) {
		fontFriend.customFamilies = fontFriendFamilies;
		// not an array. It must be an object
		if ( ! $.isArray(fontFriend.customFamilies)) {
			var fffTemp = [];
			$.each( fontFriend.customFamilies, function(index, value) {
				fffTemp.push(index);
			});
			fontFriend.customFamilies = fffTemp;
			fontFriend.customFamilyMap = fontFriendFamilies;
		}
	}
	else if ( body.attr("data-ff-families") ) {
		fontFriend.customFamilies = body.attr("data-ff-families").split(',');
	}

	// Searches the html page for a script loaded from use.typekit.
	// Returns the kit ID as a string.
	function findKitId(){
		var kitId = null;
		$('script').each(function(index){
			var m = this.src.match(/use\.typekit\.com\/(.+)\.js/);
			if (m) {
				kitId = m[1];
				return false;
			}
		});
		return kitId;
	}

	function maybeAddTypekit() {
		var kitId = findKitId();
		if ( ! kitId ) {
			return false;
		}
	
		$.getJSON("https://typekit.com/api/v1/json/kits/" + kitId + "/published?callback=?", function(data){

		if( ! data.errors ) {
			var fontList = [];
			$.each(data.kit.families, function(i,family){
				fontFriend.customFamilyMap[family.name] = family.css_names.join(',');
				fontList.push(family.name);
			});
			addCustomFontList(fontList);
			buildFamilies();
			$("#ff-font-family h6").addClass("typekit-badge");
		}
	});
	}
	maybeAddTypekit();

	function addCustomFontList(list){
		var existingUl = $("#ff-font-family-custom"),
		ul = $('<ul id="ff-font-family-custom" data-ff="fontFamily" class="ff-hidden"></ul>'),
		html = "",
		h6Title = 'Click to toggle between custom &amp; stock font families',
		toggler = ': <span class="ff-custom ff-active">Custom</span><span class="ff-stock">Stock</span>';
	
		$.each(list, function(index, value){
			html += "<li>" + value + "</li>";
		});

		// exit early if we already have a list
		if ( existingUl.size() === 1 ) {
			return existingUl.append(html);
		}
	
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
	if ( fontFriend.customFamilies ) {
		addCustomFontList(fontFriend.customFamilies);
	}

	function changeFontName(name) {
		// not webfont specimen? leave.
		if ( ! fontFriend.wfs )
			return false;

		// empty call = reset
		if ( name == undef ) {
			fontFriend.wfsName.text(fontFriend.wfsOriginalName);
			$("title").text(fontFriend.wfsTitle);
		}
		else {
			fontFriend.wfsName.text(name);
			$("title").text( fontFriend.wfsTitle.replace('Font name', name) );
		}
	}

	// reuse later
	var ff = $("#font-friend");

	fontFriend.width = ff.outerWidth();
	fontFriend.height = ff.outerHeight();

	// open and close animations
	$("#ff-toggle").toggle(function() {
		ff.removeClass("open").animate({height:16, width:16},100);
	}, function() {
		ff.addClass("open").animate({height:fontFriend.height, width:fontFriend.width},100);
	});

	function maybeFontStack(fontFamily) {
		// is it in our map?
		if ( fontFriend.customFamilyMap[fontFamily] !== undef ) {
			fontFamily = fontFriend.customFamilyMap[fontFamily];
		}
		// add monospace as a fallback in the stack
		return fontFamily + ",monospace";
	}

	// the main attraction: change that font
	$("#ff-drop ul > li").live("click", function() {
		// don't do anything if we clicked on an input inside an li
		if ( $(this).children("input").length ) {
			return false;
		}
	
		// set variables
		var self = $(this),
		theAttribute = self.parent().attr("data-ff"),
		theValue = self.text(),
		theSelector = $("#ff-drop ol input:checked").next().text();
		if (theSelector == "") {
			theSelector = $("#ff-drop ol input:checked").next().attr("value");
		}
	
		// font-family-specific
		if ( theAttribute == 'fontFamily' ) {
			changeFontName(theValue);
			theValue = maybeFontStack(theValue);
		}

		// apply that css
		$(theSelector).css(theAttribute, theValue);

	});

	$("#ff-drop select").change(function() {
		// set variables
		var theAttribute = $(this).attr("data-ff"),
		theValue = parseFloat( $(this).find("option:selected").val() ),
		theSelector = $("#ff-drop ol input:checked").next().text();
		if (theSelector == "") {
			theSelector = $("#ff-drop ol input:checked").next().attr("value");
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
		$("*").not("[data-ff=fontFamily]").removeAttr("style");
		buildFamilies();
		if ( fontFriend.wfs )
			changeFontName(); //empty call resets
	});

	// add inline font-family styles
	function buildFamilies() {
		$("#ff-font-family li, #ff-font-face li").each(function() {
			var self = $(this);
			self.css('fontFamily', maybeFontStack(self.text()) );
		});
	}
	buildFamilies();
	
	function processData(file, name) {
		var reader = new FileReader();
			reader.name = name;
			
		reader.onloadend = function(event) {
			buildFontList(event);
		};
		
		reader.readAsDataURL(file);
	}
	
	// drop functions	
	function handleDrop(event) {

		var dt = event.originalEvent.dataTransfer,
			files = dt.files,
			count = files.length,
			acceptedFileExtensions = /^.*\.(ttf|otf|woff)$/i;
		
		preventActions(event);
		
		for (var i = 0; i < count; i++) {
			var file = files[i],
				droppedFullFileName = file.name,
				droppedFileName;
	
			if(droppedFullFileName.match(acceptedFileExtensions)) {
				droppedFileName = 
					droppedFullFileName.replace(/\..+$/,"") // Removes file extension from name
					.replace(/\W+/, "-").replace(/-|_/, " ") // Replace any non alpha numeric characters with a space.
					.replace(/^([a-z])|\s+([a-z])/g, function (word) {
						return word.toUpperCase();
					}); // uppercase it
				processData(file, droppedFileName);
		
			} else {
				alert("Invalid file extension. Will only accept ttf, otf, or woff font files");
			}
		} // end for
		
	};

	function buildFontList(event) {
		var name = event.target.name,
			data = event.target.result;
		
		// Dodgy fork because Chrome 6 dev doesn't add media type to base64 string when a dropped file(s) type isn't known
		// http://code.google.com/p/chromium/issues/detail?id=48368
		var dataURL = data.split("base64");
		if(dataURL[0].indexOf("application/octet-stream") == -1) {
			dataURL[0] = "data:application/octet-stream;base64";
			data = dataURL[0] + dataURL[1];
		}
		
		// Get font file and prepend it to stylsheet using @font-face rule
		$("<style type='text/css'>@font-face{font-family: "+name+"; src:url("+data+");}</style> ").appendTo("head");
		addCustomFontList([name]);
		buildFamilies();
		$("#ff-font-family-custom").find("li:last").click();
	};
	
	function preventActions(event) {
		event.stopPropagation();
		event.preventDefault();
	}

	// add event listeners for dropper
	$("#ff-font-drop")
		.bind("dragover", preventActions)
		.bind("dragenter dragleave", function(event){$(this).toggleClass("dropzone"); preventActions(event); })
		.bind("drop", handleDrop);

}(jQuery, window));