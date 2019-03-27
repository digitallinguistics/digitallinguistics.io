const cacheName = `digitallinguistics.io`;

async function cleanCache() {
  const res           = await fetch(`manifest.json`);
  const files         = await res.json();
  const cache         = await caches.open(cacheName);
  const keys          = await cache.keys();
  const obsoleteFiles = keys.filter(req => !isWhitelisted(req, files));
  await Promise.all(obsoleteFiles.map(req => cache.delete(req)));
}

/**
 * Generate the response to the fetch event
 * Allow the cache to update in the background
 */
function generateResponse(ev) {
  ev.respondWith(getCachedResponse(ev.request));
  ev.waitUntil(updateCache(ev.request));
}

/**
 * Attempt to retrieve a cached response
 * Fall back to the network response if none is found
 */
async function getCachedResponse(req) {
  const cache = await caches.open(cacheName);
  const res   = await cache.match(req);
  return res || fetch(req);
}

/**
 * Check whether a requested resource is in the manifest
 */
function isWhitelisted(req, files) {
  return files.some(file => req.url.endsWith(file));
}

/**
 * Create the cache and add resources listed in manifest.json
 */
async function setupCache() {
  const res   = await fetch(`manifest.json`);
  const files = await res.json();
  const cache = await caches.open(cacheName);
  await cache.addAll(files);
}

/**
 * Store a request and response object in the cache
 */
async function storeResponse(req, res) {
  const cache = await caches.open(cacheName);
  return cache.put(req, res);
}

/**
 * Get the network response and update the cache with it (if successful)
 */
async function updateCache(req) {
  const res = await fetch(req);
  if (res.status === 200) await storeResponse(req, res);
}

self.addEventListener(`activate`, ev => ev.waitUntil(cleanCache()));
self.addEventListener(`fetch`, generateResponse);
self.addEventListener(`install`, ev => ev.waitUntil(setupCache()));
