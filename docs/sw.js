const CACHE_NAME="2024-07-16 08:40",urlsToCache=["/number-icon/","/number-icon/index.js","/number-icon/mp3/boyon1.mp3","/number-icon/mp3/pa1.mp3","/number-icon/mp3/papa1.mp3","/number-icon/mp3/levelup1.mp3","/number-icon/favicon/favicon.svg"];self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(e=>e.addAll(urlsToCache)))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>t||fetch(e.request)))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(e=>Promise.all(e.filter(e=>e!==CACHE_NAME).map(e=>caches.delete(e)))))})