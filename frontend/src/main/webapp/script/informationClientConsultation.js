
let animalTotem = ''; 
let sgnZodiaque = ""; 
let couleurPref = ""; 
let sgnChinois= ""; 
let htmlConsultation; 





$( document ).ready(function() {

    
    $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'recherche-consultation'

            },
            dataType: 'json'
    })
    .done(function (response) {
        
        console.log(response);

        if (response.consultationEnAttente) //demande de consultation
        {
            
            let client = response.client.prenom + " " + response.client.nom;
            
            $('#client').html(client);
        }
       
        

    })
    .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
    console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
    })
    .always(function () {
       
    });

    

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
                htmlConsultation = "<div style='overflow : scroll ; border: #000000 1px solid; width: 300px; height: 300px;'> <table style='width: 300px;'>"; 
                let keys = Object.keys(response.consultations).reverse();
                console.log(keys); 
                for (let key of keys){
                   
                    var consultation = response.consultations[key];
                    htmlConsultation += ('<tr><th>' + 'Le ' + consultation.date  + '<p> Medium selectionne : ' + consultation.nomMedium +
                                                                          '<br> Type : ' + consultation.typeMedium + 
                                                                          '<br>Genre : ' + (consultation.genreMedium ? "Femme" : "Homme")
                                                                          + '<br>Commentaire : ' + consultation.commentaire 
                                                                          +'</p></th></tr>');
                                                                
                }
                htmlConsultation+='</table> </div>'; 
            }
            else{
                 htmlConsult = '<div class="alert"> <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> Aucune consultation effectuée </div>';
                 $('#historique').html(htmlConsult);
                 htmlConsultation = "<p>Aucune ancienne consultation</p>"; 
            }
            $('#tabHistorique').html(htmlConsultation);
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always( function () { // Fonction toujours appelée
           });
        
        
        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'voir-profil-astral'

            },
            dataType: 'json'
        })
        .done(function (response) {

            console.log(response);
    
            animalTotem = response.animal;
            sgnZodiaque = response.signeZodiaque;
            couleurPref = response.couleur;
            sgnChinois = response.signeChinois;



        })
        .always( function () {
            
            $('#animal-totem').html(animalTotem); 
            $('#sgn-zodiaque').html(sgnZodiaque); 
            $('#couleur-pref').html(couleurPref); 
            $('#sgn-chinois').html(sgnChinois); 
            
        });


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

    $('#bouton-consultationEnCours').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton de commentaires"); // LOG dans Console Javascript
        $('#notification').html("Accès aux commentaires..."); // Message pour le paragraphe de notification
        window.location.href = "./consultationEnCoursEmp.html"; 
    });
    $('#bouton-prediction').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton de commentaires"); // LOG dans Console Javascript
        $('#notification').html("Accès aux commentaires..."); // Message pour le paragraphe de notification
        window.location.href = "./prediction.html"; 
    });
    
    
}); 
