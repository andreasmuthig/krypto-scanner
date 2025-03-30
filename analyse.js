// analyse.js – Lädt Kursdaten für coin.html

async function loadAnalysis(symbol) {
    try {
      const res = await fetch("watchlist.json");
      const data = await res.json();
      const coin = data.find(c => c.symbol === symbol);
  
      if (!coin) throw new Error("Symbol nicht gefunden");
  
      // Tabelle
      document.getElementById("asset").textContent = coin.symbol;
      document.getElementById("price").textContent = coin.price.toFixed(2);
      document.getElementById("entry").textContent = coin.entry.toFixed(2);
      document.getElementById("tp").textContent = `${coin.tp1.toFixed(2)} / ${coin.tp2.toFixed(2)}`;
      document.getElementById("sl").textContent = coin.sl.toFixed(2);
      document.getElementById("hold").textContent = coin.hold;
      document.getElementById("recommendation").textContent = coin.recommendation;
  
      // Zusatzinfos
      document.getElementById("support").textContent = `${coin.sl.toFixed(2)} USDT`;
      document.getElementById("resistance").textContent = `${coin.tp1.toFixed(2)} USDT`;
      document.getElementById("update-time").textContent = new Date().toLocaleTimeString();
  
      renderCRV(coin.crv);
      renderRSI(coin.rsi);
      renderChange(coin.change24h);
    } catch (err) {
      console.error("Fehler beim Laden der Analyse:", err);
      document.getElementById("asset").textContent = "-";
      document.getElementById("price").textContent = "-";
      document.getElementById("entry").textContent = "-";
      document.getElementById("tp").textContent = "-";
      document.getElementById("sl").textContent = "-";
      document.getElementById("hold").textContent = "-";
      document.getElementById("recommendation").textContent = "-";
      document.getElementById("support").textContent = "-";
      document.getElementById("resistance").textContent = "-";
      document.getElementById("update-time").textContent = "--:--:--";
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
    let text = crv >= 4 ? "Sehr gutes Verhältnis — Profi-Setup" : crv >= 2 ? "Gutes Setup" : "Ungünstiges Verhältnis";
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
    let text = rsi <= 30 ? "überverkauft — mögliches Kaufsignal" : rsi >= 70 ? "überkauft — mögliches Verkaufssignal" : "neutral";
    label.textContent = `RSI: ${rsi} — ${text}`;
  }
  
  function renderChange(change) {
    const bar = document.getElementById("change-bar");
    const label = document.getElementById("change-label");
    label.textContent = `${change.toFixed(2)} % in 24h`;
    bar.style.width = `${Math.min(Math.abs(change) * 2, 100)}%`;
    bar.style.background = change >= 0 ? "#00cc66" : "#f44336";
  }
  
  // Symbol aus URL lesen
  const urlParams = new URLSearchParams(window.location.search);
  const symbol = urlParams.get("symbol") || "BTCUSDT";
  loadAnalysis(symbol);

  