<section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
	<div class="content">
		<h1>Mon [ blog ].</h1>
		<p class="major">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur porta tellus, quis auctor ante pulvinar non. Quisque aliquet lacus posuere purus vestibulum, eget rutrum turpis scelerisque.</p>
		<ul class="actions stacked">
			<li><a href="#first" class="button big wide smooth-scroll-middle">Consulter mes articles</a></li>
		</ul>
	</div>
	<div class="image">
		<img src="images/banner.jpg" alt="" />
	</div>
</section>

<?php 
    // Récupération des articles (fonction définie ailleurs)
    $_articles = getArticlesFromJson();

    if ($_articles && count($_articles)) {
        // Utiliser un index pour gérer l'orientation et l'id du premier élément
        $index = 0;
        foreach ($_articles as $article) {
            $index++;
            // alterne entre 'left' et 'right'
            $classCss = ($index % 2 === 0) ? 'left' : 'right';
            // n'ajoute l'id "first" que pour le premier élément (bouton de la bannière)
            $idAttr = ($index === 1) ? ' id="first"' : '';

            // Protection basique contre XSS en échappant les sorties
            $titre = htmlspecialchars($article['titre'] ?? '', ENT_QUOTES, 'UTF-8');
            $texte = htmlspecialchars($article['texte'] ?? '', ENT_QUOTES, 'UTF-8');
            $image = htmlspecialchars($article['image'] ?? 'images/placeholder.png', ENT_QUOTES, 'UTF-8');
            $id = (int)($article['id'] ?? 0);
            ?>
                <section class="spotlight style1 orient-<?php echo $classCss;?> content-align-left image-position-center onscroll-image-fade-in"<?php echo $idAttr; ?>>
                    <div class="content">
                        <h2><?php echo $titre; // titre de l'article ?></h2>
                        <p><?php echo $texte; // extrait / texte court ?></p>
                        <ul class="actions stacked">
                            <li><a href="?page=article&id=<?php echo $id; ?>" class="button">Lire la suite</a></li>
                        </ul>
                    </div>
                    <div class="image">
                        <img src="<?php echo $image; ?>" alt="<?php echo $titre; ?>" />
                    </div>
                </section>

            <?php
        }
    }
?>