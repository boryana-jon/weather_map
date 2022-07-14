$(document).ready(function () {

    /* MAP SETTINGS */


    mapboxgl.accessToken = "pk.eyJ1IjoicmhpaGF5ZXMiLCJhIjoiY2t1Y3p3dDBpMTV1djJybzF4YjY3Nm1zZyJ9.Bn70REDQYB2_ltESrpDLsQ";
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 3,
        center: [-98.4916, 29.4252]
    });

    var weatherOptions = {
        lat: 29.4241,
        lon: -98.4936,
        appid: OPEN_WEATHER_APPID,
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


        console.log(geocode(input, MAPBOX_KEY)); //This gets me the coordinates

        geocode(input, MAPBOX_KEY).then(function(obj) {

            weatherOptions.lat = obj[1];
            weatherOptions.lng = obj[0];


            renderWeather()

        })

        // var lat2 = input.lat
        // var lng2 = input.lng
        //
        // weatherOptions.lng = lat2
        // weatherOptions.lat = lng2

    });



    /* RENDERING/STYLING AREA */


    // Try to put everything inside a function.

    function renderWeather() {

        //This gets the weather data
        $.get("http://api.openweathermap.org/data/2.5/onecall", weatherOptions)

            //When the above is done, post the data

            .done(function (weatherData) {

                console.log(weatherData);

                $('#weather-1').html("");
                $('#weather-2').html("");
                $('#weather-3').html("");
                $('#weather-4').html("");
                $('#weather-5').html("");


                var dayOne = weatherData.daily[0]
                var dayTwo = weatherData.daily[1]
                var dayThree = weatherData.daily[2]
                var dayFour = weatherData.daily[3]
                var dayFive = weatherData.daily[4]


                //All of these variables take the date,convert it, then store it
                //inside another variable so it can be displayed later

                function parseDate(timestamp) {
                    return new Date(timestamp * 1000).toLocaleDateString();
                }

                var dayOneDate = parseDate(dayOne.dt) //Not in use
                var dayTwoDate = parseDate(dayTwo.dt)
                var dayThreeDate = parseDate(dayThree.dt)
                var dayFourDate = parseDate(dayFour.dt)
                var dayFiveDate = parseDate(dayFive.dt)




                //For my reference, all days are logged so I can get information for
                //that particular day.

                console.log(dayOne)
                console.log(dayTwo)
                console.log(dayThree)
                console.log(dayFour)
                console.log(dayFive)


                //Need to grab and use lat/lon so it can be displayed
                // var latLon = {
                //     lat: weatherData.lat,
                //     lng: weatherData.lon
                // }

                //
                // var location = (reverseGeocode(latLon, mapboxApiKey));
                // console.log(location);
                //
                //Displays title and date

                $("#location").html(location);

                $("#date-2").html(dayTwoDate)
                $("#date-3").html(dayThreeDate)
                $("#date-4").html(dayFourDate)
                $("#date-5").html(dayFiveDate)


// //Displays all avg temperatures

                $("#temp").html(Math.round(dayOne.temp.day) + "°")

                $("#temp-2").html(Math.round(dayTwo.temp.day) + "°")

                $("#temp-3").html(Math.round(dayThree.temp.day) + "°")

                $("#temp-4").html( Math.round(dayFour.temp.day) + "°")

                $("#temp-5").html(Math.round(dayFive.temp.day) + "°")


// //Displays all min/max temperatures

                $("#min-2").html("Min temp: " + Math.round(dayTwo.temp.min) + "°")
                $("#max-2").html("Max temp: " + Math.round(dayTwo.temp.max) + "°")

                $("#min-3").html("Min temp: " + Math.round(dayThree.temp.min) + "°")
                $("#max-3").html("Max temp: " + Math.round(dayThree.temp.max) + "°")

                $("#min-4").html("Min temp: " + Math.round(dayFour.temp.min) + "°")
                $("#max-4").html("Max temp: " + Math.round(dayFour.temp.max) + "°")

                $("#min-5").html("Min temp: " + Math.round(dayFive.temp.min) + "°")
                $("#max-5").html("Max temp: " + Math.round(dayFive.temp.max) + "°")


                $("#weather-1").html(dayOne.weather[0].main)
                $("#weather-2").html(dayTwo.weather[0].main)
                $("#weather-3").html(dayThree.weather[0].main)
                $("#weather-4").html(dayFour.weather[0].main)
                $("#weather-5").html(dayFive.weather[0].main)


                /* A function that adds custom icons */

                function renderImage (day, weatherV) {
                    if (day === "Clouds") {
                        $(weatherV).html(day + '<img class="clouds" src="https://cdn-icons-png.flaticon.com/512/3093/3093309.png">')
                    }
                    else if (day === "Clear") {
                        $(weatherV).html(day + '<img class="clear" src="https://cdn-icons-png.flaticon.com/512/3093/3093303.png">')
                    }
                    else if (day === "Rain") {
                        $(weatherV).html(day + '<img class="rain" src="https://cdn-icons-png.flaticon.com/512/3093/3093313.png">')
                    }
                    else if (day === "Snow") {
                        $(weatherV).html(day + '<img class="snow" src="https://cdn-icons.flaticon.com/png/512/3093/premium/3093364.png?token=exp=1633799875~hmac=c3e3c1cd9aa2d0debef5efc8098f8370">')
                    }
                    return false;
                }

                renderImage(dayOne.weather[0].main, "#weather-1");
                renderImage(dayTwo.weather[0].main, "#weather-2");
                renderImage(dayThree.weather[0].main, "#weather-3");
                renderImage(dayFour.weather[0].main, "#weather-4");
                renderImage(dayFive.weather[0].main, "#weather-5");



// //Displays Today's Details

                $("#morn-t").html("Morning temp: " + Math.round(dayOne.temp.morn) + "°")

                $("#aft-t").html("Afternoon temp: " + Math.round(dayOne.temp.day) + "°")

                $("#eve-t").html("Evening temp: " + Math.round(dayOne.temp.eve) + "°")

                $("#nite-t").html("Night temp: " + Math.round(dayOne.temp.night) + "°")


                $("#min-1").html("Min temp: " + Math.round(dayOne.temp.min) + "°")
                $("#max-1").html("Max temp: " + Math.round(dayOne.temp.max) + "°")


                //Gives the time of dates in hours and minutes
                function parseTime(timestamp) {
                    return new Date(timestamp * 1000).toLocaleString([], {hour: '2-digit', minute:'2-digit'});
                }


                $("#sunrise").html("Sunrise: " + parseTime(dayOne.sunrise))

                $("#sunset").html("Sunset: " + parseTime(dayOne.sunset))

                $("#moonrise").html("Moonrise: " + parseTime(dayOne.moonrise))

                $("#moonset").html("Moonset: " + parseTime(dayOne.moonset))


                $("#hum").html(dayOne.humidity + "%")

                $("#w-sp").html("Wind speed: " + dayOne.wind_speed)

                $("#w-gu").html("Wind gust: " + dayOne.wind_gust)

                $("#w-de").html("Wind degree: " + dayOne.wind_deg)


                $("#pre").html("Pressure: " + dayOne.pressure)

                $("#uvi").html("UVI: " + dayOne.uvi)
            })


    } //Render Weather Function ends here

    renderWeather(29.4252, -98.4916)  //Makes it start at San Antonio


});