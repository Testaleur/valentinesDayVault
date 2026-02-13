const CORRECT_PASSWORD = "sense8" + "caval" + "melib";
const QUICK_PASSWORD = "r";

const main = document.querySelector("main");
const form = document.getElementById("passwordForm");
const input = document.getElementById("passwordInput");
const message = document.getElementById("message");
const togglePassword = document.getElementById('togglePassword');

// hints
const hint1 = document.getElementById('hint1');
const hint2 = document.getElementById('hint2');
const hint3 = document.getElementById('hint3');
var hint1IsRevealed = false;
var hint2IsRevealed = false;
var hint3IsRevealed = false;

hint1.addEventListener('click', () => {
  if(!hint1IsRevealed){
    hint1.textContent = "La série qu'on regardait entre deux parties de SkyTeam.";
    hint1IsRevealed = true
  }else{
    hint1.textContent = "Première partie du mot de passe...";
    hint1IsRevealed = false;
  }
});

hint2.addEventListener('click', () => {
  if(!hint2IsRevealed){
    hint2.textContent = "On a parcouru des kilomètres en vélo et bateau pour trouver des chaussures de cette marque... pour rien.";
    hint2IsRevealed = true;
  }else{
    hint2.textContent = "Deuxième partie du mot de passe...";
    hint2IsRevealed = false;
  }
});

hint3.addEventListener('click', () => {
  if(!hint3IsRevealed){
    hint3.textContent = "Le nom des vélos qu'on a pris pour se rentre au pays des cailloux et des habitants aux tatamis.";
    hint3IsRevealed = true;
  }else{
    hint3.textContent = "Troisième partie du mot de passe...";
    hint3IsRevealed = false;
  }
});

togglePassword.addEventListener('click', () => {
  // bascule entre "password" et "text"
  const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
  input.setAttribute('type', type);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === CORRECT_PASSWORD || input.value === QUICK_PASSWORD) {
    message.textContent = "Mot de passe correct ! Ouverture du coffre...";
    message.style.color = "green";

    setTimeout(() => {
      loadCoffre();
    }, 1); // match CSS duration
  } else {
    message.innerHTML =
      "❌ Mauvais mot de passe. Avoue t'as juste testé pour voir.";
    message.style.color = "red";
    input.value = "";
  }
});

function loadCoffre() {
  fetch("coffre.html?nocache=" + Date.now())
    .then(res => res.text())
    .then(html => {
      main.innerHTML = html;
    })
    .catch(() => {
      main.innerHTML = "<p>Erreur lors de l'ouverture du coffre.</p>";
    });
}