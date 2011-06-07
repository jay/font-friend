<?php

$version = '3.2';

header('Content-type: text/plain');

$cwd = getcwd() . '/';
$yui = $cwd.'yuicompressor-2.4.5.jar';
$cssfile = $cwd.'font-friend.css';
$fullfile = $cwd.'font-friend-full.js';
$targetfile = $cwd.'font-friend.js';

$html = file_get_contents('font-friend.html');
$html = str_replace(array("\n","\r","\t"), '', $html);

exec( "java -jar {$yui} --type css --charset utf-8 {$cssfile}", $mini_css );
$css = implode("\n", $mini_css );

$js = file_get_contents('font-friend-dev.js');
$js = strtr($js, array(
	'%css%' => $css,
	'%html%' => $html,
	'%version%' => $version,
	'%current%' => date('y')
));

if ( file_put_contents($fullfile, $js ) ) {	
	passthru("java -jar {$yui} {$fullfile} -o {$targetfile} --line-break 4000 --charset utf-8", $result);
	echo ( ! $result ) ? "FontFriend {$version} minified & built" : "build fail";
}
else {
	echo "build fail";
}
