// sw.js

// Service Worker Install Event
self.addEventListener("install", event => {
    console.log("Service Worker: Installed", event);
    // Perform install steps if necessary (e.g., caching assets)
    // It's common to cache important files during the 'install' event
    event.waitUntil(
        caches.open('YOUR_CACHE_NAME').then(cache => {
            return cache.addAll([
                // List of URLs to cache
                '/',
                '/index.html',
                '/style.css',
                '/assets/js/app.js',
                '/assets/js/auth.js',
                '/assets/js/feed.js',
                '/assets/js/map.js',
                // Add other assets you want to cache
            ]);
        })
    );
});

// Service Worker Activate Event
self.addEventListener("activate", event => {
    console.log("Service Worker: Activated", event);
    // Clean up old caches if necessary
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== 'YOUR_CACHE_NAME') {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Service Worker Fetch Event
self.addEventListener("fetch", event => {
    console.log("Service Worker: Fetching", event);
    // Here you can define how the service worker handles requests
    // This example attempts to fetch from the network first, then falls back to the cache
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
