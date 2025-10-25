<!-- Footer -->
<footer class="wrapper style1 align-center">
	<div class="inner">    
		<p>Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
	</div>
</footer>

<!-- Sticky -->
<span class="sticky">
	<?php // Affiche un bouton de connexion ou déconnexion selon l'état de session
	if (!isConnected()): ?>
		<a class="button fit" href="?page=login" title="Se connecter à l'administration du blog">
			<span class="logo icon fa-arrow-alt-circle-right" aria-hidden="true"></span> Se connecter
		</a>
	<?php else: ?>
		<a class="button fit" href="?page=disconnect" title="Se déconnecter de l'administration du blog">
			<span class="logo icon fa-arrow-alt-circle-right" aria-hidden="true"></span> Se déconnecter
		</a>
	<?php endif; ?>
</span>
