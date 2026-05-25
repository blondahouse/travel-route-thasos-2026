(() => {
  const leafletCss = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  const leafletJs = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

  const point = {
    chisinau: [46.9277, 28.9309],
    iasi: [47.1585, 27.6014],
    piatra: [46.9296, 26.3709],
    bicaz: [46.8110, 25.8140],
    redLake: [46.7930, 25.7940],
    brasov: [45.6427, 25.5887],
    bran: [45.5155, 25.3670],
    rasnov: [45.5908, 25.4606],
    zarnesti: [45.5607, 25.3170],
    poiana: [45.5969, 25.5522],
    cartisoara: [45.7147, 24.5790],
    balea: [45.6025, 24.6161],
    vidraru: [45.3660, 24.6330],
    curtea: [45.1406, 24.6688],
    belogradchik: [43.6270, 22.6830],
    sofia: [42.6977, 23.3219],
    melnik: [41.5230, 23.3930],
    keramoti: [40.8550, 24.7060],
    limenas: [40.7780, 24.7090],
    goldenBeach: [40.7220, 24.7560],
    panagia: [40.7320, 24.7310],
    paradise: [40.6810, 24.7850],
    aliki: [40.6030, 24.7400],
    monastery: [40.6060, 24.7260],
    kardzhali: [41.6420, 25.3680],
    haskovo: [41.9340, 25.5550],
    stara: [42.4258, 25.6345],
    veliko: [43.0757, 25.6172],
    ruse: [43.8356, 25.9657],
    giurgiu: [43.9037, 25.9699],
    otp: [44.5711, 26.0850]
  };

  const routes = {
    full: {
      title: 'Весь маршрут · Chișinău → Thasos → Bucharest Airport',
      segments: [
        { name: 'Moldova / Romania', color: '#2563eb', pts: ['chisinau','iasi','piatra','bicaz','redLake','brasov'] },
        { name: 'Transylvania / mountains', color: '#db7c26', pts: ['brasov','bran','cartisoara','balea','vidraru','curtea'] },
        { name: 'Outbound Bulgaria / Greece', color: '#7c3aed', pts: ['curtea','belogradchik','sofia','melnik','keramoti','limenas','goldenBeach'] },
        { name: 'Thasos stay', color: '#0f8ea8', pts: ['goldenBeach','panagia','limenas','paradise','aliki','monastery','goldenBeach'] },
        { name: 'Return', color: '#16a34a', pts: ['goldenBeach','limenas','keramoti','kardzhali','haskovo','stara','veliko','ruse','giurgiu','otp'] }
      ],
      markers: ['chisinau','iasi','piatra','brasov','bran','balea','curtea','belogradchik','sofia','melnik','keramoti','goldenBeach','veliko','otp']
    },
    day1: { title: '21.09 · Chișinău → Iași → Piatra Neamț', segments: [{color:'#2563eb', pts:['chisinau','iasi','piatra']}], markers:['chisinau','iasi','piatra'] },
    day2: { title: '22.09 · Piatra Neamț → Bicaz Gorges → Red Lake → Brașov', segments: [{color:'#2563eb', pts:['piatra','bicaz','redLake','brasov']}], markers:['piatra','bicaz','redLake','brasov'] },
    brasovDay: { title: '23.09 · Brașov / Bran options', segments: [{color:'#db7c26', pts:['brasov','bran','rasnov','zarnesti','poiana','brasov']}], markers:['brasov','bran','rasnov','zarnesti','poiana'] },
    transfagarasan: { title: '24.09 · Transfăgărășan Plan A / Plan B', segments: [{name:'Plan A', color:'#2563eb', pts:['brasov','cartisoara','balea','vidraru','curtea']},{name:'Plan B', color:'#db7c26', pts:['brasov','bran','curtea']}], markers:['brasov','cartisoara','balea','vidraru','bran','curtea'] },
    day5: { title: '25.09 · Curtea de Argeș → Belogradchik → Sofia', segments: [{color:'#7c3aed', pts:['curtea','belogradchik','sofia']}], markers:['curtea','belogradchik','sofia'] },
    day6: { title: '26.09 · Sofia → Melnik → Keramoti → Golden Beach', segments: [{color:'#7c3aed', pts:['sofia','melnik','keramoti','limenas','goldenBeach']}], markers:['sofia','melnik','keramoti','limenas','goldenBeach'] },
    thasos: { title: '27.09–01.10 · Thasos island points', segments: [{color:'#0f8ea8', pts:['goldenBeach','panagia','limenas','paradise','aliki','monastery','goldenBeach']}], markers:['goldenBeach','panagia','limenas','paradise','aliki','monastery'] },
    return1: { title: '02.10 · Golden Beach → Veliko Tarnovo', segments: [{color:'#16a34a', pts:['goldenBeach','limenas','keramoti','kardzhali','haskovo','stara','veliko']}], markers:['goldenBeach','keramoti','kardzhali','haskovo','stara','veliko'] },
    return2: { title: '03.10 · Veliko Tarnovo → Bucharest Airport', segments: [{color:'#16a34a', pts:['veliko','ruse','giurgiu','otp']}], markers:['veliko','ruse','giurgiu','otp'] }
  };

  const pointLabel = {
    chisinau: 'Chișinău Airport', iasi: 'Iași', piatra: 'Piatra Neamț', bicaz: 'Bicaz Gorges', redLake: 'Red Lake', brasov: 'Brașov', bran: 'Bran Castle', rasnov: 'Râșnov', zarnesti: 'Zărnești', poiana: 'Poiana Brașov', cartisoara: 'Cârțișoara', balea: 'Bâlea Lake', vidraru: 'Vidraru Dam', curtea: 'Curtea de Argeș', belogradchik: 'Belogradchik', sofia: 'Sofia', melnik: 'Melnik', keramoti: 'Keramoti', limenas: 'Limenas', goldenBeach: 'Golden Beach', panagia: 'Panagia', paradise: 'Paradise Beach', aliki: 'Aliki', monastery: 'Archangel Michael Monastery', kardzhali: 'Kardzhali', haskovo: 'Haskovo', stara: 'Stara Zagora', veliko: 'Veliko Tarnovo', ruse: 'Ruse', giurgiu: 'Giurgiu', otp: 'Bucharest OTP'
  };

  const googleRoute = (keys) => {
    const origin = pointLabel[keys[0]];
    const destination = pointLabel[keys[keys.length - 1]];
    const waypoints = keys.slice(1, -1).map(k => pointLabel[k]).join('|');
    const params = new URLSearchParams({ api: '1', origin, destination, travelmode: 'driving' });
    if (waypoints) params.set('waypoints', waypoints);
    return `https://www.google.com/maps/dir/?${params}`;
  };

  function addAssets() {
    if (!document.querySelector('link[data-leaflet]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet'; link.href = leafletCss; link.dataset.leaflet = 'true';
      document.head.appendChild(link);
    }
    const style = document.createElement('style');
    style.textContent = `
      .route-map-section{margin:0 0 48px;scroll-margin-top:86px}.map-card{background:rgba(255,255,255,.92);border:1px solid rgba(15,23,42,.08);border-radius:28px;box-shadow:0 18px 45px rgba(15,23,42,.14);overflow:hidden}.map-head{padding:18px 22px;color:white;background:linear-gradient(135deg,#172033,#0f8ea8)}.map-head h3{margin:0 0 6px;font-size:24px;letter-spacing:-.03em}.map-head p{margin:0;color:rgba(255,255,255,.78);line-height:1.45}.route-map{height:430px;width:100%;background:#e2e8f0}.mini-route-map{height:260px;width:100%;border-radius:18px;background:#e2e8f0}.mini-map-card{margin:16px 0 8px;border:1px solid rgba(15,23,42,.10);border-radius:20px;overflow:hidden;background:white}.mini-map-head{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;padding:12px 14px;border-bottom:1px solid rgba(15,23,42,.08)}.mini-map-head strong{font-size:14px}.map-button{display:inline-flex;align-items:center;justify-content:center;padding:9px 12px;border-radius:999px;background:#111827;color:white;text-decoration:none;font-size:12px;font-weight:850}.map-legend{display:flex;gap:8px;flex-wrap:wrap;padding:12px 14px;background:#f8fafc;border-top:1px solid rgba(15,23,42,.08)}.legend-item{display:inline-flex;align-items:center;gap:7px;color:#475569;font-size:13px}.legend-line{width:22px;height:4px;border-radius:999px;background:var(--legend-color)}.leaflet-popup-content{font-family:Inter,system-ui,sans-serif}.leaflet-container{font-family:Inter,system-ui,sans-serif}@media(max-width:560px){.route-map{height:360px}.mini-route-map{height:230px}.mini-map-head{align-items:flex-start;flex-direction:column}}
    `;
    document.head.appendChild(style);
  }

  function loadLeaflet() {
    return new Promise((resolve, reject) => {
      if (window.L) return resolve();
      const script = document.createElement('script');
      script.src = leafletJs;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  function drawMap(containerId, config, compact = false) {
    const el = document.getElementById(containerId);
    if (!el || !window.L || el.dataset.mapReady) return;
    el.dataset.mapReady = 'true';
    const map = L.map(el, { scrollWheelZoom: !compact, zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    const bounds = [];
    config.segments.forEach((seg) => {
      const coords = seg.pts.map(k => point[k]);
      coords.forEach(c => bounds.push(c));
      L.polyline(coords, { color: seg.color || '#db7c26', weight: compact ? 4 : 5, opacity: .86, smoothFactor: 1 }).addTo(map).bindPopup(seg.name || config.title);
    });
    (config.markers || []).forEach((k) => {
      const c = point[k]; if (!c) return;
      bounds.push(c);
      L.circleMarker(c, { radius: compact ? 5 : 6, color: '#111827', weight: 2, fillColor: '#fff', fillOpacity: 1 }).addTo(map).bindPopup(`<strong>${pointLabel[k]}</strong>`);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: compact ? [18, 18] : [28, 28] });
    setTimeout(() => map.invalidateSize(), 150);
  }

  function insertOverviewMap() {
    const overview = document.getElementById('overview');
    if (!overview || document.getElementById('map-overview')) return;
    const section = document.createElement('section');
    section.id = 'map-overview';
    section.className = 'route-map-section';
    section.innerHTML = `
      <div class="section-head"><h2>Карта маршрута</h2><p class="section-note">Упрощённая схема маршрута: линии соединяют ключевые точки, а точная автомобильная навигация открывается через Google Maps.</p></div>
      <div class="map-card"><div class="map-head"><h3>Full route · 21.09–03.10</h3><p>Chișinău → Romania / Transylvania → Bulgaria → Thasos → Veliko Tarnovo → Bucharest Airport</p></div><div id="full-route-map" class="route-map"></div><div class="map-legend">${routes.full.segments.map(s => `<span class="legend-item"><span class="legend-line" style="--legend-color:${s.color}"></span>${s.name}</span>`).join('')}</div></div>`;
    overview.insertAdjacentElement('afterend', section);
    drawMap('full-route-map', routes.full, false);
  }

  function insertNavLink() {
    const nav = document.querySelector('.navlinks');
    if (nav && !nav.querySelector('a[href="#map-overview"]')) {
      const a = document.createElement('a');
      a.href = '#map-overview';
      a.textContent = 'Карта';
      nav.insertBefore(a, nav.firstChild);
    }
  }

  const dayMapTargets = [
    { route: 'day1', match: 'Chișinău → Iași → Piatra Neamț', keys: ['chisinau','iasi','piatra'] },
    { route: 'day2', match: 'Piatra Neamț → Bicaz Gorges', keys: ['piatra','bicaz','redLake','brasov'] },
    { route: 'brasovDay', match: '23.09 · Brașov / Bran day', section: '#brasov', keys: ['brasov','bran','rasnov','zarnesti','poiana','brasov'] },
    { route: 'transfagarasan', match: '24.09 · Transfăgărășan', section: '#transfagarasan', keys: ['brasov','cartisoara','balea','vidraru','curtea'] },
    { route: 'day5', match: 'Curtea de Argeș → Belogradchik → Sofia', keys: ['curtea','belogradchik','sofia'] },
    { route: 'day6', match: 'Sofia → Melnik → Keramoti → Golden Beach', keys: ['sofia','melnik','keramoti','limenas','goldenBeach'] },
    { route: 'thasos', match: '27.09–01.10 · отдых на Thasos', section: '#thasos', keys: ['goldenBeach','panagia','limenas','paradise','aliki','monastery','goldenBeach'] },
    { route: 'return1', match: 'Golden Beach → Keramoti → Stara Zagora area → Veliko Tarnovo', keys: ['goldenBeach','limenas','keramoti','kardzhali','haskovo','stara','veliko'] },
    { route: 'return2', match: 'Veliko Tarnovo → Bucharest Henri Coandă Airport', keys: ['veliko','ruse','giurgiu','otp'] }
  ];

  function findAnchor(item) {
    if (item.section) return document.querySelector(item.section + ' .section-head');
    const h3 = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes(item.match));
    return h3 ? h3.parentElement : null;
  }

  function insertMiniMaps() {
    dayMapTargets.forEach((item) => {
      const anchor = findAnchor(item);
      if (!anchor) return;
      const id = `map-${item.route}`;
      if (document.getElementById(id)) return;
      const card = document.createElement('div');
      card.className = 'mini-map-card';
      card.innerHTML = `<div class="mini-map-head"><strong>${routes[item.route].title}</strong><a class="map-button" href="${googleRoute(item.keys)}" target="_blank" rel="noreferrer">Open in Google Maps</a></div><div id="${id}" class="mini-route-map"></div>`;
      const insertAfter = anchor.querySelector('.steps') || anchor;
      insertAfter.insertAdjacentElement('afterend', card);
      drawMap(id, routes[item.route], true);
    });
  }

  async function init() {
    addAssets();
    await loadLeaflet();
    insertNavLink();
    insertOverviewMap();
    insertMiniMaps();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
