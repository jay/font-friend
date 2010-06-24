<?php
$credits = 
'/*
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
';

$version = '2.3';
$credits = str_replace('%version%', $version, $credits);


$cwd = getcwd();
$yui = $cwd.'/yuicompressor-2.4.2.jar';
$fullfile = $cwd.'/font-friend-full.js';
$targetfile = $cwd.'/font-friend.js';

$html = file_get_contents('font-friend.html');
$html = str_replace(array("\n","\r","\t"), '', $html);

$css = file_get_contents('font-friend.css');
$css = str_replace(array("\n","\r","\t",), '', $css);
$css = str_replace(array(' {', ' > ', '; ', ', '), array('{', '>', ';', ','), $css );

$js = file_get_contents('font-friend-dev.js');
$js = str_replace('%css%', $css, $js);
$js = str_replace('%html%', $html, $js);
$js = str_replace('%version%', $version, $js);

if ( file_put_contents($fullfile, $js ) ) {
	
	passthru("java -jar {$yui} {$fullfile} -o {$targetfile} --charset utf-8", $result);
	echo ( ! $result) ? "FontFriend {$version} built" : "build fail";
	
	$minjs = file_get_contents($targetfile);
	$minjs = $credits . $minjs;
	
	if (file_put_contents($targetfile, $minjs) ) {
		echo "<br />Credits successfully re-added to minified js";
	}
	
}
