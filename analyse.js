<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coin Analyse</title>
  <link rel="stylesheet" href="styles.css" />
  <script src="https://unpkg.com/feather-icons"></script>
  <script src="analyse.js" defer></script>
  <script src="alarm.js" defer></script>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #111;
      color: white;
    }

    .alarm-badge {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #f44336;
      padding: 10px 16px;
      border-radius: 10px;
      color: white;
      font-weight: bold;
      box-shadow: 0 0 16px #f44336;
      font-size: 0.85rem;
      z-index: 10000;
    }

    #alarm-bell {
      position: absolute;
      top: 24px;
      right: 24px;
      cursor: pointer;
    }

    #alarm-bell.glow {
      filter: drop-shadow(0 0 8px #f44336);
    }

    .container {
      padding: 100px 24px 24px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 32px;
    }

    .table th,
    .table td {
      padding: 12px;
      text-align: left;
    }

    .table th {
      background: #222;
    }

    .metrics {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .metric-box {
      flex: 1 1 300px;
      background: #1a1a1a;
      padding: 16px;
      border-radius: 12px;
    }

    .led-bar {
      display: flex;
      gap: 4px;
      margin-bottom: 4px;
    }

    .led {
      width: 14px;
      height: 14px;
      border-radius: 2px;
      background: #333;
    }

    .led.on-green { background: #00ff66; }
    .led.on-blue { background: #3399ff; }
    .led.on-red { background: #f44336; }

    .bar {
      height: 6px;
      background: #444;
      border-radius: 3px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: #f44336;
      transition: width 0.3s ease-in-out;
    }

    .text-muted {
      color: #aaa;
      font-size: 0.85rem;
    }

    .highlight {
      color: #4caf50;
    }

    a {
      color: #03a9f4;
      text-decoration: none;
    }
  </style>
</head>
<body>

<div id="alarm-container"></div>
<div id="alarm-bell"><i data-feather="bell"></i></div>

<div class="container">
  <h1 id="headline">Analyse: <span id="symbol">...</span></h1>
  <div class="text-muted" id="updated">Letzte Aktualisierung:</div>

  <table class="table">
    <thead>
      <tr>
        <th>Asset</th>
        <th>Kurs</th>
        <th>Einstieg</th>
        <th>Take-Profit</th>
        <th>Stop-Loss</th>
        <th>Haltezeit</th>
        <th>Empfehlung</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td id="asset"></td>
        <td id="price"></td>
        <td id="entry"></td>
        <td id="tp"></td>
        <td id="sl"></td>
        <td id="hold"></td>
        <td id="recommendation"></td>
      </tr>
    </tbody>
  </table>

  <div class="metrics">
    <div class="metric-box">
      <strong>CRV:</strong>
      <div class="led-bar" id="crv-leds"></div>
      <div id="crv-label"></div>
    </div>
    <div class="metric-box">
      <strong>RSI:</strong>
      <div class="led-bar" id="rsi-leds"></div>
      <div id="rsi-label"></div>
    </div>
    <div class="metric-box">
      <strong>Preisveränderung (24h):</strong>
      <div class="bar"><div class="bar-fill" id="change-bar"></div></div>
      <div id="change-label"></div>
    </div>
    <div class="metric-box">
      <strong>Unterstützung:</strong> <span id="support"></span><br>
      <strong>Widerstand:</strong> <span id="resistance"></span>
    </div>
  </div>

  <p><a href="index.html">← zurück zur Übersicht</a></p>
</div>

<script>
  feather.replace();
</script>
</body>
</html>
