const CACHE_NAME = "finance-tracker-v1";
const urlsToCache = [
  "/",
  "/expenses",
  "/income",
  "/analytics",
  "/cards",
  "/sync",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
];

// Install event
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Instalando...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Intentando cachear:", urlsToCache);

      return Promise.allSettled(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[Service Worker] ❌ Falló al cachear ${url}:`, err);
          })
        )
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // 🚫 Ignorar requests a la API
  if (requestUrl.pathname.startsWith("/api")) {
    return;
  }

  console.log("[Service Worker] Fetching", event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activando...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] 🧹 Borrando cache antigua:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
