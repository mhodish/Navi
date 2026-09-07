const CACHE_NAME='bethel-roadbook-v17-1';
const APP_SHELL=['./','./index.html','./bethel-v17-1.webmanifest','./bethel-v17-1-icon-192.png','./bethel-v17-1-icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bethel-roadbook-v')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,cp));return r;})
   .catch(async()=>await caches.match(e.request,{ignoreSearch:true})||await caches.match('./',{ignoreSearch:true})||await caches.match('./index.html',{ignoreSearch:true})));
  return;
 }
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(c=>c||fetch(e.request)));
});
