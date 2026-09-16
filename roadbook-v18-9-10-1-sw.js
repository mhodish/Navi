const CACHE='roadbook-v18-9-10-1';
const CORE=['./','./index.html','./manifest.json','./roadbook-icon-192.png','./roadbook-icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    for(const path of CORE){
      const req=new Request(path,{cache:'reload'});
      const res=await fetch(req);
      if(!res || !res.ok){
        throw new Error('Failed to cache '+path+' ('+(res ? res.status : 'no response')+')');
      }
      await cache.put(req,res.clone());
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys
      .filter(k => (k.startsWith('europe-roadbook-v') || k.startsWith('roadbook-v')) && k!==CACHE)
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if(event.request.method!=='GET') return;

  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(event.request);
        const cache=await caches.open(CACHE);
        cache.put('./index.html',fresh.clone());
        cache.put(event.request,fresh.clone());
        return fresh;
      }catch(e){
        const cache=await caches.open(CACHE);
        return (await cache.match(event.request,{ignoreSearch:true})) ||
               (await cache.match('./index.html')) ||
               Response.error();
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const hit=await cache.match(event.request,{ignoreSearch:true});
    if(hit) return hit;
    try{
      const fresh=await fetch(event.request);
      if(fresh && fresh.ok) cache.put(event.request,fresh.clone());
      return fresh;
    }catch(e){
      return hit || Response.error();
    }
  })());
});
