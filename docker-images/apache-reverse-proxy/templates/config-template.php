<?php 
	$static_app = getenv('STATIC_APP');
	$dynamic_app = getenv('DYNAMIC_APP');
?>

<VirtualHost *:80>
	ServerName lab.res.ch

	ProxyPass '/api/states/' 'http://<?php print "$dynamic_app"?>/'
	ProxyPassReverse '/api/states/' 'http://<?php print "$dynamic_app"?>/'


	ProxyPass '/' 'http://<?php print "$static_app"?>/'
	ProxyPassReverse '/' 'http://<?php print "$static_app"?>/'
</VirtualHost>
