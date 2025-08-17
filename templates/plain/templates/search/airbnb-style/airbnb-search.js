/* USWDS Airbnb-style Search demo (static) */
(function(){
  // --- Mock data ---
  const data = [
    { id:1, title:'Bright 1BR near Capitol', city:'Washington', state:'DC', type:'apartment', beds:1, price:140, rating:4.5, lat:38.8895, lng:-77.0353, img:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop' },
    { id:2, title:'Row house w/ patio', city:'Baltimore', state:'MD', type:'house', beds:3, price:220, rating:4.7, lat:39.2904, lng:-76.6122, img:'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop' },
    { id:3, title:'Downtown studio', city:'Denver', state:'CO', type:'studio', beds:0, price:110, rating:4.2, lat:39.7392, lng:-104.9903, img:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop' },
    { id:4, title:'Modern 2BR apartment', city:'Boston', state:'MA', type:'apartment', beds:2, price:195, rating:4.6, lat:42.3601, lng:-71.0589, img:'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop' },
    { id:5, title:'Quiet cottage', city:'Boulder', state:'CO', type:'house', beds:2, price:180, rating:4.8, lat:40.01499, lng:-105.2705, img:'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop' }
  ];

  const destinations = [...new Set(data.map(d => d.city + ', ' + d.state))];

  // --- DOM refs ---
  const destSelect = document.getElementById('destination');
  const resultsList = document.getElementById('results-list');
  const resultsMap = document.getElementById('results-map');
  const mapPins = document.getElementById('map-pins');
  const viewListBtn = document.getElementById('view-list');
  const viewMapBtn = document.getElementById('view-map');
  const sortSelect = document.getElementById('sort-select');
  const resetAll = document.getElementById('reset-all');
  const priceRange = document.getElementById('price-range');
  const priceOut = document.getElementById('price-output');
  const applyFilters = document.getElementById('apply-filters');
  const form = document.getElementById('search-form');
  const startDateEl = document.getElementById('start-date');
  const endDateEl = document.getElementById('end-date');

  // Populate destinations in select (for USWDS combo-box)
  function populateDestinations(){
    destinations.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      destSelect.appendChild(opt);
    });
  }

  function cardTemplate(item){
    return `
    <div class="usa-card margin-bottom-2">
      <div class="usa-card__container">
        <div class="usa-card__header">
          <h2 class="usa-card__heading">${item.title}</h2>
        </div>
        <div class="usa-card__media usa-card__img">
          <img src="${item.img}" alt="Photo of ${item.title}">
        </div>
        <div class="usa-card__body">
          <div class="card__meta">
            <span class="inline-badge">${item.type}</span>
            <span class="margin-left-1">${item.city}, ${item.state}</span>
          </div>
          <div class="margin-top-1">
            <span class="card__price">$${item.price}</span> / night
            <span class="margin-left-2">⭐ ${item.rating}</span>
            <span class="margin-left-2">🛏 ${item.beds}</span>
          </div>
        </div>
        <div class="usa-card__footer">
          <button class="usa-button usa-button--outline">View details</button>
        </div>
      </div>
    </div>`;
  }

  function renderList(items){
    resultsList.innerHTML = items.map(cardTemplate).join('');
  }

  function renderMap(items){
    // very light fake pin layout: scatter by lat/lng into container
    const rect = resultsMap.getBoundingClientRect();
    const latMin = Math.min(...items.map(i=>i.lat)), latMax = Math.max(...items.map(i=>i.lat));
    const lngMin = Math.min(...items.map(i=>i.lng)), lngMax = Math.max(...items.map(i=>i.lng));
    function scale(v, min, max, dim){ if(max===min) return dim/2; return (v-min)/(max-min) * dim; }
    mapPins.innerHTML = items.map(i => {
      const x = scale(i.lng, lngMin, lngMax, rect.width);
      const y = scale(i.lat, latMax, latMin, rect.height); // invert lat for y
      return `<div class="pin" style="left:${x}px;top:${y}px"><div class="dot" title="${i.title}"></div></div>`;
    }).join('');
  }

  function toggleView(which){
    const isList = which === 'list';
    resultsList.classList.toggle('display-none', !isList);
    resultsMap.classList.toggle('display-none', isList);
    viewListBtn.classList.toggle('usa-button--outline', !isList);
    viewMapBtn.classList.toggle('usa-button--outline', isList);
    viewListBtn.setAttribute('aria-pressed', String(isList));
    viewMapBtn.setAttribute('aria-pressed', String(!isList));
    if(!isList){ renderMap(currentItems); }
  }

  // Filtering
  let filters = { types:new Set(), beds:'', price:500 };
  let currentItems = [...data];

  function readFiltersFromUI(){
    filters.types = new Set(['house','apartment','studio'].filter(id => {
      const el = document.getElementById('type-'+id);
      return el && el.checked;
    }));
    const beds = document.querySelector('input[name="beds"]:checked');
    filters.beds = beds ? beds.value : '';
    filters.price = parseInt(priceRange.value,10) || 500;
  }

  function applyFilter(items){
    const dest = destSelect.value.trim().toLowerCase();
    const sd = startDateEl.value;
    const ed = endDateEl.value;
    return items.filter(i => {
      let ok = true;
      if(dest){
        const label = (i.city + ', ' + i.state).toLowerCase();
        ok = ok && label.includes(dest);
      }
      if(filters.types.size){
        ok = ok && filters.types.has(i.type);
      }
      if(filters.beds){
        ok = ok && i.beds >= Number(filters.beds);
      }
      ok = ok && i.price <= filters.price;
      // date range mock: no real availability calendar — demo validates order only
      if(sd && ed){
        ok = ok && sd <= ed;
      }
      return ok;
    });
  }

  function sortItems(items){
    const v = sortSelect.value;
    const arr = [...items];
    if(v === 'price-asc') arr.sort((a,b)=>a.price-b.price);
    if(v === 'price-desc') arr.sort((a,b)=>b.price-a.price);
    if(v === 'rating-desc') arr.sort((a,b)=>b.rating-a.rating);
    return arr;
  }

  function update(){
    readFiltersFromUI();
    currentItems = sortItems(applyFilter(data));
    renderList(currentItems);
    if(!resultsMap.classList.contains('display-none')) renderMap(currentItems);
  }

  // Event wiring
  viewListBtn.addEventListener('click', ()=>toggleView('list'));
  viewMapBtn.addEventListener('click', ()=>toggleView('map'));
  sortSelect.addEventListener('change', update);
  priceRange.addEventListener('input', ()=>{ priceOut.textContent = '$' + priceRange.value; });
  priceRange.addEventListener('change', update);
  document.getElementById('apply-filters').addEventListener('click', ()=>{
    update();
    document.querySelector('#filters-modal [data-close-modal]').click();
  });
  document.getElementById('reset-all').addEventListener('click', ()=>{
    destSelect.value = '';
    startDateEl.value = '';
    endDateEl.value = '';
    ['house','apartment','studio'].forEach(id => { const el = document.getElementById('type-'+id); if(el) el.checked=false; });
    document.getElementById('beds-any').checked = true;
    priceRange.value = 500; priceOut.textContent = '$500';
    sortSelect.value = 'relevance';
    update();
  });
  document.getElementById('search-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    update();
  });
  destSelect.addEventListener('change', update);

  // Init
  populateDestinations();
  update();
})();
