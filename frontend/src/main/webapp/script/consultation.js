let client ="Lucas Sanchez"; 
let animalTotem = ''; 
let sgnZodiaque = ""; 
let couleurPref = ""; 
let sgnChinois= ""; 

$('#client').html(client);



$( document ).ready(function() {




    ////////////////////////////////////////////////////////////////////////////////////////////////
    //réactions aux boutons
    $('#bouton-deconnexion').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de deconnexion"); // LOG dans Console Javascript
        $('#notification').html("Deconnexion..."); // Message pour le paragraphe de notification


        $.ajax({
            url: './ActionServlet',
                method: 'POST',
                data: {
                todo: 'deconnexion'

                },
                dataType: 'json'
        })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            window.location.href = "./index.html";
            })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () {
    });


    });

    $('#bouton-commentaires').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton de commentaires"); // LOG dans Console Javascript
        $('#notification').html("Accès aux commentaires..."); // Message pour le paragraphe de notification
        //window.location.href = "./commentaires.html"; 
    });
}); 
