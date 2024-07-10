document.addEventListener("DOMContentLoaded", function () {
  const collapsible = document.querySelector(".collapsible");
  const header = collapsible.querySelector(".collapsible-header");
  const toggleIcon = header.querySelector(".toggle-icon");
  const content = collapsible.querySelector(".collapsible-content");

  header.addEventListener("click", function () {
    console.log("Header clicked");
    collapsible.classList.toggle("active");
    toggleIcon.textContent = collapsible.classList.contains("active")
      ? "−"
      : "+";

    // Toggle the display of the content
    if (collapsible.classList.contains("active")) {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
});
