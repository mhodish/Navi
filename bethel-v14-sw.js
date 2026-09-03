const CACHE_NAME='bethel-roadbook-v14';
const APP_SHELL=[
  './Bethel_Roadbook_V14_Irish_Voice.html',
  './bethel-v14.webmanifest',
  './bethel-v14-icon-192.png',
  './bethel-v14-icon-512.png'
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache=>cache.addAll(APP_SHELL))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(
        keys.filter(k=>k.startsWith('bethel-roadbook-v') && k!==CACHE_NAME)
            .map(k=>caches.delete(k))
      ))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;

  if(event.request.mode==='navigate') {
    event.respondWith(
      caches.match('./Bethel_Roadbook_V14_Irish_Voice.html')
        .then(cached=>cached || fetch(event.request))
        .catch(()=>caches.match('./Bethel_Roadbook_V14_Irish_Voice.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request,{ignoreSearch:true})
      .then(cached=>cached || fetch(event.request))
  );
});
