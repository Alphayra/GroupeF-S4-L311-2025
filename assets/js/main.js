/*
    Story by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

/* 
    Commentaires ajoutés : j'ai ajouté des commentaires en français pour expliquer
    les différentes sections du fichier (points de rupture, animations initiales,
    corrections pour navigateurs, galerie et lightbox, etc.).
*/

(function($) {

    var	$window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper');

    // Breakpoints : définition des tailles d'écran utilisées pour l'adaptation responsive.
    breakpoints({
        xlarge:   [ '1281px',  '1680px' ],
        large:    [ '981px',   '1280px' ],
        medium:   [ '737px',   '980px'  ],
        small:    [ '481px',   '736px'  ],
        xsmall:   [ '361px',   '480px'  ],
        xxsmall:  [ null,      '360px'  ]
    });

    // Play initial animations on page load.
    // Retire la classe 'is-preload' après un court délai pour lancer les animations CSS.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Browser fixes.

        // IE: Flexbox min-height bug.
        // Correction spécifique pour Internet Explorer qui gère mal les hauteurs en flexbox.
        if (browser.name == 'ie')
            (function() {

                var flexboxFixTimeoutId;

                $window.on('resize.flexbox-fix', function() {

                    var $x = $('.fullscreen');

                    clearTimeout(flexboxFixTimeoutId);

                    flexboxFixTimeoutId = setTimeout(function() {

                        // Si le contenu dépasse la hauteur de la fenêtre, on passe en auto pour éviter le débordement.
                        if ($x.prop('scrollHeight') > $window.height())
                            $x.css('height', 'auto');
                        else
                            $x.css('height', '100vh');

                    }, 250);

                }).triggerHandler('resize.flexbox-fix');

            })();

        // Object fit workaround.
        // Remplace les <img> par un background-image pour les navigateurs qui ne supportent pas object-fit.
        if (!browser.canUse('object-fit'))
            (function() {

                $('.banner .image, .spotlight .image').each(function() {

                    var $this = $(this),
                        $img = $this.children('img'),
                        positionClass = $this.parent().attr('class').match(/image-position-([a-z]+)/);

                    // Set image en tant que background pour simuler object-fit: cover.
                    $this
                        .css('background-image', 'url("' + $img.attr('src') + '")')
                        .css('background-repeat', 'no-repeat')
                        .css('background-size', 'cover');

                    // Détermine la position du background (left/center/right) si indiquée par une classe parente.
                    switch (positionClass.length > 1 ? positionClass[1] : '') {

                        case 'left':
                            $this.css('background-position', 'left');
                            break;

                        case 'right':
                            $this.css('background-position', 'right');
                            break;

                        default:
                        case 'center':
                            $this.css('background-position', 'center');
                            break;

                    }

                    // Masque l'image d'origine (on ne la supprime pas pour garder le DOM intact).
                    $img.css('opacity', '0');

                });

            })();

    // Smooth scroll : applique le plugin scrolly aux liens qui demandent un scroll fluide.
    $('.smooth-scroll').scrolly();
    $('.smooth-scroll-middle').scrolly({ anchor: 'middle' });

    // Wrapper : gère l'apparition/disparition des sections au scroll via scrollex.
    $wrapper.children()
        .scrollex({
            top:		'30vh',    // déclenchement en haut
            bottom:		'30vh',    // déclenchement en bas
            initialize:	function() {
                $(this).addClass('is-inactive'); // état initial
            },
            terminate:	function() {
                $(this).removeClass('is-inactive'); // nettoie si scrollex est supprimé
            },
            enter:		function() {
                $(this).removeClass('is-inactive'); // section visible
            },
            leave:		function() {

                var $this = $(this);

                // Si la section est bidirectionnelle, on la ré-inactive en sortie.
                if ($this.hasClass('onscroll-bidirectional'))
                    $this.addClass('is-inactive');

            }
        });

    // Items : même logique que pour wrapper mais pour les containers .items
    $('.items')
        .scrollex({
            top:		'30vh',
            bottom:		'30vh',
            delay:		50,
            initialize:	function() {
                $(this).addClass('is-inactive');
            },
            terminate:	function() {
                $(this).removeClass('is-inactive');
            },
            enter:		function() {
                $(this).removeClass('is-inactive');
            },
            leave:		function() {

                var $this = $(this);

                if ($this.hasClass('onscroll-bidirectional'))
                    $this.addClass('is-inactive');

            }
        })
        .children()
            .wrapInner('<div class="inner"></div>'); // enveloppe interne pour faciliter les animations

    // Gallery : préparation des galeries (scroll horizontal, flèches, etc.).
    $('.gallery')
        .wrapInner('<div class="inner"></div>')
        .prepend(browser.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
        .scrollex({
            top:		'30vh',
            bottom:		'30vh',
            delay:		50,
            initialize:	function() {
                $(this).addClass('is-inactive');
            },
            terminate:	function() {
                $(this).removeClass('is-inactive');
            },
            enter:		function() {
                $(this).removeClass('is-inactive');
            },
            leave:		function() {

                var $this = $(this);

                if ($this.hasClass('onscroll-bidirectional'))
                    $this.addClass('is-inactive');

            }
        })
        .children('.inner')
            // Définit le scroll en Y/X selon le device : mobile scroll horizontal visible, desktop caché.
            .css('overflow-y', browser.mobile ? 'visible' : 'hidden')
            .css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
            .scrollLeft(0);

        // Style #1.
            // ...

        // Style #2.
        // Gère le scroll horizontal au wheel et le comportement des boutons forward/backward.
        $('.gallery')
            .on('wheel', '.inner', function(event) {

                var	$this = $(this),
                    delta = (event.originalEvent.deltaX * 10);

                // Cap delta pour éviter des sauts trop importants.
                if (delta > 0)
                    delta = Math.min(25, delta);
                else if (delta < 0)
                    delta = Math.max(-25, delta);

                // Scroll horizontal.
                $this.scrollLeft( $this.scrollLeft() + delta );

            })
            .on('mouseenter', '.forward, .backward', function(event) {

                var $this = $(this),
                    $inner = $this.siblings('.inner'),
                    direction = ($this.hasClass('forward') ? 1 : -1);

                // Clear move interval s'il existait.
                clearInterval(this._gallery_moveIntervalId);

                // Démarre un interval pour un scroll continu tant que la souris reste sur la flèche.
                this._gallery_moveIntervalId = setInterval(function() {
                    $inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
                }, 10);

            })
            .on('mouseleave', '.forward, .backward', function(event) {

                // Stoppe le scroll continu quand la souris quitte la flèche.
                clearInterval(this._gallery_moveIntervalId);

            });

        // Lightbox : affiche les images/vidéos dans une modal.
        $('.gallery.lightbox')
            .on('click', 'a', function(event) {

                var $a = $(this),
                    $gallery = $a.parents('.gallery'),
                    $modal = $gallery.children('.modal'),
                    $modalImg = $modal.find('img'),
                    href = $a.attr('href');

                // Si ce n'est pas une image/vidéo supportée, on quitte.
                if (!href.match(/\.(jpg|gif|png|mp4)$/))
                    return;

                // Prevent default et évite la propagation.
                event.preventDefault();
                event.stopPropagation();

                // Si modal verrouillée (animation en cours), ne rien faire.
                if ($modal[0]._locked)
                    return;

                // Lock pour éviter ré-entrées.
                $modal[0]._locked = true;

                // Définit la source de l'image dans la modal.
                $modalImg.attr('src', href);

                // Rend la modal visible.
                $modal.addClass('visible');

                // Donne le focus à la modal pour capter les événements clavier.
                $modal.focus();

                // Déverrouille après une courte attente (durée d'animation).
                setTimeout(function() {
                    $modal[0]._locked = false;
                }, 600);

            })
            .on('click', '.modal', function(event) {

                var $modal = $(this),
                    $modalImg = $modal.find('img');

                // Si déjà verrouillé ou non visible, on quitte.
                if ($modal[0]._locked)
                    return;

                if (!$modal.hasClass('visible'))
                    return;

                // Lock pendant la fermeture.
                $modal[0]._locked = true;

                // Enlève la classe 'loaded' puis cache la modal après délais pour laisser l'animation se faire.
                $modal
                    .removeClass('loaded')

                setTimeout(function() {

                    $modal
                        .removeClass('visible')

                    setTimeout(function() {

                        // Vide la source pour libérer la mémoire.
                        $modalImg.attr('src', '');

                        // Déverrouille et retourne le focus au body.
                        $modal[0]._locked = false;
                        $body.focus();

                    }, 475);

                }, 125);

            })
            .on('keypress', '.modal', function(event) {

                var $modal = $(this);

                // Touche Échap => ferme la modal.
                if (event.keyCode == 27)
                    $modal.trigger('click');

            })
            // Ajoute la structure HTML de la modal (si elle n'existe pas déjà).
            .prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
                .find('img')
                    .on('load', function(event) {

                        var $modalImg = $(this),
                            $modal = $modalImg.parents('.modal');

                        // Après le chargement, ajoute la classe 'loaded' pour déclencher les styles/animations.
                        setTimeout(function() {

                            // Si la modal n'est plus visible, on n'ajoute pas la classe.
                            if (!$modal.hasClass('visible'))
                                return;

                            $modal.addClass('loaded');

                        }, 275);

                    });

})(jQuery);