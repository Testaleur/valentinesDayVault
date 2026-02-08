// Select the button and paragraph
const button = document.getElementById("magicButton");
const message = document.getElementById("message");

// Add click functionality
button.addEventListener("click", () => {
  const colors = ["#ff6666", "#66b3ff", "#99ff99", "#ffcc66", "#c266ff"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  message.textContent = "✨ Magic happened! ✨";
  message.style.color = randomColor;
});
