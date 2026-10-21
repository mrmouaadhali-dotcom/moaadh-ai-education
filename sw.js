const CACHE = "moaadh-ai-education-v1";
const ASSETS = ["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./icons/icon.svg","./data/exams.json","./data/quizzes.json"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener("fetch", event => { if (event.request.method === "GET" && new URL(event.request.url).origin === self.location.origin) event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request))); });
