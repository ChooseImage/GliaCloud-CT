document.addEventListener("DOMContentLoaded", function () {
  var i = 0;
  var typeText = "With a 30% chance of light rain after 8 PM";
  var introText =
    "18ºc ~ 29ºc with gusty winds throughout the day, partly cloudy skies turning overcast by evening. Expect a high UV index, humidity levels will be moderate, making it feel slightly warmer than the actual temperature.";
  var percepText = "With a 23% chance of rain.";
  //typeText = "";
  var speed = 50;

  function typeWriter() {
    if (i < introText.length) {
      document.getElementById("intro").innerHTML += introText.charAt(i);
      document.getElementById("perceptation").innerHTML += percepText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
});

// 18ºc ~ 29ºc with gusty winds throughout the day, partly cloudy skies turning overcast by evening.
//             Expect a high UV index, humidity levels will be moderate,
//             making it feel slightly warmer than the actual temperature.
//https://www.aopa.org/-/media/Images/AOPA-Main/News-and-Media/Publications/Flight-Training-Magazine/2010f/2010f_pf_wx/2010f_pf_wx_16x9.jpg
//perceptation
