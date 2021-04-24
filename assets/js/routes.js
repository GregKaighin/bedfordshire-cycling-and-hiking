// Create Bedforshire variable
const bedfordshire = {
    lat: 52.02973,
    lng: -0.45303
};

// Custom map styling
var stylesArray = [{
        "featureType": "water",
        "stylers": [{
                "visibility": "on"
            },
            {
                "color": "#b5cbe4"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [{
            "color": "#efefef"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "color": "#83a5b0"
        }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#bdcdd3"
        }]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "lightgreen"
        }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#e3eed3"
        }]
    },
    {
        "featureType": "administrative",
        "stylers": [{
                "visibility": "on"
            },
            {
                "lightness": 33
            }
        ]
    },
    {
        "featureType": "road"
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [{
                "visibility": "on"
            },
            {
                "lightness": 20
            }
        ]
    },
    {},
    {
        "featureType": "road",
        "stylers": [{
            "lightness": 20
        }]
    }
]

// Set the map options
const mapOtions = {
    center: bedfordshire,
    zoom: 10,
    styles: stylesArray,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    // Disable the default map UI, enable the zoom control
    disableDefaultUI: true,
    zoomControl: true
};

// Create the map with the bicycle layer enabled
var map = new google.maps.Map(document.getElementById('googleMap'), mapOtions);
const bikeLayer = new google.maps.BicyclingLayer();
bikeLayer.setMap(map);

const iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
const icons = {
    parking: {
        name: "Parking",
        icon: iconBase + "parking_lot_maps.png",
    },
    library: {
        name: "Library",
        icon: iconBase + "library_maps.png",
    },
    info: {
        name: "Info",
        icon: iconBase + "info-i_maps.png",
    },
};
const features = [{
        position: new google.maps.LatLng(-33.91721, 151.2263),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.91539, 151.2282),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.91747, 151.22912),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.9191, 151.22907),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.91725, 151.23011),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.91872, 151.23089),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.91784, 151.23094),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.91682, 151.23149),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.9179, 151.23463),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.91666, 151.23468),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.916988, 151.23364),
        type: "info",
    },
    {
        position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
        type: "parking",
    },
    {
        position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
        type: "parking",
    },
    {
        position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
        type: "parking",
    },
    {
        position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
        type: "parking",
    },
    {
        position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
        type: "parking",
    },
    {
        position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
        type: "parking",
    },
    {
        position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
        type: "parking",
    },
    {
        position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
        type: "library",
    },
];
features.forEach((feature) => {
    new google.maps.Marker({
        icon: icons[feature.type].icon,
        map: map,
    });
});
const legend = document.getElementById("legend");

for (const key in icons) {
    const type = icons[key];
    const name = type.name;
    const icon = type.icon;
    const div = document.createElement("div");
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
}
map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);



// Create a DirectionsService object to use the route method and get a result for the request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object to create the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Display the directions on the map
directionsDisplay.setMap(map);

// Define the calcRoute function
function calcRoute() {
    // Create a route request
    var request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }
    // Pass the request to the .route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            // Get the route distance and time and pass to the #output div
            const output = document.querySelector('#output');
            output.innerHTML = '<div class="alert-info">From: ' + document.getElementById('from').value + '.<br />To: ' + document.getElementById('to').value + '.<br /> Cycling distance <i class="fas fa-biking"></i> : ' + result.routes[0].legs[0].distance.text + '.<br />Duration <i class="fas fa-stopwatch"></i> : ' + result.routes[0].legs[0].duration.text + '.</div>';

            // Display the route
            directionsDisplay.setDirections(result);
        } else {
            // Delete the route
            directionsDisplay.setDirections({
                routes: []
            });
            // Recenter the map on Bedfordshire
            map.setCenter(bedfordshire);

            // Show an error message if the route is not possible
            output.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> This route is not possible on a bicycle!</div>';
        }
    });

}

function prioryMarinaSandy() {
    // Create a route request
    var request = {
        origin: {
            lat: 52.131972,
            lng: -0.434981
        },
        destination: {
            lat: 52.1281,
            lng: -0.2868
        },
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }
    // Pass the request to the .route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            // Get the route distance and time and pass to the #output div
            const output = document.querySelector('#output');
            output.innerHTML = '<div class="alert-info">From: Priory Marina.<br />To: Sandy.<br /> Cycling distance <i class="fas fa-biking"></i> : ' + result.routes[0].legs[0].distance.text + '.<br />Duration <i class="fas fa-stopwatch"></i> : ' + result.routes[0].legs[0].duration.text + '.</div>';

            // Display the route
            directionsDisplay.setDirections(result);
        } else {
            // Delete the route
            directionsDisplay.setDirections({
                routes: []
            });
            // Recenter the map on Bedfordshire
            map.setCenter(bedfordshire);

            // Show an error message if the route is not possible
            output.innerHTML = '<div class="alert-danger"><i class="fas fa-exclamation-triangle"></i> This route is not possible on a bicycle!</div>';
        }
    });

}

// Create searchBox1 object for the starting place
var input1 = document.getElementById('from');
var searchBox1 = new google.maps.places.SearchBox(input1);

// Bias the SearchBox1 results towards current map's viewport
map.addListener('bounds_changed', () => {
    searchBox1.setBounds(map.getBounds());
});

// Create searchBox2 object for the destination
var input2 = document.getElementById('to');
var searchBox2 = new google.maps.places.SearchBox(input2);

// Bias the SearchBox2 results towards current map's viewport
map.addListener('bounds_changed', () => {
    searchBox2.setBounds(map.getBounds());
});