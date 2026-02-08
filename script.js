const form = document.getElementById("passwordForm");
const input = document.getElementById("passwordInput");
const message = document.getElementById("message");
const main = document.querySelector("main");

const CORRECT_PASSWORD = "t";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const enteredPassword = input.value;

  if (enteredPassword === CORRECT_PASSWORD) {
    message.textContent = "Mot de passe correct ! Ouverture du coffre...";
    message.style.color = "green";
    input.value = "";

    // Wait 2 seconds, then load coffre.html
    setTimeout(() => {
      loadCoffre();
    }, 2000);

  } else {
    message.innerHTML =
      "❌ Mauvais mot de passe. Avoue t'as juste testé pour voir.<br>Ou alors tu t'es vraiment trompée..?";
    message.style.color = "red";
    input.value = "";
  }
});

function loadCoffre() {
  fetch("coffre.html")
    .then(response => response.text())
    .then(html => {
      main.innerHTML = html;
    })
    .catch(error => {
      main.innerHTML = "<p>Erreur lors de l'ouverture du coffre 😢</p>";
      console.error(error);
    });
}
