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
