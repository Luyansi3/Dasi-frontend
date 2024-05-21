var statutConnexion = true; 
let htmlBouton; 
let htmlMedium; 


$( document ).ready(function() {
    if (statutConnexion) //le client est connecté 
    {
        htmlBouton = '<button id="bouton-historique" class ="bouton-div-haut-droite">Voir historique</button> <button id="bouton-profil-astal" class ="bouton-div-haut-droite">Profil astral</button> <button id="bouton-deconnexion"class ="bouton-div-haut-droite">Log out</button> '; 



    }

    else 
    {
        htmlBouton = '<button id="bouton-connexion" class ="bouton-div-haut-droite">Connexion</button>'; 
    }    
    $('#placeBoutons').html(htmlBouton);

  });


