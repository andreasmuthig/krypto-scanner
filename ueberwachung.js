
const watchlist = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT", "ADAUSDT", "DOTUSDT", "LINKUSDT", "AVAXUSDT"];

async function checkPrices() {
  for (let symbol of watchlist) {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const data = await res.json();
    const price = parseFloat(data.price);
    const entry = price * 0.985; // simuliert Einstieg 1.5% unterhalb

    const lower = entry * 0.985;
    const upper = entry * 1.015;

    if (price >= lower && price <= upper) {
      showAlarm(symbol);
    }
  }
}

setInterval(checkPrices, 15000);
