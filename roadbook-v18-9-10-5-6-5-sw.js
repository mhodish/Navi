const CACHE='roadbook-v18-9-10-5-6-5';
const CORE=['./','./index.html','./manifest.json','./roadbook-icon-192.png','./roadbook-icon-512.png'];
self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE && k.startsWith('roadbook-')).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  const isNavigation=event.request.mode==='navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/Navi/');
  if(isNavigation){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(event.request,{cache:'no-store'});
        const c=await caches.open(CACHE); c.put('./index.html',fresh.clone());
        return fresh;
      }catch(e){
        return (await caches.match(event.request)) || (await caches.match('./index.html'));
      }
    })());
    return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    if(cached) return cached;
    const fresh=await fetch(event.request);
    const c=await caches.open(CACHE); c.put(event.request,fresh.clone());
    return fresh;
  })());
});
