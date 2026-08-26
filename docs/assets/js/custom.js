document.addEventListener("DOMContentLoaded", function () {
  var contactLink = document.getElementById("contact-email");
  if (contactLink) {
    contactLink.textContent = "ror@esante.gouv.fr";
    contactLink.setAttribute("href", "mailto:ror@esante.gouv.fr");
  }
});
