document.addEventListener("DOMContentLoaded", function () {
  var i = 0;
  var typeText = "With a 30% chance of light rain after 8 PM";
  var introText =
    "18ºc ~ 29ºc with gusty winds throughout the day, partly cloudy skies turning overcast by evening. Expect a high UV index, humidity levels will be moderate, making it feel slightly warmer than the actual temperature.";
  var percepText = "With a 23% chance of rain.";
  var speed = 50;

  const hideOverlayCheckbox = document.getElementById("hide-overlay");
  const weatherImage = document.querySelector("#weather img");
  const introElement = document.getElementById("intro");
  const perceptationElement = document.getElementById("perceptation");

  function typeWriter() {
    if (i < introText.length) {
      introElement.innerHTML += introText.charAt(i);
      perceptationElement.innerHTML += percepText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  function toggleOverlay() {
    if (hideOverlayCheckbox.checked) {
      weatherImage.style.visibility = "hidden";
      introElement.style.visibility = "hidden";
      perceptationElement.style.visibility = "hidden";
    } else {
      weatherImage.style.visibility = "visible";
      introElement.style.visibility = "visible";
      perceptationElement.style.visibility = "visible";
    }
  }

  hideOverlayCheckbox.addEventListener("change", toggleOverlay);

  // Always call typeWriter, regardless of checkbox state
  typeWriter();
});
