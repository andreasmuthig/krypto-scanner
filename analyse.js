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
  } catch (err) {
    document.getElementById("symbol").textContent = "...";
    console.error("Fehler beim Laden der Analyse:", err);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get("symbol") || "BTCUSDT";
loadAnalysis(symbol);