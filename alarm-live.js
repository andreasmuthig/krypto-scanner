const alarmSound = document.getElementById("alarmSound");
const alarmsContainer = document.getElementById("alarms-container");
const watchlist = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT", "ADAUSDT", "DOTUSDT", "LINKUSDT", "AVAXUSDT"];
let triggered = {};

function playSound() {
  alarmSound.play().catch(err => console.warn("Audio blockiert:", err));
}

function createAlarmBox(symbol, price, entry) {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const box = document.createElement("div");
  box.className = "alarm-box";
  box.id = "alarm-" + symbol;

  box.innerHTML = \`
    <div class="alarm-header">
      <span>\${symbol}</span>
      <div class="alarm-icons">
        <a href="coin.html?symbol=\${symbol}" target="_blank"><i data-feather="external-link"></i></a>
        <i class="close-btn" data-feather="x"></i>
      </div>
    </div>
    <div class="alarm-body">
      <div>📉 Kurs: \${price.toFixed(2)} USDT</div>
      <div>🎯 Einstieg: \${entry.toFixed(2)} USDT</div>
      <div style="font-size: 11px; color: #555;">⏱️ \${now}</div>
    </div>
  \`;

  alarmsContainer.appendChild(box);
  feather.replace();
  box.querySelector(".close-btn").onclick = () => box.remove();
  playSound();
}

async function fetchData(symbol) {
  try {
    const res = await fetch(\`https://api.binance.com/api/v3/ticker/price?symbol=\${symbol}\`);
    const data = await res.json();
    return parseFloat(data.price);
  } catch {
    return null;
  }
}

async function checkAlarms() {
  for (let i = 0; i < watchlist.length; i++) {
    const symbol = watchlist[i];
    const price = await fetchData(symbol);
    if (!price) continue;

    const entry = price * 0.985; // Einstieg 1.5% über Jetzigem Kurs (z.B. Ziel für Longs)
    const triggerZone = entry * 0.015;

    if (!triggered[symbol] && Math.abs(price - entry) <= triggerZone) {
      triggered[symbol] = true;
      createAlarmBox(symbol, price, entry);
    }
  }
}

setInterval(checkAlarms, 20000); // Alle 20 Sekunden prüfen
