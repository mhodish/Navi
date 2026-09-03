const CACHE_NAME='bethel-roadbook-v15';
const APP_SHELL=['./index.html','./Bethel_Roadbook_V15_Moira.html','./bethel-v15.webmanifest','./bethel-v15-icon-192.png','./bethel-v15-icon-512.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k.startsWith('bethel-roadbook-v')&&k!==CACHE_NAME).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith(
      fetch(event.request).then(response=>{
        const copy=response.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));
        return response;
      }).catch(async()=>{
        const exact=await caches.match(event.request,{ignoreSearch:true});
        if(exact)return exact;
        const current=await caches.match('./Bethel_Roadbook_V15_Moira.html');
        if(current)return current;
        return caches.match('./index.html');
      })
    );
    return;
  }
  event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(cached=>cached||fetch(event.request)));
});
