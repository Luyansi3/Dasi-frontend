$(document).ready( function () {
    $('#bouton-commentaires').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de Commantaires"); // LOG dans Console Javascript
        $('#notification').html("Commentaires..."); // Message pour le paragraphe de notification
        window.location.href = "./commentaires.html"; 
    });
});


$(document).ready( function () {
    $('#bouton-deconnexion').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de deconnexion"); // LOG dans Console Javascript
        $('#notification').html("Deconnexion..."); // Message pour le paragraphe de notification

        //aller à la page d'acccueil'
        window.location.href = "./index.html"; 
    });
});