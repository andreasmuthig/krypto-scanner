// analyse.js – Lädt Kursdaten für coin.html

async function loadAnalysis(symbol) {
    try {
      const res = await fetch("watchlist.json");
      const data = await res.json();
      const coin = data.find(c => c.symbol === symbol);
  
      if (!coin) throw new Error("Symbol nicht gefunden");
  
      document.getElementById("symbol").textContent = symbol;
      document.getElementById("asset").textContent = symbol;
      document.getElementById("price").textContent = coin.price.toFixed(2);
      document.getElementById("entry").textContent = coin.entry.toFixed(2);
      document.getElementById("tp").textContent = `${coin.tp1.toFixed(2)} / ${coin.tp2.toFixed(2)}`;
      document.getElementById("sl").textContent = coin.sl.toFixed(2);
      document.getElementById("hold").textContent = coin.hold;
      document.getElementById("recommendation").textContent = coin.recommendation;
  
      document.getElementById("support").textContent = `${coin.sl.toFixed(2)} USDT`;
      document.getElementById("resistance").textContent = `${coin.tp1.toFixed(2)} USDT`;
  
      document.getElementById("update-time").textContent = new Date().toLocaleTimeString();
  
      renderCRV(coin.crv);
      renderRSI(coin.rsi);
      renderChange(coin.change24h);
    } catch (err) {
      document.getElementById("symbol").textContent = "...";
      console.error("Fehler beim Laden der Analyse:", err);
    }
  }
  
  function renderCRV(crv) {
    const leds = document.getElementById("crv-leds");
    leds.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const led = document.createElement("span");
      led.className = "led";
      if (i <= Math.round(crv)) led.classList.add("led-on-green");
      leds.appendChild(led);
    }
    const label = document.getElementById("crv-label");
    let text = "";
    if (crv >= 4) text = "Sehr gutes Verhältnis — Profi-Setup";
    else if (crv >= 2) text = "Gutes Setup";
    else text = "Ungünstiges Verhältnis";
    label.textContent = `CRV: ${crv.toFixed(2)} — ${text}`;
  }
  
  function renderRSI(rsi) {
    const leds = document.getElementById("rsi-leds");
    leds.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const led = document.createElement("span");
      led.className = "led";
      if (i <= Math.round(rsi / 20)) led.classList.add("led-on-blue");
      leds.appendChild(led);
    }
    const label = document.getElementById("rsi-label");
    let text = "neutral";
    if (rsi <= 30) text = "überverkauft — mögliches Kaufsignal";
    else if (rsi >= 70) text = "überkauft — mögliches Verkaufssignal";
    label.textContent = `RSI: ${rsi} — ${text}`;
  }
  
  function renderChange(change) {
    const bar = document.getElementById("change-bar");
    const label = document.getElementById("change-label");
    label.textContent = `${change.toFixed(2)} % in 24h`;
    bar.style.width = `${Math.min(Math.abs(change) * 2, 100)}%`;
    bar.style.background = change >= 0 ? "#00cc66" : "#f44336";
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const symbol = urlParams.get("symbol") || "BTCUSDT";
  loadAnalysis(symbol);
  