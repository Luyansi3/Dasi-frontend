
let htmlBouton; 
let htmlMedium; 
let statutPossibleConsultation = false;
let htmlConsult; 
var statutConnexion;

    

$( document ).ready(function() {
    
    
       
       
    $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'verification-connexion'

            },
            dataType: 'json'
        })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            
            
            
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always( function () { // Fonction toujours appelée
        });
        
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

        $('#bouton-profil-astal').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

            console.log("clic sur le bouton de profil astral"); // LOG dans Console Javascript
            $('#notification').html("Profil astral..."); // Message pour le paragraphe de notification
            window.location.href = "./profilAstral.html"; 
        });

        $('#bouton-liste-medium').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

            console.log("clic sur le bouton de l'historique"); // LOG dans Console Javascript
            $('#notification').html("Historique..."); // Message pour le paragraphe de notification
            window.location.href = "./listeMediumClient.html"; 
        }); 
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //Affichage des consultations
        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'voirMedium'

            },
            dataType: 'json'
        })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            
            if (statutConnexion) //le client est connecté 
            {
                
                htmlMedium = '';
                for(let key in response.mediums){

                    htmlMedium += '<tr><th>' + response.mediums[key].denomination + '<button id="' + response.mediums[key].denomination + '"> Selectionner </button> </th></tr>';

                }
                $('#tabMedium').html(htmlMedium);
                for(let key in response.mediums){
                    
                    bouton = document.getElementById(response.mediums[key].denomination);
                    bouton.addEventListener('click', selectionMedium);
                }
                    
            }
            else 
            {
                htmlMedium = '<tr><th> un nom </th></tr> <tr><th> un autre nom </th></tr>'; 
                $('#tabMedium').html(htmlMedium);
            }
             
            
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always( function () { // Fonction toujours appelée
            
            


        });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //réactions aux boutons
    $('#bouton-accueil').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton du retour à l'accueil"); // LOG dans Console Javascript
        $('#notification').html("Accueil..."); // Message pour le paragraphe de notification
        window.location.href = "./index.html"; 
    });

    

  });


