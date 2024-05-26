      let htmlCommentaires; 
       //Affichage des mediums
        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'voir-commentaires'

            },
            dataType: 'json'
        })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (response.Commentaires_trouves){
                htmlCommmentaires = "<table align='center'>";
                for(let key in response.commentaires){

                    htmlCommentaires += '<tr><td>' + response.commentaires[key].commentaire + '</td></tr>';

                }
                 htmlCommmentaires += ' </table>';
                
                    
            }
            else 
            {
                htmlCommentaires = '<p>Aucun commentaire</p>'; 
                
            }
            $('#tabCommentaires').html(htmlCommentaires);
             
            
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always( function () { // Fonction toujours appelée
            
            


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

    $('#bouton-accueil').on( 'click', function () { // Fonction appelée lors du clic sur le bouton
        console.log("clic sur le bouton d'accueil"); // LOG dans Console Javascript
        $('#notification').html("Accès à l'accueil..."); // Message pour le paragraphe de notification
        window.location.href = "./accueuilEmployeConnecte.html"; 
    });

