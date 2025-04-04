self.addEventListener('install', () => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', () => {
    clients.claim();
  });
  
  self.addEventListener('message', event => {
    if (event.data.type === "trigger-alarm") {
      const options = {
        body: event.data.message,
        vibrate: [200, 100, 200],
        icon: 'icon.png',
        tag: event.data.symbol
      };
  
      self.registration.showNotification("Krypto Alarm – " + event.data.symbol, options);
  
      // Nachricht an Client zurücksenden
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: "alarm" });
        });
      });
    }
  });
  