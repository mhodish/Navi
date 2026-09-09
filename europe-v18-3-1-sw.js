
const VIRTUAL_ICON_PATH='/Navi/europe-v18-3-1-icon.png';
const VIRTUAL_ICON_B64='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';
function virtualIconResponse(){
  const binary=atob(VIRTUAL_ICON_B64);
  const bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
  return new Response(bytes,{
    status:200,
    headers:{
      'Content-Type':'image/png',
      'Cache-Control':'public, max-age=31536000, immutable'
    }
  });
}

const CACHE='europe-roadbook-v18-3-1';
const LOCAL=['./','./index.html','./manifest.json'];
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
  const u=new URL(event.request.url);
  if(u.pathname.endsWith('/europe-v18-3-1-icon.png')){
    event.respondWith(Promise.resolve(virtualIconResponse()));
    return;
  }
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
