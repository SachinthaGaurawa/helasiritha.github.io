/**
 * ═══════════════════════════════════════════════════════════════════
 * හෙළ සිරිත · Main Application — "Rajavansha" Edition
 * ═══════════════════════════════════════════════════════════════════
 * Firebase real-time sync · Translate · Premium Kandyan Royal UI
 * ═══════════════════════════════════════════════════════════════════
 */

import { makaraThorana, sesath, sandakadaPahana, punkalasa, liyawala, vesCrown, templePattern, mangalaLamp } from './assets/js/ornaments.js';

// ═══ CONFIGURATION ═══
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

// ═══ TRANSLATIONS ═══
const SI = {
  ayubowan:"ආයුබෝවන්",gettingMarried:"අප විවාහ දිවියට එළඹෙමු",
  shubaMangalam:"ශ්‍රී සුබ මංගලම්",
  belovedDaughter:"මහත්මා සහ එම මැතිනියගේ ආදරණීය දියණිය",
  belovedSon:"මහත්මා සහ එම මැතිනියගේ ආදරණීය පුත්",
  requestPresence:"ඔබගේ අගනා සහභාගීත්වය අපේක්ෂා කරමු",
  date:"දිනය",time:"වේලාව",venue:"ස්ථානය",
  viewLocation:"ස්ථානය සිතියමින් බලන්න",
  bothFamilies:"උභය පාර්ශවයේ ඥාති මිත්‍රාදීන් සමඟ",
  countdownTitle:"මංගල දිනයට තවත්",
  countdownSub:"අපගේ විශේෂ දිනය ආසන්නයි",
  days:"දින",hours:"පැය",minutes:"මිනිත්තු",seconds:"තත්පර",
  theDayHasArrived:"අද එම සුභ මංගල දිනයයි!",
  rsvpTitle:"ඔබගේ කාරුණික පැමිණීම දන්වන්න",
  rsvpSub:"ඔබ සැමගේ පැමිණීම අප හට මහත් සතුටකි",
  searchGuestList:"ආරාධිත නාම ලේඛනය සොයන්න",
  familyNamePlaceholder:"ඔබගේ නම හෝ පවුලේ නාමය ඇතුළත් කරන්න",
  searching:"සොයමින්…",noGuestFound:"කණගාටුයි, එම නමින් ආරාධිතයෙකු හමු නොවීය.",
  selectYourName:"කරුණාකර ඔබගේ නම තෝරන්න",
  willYouAttend:"ඔබ සහභාගී වෙනවා ද?",
  yesAttend:"ඔව්, සතුටින් පැමිණෙමි",noAttend:"කනගාටුයි, පැමිණිය නොහැක",
  takingLiquor:"මත්පැන් අවශ්‍ය ද?",yes:"ඔව්",no:"නැහැ",
  guestCount:"පැමිණෙන සංඛ්‍යාව",dietary:"ආහාර අවශ්‍යතා (ඇත්නම්)",
  confirmRsvp:"කාරුණික පිළිතුර එවන්න",sending:"යවමින්…",
  rsvpThanks:"ඔබගේ පිළිතුරට බෙහෙවින් ස්තූතියි!",
  rsvpConfirmedMsg:"ඔබව මුණගැසීමට අපි මහත් ඕනෑකමින් සිටිමු.",
  rsvpDeclinedMsg:"ඔබගේ සුබ පැතුම් අප හට ලැබේවා. ස්තූතියි.",
  changeResponse:"පිළිතුර වෙනස් කරන්න",back:"ආපසු",
  agendaTitle:"මංගල සභාවේ සැලැස්ම",agendaSub:"අපගේ දිනයේ සුවිශේෂ මොහොත්",
  galleryTitle:"සෙනෙහසේ මංසලකුණු",
  gallerySub:"සිනා, නිහඬ මොහොත් හා කුඩා සිහින එක් වී, අප මෙතැනට ගෙන ආ සෑම පියවරක්ම…",
  loveNoteTitle:"විශේෂ සටහන",loveNoteSubtitle:"අපගේ ආදරණීය අමුත්තනට",
  blessingsTitle:"සුබ පැතුම් පොත",blessingsSub:"අප වෙනුවෙන් සුබ පැතුමක් සටහන් කරන්න.",
  yourName:"ඔබගේ නම",yourBlessing:"ඔබගේ සුබ පැතුම",
  sendBlessing:"සුබ පැතුම තැබීම",composing:"රචනා කරමින්…",
  blessingThanks:"ඔබගේ සුබ පැතුමට ස්තූතියි! අනුමැතියෙන් පසු එය මෙහි දිස් වේ.",
  awaitingBlessings:"පළමු සුබ පැතුම ඔබගෙන් වේවා…",
  confirmedCount:"තහවුරු වූ ආරාධිතයන්",
  scrollPrompt:"පහළට ගෙන යන්න",search:"සොයන්න",
  enterOpen:"ආරාධනා පත්‍රය විවෘත කරන්න",
  lampPrompt:"පහන් දැල්ල ස්පර්ශ කර ආරාධනය විවෘත කරන්න",
  addToCalendar:"📅 දින දර්ශනයට එක් කරන්න",
  shareWhatsapp:"💬 WhatsApp හරහා බෙදාගන්න",
  withLove:"සෙනෙහසින් නිර්මාණය කරන ලදී",celebrating:"හෙළ සිරිත",
  coupleNames:"කෞශානි & ගෞරව",
  defaultLoveNote:"අපගේ මංගල උත්සවයට ඔබ පැමිණීමෙන් අප හට ලැබෙන සතුට වචනයෙන් ප්‍රකාශ කළ නොහැක. ඔබගේ ආශිර්වාදය අපගේ ජීවිතයේ විශේෂතම මොහොතට එළියක් වනු ඇත. ස්තූතියි.",
};
const EN = {
  ayubowan:"Welcome",gettingMarried:"We are getting married",
  shubaMangalam:"Auspicious Blessings",
  belovedDaughter:"The beloved daughter of",belovedSon:"The beloved son of",
  requestPresence:"We earnestly request your gracious presence",
  date:"Date",time:"Time",venue:"Venue",
  viewLocation:"View Location on Map",
  bothFamilies:"With both families' relatives and friends",
  countdownTitle:"Counting Down to the Big Day",
  countdownSub:"Our special day is approaching",
  days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds",
  theDayHasArrived:"Today is the auspicious day!",
  rsvpTitle:"Confirm Your Gracious Attendance",
  rsvpSub:"Your presence would bring us great joy",
  searchGuestList:"Search the Guest List",
  familyNamePlaceholder:"Enter your name or family name",
  searching:"Searching…",noGuestFound:"Sorry, no guest found with that name.",
  selectYourName:"Please select your name",
  willYouAttend:"Will you be attending?",
  yesAttend:"Yes, happily attending",noAttend:"Sorry, cannot attend",
  takingLiquor:"Do you drink alcohol?",yes:"Yes",no:"No",
  guestCount:"Number of Guests",dietary:"Dietary Requirements (if any)",
  confirmRsvp:"Submit Response",sending:"Sending…",
  rsvpThanks:"Thank you for your response!",
  rsvpConfirmedMsg:"We look forward to seeing you.",
  rsvpDeclinedMsg:"May your blessings reach us. Thank you.",
  changeResponse:"Change Response",back:"Back",
  agendaTitle:"Wedding Day Agenda",agendaSub:"Special moments of our day",
  galleryTitle:"Moments of Love",
  gallerySub:"Smiles, quiet moments and little dreams — every step that brought us here…",
  loveNoteTitle:"A Special Note",loveNoteSubtitle:"To our beloved guests",
  blessingsTitle:"Blessings Book",blessingsSub:"Leave a blessing for us.",
  yourName:"Your Name",yourBlessing:"Your Blessing",
  sendBlessing:"Submit Blessing",composing:"Composing…",
  blessingThanks:"Thank you! Your blessing will appear after approval.",
  awaitingBlessings:"Be the first to leave a blessing…",
  confirmedCount:"Confirmed Guests",
  scrollPrompt:"Scroll Down",search:"Search",
  enterOpen:"Open the Invitation",
  lampPrompt:"Touch the lamp to open the invitation",
  addToCalendar:"📅 Add to Calendar",
  shareWhatsapp:"💬 Share on WhatsApp",
  withLove:"Crafted with love",celebrating:"Helasiritha",
  coupleNames:"Kaushani & Gaurawa",
  defaultLoveNote:"We cannot express in words the joy your presence at our wedding brings us. Your blessings will illuminate the most special moment of our lives. Thank you.",
};

const SI_MONTHS=["ජනවාරි","පෙබරවාරි","මාර්තු","අප්‍රේල්","මැයි","ජූනි","ජූලි","අගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්"];
const SI_DAYS=["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්‍රහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"];

// ═══ STATE ═══
const state = {
  ready:false, lang:'si',
  site:{brideNameSi:"කෞශානි",groomNameSi:"ගෞරව",brideNameEn:"Kaushani",groomNameEn:"Gaurawa",
    brideParentsSi:"",groomParentsSi:"",
    weddingDateISO:"2028-01-12T09:15:00+05:30",ceremonyTimeLabel:"පෙ.ව. 9.15 සිට",
    venueName:"The Epitome Hotel",venueAddress:"කුරුණෑගල",mapUrl:"",
    rsvpDeadlineISO:"",allowLiquorPref:true,allowDietaryPref:true,
    coupleImageUrl:"",inviteWordingSi:"",loveNoteSi:"",ambientAudioUrl:""},
  theme:{primary:"#D4A844",secondary:"#EDE0C4",accent:"#B8860B",surface:"#F5ECD7",text:"#2C1810"},
  visibility:{invitationCard:true,countdown:true,rsvp:true,agenda:true,gallery:true,blessings:true,loveNote:true},
  stats:{totalGuests:0,confirmed:0,pending:0,declined:0},
  agenda:[],gallery:[],blessings:[]
};

// ═══ HELPERS ═══
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=s=>String(s||'').toLowerCase().normalize('NFC').replace(/[\u200b-\u200d\uFEFF]/g,'').replace(/\s+/g,' ').trim();

function applyTheme(t){
  const s=document.documentElement.style;
  s.setProperty('--c-primary',t.primary);s.setProperty('--c-secondary',t.secondary);
  s.setProperty('--c-accent',t.accent);s.setProperty('--c-surface',t.surface);s.setProperty('--c-ink',t.text);
}
function optImgUrl(url,w){
  if(!url||!url.includes('/upload/'))return url||'';
  const tx=['f_auto','q_auto'];if(w)tx.push(`w_${w}`,'c_limit','dpr_auto');
  return url.replace('/upload/',`/upload/${tx.join(',')}/`);
}
function formatDateSi(iso){const d=new Date(iso);if(isNaN(d.getTime()))return iso;return`${SI_DAYS[d.getDay()]}, ${d.getFullYear()} ${SI_MONTHS[d.getMonth()]} ${d.getDate()}`}

// ═══ FIREBASE ═══
let db,firestore;
async function initFirebase(){
  const{initializeApp}=await import(`${FB_URL}/firebase-app.js`);
  firestore=await import(`${FB_URL}/firebase-firestore.js`);
  const app=initializeApp(FB_CONFIG);
  db=firestore.getFirestore(app);
}

function startListeners(){
  const{doc,onSnapshot,collection,query,orderBy,where,limit}=firestore;
  onSnapshot(doc(db,'config','site'),snap=>{if(snap.exists())state.site={...state.site,...snap.data()};state.ready=true;render()},()=>{state.ready=true;render()});
  onSnapshot(doc(db,'config','theme'),snap=>{if(snap.exists())state.theme={...state.theme,...snap.data()};applyTheme(state.theme)});
  onSnapshot(doc(db,'config','visibility'),snap=>{if(snap.exists())state.visibility={...state.visibility,...snap.data()};render()});
  onSnapshot(doc(db,'config','stats'),snap=>{if(snap.exists())state.stats={...state.stats,...snap.data()};render()});
  onSnapshot(query(collection(db,'agenda'),orderBy('order','asc')),snap=>{state.agenda=snap.docs.map(d=>({id:d.id,...d.data()})).filter(d=>d.visible!==false);render()},()=>{});
  onSnapshot(query(collection(db,'gallery'),orderBy('order','asc')),snap=>{state.gallery=snap.docs.map(d=>({id:d.id,...d.data()}));render()},()=>{});
  onSnapshot(query(collection(db,'blessings'),where('approved','==',true),limit(100)),snap=>{state.blessings=snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));render()},()=>{});
  applyTheme(state.theme);
}

// ═══ GUEST SEARCH ═══
async function searchGuests(q){
  const{collection,query,where,getDocs,orderBy,limit}=firestore;
  const n=normalize(q);if(n.length<2)return[];
  let results=[];
  try{const snap=await getDocs(query(collection(db,'guests'),where('searchTokens','array-contains',n),limit(25)));results=snap.docs.map(d=>({id:d.id,...d.data()}))}catch{}
  if(!results.length){try{const all=await getDocs(query(collection(db,'guests'),orderBy('name'),limit(800)));results=all.docs.map(d=>({id:d.id,...d.data()})).filter(g=>{const gn=normalize(g.name+' '+g.familyName);return gn.includes(n)||gn.replace(/\s/g,'').includes(n.replace(/\s/g,''))}).slice(0,25)}catch{}}
  return results;
}

async function submitRsvp({guestId,guestName,side,attending,takingLiquor,partySize,dietary}){
  const{doc,setDoc}=firestore;
  const status=attending?'confirmed':'declined';
  await setDoc(doc(db,'rsvps',guestId),{guestId,guestName:String(guestName||'').slice(0,120),side:side||'groom',status,takingLiquor:!!takingLiquor,partySize:Math.min(30,Math.max(1,Number(partySize)||1)),dietary:String(dietary||'').slice(0,280),respondedAt:Date.now()},{merge:true});
  try{localStorage.setItem(`hs_rsvp_${guestId}`,JSON.stringify({status,takingLiquor,partySize,dietary}))}catch{}
  return status;
}

async function submitBlessing(name,msg){
  const{collection,addDoc}=firestore;
  const message=String(msg||'').trim().slice(0,400);
  if(!message)throw new Error('empty');
  await addDoc(collection(db,'blessings'),{guestName:String(name||'').trim().slice(0,60)||(state.lang==='en'?'Guest':'ආගන්තුකයෙක්'),message,approved:false,createdAt:Date.now()});
}

// ═══ COUNTDOWN ═══
let cdInterval;
function startCountdown(){
  clearInterval(cdInterval);
  cdInterval=setInterval(()=>{
    const diff=new Date(state.site.weddingDateISO).getTime()-Date.now();
    if(isNaN(diff)||diff<=0){$('#cdGrid').style.display='none';$('#cdDone').style.display='block';clearInterval(cdInterval);return}
    const s=Math.floor(diff/1000);
    $('#cdDays').textContent=String(Math.floor(s/86400)).padStart(3,'0');
    $('#cdHours').textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');
    $('#cdMins').textContent=String(Math.floor(s%3600/60)).padStart(2,'0');
    $('#cdSecs').textContent=String(s%60).padStart(2,'0');
  },1000);
}

// ═══ CALENDAR EXPORT ═══
function exportCalendar(site){
  const e=new Date(site.weddingDateISO),end=new Date(e.getTime()+6*3600*1000);
  const fmt=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const escIcs=s=>String(s||'').replace(/[,;\\]/g,c=>'\\'+c).replace(/\n/g,'\\n');
  const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Helasiritha//Wedding//SI','BEGIN:VEVENT',`UID:${Date.now()}@helasiritha`,`DTSTAMP:${fmt(new Date())}`,`DTSTART:${fmt(e)}`,`DTEND:${fmt(end)}`,`SUMMARY:${escIcs(site.groomNameSi+' ◇ '+site.brideNameSi+' Wedding')}`,`LOCATION:${escIcs(site.venueName+', '+site.venueAddress)}`,'BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:Wedding tomorrow!','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');
  const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='helasiritha-wedding.ics';
  document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(a.href);
}

// ═══ AGENDA ICONS ═══
const AG_ICONS={
  poruwa:()=>punkalasa('orn-punkalasa','100%'),
  lamp:()=>mangalaLamp('orn-lamp','100%'),
  lotus:()=>`<svg viewBox="0 0 60 60" fill="none" style="width:100%;height:100%;color:var(--temple-gold-dark)"><g fill="currentColor"><path d="M30 5c4 8 6 22 0 38-6-16-4-30 0-38Z" opacity=".9"/><path d="M30 14c10 6 14 18 12 32-10-6-14-18-12-32Z" opacity=".7"/><path d="M30 14c-10 6-14 18-12 32 10-6 14-18 12-32Z" opacity=".7"/></g></svg>`,
  ring:()=>`<svg viewBox="0 0 60 60" fill="none" style="width:100%;height:100%;color:var(--temple-gold-dark)"><circle cx="30" cy="34" r="14" stroke="currentColor" stroke-width="3" fill="none"/><path d="M22 20l8-8 8 8" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  feast:()=>`<svg viewBox="0 0 60 60" fill="none" style="width:100%;height:100%;color:var(--temple-gold-dark)"><ellipse cx="30" cy="40" rx="20" ry="8" stroke="currentColor" stroke-width="2" fill="none"/><path d="M10 40c0-14 8-24 20-24s20 10 20 24" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
  sesath:()=>sesath('orn-sesath','5'),'default':()=>`<svg viewBox="0 0 60 60" fill="none" style="width:100%;height:100%;color:var(--temple-gold-dark)"><circle cx="30" cy="30" r="20" stroke="currentColor" stroke-width="2" fill="none" opacity=".5"/><circle cx="30" cy="30" r="12" stroke="currentColor" stroke-width="2" fill="none" opacity=".6"/><circle cx="30" cy="30" r="5" fill="currentColor" opacity=".7"/></svg>`
};

// ═══ RENDER ═══
function render(){
  const s=state.site,v=state.visibility,t=state.lang==='en'?EN:SI;

  // Visibility
  const show=(id,cond)=>{const el=$(`#${id}`);if(el)el.hidden=!cond};
  show('invitation',v.invitationCard);show('countdown',v.countdown);show('rsvp',v.rsvp);
  show('agenda',v.agenda&&state.agenda.length>0);show('gallery',v.gallery&&state.gallery.length>0);
  show('blessings',v.blessings);show('lovenote',v.loveNote);

  // Gateway ornaments
  $('#gwLamp').innerHTML=mangalaLamp('orn-lamp');

  // Hero
  if(s.coupleImageUrl){$('#heroImg').src=optImgUrl(s.coupleImageUrl,800);$('#heroImg').style.display='block';$('#heroEmpty').style.display='none'}
  else{$('#heroEmpty').style.display='';$('#heroEmpty').innerHTML=`<div style="width:100px">${punkalasa('orn-punkalasa')}</div><span>${esc(t.coupleNames)}</span>`}

  // Hero names
  $('#heroNames').innerHTML=`${esc(state.lang==='en'?s.brideNameEn:s.brideNameSi)} <span class="amp">&amp;</span> ${esc(state.lang==='en'?s.groomNameEn:s.groomNameSi)}`;
  $('#heroNamesSi').textContent=`${s.brideNameSi} & ${s.groomNameSi}`;

  // Hero date/venue
  const d=new Date(s.weddingDateISO);
  $('#heroDate').textContent=`${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
  $('#heroVenue').textContent=`${s.venueName}, ${s.venueAddress}`;

  // Makara Thorana behind hero
  $('#heroThorana').innerHTML=makaraThorana('hero-thorana');

  // Sesath (Royal Umbrellas)
  $('#sesathL').innerHTML=sesath('orn-sesath',7);
  $('#sesathR').innerHTML=sesath('orn-sesath',7);

  // Invitation
  const dateStr=state.lang==='en'?formatDateSi(s.weddingDateISO).replace(/,/,''):formatDateSi(s.weddingDateISO);
  $('#invBrideName').textContent=state.lang==='en'?s.brideNameEn:s.brideNameSi;
  $('#invGroomName').textContent=state.lang==='en'?s.groomNameEn:s.groomNameSi;
  $('#invPreBride').textContent=t.belovedDaughter;
  $('#invPreGroom').textContent=t.belovedSon;
  $('#invLine').textContent=t.requestPresence;
  $('#invFrom').textContent=t.bothFamilies;
  $('#invDate').textContent=dateStr;
  $('#invTime').textContent=s.ceremonyTimeLabel||'';
  $('#invVenue').textContent=s.venueName||'';
  $('#invKalasa').innerHTML=punkalasa('orn-punkalasa');
  // Liyawala under invitation heading
  $('#invThorana').innerHTML=liyawala('orn-liyawala');
  if(s.brideParentsSi||s.groomParentsSi)$('#invParents').textContent=`${s.brideParentsSi} & ${s.groomParentsSi}`;
  if(s.mapUrl){$('#mapLink').href=s.mapUrl;$('#mapLink').style.display=''}else{$('#mapLink').style.display='none'}

  // RSVP sesath
  $('#rsvpSesathL').innerHTML=sesath('orn-sesath',7);
  $('#rsvpSesathR').innerHTML=sesath('orn-sesath',7);

  // Lamp / confirmed count
  $('#mangalaLamp').innerHTML=mangalaLamp('orn-lamp');
  $('#lampCount').textContent=state.stats.confirmed||0;

  // Agenda
  const agendaList=$('#agendaList');
  if(state.agenda.length){
    agendaList.innerHTML=state.agenda.map(item=>{
      const iconFn=AG_ICONS[item.icon]||AG_ICONS['default'];
      return`<div class="ag-item reveal"><div class="ag-icon">${iconFn()}</div><div class="ag-body"><div class="ag-time">${esc(item.timeLabel||'')}</div><div class="ag-title">${esc(item.titleSi||'')}</div>${item.descSi?`<div class="ag-desc">${esc(item.descSi)}</div>`:''}</div></div>`
    }).join('');
    $('#agendaEmpty').style.display='none';
  }else{agendaList.innerHTML='';$('#agendaEmpty').style.display=''}

  // Gallery
  const galGrid=$('#galleryGrid');
  if(state.gallery.length){
    galGrid.innerHTML=state.gallery.map((item,i)=>{const url=optImgUrl(item.url,600);return`<figure data-idx="${i}"><img loading="lazy" src="${esc(url)}" alt="${esc(item.alt||'')}"/>${item.alt?`<figcaption>${esc(item.alt)}</figcaption>`:''}</figure>`}).join('');
    $('#galleryEmpty').style.display='none';
    $$('figure',galGrid).forEach(fig=>{fig.onclick=()=>openLightbox(parseInt(fig.dataset.idx))});
  }else{galGrid.innerHTML='';$('#galleryEmpty').style.display=''}

  // Blessings
  const blessGrid=$('#blessGrid');
  if(state.blessings.length){
    blessGrid.innerHTML=state.blessings.map(b=>`<div class="bless-card"><div class="bless-msg">"${esc(b.message)}"</div><div class="bless-name">— ${esc(b.guestName)}</div></div>`).join('');
    $('#blessEmpty').style.display='none';
  }else{blessGrid.innerHTML='';$('#blessEmpty').style.display=''}

  // Footer
  $('#footKalasa').innerHTML=punkalasa('orn-punkalasa');
  const wd=new Date(s.weddingDateISO);
  $('#footDate').textContent=`${String(wd.getDate()).padStart(2,'0')} · ${String(wd.getMonth()+1).padStart(2,'0')} · ${wd.getFullYear()}`;

  // Love note
  if(s.loveNoteSi){$('#loveText').innerHTML=s.loveNoteSi.split(/\n\s*\n/).map(p=>esc(p.trim())).filter(Boolean).join('<br><br>')}
  else{$('#loveText').textContent=t.defaultLoveNote}

  // Title
  document.title=`${s.brideNameSi} & ${s.groomNameSi} · මංගල ආරාධනය`;

  // WhatsApp share
  const waText=encodeURIComponent(`${s.brideNameSi} & ${s.groomNameSi} — ${dateStr}\n${s.venueName}\n${location.href}`);
  $('#waShare').href=`https://wa.me/?text=${waText}`;

  initReveal();
}

// ═══ REVEAL ON SCROLL ═══
function initReveal(){
  const els=$$('.reveal:not(.in)');if(!els.length)return;
  if('IntersectionObserver'in window){
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(el=>obs.observe(el));
  }else{els.forEach(el=>el.classList.add('in'))}
}

// ═══ GATEWAY ═══
function initGateway(){
  const gw=$('#gateway');
  const enter=()=>{gw.classList.add('gone');setTimeout(()=>{gw.style.display='none'},1300);startCountdown()};
  $('#gwEnter').addEventListener('click',enter);
  $('#gwLamp').addEventListener('click',enter);
}

// ═══ TRANSLATE ═══
function initTranslate(){
  const btn=$('#translateBtn');
  btn.addEventListener('click',()=>{
    state.lang=state.lang==='si'?'en':'si';
    document.body.classList.toggle('en',state.lang==='en');
    document.documentElement.lang=state.lang==='en'?'en':'si';
    const label=btn.querySelector('span[data-si]');
    label.textContent=state.lang==='si'?'English':'සිංහල';
    $$('[data-si]').forEach(el=>{const val=el.getAttribute(state.lang==='en'?'data-en':'data-si');if(val!==null)el.innerHTML=val});
    $$('[data-placeholder-si]').forEach(el=>{el.placeholder=el.getAttribute(state.lang==='en'?'data-placeholder-en':'data-placeholder-si')||''});
    render();startCountdown();
  });
}

// ═══ RSVP LOGIC ═══
let currentGuest=null,isAttending=true,takingLiquor=false,partySize=1;

function showRsvpStage(stage){
  $$('.rsvp-stage').forEach(el=>el.classList.remove('active'));
  const id=stage==='search'?'#rsvpSearch':stage==='choose'?'#rsvpChoose':stage==='details'?'#rsvpDetails':'#rsvpThanks';
  $(id).classList.add('active');
}

function initRSVP(){
  const input=$('#rsvpInput'),searchBtn=$('#rsvpSearchBtn'),results=$('#rsvpResults');

  async function doSearch(){
    const q=input.value.trim();
    if(q.length<2){results.innerHTML=`<p class="note">${esc(state.lang==='en'?'Type at least 2 characters.':'අකුරු 2ක්වත් ටයිප් කරන්න.')}</p>`;return}
    results.innerHTML=`<p class="note">${esc(state.lang==='en'?'Searching…':'සොයමින්…')}</p>`;
    const guests=await searchGuests(q);
    if(!guests.length){results.innerHTML=`<p class="note">${esc(state.lang==='en'?'No guest found.':'ආරාධිතයෙකු හමු නොවීය.')}</p>`;return}
    results.innerHTML=guests.map(g=>`<button class="guest-pick" data-id="${g.id}"><div><div class="gn">${esc(g.name)}</div><div class="gfam">${esc(g.familyName||'')}</div></div><span style="color:var(--temple-gold-dark)">→</span></button>`).join('');
    $$('.guest-pick',results).forEach(btn=>{btn.addEventListener('click',()=>{const g=guests.find(x=>x.id===btn.dataset.id);if(!g)return;currentGuest=g;showRsvpStage('choose');$('#rsvpGuestName').textContent=g.name;$('#rsvpGuestFamily').textContent=g.familyName||''})});
  }
  searchBtn.addEventListener('click',doSearch);
  input.addEventListener('keydown',e=>{if(e.key==='Enter')doSearch()});

  $('#rsvpYes').addEventListener('click',()=>{isAttending=true;$('#rsvpYes').classList.add('sel');$('#rsvpNo').classList.remove('sel');partySize=1;$('#partyVal').textContent='1';$('#liquorField').style.display=state.site.allowLiquorPref?'':'none';$('#dietaryField').style.display=state.site.allowDietaryPref?'':'none';showRsvpStage('details')});
  $('#rsvpNo').addEventListener('click',()=>{isAttending=false;$('#rsvpYes').classList.remove('sel');$('#rsvpNo').classList.add('sel');$('#liquorField').style.display='none';$('#dietaryField').style.display='none';showRsvpStage('details')});
  $('#partyMinus').addEventListener('click',()=>{if(partySize>1){partySize--;$('#partyVal').textContent=partySize}});
  $('#partyPlus').addEventListener('click',()=>{if(partySize<30){partySize++;$('#partyVal').textContent=partySize}});
  $('#liquorYes').addEventListener('click',()=>{takingLiquor=true;$('#liquorYes').classList.add('sel');$('#liquorNo').classList.remove('sel')});
  $('#liquorNo').addEventListener('click',()=>{takingLiquor=false;$('#liquorNo').classList.add('sel');$('#liquorYes').classList.remove('sel')});
  takingLiquor=false;$('#liquorNo').classList.add('sel');
  $('#rsvpBack').addEventListener('click',()=>showRsvpStage('choose'));

  $('#rsvpSubmit').addEventListener('click',async()=>{
    if(!currentGuest)return;
    const btn=$('#rsvpSubmit');btn.disabled=true;
    btn.textContent=state.lang==='en'?'Sending…':'යවමින්…';
    try{
      await submitRsvp({guestId:currentGuest.id,guestName:currentGuest.name,side:currentGuest.side,attending:isAttending,takingLiquor,partySize,dietary:$('#dietaryInput').value});
      const tr=state.lang==='en'?EN:SI;
      $('#thanksTitle').textContent=tr.rsvpThanks;
      $('#thanksMsg').textContent=isAttending?tr.rsvpConfirmedMsg:tr.rsvpDeclinedMsg;
      showRsvpStage('thanks');
    }catch{alert(state.lang==='en'?'Error submitting. Please try again.':'දෝෂයක් සිදු විය. නැවත උත්සාහ කරන්න.')}
    btn.disabled=false;btn.textContent=state.lang==='en'?'Submit Response':'කාරුණික පිළිතුර එවන්න';
  });
  $('#rsvpChange').addEventListener('click',()=>{currentGuest=null;showRsvpStage('search');input.value='';results.innerHTML=''});
}

// ═══ BLESSINGS ═══
function initBlessings(){
  $('#blessForm').addEventListener('submit',async e=>{
    e.preventDefault();const btn=$('#blessSubmit');btn.disabled=true;const orig=btn.textContent;
    btn.textContent=state.lang==='en'?'Composing…':'රචනා කරමින්…';
    try{await submitBlessing($('#blessName').value,$('#blessMsg').value);$('#blessName').value='';$('#blessMsg').value='';$('#blessThanks').style.display='';setTimeout(()=>$('#blessThanks').style.display='none',5000)}
    catch{alert(state.lang==='en'?'Please write a blessing.':'කරුණාකර සුබ පැතුමක් ලියන්න.')}
    btn.disabled=false;btn.textContent=orig;
  });
}

// ═══ LIGHTBOX ═══
let lbIdx=0;
function openLightbox(idx){lbIdx=idx;const item=state.gallery[idx];if(!item)return;$('#lbImg').src=optImgUrl(item.url,1600);$('#lbCap').textContent=item.alt||'';$('#lightbox').classList.add('open')}
function initLightbox(){
  $('#lbClose').addEventListener('click',()=>$('#lightbox').classList.remove('open'));
  $('#lbPrev').addEventListener('click',()=>{lbIdx=(lbIdx-1+state.gallery.length)%state.gallery.length;openLightbox(lbIdx)});
  $('#lbNext').addEventListener('click',()=>{lbIdx=(lbIdx+1)%state.gallery.length;openLightbox(lbIdx)});
  $('#lightbox').addEventListener('click',e=>{if(e.target===$('#lightbox'))$('#lightbox').classList.remove('open')});
  document.addEventListener('keydown',e=>{if(!$('#lightbox').classList.contains('open'))return;if(e.key==='Escape')$('#lightbox').classList.remove('open');if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+state.gallery.length)%state.gallery.length;openLightbox(lbIdx)}if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%state.gallery.length;openLightbox(lbIdx)}});
}

// ═══ TOPBAR & TO-TOP ═══
function initTopbar(){
  let ticking=false;
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{$('#topbar').classList.toggle('solid',window.scrollY>80);const toTop=$('#toTop');if(window.scrollY>600){toTop.style.opacity='1';toTop.style.pointerEvents='auto'}else{toTop.style.opacity='0';toTop.style.pointerEvents='none'}ticking=false});ticking=true}});
  $('#toTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

// ═══ CALENDAR ═══
function initCalendar(){$('#calBtn').addEventListener('click',()=>exportCalendar(state.site))}

// ═══ PETALS ═══
function initPetals(){
  const c=$('#petals');
  if(document.body.classList.contains('lite')||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  for(let i=0;i<20;i++){
    const p=document.createElement('div');p.className='petal';
    const sz=8+Math.random()*12;
    p.innerHTML=`<svg viewBox="0 0 20 20" width="${sz}" height="${sz}"><ellipse cx="10" cy="10" rx="8" ry="5" fill="currentColor" opacity=".5"/></svg>`;
    p.style.cssText=`left:${Math.random()*100}%;animation-duration:${8+Math.random()*10}s;animation-delay:${Math.random()*12}s;opacity:${.2+Math.random()*.4}`;
    c.appendChild(p);
  }
}

// ═══ 3D PARTICLES ═══
function initParticles3D(){
  const canvas=$('#particles3d');if(!canvas||document.body.classList.contains('lite'))return;
  const ctx=canvas.getContext('2d');let w,h,particles=[];
  function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight}
  function create(){particles=[];const count=Math.min(50,Math.floor(w*h/25000));for(let i=0;i<count;i++)particles.push({x:Math.random()*w,y:Math.random()*h,z:Math.random()*3+.5,vx:(Math.random()-.5)*.3,vy:-Math.random()*.15-.05,r:Math.random()*1.5+.5,a:Math.random()*.4+.2})}
  function draw(){ctx.clearRect(0,0,w,h);for(const p of particles){p.x+=p.vx*p.z;p.y+=p.vy*p.z;if(p.y<-10){p.y=h+10;p.x=Math.random()*w}if(p.x<-10)p.x=w+10;if(p.x>w+10)p.x=-10;ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.z*.5,0,Math.PI*2);ctx.fillStyle=`rgba(212,168,68,${p.a*.6})`;ctx.fill()}requestAnimationFrame(draw)}
  resize();create();draw();window.addEventListener('resize',()=>{resize();create()});
}

// ═══ MUSIC ═══
function initMusic(){
  const btn=$('#musicBtn');let audio=null;
  btn.addEventListener('click',()=>{
    if(!state.site.ambientAudioUrl)return;
    if(!audio){audio=new Audio(state.site.ambientAudioUrl);audio.loop=true;audio.volume=.4}
    if(audio.paused){audio.play().catch(()=>{});btn.classList.add('on')}else{audio.pause();btn.classList.remove('on')}
  });
}

// ═══ BOOT ═══
async function boot(){
  await initFirebase();
  initGateway();initTranslate();initRSVP();initBlessings();initLightbox();initTopbar();initCalendar();initPetals();initParticles3D();initMusic();
  startListeners();
}
boot().catch(err=>{console.error('[Helasiritha] Boot failed:',err);render()});
