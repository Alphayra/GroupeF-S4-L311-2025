<?php
    // Déconnecte l'utilisateur.
    // La fonction setDisconnectUser() doit effacer les informations de session / cookies
    // et effectuer tout nettoyage nécessaire (définie ailleurs dans l'application).
    setDisconnectUser();

    // Redirige vers la page d'accueil après la déconnexion.
    // Attention : header() doit être appelé avant tout envoi de contenu au navigateur.
    header('Location: index.php');
    exit; // Empêche l'exécution de code additionnel après la redirection
?>