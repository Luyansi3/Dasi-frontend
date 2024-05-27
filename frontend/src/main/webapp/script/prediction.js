$(document).ready(function() {
    
    $('.stars').each(function() {
        let $starsContainer = $(this);
        let $stars = $starsContainer.find('.star');

        $stars.on('click', function() {
            let rating = $(this).data('value');
            $stars.removeClass('selected');
            $(this).addClass('selected');
            $(this).prevAll().addClass('selected');

            // Stocke la note dans un attribut de la div conteneur
            $starsContainer.attr('data-rating', rating);
        });

        $stars.on('mouseover', function() {
            $stars.css('color', '#ccc');
            $(this).css('color', 'gold');
            $(this).prevAll().css('color', 'gold');
        });

        $stars.on('mouseout', function() {
            $stars.each(function() {
                if (!$(this).hasClass('selected')) {
                    $(this).css('color', '#ccc');
                } else {
                    $(this).css('color', 'gold');
                }
            });
        });
    });

    $('#bouton-prediction').on('click', function() {
        let ratingAmour = $('#starAmour').attr('data-rating') || 0;
        let ratingSante = $('#starSante').attr('data-rating') || 0;
        let ratingCarriere = $('#starCarriere').attr('data-rating') || 0;
        //à changer !!
        console.log('Note pour Amour : ' + ratingAmour + ' étoiles, Note pour Santé : ' + ratingSante + ' étoiles ' + ratingCarriere + 'étoiles');
        
        $.ajax({
            url: './ActionServlet',
                method: 'POST',
                data: {
                    todo: 'voir-prediction',
                    noteAmour: ratingAmour,
                    noteSante: ratingSante,
                    noteCarriere: ratingCarriere
                
                },
                dataType: 'json'
        })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log(response);
            let htmlPredictions = '<h2>Prédictions : </h2> <table>';
            
            htmlPredictions += '<tr><th>Prédiction Amour</th> <th>'+ response.predictionAmour + '</th></tr>';
            htmlPredictions += '<tr><th>Prédiction Santé </th> <th>'+ response.predictionSante + '</th></tr>';
            htmlPredictions += '<tr><th>Prédiction Carrière</th> <th>'+ response.predictionCarriere + '</th></tr>';
            
            htmlPredictions+="</table>"; 
            $('#prediction').html(htmlPredictions);
            
            
           
            })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () {
        });
        
    });


    $('#bouton-consultationEnCours').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton de consulatation"); // LOG dans Console Javascript
        $('#notification').html("Accès à consulatation en cours..."); // Message pour le paragraphe de notification
        window.location.href = "./consultationEnCoursEmp.html"; 
    });


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

});
