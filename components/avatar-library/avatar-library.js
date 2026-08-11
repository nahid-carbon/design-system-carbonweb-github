/* CarbonWeb Avatar & Photo Library
   Browsable library of employee photos (teal hex cutouts) and illustrated
   avatars (Carbon C-hex). Search, filter, sort, size, border toggle,
   detail dialog with download / copy-image / copy-img-tag.
   People whose image files are not present locally render as
   initials-on-gradient fallbacks (sync the full set from the
   "Carbon Avatar Library" claude.ai/design project). */

(function () {
  var host = document.getElementById('avlib-grid');
  if (!host) return;

  var PHOTOS = ["AbelGurfinkel","AlejandroDubon","AlexisGraham","AliZeb","AmyMorales","AnneSchneider","AshleyYoung","BrandonLuepkes","BryanKing","CaliChess","CarsonButcher","ChristianVilleda","DanielMoreland","DarrenArbuckle","EduardoHenriques","EdwinPecato","EricDarling","FredBaker","GreatPalmer","HayleyBoreen","HeatherGray","JackKubicek","JamesBlair","JessicaNiemi","JimCorrell","JobenVillodrez","JohnFresenko","JonHunter","JonathanGrad","JuanJoseZevallos","KatPierce","KennethStevenson","KholidRhiadi","KristyEvans","LarsKristensen","LucijaBravic","MarkAnley","MarkReed","MartinMeliendrez","MattRhoedes","MatthewFischer","MaxBrinton","MayTran","MeganKarges","MikeNeuman","MitchelMcLaughlin","NahidHasan","NatalieMuncy","NatashaZertetsky","NoamLevy","OliveLukic","ReidAllen","RemingtynRyan","RicardoSanabria","RickyTomer","SaeedIssa","SharonRojas","TomElner","TommyConroy","WaqasHaider"];
  var AVATARS = ["AbelGurfinkel","AhadHossin","AlejandroDubon","Ali","AmyMorales","AnneSchneider","Brandon","BrittanySmith","Bryan","Cali","CarmenAlonso","CarsonButcher","ChristianVilleda","CyrielleCaudrelier","DanielCrum","DarrenArbuckle","DeniseGlumcher","EduardoHenriques","EdwinPecato","EthanGallagher","Fred","GilOliveira","GreatPalmer","HayleyBoreen","HeatherGray","Jack","JackKubicek","JaiLynn","JenniferBidochka","JessNemei","Jim","Jimmy","JobenVillodrez","JohnMagee","Jon","JonHunter","Jose","Juan","JamesBlair","KatPierce","KaylinMuchichwa","KennethStevenson","KholidRhiadi","KristyEvans","LarsKristensen","LaurenStark","Lokesh","Lucia","LucijaBravic","Lucy","MarkAnley","MarkReed","MartinMeliendrez","Matt","MatthewFischer","MatveiIvanou","MaxBrinton","MaxwellGrundy","MeganKarges","Michelle","Mike","MilesHamilton","Miling","MitchMcLaughlin","NahidHasan","NatalieMuncy","NatashaZertetsky","NoamLevy","Olive","Paula","QShirazi","Ramsha","ReidAllen","RemingtynRyan","RicardoGuillen","RicardoSanabria","RickyTomer","RyanPalma","SaeedIssa","Shah","Sharon","Tino","TomElner","Tommy","Vic"];

  function prettify(slug) {
    return slug.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  }
  function initials(name) {
    return name.split(' ').map(function (w) { return w[0] || ''; }).join('').slice(0, 2).toUpperCase();
  }

  var assets = [];
  PHOTOS.forEach(function (slug) {
    assets.push({ id: 'photo-' + slug, slug: slug, name: prettify(slug), kind: 'photo',
      file: 'photos-cutout/' + slug + '.png', paired: AVATARS.indexOf(slug) !== -1, missing: false });
  });
  AVATARS.forEach(function (slug) {
    assets.push({ id: 'avatar-' + slug, slug: slug, name: prettify(slug), kind: 'avatar',
      file: 'avatars/' + slug + '.png', paired: PHOTOS.indexOf(slug) !== -1, missing: false });
  });

  var state = { q: '', filter: 'all', sort: 'az', size: 180, border: 'on' };
  var qInput = document.getElementById('avlib-q');
  var szInput = document.getElementById('avlib-sz');
  var toastEl = document.getElementById('avlib-toast');
  var dialog = document.getElementById('avlib-detail');

  // Probe which images exist; missing ones render initials fallbacks
  var pending = assets.length;
  assets.forEach(function (a) {
    var img = new Image();
    img.onload = function () { if (--pending === 0) render(); };
    img.onerror = function () { a.missing = true; if (--pending === 0) render(); };
    img.src = a.file;
  });

  document.getElementById('avlib-c-all').textContent = assets.length;
  document.getElementById('avlib-c-photo').textContent = PHOTOS.length;
  document.getElementById('avlib-c-avatar').textContent = AVATARS.length;
  document.getElementById('avlib-c-paired').textContent = assets.filter(function (a) { return a.paired; }).length;
  document.getElementById('avlib-stats').innerHTML =
    '<span><b>' + assets.length + '</b> assets</span>' +
    '<span><b>' + PHOTOS.length + '</b> photos</span>' +
    '<span><b>' + AVATARS.length + '</b> illustrations</span>';

  var toastT;
  function toast(msg) {
    toastEl.innerHTML = '<span class="check">✓</span>' + msg;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }

  function portraitDiv(a) {
    if (a.missing) {
      return '<div class="portrait is-missing" data-initials="' + initials(a.name) + '"></div>';
    }
    return '<div class="portrait" style="background-image:url(\'' + a.file + '\')"></div>';
  }
  function frame(a, extraStyle) {
    var cls = a.kind === 'avatar'
      ? 'illus-frame' + (state.border === 'off' ? ' borderless' : '')
      : 'photo-frame';
    return '<div class="' + cls + '"' + (extraStyle ? ' style="' + extraStyle + '"' : '') + '>' +
      '<div class="backplate"></div>' + portraitDiv(a) + '</div>';
  }

  function applyFilters() {
    var q = state.q.toLowerCase().trim();
    var list = assets.filter(function (a) {
      if (state.filter === 'photo' && a.kind !== 'photo') return false;
      if (state.filter === 'avatar' && a.kind !== 'avatar') return false;
      if (state.filter === 'paired' && !a.paired) return false;
      if (q && a.name.toLowerCase().indexOf(q) === -1 && a.slug.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    if (state.sort === 'az') list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    if (state.sort === 'za') list.sort(function (a, b) { return b.name.localeCompare(a.name); });
    if (state.sort === 'dept') list.sort(function (a, b) { return (a.kind + a.name).localeCompare(b.kind + b.name); });
    return list;
  }

  function makeSection(title, desc, items) {
    var sec = document.createElement('section');
    sec.className = 'group';
    if (title) {
      sec.innerHTML = '<div class="group-head"><h2>' + title + '</h2><span class="desc">' + (desc || '') + '</span><span class="pill">' + items.length + '</span></div>';
    }
    var grid = document.createElement('div');
    grid.className = 'grid';
    items.forEach(function (a) { grid.appendChild(card(a)); });
    sec.appendChild(grid);
    return sec;
  }

  function card(a) {
    var el = document.createElement('div');
    el.className = 'card';
    el.innerHTML =
      '<div class="hex-wrap">' + frame(a) + '</div>' +
      '<div class="name" title="' + a.name + '">' + a.name + '</div>' +
      '<div class="meta">' + (a.kind === 'photo' ? 'photo' : 'illustrated') +
        (a.paired ? ' · pair' : '') + (a.missing ? ' · not synced' : '') + '</div>';
    el.addEventListener('click', function () { openDetail(a); });
    return el;
  }

  function render() {
    var list = applyFilters();
    document.documentElement.style.setProperty('--card-min', state.size + 'px');
    host.innerHTML = '';
    if (!list.length) {
      host.innerHTML = '<div class="empty"><h3>No matches</h3><p>Try a different search or filter.</p></div>';
      return;
    }
    if (state.sort === 'dept') {
      var photos = list.filter(function (a) { return a.kind === 'photo'; });
      var avs = list.filter(function (a) { return a.kind === 'avatar'; });
      if (photos.length) host.appendChild(makeSection('Employee photos', 'hexagon-cropped portrait photos · real-people contexts', photos));
      if (avs.length) host.appendChild(makeSection('Illustrated avatars', 'stylized hexagon avatars · personas, placeholders', avs));
    } else {
      host.appendChild(makeSection(null, null, list));
    }
  }

  function findPair(a) {
    var other = a.kind === 'photo' ? 'avatar' : 'photo';
    for (var i = 0; i < assets.length; i++) {
      if (assets[i].kind === other && assets[i].slug === a.slug) return assets[i];
    }
    return null;
  }

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    ta.remove();
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { legacyCopy(text); });
    }
    legacyCopy(text);
    return Promise.resolve();
  }

  function openDetail(a) {
    var pair = findPair(a);
    var imgTag = '<img src="' + a.file + '" alt="' + a.name + '" width="120" height="130" style="clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);object-fit:cover" />';
    dialog.innerHTML =
      '<div class="detail-inner">' +
        '<div class="detail-preview">' + frame(a, 'width:min(80%,300px)') + '</div>' +
        '<div class="detail-side">' +
          '<button class="close-x" aria-label="Close">✕</button>' +
          '<span class="kind-pill">' + (a.kind === 'photo' ? '◐ Hexagon photo' : '✦ Illustrated avatar') + '</span>' +
          '<h3 class="name-big">' + a.name + '</h3>' +
          '<div>' +
            '<div class="detail-row"><b>File</b><span class="val">' + a.file + '</span></div>' +
            '<div class="detail-row"><b>Format</b><span class="val">PNG · hexagon-clipped</span></div>' +
            '<div class="detail-row"><b>Use for</b><span class="val">' + (a.kind === 'photo' ? 'real-people imagery' : 'personas / placeholders') + '</span></div>' +
            '<div class="detail-row"><b>Paired ' + (a.kind === 'photo' ? 'illustration' : 'photo') + '</b>' +
              (pair ? '<button class="btn2" data-pair="' + pair.id + '">View pair →</button>'
                    : '<span class="val" style="font-style:italic">none available</span>') +
            '</div>' +
          '</div>' +
          '<div class="detail-actions">' +
            '<a class="btn2 primary" href="' + a.file + '" download="' + a.slug + '.png">Download PNG</a>' +
            '<button class="btn2" data-act="path">Copy path</button>' +
            '<button class="btn2" data-act="tag">Copy &lt;img&gt; tag</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    dialog.showModal();
    dialog.querySelector('.close-x').onclick = function () { dialog.close(); };
    dialog.querySelectorAll('[data-act]').forEach(function (b) {
      b.onclick = function () {
        if (b.dataset.act === 'path') { copyText(a.file); toast('Path copied'); }
        if (b.dataset.act === 'tag') { copyText(imgTag); toast('img tag copied'); }
      };
    });
    var pairBtn = dialog.querySelector('[data-pair]');
    if (pairBtn) pairBtn.onclick = function () {
      dialog.close();
      var target = null;
      assets.forEach(function (x) { if (x.id === pairBtn.dataset.pair) target = x; });
      setTimeout(function () { if (target) openDetail(target); }, 80);
    };
  }

  qInput.addEventListener('input', function (e) { state.q = e.target.value; render(); });
  szInput.addEventListener('input', function (e) { state.size = +e.target.value; render(); });

  function segWire(id, key) {
    document.querySelectorAll('#' + id + ' button').forEach(function (b) {
      b.onclick = function () {
        document.querySelectorAll('#' + id + ' button').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        state[key] = b.dataset.v;
        render();
      };
    });
  }
  segWire('avlib-filter', 'filter');
  segWire('avlib-sort', 'sort');
  segWire('avlib-border', 'border');

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); qInput.focus(); qInput.select(); }
  });
})();
