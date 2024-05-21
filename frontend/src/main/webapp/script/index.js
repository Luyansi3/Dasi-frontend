$(document).ready( function () {
    $('#bouton-connexion').on( 'click', function () { // Fonction appelée lors du clic sur le bouton


        //aller à la page de connexion
        window.location.href = "./login.html"; 
    });
    
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'voirMedium'
        },
        dataType: 'json'
    })


    $('#bouton-liste-medium').on( 'click', function () { // Fonction appelée lors du clic sur le bouton


        //aller à la page de connexion
        window.location.href = "./listeMediumConnecte.html"; 
    });
});