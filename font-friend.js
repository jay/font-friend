/*
 * Soma FontFriend 0.9
 * http://somadesign.ca/projects/fontfriend
 * 
 * Copyright (c) 2009 Matt Wiebe 
 * Licensed under the GPL v2 license
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
*/

var fontFriendVersion = "1.0";

// style info
var fontFriendCss = "#font-friend {overflow:hidden; position: fixed; bottom:0; left:30px; background-color:#fff; background-color:rgba(255,255,255,0.9); width:600px; color:#222; -moz-box-shadow:1px 1px 5px rgba(0,0,0,.3); -webkit-box-shadow:1px 1px 5px rgba(0,0,0,.3); box-shadow:1px 1px 5px rgba(0,0,0,.3); z-index:10000; text-align:left; height:280px;} #typo-drop {padding:12px 12px 12px 36px;} #typo-toggle {background-color:#222; color:#eee; display:block; width:12px; height:16px; padding:0 1px 0 3px; position:absolute; top:0; left:0; font-size:16px; line-height:1; cursor:pointer;} #typo-toggle:hover {color:#fff; background-color:#555;} .open #typo-toggle {width:24px; height:32px; font-size:32px; padding:0 0 0 4px;} #typo-drop h6 {font-size:13px; border-bottom:1px solid #aaa; line-height:1.5 !important; margin:0 0 6px !important; padding:0 !important; text-indent:0 !important; float:none !important;} #typo-drop div {float:left; width:120px; padding-right:20px; margin-bottom:12px;} #typo-drop div#typo-selector {width:130px;} #typo-drop div#typo-font-family {width:240px;} #typo-selector p {font-size:9px !important; line-height:1.2 !important; margin:1em 0 0 !important; padding:0 !important;} #typo-controls {position:absolute; bottom:60px; left:65px; width:55px !important; height:60px; margin:0 !important; padding:0 !important;} #typo-controls div {position:absolute; font-size:20px; width:1em; height:1em; cursor:pointer; color:#555; min-width:inherit !important; min-height:inherit !important; padding:0; margin:0; float:none;} #typo-controls div:hover {color:#000;} #typo-controls .up {left:1em; top:0;} #typo-controls .down {left:1em; bottom:0;} #typo-controls .left {left:0; top:1em;} #typo-controls .right {right:0; top:1em;} #typo-drop #typo-font-family ul {float:left; width:110px; padding-right:5px;} #typo-drop #typo-font-family ul#typo-font-family-sans {padding-right:10px; width:115px;} #typo-drop ol li {list-style: none outside} #typo-drop ol, #typo-drop ul {margin:0; padding:0;} #typo-drop li {font-size:11px !important; line-height:1.5 !important; margin:0 !important; padding:0 !important; list-style: none outside none !important; text-indent:0 !important; height:auto !important;} #typo-drop li.core {margin-bottom:4px !important; padding:0 !important;} #typo-drop ul li:hover {cursor:pointer; background-color:#e6e6e6 !important;} #typo-drop ul li.family-custom {margin:12px 0 0 !important;} #typo-drop ul li.family-custom:hover {cursor:default; background:none;} #family-custom {width:105px;} #typo-drop ol input[type=radio] {margin-left:-5px;} #typo-blah {width:100px; margin-left:5px;} #typo-drop ol label {margin-left:5px;} #typo-credit {position:absolute; bottom:21px; left:32px; font-size:9px; margin:0 !important;} #font-friend a {color:#4C0003 !important; text-decoration:underline !important; border:0 !important;} #font-friend a:hover {color:#A60007 !important;} #typo-clear {position:absolute; bottom:0; right:0; padding:5px 5px 0 !important; text-decoration: line-through; opacity:.1; font-size:21px; margin:0 !important; width:auto !important;} #typo-clear:hover {opacity:1; cursor:pointer;}";

// inserted html. see font-friend.html for understandable version
var fontFriendHtml = '<div id="typo-drop"> <span id="typo-toggle">F</span>  <div id="typo-selector"> <h6>Selector</h6> <form action="" method="get"> <ol> <li><input type="radio" name="jq-select" checked="checked" id="jq1"><label for="jq1">body</label></li> <li><input type="radio" name="jq-select" id="jq2"><label for="jq2">h1,h2,h3,h4,h5,h6</label></li> <li><input type="radio" name="jq-select" id="jq3"><label for="jq3">p</label></li> <li><input type="radio" name="jq-select" id="jq4"><input type="text" name="typo-blah" value="roll your own" id="typo-blah"></li> </ol> </form> <p>Roll your own selector using <a href="http://docs.jquery.com/Selectors">jQuery selectors</a>.</p> </div>  <div id="typo-font-family"> <h6>Font Family</h6> <ul id="typo-font-family-sans" rel="fontFamily"> <li>Arial</li> <li>Verdana</li> <li>Tahoma</li> <li class="core">Trebuchet MS</li> <li>Helvetica</li> <li>Helvetica Neue</li> <li>Gill Sans</li> <li>Century Gothic</li> <li>Lucida Grande</li> <li>Lucida Sans Unicode</li> <li>Calibri</li> <li>Corbel</li> <li>Candara</li>  </ul> <ul id="typo-font-family-serif" rel="fontFamily"> <li>Times New Roman</li> <li class="core">Georgia</li> <li>Times</li> <li>Palatino</li> <li>Palatino Linotype</li> <li>Baskerville</li> <li>Hoefler Text</li> <li>Garamond</li> <li>Constantia</li> <li>Cambria</li> <li class="family-custom"><input type="text" name="family-custom" value="your font family" id="family-custom"></li> </ul>  </div>  <div id="typo-font-variant"> <h6>Font Variant</h6> <ul rel="fontVariant"> <li>small-caps</li> <li>normal</li> </ul> </div>  <div id="typo-font-weight"> <h6>Font Weight</h6> <ul rel="fontWeight"> <li>bold</li> <li>normal</li> </ul> </div>  <div id="typo-text-transform"> <h6>Text Transform</h6> <ul rel="textTransform"> <li>capitalize</li> <li>uppercase</li> <li>lowercase</li> <li>none</li> </ul> </div>  <div id="typo-controls"> <div class="left">&larr;</div> <div class="right">&rarr;</div> <div class="up">&uarr;</div> <div class="down">&darr;</div> </div>  <div id="typo-credit"><a href="http://somadesign.ca/projects/fontfriend/" title="Soma FontFriend homepage">Soma FontFriend</a></div>  <div id="typo-clear" title="clear all styles">S</div>  </div>';

// check if it's already been added. saves against weirdness if clicked again.
if (jQuery('#font-friend').size() == 0 ) {
	
	jQuery("head").append('<style type="text/css" media="screen">'+fontFriendCss+'</style>');
	jQuery("body").append("<div id='font-friend'></div>");
	jQuery("#font-friend").html(fontFriendHtml).addClass("open");
	jQuery("#typo-credit").append("<span> "+fontFriendVersion+"</span>");
	
	// open and close animations
	jQuery("#typo-toggle").click(function() {
		if (jQuery("#font-friend").hasClass("open")) {
			//close it
			jQuery("#font-friend").animate({height:16, width:16},100);
		} else {
			//open it
			jQuery("#font-friend").animate({height:280, width:600},100);
		}
		jQuery("#font-friend").toggleClass("open");
	});

	// the main attraction: change that font
	jQuery("#typo-drop ul li").click(function() {

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
		if (jQuery(this).attr("value") == jQuery(this).attr("rel") ) {
			jQuery(this).removeAttr("value");
		} else {
			jQuery(this).select();
		}
		
	});
	
	// clear all inline styles -> might crash large pages!
	jQuery("#typo-clear").click(function() {
		jQuery("*").removeAttr("style");
	});
	
	
} else {
	// if they've clicked on the bookmarklet a second time, assume they want to open it
	jQuery("#font-friend").animate({height:280, width:600},100).addClass("open");
		
}
	
