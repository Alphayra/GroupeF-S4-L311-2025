<?php
    session_start();

    define('TL_ROOT', dirname(__DIR__));
    define('LOGIN', 'UEL311');
    define('PASSWORD', 'U31311');
    define('DB_ARTICLES', TL_ROOT.'/db/articles.json');

    # Vérification de si l'utilisateur est connecté
    function connectUser($login = null, $password = null){
        if(!is_null($login) && !is_null($password)){
            if($login === LOGIN && $password === PASSWORD){
                #Si il est connecté avec les bons logins, retour d'un tableau avec login et password
                return array(
                    'login'    => LOGIN,
                    'password' => PASSWORD
                );
            }
        }
        return null;
    }

    #Déconnecte l'utilisateur
    function setDisconnectUser(){
         unset($_SESSION['User']);
         session_destroy();
    }

    #Vérifie si l'utilisateur est connecté en retournant "true" ou "false"
    function isConnected(){
        if(array_key_exists('User', $_SESSION) 
                && !is_null($_SESSION['User'])
                    && !empty($_SESSION['User'])){
            return true;
        }
        return false;
    }

    # Inclut le fichier de template là ou la fonction est appelé,
    # Si $page est nul, importe index.php par défaut à la place.
    function getPageTemplate($page = null){
        $fichier = TL_ROOT.'/pages/'.(is_null($page) ? 'index.php' : $page.'.php');

        if(!file_exists($fichier)){
            include TL_ROOT.'/pages/index.php';
        }else{
            include $fichier;
        }
    }

    # Récupère tout les articles depuis un fichier json,
    # Si le fichier existe, retourne ce dernier après l'avoir passé dans json_decode, sinon rien.
    function getArticlesFromJson(){
        if(file_exists(DB_ARTICLES)) {
            $contenu_json = file_get_contents(DB_ARTICLES);
            return json_decode($contenu_json, true);
        }

        return null;
    }

    # Vérifie l'existence d'un article et si c'est le cas, le renvoi par la fonction
    function getArticleById($id_article = null){
       if(file_exists(DB_ARTICLES)) {
            $contenu_json = file_get_contents(DB_ARTICLES);
            $_articles    = json_decode($contenu_json, true);

            foreach($_articles as $article){
                if($article['id'] == $id_article){
                    return $article;
                }
            }
        }

        return null;
    }
