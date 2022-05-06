console.log("hi")

"use strict"


/* Had to refactor everything and change forecast to oncall... */

$(document).ready(function () {

    /* MAP SETTINGS */


    mapboxgl.accessToken = "pk.eyJ1IjoicmhpaGF5ZXMiLCJhIjoiY2t1Y3p3dDBpMTV1djJybzF4YjY3Nm1zZyJ9.Bn70REDQYB2_ltESrpDLsQ";
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 3,
        center: [-98.4916, 29.4252]
    });


    //GEOCODER

    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    );

    var weatherOptions = {
        lat: 29.4241,
        lon: -98.4936,
        appid: "6df8ced252f1f1cf68791d5bce138fad\n",
        units: 'imperial'
    };


    //New user marker

    var marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([-98.4916, 29.4252])
        .addTo(map);



    /* USER INPUT FUNCTIONS */


    /* For draggable marker */

    //This function allows the user's cords to be picked up/stored, then
    // render weather is called INSIDE THIS FUNCTION to update everything once
    //the marker is dropped.

    function onDragEnd() {
        var lngLat = marker.getLngLat();
        var lat = lngLat.lat
        var lng = lngLat.lng

        weatherOptions.lng = lng
        weatherOptions.lat = lat
        renderWeather()

    }

    marker.on('dragend', onDragEnd);


    /* For search area */

    //Clicking the button takes and stores the data from search area

    $('#find').click(function (event) {
        alert("Your weather has been updated!")
        var input = document.getElementById('search').value
        console.log(input);


        console.log(geocode(input, mapboxApiKey)); //This gets me the coordinates

        geocode(input, mapboxApiKey).then(function(obj) {

            weatherOptions.lat = obj[1];
            weatherOptions.lng = obj[0];


            renderWeather()

        })



    });



    /* RENDERING/STYLING AREA */


    // Try to put everything inside a function.

    function renderWeather() {

        //This gets the weather data
        // $.get("http://api.openweathermap.org/data/2.5/weather", weatherOptions)



    } //Render Weather Function ends here

    renderWeather(29.4252, -98.4916)  //Makes it start at San Antonio

    $.get("http://api.openweathermap.org/data/2.5/weather", {
        APPID: OPEN_WEATHER_APPID,
        q:     "San Antonio, US"
    }).done(function(data) {
        console.log(data);
        // access the value of 'temp' from the object (dot notation)
        // create an element to hold weather details
        // set the content/value of those newly created elements to the values from the object
        // append the new elements to the existing div container for the 5day weather

    });

});




