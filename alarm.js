
function showAlarm(symbol) {
  if (document.getElementById("alarm-box")) return;

  const box = document.createElement("div");
  box.id = "alarm-box";
  box.className = "show";
  box.innerHTML = `
    <i data-feather="alert-circle"></i>
    <span><a class="coin-link" href="coin.html?symbol=${symbol}" target="_blank">${symbol}</a> nähert sich dem Einstieg!</span>
    <i data-feather="x" class="close-btn"></i>
  `;
  document.body.appendChild(box);
  feather.replace();

  const sound = new Audio("alarm.mp3");
  sound.play();

  box.querySelector(".close-btn").addEventListener("click", () => {
    box.classList.remove("show");
    setTimeout(() => box.remove(), 500);
  });

  setTimeout(() => {
    if (document.body.contains(box)) {
      box.classList.remove("show");
      setTimeout(() => box.remove(), 500);
    }
  }, 10000);
}