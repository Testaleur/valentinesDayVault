const CORRECT_PASSWORD = "t";

const main = document.querySelector("main");
const form = document.getElementById("passwordForm");
const input = document.getElementById("passwordInput");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === CORRECT_PASSWORD) {
    message.textContent = "Mot de passe correct ! Ouverture du coffre...";
    message.style.color = "green";

    // Fade out
    main.classList.add("hidden");

    setTimeout(() => {
      loadCoffre();
    }, 1); // match CSS duration
  } else {
    message.innerHTML =
      "❌ Mauvais mot de passe.<br>Avoue t'as juste testé pour voir.";
    message.style.color = "red";
    input.value = "";
  }
});

function loadCoffre() {
  fetch("coffre.html")
    .then(res => res.text())
    .then(html => {
      main.innerHTML = html;

      // Force repaint before fade-in
      requestAnimationFrame(() => {
        main.classList.remove("hidden");
      });

      // Re-bind close button AFTER HTML injection
      const closeBtn = document.getElementById("closeCoffre");
      if (closeBtn) {
        closeBtn.addEventListener("click", closeCoffre);
      }
    })
    .catch(() => {
      main.innerHTML = "<p>Erreur lors de l'ouverture du coffre.</p>";
      main.classList.remove("hidden");
    });
}

function closeCoffre() {
  main.classList.add("hidden");

  setTimeout(() => {
    resetLock();
  }, 1);
}

function bindClose() {
  const closeBtn = document.getElementById("closeCoffre");

  if (!closeBtn) return;

  closeBtn.addEventListener("click", () => {
    main.classList.add("hidden");

    setTimeout(() => {
      resetLock();
    }, 1);
  });
}

function resetLock() {
  main.innerHTML = `
    <p id="message">
      Entre le mot de passe pour entrer dans le coffre, et débloquer des souvenirs.
    </p>

    <form id="passwordForm">
      <input type="password" id="passwordInput" placeholder="Enter password" required>
      <button type="submit">Unlock</button>
    </form>
  `;

  messageReset();
  main.classList.remove("hidden");
}

function messageReset() {
  const form = document.getElementById("passwordForm");
  const input = document.getElementById("passwordInput");
  const message = document.getElementById("message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value === CORRECT_PASSWORD) {
      message.textContent = "Mot de passe correct ! Ouverture du coffre...";
      message.style.color = "green";

      main.classList.add("hidden");
      setTimeout(loadCoffre, 1);
    } else {
      message.innerHTML =
        "❌ Mauvais mot de passe.<br>Avoue t'as juste testé pour voir.";
      message.style.color = "red";
      input.value = "";
    }
  });
}
