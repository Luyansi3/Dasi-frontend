
let htmlBouton; 
let htmlMedium; 
let statutPossibleConsultation = false;
let htmlConsult; 
var statutConnexion;


function selectionMedium(){
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //selection du médium
 
    $.ajax({
        url: './ActionServlet',
            method: 'POST',
            data: {
            todo: 'ajouter-consultation',
            medium: this.getAttribute('id')

            },
            dataType: 'json'
    })
    .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
        if(response.trouve){
            window.location.href = "./index.html?attConfirmation=true";   
        }
        else{
            htmlConsult = '<div class="alert"> <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> Aucune consultation disponible pour le moment ou vous êtes deja en consultation </div>';
            $('#consultation').html(htmlConsult);
        }
        })
    .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
    console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
    })
    .always(function () {

    });

    
    
}
    

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
            statutConnexion = response.connecte;
            if (statutConnexion) //le client est connecté 
            {
                htmlBouton = '<button id="bouton-historique">Voir historique</button> <button id="bouton-profil-astal">Profil astral</button> <button id="bouton-deconnexion">Log out</button> '; 
               
            }
            else 
            {
                htmlBouton = '<button id="bouton-connexion" class ="bouton-div-haut-droite">Connexion</button>'; 
                
            }    
            $('#placeBoutons').html(htmlBouton);
            
            
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
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

        $('#bouton-profil-astal').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

            console.log("clic sur le bouton de profil astral"); // LOG dans Console Javascript
            $('#notification').html("Profil astral..."); // Message pour le paragraphe de notification
            window.location.href = "./profilAstral.html"; 
        });

        $('#bouton-historique').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

            console.log("clic sur le bouton de l'historique"); // LOG dans Console Javascript
            $('#notification').html("Historique..."); // Message pour le paragraphe de notification
            //window.location.href = "./historique.html"; 
        }); 

        ////////////////////////////////////////////////////////////////////////////////////////////////
        //réactions aux boutons Deonnecté:
        $('#bouton-connexion').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

            console.log("clic sur le bouton de Connexion"); // LOG dans Console Javascript
            $('#notification').html("Boutononnexion..."); // Message pour le paragraphe de notification
            window.location.href = "./login.html"; 

        });
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //Affichage des mediums
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
                    console.log(bouton);
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

        });
        
        
    
        
        
    
    

    






    ////////////////////////////////////////////////////////////////////////////////////////////////
    //réactions aux boutons
    $('#bouton-accueil').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton du retour à l'accueil"); // LOG dans Console Javascript
        $('#notification').html("Accueil..."); // Message pour le paragraphe de notification
        window.location.href = "./index.html"; 
    });

    

  });


