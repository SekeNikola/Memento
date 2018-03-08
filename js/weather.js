var APPID = "8fe3ad3bbb7be5102e0bde65ce9a7ac3";
var temp;
var loc;
var desc;

function update(weather) {
  loc.innerHTML = weather.location;
  temp.innerHTML = weather.temp;
  desc.innerHTML = weather.description;
}

window.onload = function() {
  temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  desc = document.getElementById("description");

  /* NEW */
  if (navigator.geolocation) {
    var showPosition = function(position) {
      updateByGeo(position.coords.latitude, position.coords.longitude);
    };
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    var zip = window.prompt(
      "Could not discover your location. What is your zip code?"
    );
    updateByZip(zip);
  }
};

/* NEW */

function updateByGeo(lat, lon) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&APPID=" +
    APPID;
  sendRequest(url);
}

function updateByZip(zip) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "zip=" +
    zip +
    "&APPID=" +
    APPID;
  sendRequest(url);
}

function sendRequest(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
      var weather = {};
      weather.code = data.weather[0].id;
      weather.location = data.name;
      weather.description = data.weather[0].description;
      $("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
      /* NEW */
      weather.temp = K2C(data.main.temp);
      update(weather);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function K2F(k) {
  return Math.round(k * (9 / 5) - 459.67);
}

function K2C(k) {
  return Math.round(k - 273.15);
}
