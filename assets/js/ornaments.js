/**
 * ═══════════════════════════════════════════════════════════════════
 * හෙළ සිරිත · Kandyan Royal Ornaments — PURE INLINE SVG SYSTEM
 * ═══════════════════════════════════════════════════════════════════
 * 100% SVG — no external images, no 404 errors, no text leaking.
 * Detailed Kandyan temple art rendered directly in DOM.
 * Always works on every browser and device.
 * ══════════════════════════════════════════════════════════════════
 */

// ─── GRADIENTS (reusable SVG defs) ───
function svgDefs(id) {
  return `<defs>
    <linearGradient id="g1_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF6DC"/>
      <stop offset="16%" stop-color="#F3D695"/>
      <stop offset="34%" stop-color="#D9AF61"/>
      <stop offset="52%" stop-color="#B98B3D"/>
      <stop offset="70%" stop-color="#E7C77E"/>
      <stop offset="86%" stop-color="#9A6E2E"/>
      <stop offset="100%" stop-color="#6E4A1C"/>
    </linearGradient>
    <linearGradient id="g2_${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8B6914"/>
      <stop offset="100%" stop-color="#5C3A10"/>
    </linearGradient>
    <radialGradient id="ruby_${id}" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#FF1744"/>
      <stop offset="60%" stop-color="#C62828"/>
      <stop offset="100%" stop-color="#8B0000"/>
    </radialGradient>
    <radialGradient id="emerald_${id}" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#00E676"/>
      <stop offset="100%" stop-color="#1B5E20"/>
    </radialGradient>
    <filter id="ds_${id}">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.45"/>
    </filter>
  </defs>`;
}

// ═══════════════════════════════════════════════════════════════════
// මකර තොරණ — MAKARA THORANA (Dragon Arch)
// Based on Temple of the Tooth 12.5ft × 15.5ft stone dragon arch
// Two makara dragons facing each other with ornate arch between
// ═══════════════════════════════════════════════════════════════════
export function makaraThorana(cls = '') {
  const id = 'mkt';
  return `<svg class="${cls}" viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:800px;height:auto;display:block;">
    ${svgDefs(id)}
    <!-- Base platform -->
    <rect x="60" y="450" width="780" height="45" rx="6" fill="url(#g2_${id})"/>
    <rect x="80" y="458" width="740" height="28" rx="4" fill="url(#g1_${id})"/>
    <!-- Decorative base motifs -->
    <circle cx="120" cy="472" r="8" fill="url(#ruby_${id})" opacity="0.7"/>
    <circle cx="780" cy="472" r="8" fill="url(#ruby_${id})" opacity="0.7"/>
    <circle cx="450" cy="472" r="10" fill="url(#emerald_${id})" opacity="0.7"/>
    <!-- LEFT MAKARA DRAGON -->
    <g filter="url(#ds_${id})">
      <path d="M 180 450 Q 170 360 195 280 Q 220 200 270 140 Q 320 90 380 70 Q 430 58 460 52" fill="none" stroke="url(#g1_${id})" stroke-width="48" stroke-linecap="round"/>
      <path d="M 186 444 Q 176 356 200 276 Q 224 198 274 138 Q 324 88 384 68 Q 434 56 464 50" fill="none" stroke="#FFF6DC" stroke-width="14" stroke-linecap="round" opacity="0.25"/>
      <!-- Dragon head -->
      <path d="M 460 52 Q 485 42 510 55 Q 530 68 535 88 Q 538 108 522 122 Q 505 132 488 127 Q 472 120 466 106 Q 460 90 462 72 Z" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="3"/>
      <!-- Horns -->
      <path d="M 495 55 Q 500 35 490 20 Q 485 18 488 28 Q 492 42 495 55" fill="url(#g1_${id})"/>
      <path d="M 510 60 Q 520 40 515 25 Q 510 22 512 32 Q 515 48 510 60" fill="url(#g1_${id})"/>
      <!-- Eye -->
      <ellipse cx="505" cy="88" rx="10" ry="12" fill="url(#g2_${id})"/>
      <ellipse cx="508" cy="86" rx="5" ry="7" fill="url(#ruby_${id})"/>
      <ellipse cx="510" cy="84" rx="2" ry="3" fill="#FFF" opacity="0.9"/>
      <!-- Open mouth with fangs -->
      <path d="M 530 95 Q 545 92 552 88 Q 558 84 555 78" fill="none" stroke="url(#g1_${id})" stroke-width="8" stroke-linecap="round"/>
      <path d="M 540 88 L 545 100 L 548 88" fill="url(#g1_${id})"/>
      <path d="M 550 85 L 553 97 L 556 85" fill="url(#g1_${id})"/>
      <!-- Curled trunk -->
      <path d="M 460 52 Q 450 32 455 15 Q 465 5 480 8 Q 492 18 488 32 Q 482 44 475 50" fill="none" stroke="url(#g1_${id})" stroke-width="16" stroke-linecap="round"/>
      <!-- Leg/claw -->
      <path d="M 230 290 Q 215 265 210 240 Q 208 225 218 210" fill="none" stroke="url(#g1_${id})" stroke-width="14" stroke-linecap="round"/>
      <circle cx="218" cy="205" r="9" fill="url(#g1_${id})"/>
      <!-- Scales on body -->
      <g opacity="0.7" stroke="#6E4A1C" stroke-width="1.5" fill="none">
        <path d="M 200 400 q 5 -5 10 0"/><path d="M 210 370 q 5 -5 10 0"/>
        <path d="M 230 330 q 5 -5 10 0"/><path d="M 260 280 q 5 -5 10 0"/>
        <path d="M 300 220 q 5 -5 10 0"/><path d="M 350 160 q 5 -5 10 0"/>
        <path d="M 400 100 q 5 -5 10 0"/>
      </g>
      <!-- Creeper work (liya vela) flowing from dragon -->
      <path d="M 410 75 Q 400 60 395 48 Q 392 38 400 30 Q 412 24 422 32 Q 428 44 422 55" fill="none" stroke="url(#g1_${id})" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="400" cy="26" rx="6" ry="10" fill="url(#g1_${id})"/>
    </g>
    <!-- RIGHT MAKARA DRAGON (mirrored) -->
    <g filter="url(#ds_${id})" transform="translate(900,0) scale(-1,1)">
      <path d="M 180 450 Q 170 360 195 280 Q 220 200 270 140 Q 320 90 380 70 Q 430 58 460 52" fill="none" stroke="url(#g1_${id})" stroke-width="48" stroke-linecap="round"/>
      <path d="M 186 444 Q 176 356 200 276 Q 224 198 274 138 Q 324 88 384 68 Q 434 56 464 50" fill="none" stroke="#FFF6DC" stroke-width="14" stroke-linecap="round" opacity="0.25"/>
      <path d="M 460 52 Q 485 42 510 55 Q 530 68 535 88 Q 538 108 522 122 Q 505 132 488 127 Q 472 120 466 106 Q 460 90 462 72 Z" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="3"/>
      <path d="M 495 55 Q 500 35 490 20 Q 485 18 488 28 Q 492 42 495 55" fill="url(#g1_${id})"/>
      <path d="M 510 60 Q 520 40 515 25 Q 510 22 512 32 Q 515 48 510 60" fill="url(#g1_${id})"/>
      <ellipse cx="505" cy="88" rx="10" ry="12" fill="url(#g2_${id})"/>
      <ellipse cx="508" cy="86" rx="5" ry="7" fill="url(#ruby_${id})"/>
      <ellipse cx="510" cy="84" rx="2" ry="3" fill="#FFF" opacity="0.9"/>
      <path d="M 530 95 Q 545 92 552 88 Q 558 84 555 78" fill="none" stroke="url(#g1_${id})" stroke-width="8" stroke-linecap="round"/>
      <path d="M 540 88 L 545 100 L 548 88" fill="url(#g1_${id})"/>
      <path d="M 550 85 L 553 97 L 556 85" fill="url(#g1_${id})"/>
      <path d="M 460 52 Q 450 32 455 15 Q 465 5 480 8 Q 492 18 488 32 Q 482 44 475 50" fill="none" stroke="url(#g1_${id})" stroke-width="16" stroke-linecap="round"/>
      <path d="M 230 290 Q 215 265 210 240 Q 208 225 218 210" fill="none" stroke="url(#g1_${id})" stroke-width="14" stroke-linecap="round"/>
      <circle cx="218" cy="205" r="9" fill="url(#g1_${id})"/>
      <g opacity="0.7" stroke="#6E4A1C" stroke-width="1.5" fill="none">
        <path d="M 200 400 q 5 -5 10 0"/><path d="M 210 370 q 5 -5 10 0"/>
        <path d="M 230 330 q 5 -5 10 0"/><path d="M 260 280 q 5 -5 10 0"/>
        <path d="M 300 220 q 5 -5 10 0"/><path d="M 350 160 q 5 -5 10 0"/>
        <path d="M 400 100 q 5 -5 10 0"/>
      </g>
      <path d="M 410 75 Q 400 60 395 48 Q 392 38 400 30 Q 412 24 422 32 Q 428 44 422 55" fill="none" stroke="url(#g1_${id})" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="400" cy="26" rx="6" ry="10" fill="url(#g1_${id})"/>
    </g>
    <!-- ARCH connecting dragons -->
    <g filter="url(#ds_${id})">
      <path d="M 460 52 Q 520 15 590 10 Q 660 8 730 10 Q 800 15 860 52" fill="none" stroke="url(#g1_${id})" stroke-width="38" stroke-linecap="round"/>
      <path d="M 470 48 Q 528 18 595 14 Q 665 12 735 14 Q 802 18 850 48" fill="none" stroke="url(#g2_${id})" stroke-width="14" stroke-linecap="round"/>
      <!-- Central lotus medallion -->
      <circle cx="660" cy="14" r="28" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="3"/>
      <path d="M 660 -6 Q 648 4 660 14 Q 672 4 660 -6" fill="url(#ruby_${id})"/>
      <path d="M 642 14 Q 650 6 660 14 Q 650 22 642 14" fill="url(#emerald_${id})"/>
      <path d="M 678 14 Q 670 6 660 14 Q 670 22 678 14" fill="url(#emerald_${id})"/>
      <path d="M 660 34 Q 648 24 660 14 Q 672 24 660 34" fill="url(#ruby_${id})"/>
      <circle cx="660" cy="14" r="6" fill="#FFD700"/>
      <!-- Hanging floral decorations -->
      <line x1="560" y1="12" x2="560" y2="50" stroke="url(#g1_${id})" stroke-width="2"/>
      <ellipse cx="560" cy="56" rx="9" ry="14" fill="url(#g1_${id})"/>
      <line x1="760" y1="12" x2="760" y2="50" stroke="url(#g1_${id})" stroke-width="2"/>
      <ellipse cx="760" cy="56" rx="9" ry="14" fill="url(#g1_${id})"/>
      <circle cx="540" cy="16" r="8" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2"/>
      <circle cx="780" cy="16" r="8" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2"/>
    </g>
    <!-- Pillars -->
    <rect x="160" y="280" width="45" height="170" rx="7" fill="url(#g1_${id})" filter="url(#ds_${id})"/>
    <rect x="695" y="280" width="45" height="170" rx="7" fill="url(#g1_${id})" filter="url(#ds_${id})"/>
    <rect x="170" y="320" width="25" height="40" rx="4" fill="url(#g2_${id})"/>
    <rect x="705" y="320" width="25" height="40" rx="4" fill="url(#g2_${id})"/>
    <rect x="170" y="380" width="25" height="40" rx="4" fill="url(#g2_${id})"/>
    <rect x="705" y="380" width="25" height="40" rx="4" fill="url(#g2_${id})"/>
  </svg>`;
}

// ═══════════════════════════════════════════════════════════════════
// සේසත් — SESATH (Royal Umbrella — 7 Tiers)
// Based on Kandyan Perahera royal umbrellas
// ═══════════════════════════════════════════════════════════════════
export function sesath(cls = '') {
  const id = 'ss';
  return `<svg class="${cls}" viewBox="0 0 300 700" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;height:auto;display:block;">
    ${svgDefs(id)}
    <!-- Top finial (kotha) -->
    <g filter="url(#ds_${id})">
      <circle cx="150" cy="42" r="22" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="3"/>
      <path d="M 150 20 Q 140 32 150 42 Q 160 32 150 20" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2"/>
      <circle cx="150" cy="64" r="12" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
      <circle cx="150" cy="42" r="8" fill="url(#ruby_${id})"/>
    </g>
    <!-- Pole -->
    <rect x="146" y="80" width="8" height="540" fill="url(#g2_${id})" filter="url(#ds_${id})"/>
    <!-- 7 tiers -->
    <g filter="url(#ds_${id})">
      ${[0,1,2,3,4,5,6].map(i => {
        const y = 95 + i * 70;
        const w = 260 - i * 30;
        const x = 150 - w/2;
        const gem = i % 2 === 0 ? `url(#ruby_${id})` : `url(#emerald_${id})`;
        return `
        <ellipse cx="150" cy="${y}" rx="${w/2}" ry="16" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
        <path d="M ${x} ${y} Q 150 ${y-22} ${x+w} ${y}" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
        <ellipse cx="150" cy="${y-5}" rx="${w/2-14}" ry="8" fill="none" stroke="url(#g2_${id})" stroke-width="1.5" opacity="0.6"/>
        <line x1="${x+18}" y1="${y}" x2="${x+18}" y2="${y+22}" stroke="url(#g1_${id})" stroke-width="1.5"/>
        <circle cx="${x+18}" cy="${y+25}" r="4" fill="url(#g1_${id})"/>
        <line x1="${x+w-18}" y1="${y}" x2="${x+w-18}" y2="${y+22}" stroke="url(#g1_${id})" stroke-width="1.5"/>
        <circle cx="${x+w-18}" cy="${y+25}" r="4" fill="url(#g1_${id})"/>
        <circle cx="${x+38}" cy="${y+4}" r="5" fill="${gem}" opacity="0.85"/>
        <circle cx="${x+w-38}" cy="${y+4}" r="5" fill="${gem}" opacity="0.85"/>`;
      }).join('')}
    </g>
    <!-- Base platform -->
    <g filter="url(#ds_${id})">
      <ellipse cx="150" cy="645" rx="55" ry="16" fill="url(#g2_${id})"/>
      <path d="M 95 645 Q 150 628 205 645" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
      <rect x="120" y="625" width="60" height="20" rx="4" fill="url(#g1_${id})"/>
    </g>
  </svg>`;
}

// ═══════════════════════════════════════════════════════════════════
// පුංකලස — PUNKALASA (Pot of Prosperity)
// ═══════════════════════════════════════════════════════════════════
export function punkalasa(cls = '') {
  const id = 'pk';
  return `<svg class="${cls}" viewBox="0 0 240 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:180px;height:auto;display:block;">
    ${svgDefs(id)}
    <!-- Base pedestal -->
    <g filter="url(#ds_${id})">
      <ellipse cx="120" cy="360" rx="70" ry="15" fill="url(#g2_${id})"/>
      <rect x="65" y="335" width="110" height="25" rx="6" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2"/>
    </g>
    <!-- Pot body -->
    <g filter="url(#ds_${id})">
      <path d="M 70 335 Q 55 300 58 265 Q 62 230 75 200 Q 90 170 110 150 Q 120 142 130 150 Q 150 170 165 200 Q 178 230 182 265 Q 185 300 170 335 Z" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="3"/>
      <rect x="90" y="135" width="60" height="18" rx="4" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
      <ellipse cx="120" cy="135" rx="40" ry="10" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
      <ellipse cx="120" cy="135" rx="35" ry="7" fill="url(#g2_${id})" opacity="0.5"/>
      <path d="M 80 180 Q 120 175 160 180" stroke="url(#g2_${id})" stroke-width="2" fill="none"/>
      <path d="M 70 220 Q 120 213 170 220" stroke="url(#g2_${id})" stroke-width="2" fill="none"/>
      <path d="M 62 260 Q 120 252 178 260" stroke="url(#g2_${id})" stroke-width="2" fill="none"/>
      <path d="M 58 300 Q 120 292 182 300" stroke="url(#g2_${id})" stroke-width="2" fill="none"/>
      <circle cx="120" cy="210" r="7" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="1.5"/>
    </g>
    <!-- Coconut on top -->
    <g filter="url(#ds_${id})">
      <circle cx="120" cy="125" r="18" fill="url(#g2_${id})"/>
      <path d="M 120 107 Q 112 115 120 125 Q 128 115 120 107" fill="url(#g1_${id})"/>
    </g>
    <!-- Mango leaves -->
    <g opacity="0.9" filter="url(#ds_${id})">
      <path d="M 120 107 Q 120 85 120 65" stroke="#2D5A27" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="120" cy="58" rx="12" ry="22" fill="#2D5A27" stroke="#1B5E20" stroke-width="1.5"/>
      <path d="M 108 115 Q 95 95 82 78" stroke="#2D5A27" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="78" cy="72" rx="11" ry="20" fill="#2D5A27" stroke="#1B5E20" stroke-width="1.5" transform="rotate(-25 78 72)"/>
      <path d="M 132 115 Q 145 95 158 78" stroke="#2D5A27" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="162" cy="72" rx="11" ry="20" fill="#2D5A27" stroke="#1B5E20" stroke-width="1.5" transform="rotate(25 162 72)"/>
      <path d="M 100 120 Q 85 108 72 95" stroke="#2D5A27" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="68" cy="90" rx="9" ry="16" fill="#2D5A27" stroke="#1B5E20" stroke-width="1.5" transform="rotate(-35 68 90)"/>
      <path d="M 140 120 Q 155 108 168 95" stroke="#2D5A27" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="172" cy="90" rx="9" ry="16" fill="#2D5A27" stroke="#1B5E20" stroke-width="1.5" transform="rotate(35 172 90)"/>
    </g>
    <!-- Flowers -->
    <g opacity="0.85" filter="url(#ds_${id})">
      <circle cx="120" cy="80" r="8" fill="url(#ruby_${id})"/>
      <circle cx="90" cy="85" r="6" fill="url(#ruby_${id})"/>
      <circle cx="150" cy="85" r="6" fill="url(#ruby_${id})"/>
      <circle cx="75" cy="95" r="5" fill="url(#ruby_${id})" opacity="0.7"/>
      <circle cx="165" cy="95" r="5" fill="url(#ruby_${id})" opacity="0.7"/>
    </g>
  </svg>`;
}

// ═══════════════════════════════════════════════════════════════════
// ලියවැල — LIYAWALA (Traditional Creeper/Vine Pattern)
// ══════════════════════════════════════════════════════════════════
export function liyawala(cls = '') {
  const id = 'ly';
  return `<svg class="${cls}" viewBox="0 0 800 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:600px;height:auto;display:block;margin:2rem auto;">
    ${svgDefs(id)}
    <g filter="url(#ds_${id})">
      <path d="M 0 40 Q 40 25 80 40 Q 120 55 160 40 Q 200 25 240 40 Q 280 55 320 40 Q 360 25 400 40 Q 440 55 480 40 Q 520 25 560 40 Q 600 55 640 40 Q 680 25 720 40 Q 760 55 800 40" fill="none" stroke="url(#g1_${id})" stroke-width="4" stroke-linecap="round"/>
      <path d="M 15 40 Q 8 32 12 24 Q 18 18 26 22 Q 32 28 28 36" fill="none" stroke="url(#g1_${id})" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="30" cy="36" r="5" fill="url(#g1_${id})"/>
      <path d="M 100 30 Q 95 22 98 14 Q 104 8 110 12 Q 114 18 110 26" fill="url(#g1_${id})" stroke="url(#g1_${id})" stroke-width="1.5"/>
      <path d="M 180 50 Q 175 58 178 66 Q 184 72 190 68 Q 194 62 190 54" fill="url(#g1_${id})" stroke="url(#g1_${id})" stroke-width="1.5"/>
      <path d="M 260 35 Q 255 28 258 20 Q 264 15 270 20 Q 274 28 270 35" fill="url(#g1_${id})"/>
      <circle cx="264" cy="38" r="3.5" fill="url(#g1_${id})"/>
      <path d="M 340 45 Q 335 38 338 30 Q 344 24 350 28 Q 354 35 350 42" fill="url(#g1_${id})" stroke="url(#g1_${id})" stroke-width="1.5"/>
      <path d="M 420 35 Q 415 28 418 20 Q 424 14 430 18 Q 434 26 430 33" fill="url(#g1_${id})" stroke="url(#g1_${id})" stroke-width="1.5"/>
      <path d="M 500 50 Q 495 43 498 35 Q 504 30 510 35 Q 514 43 510 50" fill="url(#g1_${id})"/>
      <circle cx="504" cy="53" r="3.5" fill="url(#g1_${id})"/>
      <path d="M 580 30 Q 575 22 578 14 Q 584 8 590 12 Q 594 18 590 26" fill="url(#g1_${id})" stroke="url(#g1_${id})" stroke-width="1.5"/>
      <path d="M 660 50 Q 655 58 658 66 Q 664 72 670 68 Q 674 62 670 54" fill="url(#g1_${id})" stroke="url(#g1_${id})" stroke-width="1.5"/>
      <path d="M 740 35 Q 735 28 738 20 Q 744 15 750 20 Q 754 28 750 35" fill="url(#g1_${id})"/>
      <circle cx="744" cy="38" r="3.5" fill="url(#g1_${id})"/>
      <path d="M 785 40 Q 792 32 788 24 Q 782 18 774 22 Q 768 28 772 36" fill="none" stroke="url(#g1_${id})" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="770" cy="36" r="5" fill="url(#g1_${id})"/>
      <!-- Center ornament (large lotus) -->
      <g transform="translate(400,40)">
        <path d="M 0 -12 Q -8 -5 0 0 Q 8 -5 0 -12" fill="url(#ruby_${id})"/>
        <path d="M -12 0 Q -5 -8 0 0 Q -5 8 -12 0" fill="url(#g1_${id})"/>
        <path d="M 12 0 Q 5 -8 0 0 Q 5 8 12 0" fill="url(#g1_${id})"/>
        <path d="M 0 12 Q -8 5 0 0 Q 8 5 0 12" fill="url(#ruby_${id})"/>
        <circle cx="0" cy="0" r="5" fill="#FFD700"/>
      </g>
      <circle cx="200" cy="40" r="4" fill="url(#ruby_${id})" opacity="0.6"/>
      <circle cx="600" cy="40" r="4" fill="url(#ruby_${id})" opacity="0.6"/>
    </g>
  </svg>`;
}

// ═══════════════════════════════════════════════════════════════════
// මංගල පහන — MANGALA LAMP (Traditional Brass Oil Lamp)
// ═══════════════════════════════════════════════════════════════════
export function mangalaLamp(cls = '') {
  const id = 'ml';
  return `<svg class="${cls}" viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:140px;height:auto;display:block;">
    ${svgDefs(id)}
    <radialGradient id="flame_${id}" cx="50%" cy="70%">
      <stop offset="0%" stop-color="#FFF7DA"/>
      <stop offset="40%" stop-color="#FFD700"/>
      <stop offset="70%" stop-color="#FF8C00"/>
      <stop offset="100%" stop-color="#FF4500"/>
    </radialGradient>
    <filter id="fg_${id}">
      <feGaussianBlur stdDeviation="3"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="ds_${id}">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity="0.4"/>
    </filter>
    <!-- Flame with glow -->
    <g class="flame" filter="url(#fg_${id})">
      <ellipse cx="50" cy="35" rx="14" ry="28" fill="url(#flame_${id})" opacity="0.95"/>
      <ellipse cx="50" cy="38" rx="9" ry="20" fill="#FFF7DA" opacity="0.85"/>
      <ellipse cx="50" cy="40" rx="5" ry="12" fill="#FFF" opacity="0.7"/>
    </g>
    <!-- Wick holder -->
    <rect x="46" y="63" width="8" height="14" fill="url(#g1_${id})" filter="url(#ds_${id})"/>
    <!-- Oil bowl -->
    <g filter="url(#ds_${id})">
      <ellipse cx="50" cy="80" rx="32" ry="10" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2"/>
      <path d="M 18 80 Q 50 72 82 80" fill="url(#g1_${id})"/>
      <ellipse cx="50" cy="78" rx="28" ry="6" fill="url(#g2_${id})" opacity="0.4"/>
    </g>
    <!-- Stem -->
    <rect x="46" y="92" width="8" height="45" fill="url(#g1_${id})" filter="url(#ds_${id})"/>
    <!-- Decorative rings -->
    <ellipse cx="50" cy="105" rx="14" ry="4" fill="none" stroke="url(#g2_${id})" stroke-width="1.5"/>
    <ellipse cx="50" cy="120" rx="16" ry="5" fill="none" stroke="url(#g2_${id})" stroke-width="1.5"/>
    <!-- Base -->
    <g filter="url(#ds_${id})">
      <ellipse cx="50" cy="137" rx="28" ry="9" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2"/>
      <path d="M 22 137 Q 50 130 78 137" fill="url(#g1_${id})"/>
      <path d="M 30 145 Q 50 152 70 145" fill="none" stroke="url(#g2_${id})" stroke-width="2"/>
      <circle cx="50" cy="150" r="4" fill="url(#g1_${id})"/>
    </g>
  </svg>`;
}

// ═══════════════════════════════════════════════════════════════════
// LOTUS FLOWER
// ═══════════════════════════════════════════════════════════════════
export function lotusFlower(cls = '') {
  const id = 'lt';
  return `<svg class="${cls}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:100px;height:auto;display:block;">
    ${svgDefs(id)}
    <g filter="url(#ds_${id})">
      <path d="M 60 10 Q 50 30 60 60 Q 70 30 60 10 Z" fill="url(#g1_${id})" opacity="0.95"/>
      <path d="M 60 18 Q 75 35 90 60 Q 78 55 60 60 Q 50 40 60 18 Z" fill="url(#g1_${id})" opacity="0.75"/>
      <path d="M 60 18 Q 45 35 30 60 Q 42 55 60 60 Q 70 40 60 18 Z" fill="url(#g1_${id})" opacity="0.75"/>
      <path d="M 60 28 Q 80 42 100 65 Q 85 62 60 60 Q 52 48 60 28 Z" fill="url(#g1_${id})" opacity="0.55"/>
      <path d="M 60 28 Q 40 42 20 65 Q 35 62 60 60 Q 68 48 60 28 Z" fill="url(#g1_${id})" opacity="0.55"/>
      <circle cx="60" cy="60" r="10" fill="url(#ruby_${id})"/>
      <circle cx="60" cy="60" r="5" fill="#FFD700"/>
    </g>
  </svg>`;
}

// ═══════════════════════════════════════════════════════════════════
// SANDAKADA PAHANA — MOONSTONE
// ═══════════════════════════════════════════════════════════════════
export function sandakadaPahana(cls = '') {
  const id = 'sp';
  return `<svg class="${cls}" viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:400px;height:auto;display:block;">
    ${svgDefs(id)}
    <g filter="url(#ds_${id})">
      <path d="M 10 150 A 140 140 0 0 1 290 150 L 280 150 A 130 130 0 0 0 20 150 Z" fill="#E0D1AE" stroke="url(#g1_${id})" stroke-width="2"/>
      <path d="M 30 150 A 120 120 0 0 1 270 150" fill="none" stroke="url(#g1_${id})" stroke-width="3"/>
      <path d="M 50 150 A 100 100 0 0 1 250 150" fill="none" stroke="url(#g1_${id})" stroke-width="2"/>
      <path d="M 70 150 A 80 80 0 0 1 230 150" fill="none" stroke="url(#g1_${id})" stroke-width="2"/>
      <!-- Lotus petals in outer ring -->
      ${Array.from({length: 24}, (_, i) => {
        const angle = (i * 7.5 * Math.PI) / 180;
        const x = 150 + 125 * Math.cos(angle);
        const y = 150 - 125 * Math.sin(angle);
        return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="8" ry="4" fill="url(#g1_${id})" opacity="0.7" transform="rotate(${-i * 7.5} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      }).join('')}
      <!-- Animals -->
      <g transform="translate(90, 90) scale(0.55)">
        <ellipse cx="0" cy="5" rx="14" ry="9" fill="url(#g1_${id})"/>
        <rect x="-10" y="12" width="4" height="12" fill="url(#g1_${id})"/>
        <rect x="-4" y="12" width="4" height="12" fill="url(#g1_${id})"/>
        <rect x="2" y="12" width="4" height="12" fill="url(#g1_${id})"/>
        <rect x="8" y="12" width="4" height="12" fill="url(#g1_${id})"/>
      </g>
      <g transform="translate(130, 85) scale(0.5)">
        <ellipse cx="0" cy="5" rx="10" ry="6" fill="url(#g1_${id})"/>
        <rect x="-8" y="10" width="3" height="12" fill="url(#g1_${id})"/>
        <rect x="-3" y="10" width="3" height="12" fill="url(#g1_${id})"/>
        <rect x="3" y="10" width="3" height="12" fill="url(#g1_${id})"/>
        <rect x="8" y="10" width="3" height="12" fill="url(#g1_${id})"/>
      </g>
      <g transform="translate(170, 85) scale(0.5)">
        <ellipse cx="0" cy="5" rx="10" ry="6" fill="url(#g1_${id})"/>
        <circle cx="-8" cy="0" r="5" fill="url(#g1_${id})"/>
        <rect x="-8" y="10" width="3" height="12" fill="url(#g1_${id})"/>
        <rect x="-3" y="10" width="3" height="12" fill="url(#g1_${id})"/>
        <rect x="3" y="10" width="3" height="12" fill="url(#g1_${id})"/>
        <rect x="8" y="10" width="3" height="12" fill="url(#g1_${id})"/>
      </g>
      <g transform="translate(210, 90) scale(0.5)">
        <ellipse cx="0" cy="5" rx="10" ry="6" fill="url(#g1_${id})"/>
        <rect x="-8" y="10" width="3" height="10" fill="url(#g1_${id})"/>
        <rect x="-3" y="10" width="3" height="10" fill="url(#g1_${id})"/>
        <rect x="3" y="10" width="3" height="10" fill="url(#g1_${id})"/>
        <rect x="8" y="10" width="3" height="10" fill="url(#g1_${id})"/>
      </g>
      <!-- Center lotus -->
      <circle cx="150" cy="120" r="15" fill="url(#g1_${id})" opacity="0.8"/>
      <path d="M 150 105 Q 145 115 150 120 Q 155 115 150 105" fill="url(#ruby_${id})"/>
      <path d="M 135 120 Q 145 115 150 120 Q 145 125 135 120" fill="url(#ruby_${id})"/>
      <path d="M 165 120 Q 155 115 150 120 Q 155 125 165 120" fill="url(#ruby_${id})"/>
      <path d="M 150 135 Q 145 125 150 120 Q 155 125 150 135" fill="url(#ruby_${id})"/>
    </g>
  </svg>`;
}

// ═══════════════════════════════════════════════════════════════════
// CORNER ORNAMENT
// ═══════════════════════════════════════════════════════════════════
export function cornerOrnament(cls = '') {
  const id = 'cn';
  return `<svg class="${cls}" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:80px;height:auto;display:block;">
    ${svgDefs(id)}
    <g filter="url(#ds_${id})">
      <path d="M 5 75 Q 5 40 40 5" fill="none" stroke="url(#g1_${id})" stroke-width="4" stroke-linecap="round"/>
      <path d="M 12 75 Q 12 45 40 12" fill="none" stroke="url(#g1_${id})" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      <path d="M 25 60 Q 25 40 40 25" fill="none" stroke="url(#g1_${id})" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
      <circle cx="5" cy="75" r="6" fill="url(#ruby_${id})"/>
      <circle cx="40" cy="5" r="6" fill="url(#emerald_${id})"/>
      <circle cx="25" cy="25" r="4" fill="url(#g1_${id})"/>
      <path d="M 35 55 Q 40 45 50 40" fill="none" stroke="url(#g1_${id})" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="55" cy="35" rx="6" ry="9" fill="url(#g1_${id})" transform="rotate(35 55 35)"/>
    </g>
  </svg>`;
}

// ═══════════════════════════════════════════════════════════════════
// TEMPLE BORDER (decorative divider)
// ═══════════════════════════════════════════════════════════════════
export function templeBorder(cls = '') {
  const id = 'tb';
  return `<svg class="${cls}" viewBox="0 0 600 40" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:600px;height:auto;display:block;margin:1.5rem auto;">
    ${svgDefs(id)}
    <g filter="url(#ds_${id})">
      <line x1="20" y1="20" x2="240" y2="20" stroke="url(#g1_${id})" stroke-width="2.5"/>
      <line x1="360" y1="20" x2="580" y2="20" stroke="url(#g1_${id})" stroke-width="2.5"/>
      <g transform="translate(300,20)">
        <path d="M 0 -14 Q -10 -5 0 0 Q 10 -5 0 -14" fill="url(#g1_${id})"/>
        <path d="M -14 0 Q -5 -10 0 0 Q -5 10 -14 0" fill="url(#g1_${id})"/>
        <path d="M 14 0 Q 5 -10 0 0 Q 5 10 14 0" fill="url(#g1_${id})"/>
        <path d="M 0 14 Q -10 5 0 0 Q 10 5 0 14" fill="url(#g1_${id})"/>
        <circle cx="0" cy="0" r="5" fill="url(#ruby_${id})"/>
      </g>
      <circle cx="240" cy="20" r="3" fill="url(#g1_${id})"/>
      <circle cx="360" cy="20" r="3" fill="url(#g1_${id})"/>
    </g>
  </svg>`;
}

// ═══════════════════════════════════════════════════════════════════
// VES CROWN — uses punkalasa as placeholder
// ═══════════════════════════════════════════════════════════════════
export function vesCrown(cls = '') {
  return punkalasa(cls);
}

export function templePattern(cls = '') {
  return `<div class="${cls}" style="width:100%;height:100%;background:radial-gradient(ellipse at center,rgba(212,168,68,0.1) 0%,transparent 70%),repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(139,105,20,0.05) 35px,rgba(139,105,20,0.05) 70px);pointer-events:none;"></div>`;
}
