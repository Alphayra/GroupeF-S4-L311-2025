<?php
// Inclusion du fichier contenant les fonctions principales du site
include 'inc/inc.functions.php';
$filePath = 'inc/inc.functions.php';
?>
<!--
	Story by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
		<title>Story by HTML5 UP</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<?php
		// Inclusion des fichiers CSS globaux du site
		error_log("Inclusion du fichier CSS : inc/inc.css.php");
		include 'inc/inc.css.php'; ?>
	</head>
	<body class="is-preload">

		<!-- Wrapper -->
			<div id="wrapper" class="divided">
				<?php 
				// Appel de la fonction qui charge la page demandée dynamiquement.
					getPageTemplate(
						array_key_exists('page', $_GET) ? $_GET['page'] : null
					); 
				?>
				<?php
				// Inclusion du pied de page (footer)
				include 'inc/tpl-footer.php'; ?>
			</div>

		<?php 
		// Inclusion des scripts JavaScript globaux
		include 'inc/inc.js.php'; ?>

	</body>
</html>