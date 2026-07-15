/**
 * හෙළ සිරිත · Main Application
 * Firebase Integration + All Features
 */

import { gatewayArch, sectionDivider, floralBorder, pineappleBorder, sesath, punkalasa, mangalaLamp } from './ornaments.js';

// Firebase Config
const FB_VER = "12.14.0";
const FB_URL = `https://www.gstatic.com/firebasejs/${FB_VER}`;
const FB_CONFIG = {
  apiKey: "AIzaSyD2HEO-yoV6RLsD1iYgj_EocItqotAh3Qk",
  authDomain: "helasiritha-official.firebaseapp.com",
  projectId: "helasiritha-official",
  storageBucket: "helasiritha-official.firebasestorage.app",
  messagingSenderId: "993883662089",
  appId: "1:993883662089:web:b583123218df07be9155d8",
  measurementId: "G-PBJWLXWVD9"
};

// State
const state = {
  ready: false,
  lang: 'si',
  site: {
    brideNameSi: "කෞශානි", groomNameSi: "ගෞරව",
    brideNameEn: "Kaushani", groomNameEn: "Gaurawa",
    weddingDateISO: "2028-01-12T09:15:00+05:30",
    ceremonyTimeLabel: "පෙ.ව. 9.15 සිට",
    venueName: "The Epitome Hotel",
    venueAddress: "කුරුණගල",
    mapUrl: "",
    coupleImageUrl: "",
    loveNoteSi: "",
    allowLiquorPref: true,
    allowDietaryPref: true
  },
  theme: { primary: "#C9A574", secondary: "#F5E6D3", accent: "#B8860B", surface: "#F5E6D3", text: "#2C1810" },
  visibility: { invitationCard: true, countdown: true, rsvp: true, agenda: true, gallery: true, blessings: true, loveNote: true },
  stats: { totalGuests: 0, confirmed: 0, pending: 0, declined: 0 },
  agenda: [],
  gallery: [],
  blessings: []
};

// Helpers
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function optImgUrl(url, w) {
  if (!url || !url.includes('/upload/')) return url || '';
  const tx = ['f_auto', 'q_auto'];
  if (w) tx.push(`w_${w}`, 'c_limit', 'dpr_auto');
  return url.replace('/upload/', `/upload/${tx.join(',')}/`);
}

function formatDateSi(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const months = ["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්"];
  return `${d.getFullYear()} ${months[d.getMonth()]} ${d.getDate()}`;
}

// Firebase Init
let db, firestore;
async function initFirebase() {
  const { initializeApp } = await import(`${FB_URL}/firebase-app.js`);
  firestore = await import(`${FB_URL}/firebase-firestore.js`);
  const app = initializeApp(FB_CONFIG);
  db = firestore.getFirestore(app);
}

// Real-time Listeners
function startListeners() {
  const { doc, onSnapshot, collection, query, orderBy, where, limit } = firestore;

  onSnapshot(doc(db, 'config', 'site'), snap => {
    if (snap.exists()) state.site = { ...state.site, ...snap.data() };
    state.ready = true;
    render();
  });

  onSnapshot(doc(db, 'config', 'theme'), snap => {
    if (snap.exists()) state.theme = { ...state.theme, ...snap.data() };
    applyTheme(state.theme);
  });

  onSnapshot(doc(db, 'config', 'visibility'), snap => {
    if (snap.exists()) state.visibility = { ...state.visibility, ...snap.data() };
    render();
  });

  onSnapshot(doc(db, 'config', 'stats'), snap => {
    if (snap.exists()) state.stats = { ...state.stats, ...snap.data() };
    render();
  });

  onSnapshot(query(collection(db, 'agenda'), orderBy('order', 'asc')), snap => {
    state.agenda = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(d => d.visible !== false);
    render();
  });

  onSnapshot(query(collection(db, 'gallery'), orderBy('order', 'asc')), snap => {
    state.gallery = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    render();
  });

  onSnapshot(query(collection(db, 'blessings'), where('approved', '==', true), limit(100)), snap => {
    state.blessings = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    render();
  });

  applyTheme(state.theme);
}

function applyTheme(t) {
  const s = document.documentElement.style;
  s.setProperty('--c-primary', t.primary);
  s.setProperty('--c-secondary', t.secondary);
  s.setProperty('--c-accent', t.accent);
  s.setProperty('--c-surface', t.surface);
  s.setProperty('--c-ink', t.text);
}

// Guest Search
async function searchGuests(q) {
  const { collection, query, where, getDocs, orderBy, limit } = firestore;
  const n = String(q || '').toLowerCase().normalize('NFC').replace(/[\u200b-\u200d\uFEFF]/g, '').replace(/\s+/g, ' ').trim();
  if (n.length < 2) return [];
  
  let results = [];
  try {
    const snap = await getDocs(query(collection(db, 'guests'), where('searchTokens', 'array-contains', n), limit(25)));
    results = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {}
  
  if (!results.length) {
    try {
      const all = await getDocs(query(collection(db, 'guests'), orderBy('name'), limit(800)));
      results = all.docs.map(d => ({ id: d.id, ...d.data() })).filter(g => {
        const gn = String(g.name + ' ' + g.familyName).toLowerCase().normalize('NFC').replace(/[\u200b-\u200d\uFEFF]/g, '').replace(/\s+/g, ' ').trim();
        return gn.includes(n) || gn.replace(/\s/g, '').includes(n.replace(/\s/g, ''));
      }).slice(0, 25);
    } catch {}
  }
  return results;
}

// RSVP Submit
async function submitRsvp({ guestId, guestName, side, attending, takingLiquor, partySize, dietary }) {
  const { doc, setDoc } = firestore;
  const status = attending ? 'confirmed' : 'declined';
  await setDoc(doc(db, 'rsvps', guestId), {
    guestId, guestName: String(guestName || '').slice(0, 120),
    side: side || 'groom', status,
    takingLiquor: !!takingLiquor,
    partySize: Math.min(30, Math.max(1, Number(partySize) || 1)),
    dietary: String(dietary || '').slice(0, 280),
    respondedAt: Date.now()
  }, { merge: true });
  try { localStorage.setItem(`hs_rsvp_${guestId}`, JSON.stringify({ status, takingLiquor, partySize, dietary })); } catch {}
  return status;
}

// Blessing Submit
async function submitBlessing(name, msg) {
  const { collection, addDoc } = firestore;
  const message = String(msg || '').trim().slice(0, 400);
  if (!message) throw new Error('empty');
  await addDoc(collection(db, 'blessings'), {
    guestName: String(name || '').trim().slice(0, 60) || 'ආගන්තුකයෙක්',
    message, approved: false, createdAt: Date.now()
  });
}

// Countdown
let cdInterval;
function startCountdown() {
  clearInterval(cdInterval);
  cdInterval = setInterval(() => {
    const diff = new Date(state.site.weddingDateISO).getTime() - Date.now();
    if (isNaN(diff) || diff <= 0) {
      $('#cdGrid').style.display = 'none';
      $('#cdDone').style.display = 'block';
      clearInterval(cdInterval);
      return;
    }
    const s = Math.floor(diff / 1000);
    $('#cdDays').textContent = String(Math.floor(s / 86400)).padStart(3, '0');
    $('#cdHours').textContent = String(Math.floor(s % 86400 / 3600)).padStart(2, '0');
    $('#cdMins').textContent = String(Math.floor(s % 3600 / 60)).padStart(2, '0');
    $('#cdSecs').textContent = String(s % 60).padStart(2, '0');
  }, 1000);
}

// Calendar Export
function exportCalendar(site) {
  const e = new Date(site.weddingDateISO);
  const end = new Date(e.getTime() + 6 * 3600 * 1000);
  const fmt = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const escIcs = s => String(s || '').replace(/[,;\\]/g, c => '\\' + c).replace(/\n/g, '\\n');
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Helasiritha//Wedding//SI',
    'BEGIN:VEVENT', `UID:${Date.now()}@helasiritha`,
    `DTSTAMP:${fmt(new Date())}`, `DTSTART:${fmt(e)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${escIcs(site.groomNameSi + ' ◇ ' + site.brideNameSi + ' Wedding')}`,
    `LOCATION:${escIcs(site.venueName + ', ' + site.venueAddress)}`,
    'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Wedding tomorrow!', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'helasiritha-wedding.ics';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(a.href);
}

// Agenda Icons
const AG_ICONS = {
  poruwa: () => punkalasa('punkalasa'),
  lamp: () => mangalaLamp('mangala-lamp'),
  lotus: () => punkalasa('punkalasa'),
  ring: () => punkalasa('punkalasa'),
  feast: () => punkalasa('punkalasa'),
  sesath: () => sesath('sesath'),
  'default': () => punkalasa('punkalasa')
};

// RENDER
function render() {
  const s = state.site, v = state.visibility;

  // Visibility
  const show = (id, cond) => { const el = $(`#${id}`); if (el) el.hidden = !cond; };
  show('invitation', v.invitationCard);
  show('countdown', v.countdown);
  show('rsvp', v.rsvp);
  show('agenda', v.agenda && state.agenda.length > 0);
  show('gallery', v.gallery && state.gallery.length > 0);
  show('blessings', v.blessings);
  show('lovenote', v.loveNote);

  // Gateway ornaments
  $('#gatewayThorana').innerHTML = gatewayArch('gateway-arch');
  $('#gwLamp').innerHTML = mangalaLamp('mangala-lamp');

  // Hero
  if (s.coupleImageUrl) {
    $('#heroImg').src = optImgUrl(s.coupleImageUrl, 800);
    $('#heroImg').style.display = 'block';
    $('#heroEmpty').style.display = 'none';
  } else {
    $('#heroEmpty').style.display = '';
    $('#heroEmpty').innerHTML = `<div style="width:120px">${punkalasa('punkalasa')}</div><span>${esc(s.brideNameSi + ' & ' + s.groomNameSi)}</span>`;
  }

  $('#heroNames').innerHTML = `${esc(s.brideNameSi)} <span class="amp">&amp;</span> ${esc(s.groomNameSi)}`;
  $('#heroNamesSi').textContent = `${s.brideNameSi} & ${s.groomNameSi}`;

  const d = new Date(s.weddingDateISO);
  $('#heroDate').textContent = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  $('#heroVenue').textContent = `${s.venueName}, ${s.venueAddress}`;

  $('#heroThorana').innerHTML = sectionDivider('hero-thorana');
  $('#sesathL').innerHTML = sesath('sesath');
  $('#sesathR').innerHTML = sesath('sesath');

  // Invitation
  const dateStr = formatDateSi(s.weddingDateISO);
  $('#invBrideName').textContent = s.brideNameSi;
  $('#invGroomName').textContent = s.groomNameSi;
  $('#invPreBride').textContent = 'මහත්මා සහ එම මැතිනියගේ දරණීය දියණිය';
  $('#invPreGroom').textContent = 'මහත්මා සහ එම මැතිනියගේ ආදරණීය පුත්';
  $('#invLine').textContent = 'බගේ අගනා සහභාගීත්වය අපේක්ෂා කරමු';
  $('#invFrom').textContent = 'උභය පාර්ශවයේ ඥාති මිත්‍රාදීන් සමඟ';
  $('#invDate').textContent = dateStr;
  $('#invTime').textContent = s.ceremonyTimeLabel || '';
  $('#invVenue').textContent = s.venueName || '';
  $('#invThorana').innerHTML = sectionDivider('inv-divider');
  
  if (s.brideParentsSi || s.groomParentsSi) {
    $('#invParents').textContent = `${s.brideParentsSi} & ${s.groomParentsSi}`;
  }
  if (s.mapUrl) {
    $('#mapLink').href = s.mapUrl;
    $('#mapLink').style.display = '';
  } else {
    $('#mapLink').style.display = 'none';
  }

  // RSVP
  $('#rsvpSesathL').innerHTML = sesath('sesath');
  $('#rsvpSesathR').innerHTML = sesath('sesath');

  // Countdown lamp
  $('#mangalaLamp').innerHTML = mangalaLamp('mangala-lamp');
  $('#lampCount').textContent = state.stats.confirmed || 0;

  // Agenda
  const agendaList = $('#agendaList');
  if (state.agenda.length) {
    agendaList.innerHTML = state.agenda.map(item => {
      const iconFn = AG_ICONS[item.icon] || AG_ICONS['default'];
      return `<div class="ag-item reveal">
        <div class="ag-icon">${iconFn()}</div>
        <div class="ag-body">
          <div class="ag-time">${esc(item.timeLabel || '')}</div>
          <div class="ag-title">${esc(item.titleSi || '')}</div>
          ${item.descSi ? `<div class="ag-desc">${esc(item.descSi)}</div>` : ''}
        </div>
      </div>`;
    }).join('');
    $('#agendaEmpty').style.display = 'none';
  } else {
    agendaList.innerHTML = '';
    $('#agendaEmpty').style.display = '';
  }

  // Gallery
  const galGrid = $('#galleryGrid');
  if (state.gallery.length) {
    galGrid.innerHTML = state.gallery.map((item, i) => {
      const url = optImgUrl(item.url, 600);
      return `<figure data-idx="${i}"><img loading="lazy" src="${esc(url)}" alt="${esc(item.alt || '')}"/>${item.alt ? `<figcaption>${esc(item.alt)}</figcaption>` : ''}</figure>`;
    }).join('');
    $('#galleryEmpty').style.display = 'none';
    $$('figure', galGrid).forEach(fig => {
      fig.onclick = () => openLightbox(parseInt(fig.dataset.idx));
    });
  } else {
    galGrid.innerHTML = '';
    $('#galleryEmpty').style.display = '';
  }

  // Blessings
  const blessGrid = $('#blessGrid');
  if (state.blessings.length) {
    blessGrid.innerHTML = state.blessings.map(b => `
      <div class="bless-card">
        <div class="bless-msg">"${esc(b.message)}"</div>
        <div class="bless-name">— ${esc(b.guestName)}</div>
      </div>
    `).join('');
    $('#blessEmpty').style.display = 'none';
  } else {
    blessGrid.innerHTML = '';
    $('#blessEmpty').style.display = '';
  }

  // Footer
  $('#footKalasa').innerHTML = punkalasa('punkalasa');
  const wd = new Date(s.weddingDateISO);
  $('#footDate').textContent = `${String(wd.getDate()).padStart(2, '0')} · ${String(wd.getMonth() + 1).padStart(2, '0')} · ${wd.getFullYear()}`;

  // Love note
  if (s.loveNoteSi) {
    $('#loveText').innerHTML = s.loveNoteSi.split(/\n\s*\n/).map(p => esc(p.trim())).filter(Boolean).join('<br><br>');
  } else {
    $('#loveText').textContent = 'අපගේ මංගල උත්සවයට ඔබ පැමිණීමෙන් අප හට ලැබෙන සතුට වචනයෙන් ප්‍රකාශ කළ නොහැක. ඔබගේ ආශිර්වාදය අපගේ ජීවිතයේ විශේෂතම මොහොතට එළියක් වනු ඇත. ස්තූතියි.';
  }

  // Title
  document.title = `${s.brideNameSi} & ${s.groomNameSi} · මංගල ආරාධනය`;

  // WhatsApp share
  const waText = encodeURIComponent(`${s.brideNameSi} & ${s.groomNameSi} — ${dateStr}\n${s.venueName}\n${location.href}`);
  $('#waShare').href = `https://wa.me/?text=${waText}`;

  initReveal();
}

// Reveal on scroll
function initReveal() {
  const els = $$('.reveal:not(.in)');
  if (!els.length) return;
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  } else {
    els.forEach(el => el.classList.add('in'));
  }
}

// Gateway
function initGateway() {
  const gw = $('#gateway');
  const enter = () => {
    gw.classList.add('gone');
    setTimeout(() => { gw.style.display = 'none'; }, 1200);
    startCountdown();
  };
  $('#gwEnter').addEventListener('click', enter);
  $('#gwLamp').addEventListener('click', enter);
}

// Translate
function initTranslate() {
  const btn = $('#translateBtn');
  btn.addEventListener('click', () => {
    state.lang = state.lang === 'si' ? 'en' : 'si';
    document.body.classList.toggle('en', state.lang === 'en');
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'si';
    btn.querySelector('span').textContent = state.lang === 'si' ? 'English' : 'සිංහල';
    render();
    startCountdown();
  });
}

// RSVP Logic
let currentGuest = null, isAttending = true, takingLiquor = false, partySize = 1;

function showRsvpStage(stage) {
  $$('.rsvp-stage').forEach(el => el.classList.remove('active'));
  const id = stage === 'search' ? '#rsvpSearch' : stage === 'choose' ? '#rsvpChoose' : stage === 'details' ? '#rsvpDetails' : '#rsvpThanks';
  $(id).classList.add('active');
}

function initRSVP() {
  const input = $('#rsvpInput'), searchBtn = $('#rsvpSearchBtn'), results = $('#rsvpResults');

  async function doSearch() {
    const q = input.value.trim();
    if (q.length < 2) {
      results.innerHTML = `<p class="note">අකුරු 2ක්වත් ටයිප් කරන්න.</p>`;
      return;
    }
    results.innerHTML = `<p class="note">සොයමින්…</p>`;
    const guests = await searchGuests(q);
    if (!guests.length) {
      results.innerHTML = `<p class="note">ආරාධිතයෙකු හමු නොවීය.</p>`;
      return;
    }
    results.innerHTML = guests.map(g => `
      <button class="guest-pick" data-id="${g.id}">
        <div><div class="gn">${esc(g.name)}</div><div class="gfam">${esc(g.familyName || '')}</div></div>
        <span style="color:var(--gold)">→</span>
      </button>
    `).join('');
    $$('.guest-pick', results).forEach(btn => {
      btn.addEventListener('click', () => {
        const g = guests.find(x => x.id === btn.dataset.id);
        if (!g) return;
        currentGuest = g;
        showRsvpStage('choose');
        $('#rsvpGuestName').textContent = g.name;
        $('#rsvpGuestFamily').textContent = g.familyName || '';
      });
    });
  }

  searchBtn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  $('#rsvpYes').addEventListener('click', () => {
    isAttending = true;
    $('#rsvpYes').classList.add('sel');
    $('#rsvpNo').classList.remove('sel');
    partySize = 1;
    $('#partyVal').textContent = '1';
    $('#liquorField').style.display = state.site.allowLiquorPref ? '' : 'none';
    $('#dietaryField').style.display = state.site.allowDietaryPref ? '' : 'none';
    showRsvpStage('details');
  });

  $('#rsvpNo').addEventListener('click', () => {
    isAttending = false;
    $('#rsvpYes').classList.remove('sel');
    $('#rsvpNo').classList.add('sel');
    $('#liquorField').style.display = 'none';
    $('#dietaryField').style.display = 'none';
    showRsvpStage('details');
  });

  $('#partyMinus').addEventListener('click', () => { if (partySize > 1) { partySize--; $('#partyVal').textContent = partySize; } });
  $('#partyPlus').addEventListener('click', () => { if (partySize < 30) { partySize++; $('#partyVal').textContent = partySize; } });

  $('#liquorYes').addEventListener('click', () => { takingLiquor = true; $('#liquorYes').classList.add('sel'); $('#liquorNo').classList.remove('sel'); });
  $('#liquorNo').addEventListener('click', () => { takingLiquor = false; $('#liquorNo').classList.add('sel'); $('#liquorYes').classList.remove('sel'); });
  takingLiquor = false;
  $('#liquorNo').classList.add('sel');

  $('#rsvpBack').addEventListener('click', () => showRsvpStage('choose'));

  $('#rsvpSubmit').addEventListener('click', async () => {
    if (!currentGuest) return;
    const btn = $('#rsvpSubmit');
    btn.disabled = true;
    btn.textContent = 'යවමින්…';
    try {
      await submitRsvp({
        guestId: currentGuest.id,
        guestName: currentGuest.name,
        side: currentGuest.side,
        attending: isAttending,
        takingLiquor,
        partySize,
        dietary: $('#dietaryInput').value
      });
      $('#thanksTitle').textContent = 'ඔබගේ පිළිතුරට බෙහෙවින් ස්තතියි!';
      $('#thanksMsg').textContent = isAttending ? 'ඔබව මුණගැසීමට අපි මහත් ඕනෑකමින් සිටිමු.' : 'ඔබගේ සුබ පැතුම් අප හට ලැබේවා. ස්තූතියි.';
      showRsvpStage('thanks');
    } catch {
      alert('දෝයක් සිදු විය. නැවත උත්සාහ කරන්න.');
    }
    btn.disabled = false;
    btn.textContent = 'කාරුණික පිළිතුර එවන්න';
  });

  $('#rsvpChange').addEventListener('click', () => {
    currentGuest = null;
    showRsvpStage('search');
    input.value = '';
    results.innerHTML = '';
  });
}

// Blessings
function initBlessings() {
  $('#blessForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = $('#blessSubmit');
    btn.disabled = true;
    const orig = btn.textContent;
    btn.textContent = 'රචනා කරමින්…';
    try {
      await submitBlessing($('#blessName').value, $('#blessMsg').value);
      $('#blessName').value = '';
      $('#blessMsg').value = '';
      $('#blessThanks').style.display = '';
      setTimeout(() => $('#blessThanks').style.display = 'none', 5000);
    } catch {
      alert('කරුණාකර සුබ පැතුමක් ලියන්න.');
    }
    btn.disabled = false;
    btn.textContent = orig;
  });
}

// Lightbox
let lbIdx = 0;
function openLightbox(idx) {
  lbIdx = idx;
  const item = state.gallery[idx];
  if (!item) return;
  $('#lbImg').src = optImgUrl(item.url, 1600);
  $('#lbCap').textContent = item.alt || '';
  $('#lightbox').classList.add('open');
}

function initLightbox() {
  $('#lbClose').addEventListener('click', () => $('#lightbox').classList.remove('open'));
  $('#lbPrev').addEventListener('click', () => { lbIdx = (lbIdx - 1 + state.gallery.length) % state.gallery.length; openLightbox(lbIdx); });
  $('#lbNext').addEventListener('click', () => { lbIdx = (lbIdx + 1) % state.gallery.length; openLightbox(lbIdx); });
  $('#lightbox').addEventListener('click', e => { if (e.target === $('#lightbox')) $('#lightbox').classList.remove('open'); });
  document.addEventListener('keydown', e => {
    if (!$('#lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') $('#lightbox').classList.remove('open');
    if (e.key === 'ArrowLeft') { lbIdx = (lbIdx - 1 + state.gallery.length) % state.gallery.length; openLightbox(lbIdx); }
    if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % state.gallery.length; openLightbox(lbIdx); }
  });
}

// Topbar scroll
function initTopbar() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        $('#topbar').classList.toggle('solid', window.scrollY > 80);
        const toTop = $('#toTop');
        if (window.scrollY > 600) { toTop.style.opacity = '1'; toTop.style.pointerEvents = 'auto'; }
        else { toTop.style.opacity = '0'; toTop.style.pointerEvents = 'none'; }
        ticking = false;
      });
      ticking = true;
    }
  });
  $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Calendar
function initCalendar() {
  $('#calBtn').addEventListener('click', () => exportCalendar(state.site));
}

// Petals
function initPetals() {
  const c = $('#petals');
  if (document.body.classList.contains('lite') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const sz = 8 + Math.random() * 12;
    p.innerHTML = `<svg viewBox="0 0 20 20" width="${sz}" height="${sz}"><ellipse cx="10" cy="10" rx="8" ry="5" fill="currentColor" opacity=".5"/></svg>`;
    p.style.cssText = `left:${Math.random() * 100}%;animation-duration:${8 + Math.random() * 10}s;animation-delay:${Math.random() * 12}s;opacity:${.2 + Math.random() * .4}`;
    c.appendChild(p);
  }
}

// 3D Particles
function initParticles3D() {
  const canvas = $('#particles3d');
  if (!canvas || document.body.classList.contains('lite')) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  
  function create() {
    particles = [];
    const count = Math.min(50, Math.floor(w * h / 25000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 3 + .5,
        vx: (Math.random() - .5) * .3,
        vy: -Math.random() * .15 - .05,
        r: Math.random() * 1.5 + .5,
        a: Math.random() * .4 + .2
      });
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx * p.z;
      p.y += p.vy * p.z;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.z * .5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,165,116,${p.a * .6})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  
  resize();
  create();
  draw();
  window.addEventListener('resize', () => { resize(); create(); });
}

// Music
function initMusic() {
  const btn = $('#musicBtn');
  let audio = null;
  btn.addEventListener('click', () => {
    if (!state.site.ambientAudioUrl) return;
    if (!audio) {
      audio = new Audio(state.site.ambientAudioUrl);
      audio.loop = true;
      audio.volume = .4;
    }
    if (audio.paused) {
      audio.play().catch(() => {});
      btn.classList.add('on');
    } else {
      audio.pause();
      btn.classList.remove('on');
    }
  });
}

// BOOT
async function boot() {
  await initFirebase();
  initGateway();
  initTranslate();
  initRSVP();
  initBlessings();
  initLightbox();
  initTopbar();
  initCalendar();
  initPetals();
  initParticles3D();
  initMusic();
  startListeners();
}

boot().catch(err => {
  console.error('[Helasiritha] Boot failed:', err);
  render();
});
