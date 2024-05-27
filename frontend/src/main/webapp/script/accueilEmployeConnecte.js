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
            
            categories: graphData.labels,
            labels:{useHTML:true}
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
                zoom: 5
            });
            
            generateMarkers(response, function(paysClients) {
                console.log(paysClients); // Affiche les pays et le nombre de clients dans chaque pays
                
                for(let key in paysClients){
                    googleMapInstance.data.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/'+ key + '.geo.json');
                    if(paysClients[key] <= 1){

                        googleMapInstance.data.setStyle({
                            fillColor: 'blue', // Couleur de remplissage
                            strokeColor: 'blue', // Couleur des frontières
                            strokeWeight: 1 // Épaisseur des frontières
                        });
                    }
                    else if(paysClients[key] <= 2){
                        googleMapInstance.data.setStyle({
                            fillColor: 'red', // Couleur de remplissage
                            strokeColor: 'red', // Couleur des frontières
                            strokeWeight: 2 // Épaisseur des frontières
                        });
                    }
                    else if(paysClients[key] >= 3){
                        googleMapInstance.data.setStyle({
                            fillColor: 'green', // Couleur de remplissage
                            strokeColor: 'green', // Couleur des frontières
                            strokeWeight: 2 // Épaisseur des frontières
                        });
                    }
                }
                
                
            });

                
                
                // Styliser la couche GeoJSON
                
                
                }
            
        
        function generateMarkers(response, callback) {
            
            
            let paysClients = {};
            let total = Object.keys(response.coordonnees).length;
            let compteur = 0;
            
            var iconImage = null; // marker par défaut
             var infowindow = makeInfoWindow('');
               

            for (let key in response.coordonnees) {
                let latLng = new google.maps.LatLng(response.coordonnees[key].latitude, response.coordonnees[key].longitude);
                let geocoder = new google.maps.Geocoder();
                
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

                geocoder.geocode({ 'location': latLng }, function (results, status) {
                    if (status === 'OK') {
                        if (results[0]) {
                            for (let i = 0; i < results[0].address_components.length; i++) {
                                let component = results[0].address_components[i];
                                if (component.types.includes("country")) {
                                    let country = iso_alpha2_to_alpha3[component.short_name];
                                    if (paysClients.hasOwnProperty(country)) {
                                        paysClients[country]++;
                                    } else {
                                        paysClients[country] = 1;
                                    }
                                    break;
                                }
                            }
                        } else {
                            console.log('No results found');
                        }
                    } else {
                        console.log('Geocoder failed due to: ' + status);
                    }

                    compteur++;
                    if (compteur === total) {
                        callback(paysClients);
                    }
                });
            }
        }
        
        
        
        initMap();
        
        var lineChartData = {labels: [], data:[], nom:[]};
        var i = 1;
        for(let key in response.mediums){
            lineChartData.labels.push("Top " + i + ": "+ response.mediums[key].denomination);
            lineChartData.data.push(response.mediums[key].nbConsultation);
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
        window.location.href = "./commentaires.html"; 
    });
}); 


iso_alpha2_to_alpha3 = {

    "AF": "AFG", "AX": "ALA", "AL": "ALB", "DZ": "DZA", "AS": "ASM", "AD": "AND",

    "AO": "AGO", "AI": "AIA", "AQ": "ATA", "AG": "ATG", "AR": "ARG", "AM": "ARM",

    "AW": "ABW", "AU": "AUS", "AT": "AUT", "AZ": "AZE", "BS": "BHS", "BH": "BHR",

    "BD": "BGD", "BB": "BRB", "BY": "BLR", "BE": "BEL", "BZ": "BLZ", "BJ": "BEN",

    "BM": "BMU", "BT": "BTN", "BO": "BOL", "BA": "BIH", "BW": "BWA", "BV": "BVT",

    "BR": "BRA", "IO": "IOT", "BN": "BRN", "BG": "BGR", "BF": "BFA", "BI": "BDI",

    "CV": "CPV", "KH": "KHM", "CM": "CMR", "CA": "CAN", "KY": "CYM", "CF": "CAF",

    "TD": "TCD", "CL": "CHL", "CN": "CHN", "CX": "CXR", "CC": "CCK", "CO": "COL",

    "KM": "COM", "CG": "COG", "CD": "COD", "CK": "COK", "CR": "CRI", "CI": "CIV",

    "HR": "HRV", "CU": "CUB", "CY": "CYP", "CZ": "CZE", "DK": "DNK", "DJ": "DJI",

    "DM": "DMA", "DO": "DOM", "EC": "ECU", "EG": "EGY", "SV": "SLV", "GQ": "GNQ",

    "ER": "ERI", "EE": "EST", "SZ": "SWZ", "ET": "ETH", "FK": "FLK", "FO": "FRO",

    "FJ": "FJI", "FI": "FIN", "FR": "FRA", "GF": "GUF", "PF": "PYF", "TF": "ATF",

    "GA": "GAB", "GM": "GMB", "GE": "GEO", "DE": "DEU", "GH": "GHA", "GI": "GIB",

    "GR": "GRC", "GL": "GRL", "GD": "GRD", "GP": "GLP", "GU": "GUM", "GT": "GTM",

    "GG": "GGY", "GN": "GIN", "GW": "GNB", "GY": "GUY", "HT": "HTI", "HM": "HMD",

    "VA": "VAT", "HN": "HND", "HK": "HKG", "HU": "HUN", "IS": "ISL", "IN": "IND",

    "ID": "IDN", "IR": "IRN", "IQ": "IRQ", "IE": "IRL", "IM": "IMN", "IL": "ISR",

    "IT": "ITA", "JM": "JAM", "JP": "JPN", "JE": "JEY", "JO": "JOR", "KZ": "KAZ",

    "KE": "KEN", "KI": "KIR", "KP": "PRK", "KR": "KOR", "KW": "KWT", "KG": "KGZ",

    "LA": "LAO", "LV": "LVA", "LB": "LBN", "LS": "LSO", "LR": "LBR", "LY": "LBY",

    "LI": "LIE", "LT": "LTU", "LU": "LUX", "MO": "MAC", "MG": "MDG", "MW": "MWI",

    "MY": "MYS", "MV": "MDV", "ML": "MLI", "MT": "MLT", "MH": "MHL", "MQ": "MTQ",

    "MR": "MRT", "MU": "MUS", "YT": "MYT", "MX": "MEX", "FM": "FSM", "MD": "MDA",

    "MC": "MCO", "MN": "MNG", "ME": "MNE", "MS": "MSR", "MA": "MAR", "MZ": "MOZ",

    "MM": "MMR", "NA": "NAM", "NR": "NRU", "NP": "NPL", "NL": "NLD", "NC": "NCL",

    "NZ": "NZL", "NI": "NIC", "NE": "NER", "NG": "NGA", "NU": "NIU", "NF": "NFK",

    "MP": "MNP", "NO": "NOR", "OM": "OMN", "PK": "PAK", "PW": "PLW", "PS": "PSE",

    "PA": "PAN", "PG": "PNG", "PY": "PRY", "PE": "PER", "PH": "PHL", "PN": "PCN",

    "PL": "POL", "PT": "PRT", "PR": "PRI", "QA": "QAT", "MK": "MKD", "RO": "ROU",

    "RU": "RUS", "RW": "RWA", "RE": "REU", "BL": "BLM", "SH": "SHN", "KN": "KNA",

    "LC": "LCA", "MF": "MAF", "PM": "SPM", "VC": "VCT", "WS": "WSM", "SM": "SMR",

    "ST": "STP", "SA": "SAU", "SN": "SEN", "RS": "SRB", "SC": "SYC", "SL": "SLE",

    "SG": "SGP", "SX": "SXM", "SK": "SVK", "SI": "SVN", "SB": "SLB", "SO": "SOM",

    "ZA": "ZAF", "GS": "SGS", "SS": "SSD", "ES": "ESP", "LK": "LKA", "SD": "SDN",

    "SR": "SUR", "SJ": "SJM", "SE": "SWE", "CH": "CHE", "SY": "SYR", "TW": "TWN",

    "TJ": "TJK", "TZ": "TZA", "TH": "THA", "TL": "TLS", "TG": "TGO", "TK": "TKL",

    "TO": "TON", "TT": "TTO", "TN": "TUN", "TR": "TUR", "TM": "TKM", "TC": "TCA",

    "TV": "TUV", "UG": "UGA", "UA": "UKR", "AE": "ARE", "GB": "GBR", "UM": "UMI",

    "US": "USA", "UY": "URY", "UZ": "UZB", "VU": "VUT", "VE": "VEN", "VN": "VNM",

    "VG": "VGB", "VI": "VIR", "WF": "WLF", "EH": "ESH", "YE": "YEM", "ZM": "ZMB",

    "ZW": "ZWE"

}

