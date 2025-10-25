<?php 
	$message = null;
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		// Log pour vérifier si le formulaire est bien envoyé via la méthode POST
		error_log("Méthode POST détectée");

		// vérification des champs login et password dans le tableau POST
	    if(array_key_exists('login', $_POST) && array_key_exists('password', $_POST)){

			// vérifier que les deux champs ne sont pas vide
	    	if(!empty($_POST['login']) && !empty($_POST['password'])){
	    		$_SESSION['User'] = connectUser($_POST['login'], $_POST['password']);
				error_log("Tentative de connexion avec le login ");

				// si la connexion réussi
	    		if(!is_null($_SESSION['User'])){

					// redirection vers la page d'accueil
	    			header("Location:index.php");
					error_log("Connexion réussie pour l'utilisateur $login");
	    		}else{
					// connexion échoué
					error_log("Échec de la connexion pour l'utilisateur ");
	    			$message = "Mauvais login ou mot de passe";
	    		}
	    	}
	    }
	}	
?>
<!-- Page de connexion de l'utilisateur -->
<section class="wrapper style1 align-center">
	<div class="inner">
		<div class="index align-left">
			<section>
				<header>
					<h3>Se connecter</h3>
					<a href="index.php" class="button big wide smooth-scroll-middle">Revenir à l'accueil</a>
				</header>
				<div class="content">

				    <!-- affiche message d'erreur -->
					<?php echo (!is_null($message) ? "<p>".$message."</p>" : '');?>

					<!-- Formulaire de connexion -->
					<form method="post" action="#">
						<div class="fields">
							<div class="field half">
								<label for="login">Nom d'utilisateur</label>
								<input type="text" name="login" id="login" value="" />
							</div>
							<div class="field half">
								<label for="password">Mot de passe</label>
								<input type="password" name="password" id="password" value="" />
							</div>
						</div>
						<ul class="actions">
							<li><input type="submit" name="submit" id="submit" value="Se connecter" /></li>
						</ul>
					</form>
				</div>
			</section>
		</div>
	</div>
</section>