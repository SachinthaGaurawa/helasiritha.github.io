/* ════════════════════════════════════════════════════════════════════════
   හෙළ සිරිත · Helasiritha — Public Application  (assets/app.js)  [ES module]
   ── v3 "Noir & Champagne" · modern ultra-luxury · cinematic ────────────────
   • Renders from built-in DEFAULTS first (works offline), then live-syncs from
     Cloud Firestore (admin → public, real-time) using the SAME schema as before.
   • Bilingual: Sinhala-first (natural, warm) with an instant EN ⇄ සිං toggle.
   • Firestore CONTRACT preserved byte-for-byte (see field map below).
   ════════════════════════════════════════════════════════════════════════ */

/* Firebase web config — NON-secret, identical byte-for-byte in the admin app */
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
/* Public reCAPTCHA Enterprise site key for Firebase App Check — safe to
   ship in client code, same "public but rules-enforced" story as FB.apiKey
   above (App Check's real protection lives server-side, verified against
   this project via Firebase/Google Cloud's own backend — there is no
   matching "secret key" to ever put anywhere in THIS integration; that
   only exists for the older reCAPTCHA v2/v3 admin-console flow, not
   Enterprise, and even there it would never belong in client code).
   Registered at Firebase Console -> Build -> App Check -> Apps ->
   reCAPTCHA Enterprise. connect() below (new appCheck.
   ReCaptchaEnterpriseProvider(...), NOT ReCaptchaV3Provider — Enterprise
   keys are verified against a different backend and a v3 provider would
   silently fail to validate them) only ever attaches a token to Firestore
   requests; Firestore's own rules do NOT require that token yet. That
   enforcement step is a deliberate, separate follow-up: it can't safely
   be turned on until the token pipeline is confirmed working end-to-end
   against the real deployed site (this sandbox's network policy can't
   reach reCAPTCHA's/Google's services to verify that itself) — turning
   it on blind risks silently blocking real guests' RSVP submissions,
   which is a materially worse failure than the abuse case this closes. */
const APP_CHECK_SITE_KEY = "6LfksswtAAAAADCY0dX--_9c5l93Ziqa9T-R1vRn";

/* ── Bilingual dictionary ─ keys identical in both languages ─────────────── */
const TEXT = {
  si: {
    brand: "හෙළ සිරිත",
    footCredit: 'හෙළ සිරිත · ආදරයෙන් <span class="heart">♥</span>',
    nav: { invitation: "ආරාධනය", agenda: "වැඩසටහන", gallery: "මතකයන්", blessings: "සුබ පැතුම්", rsvp: "පැමිණීම" },
    langLabel: "EN", langTitle: "Switch to English",
    entryEyebrow: "ශුභ මංගලම්", entrySub: "අපගේ විවාහ මංගල්‍යයට ඔබ සාදරයෙන් ආරාධනා කරමු",
    entryCta: "පහන දැල්වීමට ස්පර්ශ කරන්න", entryEnterAria: "පහන දැල්වීම — ඇතුළු වන්න",
    loading: "සූදානම් වෙමින්…",
    heroEyebrow: "ආයුබෝවන්",
    heroTag: "අපගේ විවාහ මංගල්‍යය සැමරීමට ඔබට සාදරයෙන් ආරාධනා කරමු",
    and: "සහ",
    heroRsvp: "පැමිණීම තහවුරු කරන්න",
    scrollCue: "පහළට",
    invEyebrow: "ආදරයෙන්",
    invTitle: "මංගල ආරාධනය",
    invSentence: (a) => "මෙම සුවිශේෂී දිනය අප සමඟ සැමරීමට ඔබ සැම සාදරයෙන් ආරාධනා කරමු — " +
      a.y + " " + a.mo + " මස " + a.dd + " වන " + a.wd + " දින, " + a.venue + ", " + a.city + " හිදී.",
    date: "දිනය", venueLbl: "ස්ථානය", timeLbl: "වේලාව",
    closing: "ඔබ සැමගේ පැමිණීම අපගේ සතුට තවත් අගනා කරයි.",
    from: "ආදරයෙන්, දෙපාර්ශවයේ දෙමාපියන් සහ පවුලේ සැම.",
    viewLocation: "ස්ථානය සිතියමින් බලන්න",
    cdEyebrow: "තව ටික කලයි",
    cdTitle: "මංගල දිනයට තවත්",
    days: "දින", hours: "පැය", minutes: "මිනිත්තු", seconds: "තත්පර",
    theDay: "අද අපගේ සුබ මංගල දිනයයි ✦",
    rsvpEyebrow: "පැමිණීම",
    rsvpTitle: "ඔබගේ පැමිණීම තහවුරු කරන්න",
    rsvpSub: "ඔබව මෙහි දැකීම අපගේ ලොකුම සතුටයි.",
    rsvpHelp: "ඔබගේ නම හෝ පවුලේ නම ටයිප් කර සොයන්න.",
    searchPlaceholder: "ඔබගේ නම ඇතුළත් කරන්න",
    searchBtn: "සොයන්න",
    searching: "සොයමින්…",
    noGuest: "කණගාටුයි, එම නමින් ආරාධිතයෙකු හමු නොවීය.",
    proceedTyped: "මෙම නමින් ඉදිරියට යන්න",
    guestsLoading: "ආරාධිත ලැයිස්තුව පූරණය වෙමින්… තත්පරයකින් නැවත සොයන්න.",
    selectName: "කරුණාකර ඔබගේ නම තෝරන්න",
    willAttend: "ඔබ පැමිණෙනවා ද?",
    yesAttend: "ඔව්, සතුටින් පැමිණෙමි", noAttend: "කණගාටුයි, බැරිවෙයි",
    guestCount: "පැමිණෙන ගණන",
    confirmRsvp: "පිළිතුර එවන්න",
    rsvpThanks: "බොහොම ස්තූතියි!",
    rsvpYesMsg: "ඔබව මුණගැසීමට අපි මහත් ඕනෑකමින් සිටිමු ✦",
    rsvpNoMsg: "ඔබව අපි මිස් කරනවා — ඔබගේ ආදරයට ස්තූතියි.",
    rsvpError: "සම්බන්ධතාවයේ දෝෂයක් — ඔබගේ පිළිතුර සුරැකුණේ නැත. කරුණාකර නැවත උත්සාහ කරන්න.",
    rsvpPickFirst: "ඔබගේ පැමිණීම තහවුරු කරන්න.",
    changeResponse: "පිළිතුර වෙනස් කරන්න",
    back: "ආපසු",
    rsvpClosed: "පැමිණීම දැනුම්දීමේ කාලය දැනට අවසන්. ස්තූතියි.",
    agEyebrow: "අපගේ දිනය",
    agendaTitle: "දිනයේ වැඩසටහන",
    agendaSub: "මොහොතින් මොහොත අපගේ සැමරුම",
    galEyebrow: "ඡායාරූප",
    galleryTitle: "සෙනෙහසේ මතකයන්",
    gallerySub: "අප එක්ව ගෙවූ ලස්සන මොහොත් කිහිපයක්…",
    galleryEmpty: "ඡායාරූප ඉක්මනින් මෙහි දිස් වේ…",
    viewPhoto: "ඡායාරූපය විශාල කර බලන්න",
    loveEyebrow: "හදවතින්",
    loveTitle: "විශේෂ සටහනක්",
    loveSub: "අපගේ ආදරණීය අමුත්තනට",
    loveNoteDefault: "ආදරයෙන් හා කෘතඥතාවයෙන් පිරුණු හදවත් සමඟ, අපගේ ජීවිතයේ මෙම සුන්දර පරිච්ඡේදය ඔබ සමඟ සැමරීමට ලැබීම ගැන අපි ඉතා සතුටු වෙමු. ඔබගේ පැමිණීම, ආදරය හා ආශීර්වාද අප හට වචනවලින් කිව නොහැකි තරම් වටිනවා. ඔබ සැම සමඟ සිනා, සතුට හා අමතක නොවන මතකයන් බෙදා ගැනීමට අපි මහත් ඕනෑකමින් සිටිමු.",
    blEyebrow: "සුබ පැතුම්",
    blessingsTitle: "සුබ පැතුම් පොත",
    blessingsSub: "අප වෙනුවෙන් ඔබගේ සුබ පැතුමක් තබන්න.",
    yourName: "ඔබගේ නම",
    yourBlessing: "ඔබගේ සුබ පැතුම",
    sendBlessing: "සුබ පැතුම තැබීම",
    suggestBtn: "සුබ පැතුමක් යෝජනා කරන්න",
    writeOwnWish: "කරුණාකර ඔබගේම සුබ පැතුමක් ලියන්න",
    sending: "යවමින්…",
    blessingThanks: "ඔබගේ සුබ පැතුමට ස්තූතියි! අනුමැතියෙන් පසු එය මෙහි දිස් වේ.",
    blessingsEmpty: "පළමු සුබ පැතුම ඔබගෙන් වේවා…",
    callUs: "අමතන්න", addCal: "දින දර්ශනයට", shareWa: "WhatsApp",
    setup: "පද්ධතිය සැකසෙමින් පවතී. මඳක් පසුව නැවත පිවිසෙන්න.",
    months: ["ජනවාරි","පෙබරවාරි","මාර්තු","අප්‍රේල්","මැයි","ජූනි","ජූලි","අගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්"],
    weekdays: ["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්‍රහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"],
    suggest: [
      "එකිනෙකාගේ අඩුපාඩු තේරුම් අරගෙන, ජීවිත කාලයම ආදරයෙන් බැඳිලා ඉන්න සුබ පතනවා!",
      "හැම ප්‍රශ්නෙකදීම එකිනෙකාට ලොකුම හයිය වෙන, හොඳම යාලුවො දෙන්නා වෙන්න.",
      "කවදාවත් තරහවෙලා නිදාගන්නෙ නැති, හැමදේම කතා කරලා විසඳගන්න ලස්සන බැඳීමක් වේවා.",
      "ජීවිතේ එන ඕනෑම කුණාටුවකට එකට මූණ දෙන්න පුළුවන් ශක්තිමත් ආදරයක් ඔයාලට තියේවා.",
      "එකිනෙකාගේ හීන වලට පියාපත් දෙන, අපූරු සහකරුවන් දෙදෙනෙක් වෙන්න.",
      "වයසට ගිහින් කොණ්ඩෙ සුදු වුණත්, අද වගේම ආදරෙන් අත් අල්ලගෙන ඉන්න ලැබෙන්න.",
      "ලෝකෙම එපා වුණත්, එකිනෙකා ළඟට ගියාම ලොකු සැනසීමක් දැනෙන ආදරයක් වේවා.",
      "ආදරේට වඩා විශ්වාසයත්, බැඳීමට වඩා යාළුකමත් පිරුණු සුන්දර පවුලක් වෙන්න.",
      "වැටෙන හැම වෙලාවකම අල්ලගන්න දෑත් වෙමින්, සතුටේදී එකට හිනාවෙන අපූරු ගමනක් යන්න.",
      "දෙන්නට දෙන්නා නැතුවම බැරි, ඒත් කිසිම දවසක එකිනෙකාට බරක් නොවෙන ආදරයක් වේවා.",
      "පුංචි පුංචි දේවල් වලින් පවා ජීවිතේ ලස්සන කරගන්න ඔයාලට පුළුවන් වෙන්න ඕනේ.",
      "හැම උදෑසනක්ම එකිනෙකාගේ හිනාව දැකලා පටන්ගන්න වාසනාව ලැබේවා.",
      "ආදරේ කියන්නේ එකම දිශාවකට එකට යන ගමනක්, ඒ ගමන කවදාවත් අතරමඟ නොනැවතේවා.",
      "කාලයත් එක්ක පරණ වෙන්නේ නැති, දවසින් දවස අලුත් වෙන ආදර කතාවක් ලියන්න.",
      "මොන දේ වුණත් 'මම ඔයා වෙනුවෙන් ඉන්නවා' කියලා කියන්න පුළුවන් විශ්වාසයක් ගොඩනගාගන්න.",
      "සතුට දෙගුණ කරන, දුක භාගයක් කරන අපූරු බැඳීමක් ඔයාලා අතරේ හැමදාම තියේවා.",
      "තමන්ගේ නිදහස වගේම අනිත් කෙනාගේ නිදහසටත් ගරු කරන ලස්සන පවුල් ජීවිතයක් ගත කරන්න.",
      "කිසිම දවසක එකිනෙකාට බොරු නොකරන, අවංකකම පිරුණු ආදරයක් ඔයාලට ලැබේවා.",
      "අඬන වෙලාවට උරහිසක් වෙන, හිනාවෙන වෙලාවට ඒක බෙදාගන්න කෙනෙක් හැමදාම ළඟ ඉන්නවා කියන සැනසීම තියේවා.",
      "සිනහව, ආදරය සහ එකිනෙකා කෙරෙහි ඇති ගෞරවයෙන් පිරුණු සුන්දර නිවහනක් ගොඩනඟන්න.",
      "ආදරේ කියන්නේ ඉවසීම. ඒ ඉවසීම ජීවිත කාලෙටම ඔයාලා දෙන්නා ගාව තියේවා.",
      "හොඳම කාලේ වගේම, ජීවිතේ අමාරුම කාලෙදිත් එකිනෙකාගේ අත් තදින් අල්ලගෙන ඉන්න.",
      "ඔයාලා දෙන්නා එකතු වෙලා හදන ලෝකය, ඔයාලා හිතුවටත් වඩා ගොඩක් ලස්සන වේවා.",
      "හැමදාමත් ආදරෙන්, එකිනෙකාට ගරු කරමින් ජීවත් වෙන්න ලැබෙන්න කියලා පතනවා.",
      "වෙනස්කම් තේරුම් අරගෙන, ඒ වෙනස්කම් වලටත් ආදරය කරන්න පුළුවන් බැඳීමක් වේවා.",
      "ජීවිතේ කොච්චර කාර්යබහුල වුණත්, එකිනෙකා වෙනුවෙන් වෙන් කරන වෙලාව කවදාවත් මඟහරින්න එපා.",
      "ඔයාලගේ ආදර කතාව දැකලා, අනිත් අයටත් ආදරේ කරන්න හිතෙන තරමට ඒක ලස්සන වේවා.",
      "හැම රණ්ඩුවක්ම අවසානයේ, ආදරේ තවත් වැඩි වෙන අපූරු යාළුකමක් ඔයාලට තියේවා.",
      "වචන වලින් කියන්න කලින්, හිතේ තියෙන දේ තේරුම් ගන්න පුළුවන් ගැඹුරු බැඳීමක් වේවා.",
      "දෙන්නා එකට ඉන්නකොට දැනෙන ඒ පුංචි සතුට, මුළු ජීවිත කාලයම පවතීවා.",
      "පිටස්තර ලෝකෙට මොනවා වුණත්, ඔයාලා දෙන්නගේ ලෝකෙ හැමදාම සාමකාමී වේවා.",
      "ආදරයෙන් පටන් ගත්ත මේ ගමන, අවබෝධයෙන් සහ සෙනෙහසින් ඉදිරියටම යන්න.",
      "අලුත් සිහින ගොඩක් එක්ක පටන් ගන්න මේ ජීවිතේ, කිසිම දවසක ඒ සිහින බොඳ නොවේවා.",
      "සැපේදී වගේම දුකේදීත් එකම විදියට ළඟින් ඉන්න පුළුවන් සහකරුවෙක් ලැබීම ගැන සතුටු වෙන්න.",
      "එකිනෙකාගේ අඩුපාඩු හදාගෙන, දවසින් දවස වඩාත් හොඳ මිනිස්සු වෙන්න මේ බැඳීම උදව්වක් වේවා.",
      "හැමදාම රෑට සමාදානයෙන් නිදාගෙන, උදේට ලොකු බලාපොරොත්තුවකින් අවදි වෙන්න ලැබේවා.",
      "ඔයාලගේ නිවහනට එන ඕනෑම කෙනෙකුට, ඔයාලගේ ආදරේ උණුසුම දැනෙන්න ඕනේ.",
      "තරුණ කාලේ පිස්සු වැඩ වගේම, වයසට ගියාම එකට ඉඳන් තේ බොන ලස්සන මතකයන් ගොඩක් හදාගන්න.",
      "ආදරේ කියන්නේ තමන්ට වඩා අනිත් කෙනා ගැන හිතන එක. ඒ කැපවීම හැමදාම තියේවා.",
      "මොන ප්‍රශ්නෙ ආවත් 'අපි මේක එකට විසඳමු' කියන හැඟීම හැමවෙලේම හිතේ තියාගන්න.",
      "සතුටින් පිරුණු දවස් වගේම, අභියෝගාත්මක දවස් වලදිත් එකිනෙකාගේ එකම සැනසීම වෙන්න.",
      "කෙලවරක් නැති කතාබහ, මහ හයියෙන් හිනාවෙන වෙලාවල් වලින් ඔයාලගේ ජීවිතේ පිරේවා.",
      "එකිනෙකාගේ සාර්ථකත්වය දැකලා, තමන්ගේ වගේම සතුටු වෙන්න පුළුවන් බැඳීමක් වේවා.",
      "ආදරේට කවදාවත් වයසක් නෑ. හැමදාමත් ඉස්කෝලෙ යන කාලේ වගේ ආදරෙන් ඉන්න.",
      "ජීවිතේ මොන තරම් දේවල් වෙනස් වුණත්, ඔයාලා දෙන්නා අතරේ තියෙන මේ බැඳීම කවදාවත් වෙනස් නොවේවා.",
      "හිත රිදෙන වචනයක්වත් නොකියන, හැමවෙලේම හිත හදන ආදරණීය යුගලයක් වෙන්න.",
      "ඔයාලා දෙන්නගේ හිනාව මුළු ගෙදරම ආලෝකමත් කරනවා. ඒ හිනාව කවදාවත් මැකී නොයන්න.",
      "ආදරෙන් අත්වැල් බැඳගෙන ලෝකෙම වුණත් දිනන්න පුළුවන් කියන විශ්වාසය හැමදාම තියේවා.",
      "මේ සුන්දර මංගල දිනයේ ඉඳන්, ඔයාලගේ ජීවිතේ හැම පිටුවක්ම ආදරෙන් ලියවේවා.",
      "හැමදාමත් අලුතින් ආදරේ හිතෙන, කවදාවත් එපා වෙන්නේ නැති අපූරු ජීවිතයක් ඔයාලට ලැබේවා!"
    ]
  },
  en: {
    brand: "Helasiritha",
    footCredit: 'Helasiritha · with love <span class="heart">♥</span>',
    nav: { invitation: "Invitation", agenda: "Schedule", gallery: "Moments", blessings: "Wishes", rsvp: "RSVP" },
    langLabel: "தமிழ்", langTitle: "தமிழுக்கு மாறவும்",
    entryEyebrow: "The Wedding Of", entrySub: "We joyfully invite you to celebrate our wedding day",
    entryCta: "Tap the lamp to enter", entryEnterAria: "Light the lamp — enter",
    loading: "Preparing…",
    heroEyebrow: "Welcome",
    heroTag: "We warmly invite you to celebrate our wedding",
    and: "&",
    heroRsvp: "Confirm your presence",
    scrollCue: "Scroll",
    invEyebrow: "With love",
    invTitle: "The Invitation",
    invSentence: (a) => "We joyfully invite you to celebrate this special day with us — " +
      a.wd + ", " + a.mo + " " + a.dd + ", " + a.y + " at " + a.venue + ", " + a.city + ".",
    date: "Date", venueLbl: "Venue", timeLbl: "Time",
    closing: "Your presence will make our joy complete.",
    from: "With love, the parents and families of both sides.",
    viewLocation: "View location on map",
    cdEyebrow: "Counting down",
    cdTitle: "Until the big day",
    days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
    theDay: "Today is our wedding day ✦",
    rsvpEyebrow: "RSVP",
    rsvpTitle: "Kindly confirm your attendance",
    rsvpSub: "Having you with us would mean the world.",
    rsvpHelp: "Search using your name or family name.",
    searchPlaceholder: "Enter your name",
    searchBtn: "Search",
    searching: "Searching…",
    noGuest: "Sorry, we couldn't find that name.",
    proceedTyped: "Continue with this name",
    guestsLoading: "Loading the guest list… please search again in a moment.",
    selectName: "Please select your name",
    willAttend: "Will you be attending?",
    yesAttend: "Yes, with joy", noAttend: "Sorry, can't make it",
    guestCount: "Number attending",
    confirmRsvp: "Send response",
    rsvpThanks: "Thank you so much!",
    rsvpYesMsg: "We can't wait to celebrate with you ✦",
    rsvpNoMsg: "We'll miss you — thank you for your love.",
    rsvpError: "Connection error — your response wasn't saved. Please try again.",
    rsvpPickFirst: "Please choose whether you'll be attending.",
    changeResponse: "Change response",
    back: "Back",
    rsvpClosed: "RSVPs are closed for now. Thank you.",
    agEyebrow: "Our day",
    agendaTitle: "The Wedding Schedule",
    agendaSub: "Our celebration, moment by moment",
    galEyebrow: "Gallery",
    galleryTitle: "Moments of Love",
    gallerySub: "A few of the beautiful moments we've shared…",
    galleryEmpty: "Photos will appear here soon…",
    viewPhoto: "View photo",
    loveEyebrow: "From the heart",
    loveTitle: "A Special Note",
    loveSub: "To our lovely guests",
    loveNoteDefault: "With hearts full of love and gratitude, we are so happy to celebrate this beautiful chapter of our lives with you. Your presence, love and blessings mean more to us than words can say. We can't wait to share laughter, joy and unforgettable memories with the people who matter most.",
    blEyebrow: "Wishes",
    blessingsTitle: "Guest Wishes",
    blessingsSub: "Leave a wish for us.",
    yourName: "Your name",
    yourBlessing: "Your wish",
    sendBlessing: "Send wish",
    suggestBtn: "Suggest a wish",
    writeOwnWish: "Please write your own wish",
    sending: "Sending…",
    blessingThanks: "Thank you for your wish! It will appear here after approval.",
    blessingsEmpty: "Be the first to leave a wish…",
    callUs: "Call", addCal: "Add to calendar", shareWa: "WhatsApp",
    setup: "The site is being set up. Please check back shortly.",
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    weekdays: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    suggest: [
      "May you always be each other's safest haven and greatest adventure.",
      "Here’s to a lifetime of late-night conversations and endless laughter.",
      "May your friendship grow stronger with every passing year.",
      "Never stop dating each other and never stop being best friends.",
      "Wishing you a marriage filled with trust, patience, and unwavering companionship.",
      "May you hold hands through every storm and celebrate together in the sunshine.",
      "Always remember to listen, forgive quickly, and love fiercely.",
      "May your home be a place of peace, filled with respect and deep understanding.",
      "Wishing you the courage to face the world together, as one unbroken team.",
      "May you grow old together but never let your love lose its youthful spark.",
      "Here’s to sharing silence comfortably and sharing joys loudly.",
      "May you always be the first person the other wants to share good news with.",
      "Wishing you a lifetime of choosing each other, every single day.",
      "May your love be a gentle anchor in a chaotic world.",
      "Always be each other's biggest cheerleader and strongest supporter.",
      "May the little moments—like morning coffee together—always feel incredibly special.",
      "Here’s to building a life so beautiful that reality is better than your dreams.",
      "May you never go to sleep angry, and always wake up grateful for each other.",
      "Wishing you a bond so strong that even the hardest days feel manageable.",
      "May you look at each other 50 years from now with the exact same love in your eyes.",
      "Always keep the promises you made today, especially the unspoken ones.",
      "May your marriage be a perfect blend of profound love and genuine friendship.",
      "Wishing you endless patience with each other's flaws and joy in each other's strengths.",
      "May you always find comfort in each other’s embrace after a long, hard day.",
      "Here’s to traveling the world together and finding home in each other.",
      "May you write a beautiful story together, one filled with kindness and grace.",
      "Wishing you a love that doesn’t just endure, but thrives in every season of life.",
      "May you always give each other the freedom to grow, while growing closer together.",
      "Always be quick to say 'I'm sorry' and even quicker to say 'I love you'.",
      "May your laughter ring loudest in your own home, making every day brighter.",
      "Here’s to shared dreams, shared burdens, and a deeply shared life.",
      "May you constantly discover new reasons to love each other as the years go by.",
      "Wishing you the wisdom to navigate life's challenges hand-in-hand.",
      "May your bond be completely unbreakable, no matter what life throws your way.",
      "Always protect your peace, your relationship, and your deep connection.",
      "May you always be the reason behind each other's truest, biggest smiles.",
      "Here’s to a love that is honest, authentic, and completely unpretentious.",
      "Wishing you a lifetime of inside jokes and secret glances across crowded rooms.",
      "May your love be the foundation of a beautiful, peaceful, and happy home.",
      "Always remember that it's the two of you against the problem, never against each other.",
      "May you find extraordinary joy in the most ordinary days spent together.",
      "Wishing you a love that feels like a warm fire on a cold night—comforting and safe.",
      "May your commitment to each other only deepen as time gracefully passes.",
      "Here’s to being fiercely loyal and deeply devoted to one another forever.",
      "May you always inspire each other to become the best versions of yourselves.",
      "Wishing you a future where your happiest memories are yet to be made.",
      "May your love be the quiet strength that carries you through any difficulty.",
      "Always hold onto the spark that brought you both together in the first place.",
      "May your life together be a masterpiece painted with trust, joy, and deep affection.",
      "Wishing you an absolutely beautiful forever, starting from this magical day forward."
    ]
  },
  ta: {
    brand: "ஹெல சிரித",
    footCredit: 'ஹெல சிரித · அன்புடன் <span class="heart">♥</span>',
    nav: { invitation: "அழைப்பிதழ்", agenda: "நிகழ்ச்சி நிரல்", gallery: "நினைவுகள்", blessings: "வாழ்த்துகள்", rsvp: "வருகை" },
    langLabel: "සිං", langTitle: "සිංහලට මාරු වන්න",
    entryEyebrow: "திருமண மங்களம்", entrySub: "எங்கள் திருமண நாளைக் கொண்டாட உங்களை அன்புடன் அழைக்கிறோம்",
    entryCta: "விளக்கை ஏற்ற தொடவும்", entryEnterAria: "விளக்கை ஏற்றி உள்ளே செல்லவும்",
    loading: "தயாராகிறது…",
    heroEyebrow: "வரவேற்பு",
    heroTag: "எங்கள் திருமண விழாவைக் கொண்டாட உங்களை அன்புடன் அழைக்கிறோம்",
    and: "மற்றும்",
    heroRsvp: "வருகையை உறுதிப்படுத்தவும்",
    scrollCue: "கீழே",
    invEyebrow: "அன்புடன்",
    invTitle: "திருமண அழைப்பிதழ்",
    invSentence: (a) => "இந்த சிறப்பு நாளை எங்களுடன் கொண்டாட உங்கள் அனைவரையும் அன்புடன் அழைக்கிறோம் — " +
      a.y + " " + a.mo + " " + a.dd + ", " + a.wd + " அன்று, " + a.venue + ", " + a.city + " இல்.",
    date: "தேதி", venueLbl: "இடம்", timeLbl: "நேரம்",
    closing: "உங்கள் வருகை எங்கள் மகிழ்ச்சியை மேலும் நிறைவு செய்யும்.",
    from: "அன்புடன், இருபக்கப் பெற்றோர்களும் குடும்பத்தினரும்.",
    viewLocation: "வரைபடத்தில் இடத்தைக் காண்க",
    cdEyebrow: "இன்னும் சில நாட்கள்",
    cdTitle: "மணநாளுக்கு இன்னும்",
    days: "நாட்கள்", hours: "மணி", minutes: "நிமிடம்", seconds: "விநாடி",
    theDay: "இன்று எங்கள் மங்கள மணநாள் ✦",
    rsvpEyebrow: "வருகை",
    rsvpTitle: "உங்கள் வருகையை உறுதிப்படுத்தவும்",
    rsvpSub: "உங்களை இங்கே காண்பது எங்களுக்கு மிகுந்த மகிழ்ச்சி.",
    rsvpHelp: "உங்கள் பெயரை அல்லது குடும்பப் பெயரைத் தட்டச்சு செய்து தேடவும்.",
    searchPlaceholder: "உங்கள் பெயரை உள்ளிடவும்",
    searchBtn: "தேடு",
    searching: "தேடுகிறது…",
    noGuest: "மன்னிக்கவும், அந்தப் பெயரில் அழைப்பாளர் யாரும் இல்லை.",
    proceedTyped: "இந்தப் பெயரில் தொடரவும்",
    guestsLoading: "அழைப்பாளர் பட்டியல் ஏற்றப்படுகிறது… சிறிது நேரத்தில் மீண்டும் தேடவும்.",
    selectName: "உங்கள் பெயரைத் தேர்ந்தெடுக்கவும்",
    willAttend: "நீங்கள் வருகிறீர்களா?",
    yesAttend: "ஆம், மகிழ்ச்சியுடன் வருகிறேன்", noAttend: "மன்னிக்கவும், வர இயலாது",
    guestCount: "வருகை தரும் எண்ணிக்கை",
    confirmRsvp: "பதிலை அனுப்பு",
    rsvpThanks: "மிக்க நன்றி!",
    rsvpYesMsg: "உங்களைச் சந்திக்க நாங்கள் ஆவலுடன் காத்திருக்கிறோம் ✦",
    rsvpNoMsg: "உங்களை நாங்கள் மிஸ் செய்வோம் — உங்கள் அன்பிற்கு நன்றி.",
    rsvpError: "இணைப்பு தவறு — உங்கள் பதில் சேமிக்கப்படவில்லை. மீண்டும் முயற்சிக்கவும்.",
    rsvpPickFirst: "உங்கள் வருகையை உறுதிப்படுத்தவும்.",
    changeResponse: "பதிலை மாற்று",
    back: "பின்செல்",
    rsvpClosed: "வருகை அறிவிக்கும் காலம் தற்போது முடிந்துவிட்டது. நன்றி.",
    agEyebrow: "எங்கள் நாள்",
    agendaTitle: "நாளின் நிகழ்ச்சி நிரல்",
    agendaSub: "தருணம் தருணமாக எங்கள் கொண்டாட்டம்",
    galEyebrow: "புகைப்படங்கள்",
    galleryTitle: "அன்பின் நினைவுகள்",
    gallerySub: "நாங்கள் ஒன்றாகக் கழித்த அழகிய தருணங்கள் சில…",
    galleryEmpty: "புகைப்படங்கள் விரைவில் இங்கே தோன்றும்…",
    viewPhoto: "புகைப்படத்தைப் பெரிதாகக் காண",
    loveEyebrow: "இதயத்திலிருந்து",
    loveTitle: "ஒரு சிறப்புக் குறிப்பு",
    loveSub: "எங்கள் அன்பு விருந்தினர்களுக்கு",
    loveNoteDefault: "அன்பும் நன்றியும் நிறைந்த இதயங்களுடன், எங்கள் வாழ்க்கையின் இந்த அழகிய அத்தியாயத்தை உங்களுடன் கொண்டாடுவதில் நாங்கள் மிகவும் மகிழ்ச்சியடைகிறோம். உங்கள் வருகையும் அன்பும் ஆசீர்வாதங்களும் வார்த்தைகளால் சொல்ல முடியாத அளவுக்கு எங்களுக்கு விலைமதிப்பற்றவை. உங்கள் அனைவருடனும் சிரிப்பையும் மகிழ்ச்சியையும் மறக்க முடியாத நினைவுகளையும் பகிர்ந்து கொள்ள நாங்கள் ஆவலுடன் காத்திருக்கிறோம்.",
    blEyebrow: "வாழ்த்துகள்",
    blessingsTitle: "வாழ்த்துப் புத்தகம்",
    blessingsSub: "எங்களுக்காக உங்கள் வாழ்த்தைப் பதிவு செய்யவும்.",
    yourName: "உங்கள் பெயர்",
    yourBlessing: "உங்கள் வாழ்த்து",
    sendBlessing: "வாழ்த்தைப் பதிவு செய்",
    suggestBtn: "ஒரு வாழ்த்தைப் பரிந்துரைக்கவும்",
    writeOwnWish: "தயவுசெய்து உங்கள் சொந்த வாழ்த்தை எழுதவும்",
    sending: "அனுப்புகிறது…",
    blessingThanks: "உங்கள் வாழ்த்திற்கு நன்றி! அனுமதிக்குப் பிறகு அது இங்கே தோன்றும்.",
    blessingsEmpty: "முதல் வாழ்த்து உங்களிடமிருந்து வரட்டும்…",
    callUs: "அழைக்கவும்", addCal: "நாட்காட்டியில்", shareWa: "WhatsApp",
    setup: "அமைப்பு தயாராகிறது. சிறிது நேரம் கழித்து மீண்டும் வரவும்.",
    months: ["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்"],
    weekdays: ["ஞாயிறு","திங்கள்","செவ்வாய்","புதன்","வியாழன்","வெள்ளி","சனி"],
    suggest: [
      "வாழ்க்கையின் ஒவ்வொரு தருணத்திலும் ஒருவருக்கொருவர் சிறந்த நண்பர்களாக வாழுங்கள்.",
      "உங்கள் இருவருக்கும் இடையில் உள்ள அன்பும் புரிதலும் வாழ்நாள் முழுவதும் நிலைத்திருக்கட்டும்.",
      "இன்பத்திலும் துன்பத்திலும் ஒருவருக்கொருவர் தோள் கொடுக்கும் துணையாக இருங்கள்.",
      "ஒவ்வொரு நாளும் உங்கள் காதலை புதிதாக கொண்டாடுங்கள், சிரிப்பால் இல்லத்தை நிரப்புங்கள்.",
      "எத்தனை சவால்கள் வந்தாலும், கைகோர்த்து ஒன்றாக எதிர்கொள்ளும் வலிமை கிடைக்கட்டும்.",
      "உங்கள் காதல் பயணம் எந்த தடங்கலும் இல்லாமல் சந்தோஷமாக தொடர வாழ்த்துகள்.",
      "ஒருவரையொருவர் புரிந்து கொண்டு, விட்டுக் கொடுத்து அழகான வாழ்க்கையை வாழுங்கள்.",
      "முதுமை அடையும் வரை உங்கள் கைகள் பிரியாமல், காதல் குறையாமல் இருக்கட்டும்.",
      "உங்கள் வீடு எப்போதும் அமைதி, மகிழ்ச்சி மற்றும் அன்பால் நிறைந்திருக்கட்டும்.",
      "சிறு சிறு விஷயங்களிலும் ஒன்றாக இணைந்து சந்தோஷத்தைக் கண்டறியுங்கள்.",
      "எந்த சூழ்நிலையிலும் ஒருவரையொருவர் விட்டுக்கொடுக்காத ஆழமான நம்பிக்கை அமையட்டும்.",
      "உறங்கும் முன் கோபத்தை மறந்து, விழிக்கும் போது அன்போடு நாளைத் தொடங்குங்கள்.",
      "உங்கள் இருவரின் கனவுகளையும் ஒன்றாக இணைந்து நனவாக்க வாழ்த்துகிறேன்.",
      "உலகமே எதிர்த்து நின்றாலும், ஒருவருக்கொருவர் மிகப் பெரிய பலமாக இருங்கள்.",
      "காதலை விட ஆழமான நட்புடன் உங்கள் இல்லற வாழ்வு இனிமையாக அமையட்டும்.",
      "தவறுகளை மன்னித்து, நிறைகளைக் கொண்டாடும் முதிர்ச்சியான அன்பை வளர்த்துக் கொள்ளுங்கள்.",
      "வாழ்க்கையின் ஒவ்வொரு நாளும் நீங்கள் ஒருவரையொருவர் தேர்ந்தெடுக்கும் அன்பாக இருக்கட்டும்.",
      "உண்மையான அன்பும் நேர்மையும் உங்கள் உறவின் ஆணிவேராக அமையட்டும்.",
      "நீங்கள் இருவரும் இணைந்து அமைக்கும் உலகம் அழகாகவும் அமைதியாகவும் இருக்கட்டும்.",
      "வார்த்தைகளால் சொல்ல முடியாத ஆழமான காதல் உங்கள் நெஞ்சங்களில் நிலைக்கட்டும்.",
      "ஒருவர் சோர்வடையும் போது மற்றவர் ஊக்கமளித்து, உயர்ந்த நிலையை அடையுங்கள்.",
      "பணம், பொருளை விட ஒருவருக்கொருவர் கொடுக்கும் நேரமும் அன்பும் பெரிதாக இருக்கட்டும்.",
      "உங்கள் காதல் காலம் செல்லச் செல்ல இன்னும் அழகாகவும் ஆழமாகவும் மாறட்டும்.",
      "அன்பான பேச்சும், ஆதரவான அரவணைப்பும் உங்கள் வாழ்க்கையை முழுமையாக்கட்டும்.",
      "ஒருவருக்கொருவர் நிபந்தனையற்ற அன்பை செலுத்தி, அழகான முன்மாதிரியாக வாழுங்கள்.",
      "உங்களின் சிறு சிறு சண்டைகளும் முடிவில் அன்பை மட்டுமே வளர்க்கட்டும்.",
      "வாழ்க்கைப் பயணத்தில் உங்களுக்கு வரும் எந்த புயலையும் ஒன்றாக இணைந்து கடக்க வாழ்த்துகள்.",
      "உங்கள் துணையின் மகிழ்ச்சியே உங்கள் மகிழ்ச்சியாக மாறும் ஆழமான காதல் கிடைக்கட்டும்.",
      "ஒருவரின் குறைகளை மற்றவர் அன்பால் நிறைவு செய்யும் அற்புதமான வாழ்க்கை அமையட்டும்.",
      "உங்கள் காதல் என்றென்றும் இளமையாகவும் உற்சாகமாகவும் இருக்க இதயபூர்வமான வாழ்த்துகள்.",
      "நாள்தோறும் ஒருவருக்கொருவர் மரியாதை கொடுத்து உன்னதமான வாழ்க்கையை வாழுங்கள்.",
      "நீண்ட தூர பயணமாக இருந்தாலும், கைகோர்த்து நடக்கும் போது அது இனிமையாக மாறட்டும்.",
      "ஒருவருக்கொருவர் உண்மையான பாதுகாப்பையும் ஆறுதலையும் தேடிக்கொள்ளும் உறவாக அமையட்டும்.",
      "உங்களைச் சுற்றி இருப்பவர்களும் வியக்கும் படியான ஒரு அழகான காதலை வாழுங்கள்.",
      "வாழ்க்கையின் ஒவ்வொரு சோதனையும் உங்கள் காதலை மேலும் வலிமையாக்கட்டும்.",
      "அமைதியான தருணங்களையும், மகிழ்ச்சியான தருணங்களையும் ஒன்றாக ரசியுங்கள்.",
      "எல்லாவற்றையும் வெளிப்படையாகப் பேசித் தீர்க்கும் அழகான புரிதல் உங்களிடம் இருக்கட்டும்.",
      "உங்கள் அன்பான பார்வையிலேயே ஆயிரம் வார்த்தைகளை புரிந்து கொள்ளும் சக்தி கிடைக்கட்டும்.",
      "எவ்வளவு பிஸியாக இருந்தாலும், உங்களுக்கான நேரத்தை ஒதுக்கிக் கொள்ள மறக்காதீர்கள்.",
      "இந்த நாளின் மகிழ்ச்சி உங்கள் வாழ்நாள் முழுவதும் குறையாமல் நிலைத்திருக்கட்டும்.",
      "உங்கள் இருவரின் பெயர்களும் அன்பின் அடையாளமாக என்றும் நிலைக்கட்டும்.",
      "சிரிப்பும் மகிழ்ச்சியும் மட்டுமே உங்கள் வீட்டில் எப்போதும் எதிரொலிக்கட்டும்.",
      "ஒருவர் மேல் ஒருவர் வைத்திருக்கும் நம்பிக்கை எந்த காலத்திலும் உடையாமல் இருக்கட்டும்.",
      "நீங்கள் இருவரும் ஒன்றாகச் சேர்ந்து பல அற்புதமான நினைவுகளை உருவாக்க வாழ்த்துகள்.",
      "உண்மையான காதலுக்கு வயதில்லை என்பதை உங்கள் வாழ்வின் மூலம் நிரூபியுங்கள்.",
      "உங்களின் ஒவ்வொரு வெற்றியிலும், துணையின் அன்பான பங்களிப்பு இருக்கட்டும்.",
      "ஒருவருக்கொருவர் எதையும் எதிர்பார்க்காத தூய்மையான அன்பை பரிமாறிக்கொள்ளுங்கள்.",
      "எந்தக் கவலையும் உங்களை நெருங்காதபடி அன்பால் ஒரு பெரிய கோட்டையைக் கட்டுங்கள்.",
      "உங்கள் திருமணம் சொர்க்கத்தில் நிச்சயிக்கப்பட்டதை விட அழகாக பூமியில் மலரட்டும்.",
      "இன்றிலிருந்து உங்கள் வாழ்வின் ஒவ்வொரு நொடியும் காதலால் அமையட்டும்!"
    ]
  }
};

/* ── Built-in DEFAULT content (bride-first). Live Firestore overrides this. ── */
const DEFAULTS = {
  brideName: "කෞෂානි", groomName: "ගෞරව",
  brideNameEn: "Kaushani", groomNameEn: "Gaurawa",
  brideNameTa: "கௌஷானி", groomNameTa: "கௌரவ",
  brideFather: "", brideFatherEn: "", brideFatherTa: "",
  groomFather: "", groomFatherEn: "", groomFatherTa: "",
  bridePreLine: "මහත්මා සහ එම මැතිනියගේ ආදරණීය දියණිය වූ,",
  bridePreLineEn: "the beloved daughter of Mr. & Mrs.", bridePreLineTa: "அவர்களின் அன்பு மகள்,",
  groomPreLine: "මහත්මා සහ එම මැතිනියගේ ආදරණීය පුත් වූ,",
  groomPreLineEn: "the beloved son of Mr. & Mrs.", groomPreLineTa: "அவர்களின் அன்பு மகன்,",
  dateISO: "2028-01-12T09:28:00+05:30",
  venue: "එපිටෝම් හෝටලය", venueEn: "The Epitome Hotel", venueTa: "எபிடோம் ஹோட்டல்",
  venueCity: "කුරුණෑගල", venueCityEn: "Kurunegala", venueCityTa: "குருநாகல்",
  venueMapUrl: "https://www.google.com/maps/search/?api=1&query=The+Epitome+Hotel+Kurunegala",
  ceremonyTime: "පෙ.ව. 09.00 සිට සවස 04.00 දක්වා", ceremonyTimeEn: "9.15 a.m. onwards", ceremonyTimeTa: "மு.ப. 9.15 மணி முதல்",
  poruwaTime: "පෙ.ව. 09.28",
  heroImageUrl: "",
  loveNote: "", loveSign: "කෞෂානි & ගෞරව",
  phone: "", whatsapp: "", ambientAudioUrl: "",
  rsvpOpen: true,
  show: { countdown: true, agenda: true, gallery: true, lovenote: true, lamp: true, blessings: true, rsvp: true },
  /* Post-wedding "Thank You" lockdown — see isPostWeddingActive()/
     applySiteState() below. Mirrors the admin panel's own schema
     exactly (postWeddingScheduleAt is an SLT ISO string, same
     "+05:30"-suffixed format as dateISO). */
  postWeddingMode: false, postWeddingScheduleAt: "", postWeddingMessage: "",
  /* Site launch gate — the mirror-image switch at the OTHER end of the
     lifecycle. Defaults to true (site visible): if this field is entirely
     absent from the Firestore doc, the site must behave exactly as it
     always has, never silently go dark. See isSiteLive()/
     computeSiteScreenState() below. */
  siteLive: true, sitePausedMessage: ""
};
/* Default schedule — bilingual; admin items (titleSi/descSi) override and fall back gracefully */
const AGENDA_DEFAULT = [
  { icon: "welcome", timeLabel: "9.15 AM", titleSi: "ආගන්තුක පිළිගැනීම", descSi: "සිනා මුසු මුවින් ආරාධිතයන් සාදරයෙන් පිළිගැනීම.", titleEn: "Welcome", descEn: "Warmly receiving our guests.", titleTa: "வரவேற்பு", descTa: "விருந்தினர்களை அன்புடன் வரவேற்றல்." },
  { icon: "rings", timeLabel: "9.15 AM", titleSi: "මංගල උත්සවය", descSi: "අපගේ ජීවිත එක්වන සුවිශේෂී මොහොත.", titleEn: "The Ceremony", descEn: "The moment our lives become one.", titleTa: "திருமண வைபவம்", descTa: "எங்கள் வாழ்க்கை ஒன்றாகும் சிறப்பு தருணம்." },
  { icon: "dine", timeLabel: "12.00 PM", titleSi: "දිවා භෝජනය", descSi: "රසවත් භෝජන සංග්‍රහයකින් ආරාධිතයන් සංග්‍රහ කිරීම.", titleEn: "Lunch", descEn: "A delicious feast for our guests.", titleTa: "மதிய விருந்து", descTa: "விருந்தினர்களுக்கு சுவையான விருந்து." },
  { icon: "celebrate", timeLabel: "3.30 PM", titleSi: "සැමරුම් හා පිටත්වීම", descSi: "සතුට බෙදාගනිමින් දිනය නිමා කිරීම.", titleEn: "Celebration & Send-off", descEn: "Closing the day in shared joy.", titleTa: "கொண்டாட்டமும் வழியனுப்புதலும்", descTa: "பகிர்ந்த மகிழ்ச்சியுடன் நாளை நிறைவு செய்தல்." }
];

/* ── State + helpers ─────────────────────────────────────────────────────── */
let S = Object.assign({}, DEFAULTS);
/* init() below paints S (i.e. DEFAULTS) immediately, synchronously, before
   Firestore has ever answered -- by design, so a real live site doesn't sit
   waiting on a network round-trip for its very first paint. The problem:
   DEFAULTS isn't placeholder text, it's the real couple's real name/date/
   venue, so that instant first paint happens unconditionally regardless of
   whether the site is actually paused right now -- computeSiteScreenState()
   only ever gets to say "paused" once Firestore's real siteLive:false comes
   back, moments later. hs_gate_state (written by applySiteState() below,
   read here) is the one signal available before that round-trip completes:
   a RETURNING visitor to an already-paused site carries it from their last
   load, so this first paint can correctly skip from the very start. A
   first-ever visitor has no hint yet and still gets one brief real paint --
   contentPainted below exists to catch exactly that gap and force a reload
   the moment Firestore's real answer confirms it should never have
   happened, so the reload the user actually SAW in the recording. */
try { if (localStorage.getItem("hs_gate_state") === "locked") S.siteLive = false; } catch (e) {}
/* Set to true the moment renderAll() actually paints real content (its own
   guard passed) -- lets applySiteState() below tell "real content is
   genuinely sitting in the DOM right now" apart from "nothing has ever been
   rendered", which prevState alone can't distinguish once the line above
   exists (prevState starts at null, not "normal", even when this module's
   very first renderAll() call did go on to paint from DEFAULTS). */
let contentPainted = false;
let AGENDA = AGENDA_DEFAULT.slice();
let GALLERY = [], GUESTS = [], BLESSINGS = [], guestsLoaded = false;
let fb = null;
let LANG = (function () { try { var x = localStorage.getItem("hs_lang"); return (x === "en" || x === "ta") ? x : "si"; } catch (e) { return "si"; } })();

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (x) => String(x == null ? "" : x).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const L = () => TEXT[LANG];
const amp = (s) => String(s).replace(/&amp;|&/g, '<span class="amp">&amp;</span>');
/* Delegates to byLang() (defined just below) instead of the plain
   `S.brideNameEn || S.brideName` this used to be: that pattern falls
   straight to the SINHALA name the moment brideNameEn/groomNameEn exists
   in Firestore but is an unsaved empty string -- Object.assign(DEFAULTS,
   data) lets that empty string win over DEFAULTS' own "Kaushani" -- the
   exact bug byLang()'s own comment already describes for every OTHER
   admin-editable field ("කුරුණෑගල" leaking onto the English/Tamil pages).
   Names were never routed through that same fix. */
function names() { return { b: byLang("brideName"), g: byLang("groomName") }; }
function byLang(base) {
  var key = LANG === "en" ? base + "En" : LANG === "ta" ? base + "Ta" : base;
  var live = S[key];
  if (live != null && String(live).trim() !== "") return live;
  /* Fall back to the built-in value FOR THIS LANGUAGE. Falling straight back to
     S[base] meant an unsaved English/Tamil field showed the Sinhala text — which
     is why the city read "කුරුණෑගල" on the English and Tamil pages. */
  var def = DEFAULTS[key];
  if (def != null && String(def).trim() !== "") return def;
  return S[base];
}

/* That same standalone inline script (index.html) also paints the entry
   gate's eyebrow/sub/cta text once, at boot, from whatever language
   localStorage held on THAT load -- correct for the very first frame, but
   it never runs again. The langToggle click handler only ever called
   renderAll(), which -- like the rest of this module -- has no idea the
   gate even exists, so tapping EN/Tamil while still looking at the entry
   gate visibly changed nothing there: the nav, hero, etc. switched the
   instant the gate was dismissed, but the gate's own text stayed stuck in
   whatever language the page happened to boot in. Mirrors the inline
   script's own TX table so the two never visibly disagree; a no-op once
   the gate's been dismissed and removed from the DOM. */
function paintEntryGateLang(T) {
  const e = $("#entry"); if (!e) return;
  const eb = e.querySelector(".entry-eyebrow"); if (eb) eb.textContent = T.entryEyebrow;
  const sb = e.querySelector(".entry-sub"); if (sb) sb.textContent = T.entrySub;
  const ct = e.querySelector(".entry-cta"); if (ct) ct.textContent = T.entryCta;
  e.setAttribute("aria-label", T.nav.invitation);
  const btn = $("#entryEnter"); if (btn) btn.setAttribute("aria-label", T.entryEnterAria);
}

/* The entry gate (index.html's own standalone inline script) paints the
   couple's names INSTANTLY from a hardcoded default, deliberately before
   this module or Firestore have loaded anything -- see that script's own
   comment ("standalone, independent of app.js so it can never trap a
   visitor"). That's correct for the very first frame, but it never gets
   corrected afterwards: nothing ever went back to swap in the live
   admin-configured names once Firestore actually answered, so a couple
   who changed their names in admin kept seeing the original placeholder
   ("කෞෂානි & ගෞරව") on this one screen forever. Patching it here, the
   instant live content arrives, closes that gap without touching the
   gate's markup/CSS at all -- if it's already been dismissed and removed
   from the DOM (the common case once someone lingers), this is a no-op. */
function paintEntryGateLive() {
  /* Never paint the real couple name while a full-screen gate is showing
     instead of the real site -- .gate-suppressed only hides #entry
     visually (display:none), and text sitting in a hidden element's DOM
     is still there to be read by anything that inspects the document
     rather than the rendered page: confirmed directly, from a screen
     recording, that Safari's Reader Mode does exactly this -- it
     extracts a page's text from the DOM tree, entirely ignoring
     hidden/display:none. The only real fix is to never let the name
     exist in the document at all while locked, not just hide it. */
  if (computeSiteScreenState() !== "normal") return;
  const nm = document.querySelector("#entry .entry-names");
  if (!nm) return;
  const n = names();
  nm.innerHTML = esc(n.b) + ' <span class="amp">&amp;</span> ' + esc(n.g);
}

function liteMode() {
  const m = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sd = navigator.connection && navigator.connection.saveData;
  const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 2;
  const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  return !!(m || sd || lowMem || lowCpu);
}
function fmtDate(iso) {
  const d = new Date(iso), T = L();
  return { y: d.getFullYear(), mo: T.months[d.getMonth()], dd: d.getDate(), wd: T.weekdays[d.getDay()], dt: d };
}

/* ════════════════════════════════ RENDER ════════════════════════════════ */
function renderAll() {
  /* Same reasoning as the guard now at the top of paintEntryGateLive():
     nothing here may write real hero/invitation/date/venue/agenda/
     gallery/blessings/footer text into the DOM while a full-screen gate
     is showing instead of the real site. [hidden] and .gate-suppressed
     only ever hide #nav/main/.footer visually -- Reader Mode (and
     anything else that inspects the document rather than the rendered
     page) reads straight past that. Whatever called this -- the entry
     gate's own dismissal, a language toggle, a resync -- none of it may
     ever populate real content while locked; the gate screens have
     nothing of app.js's to say regardless, and paintEntryGateLang(T)
     already covers their own (non-couple-specific) text on its own. */
  if (computeSiteScreenState() !== "normal") return;
  contentPainted = true;
  const T = L();
  document.documentElement.lang = LANG;
  document.body.dir = "ltr";
  $("#brandName").textContent = T.brand;
  { const fc = $("#footCredit"); if (fc) fc.innerHTML = T.footCredit; }
  $("#nav-invitation").textContent = T.nav.invitation;
  $("#nav-agenda").textContent = T.nav.agenda;
  $("#nav-gallery").textContent = T.nav.gallery;
  $("#nav-blessings").textContent = T.nav.blessings;
  $("#nav-rsvp").textContent = T.nav.rsvp;
  $$(".js-drawer-link").forEach(a => { const k = a.dataset.k; if (k) a.textContent = T.nav[k]; });
  const lt = $("#langToggle"); if (lt) { lt.textContent = T.langLabel; lt.title = T.langTitle; lt.setAttribute("aria-label", T.langTitle); }
  paintEntryGateLang(T);
  /* paintEntryGateLive() only used to run off the Firestore snapshot
     handler, which fires once, early, at whatever LANG happened to be
     active at that moment -- so the names it painted onto the entry gate
     were never revisited on a later language switch, the same gap
     paintEntryGateLang(T) above just closed for the eyebrow/sub/cta text.
     Calling it here too keeps the couple's name in step with every
     toggle, using names()'s own already-language-aware lookup. */
  paintEntryGateLive();

  renderHero(); renderInvitation(); renderCountdown(); renderRsvpShell();
  applyVisibility(); observeReveals();
  /* Agenda/gallery/blessings/footer are below the fold — never visible at
     the moment this runs, whether that's the initial page load or the
     instant the entry gate finishes disappearing. Rebuilding all four is
     real synchronous DOM work (gallery especially, once there are several
     photos); doing it inline here risked blocking the main thread for
     however long that takes right when the ABOVE-the-fold hero should be
     painting — the exact "long freeze, then everything pops in at once"
     pattern that was reported even after deferring content's render until
     the entry gate was gone (see whenEntryGone below): that fix correctly
     stopped it from landing mid-animation, but still let it block the
     critical instant right after. Deferred via runIdle so the part that
     actually needs to appear immediately doesn't wait on the part that
     doesn't. */
  runIdle(() => { renderAgenda(); renderGallery(); renderLove(); renderBlessings(); renderFooter(); observeReveals(); });
}

function renderHero() {
  const T = L(), n = names(), f = fmtDate(S.dateISO);
  $("#heroEyebrow").textContent = T.heroEyebrow;
  $("#heroNames").innerHTML = esc(n.b) + ' <span class="amp">' + esc(T.and) + '</span> ' + esc(n.g);
  $("#heroTag").textContent = T.heroTag;
  $("#heroDate").textContent = (LANG === "en" ? (f.wd + ", " + f.mo + " " + f.dd + ", " + f.y) : (f.dd + " " + f.mo + " " + f.y));
  $("#heroVenue").textContent = byLang("venue") + " · " + byLang("venueCity");
  scheduleHeroFit();
  $("#heroRsvpBtn").textContent = T.heroRsvp;
  $("#scrollCue").querySelector(".cue-lbl").textContent = T.scrollCue;
  const port = $("#heroPortrait");
  if (S.heroImageUrl) {
    port.innerHTML = '<img src="' + esc(S.heroImageUrl) + '" alt="' + esc(n.b + " " + T.and + " " + n.g) + '" loading="eager" decoding="async" fetchpriority="high">';
    port.classList.remove("is-mono");
  } else {
    port.innerHTML = '<div class="hero-emblem" aria-hidden="true"></div>';
    port.classList.add("is-mono");
  }
}
function monogram(b, g) {
  const i1 = (b || "♡").trim().charAt(0), i2 = (g || "♡").trim().charAt(0);
  return '<div class="mono"><span class="mono-i">' + esc(i1) + '</span><span class="mono-amp">&amp;</span><span class="mono-i">' + esc(i2) + '</span></div>';
}

function renderInvitation() {
  const T = L(), n = names(), f = fmtDate(S.dateISO);
  $("#invEyebrow").textContent = T.invEyebrow;
  $("#invTitle").textContent = T.invTitle;
  /* "<father's initials + surname>" + "<phrase>" — both admin-editable, per language */
  const pickL = (k) => String((LANG === "en" ? S[k + "En"] : LANG === "ta" ? S[k + "Ta"] : S[k]) || "").trim();
  const parentLine = (fatherKey, phraseKey, fallback) => {
    const f = pickL(fatherKey), ph = pickL(phraseKey) || fallback;
    return f ? (f + " " + ph) : ph;
  };
  const preB = parentLine("brideFather", "bridePreLine",
    LANG === "en" ? "The beloved daughter," : LANG === "ta" ? "அன்பு மகள்," : "ආදරණීය දියණිය වූ,");
  const preG = parentLine("groomFather", "groomPreLine",
    LANG === "en" ? "The beloved son," : LANG === "ta" ? "அன்பு மகன்," : "ආදරණීය පුත් වූ,");
  const sentence = T.invSentence({ y: f.y, mo: f.mo, dd: f.dd, wd: f.wd, venue: byLang("venue"), city: byLang("venueCity") });
  const html =
    '<div class="inv-block"><p class="inv-pre">' + esc(preB) + '</p><h3 class="inv-name foil">' + esc(n.b) + '</h3></div>' +
    '<div class="inv-amp">' + esc(T.and) + '</div>' +
    '<div class="inv-block"><p class="inv-pre">' + esc(preG) + '</p><h3 class="inv-name foil">' + esc(n.g) + '</h3></div>' +
    '<p class="inv-line">' + esc(sentence) + '</p>' +
    '<div class="inv-when">' +
      '<div class="blk"><div class="lbl">' + esc(T.date) + '</div><div class="num foil">' + f.dd + '</div><div class="val">' + esc(f.mo) + ' ' + f.y + '</div></div>' +
      '<div class="sep"></div>' +
      '<div class="blk"><div class="lbl">' + esc(T.venueLbl) + '</div><div class="val">' + esc(byLang("venue")) + '</div><div class="lbl2">' + esc(byLang("venueCity")) + '</div></div>' +
      '<div class="sep"></div>' +
      '<div class="blk"><div class="lbl">' + esc(T.timeLbl) + '</div><div class="val">' + esc(byLang("ceremonyTime")) + '</div></div>' +
    '</div>' +
    '<p class="inv-close">' + esc(T.closing) + '</p>' +
    '<p class="inv-from">' + esc(T.from) + '</p>' +
    (S.venueMapUrl ? '<a class="btn ghost maplink" href="' + esc(S.venueMapUrl) + '" target="_blank" rel="noopener noreferrer">⌖ ' + esc(T.viewLocation) + '</a>' : "");
  $("#inviteBody").innerHTML = html;
}

let cdTimer = null;
function renderCountdown() {
  const T = L();
  $("#cdEyebrow").textContent = T.cdEyebrow;
  $("#cdTitle").textContent = T.cdTitle;
  const tick = () => {
    const diff = new Date(S.dateISO).getTime() - Date.now();
    if (diff <= 0) {
      $("#cdGrid").style.display = "none"; $("#cdDone").textContent = T.theDay; $("#cdDone").style.display = "block";
      if (cdTimer) clearInterval(cdTimer); return;
    }
    $("#cdGrid").style.display = ""; $("#cdDone").style.display = "none";
    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    const set = (id, v, lbl) => { const c = $(id); c.querySelector(".cd-num").textContent = String(v).padStart(2, "0"); c.querySelector(".cd-lbl").textContent = lbl; };
    set("#cdD", d, T.days); set("#cdH", h, T.hours); set("#cdM", m, T.minutes); set("#cdS", sec, T.seconds);
  };
  tick(); if (cdTimer) clearInterval(cdTimer); cdTimer = setInterval(tick, 1000);
}

function renderAgenda() {
  /* Reachable directly off the "site/agenda" Firestore listener via
     whenEntryGone() (below), entirely independent of renderAll()'s own
     guard -- a full-screen gate hides #nav/main/.footer visually, but a
     second Firestore listener bypassing renderAll() doesn't know that.
     Same guard, same reasoning as renderAll()/paintEntryGateLive() above. */
  if (computeSiteScreenState() !== "normal") return;
  const T = L();
  $("#agEyebrow").textContent = T.agEyebrow;
  $("#agendaTitle").textContent = T.agendaTitle;
  $("#agendaSub").textContent = T.agendaSub;
  $("#agendaList").innerHTML = AGENDA.map((it, i) => {
    const title = LANG === "en" ? (it.titleEn || it.titleSi) : LANG === "ta" ? (it.titleTa || it.titleSi) : (it.titleSi || it.titleEn);
    const desc = LANG === "en" ? (it.descEn || it.descSi) : LANG === "ta" ? (it.descTa || it.descSi) : (it.descSi || it.descEn);
    return '<div class="ag-item reveal"><div class="ag-dot"><div class="ag-ic">' + AG_ICON(it.icon) + '</div></div>' +
      '<div class="ag-body">' + (it.timeLabel ? '<div class="ag-time">' + esc(it.timeLabel) + '</div>' : "") +
      '<div class="ag-title">' + esc(title) + '</div>' +
      (desc ? '<div class="ag-desc">' + esc(desc) + '</div>' : "") + '</div></div>';
  }).join("");
}

function renderGallery() {
  /* Same as renderAgenda() above: reachable directly off the "gallery"
     collection listener via whenEntryGone(), independent of renderAll(). */
  if (computeSiteScreenState() !== "normal") return;
  const T = L();
  $("#galEyebrow").textContent = T.galEyebrow;
  $("#galleryTitle").textContent = T.galleryTitle;
  $("#gallerySub").textContent = T.gallerySub;
  const box = $("#masonry");
  if (!GALLERY.length) { box.innerHTML = '<p class="gallery-empty">' + esc(T.galleryEmpty) + '</p>'; return; }
  /* A gallery photo whose Cloudinary URL 404s must never fall back to the
     browser's own broken-image glyph + raw alt text — that reads as a bug,
     not an empty frame. onerror hides the <img> and flags the figure so CSS
     paints a quiet gold "✦" instead, matching the site's own ornamental mark. */
  box.innerHTML = GALLERY.map((g, i) =>
    '<figure class="reveal" data-i="' + i + '" tabindex="0" role="button" aria-label="' + esc(g.caption || T.viewPhoto) + '" style="background:#14141a url(&quot;' + esc(cld(g.url, 24, "e_blur:600")) + '&quot;) center/cover no-repeat"><img src="' + esc(cld(g.url, 640)) + '" srcset="' + esc(gridSrcset(g.url)) + '" sizes="(min-width:1100px) 33vw,(min-width:700px) 45vw,90vw" alt="' + esc(g.caption || "memory") + '" loading="lazy" decoding="async" style="opacity:0;transition:opacity .6s ease" onload="this.style.opacity=1" onerror="this.style.display=&quot;none&quot;;this.closest(&quot;figure&quot;).classList.add(&quot;fig-broken&quot;)">' +
    (g.caption ? '<figcaption>' + esc(g.caption) + '</figcaption>' : "") + '<span class="fig-ring"></span></figure>'
  ).join("");
  box.querySelectorAll("img").forEach(function (im) { if (im.complete) im.style.opacity = 1; });
  fixGalleryLastRow();
}

/* Widens however many photos are left in an incomplete final gallery row
   so together they fill it exactly, instead of leaving an empty gap where
   the row falls short of a full one -- see the longer note on .masonry in
   styles.css for why. Re-run on every render AND on any resize that
   crosses the 540px column-count breakpoint, since the number of columns
   (and therefore what counts as "a full row") changes there. Purely a
   class toggle -- the underlying GALLERY data/order is never touched. */
function fixGalleryLastRow() {
  const box = $("#masonry");
  const figs = box ? $$("figure", box) : [];
  figs.forEach(f => f.classList.remove("fig-fill-half", "fig-fill-full"));
  if (!figs.length) return;
  const cols = matchMedia("(max-width:540px)").matches ? 2 : 3;
  const remainder = figs.length % cols;
  if (remainder === 0) return;
  const trailing = figs.slice(figs.length - remainder);
  const cls = remainder === 1 ? "fig-fill-full" : "fig-fill-half";
  trailing.forEach(f => f.classList.add(cls));
}
let galleryFillT;
window.addEventListener("resize", () => { clearTimeout(galleryFillT); galleryFillT = setTimeout(fixGalleryLastRow, 120); }, { passive: true });

function renderLove() {
  /* Only ever called from renderAll()'s own guarded batch today, but
     guarded directly too -- the couple's real name/love note has no
     business rendering while locked regardless of which path gets here. */
  if (computeSiteScreenState() !== "normal") return;
  const T = L(), n = names();
  $("#loveEyebrow").textContent = T.loveEyebrow;
  $("#loveTitle").textContent = T.loveTitle;
  $("#loveSub").textContent = T.loveSub;
  const note = (LANG === "si" && S.loveNote) ? S.loveNote : T.loveNoteDefault;
  $("#loveText").textContent = note;
  const sign = LANG === "si" ? (S.loveSign || (n.b + " & " + n.g)) : (n.b + " & " + n.g);
  $("#loveSign").innerHTML = amp(sign);
}

/* Strict global exhaustion for auto-generated wishes: once a suggestion has
   actually been SENT by anyone (tracked globally via the Firestore-synced
   BLESSINGS array, not just this visitor's own session), it must never be
   offered again — no recycling once the language's whole dictionary is
   spent. Punctuation-insensitive so "!" vs "." vs none doesn't let a
   near-duplicate slip past. */
function normWish(s) {
  return (s || "")
    .replace(/[.,!?;:'"`“”‘’…]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}
function availableWishes(lang) {
  const arr = (TEXT[lang] || TEXT.si).suggest || [];
  const used = new Set((BLESSINGS || []).map(b => normWish(b.message)));
  return arr.filter(w => !used.has(normWish(w)));
}

function renderBlessings() {
  /* Same as renderAgenda()/renderGallery() above: reachable directly off
     the "blessings" collection listener via whenEntryGone(), independent
     of renderAll() -- and blessings carry a real guest's real name and
     message, the most personal content of all to leak while locked. */
  if (computeSiteScreenState() !== "normal") return;
  const T = L();
  $("#blEyebrow").textContent = T.blEyebrow;
  $("#blessingsTitle").textContent = T.blessingsTitle;
  $("#blessingsSub").textContent = T.blessingsSub;
  const grid = $("#blessGrid");
  const approved = BLESSINGS.filter(b => b.approved);
  grid.innerHTML = approved.length
    ? approved.map(b => '<div class="bless-card reveal"><div class="bless-msg">' + esc(b.message) + '</div><div class="bless-name">— ' + esc(b.name) + '</div></div>').join("")
    : '<p class="bless-empty">' + esc(T.blessingsEmpty) + '</p>';
  $("#blNameLbl").textContent = T.yourName;
  $("#blName").placeholder = T.yourName;
  $("#blMsgLbl").textContent = T.yourBlessing;
  const avail = availableWishes(LANG);
  const sg = $("#blSuggest");
  if (avail.length) {
    $("#blMsg").placeholder = avail[Math.floor(Math.random() * avail.length)];
    sg.textContent = "✦ " + T.suggestBtn;
    sg.disabled = false;
  } else {
    /* Every auto-generated wish in this language has already been sent by
       someone, globally — stop offering suggestions rather than repeat one. */
    $("#blMsg").placeholder = T.writeOwnWish;
    sg.textContent = "✦ " + T.writeOwnWish;
    sg.disabled = true;
  }
  $("#blSend").textContent = T.sendBlessing;
}

function renderRsvpShell() {
  const T = L();
  $("#rsvpEyebrow").textContent = T.rsvpEyebrow;
  $("#rsvpTitle").textContent = T.rsvpTitle;
  $("#rsvpSub").textContent = T.rsvpSub;
  // stage-local labels
  $("#rsvpHelp").textContent = T.rsvpHelp;
  $("#rsvpSearchInput").placeholder = T.searchPlaceholder;
  $("#rsvpSearchInput").setAttribute("aria-label", T.searchPlaceholder);
  $("#rsvpSearchBtn").textContent = T.searchBtn;
  $("#willAttendQ").textContent = T.willAttend;
  $("#choiceYes").textContent = T.yesAttend;
  $("#choiceNo").textContent = T.noAttend;
  $("#countQ").textContent = T.guestCount;
  $("#rsvpSubmit").textContent = T.confirmRsvp;
  $("#rsvpBack").textContent = T.back;
  $("#rsvpAgain").textContent = T.changeResponse;
  applyRsvpOpen();
}
function applyRsvpOpen() {
  const T = L(), closed = $("#rsvpClosed"), stages = $("#rsvpStages");
  if (S.rsvpOpen) { closed.style.display = "none"; stages.style.display = "block"; }
  else { closed.style.display = "block"; closed.textContent = T.rsvpClosed; stages.style.display = "none"; }
}

function renderFooter() {
  /* Only ever called from renderAll()'s own guarded batch today, but
     guarded directly too, same reasoning as renderLove() above -- the
     footer repeats the couple's real name and real wedding date/venue. */
  if (computeSiteScreenState() !== "normal") return;
  const T = L(), n = names(), f = fmtDate(S.dateISO);
  $("#footNames").innerHTML = esc(n.b) + ' <span class="amp">' + esc(T.and) + '</span> ' + esc(n.g);
  $("#footDate").textContent = f.dd + " " + f.mo + " " + f.y + " · " + byLang("venue") + ", " + byLang("venueCity");
  const acts = $("#footActions"); acts.innerHTML = "";
  if (S.phone) acts.insertAdjacentHTML("beforeend", '<a class="btn ghost sm" href="tel:' + esc(S.phone) + '">☎ ' + esc(T.callUs) + '</a>');
  /* S.whatsapp was being saved by admin's "WhatsApp අංකය" field but never
     read anywhere -- setting it there had zero effect on the public site.
     wa.me needs digits only (no +, spaces or dashes), which the admin's
     own field hint ("94…") already asks for, but stripped defensively
     here in case a + or separator slips in. */
  if (S.whatsapp) acts.insertAdjacentHTML("beforeend", '<a class="btn ghost sm" href="https://wa.me/' + esc(String(S.whatsapp).replace(/\D/g, "")) + '" target="_blank" rel="noopener noreferrer">' + esc(T.shareWa) + '</a>');
  acts.insertAdjacentHTML("beforeend", '<button class="btn ghost sm" id="calBtn">⌖ ' + esc(T.addCal) + '</button>');
  $("#calBtn").onclick = downloadIcs;
}

function applyVisibility() {
  const map = { countdown: "#countdown", agenda: "#agenda", gallery: "#gallery", lovenote: "#lovenote", blessings: "#blessings", rsvp: "#rsvp" };
  Object.keys(map).forEach(k => { const el = $(map[k]); if (el) el.style.display = (S.show && S.show[k] === false) ? "none" : ""; });
}

/* ── Section icons (clean line glyphs, non-traditional) ──────────────────── */
function AG_ICON(k) {
  const S2 = 'stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  const ic = {
    welcome: '<path d="M4 20a8 8 0 0116 0" ' + S2 + '/><circle cx="12" cy="8" r="3.4" ' + S2 + '/>',
    rings: '<circle cx="9.5" cy="14" r="5" ' + S2 + '/><circle cx="15" cy="11" r="5" ' + S2 + '/>',
    dine: '<path d="M7 3v8M5 3v4a2 2 0 002 2M9 3v4a2 2 0 01-2 2M7 11v10M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4 2.5-1 2.5-4-1-5-2.5-5zM17 12v9" ' + S2 + '/>',
    celebrate: '<path d="M4 20l5-13 6 6-11 7zM13 7l4-4M15 9l4-2M16 12l4 0" ' + S2 + '/>',
    default: '<circle cx="12" cy="12" r="3" ' + S2 + '/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" ' + S2 + '/>'
  };
  return '<svg viewBox="0 0 24 24" width="100%" height="100%">' + (ic[k] || ic.default) + '</svg>';
}

/* ════════════════════════════ INTERACTIONS ═══════════════════════════════ */
/* Reveal-on-scroll used to be IntersectionObserver-threshold-based: trigger
   `.in` once, then let a 1s CSS transition play out. That has one dial
   (how far below the fold to pre-fire) fighting two opposite failure modes —
   too small and a fast fling skips the observer's check entirely while the
   element rockets past (it used to land ~55px from the TOP of the viewport
   with .in only just added, i.e. no visible fade at all); too large (the
   +35% fix that was here) and the 1s fade completes well BEFORE the element
   is actually on screen at anything but a crawl, which is exactly what made
   every reveal across the site look like it was simply "there" with no
   animation once scrolling was reasonably brisk (or got smoother/faster
   from other fixes) — the same invisible-effect symptom from the opposite
   direction. There's no single threshold that avoids both at every scroll
   speed, because a one-shot timer has no idea how fast the visitor is
   scrolling.
   The actual fix: stop timing the reveal and tie it directly to scroll
   position instead, every frame, the same way this file already drives the
   hero parallax and the sannasa hands its own progress to its scroll
   engine — opacity/translateY become a direct function of how far the
   element's top has travelled from the bottom of the viewport up to the
   reveal line, so the fade is visibly mid-flight at whatever point the
   visitor's eyes actually reach it, at any scroll speed, slow or fast. */
let revealRafId = null;
const revealActive = new Set();
const REVEAL_AT = 0.78; // element's top reaches this fraction of viewport height -> fully revealed
/* Same cached-height guard as fitHero()/setupParallax()/setupParticles():
   window.innerHeight shifts on mobile whenever the address bar shows/hides
   (a real, unavoidable resize — not something a site can prevent), and
   this loop reads its height reference every single frame. Recomputing
   startAt/revealAt from a live height that's mid-transition during that
   browser-chrome animation risked an extra, avoidable flicker in the
   reveal's own opacity/transform on top of the address bar's own motion.
   Only a genuine viewport WIDTH change (rotation, real resize) recaches. */
let cachedRevealVH = window.innerHeight || 1;
let lastRevealWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth === lastRevealWidth) return;
  lastRevealWidth = window.innerWidth;
  cachedRevealVH = window.innerHeight || 1;
}, { passive: true });

function revealFrame() {
  const vh = cachedRevealVH;
  const startAt = vh, revealAt = vh * REVEAL_AT;
  const span = startAt - revealAt;
  for (const el of Array.from(revealActive)) {
    if (!el.isConnected) { revealActive.delete(el); continue; }
    const top = el.getBoundingClientRect().top;
    const p = span > 0 ? Math.max(0, Math.min(1, (startAt - top) / span)) : 1;
    if (p >= 1) {
      el.classList.remove("reveal-tracking");
      el.style.opacity = ""; el.style.transform = "";
      el.classList.add("in");
      revealActive.delete(el);
    } else {
      el.style.opacity = String(p);
      el.style.transform = "translateY(" + ((1 - p) * 34).toFixed(1) + "px)";
    }
  }
  revealRafId = revealActive.size ? requestAnimationFrame(revealFrame) : null;
}
function startRevealLoop() { if (!revealRafId && revealActive.size) revealRafId = requestAnimationFrame(revealFrame); }

function observeReveals() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const vh = cachedRevealVH;
  const revealAt = vh * REVEAL_AT;
  $$(".reveal:not(.in)").forEach((e, i) => {
    if (reduced) { e.classList.add("in"); return; }
    if (e.getBoundingClientRect().top >= revealAt) {
      e.classList.add("reveal-tracking");
      revealActive.add(e);
    } else {
      /* Already at/past the reveal line right now (on load, or content that
         just rendered above the fold) — no scroll left to tie an animation
         to, so it gets the classic staggered timed fade-in instead. */
      e.style.transitionDelay = (i * 0.08) + "s";
      e.classList.add("in");
    }
  });
  startRevealLoop();
}

/* Sticky nav: scroll progress, condense, scroll-spy, mobile drawer */
function setupNav() {
  const nav = $("#nav"), prog = $("#scrollProgress"), toTop = $("#toTop");
  const ids = ["invitation", "agenda", "gallery", "blessings", "rsvp"];
  const onScroll = () => {
    const y = window.scrollY || 0;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
    if (nav) nav.classList.toggle("solid", y > 40);
    if (toTop) toTop.classList.toggle("show", y > 600);
  };
  document.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
  onScroll();
  if (toTop) toTop.onclick = () => {
    // Controlled, comfortable glide to the top (native smooth is too fast on a long page).
    const html = document.documentElement, prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";                 // bypass CSS smooth so our easing owns the motion
    const start = window.scrollY || window.pageYOffset || 0;
    if (start < 4) { html.style.scrollBehavior = prev; return; }
    const dur = Math.min(1500, Math.max(700, start * 0.62));
    const ease = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    let t0 = null;
    const step = ts => {
      if (t0 === null) t0 = ts;
      const k = Math.min(1, (ts - t0) / dur);
      window.scrollTo(0, Math.round(start * (1 - ease(k))));
      if (k < 1) requestAnimationFrame(step);
      else html.style.scrollBehavior = prev;
    };
    requestAnimationFrame(step);
  };
  // scroll-spy
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { $$(".nav-links a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)); } });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach(id => { const s = $("#" + id); if (s) spy.observe(s); });
  }
  // mobile drawer
  const burger = $("#navBurger"), drawer = $("#navDrawer");
  /* The drawer used to be hidden purely with a CSS transform (translateX past
     the edge) — invisible, but still in the tab order and screen-reader flow
     the whole time, so a keyboard/AT user closed could still Tab into its
     links or have them announced. `inert` removes it from both while closed,
     same fix as the entry gate's background above; aria-expanded on the
     burger reflects state for assistive tech the way a disclosure control
     should. */
  const closeDrawer = () => { drawer.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); drawer.setAttribute("inert", ""); document.body.classList.remove("noscroll"); };
  if (burger && drawer) {
    burger.onclick = () => {
      const open = drawer.classList.toggle("open"); burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      if (open) drawer.removeAttribute("inert"); else drawer.setAttribute("inert", "");
      document.body.classList.toggle("noscroll", open);
    };
    $$(".js-drawer-link").forEach(a => a.addEventListener("click", closeDrawer));
  }
  // smooth anchor scroll
  $$('a[href^="#"]').forEach(a => a.addEventListener("click", (ev) => {
    const id = a.getAttribute("href"); if (id.length < 2) return;
    const t = $(id); if (!t) return; ev.preventDefault();
    t.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}

/* Hero parallax (rAF-throttled, transform only).
   window.innerHeight is CACHED, not read live in upd() — on mobile, the
   address bar hiding/showing while the visitor scrolls fires resize events
   that change innerHeight mid-scroll with no real layout change of intent.
   Dividing by a live, shifting value there would jump the portrait's
   translateY for one frame every time the chrome hides — a small but real
   contributor to the reported "zoom and jerk". Re-synced only on a genuine
   viewport WIDTH change (rotation, real resize), never on the address bar. */
function setupParallax() {
  if (document.body.classList.contains("lite")) return;
  const port = $("#heroPortrait"), hero = $("#hero");
  let vh = window.innerHeight || 1;
  let ticking = false;
  const upd = () => {
    const r = hero.getBoundingClientRect();
    const p = Math.max(-1, Math.min(1, r.top / vh));
    if (port) port.style.transform = "translate3d(0," + (p * 26).toFixed(1) + "px,0)";
    ticking = false;
  };
  document.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  let lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastW) return; // vertical-only (mobile address-bar) resize — ignore
    lastW = window.innerWidth; vh = window.innerHeight || 1;
  }, { passive: true });
  upd();
}

/* Ambient gold-dust particles on a canvas behind the hero */
let particleRAF = null;
function setupParticles() {
  const c = $("#fxCanvas"); if (!c || document.body.classList.contains("lite")) return;
  const ctx = c.getContext("2d"); let w, h, dots, dpr = Math.min(2, window.devicePixelRatio || 1);
  const N = matchMedia("(max-width:600px)").matches ? 26 : 54;
  function resize() {
    w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = Array.from({ length: N }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + .4, vx: (Math.random() - .5) * .12, vy: -(Math.random() * .25 + .05), a: Math.random() * .5 + .15 }));
  }
  resize();
  /* Same guard as fitHero()/setupParallax(): resize() throws away every
     particle's position and re-randomizes from scratch, so re-running it on
     a mobile address-bar hide/show (a vertical-only resize) would make the
     whole ambient field visibly jump to new random spots mid-scroll. Only a
     genuine viewport width change re-runs it. */
  let lastParticleWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastParticleWidth) return;
    lastParticleWidth = window.innerWidth;
    resize();
  }, { passive: true });
  /* This loop used to run for the entire visit regardless of scroll position —
     once the visitor scrolled past the hero it kept clearing/redrawing 26-54
     dots 60x a second for content that was no longer on screen at all,
     permanently eating a slice of every frame's budget everywhere else on the
     page (a real contributor to the "stuttery, not smooth" scroll feel
     reported on longer pages). Gated the same way the sannasa's own
     scroll-unroll engine gates its RAF loop: an IntersectionObserver pauses
     drawing entirely once the canvas is well outside the viewport, and
     resumes it only once it's back within range. */
  let inView = true;
  function frame() {
    if (!inView) { particleRAF = null; return; }
    if (document.documentElement.classList.contains("vv-zoom")) { particleRAF = requestAnimationFrame(frame); return; }
    /* The entry gateway sits at z-index:300, fully opaque, on top of the hero
       this canvas lives behind — every dot this loop draws while it's up is
       invisible, yet still costs a clearRect + per-dot arc/fill 60x a second,
       competing for main-thread/compositor time with the gateway's own
       dismiss animation right as the visitor taps. Skip the drawing work
       (but keep ticking so it resumes instantly once the gate is gone). */
    if (document.getElementById("entry")) { particleRAF = requestAnimationFrame(frame); return; }
    ctx.clearRect(0, 0, w, h);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.y < -4) { d.y = h + 4; d.x = Math.random() * w; }
      if (d.x < -4) d.x = w + 4; if (d.x > w + 4) d.x = -4;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283);
      ctx.fillStyle = "rgba(232,201,135," + d.a + ")"; ctx.fill();
    }
    particleRAF = requestAnimationFrame(frame);
  }
  function startFrame() { if (!particleRAF && inView && !document.hidden) particleRAF = requestAnimationFrame(frame); }
  frame();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((es) => {
      inView = es[es.length - 1].isIntersecting;
      if (inView) startFrame(); else if (particleRAF) { cancelAnimationFrame(particleRAF); particleRAF = null; }
    }, { rootMargin: "200px 0px 200px 0px" }).observe(c);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { if (particleRAF) cancelAnimationFrame(particleRAF), particleRAF = null; }
    else startFrame();
  });
}

/* Sannasa scroll-unroll (same-origin iframe): the invitation unrolls tied to scroll
   position as the visitor scrolls past it — sannasa.html computes its own runway height
   (content height plus a bounded extra scroll distance, never a value disconnected from
   the actual content) and posts it here; we HUG the iframe to that exact height so there
   is never a black void below the lower roll, nor content clipped above it. Re-hugs the
   instant the admin edits the decree or its content height otherwise changes.

   This also OWNS the scroll-to-progress math for the unroll itself. An earlier version
   left that to sannasa.html, which read window.frameElement.getBoundingClientRect() from
   INSIDE the iframe on every animation frame — same-origin-legal, but it forces the
   browser to reconcile the iframe's position against the PARENT document's layout from a
   second, independent browsing context, 60+ times a second. That's what caused the real-
   device stutter/freeze (worst scrolling back up during momentum scrolling): it competes
   with this page's own scroll-driven work (parallax, particles, the entry gateway) for
   the main thread, and an iframe's own animation frames aren't always scheduled in
   lockstep with the parent's compositor. Reading the SAME rect from out here instead is a
   same-document, main-thread-native call — the browser already keeps this cheap as part
   of ordinary scroll handling, exactly like setupParallax() above — and we just
   postMessage the resulting 0..1 number in; sannasa.html only ever LERPs toward it. */
function setupSannasaScroll() {
  const frame = $(".sannasa-frame");
  if (!frame) return;
  let pin = 48, extra = 480; // sannasa.html's own pre-reflow defaults, until its first height message arrives

  window.addEventListener("message", (e) => {
    const d = e && e.data;
    if (!d || d.__sannasa !== "height" || typeof d.h !== "number") return;
    const px = Math.max(320, Math.min(2600, Math.round(d.h) + 20)); // +20 buffer, clamped
    frame.style.height = px + "px";
    frame.style.minHeight = "0px";
    if (typeof d.pin === "number") pin = d.pin;
    if (typeof d.extra === "number") extra = d.extra;
  }, { passive: true });

  /* Driven by a CONTINUOUS rAF loop, not the browser's 'scroll' event.
     Native momentum/inertial scrolling (mobile Safari especially) visually
     updates the compositor every frame but does not guarantee a matching
     'scroll' EVENT for each of those frames — the event can fire less often
     than the screen actually moves. Gating the read on that event, as the
     previous version did, meant the sent progress could lag a frame or more
     behind the true scroll position and then jump to catch up — exactly the
     "chunky" stutter reported. Reading the rect fresh every animation frame,
     the same pattern sannasa.html's own engine already uses for its LERP
     loop, removes that dependency entirely. Posting only on an actual
     change avoids spamming postMessage while the page is simply idle. */
  let active = false, running = false, rafId = null, lastP = -1;
  const tick = () => {
    const win = frame.contentWindow;
    if (win) {
      const top = frame.getBoundingClientRect().top;
      const p = extra > 0 ? Math.max(0, Math.min(1, (pin - top) / extra)) : 1;
      if (p !== lastP) { lastP = p; win.postMessage({ __sannasa: "progress", p }, "*"); }
    }
    if (running) rafId = requestAnimationFrame(tick);
  };
  const start = () => { if (running) return; running = true; lastP = -1; rafId = requestAnimationFrame(tick); };
  const stop = () => { running = false; if (rafId) { cancelAnimationFrame(rafId); rafId = null; } };

  if ("IntersectionObserver" in window) {
    try {
      const io = new IntersectionObserver((es) => {
        for (const en of es) active = en.isIntersecting;
        active ? start() : stop();
      }, { rootMargin: "800px 0px 800px 0px" });
      io.observe(frame);
    } catch (_) { start(); }
  } else { start(); }
}

/* Zoom-crash guard — soften GPU-heavy compositing while the visitor is pinch/zoomed in */
function setupZoomGuard() {
  const vv = window.visualViewport; if (!vv) return;
  const apply = () => document.documentElement.classList.toggle("vv-zoom", (vv.scale || 1) > 1.25);
  vv.addEventListener("resize", apply, { passive: true });
  vv.addEventListener("scroll", apply, { passive: true });
  apply();
}

/* Preloader → reveal.
   The entry gateway's own background photo, lamp, arch and corner filigree
   each load over the network independently — without explicitly waiting for
   them, the preloader (which now actually covers the gateway; see the
   z-index note in styles.css) would lift before they've all arrived, and
   the visitor watches them pop in one by one behind it. dismissPreloader()
   is only called once every one of them has genuinely finished loading AND
   decoding (or, for the images, has definitively failed — a stalled asset
   must never trap the visitor behind the preloader forever). */
const GATEWAY_CRITICAL_IMAGES = [
  "https://res.cloudinary.com/dzrfpc9be/image/upload/f_auto,q_auto,w_1600/v1784103121/IMG_0007_hhiu9s.jpg", // entry-bg
  "https://res.cloudinary.com/dzrfpc9be/image/upload/f_auto,q_auto,w_760/v1784967326/Pahana_gaeard.png",     // lamp
  "https://iili.io/CGU3TaR.png", // gateway arch
  "https://iili.io/CGU2ZpS.png", // corner filigree
];
function preloadDecodedImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    const done = () => resolve();
    img.onload = () => { if (img.decode) img.decode().then(done, done); else done(); };
    img.onerror = done; // a failed asset must never block the reveal
    img.src = src;
  });
}
function dismissPreloader() {
  const p = $("#preloader"); if (!p) return;
  document.documentElement.classList.add("gw-ready"); // releases the entry-rise animation, timed with the lift
  p.classList.add("gone");
  setTimeout(() => { if (p && p.parentNode) p.remove(); }, 1100);
}

/* Music */
let audio = null, playing = false;
function getAudio() {
  if (!S.ambientAudioUrl) return null;
  if (!audio || audio.dataset.src !== S.ambientAudioUrl) {
    audio = new Audio(S.ambientAudioUrl); audio.loop = true; audio.volume = 0.45; audio.preload = "auto"; audio.dataset.src = S.ambientAudioUrl;
  }
  return audio;
}
function syncMusicBtn() { const b = $("#musicBtn"); if (!b) return; b.classList.toggle("on", playing); b.setAttribute("aria-pressed", String(playing)); b.style.display = S.ambientAudioUrl ? "grid" : "none"; }
/* Autoplay once, right as the visitor comes through the entry gate. Browsers
   only allow unmuted audio to start once the page has a genuine user
   gesture on record — the lamp tap itself is exactly that, and Chrome's
   "sticky" activation (unlike the short-lived kind other APIs use) doesn't
   expire on a timer, so calling play() here, once the gate is gone, still
   counts as a direct response to it. Only ever tried once: a browser that
   still blocks it falls back to the manual button exactly as before, and a
   later Firestore update (S.ambientAudioUrl arriving, or an unrelated admin
   edit) must never restart music a visitor has deliberately paused. */
let autoplayAttempted = false;
function tryAutoplayMusic() {
  /* Belt-and-suspenders alongside .gate-suppressed (styles.css): the
     lamp tap that would normally lead here can't fire while a full-screen
     gate is up (it's display:none, so non-interactive), but this stays
     correct even if that ever changes, and it's what actually stops
     ambient music from starting on the pre-launch "paused" gate, which
     has no lamp-tap moment of its own to gate on in the first place. */
  if (computeSiteScreenState() !== "normal") return;
  if (autoplayAttempted || playing) return;
  const a = getAudio();
  if (!a) return; // ambientAudioUrl not known yet — a later settings update retries this
  autoplayAttempted = true;
  a.play().then(() => { playing = true; syncMusicBtn(); }).catch(() => {});
}
function toggleMusic() { const a = getAudio(); if (!a) return; if (playing) { a.pause(); playing = false; } else { a.play().then(() => { playing = true; syncMusicBtn(); }).catch(() => {}); } syncMusicBtn(); }

/* Calendar + share */
function downloadIcs() {
  const d = new Date(S.dateISO), end = new Date(d.getTime() + 6 * 3600 * 1000);
  const fmt = (x) => x.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const n = names();
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Helasiritha//EN", "BEGIN:VEVENT",
    "UID:" + Date.now() + "@helasiritha", "DTSTAMP:" + fmt(new Date()), "DTSTART:" + fmt(d), "DTEND:" + fmt(end),
    "SUMMARY:" + n.b + " & " + n.g + " — Wedding", "LOCATION:" + (byLang("venue") + ", " + byLang("venueCity")).replace(/,/g, "\\,"),
    "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" }); const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "wedding.ics"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 800);
}
function shareWa() {
  const n = names(), f = fmtDate(S.dateISO);
  const txt = n.b + " & " + n.g + " — " + f.dd + " " + f.mo + " " + f.y + " · " + location.href;
  window.open("https://wa.me/?text=" + encodeURIComponent(txt), "_blank", "noopener");
}

/* ════════════════════════════════ RSVP ═══════════════════════════════════ */
/* FNV-1a over the trimmed/lowercased name — deterministic, so the same typed
   name always yields the same fallback guest id (see #proceedTyped below). */
function stableSlug(s) {
  s = (s || "").trim().toLowerCase();
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(36);
}
const rsvp = { guest: null, attending: null, party: 1 };
function showStage(id) { $$(".rsvp-stage").forEach(s => s.classList.remove("active")); $(id).classList.add("active"); }
function pickGuest(g) {
  rsvp.guest = g;
  $("#confName").textContent = g.name + (g.family ? " · " + g.family : "");
  $("#choiceYes").classList.remove("sel"); $("#choiceNo").classList.remove("sel");
  $("#attendExtras").style.display = "none"; rsvp.attending = null;
  const errEl = $("#rsvpError"); if (errEl) errEl.style.display = "none";
  showStage("#stConfirm");
}
function setupRsvp() {
  const T = () => L();
  $("#rsvpSearchBtn").onclick = () => {
    const q = $("#rsvpSearchInput").value.trim().toLowerCase();
    const box = $("#rsvpResults"); box.innerHTML = "";
    if (!q) return;
    /* GUESTS only fills once the guestsPublic snapshot resolves (setupFirebase
       runs concurrently with everything else, no wait here before now). Searching
       in that window always found 0 hits and jumped straight to "no guest found,
       continue with this name" — misleading a guest who IS in the list into
       thinking they aren't, right as they're most likely to search (immediately
       after the page loads). Show a neutral "still loading" note instead of the
       false-negative until the first snapshot has actually arrived. */
    if (!guestsLoaded) {
      box.innerHTML = '<p class="note">' + esc(T().guestsLoading) + '</p>';
      return;
    }
    const hits = GUESTS.filter(g => (g.name || "").toLowerCase().includes(q) || (g.family || "").toLowerCase().includes(q)).slice(0, 12);
    if (!hits.length) {
      box.innerHTML = '<p class="note">' + esc(T().noGuest) + '</p>' +
        '<button class="btn ghost sm" id="proceedTyped">' + esc(T().proceedTyped) + '</button>';
      $("#proceedTyped").onclick = () => {
        const typed = $("#rsvpSearchInput").value.trim();
        /* A stable id derived from the typed name (not Date.now()) — so a guest
           who clicks this more than once (a retry after a failed submit, or a
           second visit) reuses the same rsvps/{guestId} doc instead of minting a
           brand-new one every time, which was silently inflating the confirmed
           guest count with duplicates. */
        pickGuest({ id: "guest-" + stableSlug(typed), name: typed, family: "", side: "" });
      };
      return;
    }
    box.innerHTML = hits.map((g, i) =>
      '<button class="guest-pick" data-i="' + i + '"><span class="gn">' + esc(g.name) + '</span>' +
      (g.family ? '<span class="gfam">' + esc(g.family) + '</span>' : "") + '</button>').join("");
    $$("#rsvpResults .guest-pick").forEach((b, i) => b.onclick = () => pickGuest(hits[i]));
  };
  $("#rsvpSearchInput").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); $("#rsvpSearchBtn").click(); } });
  $("#choiceYes").onclick = () => { rsvp.attending = true; $("#choiceYes").classList.add("sel"); $("#choiceNo").classList.remove("sel"); $("#attendExtras").style.display = "block"; $("#rsvpError").style.display = "none"; };
  $("#choiceNo").onclick = () => { rsvp.attending = false; $("#choiceNo").classList.add("sel"); $("#choiceYes").classList.remove("sel"); $("#attendExtras").style.display = "none"; $("#rsvpError").style.display = "none"; };
  $("#pMinus").onclick = () => { rsvp.party = Math.max(1, rsvp.party - 1); $("#pVal").textContent = rsvp.party; };
  $("#pPlus").onclick = () => { rsvp.party = Math.min(20, rsvp.party + 1); $("#pVal").textContent = rsvp.party; };
  $("#rsvpBack").onclick = () => showStage("#stSearch");
  $("#rsvpAgain").onclick = () => {
    Object.assign(rsvp, { guest: null, attending: null, party: 1 });
    $("#rsvpSearchInput").value = ""; $("#rsvpResults").innerHTML = ""; $("#pVal").textContent = "1";
    showStage("#stSearch");
  };
  $("#rsvpSubmit").onclick = submitRsvp;
}
async function submitRsvp() {
  const T = L();
  if (!rsvp.guest) return;
  if (rsvp.attending === null) {
    const errEl = $("#rsvpError");
    if (errEl) { errEl.textContent = T.rsvpPickFirst; errEl.style.display = ""; }
    return;
  }
  const party = rsvp.attending ? rsvp.party : 0;
  const payload = {
    guestId: rsvp.guest.id, name: rsvp.guest.name, family: rsvp.guest.family || "", side: rsvp.guest.side || "",
    attending: rsvp.attending,
    party: party, count: party
  };
  const btn = $("#rsvpSubmit"), errEl = $("#rsvpError");
  btn.disabled = true; btn.textContent = T.sending;
  if (errEl) errEl.style.display = "none";
  /* A guest's RSVP is the single most consequential action on this site — the
     couple's headcount/catering depends on it. This used to advance to the
     "Thank you" screen unconditionally, even when `fb` was still null (Firestore
     not yet connected — plausible on a bad venue connection) or the write threw
     (a dropped connection mid-submit). The guest would believe they'd RSVP'd
     while nothing was ever saved, with no way for them or the couple to know.
     Now a failure keeps them on the form with a visible, localized error and a
     re-enabled button, matching how the blessings form already handles this. */
  try {
    if (!fb) throw new Error("Firestore not connected");
    await fb.setDoc(fb.doc(fb.db, "rsvps", payload.guestId), Object.assign({}, payload, { ts: fb.serverTimestamp() }), { merge: true });
  } catch (e) {
    console.warn("RSVP save failed", e);
    btn.disabled = false; btn.textContent = T.confirmRsvp;
    if (errEl) { errEl.textContent = T.rsvpError; errEl.style.display = ""; }
    return;
  }
  btn.disabled = false; btn.textContent = T.confirmRsvp;
  $("#rsvpThanksBig").textContent = T.rsvpThanks;
  $("#rsvpThanksMsg").textContent = rsvp.attending ? T.rsvpYesMsg : T.rsvpNoMsg;
  showStage("#stThanks");
}

/* Blessings */
function setupBlessings() {
  const sg = $("#blSuggest");
  let lastPick = "";
  /* Only the SOFT preferences (don't repeat the last pick, don't just re-show
     what's already typed) relax if they'd otherwise empty the pool — the
     hard constraint (never a globally already-sent wish) never relaxes.
     Reaching true exhaustion disables the button instead of recycling. */
  if (sg) sg.onclick = () => {
    const T = L(), ta = $("#blMsg");
    const avail = availableWishes(LANG);
    let pool = avail.filter(w => w !== ta.value && w !== lastPick);
    if (!pool.length) pool = avail.filter(w => w !== ta.value);
    if (!pool.length) pool = avail.slice();
    if (!pool.length) {
      sg.disabled = true;
      sg.textContent = "✦ " + T.writeOwnWish;
      ta.placeholder = T.writeOwnWish;
      return;
    }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    lastPick = pick; ta.value = pick; ta.focus();
    sg.classList.add("pop"); setTimeout(() => sg.classList.remove("pop"), 320);
  };
  $("#blSend").onclick = async () => {
    const T = L();
    const name = $("#blName").value.trim(), msg = $("#blMsg").value.trim();
    const st = $("#blStatus");
    if (!name || !msg) { st.textContent = LANG === "en" ? "Please fill both fields." : LANG === "ta" ? "இரண்டு புலங்களையும் நிரப்பவும்." : "කරුණාකර දෙකම පුරවන්න."; return; }
    const btn = $("#blSend"); btn.disabled = true; btn.textContent = T.sending;
    try {
      if (fb) await fb.addDoc(fb.collection(fb.db, "blessings"), { name: name, message: msg, approved: false, ts: fb.serverTimestamp() });
      $("#blName").value = ""; $("#blMsg").value = ""; st.textContent = T.blessingThanks;
    } catch (e) { st.textContent = LANG === "en" ? "Something went wrong." : LANG === "ta" ? "ஏதோ தவறு நேர்ந்தது." : "දෝෂයක් සිදුවිය."; }
    btn.disabled = false; btn.textContent = T.sendBlessing;
  };
}

/* ── HERO FIT ────────────────────────────────────────────────────────────────
   The first screen must be complete on every device: names, date, lamp and the
   scroll cue all visible without scrolling. Measurement showed the hero content
   is intrinsically taller than a laptop viewport (up to +240px), so CSS padding
   alone could never fix it. We measure the real content and scale it down only
   as much as the device needs — nothing is ever cut off.                      */
/* Viewport height CACHE — captured once, on load, and only ever refreshed on
   a genuine orientation/width change (see the resize/orientationchange
   listeners below). fitHero() reads this instead of a live window.innerHeight.

   Why this exists: fitHero() is not only called from the width-guarded
   resize listener — it is ALSO called from plain setTimeout timers (260ms,
   1200ms below, to catch a late web-font swap or image reflow) and from
   document.fonts.ready. Those calls have no resize event to gate on, so
   they used to read window.innerHeight live. On mobile, if a visitor starts
   scrolling within that first ~1.2s window, the address bar's own
   show/hide animation is often still in flight at that exact instant, and
   window.innerHeight briefly reports a TRANSITIONAL value that matches
   neither its before nor after state. fitHero() would then compute a zoom
   scale from that transitional height and snap inner.style.zoom straight to
   it — a sudden, visible "zoom and jerk" mid-scroll, exactly while the
   fixed timers or fonts.ready happened to fire. Because the exact timing of
   the address bar's own animation differs per browser, this only showed up
   inconsistently across Safari/Chrome/Firefox — never a single reliable
   repro. Reading a value cached BEFORE any scroll could begin (and frozen
   through every timer/fonts.ready call afterward) removes the transitional
   read entirely: the zoom decision is made once, from a stable number, and
   every later call recomputes the exact same result — a genuine no-op. */
let cachedViewportH = window.innerHeight;

function fitHero() {
  const hero = document.querySelector(".hero");
  const inner = document.querySelector(".hero-inner");
  if (!hero || !inner) return;
  const cue = document.querySelector(".scroll-cue");

  inner.style.zoom = "";
  inner.style.transform = "";
  inner.style.height = "";

  const cs = getComputedStyle(hero);
  const padT = parseFloat(cs.paddingTop) || 0;
  const padB = parseFloat(cs.paddingBottom) || 0;
  let cueH = 0;
  if (cue) {
    const ccs = getComputedStyle(cue);
    if (ccs.display !== "none") {
      /* margins are outside getBoundingClientRect — omitting them left the hero
         exactly 5px over on several devices */
      cueH = cue.getBoundingClientRect().height +
        (parseFloat(ccs.marginTop) || 0) + (parseFloat(ccs.marginBottom) || 0);
    }
  }
  const avail = cachedViewportH - padT - padB - cueH - 4;
  const natural = inner.scrollHeight;
  if (!avail || !natural || natural <= avail) return;

  const k = Math.max(0.55, avail / natural);
  if (window.CSS && CSS.supports && CSS.supports("zoom", "0.8")) {
    inner.style.zoom = String(k);                 /* affects layout — the grid row shrinks too */
  } else {
    inner.style.transformOrigin = "top center";
    inner.style.transform = "scale(" + k + ") translateZ(0)"; /* GPU-composited, hardware-accelerated */
    inner.style.height = Math.round(natural * k) + "px";
  }
}
let heroFitT;
function scheduleHeroFit() { clearTimeout(heroFitT); heroFitT = setTimeout(fitHero, 90); }
/* Used only by a genuine width/orientation change: re-reads innerHeight
   AFTER the same 90ms settle delay (not synchronously at event time, when
   some browsers haven't finished updating innerHeight for the new
   orientation yet), THEN caches it, THEN fits — so a real change is still
   picked up, while every other caller keeps using the frozen baseline. */
function scheduleHeroFitWithRecache() {
  clearTimeout(heroFitT);
  heroFitT = setTimeout(() => { cachedViewportH = window.innerHeight; fitHero(); }, 90);
}
/* fitHero() toggles inner.style.zoom/transform based on the cached viewport
   height above — exactly the property that visibly "zooms" the hero if it
   changes mid-scroll. On mobile, the address bar hiding/showing fires a
   resize event that changes innerHeight but NOT innerWidth; refitting on
   that alone was the original "zoom and jerk" the visitor saw while
   scrolling past the hero. Only a genuine viewport WIDTH change re-caches
   and re-triggers the fit here — a real orientation change still always
   does, via its own listener below. */
let lastHeroWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth === lastHeroWidth) return;
  lastHeroWidth = window.innerWidth;
  scheduleHeroFitWithRecache();
}, { passive: true });
window.addEventListener("orientationchange", scheduleHeroFitWithRecache, { passive: true });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleHeroFit);

/* ── adaptive imagery ─────────────────────────────────────────────────────────
   Photos are delivered at the size this device can actually use: sharp on a
   retina desktop, still openable on a 2G phone with 2 GB of RAM.
     f_auto      → AVIF/WebP where supported
     q_auto      → perceptual quality, much smaller than the original
     c_limit,w_  → never larger than needed
     fl_progressive → paints top-to-bottom instead of all-or-nothing
   Save-Data and effectiveType shrink the budget further on poor links.        */
function netBudget() {
  try {
    const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return 1;
    if (c.saveData) return 0.55;
    const t = String(c.effectiveType || "");
    if (t.indexOf("slow-2g") > -1) return 0.4;
    if (t.indexOf("2g") > -1) return 0.5;
    if (t === "3g") return 0.78;
  } catch (_) {}
  return 1;
}
function cld(url, w, extra) {
  const u = String(url || "");
  if (!u || u.indexOf("/upload/") === -1) return u;
  const t = ["f_auto", "q_auto:good", "c_limit", "w_" + Math.max(16, Math.round(w)), "fl_progressive"];
  if (extra) t.push(extra);
  return u.replace("/upload/", "/upload/" + t.join(",") + "/");
}
function gridSrcset(url) {
  const b = netBudget();
  const ws = b >= 0.7 ? [320, 480, 640, 900, 1200] : [320, 480, 640];
  return ws.map((w) => cld(url, w) + " " + w + "w").join(", ");
}
function viewerWidth() {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const side = Math.max(window.innerWidth || 360, window.innerHeight || 640);
  return Math.max(480, Math.min(1800, Math.round(side * dpr * netBudget())));
}

/* Gallery lightbox */
let lbIndex = 0;
function openLightbox(i) {
  lbIndex = i; const lb = $("#lightbox"), g = GALLERY[i]; if (!g) return;
  const im = $("#lbImg");
  im.decoding = "async";
  im.style.display = "";
  im.onerror = function () { im.style.display = "none"; };   /* never show the broken-image glyph full-screen */
  im.src = cld(g.url, viewerWidth());          /* sized for THIS screen + network */
  im.alt = g.caption || "memory";
  $("#lbCap").textContent = g.caption || "";
  /* keep only the neighbours warm — protects 2 GB phones from decoding 9 originals */
  [i + 1, i - 1].forEach((k) => {
    const n = GALLERY[(k + GALLERY.length) % GALLERY.length];
    if (n && n.url) { const p = new Image(); p.decoding = "async"; p.src = cld(n.url, viewerWidth()); }
  });
  lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.classList.add("noscroll");
  $("#lbClose").focus();
}
function closeLightbox() {
  const lb = $("#lightbox");
  lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.classList.remove("noscroll");
  if (lbOpener) { lbOpener.focus(); lbOpener = null; }
}
function lbStep(d) { if (!GALLERY.length) return; lbIndex = (lbIndex + d + GALLERY.length) % GALLERY.length; openLightbox(lbIndex); }
let lbOpener = null;
function setupLightbox() {
  /* Thumbnails were only openable by mouse click — a keyboard/switch-access
     visitor had no way to reach a single photo, a complete dead end rather
     than a rough edge. tabindex+role=button on each <figure> (renderGallery)
     makes them focusable; this delegates Enter/Space the same way click
     already delegates, and remembers the opener so focus returns to it on
     close instead of vanishing into the body. */
  $("#masonry").addEventListener("click", (e) => { const f = e.target.closest("figure"); if (f) { lbOpener = f; openLightbox(+f.dataset.i); } });
  $("#masonry").addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const f = e.target.closest("figure"); if (!f) return;
    e.preventDefault(); lbOpener = f; openLightbox(+f.dataset.i);
  });
  $("#lbClose").onclick = closeLightbox; $("#lbPrev").onclick = () => lbStep(-1); $("#lbNext").onclick = () => lbStep(1);
  $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!$("#lightbox").classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox(); if (e.key === "ArrowRight") lbStep(1); if (e.key === "ArrowLeft") lbStep(-1);
  });
}

/* Language toggle */
function setupLang() {
  const t = $("#langToggle"); if (!t) return;
  t.onclick = () => {
    LANG = LANG === "si" ? "en" : LANG === "en" ? "ta" : "si";
    try { localStorage.setItem("hs_lang", LANG); } catch (e) {}
    document.body.classList.add("lang-swap");
    renderAll();
    /* renderAll() only re-renders THIS document -- the same-origin sannasa
       iframe (loaded once at page load) never got told the toggle fired, so
       it stayed in whatever language was active on its own first load no
       matter how many times a guest switched here. It shares this page's
       own localStorage already; this is just the missing nudge to re-read
       it and re-render right now, instead of only on the next full reload. */
    const sf = $(".sannasa-frame");
    if (sf && sf.contentWindow) { try { sf.contentWindow.postMessage({ __sannasa: "lang" }, "*"); } catch (e) {} }
    setTimeout(() => document.body.classList.remove("lang-swap"), 420);
  };
}

/* Defers a Firestore-triggered re-render until the entry gate is actually gone
   from the DOM. connect() starts at page load, well before the visitor has
   even seen the lamp — so on a fast tap, the FIRST live snapshot (content,
   agenda, gallery, blessings can each trigger a full innerHTML rebuild) can
   land squarely inside the ~1.1s entry-dismiss animation, competing with it
   for the main thread. CSS transitions don't get "priority" over synchronous
   JS: a long-enough script blocks the browser from ever compositing the
   transition's remaining frames, so the animation visibly freezes at
   whatever it looked like when the script started, then the WHOLE page
   (animation's true end state + this render's DOM changes) appears to pop in
   at once the instant the main thread frees up — exactly the "long dead
   pause, then everything at once" pattern this was reported as. Deferring
   costs nothing: the entry gate covers the whole screen regardless, so a
   render that happens to land during it is invisible either way — it only
   needs to happen before the reveal, not in perfect lockstep with it. */
function whenEntryGone(fn) {
  if (!document.getElementById("entry")) { fn(); return; }
  const mo = new MutationObserver(() => {
    if (!document.getElementById("entry")) { mo.disconnect(); fn(); }
  });
  mo.observe(document.body, { childList: true });
}

/* Runs fn once the browser has idle time, bounded by a worst-case timeout —
   requestIdleCallback doesn't exist in Safari (iOS included) at all, so this
   falls back to a short setTimeout there, which at minimum still yields the
   main thread back for a paint before fn runs, instead of chaining straight
   into more synchronous work. Used to keep below-the-fold rebuilds (agenda,
   gallery, blessings) from piling up back-to-back with each other, or with
   renderAll()'s own deferred batch, right at the moment whenEntryGone()
   finally lets them run. */
function runIdle(fn) {
  if (window.requestIdleCallback) requestIdleCallback(fn, { timeout: 300 });
  else setTimeout(fn, 60);
}

/* ════════════════════════ POST-WEDDING · "ස්තූතියි" ═══════════════════════
   Active when the admin's manual switch is on, OR the admin's SLT-scheduled
   time has already passed. postWeddingScheduleAt is stored as the same
   "+05:30"-suffixed ISO string the admin panel already uses for dateISO
   (see fromLocalInput() there) — native Date parsing does the SLT math, so
   there is nothing timezone-specific to compute here at all. */
function isPostWeddingActive() {
  if (S.postWeddingMode) return true;
  if (S.postWeddingScheduleAt) {
    const t = new Date(S.postWeddingScheduleAt).getTime();
    if (!isNaN(t) && Date.now() >= t) return true;
  }
  return false;
}
/* Site launch gate — mirrors isPostWeddingActive() at the other end of the
   lifecycle. Missing/undefined siteLive (e.g. an older cached S, or a
   Firestore doc from before this field existed) must read as "live", not
   "paused" — hence the !== false check rather than a truthy one. */
function isSiteLive() {
  return S.siteLive !== false;
}
/* Single source of truth for which of the three full-screen states the site
   is in. Post-wedding is checked FIRST and wins outright: an event that has
   already happened overrides any earlier "not launched yet" state, so the
   two gates can never contend over which screen to show even in the
   (practically impossible) case both flags were ever on at once. */
function computeSiteScreenState() {
  if (isPostWeddingActive()) return "postwedding";
  if (!isSiteLive()) return "paused";
  return "normal";
}
/* Always pure Sinhala — this screen ignores LANG entirely, per spec. */
function renderPostWedding() {
  const port = document.getElementById("pwPortrait");
  if (port) {
    const b = S.brideName || "කෞෂානි", g = S.groomName || "ගෞරව";
    if (S.heroImageUrl) {
      port.innerHTML = '<img src="' + esc(S.heroImageUrl) + '" alt="' + esc(b + " සහ " + g) + '" loading="eager" decoding="async">';
      port.classList.remove("is-mono");
    } else {
      port.innerHTML = '<div class="hero-emblem" aria-hidden="true"></div>';
      port.classList.add("is-mono");
    }
    const sig = document.getElementById("pwSignature");
    if (sig) sig.textContent = b + " සහ " + g;
  }
  const msgEl = document.getElementById("pwMessage");
  if (msgEl) {
    msgEl.textContent = String(S.postWeddingMessage || "").trim() ||
      "අපගේ ජීවිතයේ මෙම අතිශය සුවිශේෂී දිනය වඩාත් අර්ථවත් හා සුන්දර මතකයක් බවට පත්කිරීමට ආශිර්වාද කළ ඔබ සැමට, අපගේ හදපිරි ගෞරවනීය ස්තූතිය පුදකරමු.";
  }
}
/* Mirrors renderPostWedding() above for the "coming soon" gate. Also pure
   Sinhala regardless of LANG, for the same reason: it's shown before a
   visitor has any real content to read, so the language toggle has nothing
   meaningful to switch between yet. */
function renderSitePaused() {
  // Pre-launch privacy: unlike the post-wedding thank-you screen, this
  // screen can be shown to strangers who found the link before the couple
  // ever intended it to be public, so it must never reveal who the couple
  // is -- no names, no alt text naming them.
  const port = document.getElementById("spPortrait");
  if (port) {
    if (S.heroImageUrl) {
      port.innerHTML = '<img src="' + esc(S.heroImageUrl) + '" alt="" loading="eager" decoding="async">';
      port.classList.remove("is-mono");
    } else {
      port.innerHTML = '<div class="hero-emblem" aria-hidden="true"></div>';
      port.classList.add("is-mono");
    }
  }
  const sig = document.getElementById("spSignature");
  if (sig) {
    sig.textContent = "";
    sig.style.display = "none";
  }
  const msgEl = document.getElementById("spMessage");
  if (msgEl) {
    msgEl.textContent = String(S.sitePausedMessage || "").trim() ||
      "අපගේ විශේෂ දිනය සඳහා ආරාධනය සූදානම් වෙමින් පවතී. ඉතා ඉක්මනින් අප ඔබ වෙත එමු.";
  }
}
/* Structural show/hide only runs on an actual state change (cheap `hidden`
   toggles); the text content refreshes on every call so an admin editing a
   message while its screen is already live is reflected without a
   spurious re-toggle of the surrounding layout. Single function driving
   BOTH gate screens (not two independent apply-functions) so they can never
   race each other over the shared nav/main/footer hidden state — see
   computeSiteScreenState() above for the one place that decides which of
   the three states wins. */
let siteScreenState = null;
function applySiteState() {
  const state = computeSiteScreenState();
  if (state !== siteScreenState) {
    const prevState = siteScreenState;
    siteScreenState = state;
    const locked = state !== "normal";
    /* Everything that actually SUPPRESSES the page (class + hidden
       attributes + the two gate screens) has to happen HERE, before any
       return -- including the reload branch further down. Caught directly
       from a screen recording: the reload used to fire (and the hint used
       to get written) BEFORE this block ever ran, so for the exact split
       second between deciding "locked" and location.reload() actually
       navigating away, #nav/main/.footer sat fully visible (structural
       shell, hero background, an empty RSVP button) -- none of it was
       covered by [hidden] or the gate-suppressed class yet. Doing all the
       suppression first means that even in a reload's case, the very last
       thing the soon-to-be-discarded document does is look exactly like
       the settled, correctly-locked page -- nothing new to see in that
       gap, whether or not a reload follows. */
    document.documentElement.classList.toggle("pw-lock", locked);
    /* See the .gate-suppressed rule (styles.css) for why: the preloader,
       entry gate (with its couple-names paint and lamp-tap ceremony),
       language toggle, music FAB, and now #nav/main/.footer too all belong
       to "arriving at the live site", which isn't what's happening on
       either full-screen gate. Tapping the (now-hidden, non-interactive)
       lamp can no longer fire whenEntryGone()'s callback while locked,
       which is exactly what stops tryAutoplayMusic() from ever running
       here too -- so the periodic re-check that callback also used to
       kick off (startSiteStateWatch, below) is started directly instead,
       or a visitor who loaded straight into a locked site would stay
       stuck on it even after the admin re-opens it, with no way to notice
       short of a manual reload. */
    document.documentElement.classList.toggle("gate-suppressed", locked);
    /* Unconditional, not "if (locked)": a tab that was live, fully
       rendered, then backgrounded (or bfcache-restored) while the admin
       paused the site in the meantime never reaches this branch at all if
       it's gated on locked -- state only ever went normal -> normal from
       this tab's own point of view, so the periodic resync + pageshow/
       visibilitychange listeners (startSiteStateWatch(), below) would
       never even start, and real content already sitting in the DOM from
       before would have nothing left to notice the pause and clear it.
       Starting the watch the first time this function ever runs, live or
       not, means that gap is covered too -- cheap (one poll every 30s,
       otherwise idle) and harmless for a genuinely live site the whole
       time, since refreshSiteStateFromServer() is a no-op once nothing's
       actually changed. */
    startSiteStateWatch();
    const navEl = document.getElementById("nav");
    const mainEl = document.querySelector("main");
    const footEl = document.querySelector(".footer");
    const pw = document.getElementById("postWedding");
    const sp = document.getElementById("sitePaused");
    /* Belt-and-suspenders alongside the gate-suppressed CSS rule (which
       now also covers #nav/main/.footer directly, so they're already
       display:none the instant the class above lands, with no dependency
       on this JS actually running first): the [hidden] attribute is a
       second, independent mechanism, same reasoning as the pw/sp inline
       styles just below. */
    if (navEl) navEl.hidden = locked;
    if (mainEl) mainEl.hidden = locked;
    if (footEl) footEl.hidden = locked;
    /* Mirror of the small inline script next to the iframe itself
       (index.html): that script only ever loads sannasa.html eagerly when
       its OWN early hs_gate_state check doesn't say "locked" -- so a stale
       "locked" hint (the admin re-opened the site since this visitor's
       last visit) leaves the real .sannasa-frame permanently blank unless
       something else corrects it once Firestore's real answer says the
       site is actually live. This is that correction: only acts once,
       exactly like that script (no-op the instant src already matches
       data-src), so the eager/high-priority load timing is otherwise
       untouched for the far more common case where the hint already
       had it right or wasn't stale. */
    if (!locked) {
      const sf = document.querySelector(".sannasa-frame");
      if (sf && sf.dataset.src && sf.getAttribute("src") !== sf.dataset.src) sf.src = sf.dataset.src;
    }
    /* Belt-and-suspenders on both screens: their own `display:flex`
       (styles.css) is an author-stylesheet rule, which always beats the
       browser's built-in [hidden]{display:none} — regardless of
       specificity, since rule origin is resolved before specificity is
       ever compared. The global [hidden]{display:none!important} rule
       already fixes that for every element on the page, but setting each
       screen's own inline style directly too means its visibility never
       again depends on getting that cascade order right. */
    if (pw) {
      const pwOn = state === "postwedding";
      pw.hidden = !pwOn;
      pw.style.display = pwOn ? "flex" : "none";
    }
    if (sp) {
      const spOn = state === "paused";
      sp.hidden = !spOn;
      sp.style.display = spOn ? "flex" : "none";
    }
    /* renderAll()'s own guard (see there) stops any FUTURE render from
       writing real hero/invitation/date/venue/etc. text into the DOM
       while locked -- but a visitor who already had real content painted
       into the document, whether from a live session the admin just
       paused OR from THIS module's own synchronous, pre-Firestore first
       paint (init() -> renderAll(), which runs off DEFAULTS -- the real
       couple's real details, not placeholders -- before this function
       ever gets to say "paused" for the first time; see contentPainted's
       own comment above S), still has all of that sitting in the document
       from before. Everything above this point already correctly hides
       it, visually and structurally -- but that only ever protects the
       CURRENT document; a reload is still the simplest, fully robust way
       to guarantee the real content doesn't just sit there in the DOM
       waiting for the next thing (Reader Mode, a DOM inspector) to read
       past the CSS. The fresh boot lands directly on the correctly-
       suppressed gate, via the same hs_gate_state hint written below
       (which that next boot's own S initialization reads BEFORE its
       first renderAll() call, so a returning visitor never repaints real
       content at all, and this branch never re-fires on their next load
       either).
       Guarded on contentPainted, not prevState === "normal": a first-ever
       visit (no hs_gate_state hint yet) to an already-paused site still
       gets that one brief real paint from DEFAULTS before Firestore's
       answer arrives, same as a live-session pause -- prevState alone
       (null, not "normal", on a first load) can't tell those apart from
       a load that genuinely never rendered anything.
       hs_gate_state is written here, AFTER everything above has already
       run, but still before the reload itself fires -- it has to already
       say "locked" on disk by the time location.reload() actually
       navigates away, or the fresh boot this triggers reads nothing back,
       seeds S.siteLive from the (still live) DEFAULTS again, and repaints
       the same real content the reload exists to clear. */
    try { localStorage.setItem("hs_gate_state", locked ? "locked" : "normal"); } catch (e) {}
    if (locked && contentPainted) { location.reload(); return; }
  }
  if (state === "postwedding") renderPostWedding();
  else if (state === "paused") renderSitePaused();
}
/* Catches the "site already open when the scheduled SLT time arrives" edge
   case: the Firestore doc itself doesn't change at that instant (only
   postWeddingScheduleAt's value does, back when it was first set), so no
   onSnapshot fires — a poll is the only way to notice the clock has since
   caught up. 30s, not a single setTimeout for the exact moment: a schedule
   set far enough in the future would overflow setTimeout's ~24.8-day
   (2^31-1ms) cap. Started once, from inside whenEntryGone (see connect()
   below), so it never stacks a second interval across repeated snapshots. */
/* Re-checking isPostWeddingActive() against the in-memory S alone (as this
   used to do) is worthless if the thing that's actually stale is S itself:
   iOS Safari (and other mobile browsers) can fully kill a backgrounded
   tab's underlying Firestore connection without the onSnapshot listener
   ever noticing or redelivering — S then sits frozen on whatever it last
   saw, indefinitely, and re-evaluating it just re-confirms the same wrong
   answer forever. So this force-fetches site/content straight from the
   server (bypassing any local cache) and rebuilds S from that, exactly the
   way the live listener itself does — a real resync, not just a recheck. */
async function refreshSiteStateFromServer() {
  if (!fb) { applySiteState(); return; }
  try {
    const read = fb.getDocFromServer || fb.getDoc;
    const snap = await read(fb.doc(fb.db, "site", "content"));
    const data = snap.exists() ? snap.data() : {};
    S = Object.assign({}, DEFAULTS, data);
    S.show = Object.assign({}, DEFAULTS.show, data.show || {});
  } catch (e) { /* offline or transient — fall through on whatever S already has */ }
  applySiteState();
}
/* The data-freshness watchdog above (refreshSiteStateFromServer) can only
   ever run the JS that's already loaded in this tab — and there is no
   service worker on this site, so a <script type="module"> loads once per
   navigation and can NEVER hot-reload. A visitor who opened the page
   before a fix shipped is running that old code forever, no matter how
   many more fixes ship after — every earlier round of hardening here was
   silently unable to reach a tab like that. This closes that gap at the
   root: periodically re-fetch this exact page (bypassing cache) and
   compare its build marker against this tab's own; a mismatch means a
   newer deploy exists, so force a real reload to pick it up, rather than
   patching around symptoms in code that visitor will never actually run. */
async function checkForNewBuildAndReload() {
  try {
    const res = await fetch("/?_=" + Date.now(), { cache: "no-store" });
    if (!res.ok) return;
    const html = await res.text();
    const m = html.match(/__BUILD_V__\s*=\s*"([^"]+)"/);
    if (m && m[1] && window.__BUILD_V__ && m[1] !== window.__BUILD_V__) location.reload();
  } catch (e) { /* offline or transient — try again on the next tick */ }
}
let siteWatchStarted = false;
function startSiteStateWatch() {
  if (siteWatchStarted) return;
  siteWatchStarted = true;
  setInterval(() => { refreshSiteStateFromServer(); checkForNewBuildAndReload(); }, 30000);
  /* Mobile browsers throttle or fully suspend background-tab timers and
     network connections — a visitor who backgrounds the tab right as an
     admin flips a switch could otherwise be stuck on the wrong state until
     the (also-throttled) 30s poll eventually gets to run. Resyncing the
     instant the tab becomes visible/foregrounded again closes that gap
     immediately instead of waiting on the poll. */
  document.addEventListener("visibilitychange", () => { if (!document.hidden) { refreshSiteStateFromServer(); checkForNewBuildAndReload(); } });
  window.addEventListener("pageshow", () => { refreshSiteStateFromServer(); checkForNewBuildAndReload(); });
}

/* ════════════════════════════ FIRESTORE SYNC ═════════════════════════════ */
async function connect() {
  try {
    const [{ initializeApp }, fs] = await Promise.all([
      import(SDK + "/firebase-app.js"),
      import(SDK + "/firebase-firestore.js")
    ]);
    const app = initializeApp(FB);
    /* Attaches an App Check token to every Firestore request this tab
       makes from here on -- proof (once rules are updated to require it,
       a deliberately separate follow-up) that the request came from this
       real page and not a script calling the Firestore API directly with
       the same public project config. A visitor never sees or does
       anything: reCAPTCHA Enterprise scores real browsing behavior
       silently in the background, no checkbox, no puzzle.
       Deliberately its OWN try/catch, not folded into the Promise.all
       above: that Promise.all is the critical path (no Firestore without
       it), and a third-party script (reCAPTCHA's own, loaded from Google)
       failing for any real-world visitor -- an ad-blocker, a flaky
       connection, a corporate firewall -- must never be able to take the
       whole thing down with it. Firestore reads/writes (RSVP included)
       still work exactly as before if this fails, same as they do today
       with no App Check key configured at all. */
    if (APP_CHECK_SITE_KEY) {
      try {
        const appCheck = await import(SDK + "/firebase-app-check.js");
        appCheck.initializeAppCheck(app, {
          provider: new appCheck.ReCaptchaEnterpriseProvider(APP_CHECK_SITE_KEY),
          isTokenAutoRefreshEnabled: true
        });
      } catch (e) { console.warn("App Check init failed", e); }
    }
    const db = fs.getFirestore(app);
    fb = { db, addDoc: fs.addDoc, collection: fs.collection, doc: fs.doc, setDoc: fs.setDoc, serverTimestamp: fs.serverTimestamp, getDoc: fs.getDoc, getDocFromServer: fs.getDocFromServer };

    trackVisit(fs, db);

    fs.onSnapshot(fs.doc(db, "site", "content"), (snap) => {
      const data = snap.exists() ? snap.data() : {};
      const prevHero = S.heroImageUrl;
      S = Object.assign({}, DEFAULTS, data);
      S.show = Object.assign({}, DEFAULTS.show, data.show || {});
      /* Warm the browser's cache for the portrait the instant its URL is known
         (even while the entry gate is still up) — otherwise the <img> tag
         isn't created until whenEntryGone() below, and the reveal has to
         wait out a fresh network fetch + decode right at the critical
         moment instead of reusing an already-fetched image. */
      if (S.heroImageUrl && S.heroImageUrl !== prevHero) {
        const pre = new Image();
        pre.decoding = "async";
        pre.src = S.heroImageUrl;
      }
      /* Runs immediately — even while the entry gate is still up — so
         scrolling is disabled and the main content hidden the instant
         Firestore says so, not only once the visitor taps past the gate. */
      applySiteState();
      /* Also immediate, same reasoning: if the couple's names just changed
         in admin, the entry gate should say so on the very next paint, not
         only after whenEntryGone's render of the (already correct) real
         hero underneath it. */
      paintEntryGateLive();
      whenEntryGone(() => { renderAll(); syncMusicBtn(); tryAutoplayMusic(); startSiteStateWatch(); });
    }, (err) => console.warn("content listener", err));

    fs.onSnapshot(fs.doc(db, "site", "agenda"), (snap) => {
      const items = snap.exists() && Array.isArray(snap.data().items) ? snap.data().items : null;
      AGENDA = (items && items.length) ? items : AGENDA_DEFAULT.slice();
      whenEntryGone(() => runIdle(() => { renderAgenda(); observeReveals(); }));
    }, (err) => console.warn("agenda listener", err));

    fs.onSnapshot(fs.collection(db, "gallery"), (snap) => {
      const arr = []; snap.forEach(d => arr.push(Object.assign({ id: d.id }, d.data())));
      /* admin drag-and-drop order wins; upload time is the fallback */
      arr.sort((a, b) => ((a.order == null ? 1e9 : Number(a.order)) - (b.order == null ? 1e9 : Number(b.order)))
        || (((a.ts && a.ts.seconds) || 0) - ((b.ts && b.ts.seconds) || 0)));
      GALLERY = arr; whenEntryGone(() => runIdle(() => { renderGallery(); observeReveals(); }));
    }, (err) => console.warn("gallery listener", err));

    /* Blessings MUST be queried with approved == true: the security rules gate
       reads per document, and Firestore rejects an unfiltered collection listen
       whose rule depends on resource.data. */
    fs.onSnapshot(fs.query(fs.collection(db, "blessings"), fs.where("approved", "==", true)), (snap) => {
      const arr = []; snap.forEach(d => arr.push(Object.assign({ id: d.id }, d.data())));
      arr.sort((a, b) => ((b.ts && b.ts.seconds) || 0) - ((a.ts && a.ts.seconds) || 0));
      BLESSINGS = arr; whenEntryGone(() => runIdle(() => { renderBlessings(); observeReveals(); }));
    }, (err) => console.warn("blessings listener", err));

    /* Only the {name, family, side} mirror — never the full `guests` doc, which
       also carries status/liquor/dietary/tableNumber. That keeps every other
       guest's RSVP details private from a visitor using this search box. */
    fs.onSnapshot(fs.collection(db, "guestsPublic"), (snap) => {
      const arr = []; snap.forEach(d => arr.push(Object.assign({ id: d.id }, d.data()))); GUESTS = arr;
      guestsLoaded = true;
    }, (err) => { console.warn("guestsPublic listener", err); guestsLoaded = true; });

    /* Live theme — the admin colour palette repaints the site instantly. */
    fs.onSnapshot(fs.doc(db, "site", "theme"), (snap) => {
      applyTheme(snap.exists() ? snap.data() : null);
    }, (err) => console.warn("theme listener", err));

  } catch (err) {
    console.warn("Firestore offline — running on built-in content.", err);
  }
}

/* Anonymous arrival telemetry for the admin dashboard.
   Records ONE row per browser session — never an IP, cookie or identifier.
     • ?src=qr  (printed invitation QR)  → "qr"
     • arrived from another site/app     → "web"
     • typed the address / bookmark      → "direct"
   Any failure is silent: telemetry must never affect a guest's experience. */
function trackVisit(fs, db) {
  try {
    if (sessionStorage.getItem("hs_visited") === "1") return;
    sessionStorage.setItem("hs_visited", "1");

    const q = new URLSearchParams(location.search);
    const src = String(q.get("src") || "").trim().toLowerCase();
    let kind = "direct";
    if (src === "qr") kind = "qr";
    else if (src === "web") kind = "web";
    else if (document.referrer) {
      let host = "";
      try { host = new URL(document.referrer).hostname; } catch (_) {}
      if (host && host !== location.hostname) kind = "web";
    }

    const p = (n) => String(n).padStart(2, "0");
    const d = new Date();
    const day = d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());

    fs.addDoc(fs.collection(db, "visits"), {
      kind, day,
      ref: String(document.referrer || "").slice(0, 200),
      lang: String(LANG || "si").slice(0, 4),
      ua: String(navigator.userAgent || "").slice(0, 200),
      ts: fs.serverTimestamp()
    }).catch(function (e) {
      /* Almost always a Firestore rules problem — say so loudly in the console so
         it can never fail invisibly again. */
      console.warn("[Helasiritha] visit not recorded:", (e && e.code) || e,
        "— check that the `visits` rule is deployed.");
    });
  } catch (_) { /* telemetry is strictly best-effort */ }
}

/* ════════════════════════════════ INIT ═══════════════════════════════════ */
/* Admin colour palette → live CSS variables. Invalid/missing values are ignored,
   so the built-in Noir & Champagne identity always remains the safe fallback. */
function applyTheme(t) {
  const root = document.documentElement;
  const MAP = {
    /* NB: --o-crest / --o-medallion are url() image variables, NOT colours.
       Writing a hex value into them destroys the ornament. Colours only here. */
    primary:   ["--gold"],
    secondary: ["--gold-bright", "--warm"],
    accent:    ["--gold-2", "--gold-deep", "--gold-dim"],
    surface:   ["--bg"],
    text:      ["--ink"]
  };
  Object.keys(MAP).forEach((k) => {
    const v = t && t[k];
    if (typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v.trim())) {
      MAP[k].forEach((cssVar) => root.style.setProperty(cssVar, v.trim()));
    } else {
      MAP[k].forEach((cssVar) => root.style.removeProperty(cssVar));
    }
  });

  /* Derived tones. Without these only the headings changed colour and the page
     still read as the built-in gold — the palette appeared "not to work". */
  const hx = (k) => {
    const v = t && t[k];
    return (typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v.trim())) ? v.trim() : null;
  };
  const rgbOf = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const rgbaOf = (h, a) => { const c = rgbOf(h); return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; };
  const scale = (h, f) => {
    const c = rgbOf(h).map((n) => Math.max(0, Math.min(255, Math.round(n * f))));
    return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
  };
  const P = hx("primary"), S2 = hx("secondary"), A = hx("accent"), B = hx("surface"), X = hx("text");
  const put = (k, v) => { if (v) root.style.setProperty(k, v); else root.style.removeProperty(k); };

  put("--line",      P ? rgbaOf(P, 0.16) : null);
  put("--line-soft", P ? rgbaOf(P, 0.08) : null);
  put("--glow",      P ? "0 0 30px " + rgbaOf(P, 0.28) : null);
  put("--bg-2",      B ? scale(B, 1.4) : null);
  put("--bg-3",      B ? scale(B, 1.85) : null);
  put("--mut",       X ? rgbaOf(X, 0.72) : null);
  put("--faint",     X ? rgbaOf(X, 0.5) : null);
  put("--foil", (P && S2 && A)
    ? "linear-gradient(105deg," + S2 + " 0%," + P + " 26%," + A + " 48%," + S2 + " 62%," + scale(A, 0.8) + " 80%," + P + " 100%)"
    : null);
  put("--foil-metal", (P && S2 && A)
    ? "linear-gradient(120deg," + scale(A, 0.75) + " 0%," + P + " 30%," + S2 + " 50%," + P + " 70%," + scale(A, 0.7) + " 100%)"
    : null);
}

function init() {
  if (liteMode()) document.body.classList.add("lite");
  document.body.classList.add("loaded");
  renderAll();
  setupNav(); setupLang(); setupRsvp(); setupBlessings(); setupLightbox();
  setupParallax(); setupParticles(); setupZoomGuard(); setupSannasaScroll();
  $("#heroRsvpBtn").addEventListener("click", () => { const r = $("#rsvp"); if (r) r.scrollIntoView({ behavior: "smooth" }); });
  const mb = $("#musicBtn"); if (mb) mb.onclick = toggleMusic; syncMusicBtn();
  // preloader: dismiss only once every critical gateway image is loaded AND
  // decoded, and fonts are ready — see dismissPreloader()'s own comment.
  const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  const gatewayReady = Promise.all(GATEWAY_CRITICAL_IMAGES.map(preloadDecodedImage));
  /* The preloader's own greeting/portrait/ornament/dots stagger in over ~1s
     (see preRise in styles.css), and the ambient glow behind the portrait
     starts its breathing pulse at 1.5s (preGlowPulse) — on a fast or cached
     load, everything above could resolve well under that, cutting both off
     before the visitor ever sees them. This floor guarantees the entrance
     sequence finishes and the glow gets into its pulse, without changing
     anything for a slow connection, which was already waiting past 1.6s on
     the real assets anyway. */
  const minShow = new Promise((resolve) => setTimeout(resolve, 1600));
  Promise.all([fontsReady, gatewayReady, minShow]).then(dismissPreloader);
  setTimeout(dismissPreloader, 2500); // safety — never leave the visitor waiting, even if an asset stalls
  setTimeout(fitHero, 260); setTimeout(fitHero, 1200);
  connect();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
