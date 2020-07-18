this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('gratis-radio-1').then(function (cache) {
            return cache.addAll([
                '/favicon.ico',
                '/css/index.css',
                '/js/index.js'
            ]);
        })
    );
});

this.addEventListener('fetch', function (event) {
    if (/creacast|mp3|streaming/.test(event.request.url)) {
        return;
    }
    var get = function () {
        return fetch(event.request).then(function (response) {
            return caches.open('gratis-radio-1566417780236').then(function (cache) {
                cache.put(event.request, response.clone());
                return response;
            });
        });
    };

    event.respondWith(
        caches
            .match(event.request)
            .then(function (cached) {

                // the cached value could be undefined
                if (typeof cached == 'undefined') {
                    return get();
                }

                return cached;
            })
            .catch(get)
    );
});

this.addEventListener('activate', function (event) {
    var cacheWhitelist = ['gratis-radio-1'];

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

