const CACHE = 'ezer-profile-v2';
const ASSETS = ['./', './index.html', './style.css', './script.js', './manifest.json', './favicon.svg'];
self.addEventListener('install', (event) => { self.skipWaiting(); event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS))); });
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim())));
// 네트워크 우선: 홈페이지를 고치면 방문자가 바로 새 버전을 봅니다. 오프라인일 때만 캐시 사용.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(event.request, copy)).catch(() => {}); return res; })
      .catch(() => caches.match(event.request))
  );
});
