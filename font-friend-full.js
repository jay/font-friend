/*!
 * Soma FontFriend 3.0
 * http://somadesign.ca/projects/fontfriend
 * 
 * Copyright (c) 2009-11 Matt Wiebe 
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
		version: "3.0",
		// style info
		css: "#font-friend{overflow:hidden;position:fixed;bottom:0;left:30px;background-color:#fff;background-color:rgba(255,255,255,0.93);width:740px;color:#222;-moz-box-shadow:1px 1px 5px rgba(0,0,0,.3);-webkit-box-shadow:1px 1px 5px rgba(0,0,0,.3);box-shadow:1px 1px 5px rgba(0,0,0,.3);z-index:10000;text-align:left;height:280px}#ff-drop{padding:12px 12px 12px 36px}#ff-toggle{background-color:#222;color:#eee;display:block;width:12px;height:16px;padding:0 1px 0 3px;position:absolute;top:0;left:0;font-size:16px;line-height:1;cursor:pointer;z-index:10001}#ff-toggle sup{font-size:13px;line-height:13px;vertical-align:super;display:none}.open #ff-toggle sup{display:inline}#ff-toggle:hover{color:#fff;background-color:#555}.open #ff-toggle{width:auto;height:32px;font-size:32px;padding:0 3px}#ff-drop form{background:0;color:inherit;float:none}#ff-drop h6{font-size:13px;border-bottom:1px solid #aaa;line-height:1.5!important;margin:0 0 6px!important;padding:0!important;text-indent:0!important;float:none!important}#ff-drop>div{float:left;width:120px;padding-right:20px;margin-bottom:12px}#ff-drop>div.wrap>div{margin-bottom:12px;font-size:11px!important}#ff-drop div#ff-selector{width:130px}#ff-drop div#ff-font-family{width:240px}#ff-selector p{font-size:9px!important;line-height:1.2!important;margin:1em 0 0!important;padding:0!important}#ff-controls{position:absolute;bottom:60px;left:65px;width:55px!important;height:60px;margin:0!important;padding:0!important}#ff-controls div{position:absolute;font-size:20px;width:1em;height:1em;cursor:pointer;color:#555;min-width:inherit!important;min-height:inherit!important;padding:0;margin:0;float:none}#ff-controls div:hover{color:#000}#ff-controls .up{left:1em;top:0}#ff-controls .down{left:1em;bottom:0}#ff-controls .left{left:0;top:1em}#ff-controls .right{right:0;top:1em}#ff-drop #ff-font-family ul{float:left;width:110px;padding-right:5px}#ff-drop #ff-font-family ul#ff-font-family-sans{padding-right:10px;width:115px}#ff-drop ol li{list-style:none outside}#ff-drop ol,#ff-drop ul{margin:0;padding:0}#ff-drop li{font-size:11px!important;line-height:1.5!important;margin:0!important;padding:0!important;list-style:none outside none!important;text-indent:0!important;height:auto!important}#ff-drop li.core{margin-bottom:4px!important;padding:0!important}#ff-drop ul li:hover{cursor:pointer;background-color:#e6e6e6!important}#ff-drop ul li.family-custom{margin:12px 0 0!important}#ff-drop ul li.family-custom:hover{cursor:default;background:0}#family-custom{width:105px}#ff-drop ol input[type=radio]{margin-left:-5px;width:auto!important}#ff-blah{width:100px;margin-left:5px}#ff-drop ol label{margin-left:5px;display:inline!important}#ff-credit{position:absolute;bottom:21px;left:32px;font-size:9px;margin:0!important}#font-friend a{color:#4c0003!important;text-decoration:underline!important;border:0!important}#font-friend a:hover{color:#a60007!important}#ff-clear{position:absolute;bottom:0;right:0;padding:5px 5px 0!important;text-decoration:line-through;opacity:.1;font-size:21px;margin:0!important;width:auto!important}#ff-clear:hover{opacity:1;cursor:pointer}#ff-font-drop{font-size:11px!important;background-color:#e6e6e6;padding:18px 0;text-align:center;border:1px solid #aaa;margin-bottom:6px}#ff-font-drop.dropzone{background-color:#fff;border-color:#111}#ff-drop select{width:98.5%!important}#ff-drop select option{font-size:10px!important}#ff-drop .ff-hidden{display:none}#ff-drop .ff-clickable{cursor:pointer}#ff-font-family h6 span{text-transform:uppercase!important;font-size:75%;font-weight:normal!important;color:#111!important;letter-spacing:.02em;line-height:1;display:inline-block}#ff-font-family h6 .ff-active{color:#aaa!important}#ff-font-family .ff-custom{padding:0 6px;border-right:1px solid #bbb;margin-right:6px}#ff-font-family h6.typekit-badge{background:url(http://typekit.com/favicon.ico) no-repeat center right}#ff-drop #ff-font-family #ff-font-family-custom{width:100%;-webkit-column-count:2;-moz-column-count:2;column-count:2;-webkit-column-gap:12px;-moz-column-gap:12px;column-gap:12px}",
		// inserted html. see font-friend.html for understandable version
		html: '<div id="ff-drop"><span id="ff-toggle">F<sup>2</sup></span><div id="ff-selector"><h6>Selector</h6><form action="" method="get"><ol><li><input type="radio" name="jq-select" checked="checked" id="jq1"><label for="jq1">body</label></li><li><input type="radio" name="jq-select" id="jq2"><label for="jq2">h1,h2,h3,h4,h5,h6</label></li><li><input type="radio" name="jq-select" id="jq3"><label for="jq3">p</label></li><li><input type="radio" name="jq-select" id="jq4"><input type="text" name="ff-blah" value="roll your own" id="ff-blah"></li></ol></form><p>Roll your own selector using <a href="http://docs.jquery.com/Selectors">jQuery selectors</a>.</p></div><div id="ff-font-family"><h6>Font Family</h6><ul id="ff-font-family-sans" data-ff="fontFamily"><li>Arial</li><li>Verdana</li><li>Tahoma</li><li class="core">Trebuchet MS</li><li>Helvetica</li><li>Helvetica Neue</li><li>Gill Sans</li><li>Century Gothic</li><li>Lucida Grande</li><li>Lucida Sans Unicode</li><li>Calibri</li><li>Corbel</li><li>Candara</li></ul><ul id="ff-font-family-serif" data-ff="fontFamily"><li>Times New Roman</li><li class="core">Georgia</li><li>Times</li><li>Palatino</li><li>Palatino Linotype</li><li>Baskerville</li><li>Hoefler Text</li><li>Garamond</li><li>Constantia</li><li>Cambria</li><li class="family-custom"><input type="text" name="family-custom" value="your font family" id="family-custom"></li></ul></div><div class="wrap"><div id="ff-font-size"><h6>Font Size</h6><select data-ff="fontSize"><option>10</option><option>11</option><option>12</option><option>14</option><option>16</option><option>18</option><option>21</option><option>24</option><option>36</option><option>48</option><option>60</option><option>72</option></select></div><div id="ff-font-weight"><h6>Font Weight</h6><select data-ff="fontWeight"><option>100</option><option>200</option><option>300</option><option value="400" selected="selected">400 (normal)</option><option>500</option><option>600</option><option value="700">700 (bold)</option><option>800</option><option>900</option></select></div><div id="ff-line-height"><h6>Line Height</h6><select data-ff="lineHeight"><option>1</option><option>1.1</option><option>1.2</option><option>1.3</option><option>1.4</option><option>1.5</option><option>1.6</option><option>1.75</option><option>2</option></select></div><div id="ff-font-style"><h6>Font Style</h6><ul data-ff="fontStyle"><li>italic</li><li>normal</li></ul></div></div><div class="wrap"><div id="ff-font-face"><h6>@font-face</h6><div id="ff-font-drop">Drag a font here.</div><ul data-ff="fontFamily"></ul></div><div id="ff-text-transform"><h6>Text Transform</h6><ul data-ff="textTransform"><li>uppercase</li><li>lowercase</li><li>capitalize</li><li>none</li></ul></div><div id="ff-font-variant"><h6>Font Variant</h6><ul data-ff="fontVariant"><li>small-caps</li><li>normal</li></ul></div></div><div id="ff-controls"><div class="left">&larr;</div><div class="right">&rarr;</div><div class="up">&uarr;</div><div class="down">&darr;</div></div><div id="ff-credit"><a href="http://somadesign.ca/projects/fontfriend/" title="Soma FontFriend homepage">Soma FontFriend</a></div><div id="ff-clear" title="clear all styles">S</div></div>',
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