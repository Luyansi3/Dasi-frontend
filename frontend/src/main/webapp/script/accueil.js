var statutConnexion = false; 
let htmlBouton; 
let htmlMedium; 


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
        window.location.href = "./accueil.html"; 
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
});