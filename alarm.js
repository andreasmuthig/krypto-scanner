// alarm.js

function checkAlarm(currentPrice, entryPrice, symbol) {
    const abweichung = Math.abs(currentPrice - entryPrice);
    const schwelle = entryPrice * 0.01; // 1 % Schwelle
  
    if (abweichung <= schwelle) {
      triggerAlarm(symbol, currentPrice, entryPrice);
    }
  }
  
  function triggerAlarm(symbol, currentPrice, entryPrice) {
    const message = `${symbol} nähert sich dem Einstiegskurs!\nAktueller Kurs: ${currentPrice.toFixed(2)}\nEinstieg: ${entryPrice.toFixed(2)}`;
  
    // 🔊 Ton abspielen
    const alarmSound = new Audio('alarm.mp3'); // Stelle sicher, dass diese Datei vorhanden ist
    alarmSound.play().catch((e) => console.warn("Audio konnte nicht abgespielt werden", e));
  
    // 💬 Visuelle Benachrichtigung (optional: mit Feather Icon Integration)
    const alarmBox = document.createElement('div');
    alarmBox.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(255, 68, 68, 0.7);
        font-weight: bold;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
      ">
        <i data-feather="bell"></i>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(alarmBox);
    feather.replace();
  
    setTimeout(() => {
      alarmBox.remove();
    }, 8000);
  }
  
  // Beispiel zur Verwendung
  // checkAlarm(125.90, 125.00, "SOLUSDT");
  