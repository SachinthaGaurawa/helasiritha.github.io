/**
 * ═══════════════════════════════════════════════════════════════════
 * හෙළ සිරිත · Kandyan Royal Ornaments — Transparent PNG + SVG Fallback
 * ═══════════════════════════════════════════════════════════════════
 */

const CDN_BASE = "https://res.cloudinary.com/dzrfpc9be/image/upload";
const CDN_URLS = {
  makaraThorana:  `${CDN_BASE}/helasiritha_ornaments/makara-thorana.png`,
  sesath:         `${CDN_BASE}/helasiritha_ornaments/sesath.png`,
  punkalasa:      `${CDN_BASE}/helasiritha_ornaments/punkalasa.png`,
  liyawala:       `${CDN_BASE}/helasiritha_ornaments/liyawala.png`,
  mangalaLamp:    `${CDN_BASE}/helasiritha_ornaments/mangala-lamp.png`,
  sandakadaPahana:`${CDN_BASE}/helasiritha_ornaments/sandakada-pahana.png`,
  lotusFlower:    `${CDN_BASE}/helasiritha_ornaments/lotus-flower.png`,
  templeBorder:   `${CDN_BASE}/helasiritha_ornaments/temple-border.png`,
  cornerOrnament: `${CDN_BASE}/helasiritha_ornaments/corner-ornament.png`,
};

// SVG fallbacks stored globally to prevent text-leaking bugs
window.__HS_SVG = window.__HS_SVG || {};

function svgDefs(id) {
  return `<defs>
    <linearGradient id="g1_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF6DC"/><stop offset="16%" stop-color="#F3D695"/>
      <stop offset="34%" stop-color="#D9AF61"/><stop offset="52%" stop-color="#B98B3D"/>
      <stop offset="70%" stop-color="#E7C77E"/><stop offset="86%" stop-color="#9A6E2E"/>
      <stop offset="100%" stop-color="#6E4A1C"/>
    </linearGradient>
    <linearGradient id="g2_${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8B6914"/><stop offset="100%" stop-color="#5C3A10"/>
    </linearGradient>
    <radialGradient id="ruby_${id}" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#FF1744"/><stop offset="60%" stop-color="#C62828"/>
      <stop offset="100%" stop-color="#8B0000"/>
    </radialGradient>
    <radialGradient id="emerald_${id}" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#00E676"/><stop offset="100%" stop-color="#1B5E20"/>
    </radialGradient>
    <filter id="ds_${id}">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.45"/>
    </filter>
  </defs>`;
}

// SVG MAKARA THORANA
window.__HS_SVG.makaraThorana = function() {
  const id = 'mkt';
  return `<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:800px;height:auto;display:block;">
    ${svgDefs(id)}
    <rect x="60" y="450" width="780" height="45" rx="6" fill="url(#g2_${id})"/>
    <rect x="80" y="458" width="740" height="28" rx="4" fill="url(#g1_${id})"/>
    <circle cx="120" cy="472" r="8" fill="url(#ruby_${id})" opacity="0.7"/>
    <circle cx="780" cy="472" r="8" fill="url(#ruby_${id})" opacity="0.7"/>
    <circle cx="450" cy="472" r="10" fill="url(#emerald_${id})" opacity="0.7"/>
    <g filter="url(#ds_${id})">
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
      </g>
      <path d="M 410 75 Q 400 60 395 48 Q 392 38 400 30 Q 412 24 422 32 Q 428 44 422 55" fill="none" stroke="url(#g1_${id})" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="400" cy="26" rx="6" ry="10" fill="url(#g1_${id})"/>
    </g>
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
      </g>
      <path d="M 410 75 Q 400 60 395 48 Q 392 38 400 30 Q 412 24 422 32 Q 428 44 422 55" fill="none" stroke="url(#g1_${id})" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="400" cy="26" rx="6" ry="10" fill="url(#g1_${id})"/>
    </g>
    <g filter="url(#ds_${id})">
      <path d="M 460 52 Q 520 15 590 10 Q 660 8 730 10 Q 800 15 860 52" fill="none" stroke="url(#g1_${id})" stroke-width="38" stroke-linecap="round"/>
      <path d="M 470 48 Q 528 18 595 14 Q 665 12 735 14 Q 802 18 850 48" fill="none" stroke="url(#g2_${id})" stroke-width="14" stroke-linecap="round"/>
      <circle cx="660" cy="14" r="28" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="3"/>
      <path d="M 660 -6 Q 648 4 660 14 Q 672 4 660 -6" fill="url(#ruby_${id})"/>
      <path d="M 642 14 Q 650 6 660 14 Q 650 22 642 14" fill="url(#emerald_${id})"/>
      <path d="M 678 14 Q 670 6 660 14 Q 670 22 678 14" fill="url(#emerald_${id})"/>
      <path d="M 660 34 Q 648 24 660 14 Q 672 24 660 34" fill="url(#ruby_${id})"/>
      <circle cx="660" cy="14" r="6" fill="#FFD700"/>
      <line x1="560" y1="12" x2="560" y2="50" stroke="url(#g1_${id})" stroke-width="2"/>
      <ellipse cx="560" cy="56" rx="9" ry="14" fill="url(#g1_${id})"/>
      <line x1="760" y1="12" x2="760" y2="50" stroke="url(#g1_${id})" stroke-width="2"/>
      <ellipse cx="760" cy="56" rx="9" ry="14" fill="url(#g1_${id})"/>
    </g>
    <rect x="160" y="280" width="45" height="170" rx="7" fill="url(#g1_${id})" filter="url(#ds_${id})"/>
    <rect x="695" y="280" width="45" height="170" rx="7" fill="url(#g1_${id})" filter="url(#ds_${id})"/>
    <rect x="170" y="320" width="25" height="40" rx="4" fill="url(#g2_${id})"/>
    <rect x="705" y="320" width="25" height="40" rx="4" fill="url(#g2_${id})"/>
    <rect x="170" y="380" width="25" height="40" rx="4" fill="url(#g2_${id})"/>
    <rect x="705" y="380" width="25" height="40" rx="4" fill="url(#g2_${id})"/>
  </svg>`;
};

// SVG SESATH
window.__HS_SVG.sesath = function() {
  const id = 'ss';
  let tiers = '';
  for (let i = 0; i < 7; i++) {
    const y = 95 + i * 70;
    const w = 260 - i * 30;
    const x = 150 - w/2;
    const gem = i % 2 === 0 ? `url(#ruby_${id})` : `url(#emerald_${id})`;
    tiers += `<ellipse cx="150" cy="${y}" rx="${w/2}" ry="16" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
      <path d="M ${x} ${y} Q 150 ${y-22} ${x+w} ${y}" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
      <line x1="${x+18}" y1="${y}" x2="${x+18}" y2="${y+22}" stroke="url(#g1_${id})" stroke-width="1.5"/>
      <circle cx="${x+18}" cy="${y+25}" r="4" fill="url(#g1_${id})"/>
      <line x1="${x+w-18}" y1="${y}" x2="${x+w-18}" y2="${y+22}" stroke="url(#g1_${id})" stroke-width="1.5"/>
      <circle cx="${x+w-18}" cy="${y+25}" r="4" fill="url(#g1_${id})"/>
      <circle cx="${x+38}" cy="${y+4}" r="5" fill="${gem}" opacity="0.85"/>
      <circle cx="${x+w-38}" cy="${y+4}" r="5" fill="${gem}" opacity="0.85"/>`;
  }
  return `<svg viewBox="0 0 300 700" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;height:auto;display:block;">
    ${svgDefs(id)}
    <g filter="url(#ds_${id})">
      <circle cx="150" cy="42" r="22" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="3"/>
      <path d="M 150 20 Q 140 32 150 42 Q 160 32 150 20" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2"/>
      <circle cx="150" cy="64" r="12" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
      <circle cx="150" cy="42" r="8" fill="url(#ruby_${id})"/>
    </g>
    <rect x="146" y="80" width="8" height="540" fill="url(#g2_${id})" filter="url(#ds_${id})"/>
    <g filter="url(#ds_${id})">${tiers}</g>
    <g filter="url(#ds_${id})">
      <ellipse cx="150" cy="645" rx="55" ry="16" fill="url(#g2_${id})"/>
      <path d="M 95 645 Q 150 628 205 645" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
      <rect x="120" y="625" width="60" height="20" rx="4" fill="url(#g1_${id})"/>
    </g>
  </svg>`;
};

// SVG PUNKALASA
window.__HS_SVG.punkalasa = function() {
  const id = 'pk';
  return `<svg viewBox="0 0 240 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:180px;height:auto;display:block;">
    ${svgDefs(id)}
    <g filter="url(#ds_${id})">
      <ellipse cx="120" cy="360" rx="70" ry="15" fill="url(#g2_${id})"/>
      <rect x="65" y="335" width="110" height="25" rx="6" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2"/>
    </g>
    <g filter="url(#ds_${id})">
      <path d="M 70 335 Q 55 300 58 265 Q 62 230 75 200 Q 90 170 110 150 Q 120 142 130 150 Q 150 170 165 200 Q 178 230 182 265 Q 185 300 170 335 Z" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="3"/>
      <rect x="90" y="135" width="60" height="18" rx="4" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
      <ellipse cx="120" cy="135" rx="40" ry="10" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2.5"/>
      <circle cx="120" cy="210" r="7" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="1.5"/>
    </g>
    <g filter="url(#ds_${id})">
      <circle cx="120" cy="125" r="18" fill="url(#g2_${id})"/>
      <path d="M 120 107 Q 112 115 120 125 Q 128 115 120 107" fill="url(#g1_${id})"/>
    </g>
    <g opacity="0.9" filter="url(#ds_${id})">
      <path d="M 120 107 Q 120 85 120 65" stroke="#2D5A27" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="120" cy="58" rx="12" ry="22" fill="#2D5A27" stroke="#1B5E20" stroke-width="1.5"/>
      <path d="M 108 115 Q 95 95 82 78" stroke="#2D5A27" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="78" cy="72" rx="11" ry="20" fill="#2D5A27" stroke="#1B5E20" stroke-width="1.5" transform="rotate(-25 78 72)"/>
      <path d="M 132 115 Q 145 95 158 78" stroke="#2D5A27" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="162" cy="72" rx="11" ry="20" fill="#2D5A27" stroke="#1B5E20" stroke-width="1.5" transform="rotate(25 162 72)"/>
    </g>
    <g opacity="0.85" filter="url(#ds_${id})">
      <circle cx="120" cy="80" r="8" fill="url(#ruby_${id})"/>
      <circle cx="90" cy="85" r="6" fill="url(#ruby_${id})"/>
      <circle cx="150" cy="85" r="6" fill="url(#ruby_${id})"/>
    </g>
  </svg>`;
};

// SVG LIYAWALA
window.__HS_SVG.liyawala = function() {
  const id = 'ly';
  return `<svg viewBox="0 0 800 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:600px;height:auto;display:block;margin:2rem auto;">
    ${svgDefs(id)}
    <g filter="url(#ds_${id})">
      <path d="M 0 40 Q 40 25 80 40 Q 120 55 160 40 Q 200 25 240 40 Q 280 55 320 40 Q 360 25 400 40 Q 440 55 480 40 Q 520 25 560 40 Q 600 55 640 40 Q 680 25 720 40 Q 760 55 800 40" fill="none" stroke="url(#g1_${id})" stroke-width="4" stroke-linecap="round"/>
      <path d="M 260 35 Q 255 28 258 20 Q 264 15 270 20 Q 274 28 270 35" fill="url(#g1_${id})"/>
      <circle cx="264" cy="38" r="3.5" fill="url(#g1_${id})"/>
      <path d="M 500 50 Q 495 43 498 35 Q 504 30 510 35 Q 514 43 510 50" fill="url(#g1_${id})"/>
      <circle cx="504" cy="53" r="3.5" fill="url(#g1_${id})"/>
      <g transform="translate(400,40)">
        <path d="M 0 -12 Q -8 -5 0 0 Q 8 -5 0 -12" fill="url(#ruby_${id})"/>
        <path d="M -12 0 Q -5 -8 0 0 Q -5 8 -12 0" fill="url(#g1_${id})"/>
        <path d="M 12 0 Q 5 -8 0 0 Q 5 8 12 0" fill="url(#g1_${id})"/>
        <path d="M 0 12 Q -8 5 0 0 Q 8 5 0 12" fill="url(#ruby_${id})"/>
        <circle cx="0" cy="0" r="5" fill="#FFD700"/>
      </g>
    </g>
  </svg>`;
};

// SVG MANGALA LAMP
window.__HS_SVG.mangalaLamp = function() {
  const id = 'ml';
  return `<svg viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:140px;height:auto;display:block;">
    ${svgDefs(id)}
    <radialGradient id="flame_${id}" cx="50%" cy="70%">
      <stop offset="0%" stop-color="#FFF7DA"/><stop offset="40%" stop-color="#FFD700"/>
      <stop offset="70%" stop-color="#FF8C00"/><stop offset="100%" stop-color="#FF4500"/>
    </radialGradient>
    <filter id="fg_${id}"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <g class="flame" filter="url(#fg_${id})">
      <ellipse cx="50" cy="35" rx="14" ry="28" fill="url(#flame_${id})" opacity="0.95"/>
      <ellipse cx="50" cy="38" rx="9" ry="20" fill="#FFF7DA" opacity="0.85"/>
      <ellipse cx="50" cy="40" rx="5" ry="12" fill="#FFF" opacity="0.7"/>
    </g>
    <rect x="46" y="63" width="8" height="14" fill="url(#g1_${id})" filter="url(#ds_${id})"/>
    <g filter="url(#ds_${id})">
      <ellipse cx="50" cy="80" rx="32" ry="10" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2"/>
      <path d="M 18 80 Q 50 72 82 80" fill="url(#g1_${id})"/>
    </g>
    <rect x="46" y="92" width="8" height="45" fill="url(#g1_${id})" filter="url(#ds_${id})"/>
    <g filter="url(#ds_${id})">
      <ellipse cx="50" cy="137" rx="28" ry="9" fill="url(#g1_${id})" stroke="url(#g2_${id})" stroke-width="2"/>
      <path d="M 22 137 Q 50 130 78 137" fill="url(#g1_${id})"/>
    </g>
  </svg>`;
};

// SAFE ORNAMENT BUILDER
function buildOrnament(key, className, style) {
  const url = CDN_URLS[key];
  if (!url || !window.__HS_SVG[key]) return '';
  return `<img class="${className}" src="${url}" alt="" style="${style}"
    onerror="var e=this;var fn=window.__HS_SVG['${key}'];if(fn){e.parentElement.innerHTML=fn();e.parentElement.firstChild.style.cssText='${style.replace(/'/g,'')}';}"/>`;
}

// EXPORTED FUNCTIONS
export function makaraThorana(cls = '') {
  return buildOrnament('makaraThorana', cls, 'width:100%;max-width:800px;height:auto;display:block;filter:drop-shadow(0 10px 30px rgba(139,105,20,0.4))');
}
export function sesath(cls = '') {
  return buildOrnament('sesath', cls, 'width:100%;max-width:280px;height:auto;display:block;filter:drop-shadow(0 15px 35px rgba(139,105,20,0.5))');
}
export function punkalasa(cls = '') {
  return buildOrnament('punkalasa', cls, 'width:100%;max-width:180px;height:auto;display:block;filter:drop-shadow(0 12px 28px rgba(139,105,20,0.45))');
}
export function liyawala(cls = '') {
  return buildOrnament('liyawala', cls, 'width:100%;max-width:600px;height:auto;display:block;margin:2rem auto;filter:drop-shadow(0 8px 20px rgba(139,105,20,0.35))');
}
export function mangalaLamp(cls = '') {
  return buildOrnament('mangalaLamp', cls, 'width:100%;max-width:140px;height:auto;display:block;filter:drop-shadow(0 0 25px rgba(255,215,0,0.6)) drop-shadow(0 12px 28px rgba(139,105,20,0.4))');
}
export function sandakadaPahana(cls = '') {
  return buildOrnament('sandakadaPahana', cls, 'width:100%;max-width:400px;height:auto;display:block;margin:2rem auto;filter:drop-shadow(0 10px 30px rgba(62,34,21,0.4))');
}
export function lotusFlower(cls = '') {
  return buildOrnament('lotusFlower', cls, 'width:100%;max-width:100px;height:auto;display:block;filter:drop-shadow(0 8px 20px rgba(139,105,20,0.4))');
}
export function templeBorder(cls = '') {
  return buildOrnament('templeBorder', cls, 'width:100%;max-width:600px;height:auto;display:block;margin:1.5rem auto;filter:drop-shadow(0 6px 18px rgba(139,105,20,0.35))');
}
export function cornerOrnament(cls = '') {
  return buildOrnament('cornerOrnament', cls, 'width:100%;max-width:80px;height:auto;display:block;filter:drop-shadow(0 6px 18px rgba(139,105,20,0.4))');
}
export function vesCrown(cls = '') { return punkalasa(cls); }
export function templePattern(cls = '') {
  return `<div class="${cls}" style="width:100%;height:100%;background:radial-gradient(ellipse at center,rgba(212,168,68,0.1) 0%,transparent 70%),repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(139,105,20,0.05) 35px,rgba(139,105,20,0.05) 70px);pointer-events:none;"></div>`;
}