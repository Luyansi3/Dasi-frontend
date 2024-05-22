$(document).ready( function () {
    $('#bouton-accueil').on( 'click', function () { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton d'accueil'"); // LOG dans Console Javascript
        $('#notification').html("Retour Accueil..."); // Message pour le paragraphe de notification
        window.location.href = "./index.html"; 
    });



    $('#bouton-register').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton d'inscirption"); // LOG dans Console Javascript
        $('#notification').html("Insctiption..."); // Message pour le paragraphe de notification
        
        // Appel AJAX
        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'inscription',
                nom: $('#champ-nom').val(),
                prenom: $('#champ-prenom').val(),
                telephone : $('#champ-telephone').val(),
                adresse : $('#champ-adresse').val(),
                email : $('#champ-email').val(),
                password : $('#champ-mdp').val(),
                dateNaissance : $('#champ-date-naissance').val(),
                genre : $('#champ-genre').val()
        

            },
            dataType: 'json'
        })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (response.inscription) {
                
    
                $('#notification').html("inscription réussie ");  // Message pour le paragraphe de notification
                document.location.href = "index.html";
                // TODO: afficher les informations du client dans la notification
                // Exemple: Connexion de Ada Lovelace (ID 1)
                
            }
            else {
                $('#notification').html("inscription po réussie"); // Message pour le paragraphe de notification
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