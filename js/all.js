// CLOCK

function renderTime() {
    var currentTime = new Date();
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
  
    if (h == 0) {
      h = 12;
    } else if (h > 12) {
      h = h - 12;
    }
  
    if (h < 10) {
      h = "0" + h;
    }
  
    if (m < 10) {
      m = "0" + m;
    }
  
    var myClock = document.getElementById("clock");
    myClock.textContent = h + ":" + m;
    setTimeout("renderTime()", 1000);
  }
  renderTime();
  

//   TODO

function get_todos() {
    var todos = new Array();
    var todos_str = localStorage.getItem("todo");
    if (todos_str !== null) {
      todos = JSON.parse(todos_str);
    }
    return todos;
  }
  
  function add() {
    var task = document.getElementById("task").value;
    var todos = get_todos();
    todos.push(task);
    localStorage.setItem("todo", JSON.stringify(todos));
    $('input:text').val('');
  
  
    show();
  
    return false;
  }
  
  function remove() {
    var id = this.getAttribute("id");
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem("todo", JSON.stringify(todos));
  
    show();
  
    return false;
  }
  
  function show() {
    var todos = get_todos();
  
    var html = "<ul>";
    for (var i = 0; i < todos.length; i++) {
      html +=
        "<li>" +
        todos[i] +
        '<button class="remove" id="' +
        i +
        '">x</button></li>';
    }
    html += "</ul>";
  
    document.getElementById("todos").innerHTML = html;
  
    var buttons = document.getElementsByClassName("remove");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", remove);
    }
  }
  
  document.getElementById("add").addEventListener("click", add);
  show();

//   QUOTES

$(document).ready(function() {
    var quote;
    var author;
  
    function getNewQuote() {
      $.ajax({
        url: "https://api.forismatic.com/api/1.0/",
        // JSONP used because of google protection
        jsonp: "jsonp",
        dataType: "jsonp",
        data: {
          method: "getQuote",
          lang: "en",
          format: "jsonp"
        },
        success: function(response) {
          // console.log(response);
          quote = response.quoteText;
          author = response.quoteAuthor;
          $("#quote").text('"' + quote + '"');
          if (author) {
            $("#author").text("said by " + author);
          } else {
            $("#author").text("-unknown");
          }
        }
      });
    }
    getNewQuote();
  
    $(".get-quote").on("click", function(event) {
      event.preventDefault();
      getNewQuote();
  
      $(".quote-box")
        .fadeOut("fast")
        .fadeIn("slow");
    });
  
    $(".share-quote").on("click", function(event) {
      event.preventDefault();
      window.open(
        "https://twitter.com/intent/tweet?text=" +
          encodeURIComponent(
            '"' +
              quote +
              '"' +
              " - " +
              author +
              "- share with Memento by Seke Nikola"
          ),
        "twitter-popup",
        "height=350,width=600"
      );
    });
  });

  
//  WEATHER

var APPID = "8fe3ad3bbb7be5102e0bde65ce9a7ac3";
var temp;
var loc;
// var desc;

function update(weather) {
  loc.innerHTML = weather.location;
  temp.innerHTML = weather.temp;
  // desc.innerHTML = weather.description;
}

window.onload = function() {
  temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  // desc = document.getElementById("description");

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
      // weather.description = data.weather[0].description;
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
