/* ════════════════════════════════════════════════════════════════════════
   හෙළ සිරිත · Helasiritha — Public Application  (assets/app.js)  [ES module]
   • Renders fully from built-in DEFAULTS first (works offline / GitHub Pages)
   • Then live-syncs from Cloud Firestore (admin → public, real-time)
   • Bride-first everywhere · pure traditional Sinhala · zero placeholders
   Firebase is loaded via DYNAMIC import inside connect() so the page renders
   even with no network, and parses without a live connection.
   ════════════════════════════════════════════════════════════════════════ */

/* Firebase web config (NON-secret; identical byte-for-byte in the admin app) */
const FB = {
  apiKey: "AIzaSyCC18zyof_ORDkKwxAMJK4G3Atu2AkWodM",
  authDomain: "helasiritha-official.firebaseapp.com",
  projectId: "helasiritha-official",
  storageBucket: "helasiritha-official.firebasestorage.app",
  messagingSenderId: "993883662089",
  appId: "1:993883662089:web:b583123218df07be9155d8",
  measurementId: "G-PBJWLXWVD9"
};
const SDK = "https://www.gstatic.com/firebasejs/12.14.0";

/* ── Traditional Sinhala vocabulary (හෙළ බස) ─────────────────────────────── */
const T = {
  brand: "හෙළ සිරිත",
  ayubowan: "ආයුබෝවන්",
  enterPrompt: "මඟුල් පහන දල්වා, ආරාධනය විවෘත කරන්න",
  enter: "ආරාධනය විවෘත කරන්න",
  nav: { invitation: "ආරාධනාව", agenda: "සැලැස්ම", gallery: "මංසලකුණු", blessings: "සුබ පැතුම්", rsvp: "පැමිණීම" },
  heroTag: "අප විවාහ දිවියට එළඹෙමු",
  shubha: "ශ්‍රී සුභ මංගලම්",
  and: "සහ",
  closing: "ඔබ සැමගේ සුබ ආගමනය ගෞරවයෙන් අපේක්ෂා කරමු.",
  from: "මෙයට, ආදරණීය මව්පියන් සහ ඥාතීහු.",
  viewLocation: "ස්ථානය සිතියමින් බලන්න",
  date: "දිනය", venueLbl: "ස්ථානය", poruwaLbl: "පෝරුව",
  countdownTitle: "මංගල දිනයට තවත්",
  days: "දින", hours: "පැය", minutes: "මිනිත්තු", seconds: "තත්පර",
  theDay: "අද එම සුභ මංගල දිනයයි!",
  agendaTitle: "මංගල සභාවේ සැලැස්ම",
  agendaSub: "අපගේ දිනයේ සුවිශේෂ මොහොත්",
  galleryTitle: "සෙනෙහසේ මංසලකුණු",
  gallerySub: "සිනා, නිහඬ මොහොත් හා කුඩා සිහින එක් වී, අප මෙතැනට ගෙන ආ සෑම පියවරක්ම…",
  galleryEmpty: "ඡායාරූප මඳ වේලාවකින් මෙහි දිස් වේ…",
  loveTitle: "විශේෂ සටහන",
  loveSub: "අපගේ ආදරණීය අමුත්තනට",
  lampTitle: "මංගල පහන",
  lampSub: "තහවුරු වන සෑම ආරාධිතයෙකු සමඟම පහන බැබළේ.",
  confirmedCount: "තහවුරු වූ ආරාධිතයන්",
  blessingsTitle: "සුබ පැතුම් පොත",
  blessingsSub: "අප වෙනුවෙන් සුබ පැතුමක් සටහන් කරන්න.",
  yourName: "ඔබගේ නම",
  yourBlessing: "ඔබගේ සුබ පැතුම",
  sendBlessing: "සුබ පැතුම තැබීම",
  sending: "යවමින්…",
  blessingThanks: "ඔබගේ සුබ පැතුමට ස්තූතියි! අනුමැතියෙන් පසු එය මෙහි දිස් වේ.",
  blessingsEmpty: "පළමු සුබ පැතුම ඔබගෙන් වේවා…",
  rsvpTitle: "ඔබගේ කාරුණික පැමිණීම දන්වන්න",
  rsvpSub: "ඔබ සැමගේ පැමිණීම අප හට මහත් සතුටකි.",
  rsvpHelp: "ඔබගේ නම හෝ පවුලේ නාමය යොදා සොයන්න.",
  searchPlaceholder: "ඔබගේ නම හෝ පවුලේ නාමය ඇතුළත් කරන්න",
  searchBtn: "ආරාධිත නාම ලේඛනය සොයන්න",
  searching: "සොයමින්…",
  noGuest: "කණගාටුයි, එම නමින් ආරාධිතයෙකු හමු නොවීය.",
  proceedTyped: "මෙම නමින් ඉදිරියට යන්න",
  selectName: "කරුණාකර ඔබගේ නම තෝරන්න",
  willAttend: "ඔබ සහභාගී වෙනවා ද?",
  yesAttend: "ඔව්, සතුටින් පැමිණෙමි", noAttend: "කනගාටුයි, පැමිණිය නොහැක",
  liquor: "මත්පැන් අවශ්‍ය ද?", yes: "ඔව්", no: "නැහැ",
  guestCount: "පැමිණෙන සංඛ්‍යාව",
  dietary: "ආහාර අවශ්‍යතා (ඇත්නම්)",
  confirmRsvp: "කාරුණික පිළිතුර එවන්න",
  rsvpThanks: "ඔබගේ පිළිතුරට බෙහෙවින් ස්තූතියි!",
  rsvpYesMsg: "ඔබව මුණගැසීමට අපි මහත් ඕනෑකමින් සිටිමු.",
  rsvpNoMsg: "ඔබගේ සුබ පැතුම් අප හට ලැබේවා. ස්තූතියි.",
  changeResponse: "පිළිතුර වෙනස් කරන්න",
  rsvpClosed: "පැමිණීම දැනුම් දීමේ කාලය දැනට වසා ඇත. ස්තූතියි.",
  callUs: "අමතන්න",
  addCal: "දින දර්ශනයට එක් කරන්න",
  shareWa: "WhatsApp හරහා බෙදාගන්න",
  setup: "පද්ධතිය සැකසෙමින් පවතී. මඳක් පසුව නැවත පිවිසෙන්න.",
  months: ["ජනවාරි","පෙබරවාරි","මාර්තු","අප්‍රේල්","මැයි","ජූනි","ජූලි","අගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්"],
  weekdays: ["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්‍රහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"]
};

/* ── Built-in DEFAULT content (bride-first). Live Firestore overrides this. ── */
const DEFAULTS = {
  brideName: "කෞශානි", groomName: "ගෞරව",
  brideNameEn: "Kaushani", groomNameEn: "Gaurawa",
  bridePreLine: "මහත්මා සහ එම මැතිනියගේ ආදරණීය දියණිය වූ,",
  groomPreLine: "මහත්මා සහ එම මැතිනියගේ ආදරණීය පුත් වූ,",
  dateISO: "2028-01-12T09:28:00+05:30",
  venue: "The Epitome Hotel", venueCity: "කුරුණෑගල",
  venueMapUrl: "https://www.google.com/maps/search/?api=1&query=The+Epitome+Hotel+Kurunegala",
  ceremonyTime: "පෙ.ව. 09.00 සිට සවස 04.00 දක්වා",
  poruwaTime: "පෙ.ව. 09.28",
  heroImageUrl: "",
  loveNote: "ආදරයෙන් හා කෘතඥතාවයෙන් පිරුණු හදවත් සමඟ, අපගේ ජීවිතයේ මෙම සුන්දර පරිච්ඡේදය ඔබ සමඟ සැමරීමට ලැබීම ගැන අපි ඉතා සතුටු වෙමු. ඔබේ පැමිණීම අපට වචනවලින් සැබවින්ම ප්‍රකාශ කළ නොහැකි තරම් වටිනා දෙයක් වන අතර, ඔබ අප සමඟ සිටීම මෙම දිනය තවත් අර්ථවත් කරයි. ඔබගේ ආදරයට, ඔබගේ ආශීර්වාදයට සහ අපගේ ගමනේ කොටසක් වීම ගැන ස්තූතියි. අපට බොහෝ දේ අදහස් කරන පුද්ගලයින් සමඟ සිනහව, ප්‍රීතිය සහ අමතක නොවන මතකයන් බෙදා ගැනීමට අපි මහත් ඕනෑකමින් සිටිමු. අපගේ සියලු සෙනෙහසින්,",
  loveSign: "කෞශානි & ගෞරව",
  phone: "", whatsapp: "",
  ambientAudioUrl: "",
  rsvpOpen: true,
  show: { countdown: true, agenda: true, gallery: true, lovenote: true, lamp: true, blessings: true, rsvp: true }
};
const AGENDA_DEFAULT = [
  { icon: "sesath", titleSi: "ආගන්තුක පිළිගැනීම", timeLabel: "පෙ.ව. 09.00", descSi: "මඟුල් බෙර හඬ මැද, සේසත් සෙවණේ ආරාධිතයන් සාදරයෙන් පිළිගැනීම." },
  { icon: "poruwa", titleSi: "පෝරුවට වැඩම වීම", timeLabel: "පෙ.ව. 09.28", descSi: "ජයමංගල ගාථා ගායනය මධ්‍යයේ මනාල යුවළ පෝරුවට වැඩම කරවීම." },
  { icon: "ring", titleSi: "පෝරු චාරිත්‍ර", timeLabel: "", descSi: "බුලත් අතු හුවමාරුව, ඇඟිලි මුදු පැළඳවීම හා පිරිත් නූල් බැඳීම ඇතුළු සිරිත් විරිත්." },
  { icon: "lamp", titleSi: "මඟුල් පහන දැල්වීම", timeLabel: "", descSi: "උභය පාර්ශවයේ ආශීර්වාදය මැද මඟුල් පහන දල්වා සුබ මොහොත සැමරීම." },
  { icon: "feast", titleSi: "භෝජන සංග්‍රහය", timeLabel: "", descSi: "රසවත් භෝජන සංග්‍රහයකින් ආරාධිතයන් සංග්‍රහ කිරීම." },
  { icon: "mayura", titleSi: "සැමරුම් හා නර්තන", timeLabel: "සවස 04.00 දක්වා", descSi: "උඩරට නර්තන අංග හා සතුට බෙදාගන්නා සැමරුම් අවස්ථාව." }
];
const BLESS_SUGGEST = [
  "ඔබ දෙදෙනාගේ විවාහ දිවිය සැම කල්හිම සෙනෙහසින් හා සමඟියෙන් පිරී, දිගාසිරි සපිරි වේවා!",
  "සඳ හිරු පවතින තුරු ඔබ දෙදෙනාගේ සෙනෙහස සදා බැබළේවා!",
  "තෙරුවන් සරණයි! නිරෝගී සුවය හා දීර්ඝායුෂ ඔබ දෙපළට ලැබේවා!"
];

/* ── State + helpers ─────────────────────────────────────────────────────── */
let S = Object.assign({}, DEFAULTS);
let AGENDA = AGENDA_DEFAULT.slice();
let GALLERY = [], GUESTS = [], BLESSINGS = [], confirmedGuests = 0;
let fb = null;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (x) => String(x == null ? "" : x).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const O = window.ORN;

function liteMode() {
  const m = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sd = navigator.connection && navigator.connection.saveData;
  const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 2;
  const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  return !!(m || sd || lowMem || lowCpu);
}
function fmtDate(iso) {
  const d = new Date(iso);
  return { y: d.getFullYear(), mo: T.months[d.getMonth()], dd: d.getDate(), wd: T.weekdays[d.getDay()], dt: d };
}

/* ════ RENDER (pure — no network) ════ */
function renderStatic() {
  $("#brandName").textContent = T.brand;
  $("#nav-invitation").textContent = T.nav.invitation;
  $("#nav-agenda").textContent = T.nav.agenda;
  $("#nav-gallery").textContent = T.nav.gallery;
  $("#nav-blessings").textContent = T.nav.blessings;
  $("#nav-rsvp").textContent = T.nav.rsvp;

  $("#gwAyu").textContent = T.ayubowan;
  $("#gwCouple").innerHTML = esc(S.brideName) + ' <span class="amp">&amp;</span> ' + esc(S.groomName);
  $("#gwPrompt").textContent = T.enterPrompt;
  $("#enterBtn").textContent = T.enter;
  $("#gwLamp").innerHTML = O.pahana({ s: "gw" });

  $$(".js-liyawela").forEach((el, i) => { el.innerHTML = O.liyawela({ s: "lw" + i }); });
  $("#heroSesathL").innerHTML = O.sesath({ s: "shl" });
  $("#heroSesathR").innerHTML = O.sesath({ s: "shr" });
  $("#heroThorana").innerHTML = O.makaraThorana({ s: "hth" });
  $("#invThorana").innerHTML = O.makaraThorana({ s: "ith" });
  $("#rsvpSesathL").innerHTML = O.sesath({ s: "srl" });
  $("#rsvpSesathR").innerHTML = O.sesath({ s: "srr" });
  $("#footKalasa").innerHTML = O.punKalasa({ s: "fk" });
  $("#footPerahera").innerHTML = O.perahera({ s: "fp" });
  $$(".js-corner").forEach((el, i) => { el.innerHTML = O.palaPethi({ s: "cn" + i }); });

  renderHero(); renderInvitation(); renderCountdown(); renderAgenda();
  renderGallery(); renderLove(); renderLamp(); renderBlessings(); renderRsvpShell(); renderFooter();
  applyVisibility();
}

function renderHero() {
  $("#heroNames").innerHTML = esc(S.brideName) + ' <span class="amp">&amp;</span> ' + esc(S.groomName);
  $("#heroTag").textContent = T.heroTag;
  const f = fmtDate(S.dateISO);
  $("#heroDate").textContent = f.dd + " " + f.mo + " " + f.y;
  $("#heroVenue").textContent = S.venue + ", " + S.venueCity;
  const img = S.heroImageUrl || "assets/couple.jpg";
  const useDefault = !S.heroImageUrl;
  $("#coupleImg").innerHTML = useDefault
    ? '<picture><source srcset="assets/couple.webp" type="image/webp"><img src="assets/couple.jpg" alt="' + esc(S.brideName + " සහ " + S.groomName) + ' — උඩරට මංගල අන්දම" loading="eager" decoding="async"></picture>'
    : '<img src="' + esc(img) + '" alt="' + esc(S.brideName + " සහ " + S.groomName) + ' — උඩරට මංගල අන්දම" loading="eager" decoding="async">';
}

function renderInvitation() {
  const f = fmtDate(S.dateISO);
  $("#shubha").textContent = T.shubha;
  const html =
    '<div class="inv-block"><p class="inv-pre">' + esc(S.bridePreLine) + '</p>' +
      '<h3 class="inv-name brass-text">' + esc(S.brideName) + '</h3></div>' +
    '<div class="inv-amp">' + esc(T.and) + '</div>' +
    '<div class="inv-block"><p class="inv-pre">' + esc(S.groomPreLine) + '</p>' +
      '<h3 class="inv-name brass-text">' + esc(S.groomName) + '</h3></div>' +
    '<p class="inv-line">යන දෙපළගේ පින්බර විවාහ මංගලෝත්සවය <span class="inv-strong">' + f.y + ' ක් වූ ' + esc(f.mo) +
      ' මස ' + f.dd + ' වන ' + esc(f.wd) + ' දින</span>, ' + esc(S.venueCity) + ' <span class="inv-strong">' +
      esc(S.venue) + '</span> හිදී පැවැත්වීමට කටයුතු සූදානම් කර ඇත.</p>' +
    '<div class="inv-when">' +
      '<div class="blk"><div class="lbl">' + esc(T.date) + '</div><div class="num brass-text">' + f.dd + '</div><div class="val">' + esc(f.mo) + ' ' + f.y + '</div></div>' +
      '<div class="sep"></div>' +
      '<div class="blk"><div class="lbl">' + esc(T.venueLbl) + '</div><div class="val">' + esc(S.venue) + '</div><div class="lbl" style="text-transform:none;letter-spacing:0">' + esc(S.venueCity) + '</div></div>' +
      '<div class="sep"></div>' +
      '<div class="blk"><div class="lbl">' + esc(T.poruwaLbl) + '</div><div class="val">' + esc(S.poruwaTime) + '</div><div class="lbl" style="text-transform:none;letter-spacing:0">' + esc(S.ceremonyTime) + '</div></div>' +
    '</div>' +
    '<p class="inv-close">' + esc(T.closing) + '</p>' +
    '<p class="inv-from">' + esc(T.from) + '</p>' +
    '<div class="kalasa-inline" id="invKalasa"></div>' +
    (S.venueMapUrl ? '<a class="maplink" href="' + esc(S.venueMapUrl) + '" target="_blank" rel="noopener">⌖ ' + esc(T.viewLocation) + '</a>' : "");
  $("#inviteBody").innerHTML = html;
  $("#invKalasa").innerHTML = O.punKalasa({ s: "ik" });
}

let cdTimer = null;
function renderCountdown() {
  $("#cdTitle").textContent = T.countdownTitle;
  const tick = () => {
    const diff = new Date(S.dateISO).getTime() - Date.now();
    if (diff <= 0) {
      $("#cdGrid").style.display = "none"; $("#cdDone").textContent = T.theDay; $("#cdDone").style.display = "block";
      if (cdTimer) clearInterval(cdTimer); return;
    }
    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    const set = (id, v, lbl) => { const c = $(id); c.querySelector(".cd-num").textContent = String(v).padStart(2, "0"); c.querySelector(".cd-lbl").textContent = lbl; };
    set("#cdD", d, T.days); set("#cdH", h, T.hours); set("#cdM", m, T.minutes); set("#cdS", sec, T.seconds);
  };
  tick(); if (cdTimer) clearInterval(cdTimer); cdTimer = setInterval(tick, 1000);
}

function renderAgenda() {
  $("#agendaTitle").textContent = T.agendaTitle;
  $("#agendaSub").textContent = T.agendaSub;
  $("#agendaList").innerHTML = AGENDA.map((it, i) =>
    '<div class="ag-item reveal"><div class="ag-icon">' + O.icon(it.icon || "lamp", "ag" + i) + '</div>' +
    '<div class="ag-body"><div class="ag-title">' + esc(it.titleSi) + '</div>' +
    (it.timeLabel ? '<div class="ag-time">' + esc(it.timeLabel) + '</div>' : "") +
    '<div class="ag-desc">' + esc(it.descSi) + '</div></div></div>'
  ).join("");
  observeReveals();
}

function renderGallery() {
  $("#galleryTitle").textContent = T.galleryTitle;
  $("#gallerySub").textContent = T.gallerySub;
  const box = $("#masonry");
  if (!GALLERY.length) { box.innerHTML = '<p class="gallery-empty">' + esc(T.galleryEmpty) + '</p>'; return; }
  box.innerHTML = GALLERY.map((g, i) =>
    '<figure data-i="' + i + '"><img src="' + esc(g.url) + '" alt="' + esc(g.caption || "මංගල ඡායාරූපය") + '" loading="lazy" decoding="async">' +
    (g.caption ? '<figcaption>' + esc(g.caption) + '</figcaption>' : "") + '</figure>'
  ).join("");
}

function renderLove() {
  $("#loveTitle").textContent = T.loveTitle;
  $("#loveSub").textContent = T.loveSub;
  $("#loveText").textContent = S.loveNote;
  let sign = S.loveSign || (S.brideName + " & " + S.groomName);
  $("#loveSign").innerHTML = sign.replace(/&amp;|&/g, '<span class="amp">&amp;</span>');
}

function renderLamp() {
  $("#lampTitle").textContent = T.lampTitle;
  $("#lampSub").textContent = T.lampSub;
  $("#lampSvg").innerHTML = O.pahana({ s: "lmp" });
  $("#lampCount").textContent = confirmedGuests;
  $("#lampCap").textContent = T.confirmedCount;
  $("#lampSvg").classList.toggle("lit", confirmedGuests > 0);
}

function renderBlessings() {
  $("#blessingsTitle").textContent = T.blessingsTitle;
  $("#blessingsSub").textContent = T.blessingsSub;
  const grid = $("#blessGrid");
  const approved = BLESSINGS.filter(b => b.approved);
  grid.innerHTML = approved.length
    ? approved.map(b => '<div class="bless-card reveal"><div class="bless-msg">“' + esc(b.message) + '”</div><div class="bless-name">— ' + esc(b.name) + '</div></div>').join("")
    : '<p class="bless-empty">' + esc(T.blessingsEmpty) + '</p>';
  $("#blNameLbl").textContent = T.yourName;
  $("#blName").placeholder = T.yourName;
  $("#blMsgLbl").textContent = T.yourBlessing;
  $("#blMsg").placeholder = BLESS_SUGGEST[Math.floor(Math.random() * BLESS_SUGGEST.length)];
  $("#blSend").textContent = T.sendBlessing;
  observeReveals();
}

function renderRsvpShell() {
  $("#rsvpTitle").textContent = T.rsvpTitle;
  $("#rsvpSub").textContent = T.rsvpSub;
  applyRsvpOpen();
}
function applyRsvpOpen() {
  const closed = $("#rsvpClosed"), stages = $("#rsvpStages");
  if (S.rsvpOpen) { closed.style.display = "none"; stages.style.display = "block"; $("#rsvpHelp").textContent = T.rsvpHelp; }
  else { closed.style.display = "block"; closed.textContent = T.rsvpClosed; stages.style.display = "none"; }
}

function renderFooter() {
  const f = fmtDate(S.dateISO);
  $("#footNames").innerHTML = esc(S.brideName) + ' <span class="amp">&amp;</span> ' + esc(S.groomName);
  $("#footDate").textContent = f.dd + " " + f.mo + " " + f.y + " · " + S.venue + ", " + S.venueCity;
  const acts = $("#footActions"); acts.innerHTML = "";
  if (S.phone) acts.insertAdjacentHTML("beforeend", '<a class="btn ghost" href="tel:' + esc(S.phone) + '">☎ ' + esc(T.callUs) + '</a>');
  acts.insertAdjacentHTML("beforeend", '<button class="btn ghost" id="calBtn">⌖ ' + esc(T.addCal) + '</button>');
  acts.insertAdjacentHTML("beforeend", '<button class="btn ghost" id="waBtn">✦ ' + esc(T.shareWa) + '</button>');
  $("#calBtn").onclick = downloadIcs;
  $("#waBtn").onclick = shareWa;
}

function applyVisibility() {
  const map = { countdown: "#countdown", agenda: "#agenda", gallery: "#gallery", lovenote: "#lovenote", lamp: "#lamp", blessings: "#blessings", rsvp: "#rsvp" };
  Object.keys(map).forEach(k => { const el = $(map[k]); if (el) el.style.display = (S.show && S.show[k] === false) ? "none" : ""; });
}

/* ════ INTERACTIONS ════ */
let revObserver = null;
function observeReveals() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(e => e.classList.add("in")); return; }
  if (!revObserver) revObserver = new IntersectionObserver((es) => {
    es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      .forEach((e, i) => { e.target.style.transitionDelay = (i * 0.11) + "s"; e.target.classList.add("in"); revObserver.unobserve(e.target); });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal:not(.in)").forEach(e => revObserver.observe(e));
}

let entered = false;
function enterSite() {
  if (entered) return; entered = true;
  const g = $("#gateway"); if (g) g.classList.add("gone");
  document.body.style.overflow = "";
  startAudio();
  setTimeout(() => { const x = $("#gateway"); if (x) x.remove(); }, 1100);
}

let audio = null, playing = false;
function getAudio() {
  if (!S.ambientAudioUrl) return null;
  if (!audio || audio.dataset.src !== S.ambientAudioUrl) {
    audio = new Audio(S.ambientAudioUrl); audio.loop = true; audio.volume = 0.5; audio.preload = "auto"; audio.dataset.src = S.ambientAudioUrl;
  }
  return audio;
}
function startAudio() { const a = getAudio(); if (a) a.play().then(() => { playing = true; syncMusicBtn(); }).catch(() => {}); }
function syncMusicBtn() { const b = $("#musicBtn"); if (!b) return; b.classList.toggle("on", playing); b.setAttribute("aria-pressed", String(playing)); b.style.display = S.ambientAudioUrl ? "grid" : "none"; }
function toggleMusic() { const a = getAudio(); if (!a) return; if (playing) { a.pause(); playing = false; } else { a.play().then(() => { playing = true; syncMusicBtn(); }).catch(() => {}); } syncMusicBtn(); }

function makePetals() {
  if (document.body.classList.contains("lite")) return;
  const box = $("#petals"); if (!box) return; box.innerHTML = "";
  const n = matchMedia("(max-width:600px)").matches ? 8 : 14;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("div"); p.className = "petal";
    const sz = 12 + Math.random() * 16;
    p.style.width = sz + "px"; p.style.height = sz + "px"; p.style.left = (Math.random() * 100) + "%";
    p.style.animationDuration = (10 + Math.random() * 12) + "s"; p.style.animationDelay = (-Math.random() * 14) + "s";
    p.style.opacity = (0.3 + Math.random() * 0.35).toFixed(2);
    box.appendChild(p);
  }
}
function makeDust() {
  if (document.body.classList.contains("lite")) return;
  const g = $("#gateway"); if (!g) return;
  for (let i = 0; i < 22; i++) {
    const d = document.createElement("span"); d.className = "dust";
    d.style.left = (Math.random() * 100) + "%"; d.style.bottom = (Math.random() * 30) + "%";
    d.style.animationDelay = (Math.random() * 6) + "s"; d.style.animationDuration = (4 + Math.random() * 3) + "s";
    g.appendChild(d);
  }
}

let rafScroll = 0;
function smoothTo(y, dur = 1000) {
  cancelAnimationFrame(rafScroll);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { window.scrollTo(0, y); return; }
  const start = window.scrollY, delta = Math.round(y) - start, t0 = performance.now();
  const ease = s => s < 0.5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2;
  const step = now => { const k = Math.min(1, (now - t0) / dur); window.scrollTo(0, start + delta * ease(k)); if (k < 1) rafScroll = requestAnimationFrame(step); };
  rafScroll = requestAnimationFrame(step);
}

/* Lightbox */
let lbIndex = 0;
function openLightbox(i) {
  lbIndex = i; const lb = $("#lightbox"); const g = GALLERY[i]; if (!g) return;
  $("#lbImg").src = g.url; $("#lbImg").alt = g.caption || "මංගල ඡායාරූපය"; $("#lbCap").textContent = g.caption || "";
  lb.classList.add("open"); document.body.style.overflow = "hidden";
}
function closeLightbox() { $("#lightbox").classList.remove("open"); document.body.style.overflow = ""; }
function lbStep(d) { if (!GALLERY.length) return; lbIndex = (lbIndex + d + GALLERY.length) % GALLERY.length; openLightbox(lbIndex); }

/* Add to calendar (.ics) + WhatsApp */
function pad(n) { return String(n).padStart(2, "0"); }
function icsStamp(d) { return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + "00Z"; }
function downloadIcs() {
  const start = new Date(S.dateISO); const end = new Date(start.getTime() + 6 * 3600 * 1000);
  const body = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Helasiritha//Wedding//SI", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    "UID:helasiritha-" + start.getTime() + "@helasiritha", "DTSTAMP:" + icsStamp(new Date()),
    "DTSTART:" + icsStamp(start), "DTEND:" + icsStamp(end),
    "SUMMARY:" + S.brideNameEn + " & " + S.groomNameEn + " — Wedding",
    "DESCRIPTION:" + S.brideName + " saha " + S.groomName,
    "LOCATION:" + S.venue + ", " + S.venueCity, "END:VEVENT", "END:VCALENDAR"
  ].join("\r\n");
  const blob = new Blob([body], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = "Kaushani-Gaurawa-Wedding.ics"; document.body.appendChild(a); a.click(); a.remove();
}
function shareWa() {
  const f = fmtDate(S.dateISO);
  const txt = "🪷 " + S.brideName + " & " + S.groomName + " · විවාහ මංගල්‍යය\n" + f.dd + " " + f.mo + " " + f.y + " · " + S.venue + ", " + S.venueCity + "\n" + location.href;
  window.open("https://wa.me/" + (S.whatsapp ? S.whatsapp.replace(/[^0-9]/g, "") : "") + "?text=" + encodeURIComponent(txt), "_blank", "noopener");
}

/* ════ RSVP flow ════ */
const rsvp = { guest: null, attending: null, liquor: false, party: 1, dietary: "" };
function showStage(id) { $$(".rsvp-stage").forEach(s => s.classList.remove("active")); const el = $(id); if (el) el.classList.add("active"); }

function wireRsvp() {
  $("#rsvpSearchInput").placeholder = T.searchPlaceholder;
  $("#rsvpSearchBtn").textContent = T.searchBtn;
  $("#rsvpSearchBtn").onclick = doGuestSearch;
  $("#rsvpSearchInput").addEventListener("keydown", e => { if (e.key === "Enter") doGuestSearch(); });
  $("#willAttendQ").textContent = T.willAttend;
  $("#choiceYes").textContent = T.yesAttend;
  $("#choiceNo").textContent = T.noAttend;
  $("#liquorQ").textContent = T.liquor;
  $("#liqYes").textContent = T.yes; $("#liqNo").textContent = T.no;
  $("#countQ").textContent = T.guestCount;
  $("#dietLbl").textContent = T.dietary;
  $("#rsvpDiet").placeholder = T.dietary;
  $("#rsvpSubmit").textContent = T.confirmRsvp;
  $("#rsvpAgain").textContent = T.changeResponse;
  $("#choiceYes").onclick = () => { rsvp.attending = true; $("#choiceYes").classList.add("sel"); $("#choiceNo").classList.remove("sel"); $("#attendExtras").style.display = "block"; };
  $("#choiceNo").onclick = () => { rsvp.attending = false; $("#choiceNo").classList.add("sel"); $("#choiceYes").classList.remove("sel"); $("#attendExtras").style.display = "none"; };
  $("#liqYes").onclick = () => { rsvp.liquor = true; $("#liqYes").classList.add("sel"); $("#liqNo").classList.remove("sel"); };
  $("#liqNo").onclick = () => { rsvp.liquor = false; $("#liqNo").classList.add("sel"); $("#liqYes").classList.remove("sel"); };
  $("#pPlus").onclick = () => { rsvp.party = Math.min(20, rsvp.party + 1); $("#pVal").textContent = rsvp.party; };
  $("#pMinus").onclick = () => { rsvp.party = Math.max(1, rsvp.party - 1); $("#pVal").textContent = rsvp.party; };
  $("#rsvpSubmit").onclick = submitRsvp;
  $("#rsvpAgain").onclick = () => { Object.assign(rsvp, { guest: null, attending: null, liquor: false, party: 1, dietary: "" }); $("#rsvpSearchInput").value = ""; $("#rsvpResults").innerHTML = ""; $("#pVal").textContent = "1"; $("#rsvpDiet").value = ""; showStage("#stSearch"); };
}

function doGuestSearch() {
  const q = $("#rsvpSearchInput").value.trim().toLowerCase();
  const box = $("#rsvpResults");
  if (!q) { box.innerHTML = ""; return; }
  const hits = GUESTS.filter(g => (g.name || "").toLowerCase().includes(q) || (g.family || "").toLowerCase().includes(q)).slice(0, 8);
  if (hits.length) {
    box.innerHTML = hits.map(g =>
      '<button class="guest-pick" data-id="' + esc(g.id) + '"><span class="gn">' + esc(g.name) + '</span>' +
      (g.family ? '<span class="gfam">' + esc(g.family) + '</span>' : "") + '</button>').join("");
    $$(".guest-pick", box).forEach(b => b.onclick = () => { const g = GUESTS.find(x => x.id === b.dataset.id); pickGuest(g); });
  } else {
    box.innerHTML = '<p class="note">' + esc(T.noGuest) + '</p><button class="btn ghost" id="proceedTyped">' + esc(T.proceedTyped) + '</button>';
    $("#proceedTyped").onclick = () => pickGuest({ id: "guest-" + Date.now(), name: $("#rsvpSearchInput").value.trim(), family: "" });
  }
}
function pickGuest(g) { if (!g) return; rsvp.guest = g; $("#rsvpGuestName").textContent = g.name; showStage("#stChoice"); }

async function submitRsvp() {
  if (rsvp.attending === null || !rsvp.guest) return;
  const btn = $("#rsvpSubmit"); btn.disabled = true; btn.textContent = T.sending;
  rsvp.dietary = $("#rsvpDiet").value.trim();
  const payload = {
    guestId: rsvp.guest.id, name: rsvp.guest.name, family: rsvp.guest.family || "",
    attending: rsvp.attending, liquor: rsvp.attending ? rsvp.liquor : false,
    party: rsvp.attending ? rsvp.party : 0, dietary: rsvp.dietary
  };
  try { if (fb) await fb.setDoc(fb.doc(fb.db, "rsvps", payload.guestId), Object.assign({}, payload, { ts: fb.serverTimestamp() }), { merge: true }); }
  catch (e) { console.warn("RSVP save failed", e); }
  $("#rsvpThanksTitle").textContent = T.rsvpThanks;
  $("#rsvpThanksMsg").textContent = rsvp.attending ? T.rsvpYesMsg : T.rsvpNoMsg;
  showStage("#stThanks");
  btn.disabled = false; btn.textContent = T.confirmRsvp;
}

/* ════ Blessings submit ════ */
async function submitBlessing() {
  const name = $("#blName").value.trim(), msg = $("#blMsg").value.trim();
  if (!name || !msg) return;
  const btn = $("#blSend"); btn.disabled = true; btn.textContent = T.sending;
  try {
    if (fb) await fb.addDoc(fb.collection(fb.db, "blessings"), { name, message: msg, approved: false, ts: fb.serverTimestamp() });
    $("#blName").value = ""; $("#blMsg").value = "";
    $("#blStatus").textContent = T.blessingThanks;
  } catch (e) { console.warn("Blessing failed", e); $("#blStatus").textContent = T.blessingThanks; }
  btn.disabled = false; btn.textContent = T.sendBlessing;
}

/* ════ FIREBASE — realtime sync (dynamic import; safe if offline) ════ */
async function connect() {
  const [{ initializeApp }, fs] = await Promise.all([
    import(SDK + "/firebase-app.js"),
    import(SDK + "/firebase-firestore.js")
  ]);
  const app = initializeApp(FB);
  const db = fs.getFirestore(app);
  fb = { db, addDoc: fs.addDoc, collection: fs.collection, doc: fs.doc, setDoc: fs.setDoc, serverTimestamp: fs.serverTimestamp };

  // site/content
  fs.onSnapshot(fs.doc(db, "site", "content"), (snap) => {
    if (snap.exists()) {
      const d = snap.data();
      if (d.show) d.show = Object.assign({}, DEFAULTS.show, d.show);
      S = Object.assign({}, DEFAULTS, d);
      // Bride-first guard on the love signature
      if (!S.loveSign) S.loveSign = S.brideName + " & " + S.groomName;
      renderHero(); renderInvitation(); renderCountdown(); renderLove(); renderRsvpShell(); renderFooter(); applyVisibility(); syncMusicBtn();
    }
  }, e => console.warn("content", e));

  // site/agenda
  fs.onSnapshot(fs.doc(db, "site", "agenda"), (snap) => {
    if (snap.exists() && Array.isArray(snap.data().items) && snap.data().items.length) { AGENDA = snap.data().items; renderAgenda(); }
  }, e => console.warn("agenda", e));

  // gallery
  fs.onSnapshot(fs.query(fs.collection(db, "gallery"), fs.orderBy("order", "asc")), (qs) => {
    GALLERY = qs.docs.map(d => Object.assign({ id: d.id }, d.data())); renderGallery();
  }, e => console.warn("gallery", e));

  // blessings (approved shown; ordered newest first)
  fs.onSnapshot(fs.query(fs.collection(db, "blessings"), fs.where("approved", "==", true)), (qs) => {
    BLESSINGS = qs.docs.map(d => Object.assign({ id: d.id }, d.data()))
      .sort((a, b) => ((b.ts && b.ts.seconds) || 0) - ((a.ts && a.ts.seconds) || 0));
    renderBlessings();
  }, e => console.warn("blessings", e));

  // confirmed lamp count — public-safe aggregate (individual RSVPs stay private)
  fs.onSnapshot(fs.doc(db, "site", "stats"), (snap) => {
    confirmedGuests = (snap.exists() && snap.data().confirmedCount) || 0; renderLamp();
  }, e => console.warn("stats", e));

  // guests (for RSVP search)
  fs.onSnapshot(fs.collection(db, "guests"), (qs) => {
    GUESTS = qs.docs.map(d => Object.assign({ id: d.id }, d.data()));
  }, e => console.warn("guests", e));
}

/* ════ BOOT ════ */
function boot() {
  if (liteMode()) document.body.classList.add("lite");
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";

  renderStatic();
  observeReveals();
  makeDust();
  makePetals();
  syncMusicBtn();

  // Gateway
  $("#enterBtn").addEventListener("click", enterSite);
  $("#gwLamp").addEventListener("click", enterSite);

  // Music + to-top
  $("#musicBtn").addEventListener("click", toggleMusic);
  const toTop = $("#toTop");
  window.addEventListener("scroll", () => { toTop.classList.toggle("show", window.scrollY > 600); }, { passive: true });
  toTop.addEventListener("click", () => smoothTo(0, 900));

  // Smooth anchor scroll
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute("href").slice(1), t = id && document.getElementById(id);
    if (t) { e.preventDefault(); smoothTo(t.getBoundingClientRect().top + window.scrollY - 8, 950); }
  });

  // Gallery → lightbox (delegated)
  $("#masonry").addEventListener("click", (e) => { const f = e.target.closest("figure"); if (f) openLightbox(+f.dataset.i); });
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => lbStep(-1));
  $("#lbNext").addEventListener("click", () => lbStep(1));
  $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!$("#lightbox").classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox(); if (e.key === "ArrowLeft") lbStep(-1); if (e.key === "ArrowRight") lbStep(1);
  });
  // Swipe on lightbox
  let tx = 0;
  $("#lightbox").addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
  $("#lightbox").addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1); }, { passive: true });

  // Blessings + RSVP
  $("#blSend").addEventListener("click", submitBlessing);
  wireRsvp();

  // Re-make petals on resize (debounced)
  let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(makePetals, 400); });

  // Connect to Firestore (optional; site already fully usable)
  connect().catch(err => {
    console.warn("Firestore offline — running on built-in content.", err);
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
