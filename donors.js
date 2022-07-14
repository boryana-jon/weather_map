var request = new XMLHttpRequest();

request.open('GET', 'https://mealconnect.org/api/v2/donors/{donorId}/locations/{id}');

request.setRequestHeader('Accept', 'application/json');
request.setRequestHeader('X-ApiKey', '[Your API Key Here]');

request.onreadystatechange = function () {
    if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
    }
};

request.send();





"use strict"

// setting up global variables to call the data from Weather Map
var longitude = -98.7320
var latitude = 29.7947

// Calling initial getData function
getData();

// ------- Query the Weather Map API ----------------------------------------------

// String and Object Method:
// Using this method for the sake of readability
// Excluding minutely and hourly.
// Changing kelvins to imperial: Fahrenheit
// Defining the 'get' request as a function 'getData' in order to call it multiple times
function getData() {
    $.get("https://mealconnect.org/api/v2/donors/{donorId}/locations/{id}", {
        APPID: OPEN_WEATHER_APPID,
        lat: latitude,
        lon: longitude,
        units: "imperial",
        exclude: "minutely, hourly"
    }).done(function (data) {
        handleResponse(data)
    });

}


// Setting up handle response to iterate through the returned data and populate the html:
function handleResponse(data) {
    let days = data.daily;
    let html = "";
    for (var i = 0; i < 5; i++) {
        let date = dateMaker(i);
        let iconCode = days[i].weather[0].icon;
        let tempHigh = Math.round(days[i].temp.max);
        let tempLow = Math.round(days[i].temp.min);
        let daysHum = days[i].humidity;
        let dayPress = days[i].pressure;
        let dayWind = days[i].wind_speed;
        let description = days[i].weather[0].description;
// Embedding into the div.card element using string method:
        let itemHtml = "<div style='align-items: center; margin-bottom: 50px' class='card col-2' style='width: 17rem'>"
        itemHtml += '<span class="date-text">' + date + '</span>';
        itemHtml += "<img style='height: 50px; width: 50px;' src='http://openweathermap.org/img/w/" + iconCode + ".png'>" // Refactored the image names of the local icons to work with this
        itemHtml += '<h5 class="highText">' + 'High ' + tempHigh + '</h5>';
        itemHtml += '<h5 class="lowText">' + 'Low ' + tempLow + '</h5>';
        itemHtml += '<p class=“humid” style="font-size:12px; margin: 0">' + 'Humidity: ' + daysHum + '</p>';
        itemHtml += '<p class=“pressure" style="font-size:12px; margin: 0">' + 'Pressure: ' + dayPress + '</p>';
        itemHtml += '<p class=“wind” style="font-size:12px; margin: 0">' + 'Wind: ' + dayWind + ' mph' + '</p>';
        itemHtml += '<p class="card-footer my-1">' + description + '</p>';
        itemHtml += '</div>';
        html += itemHtml;
    }
    $('#insertWeatherBoxes').html(html);

    let coordinates = {
        lng: data.lon,
        lat: data.lat
    }

    let myLocation = reverseGeocode(coordinates, MAPBOX_KEY);
    myLocation.then(function(data) {
        $('#locationPrinted').text(data);});

    //------- Map -----------------------------------------------------

    mapboxgl.accessToken = MAPBOX_KEY
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/light-v10', // style URL
        center: [longitude, latitude], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

// Map Nav Controls
    map.addControl(new mapboxgl.NavigationControl());

//Starting Draggable Marker (default point)
    var marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([longitude, latitude])
        .addTo(map);

    console.log(marker.getLngLat())

// Adding functionality to draggable marker

    function onDragEnd() {
        var lngLat = marker.getLngLat();
        longitude = lngLat.lng;
        latitude = lngLat.lat;
        getData();
    }
    marker.on('dragend', onDragEnd);
}

// Trying to manipulate the date() object to work with the weather cards.
// Pass the dateMaker function the index number (i) in the handleResponse.
// The setDate() method sets the day of the Date object relative
// to the beginning of the currently set month. -MDN
// The getDate() method returns the day of the month for the specified
// date according to local time. -MDN

function dateMaker(num) {
    let date = new Date();
    date.setDate(date.getDate() + num)
    return date.toDateString().slice(0, 10);
}

//------- Search by City geocode ----------------------------------------

$(".btn").click(function (e) {
    e.preventDefault()
    let searchInput = $("#input").val();
    geocode(searchInput, MAPBOX_KEY).then(function (data) {
        longitude = data[0];
        latitude = data[1];
        getData();
    })
})
