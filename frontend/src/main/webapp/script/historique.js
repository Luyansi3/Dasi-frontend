
let htmlBouton; 
let htmlMedium; 
let statutPossibleConsultation = false;
let htmlConsult; 


    

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
                todo: 'voir-consultation'

            },
            dataType: 'json'
        })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            
            
            if(response.nbConsultation){

                for(let key in response.consultations){
                    var consultation = response.consultations[key];
                    htmlMedium = '<tr><th>' + 'Le ' + consultation.date  + '<p> Medium selectionne : ' + consultation.nomMedium +
                                                                          '<br> Type : ' + consultation.typeMedium + 
                                                                          '<br>Genre : ' + (consultation.genreMedium ? "Femme" : "Homme")
                                                                          + '</p></th></tr>';

                }
                $('#tabHistorique').html(htmlMedium);
            }
            else{
                 htmlConsult = '<div class="alert"> <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> Aucune consultation effectuée </div>';
                 $('#historique').html(htmlConsult);
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


