// "use strict";
//
// // /***
// //  * geocode is a method to search for coordinates based on a physical address and return
// //  * @param {string} search is the address to search for the geocoded coordinates
// //  * @param {string} token is your API token for MapBox
// //  * @returns {Promise} a promise containing the latitude and longitude as a two element array
// //  *
// //  * EXAMPLE:
// //  *
// //  *  geocode("San Antonio", API_TOKEN_HERE).then(function(results) {
// //  *      // do something with results
// //  *  })
// //  *
// //  */
// mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ubGVlMDEyIiwiYSI6ImNsMnFsYW5kNTAwcWozZnVobWRpbDIzY3oifQ.np85DffrbdrsLjnGKOpV3g';
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/light-v10', // style URL
//     center: [-97.217380, 32.932820], // starting position [lng, lat]
//     zoom:5 // starting zoom
// });
// // const marker = new mapboxgl.Marker()
// //     .setLngLat([13.4050, 51.5200])
// //     .addTo(map);
//
// $('#zoom1').click(function (){
//     map.setZoom(5)
// });
// $('#zoom2').click(function (){
//     map.setZoom(15)
// });
// $('#zoom3').click(function (){
//     map.setZoom(20)
// });
// // Generate a map that shows the city with your favorite restaurant using geocoding.
//
// function geocode(search, token) {
//     var baseUrl = 'https://api.mapbox.com';
//     var endPoint = '/geocoding/v5/mapbox.places/';
//     return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
//         .then(function(res) {
//             return res.json();
//             // to get all the data from the request, comment out the following three lines...
//         }).then(function(data) {
//             return data.features[0].center;
//         });
// }
// var markerOptions = {
//     color: "#FFFFFF",
//     // draggable: false
// };
//
//
// var faveRest = [
//     {
//         Name: "Fortune House",
//         Type: "Chinese",
//         longitude:-96.952690,
//         latitude:32.942830
//     },
//     {
//         Name: "LA Burger",
//         Type: "Burgers",
//         longitude:-97.217380,
//         latitude:32.932820
//     },
//     {
//         Name: "Ricky's Hot Chicken",
//         Type: "Fried Chicken",
//         longitude:-96.698720 ,
//         latitude:32.975630
//     }
// ];
// faveRest.forEach(function (element) {
//     // Create a marker on your map of the exact location of your favorite restaurant
//     // set the zoom to allow for best viewing distance.
//     var marker = new mapboxgl.Marker(markerOptions)
//         .setLngLat([element.longitude, element.latitude])
//         .addTo(map);
//     // const marker = new mapboxgl.Marker(markerOptions)({
//     //     color: "#FFFFFF",
//     //     draggable: true
//     // }).setLngLat([element.longitude, element.latitude])
//     //     .addTo(map);
//     // Create a popup with the name of the restaurant.
//     var popUp = new mapboxgl.Popup()
//         .setHTML("<div>"+ element.Name + "</div>" + "<div style='text-align: center'>" + element.Type + "</div>")
//         .addTo(map);
//     // $('popUp').click(function(){
//         marker.setPopup(popUp);
//     // });
// });
//
//
//
// // /***
// //  * reverseGeocode is a method to search for a physical address based on inputted coordinates
// //  * @param {object} coordinates is an object with properties "lat" and "lng" for latitude and longitude
// //  * @param {string} token is your API token for MapBox
// //  * @returns {Promise} a promise containing the string of the closest matching location to the coordinates provided
// //  *
// //  * EXAMPLE:
// //  *
// //  *  reverseGeocode({lat: 32.77, lng: -96.79}, API_TOKEN_HERE).then(function(results) {
// //  *      // do something with results
// //  *  })
// //  *
// //  */
//
//
// // function reverseGeocode(coordinates, token) {
// //     var baseUrl = 'https://api.mapbox.com';
// //     var endPoint = '/geocoding/v5/mapbox.places/';
// //     return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" + 'access_token=' + token)
// //         .then(function(res) {
// //             return res.json();
// //         })
// //         // to get all the data from the request, comment out the following three lines...
// //         .then(function(data) {
// //             return data.features[0].place_name;
// //         });
// // }
//
// // var accessToken = 'pk.eyJ1Ijoiam9ubGVlMDEyIiwiYSI6ImNsMnFsYW5kNTAwcWozZnVobWRpbDIzY3oifQ.np85DffrbdrsLjnGKOpV3g';
// //
// // mapboxgl.accessToken = accessToken;
// //
// // var map = new mapboxgl.Map({
// //     container: 'map',
// //     style: 'mapbox://styles/mapbox/streets-v9',
// //     zoom: 10,
// //     center: [-98.4916, 29.4252]
// // });
// //
// // var alamoInfo = {
// //     address: "The Alamo",
// //     popupHTML: "<p>Remember the Alamo!</p>"
// // };
// // function placeMarkerAndPopup(info, token, map) {
// //     geocode(info.address, token).then(function(coordinates) {
// //         var popup = new mapboxgl.Popup()
// //             .setHTML(info.popupHTML);
// //         var marker = new mapboxgl.Marker()
// //             .setLngLat(coordinates)
// //             .addTo(map)
// //             .setPopup(popup);
// //         popup.addTo(map);
// //     });
// // }
// //
// // placeMarkerAndPopup(alamoInfo, accessToken, map);

"use strict";

function geocode(search, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            return res.json();
            // to get all the data from the request, comment out the following three lines...
        }).then(function(data) {
            return data.features[0].center;
        });
}

function reverseGeocode(coordinates, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            return res.json();
        })
        // to get all the data from the request, comment out the following three lines...
        .then(function(data) {
            return data.features[0].place_name;
        });
}