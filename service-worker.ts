
const CACHE_NAME = 'kreativ-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/index.tsx', // The browser will request the JS equivalent
  '/manifest.json',
  '/data.ts',
  '/storage.ts',
  '/locales/de.ts',
  '/locales/en.ts',
  '/lib/gemini.ts',
  '/components/ErrorBoundary.tsx',
  '/components/Header.tsx',
  '/components/ReminderModal.tsx',
  '/components/Sidebar.tsx',
  '/components/DesktopDayView.tsx',
  '/components/MobileDayView.tsx',
  '/components/DayContent.tsx',
  '/components/IdeaGeneratorModal.tsx',
  '/components/AchievementsModal.tsx',
  '/components/DnaReportModal.tsx',
  '/components/OnboardingModal.tsx',
  '/components/Toast.tsx',
  '/hooks/useTranslation.ts',
  'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
  'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2'
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event: any) => {
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

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
              return response;
            }
            
            // Clone the response because it's a stream and can only be consumed once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});