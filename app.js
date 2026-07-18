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

/* ── Bilingual dictionary ─ keys identical in both languages ─────────────── */
const TEXT = {
  si: {
    brand: "හෙළ සිරිත",
    footCredit: 'හෙළ සිරිත · ආදරයෙන් <span class="heart">♥</span>',
    nav: { invitation: "ආරාධනය", agenda: "වැඩසටහන", gallery: "මතකයන්", blessings: "සුබ පැතුම්", rsvp: "පැමිණීම" },
    langLabel: "EN", langTitle: "Switch to English",
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
    selectName: "කරුණාකර ඔබගේ නම තෝරන්න",
    willAttend: "ඔබ පැමිණෙනවා ද?",
    yesAttend: "ඔව්, සතුටින් පැමිණෙමි", noAttend: "කණගාටුයි, බැරිවෙයි",
    liquor: "මත්පැන් අවශ්‍යද?", yes: "ඔව්", no: "නැහැ",
    guestCount: "පැමිණෙන ගණන",
    dietary: "ආහාර අවශ්‍යතා (ඇත්නම්)",
    dietaryPh: "නිර්මාංශ, අසාත්මික ආදී…",
    confirmRsvp: "පිළිතුර එවන්න",
    rsvpThanks: "බොහොම ස්තූතියි!",
    rsvpYesMsg: "ඔබව මුණගැසීමට අපි මහත් ඕනෑකමින් සිටිමු ✦",
    rsvpNoMsg: "ඔබව අපි මිස් කරනවා — ඔබගේ ආදරයට ස්තූතියි.",
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
    lampEyebrow: "ආදරයෙන්",
    lampTitle: "සතුටින් එක්වන ආදරණීයයෝ",
    lampSub: "අප සමඟ සැමරීමට පැමිණෙන ආදරණීයන් සංඛ්‍යාව",
    confirmedCap: "ආරාධිතයන් තහවුරු වී ඇත",
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
    sending: "යවමින්…",
    blessingThanks: "ඔබගේ සුබ පැතුමට ස්තූතියි! අනුමැතියෙන් පසු එය මෙහි දිස් වේ.",
    blessingsEmpty: "පළමු සුබ පැතුම ඔබගෙන් වේවා…",
    callUs: "අමතන්න", addCal: "දින දර්ශනයට", shareWa: "WhatsApp",
    setup: "පද්ධතිය සැකසෙමින් පවතී. මඳක් පසුව නැවත පිවිසෙන්න.",
    months: ["ජනවාරි","පෙබරවාරි","මාර්තු","අප්‍රේල්","මැයි","ජූනි","ජූලි","අගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්"],
    weekdays: ["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්‍රහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"],
    suggest: [
      "ඔයාලා දෙන්නාගේ අලුත් ජීවිතේ ආදරෙන් පිරිලා, හැමදාම හිනාවෙන් ම ගෙවෙන්න සුබ පතනවා!",
      "එකිනෙකාගේ අත් කවදාවත් ලිහෙන්නේ නැති වගේ, ආදරෙන් තදින් බැඳිලා ඉන්න.",
      "නීරෝගී සුවය, දිගු ආයුෂය හා නොනිමෙන සතුටක් ම ඔයාලා දෙපළට ලැබේවා!",
      "හිතින් හදාගත්ත මේ බැඳීම, කාලයත් එක්ක තව තවත් ශක්තිමත් වේවා.",
      "සුළං හැමුවත්, වැස්ස ආවත්, දෙන්නා අත්වැල් බැඳගෙන ඉන්න පුළුවන් වේවා.",
      "ඔයාලගේ ගෙදර හැමදාම හිනාවෙන්, සෙනෙහසින් හා සාමයෙන් පිරිලා තියේවා.",
      "පුංචි පුංචි දේවල් වලට ම සතුටු වෙන්න පුළුවන් ආදරයක් ඔයාලට ලැබේවා.",
      "ආදරේ කියන්නේ එකිනෙකා දිහා බලාගෙන ඉන්න එක නෙවෙයි, එකම දිශාවකට එකට යන එක — ඒ ගමන සුබ වේවා!",
      "සඳ හිරු පවතින තුරු ම ඔයාලගේ ආදරේ නොමැකී බැබළේවා.",
      "දුකේදී හයිය වෙන්න, සතුටේදී බෙදාගන්න යාළුවෙක් වගේ, ජීවිත කාලෙටම එකට ඉන්න.",
      "අලුත් පවුලකට, අලුත් හීන ගොඩකට — ආදරණීය සුබ පැතුම්!",
      "ඔයාලගේ ආදර කතාව ලෝකෙම ලස්සනම කතාව වේවා.",
      "හැම උදෑසනක් ම එකිනෙකාගේ මූණ දැකලා පටන්ගන්න භාග්‍යය ඔයාලට ලැබේවා.",
      "ආදරෙන්, විශ්වාසෙන් හා ඉවසීමෙන් පිරුණු අපූරු දිවියක් ගෙවන්න පුළුවන් වේවා.",
      "කවදාවත් හිත් රිදෙන්නේ නැති, හැමදාම එකිනෙකාගේ හිත හදන දෙදෙනෙක් වෙන්න.",
      "සමෘද්ධිය, සෞඛ්‍ය සම්පත්තිය හා දිගු සතුටක් ම ඔයාලා දෙපළට පතනවා.",
      "පොඩි රණ්ඩුවකින් පස්සේ, ආදරේ තව ටිකක් තදින් දැනෙන්න.",
      "අත්වැල් බැඳගෙන, හැම අභියෝගයක්ම එකට ජය අරගෙන ඉදිරියට යන්න.",
      "ඔයාලගේ නිවහන දරුවන්ගේ හිනා හඬින් සතුටින් ම පිරිලා ඉතිරේවා.",
      "හැම දවසක් ම නැවත නැවතත් එකිනෙකාව තෝරගන්න පුළුවන් ආදරයක් ඔයාලට තියේවා.",
      "ආදරේ, විශ්වාසය හා ගෞරවය — මේ තුනම ඔයාලගේ ජීවිතේ මුල් බැහැගෙන තියේවා.",
      "සුබ මුහුර්තෙන් පටන්ගත්ත මේ ගමන, සුබ අවසානයක් ම දක්වා දිගැරේවා.",
      "හිත් දෙකක් එකතු වුණ මේ ලස්සන දවසේ, ආදරණීය සුබ පැතුම් රැසක්!",
      "වයසට ගියාට පස්සෙත්, තරුණ කාලේ වගේම එකිනෙකාට ආදරෙන් ඉන්න.",
      "ඔයාලගේ හීන ඔක්කොම ඇත්ත වෙන්න, එකට හදන ලෝකේ හිතුවටත් වඩා ලස්සන වෙන්න.",
      "සතුට බෙදාගත්තම දෙගුණ වෙනවා, දුක බෙදාගත්තම බාගයක් අඩු වෙනවා — ඒ බෙදාගැනීම ඔයාලට ලැබේවා.",
      "ආදරෙන් තෙත් වුණ, සමඟියෙන් බැඳුණු අපූරු පවුලක් වෙන්න.",
      "හැම වසන්තයක් ම ඔයාලගේ ආදරේට අලුත් මල් පිපේවා.",
      "එකිනෙකා නැතුව බැරි තරමට, ඒත් එකිනෙකාට බරක් නොවෙන තරමට ආදරෙන් ඉන්න.",
      "ඔයාලගේ ජීවිතේ හැම පිටුවක් ම සතුටෙන් හා සෙනෙහසින් ලියවේවා.",
      "දෙවියන්ගේ ආශිර්වාදය හැමදාම ඔයාලගේ ගෙදරට ම ලැබේවා.",
      "පුංචි අත් දෙකක් ඔයාලගේ ඇඟිලි අල්ලන දවසක් ඉක්මනින්ම එළඹේවා.",
      "හැම දුකකදීම 'මම ඉන්නවා' කියලා කියන්න පුළුවන් කෙනෙක් එකිනෙකාට වෙන්න.",
      "ආදරෙන් පටන්ගත්ත මේ බැඳීම, ජීවිත කාලෙටම නොකැඩෙන එකක් වේවා.",
      "ඔයාලගේ හිනාව, ඔයාලගේ ගෙදර හා ඔයාලගේ ආදරේ — හැමදාම බබළාවා.",
      "හැම රැයක් ම සමාදානෙන් නිදාගෙන, හැම උදේම හිනාවෙන් අවදි වෙන්න.",
      "එකිනෙකාගේ ලොකුම රසිකයා, ලොකුම යාළුවා හා ලොකුම ආදරවන්තයා වෙන්න.",
      "සැපදුක් දෙකේම එකට ඉඳලා, එකට වයසට යන අපූරු භාග්‍යය ලැබේවා.",
      "ඔයාලගේ පවුල ආදරෙන්, සිනාවෙන් හා සමෘද්ධියෙන් සදා පිරිලා තියේවා.",
      "හිත් දෙකක් එකක් වුණ මේ දවස, ජීවිතේ ලස්සනම මතකය වේවා.",
      "ආදරේට කවදාවත් වයසක් නෑ කියලා, ඔයාලා ලෝකෙට පෙන්නලා දෙන්න.",
      "ඔයාලගේ අලුත් ගමනට සතුට, සෞඛ්‍යය හා සාමය හැම විටම හෙවණැල්ලක් වේවා.",
      "එකිනෙකාට දුන්නු පොරොන්දු, ජීවිත කාලෙටම ආදරෙන් රකින්න පුළුවන් වේවා.",
      "ඔයාලගේ ගෙදරින් හැමදාම හිනා හඬයි, ආදර වචනයි ම ඇහෙන්න.",
      "සෙනෙහසින් බැඳුණු ඔයාලා දෙන්නට, සදා සුවෙන් සැනසිල්ලෙන් ඉන්න පතනවා.",
      "හැම ගැටලුවක්ම එකට කතාකරලා විසඳන, විශ්වාසෙන් පිරුණු ජීවිතයක් වෙන්න.",
      "ඔයාලගේ ආදරේ, කාලය යනකොට වයින් වගේ තව තවත් රසවත් වේවා.",
      "අලුත් ජීවිතේට, අලුත් සිහින වලට — ආදරණීය සුබ පැතුම්! සදා සතුටින් වේවා!",
      "එකිනෙකාගේ අත අල්ලගෙන, ලෝකෙම දිනාගන්න පුළුවන් ශක්තියක් ඔයාලට ලැබේවා.",
      "ඔයාලා දෙන්නාට ආදරෙන් පිරුණු, සිනාවෙන් බැබළෙන, සදාකාලික සුබ දවසක්!"
    ]
  },
  en: {
    brand: "Helasiritha",
    footCredit: 'Helasiritha · with love <span class="heart">♥</span>',
    nav: { invitation: "Invitation", agenda: "Schedule", gallery: "Moments", blessings: "Wishes", rsvp: "RSVP" },
    langLabel: "සිං", langTitle: "සිංහලට මාරු වන්න",
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
    selectName: "Please select your name",
    willAttend: "Will you be attending?",
    yesAttend: "Yes, with joy", noAttend: "Sorry, can't make it",
    liquor: "Liquor preferred?", yes: "Yes", no: "No",
    guestCount: "Number attending",
    dietary: "Dietary needs (if any)",
    dietaryPh: "Vegetarian, allergies…",
    confirmRsvp: "Send response",
    rsvpThanks: "Thank you so much!",
    rsvpYesMsg: "We can't wait to celebrate with you ✦",
    rsvpNoMsg: "We'll miss you — thank you for your love.",
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
    lampEyebrow: "With love",
    lampTitle: "Loved ones joining us",
    lampSub: "Guests who've joyfully confirmed",
    confirmedCap: "guests confirmed",
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
    sending: "Sending…",
    blessingThanks: "Thank you for your wish! It will appear here after approval.",
    blessingsEmpty: "Be the first to leave a wish…",
    callUs: "Call", addCal: "Add to calendar", shareWa: "WhatsApp",
    setup: "The site is being set up. Please check back shortly.",
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    weekdays: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    suggest: [
      "Wishing you a lifetime of love, laughter, and the little moments that mean everything.",
      "May you keep choosing each other, every single day, for the rest of your lives.",
      "Here's to a love that grows softer and stronger with every passing year.",
      "May your home always be full of warmth, laughter, and something good on the stove.",
      "Hold each other's hand through the storms and the sunshine — that's what it's all about.",
      "Wishing you health, happiness, and a love that never runs out.",
      "May you always be each other's favourite person and safest place.",
      "Love isn't looking at each other, but looking the same way together — enjoy the journey.",
      "May your love shine on, unfaded, as long as the sun and moon remain.",
      "Be each other's shoulder in sorrow and your loudest cheer in joy.",
      "To a new home, new dreams, and a beautiful life together — congratulations!",
      "May your love story be the most beautiful one ever told.",
      "May you wake up to each other's smile every single morning.",
      "Wishing you a life full of trust, tenderness, and endless patience with each other.",
      "May you always be quick to forgive and slow to let go.",
      "Wishing you prosperity, good health, and a happiness that lasts a lifetime.",
      "After every little argument, may your love feel even deeper than before.",
      "Hand in hand, may you face every challenge and win every one together.",
      "May your home one day be filled with the laughter of little feet.",
      "May you never stop falling for each other, over and over again.",
      "Love, trust, and respect — may all three take deep root in your life together.",
      "A beautiful beginning deserves a beautiful forever — here's to yours.",
      "On the day two hearts became one, all our love and warmest wishes to you both.",
      "May you love each other in your grey-haired years just as you do today.",
      "May all your dreams come true, and the world you build together be lovelier than you imagined.",
      "Joy shared is doubled and sorrow shared is halved — may you always share both.",
      "May you grow into a family bound by love and endless togetherness.",
      "May every season bring fresh blooms to your love.",
      "Close enough to never let go, gentle enough to never weigh each other down — that's real love.",
      "May every page of your life together be written in joy and tenderness.",
      "May blessings rain gently on your home for all the years to come.",
      "May two tiny hands soon wrap around your fingers.",
      "May you always be the one who says 'I'm right here' when it matters most.",
      "A love that begins so beautifully deserves to last a whole lifetime.",
      "May your smiles, your home, and your love shine on forever.",
      "May you sleep in peace every night and wake up smiling every morning.",
      "Be each other's best friend, biggest fan, and greatest love.",
      "May you share the sweet and the hard, and grow old side by side.",
      "May your family forever overflow with love, laughter, and good fortune.",
      "May this day two hearts became one be the loveliest memory of your lives.",
      "Show the world that love truly never grows old.",
      "May happiness, health, and peace follow you wherever your new life leads.",
      "May you keep, with love, every promise you made to each other today.",
      "May your home always echo with laughter and gentle, loving words.",
      "To the two of you, bound by love — may you live long, well, and happy.",
      "May you talk through every problem and build a life full of trust.",
      "Like fine wine, may your love only grow richer with time.",
      "To your new life and new dreams — congratulations, and may you always be happy!",
      "Hand in hand, may you find the strength to take on the whole world.",
      "Wishing you both a love-filled, laughter-bright, forever-kind of happy."
    ]
  }
};

/* ── Built-in DEFAULT content (bride-first). Live Firestore overrides this. ── */
const DEFAULTS = {
  brideName: "කෞශානි", groomName: "ගෞරව",
  brideNameEn: "Kaushani", groomNameEn: "Gaurawa",
  bridePreLine: "ශ්‍රීමත් හා ශ්‍රීමතී කුලසූරියගේ දම්පතියන්ගේ ආදරණීය දියණිය,",
  groomPreLine: "ශ්‍රීමත් හා ශ්‍රීමතී කප්පෙටිපොල වීරකෝන් මුදියන්සේලාගේ දම්පතියන්ගේ ආදරණීය පුත්‍රයා,",
  dateISO: "2028-01-12T09:15:00+05:30",
  venue: "The Epitome Hotel", venueCity: "කුරුණෑගල",
  venueMapUrl: "https://www.google.com/maps/search/?api=1&query=The+Epitome+Hotel+Kurunegala",
  ceremonyTime: "පෙ.ව. 9.15 සිට",
  poruwaTime: "පෙ.ව. 9.15",
  heroImageUrl: "",
  loveNote: "", loveSign: "කෞශානි & ගෞරව",
  phone: "", whatsapp: "", ambientAudioUrl: "",
  rsvpOpen: true,
  show: { countdown: true, agenda: true, gallery: true, lovenote: true, lamp: true, blessings: true, rsvp: true }
};
/* Default schedule — bilingual; admin items (titleSi/descSi) override and fall back gracefully */
const AGENDA_DEFAULT = [
  { icon: "welcome", timeLabel: "9.15 AM", titleSi: "ආගන්තුක පිළිගැනීම", descSi: "සිනා මුසු මුවින් ආරාධිතයන් සාදරයෙන් පිළිගැනීම.", titleEn: "Welcome", descEn: "Warmly receiving our guests." },
  { icon: "rings", timeLabel: "9.15 AM", titleSi: "මංගල උත්සවය", descSi: "අපගේ ජීවිත එක්වන සුවිශේෂී මොහොත.", titleEn: "The Ceremony", descEn: "The moment our lives become one." },
  { icon: "dine", timeLabel: "12.00 PM", titleSi: "දිවා භෝජනය", descSi: "රසවත් භෝජන සංග්‍රහයකින් ආරාධිතයන් සංග්‍රහ කිරීම.", titleEn: "Lunch", descEn: "A delicious feast for our guests." },
  { icon: "celebrate", timeLabel: "3.30 PM", titleSi: "සැමරුම් හා පිටත්වීම", descSi: "සතුට බෙදාගනිමින් දිනය නිමා කිරීම.", titleEn: "Celebration & Send-off", descEn: "Closing the day in shared joy." }
];

/* ── State + helpers ─────────────────────────────────────────────────────── */
let S = Object.assign({}, DEFAULTS);
let AGENDA = AGENDA_DEFAULT.slice();
let GALLERY = [], GUESTS = [], BLESSINGS = [], confirmedGuests = 0;
let fb = null;
let LANG = (function () { try { return localStorage.getItem("hs_lang") === "en" ? "en" : "si"; } catch (e) { return "si"; } })();

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (x) => String(x == null ? "" : x).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const L = () => TEXT[LANG];
const amp = (s) => String(s).replace(/&amp;|&/g, '<span class="amp">&amp;</span>');
function names() { return LANG === "en" ? { b: S.brideNameEn || S.brideName, g: S.groomNameEn || S.groomName } : { b: S.brideName, g: S.groomName }; }

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

  renderHero(); renderInvitation(); renderCountdown(); renderRsvpShell();
  renderAgenda(); renderGallery(); renderLove(); renderBlessings(); renderFooter();
  applyVisibility(); observeReveals();
}

function renderHero() {
  const T = L(), n = names(), f = fmtDate(S.dateISO);
  $("#heroEyebrow").textContent = T.heroEyebrow;
  $("#heroNames").innerHTML = esc(n.b) + ' <span class="amp">' + esc(T.and) + '</span> ' + esc(n.g);
  $("#heroTag").textContent = T.heroTag;
  $("#heroDate").textContent = (LANG === "en" ? (f.wd + ", " + f.mo + " " + f.dd + ", " + f.y) : (f.dd + " " + f.mo + " " + f.y));
  $("#heroVenue").textContent = S.venue + " · " + S.venueCity;
  $("#heroRsvpBtn").textContent = T.heroRsvp;
  $("#scrollCue").querySelector(".cue-lbl").textContent = T.scrollCue;
  const port = $("#heroPortrait");
  if (S.heroImageUrl) {
    port.innerHTML = '<img src="' + esc(S.heroImageUrl) + '" alt="' + esc(n.b + " " + T.and + " " + n.g) + '" loading="eager" decoding="async">';
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
  const preB = LANG === "en" ? "The beloved daughter," : S.bridePreLine;
  const preG = LANG === "en" ? "The beloved son," : S.groomPreLine;
  const sentence = T.invSentence({ y: f.y, mo: f.mo, dd: f.dd, wd: f.wd, venue: S.venue, city: S.venueCity });
  const html =
    '<div class="inv-block"><p class="inv-pre">' + esc(preB) + '</p><h3 class="inv-name foil">' + esc(n.b) + '</h3></div>' +
    '<div class="inv-amp">' + esc(T.and) + '</div>' +
    '<div class="inv-block"><p class="inv-pre">' + esc(preG) + '</p><h3 class="inv-name foil">' + esc(n.g) + '</h3></div>' +
    '<p class="inv-line">' + esc(sentence) + '</p>' +
    '<div class="inv-when">' +
      '<div class="blk"><div class="lbl">' + esc(T.date) + '</div><div class="num foil">' + f.dd + '</div><div class="val">' + esc(f.mo) + ' ' + f.y + '</div></div>' +
      '<div class="sep"></div>' +
      '<div class="blk"><div class="lbl">' + esc(T.venueLbl) + '</div><div class="val">' + esc(S.venue) + '</div><div class="lbl2">' + esc(S.venueCity) + '</div></div>' +
      '<div class="sep"></div>' +
      '<div class="blk"><div class="lbl">' + esc(T.timeLbl) + '</div><div class="val">' + esc(S.ceremonyTime) + '</div></div>' +
    '</div>' +
    '<p class="inv-close">' + esc(T.closing) + '</p>' +
    '<p class="inv-from">' + esc(T.from) + '</p>' +
    (S.venueMapUrl ? '<a class="btn ghost maplink" href="' + esc(S.venueMapUrl) + '" target="_blank" rel="noopener">⌖ ' + esc(T.viewLocation) + '</a>' : "");
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
  const T = L();
  $("#agEyebrow").textContent = T.agEyebrow;
  $("#agendaTitle").textContent = T.agendaTitle;
  $("#agendaSub").textContent = T.agendaSub;
  $("#agendaList").innerHTML = AGENDA.map((it, i) => {
    const title = LANG === "en" ? (it.titleEn || it.titleSi) : (it.titleSi || it.titleEn);
    const desc = LANG === "en" ? (it.descEn || it.descSi) : (it.descSi || it.descEn);
    return '<div class="ag-item reveal"><div class="ag-dot"><div class="ag-ic">' + AG_ICON(it.icon) + '</div></div>' +
      '<div class="ag-body">' + (it.timeLabel ? '<div class="ag-time">' + esc(it.timeLabel) + '</div>' : "") +
      '<div class="ag-title">' + esc(title) + '</div>' +
      (desc ? '<div class="ag-desc">' + esc(desc) + '</div>' : "") + '</div></div>';
  }).join("");
}

function renderGallery() {
  const T = L();
  $("#galEyebrow").textContent = T.galEyebrow;
  $("#galleryTitle").textContent = T.galleryTitle;
  $("#gallerySub").textContent = T.gallerySub;
  const box = $("#masonry");
  if (!GALLERY.length) { box.innerHTML = '<p class="gallery-empty">' + esc(T.galleryEmpty) + '</p>'; return; }
  box.innerHTML = GALLERY.map((g, i) =>
    '<figure class="reveal" data-i="' + i + '"><img src="' + esc(g.url) + '" alt="' + esc(g.caption || "memory") + '" loading="lazy" decoding="async">' +
    (g.caption ? '<figcaption>' + esc(g.caption) + '</figcaption>' : "") + '<span class="fig-ring"></span></figure>'
  ).join("");
}

let counterDone = false;
function renderCounter() {
  const lc = $("#lampCount"); if (!lc) return;   // lamp/counter section not present — no-op
  const T = L();
  $("#lampEyebrow").textContent = T.lampEyebrow;
  $("#lampTitle").textContent = T.lampTitle;
  $("#lampSub").textContent = T.lampSub;
  $("#lampCap").textContent = T.confirmedCap;
  $("#lampCount").textContent = String(confirmedGuests);
}

function renderLove() {
  const T = L(), n = names();
  $("#loveEyebrow").textContent = T.loveEyebrow;
  $("#loveTitle").textContent = T.loveTitle;
  $("#loveSub").textContent = T.loveSub;
  const note = (LANG === "si" && S.loveNote) ? S.loveNote : T.loveNoteDefault;
  $("#loveText").textContent = note;
  const sign = LANG === "en" ? (n.b + " & " + n.g) : (S.loveSign || (n.b + " & " + n.g));
  $("#loveSign").innerHTML = amp(sign);
}

function renderBlessings() {
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
  $("#blMsg").placeholder = T.suggest[Math.floor(Math.random() * T.suggest.length)];
  $("#blSuggest").textContent = "✦ " + T.suggestBtn;
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
  $("#rsvpSearchBtn").textContent = T.searchBtn;
  $("#willAttendQ").textContent = T.willAttend;
  $("#choiceYes").textContent = T.yesAttend;
  $("#choiceNo").textContent = T.noAttend;
  $("#liquorQ").textContent = T.liquor;
  $("#liqYes").textContent = T.yes; $("#liqNo").textContent = T.no;
  $("#countQ").textContent = T.guestCount;
  $("#dietLbl").textContent = T.dietary;
  $("#rsvpDiet").placeholder = T.dietaryPh;
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
  const T = L(), n = names(), f = fmtDate(S.dateISO);
  $("#footNames").innerHTML = esc(n.b) + ' <span class="amp">' + esc(T.and) + '</span> ' + esc(n.g);
  $("#footDate").textContent = f.dd + " " + f.mo + " " + f.y + " · " + S.venue + ", " + S.venueCity;
  const acts = $("#footActions"); acts.innerHTML = "";
  if (S.phone) acts.insertAdjacentHTML("beforeend", '<a class="btn ghost sm" href="tel:' + esc(S.phone) + '">☎ ' + esc(T.callUs) + '</a>');
  acts.insertAdjacentHTML("beforeend", '<button class="btn ghost sm" id="calBtn">⌖ ' + esc(T.addCal) + '</button>');
  $("#calBtn").onclick = downloadIcs;
}

function applyVisibility() {
  const map = { countdown: "#countdown", agenda: "#agenda", gallery: "#gallery", lovenote: "#lovenote", lamp: "#lamp", blessings: "#blessings", rsvp: "#rsvp" };
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
let revObserver = null;
function observeReveals() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(e => e.classList.add("in")); return; }
  if (!revObserver) revObserver = new IntersectionObserver((es) => {
    es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      .forEach((e, i) => { e.target.style.transitionDelay = (i * 0.08) + "s"; e.target.classList.add("in"); revObserver.unobserve(e.target); });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal:not(.in)").forEach(e => revObserver.observe(e));
}

/* Count-up for confirmed guests when the counter scrolls into view */
function setupCounter() {
  const el = $("#lampCount"); if (!el || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (e.isIntersecting && !counterDone) {
        counterDone = true;
        const target = confirmedGuests, dur = 1100, t0 = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        if (!document.body.classList.contains("lite")) requestAnimationFrame(step); else el.textContent = String(target);
      }
    });
  }, { threshold: 0.4 });
  io.observe($("#lamp"));
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
  const closeDrawer = () => { drawer.classList.remove("open"); burger.classList.remove("open"); document.body.classList.remove("noscroll"); };
  if (burger && drawer) {
    burger.onclick = () => {
      const open = drawer.classList.toggle("open"); burger.classList.toggle("open", open);
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

/* Hero parallax (rAF-throttled, transform only) */
function setupParallax() {
  if (document.body.classList.contains("lite")) return;
  const port = $("#heroPortrait"), hero = $("#hero");
  let ticking = false;
  const upd = () => {
    const r = hero.getBoundingClientRect();
    const p = Math.max(-1, Math.min(1, r.top / window.innerHeight));
    if (port) port.style.transform = "translate3d(0," + (p * 26).toFixed(1) + "px,0)";
    ticking = false;
  };
  document.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
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
  resize(); window.addEventListener("resize", resize, { passive: true });
  function frame() {
    if (document.documentElement.classList.contains("vv-zoom")) { particleRAF = requestAnimationFrame(frame); return; }
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
  frame();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { if (particleRAF) cancelAnimationFrame(particleRAF), particleRAF = null; }
    else if (!particleRAF) frame();
  });
}

/* Drive the sannasa scroll-unroll from the MAIN-page scroll (same-origin iframe).
   The iframe keeps its own LERP engine untouched — we move its internal scroll position
   based on where the frame sits in the viewport, so the invitation unrolls & reveals
   reliably on every device & deploy without needing to scroll inside the frame. */
function setupSannasaScroll() {
  const frame = $(".sannasa-frame");
  if (!frame) return;
  let innerMax = 0;
  const measure = () => {
    try {
      const w = frame.contentWindow, d = w && w.document && w.document.documentElement;
      innerMax = d ? Math.max(0, d.scrollHeight - w.innerHeight) : 0;
    } catch (_) { innerMax = 0; }
  };
  const drive = () => {
    let w;
    try { w = frame.contentWindow; } catch (_) { return; }
    if (!w || !w.document || !w.document.documentElement) return;
    if (!innerMax) measure();
    const vh = window.innerHeight, rect = frame.getBoundingClientRect();
    // 0 as the frame enters from the bottom → 1 by the time it rises to fill the viewport
    const p = Math.min(1, Math.max(0, (vh - rect.top) / vh));
    try { w.scrollTo(0, p * innerMax); } catch (_) {}
  };
  frame.addEventListener("load", () => { measure(); drive(); setTimeout(() => { measure(); drive(); }, 400); });
  window.addEventListener("scroll", drive, { passive: true });
  window.addEventListener("resize", () => { measure(); drive(); }, { passive: true });
  measure(); drive();
}

/* Zoom-crash guard — soften GPU-heavy compositing while the visitor is pinch/zoomed in */
function setupZoomGuard() {
  const vv = window.visualViewport; if (!vv) return;
  const apply = () => document.documentElement.classList.toggle("vv-zoom", (vv.scale || 1) > 1.25);
  vv.addEventListener("resize", apply, { passive: true });
  vv.addEventListener("scroll", apply, { passive: true });
  apply();
}

/* Preloader → reveal */
function dismissPreloader() {
  const p = $("#preloader"); if (!p) return;
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
function toggleMusic() { const a = getAudio(); if (!a) return; if (playing) { a.pause(); playing = false; } else { a.play().then(() => { playing = true; syncMusicBtn(); }).catch(() => {}); } syncMusicBtn(); }

/* Calendar + share */
function downloadIcs() {
  const d = new Date(S.dateISO), end = new Date(d.getTime() + 6 * 3600 * 1000);
  const fmt = (x) => x.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const n = names();
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Helasiritha//EN", "BEGIN:VEVENT",
    "UID:" + Date.now() + "@helasiritha", "DTSTAMP:" + fmt(new Date()), "DTSTART:" + fmt(d), "DTEND:" + fmt(end),
    "SUMMARY:" + n.b + " & " + n.g + " — Wedding", "LOCATION:" + (S.venue + ", " + S.venueCity).replace(/,/g, "\\,"),
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
const rsvp = { guest: null, attending: null, liquor: false, party: 1, dietary: "" };
function showStage(id) { $$(".rsvp-stage").forEach(s => s.classList.remove("active")); $(id).classList.add("active"); }
function pickGuest(g) {
  rsvp.guest = g;
  $("#confName").textContent = g.name + (g.family ? " · " + g.family : "");
  $("#choiceYes").classList.remove("sel"); $("#choiceNo").classList.remove("sel");
  $("#attendExtras").style.display = "none"; rsvp.attending = null;
  showStage("#stConfirm");
}
function setupRsvp() {
  const T = () => L();
  $("#rsvpSearchBtn").onclick = () => {
    const q = $("#rsvpSearchInput").value.trim().toLowerCase();
    const box = $("#rsvpResults"); box.innerHTML = "";
    if (!q) return;
    const hits = GUESTS.filter(g => (g.name || "").toLowerCase().includes(q) || (g.family || "").toLowerCase().includes(q)).slice(0, 12);
    if (!hits.length) {
      box.innerHTML = '<p class="note">' + esc(T().noGuest) + '</p>' +
        '<button class="btn ghost sm" id="proceedTyped">' + esc(T().proceedTyped) + '</button>';
      $("#proceedTyped").onclick = () => pickGuest({ id: "guest-" + Date.now(), name: $("#rsvpSearchInput").value.trim(), family: "", side: "" });
      return;
    }
    box.innerHTML = hits.map((g, i) =>
      '<button class="guest-pick" data-i="' + i + '"><span class="gn">' + esc(g.name) + '</span>' +
      (g.family ? '<span class="gfam">' + esc(g.family) + '</span>' : "") + '</button>').join("");
    $$("#rsvpResults .guest-pick").forEach((b, i) => b.onclick = () => pickGuest(hits[i]));
  };
  $("#rsvpSearchInput").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); $("#rsvpSearchBtn").click(); } });
  $("#choiceYes").onclick = () => { rsvp.attending = true; $("#choiceYes").classList.add("sel"); $("#choiceNo").classList.remove("sel"); $("#attendExtras").style.display = "block"; };
  $("#choiceNo").onclick = () => { rsvp.attending = false; $("#choiceNo").classList.add("sel"); $("#choiceYes").classList.remove("sel"); $("#attendExtras").style.display = "none"; };
  $("#liqYes").onclick = () => { rsvp.liquor = true; $("#liqYes").classList.add("sel"); $("#liqNo").classList.remove("sel"); };
  $("#liqNo").onclick = () => { rsvp.liquor = false; $("#liqNo").classList.add("sel"); $("#liqYes").classList.remove("sel"); };
  $("#pMinus").onclick = () => { rsvp.party = Math.max(1, rsvp.party - 1); $("#pVal").textContent = rsvp.party; };
  $("#pPlus").onclick = () => { rsvp.party = Math.min(20, rsvp.party + 1); $("#pVal").textContent = rsvp.party; };
  $("#rsvpBack").onclick = () => showStage("#stSearch");
  $("#rsvpAgain").onclick = () => {
    Object.assign(rsvp, { guest: null, attending: null, liquor: false, party: 1, dietary: "" });
    $("#rsvpSearchInput").value = ""; $("#rsvpResults").innerHTML = ""; $("#pVal").textContent = "1"; $("#rsvpDiet").value = "";
    showStage("#stSearch");
  };
  $("#rsvpSubmit").onclick = submitRsvp;
}
async function submitRsvp() {
  if (rsvp.attending === null || !rsvp.guest) return;
  const T = L();
  rsvp.dietary = $("#rsvpDiet").value.trim();
  const party = rsvp.attending ? rsvp.party : 0;
  const payload = {
    guestId: rsvp.guest.id, name: rsvp.guest.name, family: rsvp.guest.family || "", side: rsvp.guest.side || "",
    attending: rsvp.attending, liquor: rsvp.attending ? rsvp.liquor : false,
    party: party, count: party, dietary: rsvp.dietary
  };
  const btn = $("#rsvpSubmit"); btn.disabled = true; btn.textContent = T.sending;
  try { if (fb) await fb.setDoc(fb.doc(fb.db, "rsvps", payload.guestId), Object.assign({}, payload, { ts: fb.serverTimestamp() }), { merge: true }); }
  catch (e) { console.warn("RSVP save failed", e); }
  btn.disabled = false; btn.textContent = T.confirmRsvp;
  $("#rsvpThanksBig").textContent = T.rsvpThanks;
  $("#rsvpThanksMsg").textContent = rsvp.attending ? T.rsvpYesMsg : T.rsvpNoMsg;
  showStage("#stThanks");
}

/* Blessings */
function setupBlessings() {
  const sg = $("#blSuggest");
  let lastPick = "";
  if (sg) sg.onclick = () => {
    const arr = L().suggest, ta = $("#blMsg");
    const norm = s => (s || "").replace(/\s+/g, " ").trim().toLowerCase();
    const used = new Set((BLESSINGS || []).map(b => norm(b.message)));
    let pool = arr.filter(w => !used.has(norm(w)) && w !== ta.value && w !== lastPick);
    if (!pool.length) pool = arr.filter(w => w !== lastPick);
    if (!pool.length) pool = arr.slice();
    const pick = pool[Math.floor(Math.random() * pool.length)];
    lastPick = pick; ta.value = pick; ta.focus();
    sg.classList.add("pop"); setTimeout(() => sg.classList.remove("pop"), 320);
  };
  $("#blSend").onclick = async () => {
    const T = L();
    const name = $("#blName").value.trim(), msg = $("#blMsg").value.trim();
    const st = $("#blStatus");
    if (!name || !msg) { st.textContent = LANG === "en" ? "Please fill both fields." : "කරුණාකර දෙකම පුරවන්න."; return; }
    const btn = $("#blSend"); btn.disabled = true; btn.textContent = T.sending;
    try {
      if (fb) await fb.addDoc(fb.collection(fb.db, "blessings"), { name: name, message: msg, approved: false, ts: fb.serverTimestamp() });
      $("#blName").value = ""; $("#blMsg").value = ""; st.textContent = T.blessingThanks;
    } catch (e) { st.textContent = LANG === "en" ? "Something went wrong." : "දෝෂයක් සිදුවිය."; }
    btn.disabled = false; btn.textContent = T.sendBlessing;
  };
}

/* Gallery lightbox */
let lbIndex = 0;
function openLightbox(i) {
  lbIndex = i; const lb = $("#lightbox"), g = GALLERY[i]; if (!g) return;
  $("#lbImg").src = g.url; $("#lbImg").alt = g.caption || "memory"; $("#lbCap").textContent = g.caption || "";
  lb.classList.add("open"); document.body.classList.add("noscroll");
}
function closeLightbox() { $("#lightbox").classList.remove("open"); document.body.classList.remove("noscroll"); }
function lbStep(d) { if (!GALLERY.length) return; lbIndex = (lbIndex + d + GALLERY.length) % GALLERY.length; openLightbox(lbIndex); }
function setupLightbox() {
  $("#masonry").addEventListener("click", (e) => { const f = e.target.closest("figure"); if (f) openLightbox(+f.dataset.i); });
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
    LANG = LANG === "si" ? "en" : "si";
    try { localStorage.setItem("hs_lang", LANG); } catch (e) {}
    document.body.classList.add("lang-swap");
    renderAll();
    setTimeout(() => document.body.classList.remove("lang-swap"), 420);
  };
}

/* ════════════════════════════ FIRESTORE SYNC ═════════════════════════════ */
async function connect() {
  try {
    const [{ initializeApp }, fs] = await Promise.all([
      import(SDK + "/firebase-app.js"),
      import(SDK + "/firebase-firestore.js")
    ]);
    const app = initializeApp(FB);
    const db = fs.getFirestore(app);
    fb = { db, addDoc: fs.addDoc, collection: fs.collection, doc: fs.doc, setDoc: fs.setDoc, serverTimestamp: fs.serverTimestamp };

    fs.onSnapshot(fs.doc(db, "site", "content"), (snap) => {
      const data = snap.exists() ? snap.data() : {};
      S = Object.assign({}, DEFAULTS, data);
      S.show = Object.assign({}, DEFAULTS.show, data.show || {});
      renderAll(); syncMusicBtn();
    }, (err) => console.warn("content listener", err));

    fs.onSnapshot(fs.doc(db, "site", "agenda"), (snap) => {
      const items = snap.exists() && Array.isArray(snap.data().items) ? snap.data().items : null;
      AGENDA = (items && items.length) ? items : AGENDA_DEFAULT.slice();
      renderAgenda(); observeReveals();
    }, (err) => console.warn("agenda listener", err));

    fs.onSnapshot(fs.collection(db, "gallery"), (snap) => {
      const arr = []; snap.forEach(d => arr.push(Object.assign({ id: d.id }, d.data())));
      arr.sort((a, b) => ((a.ts && a.ts.seconds) || 0) - ((b.ts && b.ts.seconds) || 0));
      GALLERY = arr; renderGallery(); observeReveals();
    }, (err) => console.warn("gallery listener", err));

    fs.onSnapshot(fs.collection(db, "blessings"), (snap) => {
      const arr = []; snap.forEach(d => arr.push(Object.assign({ id: d.id }, d.data())));
      arr.sort((a, b) => ((b.ts && b.ts.seconds) || 0) - ((a.ts && a.ts.seconds) || 0));
      BLESSINGS = arr; renderBlessings(); observeReveals();
    }, (err) => console.warn("blessings listener", err));

    fs.onSnapshot(fs.collection(db, "guests"), (snap) => {
      const arr = []; snap.forEach(d => arr.push(Object.assign({ id: d.id }, d.data()))); GUESTS = arr;
    }, (err) => console.warn("guests listener", err));

    fs.onSnapshot(fs.doc(db, "site", "stats"), (snap) => {
      confirmedGuests = (snap.exists() && snap.data().confirmedCount) || 0;
    }, (err) => console.warn("stats listener", err));

  } catch (err) {
    console.warn("Firestore offline — running on built-in content.", err);
  }
}

/* ════════════════════════════════ INIT ═══════════════════════════════════ */
function init() {
  if (liteMode()) document.body.classList.add("lite");
  document.body.classList.add("loaded");
  renderAll();
  setupNav(); setupLang(); setupRsvp(); setupBlessings(); setupLightbox();
  setupParallax(); setupParticles(); setupZoomGuard(); setupSannasaScroll();
  $("#heroRsvpBtn").addEventListener("click", () => { const r = $("#rsvp"); if (r) r.scrollIntoView({ behavior: "smooth" }); });
  const mb = $("#musicBtn"); if (mb) mb.onclick = toggleMusic; syncMusicBtn();
  // preloader: dismiss after first paint / fonts
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setTimeout(dismissPreloader, 250));
  setTimeout(dismissPreloader, 1500); // safety — never leave the visitor waiting
  connect();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
