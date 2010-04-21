<?php

$version = '2.2';

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
}
