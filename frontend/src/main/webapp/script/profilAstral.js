let animalTotem = 'chien'; 
let sgnZodiaque = "poisson"; 
let couleurPref = "rouge"; 
let sngChinois= "jsp"; 


$('#animal-totem').html(animalTotem); 
$('#sgn-zodiaque').html(sgnZodiaque); 
$('#couleur-pref').html(couleurPref); 
$('#sgn-chinois').html(sngChinois); 


$( document ).ready(function() {

    $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'verification-connexion'

            },
            dataType: 'json'
        })
        .always( function () { // Fonction toujours appelée
    
        ////////////////////////////////////////////////////////////////////////////////////////////////
        //réactions aux boutons Connecté:
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

        $('#bouton-liste-medium').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

            console.log("clic sur le bouton de liste mediums"); // LOG dans Console Javascript
            $('#notification').html("Liste Mediums..."); // Message pour le paragraphe de notification
            window.location.href = "./listeMediumClient.html"; 
        });

        $('#bouton-historique').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

            console.log("clic sur le bouton de l'historique"); // LOG dans Console Javascript
            $('#notification').html("Historique..."); // Message pour le paragraphe de notification
            //window.location.href = "./historique.html"; 
        }); 


        });

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //réactions aux boutons
    $('#bouton-accueil').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton du retour à l'accueil"); // LOG dans Console Javascript
        $('#notification').html("Accueil..."); // Message pour le paragraphe de notification
        window.location.href = "./index.html"; 
    });

    

  });


