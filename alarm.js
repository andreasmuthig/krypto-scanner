// alarm.js – Watchlist-Alarm für Einstieg

const watchlist = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "ADAUSDT"];
let alarmActive = false;
let activeSymbol = "";

async function checkWatchlist() {
  for (const symbol of watchlist) {
    try {
      const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
      const data = await res.json();
      const price = parseFloat(data.price);
      const entry = price * 0.995;
      const trigger = entry * 1.01;

      if (price <= trigger && !alarmActive) {
        alarmActive = true;
        activeSymbol = symbol;
        showAlarm(symbol, price, entry);
        break;
      }
    } catch (err) {
      console.error("Fehler beim Abrufen des Preises:", err);
    }
  }
  setTimeout(checkWatchlist, 10000); // alle 10s prüfen
}

function showAlarm(symbol, current, entry) {
  const tooltip = document.createElement("div");
  tooltip.id = "alarm-tooltip";
  tooltip.innerHTML = `${symbol} nähert sich dem Einstiegskurs! Aktueller Kurs: ${current.toFixed(2)} | Einstieg: ${entry.toFixed(2)}`;
  tooltip.style.position = "fixed";
  tooltip.style.top = "20px";
  tooltip.style.right = "20px";
  tooltip.style.background = "#f44336";
  tooltip.style.padding = "15px";
  tooltip.style.borderRadius = "12px";
  tooltip.style.color = "white";
  tooltip.style.fontWeight = "bold";
  tooltip.style.cursor = "pointer";
  tooltip.style.boxShadow = "0 0 20px #f44336";
  tooltip.onclick = () => {
    alarmActive = false;
    tooltip.remove();
    const bell = document.getElementById("alarm-bell");
    if (bell) bell.classList.remove("glow");
    window.location.href = `coin.html?symbol=${symbol}`;
  };
  document.body.appendChild(tooltip);

  const bell = document.getElementById("alarm-bell");
  if (bell) bell.classList.add("glow");

  const audio = new Audio("alarm.mp3");
  audio.play();
}

checkWatchlist();
