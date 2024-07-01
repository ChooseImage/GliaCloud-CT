document.addEventListener("DOMContentLoaded", function () {
  var i = 0;
  var typeText = "With a 30% chance of light rain after 8 PM";
  typeText =
    "18ºc ~ 29ºc with gusty winds throughout the day, partly cloudy skies turning overcast by evening. Expect a high UV index, humidity levels will be moderate, making it feel slightly warmer than the actual temperature.";
  var speed = 50;

  function typeWriter() {
    if (i < typeText.length) {
      document.getElementById("demo").innerHTML += typeText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
});

// 18ºc ~ 29ºc with gusty winds throughout the day, partly cloudy skies turning overcast by evening.
//             Expect a high UV index, humidity levels will be moderate,
//             making it feel slightly warmer than the actual temperature.
