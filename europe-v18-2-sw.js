const CACHE='europe-roadbook-v18-2';
const LOCAL=['./','./index.html','./manifest.json','./europe-v18-icon-192.png','./europe-v18-icon-512.png'];
const REMOTE=["https://commons.wikimedia.org/wiki/Special:Redirect/file/Haukland%20Beach%20view.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Eilean%20Donan%20Castle.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Old%20Man%20of%20Storr.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Glenfinnan%20viaduct.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Delft%20canal.JPG?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/KinderdijkWindmills.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Het%20oude%20raadhuis%20van%20Oud-Beijerland.png?width=960"];

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    await c.addAll(LOCAL);
    for(const url of REMOTE){
      try{
        const req=new Request(url,{mode:'no-cors',cache:'reload'});
        const res=await fetch(req);
        await c.put(req,res);
      }catch(e){ /* photo failure must not block the roadbook install */ }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('europe-roadbook-v')&&k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(r=>{
      const cp=r.clone(); caches.open(CACHE).then(c=>c.put(event.request,cp)); return r;
    }).catch(async()=>await caches.match(event.request,{ignoreSearch:true})||await caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(cached=>{
    if(cached)return cached;
    return fetch(event.request).then(r=>{
      const cp=r.clone(); caches.open(CACHE).then(c=>c.put(event.request,cp)); return r;
    });
  }));
});
