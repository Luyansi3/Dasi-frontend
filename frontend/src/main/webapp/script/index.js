$(document).ready( function () {
    $('#bouton-connexion').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de connexion"); // LOG dans Console Javascript
        $('#notification').html("Connexion..."); // Message pour le paragraphe de notification

        //aller à la page de connexion
        window.location.href = "./login.html"; 
    });


    $('#bouton-liste-medium').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de connexion"); // LOG dans Console Javascript
        $('#notification').html("Connexion..."); // Message pour le paragraphe de notification

        //aller à la page de connexion
        window.location.href = "./listeMediumDeconnecte.html"; 
    });
});