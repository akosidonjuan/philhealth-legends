/* Legend of PhilHealth offline cache. Bump VERSION when you change any file. */
const VERSION='lop-v35';
const CORE=[
"./",
"index.html",
"rvs.json",
"manifest.webmanifest",
"icons/icon-192.png",
"icons/favicon-32.png",
"icons/icon-512.png",
"icons/apple-touch-icon.png",
"spr/b_crystal_denialzilla.png",
"spr/b_denial_dragon_lord.png",
"spr/b_denialzilla.png",
"spr/b_great_deduction.png",
"spr/b_hci_wyrm.png",
"spr/b_king_of_denials.png",
"spr/b_pending_king.png",
"spr/b_pending_serpent.png",
"spr/denied_boulder.png",
"spr/denied_pebble.png",
"spr/epar_dino.png",
"spr/h_barong.png",
"spr/h_barong_f.png",
"spr/h_gunner.png",
"spr/h_gunner_f.png",
"spr/h_king.png",
"spr/h_king_f.png",
"spr/h_mage.png",
"spr/h_mage_f.png",
"spr/h_miner.png",
"spr/h_miner_f.png",
"spr/h_rider.png",
"spr/h_rider_f.png",
"spr/h_sage.png",
"spr/h_sage_f.png",
"spr/h_sniper.png",
"spr/h_sniper_f.png",
"spr/h_thief.png",
"spr/h_thief_f.png",
"spr/h_warlock.png",
"spr/h_warlock_f.png",
"spr/late_slimes.png",
"spr/missing_ghost.png",
"spr/nosignal_goblin.png",
"spr/pending_slime.png",
"spr/returned_tortoise.png",
"spr/rulebook_dwarf.png",
"spr/signature_raccoon.png",
"spr/sprites.json",
"spr/wrongicd_imp.png",
"npc/ate_glo.gif",
"firebase-config.js",
"jobs/barong.gif",
"jobs/barong_f.gif",
"jobs/gunner.gif",
"jobs/gunner_f.gif",
"jobs/king.gif",
"jobs/king_f.gif",
"jobs/mage.gif",
"jobs/mage_f.gif",
"jobs/miner.gif",
"jobs/miner_f.gif",
"jobs/rider.gif",
"jobs/rider_f.gif",
"jobs/sage.gif",
"jobs/sage_f.gif",
"jobs/sniper.gif",
"jobs/sniper_f.gif",
"jobs/thief.gif",
"jobs/thief_f.gif",
"jobs/warlock.gif",
"jobs/warlock_f.gif"
];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('lop-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET') return;
  if(u.origin!==location.origin&&!/(^|\.)(jsdelivr\.net|googleapis\.com|gstatic\.com)$/.test(u.hostname)) return; // sign-in and database traffic always goes to the network
  if(u.origin!==location.origin&&/googleapis\.com$/.test(u.hostname)&&!/fonts\.googleapis\.com$/.test(u.hostname)) return;
  if(u.origin!==location.origin&&/gstatic\.com$/.test(u.hostname)&&!/fonts\.gstatic\.com$/.test(u.hostname)) return;
  if(u.pathname.endsWith('/firebase-config.js')){ e.respondWith(fetch(e.request).then(res=>{ const cp=res.clone(); caches.open(VERSION).then(c=>c.put(e.request,cp)); return res; }).catch(()=>caches.match(e.request))); return; }
  if(u.origin!==location.origin){ e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{ const cp=res.clone(); caches.open(VERSION).then(c=>c.put(e.request,cp)); return res; }).catch(()=>r))); return; }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{ if(res.ok){ const cp=res.clone(); caches.open(VERSION).then(c=>c.put(e.request,cp)); } return res; })));
});
