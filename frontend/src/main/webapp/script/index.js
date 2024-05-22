var statutConnexion = false; 
var attConfirmation = true; 
let htmlBouton; 
let htmlMedium; 
let htmlConsult; 


$( document ).ready(function() {
    if (statutConnexion) //le client est connecté 
    {
        htmlBouton = '<button id="bouton-historique" class ="bouton-div-haut-droite">Voir historique</button> <button id="bouton-profil-astal" class ="bouton-div-haut-droite">Profil astral</button> <button id="bouton-deconnexion" class ="bouton-div-haut-droite" >Log out</button>'; 
    }

    else 
    {
        htmlBouton = '<button id="bouton-connexion" class ="bouton-div-haut-droite">Connexion</button>'; 
        htmlMedium = '<tr><th> un nom </th></tr> <tr><th> un autre nom </th></tr>'; 
    }    
    $('#placeBoutons').html(htmlBouton);
    htmlMedium = '<th> un nom </th><th> un autre nom </th>';  // à générer en js : même liste pour les 2 status
    $('#tabMedium').html(htmlMedium); 


    if (attConfirmation)
    {
        htmlConsult = '<div class="alert"> <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> Votre consultation est en attente de confirmation !</div>';
        $('#consultation').html(htmConsult);
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////
    //réactions aux boutons
    $('#bouton-liste-medium').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de la liste des medium"); // LOG dans Console Javascript
        $('#notification').html("Liste des Medium..."); // Message pour le paragraphe de notification
        window.location.href = "./listeMediumClient.html"; 
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //réactions aux boutons Connecté:
    $('#bouton-deconnexion').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de deconnexion"); // LOG dans Console Javascript
        $('#notification').html("Deconnexion..."); // Message pour le paragraphe de notification
        window.location.href = "./index.html"; 
    });

    $('#bouton-profil-astal').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de profil astral"); // LOG dans Console Javascript
        $('#notification').html("Profil astral..."); // Message pour le paragraphe de notification
        //window.location.href = "./profilAstral.html"; 
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
        $('#notification').html("Bouton connexion..."); // Message pour le paragraphe de notification
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
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always( function () { // Fonction toujours appelée

        });
});