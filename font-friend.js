/*!
 * Soma FontFriend 3.2.1
 * http://somadesign.ca/projects/fontfriend
 *
 * Copyright (c) 2009-12 Matt Wiebe
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Uses some code (c) 2009-10 Ryan Seddon from
 * http://labs.thecssninja.com/font_dragr/
 * Licensed under the MIT license
 *
*/
(function(A,f){var r,m,x,n="undefined",y={version:"3.2.1",css:"#font-friend{overflow:hidden;position:fixed;bottom:0;left:30px;background-color:#fff;background-color:rgba(255,255,255,0.93);width:740px;color:#222;-webkit-box-shadow:1px 1px 5px rgba(0,0,0,.3);-moz-box-shadow:1px 1px 5px rgba(0,0,0,.3);box-shadow:1px 1px 5px rgba(0,0,0,.3);z-index:10000;text-align:left;height:310px}#font-friend,#ff-drop h6,#ff-drop li{line-height:1.5!important}#ff-drop{padding:12px 12px 12px 36px}#ff-toggle{background-color:#222;color:#eee;display:block;width:12px;height:16px;padding:0 1px 0 3px;position:absolute;top:0;left:0;font-size:16px;line-height:1!important;cursor:pointer;z-index:10001;-moz-transition:.25s all ease-in-out;-webkit-transition:.25s all ease-in-out;-o-transition:.25s all ease-in-out;transition:.25s all ease-in-out}#ff-toggle sup{font-size:13px;line-height:1!important;vertical-align:super;display:none}.open #ff-toggle sup{display:inline}#ff-toggle:hover{color:#fff;background-color:#555}.open #ff-toggle{width:auto;height:32px;font-size:32px;padding:0 3px}#ff-drop form{background:0;color:inherit;float:none}#ff-drop h6{font-size:13px;border-bottom:1px solid #aaa;margin:0 0 6px!important;padding:0!important;text-indent:0!important;float:none!important;height:1.5em!important;white-space:nowrap}#ff-drop>div{float:left;width:120px;padding-right:20px;margin:0!important;position:relative}#ff-drop>div.wrap>div{margin-bottom:12px;font-size:11px!important;position:relative}#ff-drop div#ff-selector{width:130px}#ff-drop div#ff-font-family{width:240px}#ff-selector p{font-size:9px!important;line-height:1.2!important;margin:1em 0 0!important;padding:0!important}#ff-controls{position:absolute!important;bottom:60px;left:65px;width:55px!important;height:60px;margin:0!important;padding:0!important}#ff-controls div{position:absolute;font-size:20px;width:1em;height:1em;color:#555;min-width:inherit!important;min-height:inherit!important;padding:0;margin:0;float:none;text-align:center}#ff-controls>div,.ff-toggler>span,#family-custom-add{font-family:sans-serif!important;font-weight:normal!important;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer}#ff-controls div:hover{color:#000}#ff-controls .up{left:1em;top:0}#ff-controls .down{left:1em;bottom:0}#ff-controls .left{left:0;top:1em}#ff-controls .right{right:-.25em;top:1em}#ff-drop #ff-font-family ul{float:left;width:110px;padding-right:5px}#ff-drop #ff-font-family ul#ff-font-family-sans{padding-right:10px;width:115px}#ff-drop ol li{list-style:none outside}#ff-drop ol,#ff-drop ul{margin:0;padding:0}#ff-drop li{font-size:11px!important; margin:0!important;padding:0!important;list-style:none outside none!important;text-indent:0!important;height:auto!important}#ff-drop li.core{margin-bottom:4px!important;padding:0!important}#ff-drop ul li:hover{cursor:pointer;background-color:#e6e6e6!important}#ff-drop ul li.family-custom{margin:12px 0 0!important}#ff-drop ul li.family-custom:hover{cursor:default;background:none!important}#family-custom-add{display:inline-block;color:#aaa;line-height:1!important;font-size:15px!important;color:#666!important;vertical-align:top;padding:1px 3px 3px}#family-custom-add:hover,#family-custom-add:focus{background-color:#555!important;color:#fff!important}#family-custom{width:85px}#ff-drop ol input[type=radio]{margin-left:-5px;width:auto!important}#ff-blah{width:100px;margin-left:5px}#ff-drop ol label{margin-left:5px;display:inline!important}#ff-drop>#ff-credit{position:absolute;bottom:21px;left:32px;font-size:9px;margin:0!important}#font-friend a{color:#4c0003!important;text-decoration:underline!important;border:0!important}#font-friend a:hover{color:#a60007!important}#ff-drop>#ff-clear{position:absolute;bottom:0;right:0;padding:5px 5px 0!important;text-decoration:line-through;opacity:.1;font-size:21px;margin:0!important;width:auto!important}#ff-clear:hover{opacity:1;cursor:pointer}#ff-font-drop{font-size:11px!important;background-color:#e6e6e6;padding:15px 0;text-align:center;border:1px solid #aaa;margin-bottom:6px}#ff-font-drop.dropzone{background-color:#fff;border-color:#111}#ff-drop select{width:105px!important;margin-left:15px!important}#ff-google-webfonts select{width:99%!important;margin:0!important}#ff-drop select option{font-size:10px!important}#ff-drop .ff-hidden{display:none}#ff-drop .ff-clickable{cursor:pointer;position:relative;z-index:2}#ff-font-family h6 span{text-transform:uppercase!important;font-size:75%;font-weight:normal!important;color:#111!important;letter-spacing:.02em;line-height:1;display:inline-block}#ff-font-family h6 .ff-active{color:#aaa!important}#ff-font-family .ff-custom{padding:0 6px;border-right:1px solid #bbb;margin-right:6px}#ff-badges{position:absolute;right:14px;top:0;z-index:14px}#ff-badges>img{padding:0 4px 0 0!important;margin:0!important;border:0!important;width:16px!important;height:16px!important}#ff-drop #ff-font-family #ff-font-family-custom{width:100%;-webkit-column-count:2;-moz-column-count:2;column-count:2;-webkit-column-gap:12px;-moz-column-gap:12px;column-gap:12px}.ff-toggler{position:absolute;height:20px;top:27px;left:-4px}.ff-toggler span{position:absolute;display:block;left:0;top:0;height:8px;width:8px;line-height:1!important;font-size:8px!important;text-align:center;color:#aaa!important;padding:2px 4px!important}.ff-toggler span:hover{color:#333!important}.ff-toggler span.ff-down{top:auto;bottom:0}#ff-drop [data-ff=fontFamily] li{height:1.5em!important;overflow:hidden;text-overflow:ellipsis}",html:'<div id="ff-drop"><span id="ff-toggle">F<sup>2</sup></span><div id="ff-selector"><h6>Selector</h6><form action="" method="get"><ol><li><input type="radio" name="jq-select" checked="checked" id="jq1"><label for="jq1">body</label></li><li><input type="radio" name="jq-select" id="jq2"><label for="jq2">h1,h2,h3,h4,h5,h6</label></li><li><input type="radio" name="jq-select" id="jq3"><label for="jq3">p</label></li><li><input type="radio" name="jq-select" id="jq4"><input type="text" name="ff-blah" value="roll your own" id="ff-blah"></li></ol></form><p>Roll your own selector using <a href="http://api.jquery.com/category/selectors/">jQuery selectors</a>.</p></div><div id="ff-font-family"><h6>Font Family</h6><div id="ff-badges"></div><ul id="ff-font-family-sans" data-ff="fontFamily"><li>Arial</li><li>Verdana</li><li>Tahoma</li><li class="core">Trebuchet MS</li><li>Helvetica</li><li>Helvetica Neue</li><li>Gill Sans</li><li>Century Gothic</li><li>Lucida Grande</li><li>Lucida Sans Unicode</li><li>Calibri</li><li>Corbel</li><li>Candara</li></ul><ul id="ff-font-family-serif" data-ff="fontFamily"><li>Times New Roman</li><li class="core">Georgia</li><li>Times</li><li>Palatino</li><li>Palatino Linotype</li><li>Baskerville</li><li>Hoefler Text</li><li>Garamond</li><li>Constantia</li><li>Cambria</li><li class="family-custom"><input type="text" name="family-custom" value="your font family" id="family-custom"><span id="family-custom-add">+</span></li></ul></div><div class="wrap"><div id="ff-google-webfonts"><h6>Google Web Fonts</h6><div>Loading…</div></div><div id="ff-font-size"><h6>Font Size</h6><select data-ff="fontSize"><option>10</option><option>11</option><option>12</option><option>14</option><option>16</option><option>18</option><option>21</option><option>24</option><option>36</option><option>48</option><option>60</option><option>72</option></select></div><div id="ff-font-weight"><h6>Font Weight</h6><select data-ff="fontWeight"><option>100</option><option>200</option><option>300</option><option value="400" selected>400 (normal)</option><option>500</option><option>600</option><option value="700">700 (bold)</option><option>800</option><option>900</option></select></div><div id="ff-line-height"><h6>Line Height</h6><select data-ff="lineHeight"><option>1</option><option>1.1</option><option>1.2</option><option>1.3</option><option>1.4</option><option selected>1.5</option><option>1.6</option><option>1.75</option><option>2</option><option>2.5</option><option>3</option></select></div><div id="ff-font-style"><h6>Font Style</h6><ul data-ff="fontStyle"><li>italic</li><li>normal</li></ul></div></div><div class="wrap"><div id="ff-font-face"><h6>@font-face</h6><div id="ff-font-drop">Drag a font here.</div><ul data-ff="fontFamily"></ul></div><div id="ff-text-transform"><h6>Text Transform</h6><ul data-ff="textTransform"><li>uppercase</li><li>lowercase</li><li>capitalize</li><li>none</li></ul></div><div id="ff-font-variant"><h6>Font Variant</h6><ul data-ff="fontVariant"><li>small-caps</li><li>normal</li></ul></div></div><div id="ff-controls"><div class="left">&larr;</div><div class="right">&rarr;</div><div class="up">&uarr;</div><div class="down">&darr;</div></div><div id="ff-credit"><a href="http://somadesign.ca/projects/fontfriend/" title="Soma FontFriend homepage">Soma FontFriend</a></div><div id="ff-clear" title="clear all styles">S</div></div>',customFamiles:false,customFamilyMap:[],googleFamilies:{},existingGoogleFamilies:[]};
function a(){if(typeof(A.jQuery)===n){var K=f.createElement("script");K.src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";f.getElementsByTagName("head")[0].appendChild(K);x=setInterval(E,100)}else{I()}}a();function E(){if(typeof(A.jQuery)!==n){clearInterval(x);I()}}function I(){r=A.jQuery;if(r("#font-friend").size()!==0){return false}m=r("body");r("head").append('<style id="font-friend-stylesheet" type="text/css" media="screen">'+y.css+"</style>");m.append("<div id='font-friend'></div>");r("#font-friend").html(y.html).addClass("open");r("#ff-credit").append("<span> "+y.version+"</span>");k();l();j();H();s();J();F()}function F(){var K="https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBUK3PeqSEzwPNIyg94dBQpziFOPvm7-aA",M=[],N=function(O){if(O.kind==="webfonts#webfontList"){r.each(O.items,function(P,Q){if(r.inArray(Q.family,y.existingGoogleFamilies)!==-1){Q.family="✓ "+Q.family}else{y.googleFamilies[Q.family]=Q.variants}M.push(Q.family)});w(M)}else{L()}},L=function(){r("#ff-google-webfonts > div").html("Error loading webfonts. :(");setTimeout(function(){r("#ff-google-webfonts").fadeOut()},3500)};r.ajax({url:K,type:"GET",dataType:"jsonp",success:N,error:L})}function w(L){var K=['<option value="0">Choose:</option>'],L;r.each(L,function(N,M){K.push("<option>"+M+"</option>")});L=r("<select>"+K.join("")+"</select>");L.change(i);r("#ff-google-webfonts > div").html(L)}function i(){var L=r(this),P=L.val(),K=P.replace(/ /g,"+"),N="http://fonts.googleapis.com/css?family=",O,M;if(P==="0"||!y.googleFamilies[P]){return}O=":"+y.googleFamilies[P].join(",");M=N+K+O;r('<link rel="stylesheet" type="text/css" href="'+M+'" >').appendTo("head");z([P],"www.google.com");L.find(":selected").text("✓ "+P);r("#ff-font-family-custom").find("li:last").click();delete y.googleFamilies[P]}function J(){D();t();C()}function D(){var K=f.styleSheets||[],L=[];r.each(K,function(M,O){try{r.each(O.cssRules,function(Q,R){if(R.type===CSSRule.FONT_FACE_RULE){var P=R.style.getPropertyValue("font-family");if(P){P=P.replace(/^"|'/,"").replace(/"|'$/,"");if(P!=="testfont"){L.push(P)}}}})}catch(N){}});if(L.length>0){z(d(L))}}function l(){if(typeof(fontFriendFamilies)!==n){y.customFamilies=fontFriendFamilies;if(!r.isArray(y.customFamilies)){var K=[];r.each(y.customFamilies,function(L,M){K.push(L)});y.customFamilies=K;y.customFamilyMap=fontFriendFamilies}}else{if(m.attr("data-ff-families")){y.customFamilies=m.attr("data-ff-families").split(",")}}}function s(){y.wfs=(A.location.href=="http://webfontspecimen.com/demo/");y.wfsName=(y.wfs)?r("h1, .bodysize tr:first-child th:first-child"):false;if(!y.wfs&&r("body").attr("id")=="soma-web-font-specimen"){y.wfs=true;y.wfsName=r("h1, .bodysize tr:first-child th.base")}if(y.wfs){y.wfsOriginalName=r("h1").text();y.wfsTitle=r("title").text()}}function j(){r("#font-friend").find("select").each(function(K){var L=r('<span class="ff-toggler"><span class="ff-up" title="Increase">&#9650;</span><span class="ff-down" title="Decrease">&#9660;</span></span>');L.insertBefore(this)});r(".ff-toggler span").click(o)}function o(L){var K=r(this),P=L.target.className=="ff-up",O=K.parent().next(),M=O.find(":selected"),N;N=(P)?M.next():M.prev();if(N.size()==0){N=(P)?O.find(":first"):O.find(":last")}N.attr("selected","selected");O.trigger("change")}function C(){var K=b(),M,L=[];if(!K){return}M=K.split("family=").pop();r.each(M.split("|"),function(O,N){L.push(N.split(":")[0].replace("+"," "))});if(L.length>0){z(L,"www.google.com");y.existingGoogleFamilies=L}}function b(){var K=false;r('link[href*="fonts.googleapis.com"]').each(function(){K=r(this).attr("href");return false});return K}function G(){var K=null;r("script").each(function(M){var L=this.src.match(/use\.typekit\.(com|net)\/(.+)\.js/);if(L){K=L.pop();return false}});return K}function t(){var K=G();if(!K){return false}r.getJSON("https://typekit.com/api/v1/json/kits/"+K+"/published?callback=?",function(L){if(!L.errors){var M=[];r.each(L.kit.families,function(N,O){y.customFamilyMap[O.name]=O.css_names.join(",");
M.push(O.name)});z(M,"typekit.com")}})}function c(K){var N="//"+K+"/favicon.ico",L=r("#ff-badges"),M=L.find("[src='"+N+"']");if(!M.length){r("<img />",{src:N}).appendTo(L)}}function z(Q,L){var K=r("#ff-font-family-custom"),O=r('<ul id="ff-font-family-custom" data-ff="fontFamily" class="ff-hidden"></ul>'),N="",M="Click to toggle between custom & stock font families",P=': <span class="ff-custom ff-active">Custom</span><span class="ff-stock">Stock</span>';r.each(Q,function(R,S){N+="<li>"+S+"</li>"});if(typeof(L)!==n){c(L)}if(K.size()===1){K.append(N);return H()}N=O.append(N);r("#ff-font-family").append(N);r("#ff-font-family > h6").addClass("ff-clickable").attr("title",M).append(P).click(function(){var S=r(this),V=S.hasClass("ff-custom")?true:false,Y=r("#ff-font-family-custom"),U=r("#ff-font-family-sans, #ff-font-family-serif"),V=!Y.is(":visible"),W=S.children(),X=100,T,R;if(V){T=U;R=Y}else{T=Y;R=U}W.toggleClass("ff-active");T.fadeOut(X,function(){R.fadeIn(X)})});H();r("#ff-font-family > h6").click()}if(y.customFamilies){z(y.customFamilies)}function B(K){if(!y.wfs){return false}if(!K){y.wfsName.text(y.wfsOriginalName);r("title").text(y.wfsTitle)}else{y.wfsName.text(K);r("title").text(y.wfsTitle.replace("Font name",K))}}function h(K){if(typeof(y.customFamilyMap[K])!==n){K=y.customFamilyMap[K]}return K+",monospace"}function H(){r("#ff-font-family li, #ff-font-face li").each(function(){var K=r(this);K.css("fontFamily",h(K.text()))});r("#ff-font-style li, #ff-text-transform li, #ff-font-variant li").each(function(){var L=r(this),K=L.parent().data("ff"),M=L.text();L.css(K,M)})}function p(M,L){var K=new FileReader();K.name=L;K.onloadend=function(N){u(N)};K.readAsDataURL(M)}function v(K){K=K.replace(/\..+$/,"").replace(/\W+/,"-").replace(/-|_/," ").replace(/^([a-z])|\s+([a-z])/g,function(L){return L.toUpperCase()});return q(K)}function q(K){return K.replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/,"$1 $2$3").replace(/^./,function(L){return L.toUpperCase()})}function g(K){var M=K.originalEvent.dataTransfer,L=M.files,R=L.length,N=/^.*\.(ttf|otf|woff)$/i;e(K);for(var Q=0;Q<R;Q++){var O=L[Q],P=O.name,S;if(P.match(N)){S=v(P);p(O,S)}else{alert("Invalid file extension. Will only accept ttf, otf, or woff font files")}}}function u(L){var K=L.target.name,M=L.target.result;var N=M.split("base64");if(N[0].indexOf("application/octet-stream")==-1){N[0]="data:application/octet-stream;base64";M=N[0]+N[1]}r("<style type='text/css'>@font-face{font-family: "+K+"; src:url("+M+");}</style> ").appendTo("head");z([K]);r("#ff-font-family-custom").find("li:last").click()}function e(K){K.stopPropagation();K.preventDefault()}function d(O){var K=O.length,N={},M=[],L;for(L=0;L<K;L+=1){N[O[L]]=O[L]}for(L in N){M.push(N[L])}return M}function k(){var K=r("#font-friend");y.width=K.outerWidth();y.height=K.outerHeight();r("#ff-toggle").toggle(function(){K.removeClass("open").animate({height:16,width:16},100)},function(){K.addClass("open").animate({height:y.height,width:y.width},100)});r("#ff-drop ul > li").live("click",function(){if(r(this).children("input").length){return false}var N=r(this),P=N.parent().attr("data-ff"),Q=N.text(),O=M();if(P=="fontFamily"){L(Q,O)}else{r(O).css(P,Q)}});function M(){var O=r("#ff-drop ol input:checked").next(),N=O.text()||O.val();return N}function L(O,N){N=N||M();B(O);O=h(O);r(N).css("fontFamily",O)}r("#ff-drop select").change(function(){var O=r(this).attr("data-ff"),P=parseFloat(r(this).find("option:selected").val()),N=M();r(N).css(O,P)});r("#ff-drop li.family-custom").unbind();r("#family-custom").keyup(function(O){var P=r("#family-custom").attr("value"),N=M();if(O.keyCode==13){r("#family-custom-add").click()}else{L(P,N)}e(O)});r("#ff-controls div").click(function(){if(r(this).hasClass("left")){r("#font-friend").css({left:30,right:"auto"})}if(r(this).hasClass("right")){r("#font-friend").css({right:30,left:"auto"})}if(r(this).hasClass("up")){r("#font-friend").css({top:0,bottom:"auto"})}if(r(this).hasClass("down")){r("#font-friend").css({bottom:0,top:"auto"})
}});r("#ff-blah, #family-custom").each(function(N){r(this).attr("data-ff",r(this).attr("value"))}).click(function(){r(this).prev().attr("checked","checked");if(r(this).attr("value")==r(this).attr("data-ff")){r(this).removeAttr("value")}else{r(this).select()}});r("#ff-clear").click(function(){r("*").not("[data-ff=fontFamily]").removeAttr("style");H();B()});r("#family-custom-add").click(function(){var N=r(this).prev(),O=N.val();if(O!=="your font family"&&O!==""){z([O]);N.val("").select()}});r("#ff-font-drop").bind("dragover",e).bind("dragenter dragleave",function(N){r(this).toggleClass("dropzone");e(N)}).bind("drop",g)}}(this,this.document));