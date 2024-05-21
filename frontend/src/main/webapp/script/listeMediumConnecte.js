
$(document).ready( function () {
    $('#bouton').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de sélection "); // LOG dans Console Javascript
        $('#notification').html("Sélection d'un médium..."); // Message pour le paragraphe de notification

        //aller à la page de connexion
        window.location.href = "./index.html"; 
    });


    $('#bouton-deconnexion').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de deconnexion"); // LOG dans Console Javascript
        $('#notification').html("Deconnexion..."); // Message pour le paragraphe de notification

        //aller à la page de connexion
        window.location.href = "./index.html"; 
    });

    $('#bouton-profil-astal').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de profil astral"); // LOG dans Console Javascript
        $('#notification').html("Profil astral..."); // Message pour le paragraphe de notification

        //aller à la page de connexion
        //window.location.href = "./profilAstral.html"; 
    });

    $('#bouton-historique').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de l'historique"); // LOG dans Console Javascript
        $('#notification').html("Historique..."); // Message pour le paragraphe de notification

        //aller à la page de connexion
        //window.location.href = "./historique.html"; 
    });

    $('bouton-liste-medium').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de la liste des medium"); // LOG dans Console Javascript
        $('#notification').html("Liste des Medium..."); // Message pour le paragraphe de notification

        //aller à la page de connexion
        //window.location.href = "./listeMedium.html"; 
    });
});