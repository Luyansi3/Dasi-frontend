var statutConsultation= true; 
let htmlConsulation; 


$( document ).ready(function() {
    if (statutConsultation) //demande de consultation
    {
        htmlConsultation = '<p> DEMANDE DE CONSULTATION </p>'; 
        $('#consultation').html(htmlConsulation);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //réactions aux boutons
    $('#bouton-deconnexion').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton de deconnexion"); // LOG dans Console Javascript
        $('#notification').html("Deconnexion..."); // Message pour le paragraphe de notification
        window.location.href = "./index.html"; 
    });

    $('#bouton-commentaires').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton de commentaires"); // LOG dans Console Javascript
        $('#notification').html("Accès aux commentaires..."); // Message pour le paragraphe de notification
        //window.location.href = "./commentaires.html"; 
    });
}); 
