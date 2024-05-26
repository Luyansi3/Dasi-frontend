
$( document ).ready(function() {

    $('#bouton-profilAstral').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton de profil astral et historique"); // LOG dans Console Javascript
        $('#notification').html("Accès au profil astral et historique ..."); // Message pour le paragraphe de notification
        window.location.href = "./informationClientConsultation.html"; 
    });

    $('#bouton-finConsultation').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton fin de consultation"); // LOG dans Console Javascript
        
        
        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo:'fin-consultation',
            },
            dataType: 'json'
        })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (response.finie) {
                
               $('#notification').html("fin de consultation ..."); // Message pour le paragraphe de notification
               window.location.href = "./accueilEmployeConnecte.html"; 
                // TODO: afficher les informations du client dans la notification
                // Exemple: Connexion de Ada Lovelace (ID 1)

            }
            else {
                $('#notification').html("commentaire pas enregistré "); // Message pour le paragraphe de notification
            }
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always( function () { // Fonction toujours appelée

        });
        
        
        
    });

    $('#bouton-prediction').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton acces aux prédictions"); // LOG dans Console Javascript
        $('#notification').html("aller prédictions ..."); // Message pour le paragraphe de notification
        window.location.href = "./prediction.html"; 
    });


    //nom client
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
    



    $('#bouton-validerCom').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton validation commentaire"); // LOG dans Console Javascript
        // Message pour le paragraphe de notification
       
        
        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo:'valider-commentaire',
                commentaire: $('#champ-commentaire').val()
            },
            dataType: 'json'
        })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (response.enregistre) {


                $('#notification').html("commentaire bien enregistré ");  // Message pour le paragraphe de notification
               
                // TODO: afficher les informations du client dans la notification
                // Exemple: Connexion de Ada Lovelace (ID 1)

            }
            else {
                $('#notification').html("commentaire pas enregistré "); // Message pour le paragraphe de notification
            }
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always( function () { // Fonction toujours appelée

        });
        
    });

    
       
}); 
