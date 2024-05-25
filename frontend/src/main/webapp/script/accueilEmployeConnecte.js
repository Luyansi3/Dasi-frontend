var statutConsultation= true; 
let htmlConsulation; 


function buildBarChart(container, graphData) {

    Highcharts.chart(container, {

        chart: {
            type: 'column'
        },
        title: {
            text: 'Top 5 mediums'
        },
      
        xAxis: {
            categories: graphData.labels
        },
        yAxis: {
            title: {
                text: 'Nombre de consultations'
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [{name: "Données", data: graphData.data}]
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
        var googleMapInstance = null;
        
        function makeInfoWindow(title) {
                return new google.maps.InfoWindow({
                    content: '<div>Information: ' + title + '</div>'
                });
        }

        function attachInfoWindow(marker, infowindow, htmlDescription) {
            marker.addListener('click', function () {

                infowindow.setContent(htmlDescription);
                infowindow.open(googleMapInstance, this);
            });
        }
        
        function initMap() {

            googleMapInstance = new google.maps.Map($('#map')[0], {
                center: {lat: 45.7601424, lng: 4.8961779},
                zoom: 13
            });


            generateMarkers();
        }
        
        function generateMarkers() {

            // Petite popup Google Maps
            var infowindow = makeInfoWindow('');

           

            for (let key in response.coordonnees) {

                var iconImage = null; // marker par défaut
 
                var marker = new google.maps.Marker({
                    map: googleMapInstance,
                    position: {lat: response.coordonnees[key].latitude, lng: response.coordonnees[key].longitude},
                    title: 'Client ',
                    icon: iconImage
                });

                attachInfoWindow(
                        marker, infowindow,
                        '<div><strong> Un client </strong> <br/>' + 'Incroyable !' + '</div>'
                        );
            }

        }
        
        initMap();
        
        var lineChartData = {labels: [], data:[], nom:[]};
        var i = 1;
        for(let key in response.mediums){
            lineChartData.labels.push("Top : " + i);
            lineChartData.data.push(response.mediums[key].nbConsultation);
            lineChartData.nom.push(response.mediums[key].denomination);
            i++;
        }
            
        
        buildBarChart('top5', lineChartData);
        
        

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

