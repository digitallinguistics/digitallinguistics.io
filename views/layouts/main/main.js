if (navigator.serviceWorker && navigator.onLine) {
  navigator.serviceWorker.register(`offline-worker.js`, { scope: `./` });
}
