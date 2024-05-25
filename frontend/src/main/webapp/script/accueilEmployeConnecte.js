var statutConsultation= true; 
let htmlConsulation; 


$( document ).ready(function() {
    
    
    $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'verification-connexion'

            },
            dataType: 'json'
    })
    .done(function (response) {
        
        console.log(response);
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
                todo: 'recherche-consultation'

            },
            dataType: 'json'
    })
    .done(function (response) {
        
        console.log(response);

        if (response.consultationEnAttente) //demande de consultation
        {
            
            htmlConsultation = '<button id="bouton-consultation"> CONSULTATION EN ATTENTE </button>'; 
            $('#consultation').html(htmlConsultation);
        }
        else{
            htmlConsultation = '<p> AUCUNE DE CONSULTATION </p>'; 
            $('#consultation').html(htmlConsultation);
        }

    })
    .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
    console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
    })
    .always(function () {
        
        $('#bouton-consultation').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton de consultation"); // LOG dans Console Javascript
        $('#notification').html("Accès aux commentaires..."); // Message pour le paragraphe de notification
        window.location.href = "./consultation.html"; 
    });

    });
    
    
    $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'voir-statistique'

            },
            dataType: 'json'
    })
    .done(function (response) {
        
        console.log(response);

        

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

    $('#bouton-commentaires').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton de commentaires"); // LOG dans Console Javascript
        $('#notification').html("Accès aux commentaires..."); // Message pour le paragraphe de notification
        //window.location.href = "./commentaires.html"; 
    });
}); 
