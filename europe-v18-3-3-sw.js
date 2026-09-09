const CACHE='europe-roadbook-v18-3-3';
const LOCAL=['./','./index.html','./manifest.json','./europe-v18-icon-192.png','./europe-v18-icon-512.png'];
const REMOTE=["https://commons.wikimedia.org/wiki/Special:Redirect/file/Delft%20canal.JPG?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Eilean%20Donan%20Castle.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flakstad-Kirche-04-2019-gje.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Glenfinnan%20viaduct.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hamn%C3%B8y_in_Lofoten.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Haukland%20Beach%20view.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Het%20oude%20raadhuis%20van%20Oud-Beijerland.png?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/KinderdijkWindmills.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lofoten-4.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lofoten_-_Nusfjord.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lofoten_Reine.JPG?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lofotr_viking_museum_lofoten_foto_brage_aronsen.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Old%20Man%20of%20Storr.jpg?width=960", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Utakleiv_beach.jpg?width=960", "https://d3fphkxyf5o5bm.cloudfront.net/image-resize/format%3Dwebp%2Cw%3D1200/QwRY54Li1HMwD7oNfp1aXB0I0MG2j3i1IjF1AK358L", "https://d3fphkxyf5o5bm.cloudfront.net/image-resize/format%3Dwebp%2Cw%3D1200/QwRY54Li1HMwD7oNfpb1eHx4IbLNqrkfQfhek5SJLV", "https://d3fphkxyf5o5bm.cloudfront.net/image-resize/format%3Dwebp%2Cw%3D720/QwRY54Li1HMwD7oNfp1aXB0I0MG2j3i1IjF1AK358L", "https://guide.arcticcampers.no/site/assets/files/3165/circle_k_evenes.jpg", "https://images.squarespace-cdn.com/content/v1/56e158022fe131436a22cec6/27be5333-db82-48c5-a4f7-ca1e27675f3f/lofoten33.jpg", "https://photos.plugshare.com/photos/1170706.jpg", "https://vcdn.polarismedia.no/99550076-1434-48ea-8f7c-e23137bdb73e?fit=crop&amp;h=630&amp;q=80&amp;tight=true&amp;w=1200"];

async function cachePhotos(cache){
  for(const url of REMOTE){
    try{
      const req=new Request(url,{mode:'no-cors',cache:'reload'});
      const hit=await cache.match(req,{ignoreSearch:true});
      if(!hit){const res=await fetch(req); await cache.put(req,res);}
    }catch(e){}
  }
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  await c.addAll(LOCAL);
  await cachePhotos(c);
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith('europe-roadbook-v')&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(r=>{
      const cp=r.clone(); caches.open(CACHE).then(c=>c.put(event.request,cp)); return r;
    }).catch(async()=>await caches.match(event.request,{ignoreSearch:true})||await caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(cached=>cached||fetch(event.request).then(r=>{
    const cp=r.clone(); caches.open(CACHE).then(c=>c.put(event.request,cp)); return r;
  })));
});
