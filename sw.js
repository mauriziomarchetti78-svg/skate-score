// ═══════════════════════════════════════════════════════════
// Skate Score — Service Worker v2
// Incrementa CACHE_VERSION per forzare aggiornamento
// ═══════════════════════════════════════════════════════════
const CACHE_VERSION = 'skate-score-v3';
const CACHE_CDN = 'skate-score-cdn-v3';

// File locali — sempre in cache
const LOCAL_ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg',
  './icon-maskable.svg',
];

// Risorse CDN — cachiate al primo uso
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js',
  'https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap',
];

// ── INSTALL ──────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(LOCAL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ─────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_VERSION && k !== CACHE_CDN)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH ────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;
  const isLocal = url.includes(self.location.origin);
  const isCDN = CDN_ASSETS.some(cdn => url.startsWith(cdn.split('?')[0]));
  const isFont = url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com');

  if (isLocal) {
    // Cache-first per file locali
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_VERSION).then(c => c.put(event.request, clone));
          }
          return res;
        });
      })
    );
  } else if (isCDN || isFont) {
    // Stale-while-revalidate per CDN
    event.respondWith(
      caches.open(CACHE_CDN).then(cache =>
        cache.match(event.request).then(cached => {
          const networkFetch = fetch(event.request).then(res => {
            if (res && res.status === 200) cache.put(event.request, res.clone());
            return res;
          }).catch(() => null);
          return cached || networkFetch;
        })
      )
    );
  }
});

// ── BACKGROUND SYNC: notifica aggiornamento disponibile ──
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
