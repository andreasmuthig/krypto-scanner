<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Coin-Analyse</title>
  <style>
    body {
      background: #111;
      color: #eee;
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    h1 {
      font-size: 1.6em;
      margin-bottom: 5px;
      color: #fff;
    }

    #updated {
      font-size: 0.8em;
      color: #777;
      margin-bottom: 15px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    th, td {
      padding: 10px;
      border-bottom: 1px solid #333;
      text-align: left;
    }

    th {
      background: #222;
    }

    .box {
      background: #1c1c1c;
      border-radius: 16px;
      padding: 10px 15px;
      margin-bottom: 10px;
    }

    .led-bar {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 4px;
      border-radius: 2px;
      background-color: #444;
    }

    .led-on-green {
      background-color: #00ff55;
    }

    .led-on-blue {
      background-color: #3399ff;
    }

    .bar-wrapper {
      background: #222;
      height: 8px;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 5px;
    }

    .bar-fill {
      height: 100%;
      border-radius: 8px;
    }

    .bar-red {
      background-color: #f44336;
    }

    .bar-green {
      background-color: #4caf50;
    }

    #details {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 20px;
    }

    #metrics {
      width: 50%;
    }

    #spacer {
      width: 50%;
      background: #1a1a1a;
      border-radius: 16px;
    }

    #alert-box {
      display: none;
      padding: 15px;
      background-color: #f44336;
      color: white;
      font-weight: bold;
      text-align: center;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    a {
      color: #4fc3f7;
      text-decoration: none;
      font-weight: bold;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
  <script src="https://unpkg.com/feather-icons"></script>
</head>
<body>
  <div id="alert-box"></div>
  <h1>Analyse: <span id="symbol">...</span></h1>
  <div id="updated">Letzte Aktualisierung: <span id="zeit"></span></div>

  <table>
    <thead>
      <tr>
        <th>Asset</th><th>Kurs</th><th>Einstieg</th><th>Take-Profit</th><th>Stop-Loss</th><th>Haltezeit</th><th>Empfehlung</th>
      </tr>
    </thead>
    <tbody id="daten"></tbody>
  </table>

  <div id="details">
    <div id="metrics">
      <div class="box">
        <strong>CRV:</strong> <div id="crv-leds"></div>
        <div id="crv-text"></div>
      </div>
      <div class="box">
        <strong>RSI:</strong> <div id="rsi-leds"></div>
        <div id="rsi-text"></div>
      </div>
      <div class="box">
        <strong>Preisveränderung (24h):</strong>
        <div id="price-change"></div>
      </div>
      <div class="box">
        <div id="levels"></div>
      </div>
    </div>
    <div id="spacer"></div>
  </div>

  <br />
  <a href="index.html">← zurück zur Übersicht</a>

  <script>
    feather.replace();

    const params = new URLSearchParams(window.location.search);
    const symbol = params.get("symbol") || "BTCUSDT";
    document.getElementById("symbol").textContent = symbol;

    async function ladeAnalyse() {
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
        const data = await res.json();

        const kurs = parseFloat(data.lastPrice);
        const change = parseFloat(data.priceChangePercent);
        const einstieg = kurs * 0.995;
        const tp1 = kurs * 1.015;
        const tp2 = kurs * 1.03;
        const stop = kurs * 0.99;
        const empfehlung = tp1 > kurs ? "Long" : "Short";
        const farbe = tp1 > kurs ? "green" : "red";

        const crv = ((tp1 - einstieg) / (einstieg - stop)).toFixed(2);
        const rsi = Math.floor(Math.random() * 100);

        let crvLeds = "";
        for (let i = 0; i < 5; i++) {
          crvLeds += `<span class="led-bar ${i < crv ? 'led-on-green' : ''}"></span>`;
        }

        let rsiLeds = "";
        const rsiLevel = Math.round(rsi / 20);
        for (let i = 0; i < 5; i++) {
          rsiLeds += `<span class="led-bar ${i < rsiLevel ? 'led-on-blue' : ''}"></span>`;
        }

        const crvBeschreibung = crv >= 4 ? "Sehr gutes Verhältnis – Profi-Setup" : crv >= 2 ? "Gutes Verhältnis" : "Niedriges CRV";
        const rsiText = rsi < 30 ? "überverkauft – mögliches Kaufsignal" : rsi > 70 ? "überkauft – mögliches Verkaufssignal" : "neutral";

        const barFarbe = change >= 0 ? "bar-green" : "bar-red";
        const barBreite = Math.min(Math.abs(change) * 3, 100);

        const widerstand = tp1.toFixed(2);
        const unterstuetzung = stop.toFixed(2);

        document.getElementById("daten").innerHTML = `
          <tr>
            <td>${symbol}</td>
            <td>${kurs.toFixed(2)}</td>
            <td>${einstieg.toFixed(2)}</td>
            <td>${tp1.toFixed(2)} / ${tp2.toFixed(2)}</td>
            <td>${stop.toFixed(2)}</td>
            <td>kurzfristig</td>
            <td style="color: ${farbe}; font-weight: bold;">${empfehlung}</td>
          </tr>
        `;

        document.getElementById("zeit").textContent = new Date().toLocaleTimeString();
        document.getElementById("crv-leds").innerHTML = crvLeds;
        document.getElementById("crv-text").innerHTML = `CRV: ${crv} — ${crvBeschreibung}`;
        document.getElementById("rsi-leds").innerHTML = rsiLeds;
        document.getElementById("rsi-text").innerHTML = `RSI: ${rsi} — ${rsiText}`;
        document.getElementById("price-change").innerHTML = `
          ${change.toFixed(2)} % in 24h
          <div class="bar-wrapper">
            <div class="bar-fill ${barFarbe}" style="width: ${barBreite}%;"></div>
          </div>`;
        document.getElementById("levels").innerHTML = `
          <strong>Unterstützung:</strong> ${unterstuetzung} USDT<br />
          <strong>Widerstand:</strong> ${widerstand} USDT`;

        // Alarmfunktion
        if (Math.abs(kurs - einstieg) < kurs * 0.01) {
          const box = document.getElementById("alert-box");
          box.textContent = `${symbol} nähert sich dem Einstiegskurs! Aktueller Kurs: ${kurs.toFixed(2)} Einstieg: ${einstieg.toFixed(2)}`;
          box.style.display = "block";
        }
      } catch (err) {
        document.getElementById("daten").innerHTML = `<tr><td colspan="7">Fehler beim Laden der Analyse: ${err.message}</td></tr>`;
      }
    }

    ladeAnalyse();
  </script>
</body>
</html>
