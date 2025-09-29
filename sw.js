// Nome do cache
const CACHE_NAME = 'relva-fono-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  'images/hero-bg.jpg',
  'images/relva.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
  'https://code.jquery.com/jquery-3.6.0.min.js',
  'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
  'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
  'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estratégia de cache: Network First, fallback para cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Verifica se a resposta é válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clona a resposta para armazenar no cache
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Se a rede falhar, tenta buscar do cache
        return caches.match(event.request)
          .then(response => {
            // Retorna a resposta do cache ou uma página de fallback
            return response || caches.match('/offline.html');
          });
      })
  );
});
