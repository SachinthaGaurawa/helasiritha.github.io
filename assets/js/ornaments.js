/**
 * ═══════════════════════════════════════════════════════════════════
 * හෙළ සිරිත · Kandyan Royal Ornaments — Dual-Render System
 * ═══════════════════════════════════════════════════════════════════
 * DUAL-RENDER: Tries PNG first → falls back to detailed SVG on 404.
 * Works in ALL scenarios — no broken images ever.
 * ══════════════════════════════════════════════════════════════════
 */

// Try PNG first (if uploaded to repo), then relative path as fallback
const IMG_PATHS = {
  makaraThorana: ['/assets/images/makara-thorana.png', './assets/images/makara-thorana.png'],
  sesath: ['/assets/images/sesath.png', './assets/images/sesath.png'],
  punkalasa: ['/assets/images/punkalasa.png', './assets/images/punkalasa.png'],
  liyawala: ['/assets/images/liyawala.png', './assets/images/liyawala.png'],
  mangalaLamp: ['/assets/images/mangala-lamp.png', './assets/images/mangala-lamp.png'],
  sandakadaPahana: ['/assets/images/sandakada-pahana.png', './assets/images/sandakada-pahana.png'],
  cornerOrnament: ['/assets/images/corner-ornament.png', './assets/images/corner-ornament.png'],
  lotusFlower: ['/assets/images/lotus-flower.png', './assets/images/lotus-flower.png'],
  templeBorder: ['/assets/images/temple-border.png', './assets/images/temple-border.png']
};

// Helper: build container with img + onerror fallback
function ornament(cls, key, svgContent, imgStyle, svgStyle) {
  const paths = IMG_PATHS[key] || [];
  // Generate img with onerror that tries next path, then falls back to SVG
  let imgHTML = '';
  paths.forEach((p, i) => {
    if (i === 0) {
      imgHTML = `<img src="${p}" alt="" style="${imgStyle}"
        onerror="var n=this;var paths=${JSON.stringify(paths.slice(1))};var idx=0;function tryNext(){if(idx<paths.length){n.src=paths[idx];idx++;}else{n.parentElement.innerHTML='${svgContent.replace(/'/g, "\\'")}';}}tryNext()"/>`;
    }
  });
  return `<div class="${cls}" style="display:inline-block">${imgHTML}</div>`;
}

// ═══════════════════════════════════════════════════════════════════
// SVG FALLBACKS — Detailed Kandyan Vector Art
// ═══════════════════════════════════════════════════════════════════

const SVG_MAKARA = `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
<defs>
<linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#FFD700"/><stop offset="25%" stop-color="#D4A844"/>
<stop offset="50%" stop-color="#B8860B"/><stop offset="75%" stop-color="#D4A844"/>
<stop offset="100%" stop-color="#8B6914"/>
</linearGradient>
<linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stop-color="#B8860B"/><stop offset="100%" stop-color="#6B4E0A"/>
</linearGradient>
<radialGradient id="ruby" cx="50%" cy="50%"><stop offset="0%" stop-color="#FF1744"/><stop offset="100%" stop-color="#8B0000"/></radialGradient>
<radialGradient id="emerald" cx="50%" cy="50%"><stop offset="0%" stop-color="#00E676"/><stop offset="100%" stop-color="#1B5E20"/></radialGradient>
<filter id="shadow1"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.4"/></filter>
</defs>
<!-- Base platform -->
<rect x="50" y="440" width="700" height="50" rx="6" fill="url(#g2)" filter="url(#shadow1)"/>
<rect x="70" y="450" width="660" height="30" rx="4" fill="url(#g1)"/>
<!-- Left Makara Dragon -->
<g filter="url(#shadow1)">
<path d="M 180 440 Q 170 360 190 280 Q 210 200 260 140 Q 310 90 370 70 Q 420 60 450 55" fill="none" stroke="url(#g1)" stroke-width="50" stroke-linecap="round"/>
<path d="M 185 435 Q 175 355 195 275 Q 215 195 265 135 Q 315 85 375 65 Q 425 55 455 50" fill="none" stroke="#FFD700" stroke-width="22" stroke-linecap="round" opacity="0.4"/>
<path d="M 450 55 Q 475 45 495 55 Q 515 65 520 85 Q 522 105 510 120 Q 495 130 480 125 Q 465 118 460 105 Q 455 90 458 75 Z" fill="url(#g1)" stroke="url(#g2)" stroke-width="3"/>
<ellipse cx="495" cy="90" rx="14" ry="16" fill="url(#g2)"/>
<ellipse cx="498" cy="88" rx="7" ry="9" fill="url(#ruby)"/>
<ellipse cx="500" cy="86" rx="3" ry="4" fill="#FFF" opacity="0.8"/>
<path d="M 450 55 Q 440 35 445 18 Q 455 8 470 12 Q 480 20 475 35" fill="none" stroke="url(#g1)" stroke-width="20" stroke-linecap="round"/>
<path d="M 240 300 Q 220 270 210 240" fill="none" stroke="url(#g1)" stroke-width="16" stroke-linecap="round"/>
<circle cx="210" cy="235" r="9" fill="url(#g1)"/>
<path d="M 400 80 Q 390 65 385 50 Q 383 35 390 28 Q 400 22 410 28 Q 415 40 410 52" fill="none" stroke="url(#g1)" stroke-width="9" stroke-linecap="round"/>
<ellipse cx="390" cy="24" rx="7" ry="11" fill="url(#g1)"/>
</g>
<!-- Right Makara Dragon (mirrored) -->
<g filter="url(#shadow1)" transform="translate(800,0) scale(-1,1)">
<path d="M 180 440 Q 170 360 190 280 Q 210 200 260 140 Q 310 90 370 70 Q 420 60 450 55" fill="none" stroke="url(#g1)" stroke-width="50" stroke-linecap="round"/>
<path d="M 185 435 Q 175 355 195 275 Q 215 195 265 135 Q 315 85 375 65 Q 425 55 455 50" fill="none" stroke="#FFD700" stroke-width="22" stroke-linecap="round" opacity="0.4"/>
<path d="M 450 55 Q 475 45 495 55 Q 515 65 520 85 Q 522 105 510 120 Q 495 130 480 125 Q 465 118 460 105 Q 455 90 458 75 Z" fill="url(#g1)" stroke="url(#g2)" stroke-width="3"/>
<ellipse cx="495" cy="90" rx="14" ry="16" fill="url(#g2)"/>
<ellipse cx="498" cy="88" rx="7" ry="9" fill="url(#ruby)"/>
<ellipse cx="500" cy="86" rx="3" ry="4" fill="#FFF" opacity="0.8"/>
<path d="M 450 55 Q 440 35 445 18 Q 455 8 470 12 Q 480 20 475 35" fill="none" stroke="url(#g1)" stroke-width="20" stroke-linecap="round"/>
<path d="M 240 300 Q 220 270 210 240" fill="none" stroke="url(#g1)" stroke-width="16" stroke-linecap="round"/>
<circle cx="210" cy="235" r="9" fill="url(#g1)"/>
<path d="M 400 80 Q 390 65 385 50 Q 383 35 390 28 Q 400 22 410 28 Q 415 40 410 52" fill="none" stroke="url(#g1)" stroke-width="9" stroke-linecap="round"/>
<ellipse cx="390" cy="24" rx="7" ry="11" fill="url(#g1)"/>
</g>
<!-- Arch connecting dragons -->
<g filter="url(#shadow1)">
<path d="M 450 55 Q 500 20 560 15 Q 620 12 680 15 Q 740 20 790 55" fill="none" stroke="url(#g1)" stroke-width="40" stroke-linecap="round"/>
<path d="M 460 50 Q 510 22 570 18 Q 630 15 690 18 Q 750 22 780 50" fill="none" stroke="url(#g2)" stroke-width="16" stroke-linecap="round"/>
<!-- Central lotus -->
<circle cx="620" cy="18" r="28" fill="url(#g1)" stroke="url(#g2)" stroke-width="3"/>
<path d="M 620 0 Q 608 10 620 18 Q 632 10 620 0" fill="url(#ruby)"/>
<path d="M 602 18 Q 610 10 620 18 Q 610 26 602 18" fill="url(#emerald)"/>
<path d="M 638 18 Q 630 10 620 18 Q 630 26 638 18" fill="url(#emerald)"/>
<path d="M 620 36 Q 608 26 620 18 Q 632 26 620 36" fill="url(#ruby)"/>
<circle cx="540" cy="22" r="11" fill="url(#g1)" stroke="url(#g2)" stroke-width="2"/>
<circle cx="700" cy="22" r="11" fill="url(#g1)" stroke="url(#g2)" stroke-width="2"/>
<!-- Hanging flowers -->
<line x1="560" y1="18" x2="560" y2="55" stroke="url(#g1)" stroke-width="2"/>
<ellipse cx="560" cy="62" rx="9" ry="14" fill="url(#g1)"/>
<line x1="680" y1="18" x2="680" y2="55" stroke="url(#g1)" stroke-width="2"/>
<ellipse cx="680" cy="62" rx="9" ry="14" fill="url(#g1)"/>
</g>
<!-- Pillars -->
<rect x="160" y="280" width="45" height="160" rx="7" fill="url(#g1)" filter="url(#shadow1)"/>
<rect x="595" y="280" width="45" height="160" rx="7" fill="url(#g1)" filter="url(#shadow1)"/>
<rect x="170" y="320" width="25" height="40" rx="4" fill="url(#g2)"/>
<rect x="605" y="320" width="25" height="40" rx="4" fill="url(#g2)"/>
<rect x="170" y="380" width="25" height="40" rx="4" fill="url(#g2)"/>
<rect x="605" y="380" width="25" height="40" rx="4" fill="url(#g2)"/>
</svg>`;

const SVG_SESATH = `<svg viewBox="0 0 300 700" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
<defs>
<linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#FFD700"/><stop offset="25%" stop-color="#D4A844"/>
<stop offset="50%" stop-color="#B8860B"/><stop offset="75%" stop-color="#D4A844"/>
<stop offset="100%" stop-color="#8B6914"/>
</linearGradient>
<linearGradient id="sg2" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stop-color="#8B6914"/><stop offset="100%" stop-color="#5C3A10"/>
</linearGradient>
<radialGradient id="sRuby" cx="50%" cy="50%"><stop offset="0%" stop-color="#FF1744"/><stop offset="100%" stop-color="#8B0000"/></radialGradient>
<filter id="sShadow"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.4"/></filter>
</defs>
<!-- Top finial -->
<g filter="url(#sShadow)">
<circle cx="150" cy="45" r="22" fill="url(#sg1)" stroke="url(#sg2)" stroke-width="3"/>
<path d="M 150 23 Q 140 34 150 45 Q 160 34 150 23" fill="url(#sg1)" stroke="url(#sg2)" stroke-width="2"/>
<circle cx="150" cy="67" r="12" fill="url(#sg1)" stroke="url(#sg2)" stroke-width="2.5"/>
<circle cx="150" cy="45" r="8" fill="url(#sRuby)"/>
</g>
<!-- Pole -->
<rect x="146" y="80" width="8" height="540" fill="url(#sg2)" filter="url(#sShadow)"/>
<!-- 7 Tiers -->
<g filter="url(#sShadow)">
${[0,1,2,3,4,5,6].map(i => {
  const y = 95 + i * 70;
  const w = 260 - i * 30;
  const x = 150 - w/2;
  const color = i % 2 === 0 ? 'url(#sRuby)' : 'url(#emerald)';
  return `
<ellipse cx="150" cy="${y}" rx="${w/2}" ry="16" fill="url(#sg1)" stroke="url(#sg2)" stroke-width="2.5"/>
<path d="M ${x} ${y} Q 150 ${y-22} ${x+w} ${y}" fill="url(#sg1)" stroke="url(#sg2)" stroke-width="2.5"/>
<ellipse cx="150" cy="${y-5}" rx="${w/2-14}" ry="8" fill="none" stroke="url(#sg2)" stroke-width="1.5" opacity="0.6"/>
<line x1="${x+18}" y1="${y}" x2="${x+18}" y2="${y+22}" stroke="url(#sg1)" stroke-width="1.5"/>
<circle cx="${x+18}" cy="${y+25}" r="4" fill="url(#sg1)"/>
<line x1="${x+w-18}" y1="${y}" x2="${x+w-18}" y2="${y+22}" stroke="url(#sg1)" stroke-width="1.5"/>
<circle cx="${x+w-18}" cy="${y+25}" r="4" fill="url(#sg1)"/>
<circle cx="${x+38}" cy="${y+4}" r="5" fill="${color}" opacity="0.8"/>
<circle cx="${x+w-38}" cy="${y+4}" r="5" fill="${color}" opacity="0.8"/>`;
}).join('')}
</g>
<!-- Base -->
<g filter="url(#sShadow)">
<ellipse cx="150" cy="645" rx="55" ry="16" fill="url(#sg2)"/>
<path d="M 95 645 Q 150 628 205 645" fill="url(#sg1)" stroke="url(#sg2)" stroke-width="2.5"/>
<rect x="120" y="625" width="60" height="20" rx="4" fill="url(#sg1)"/>
</g>
</svg>`;

const SVG_PUNKALASA = `<svg viewBox="0 0 240 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
<defs>
<linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#FFD700"/><stop offset="25%" stop-color="#D4A844"/>
<stop offset="50%" stop-color="#B8860B"/><stop offset="75%" stop-color="#D4A844"/>
<stop offset="100%" stop-color="#8B6914"/>
</linearGradient>
<linearGradient id="pg2" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stop-color="#8B6914"/><stop offset="100%" stop-color="#5C3A10"/>
</linearGradient>
<radialGradient id="pRuby" cx="50%" cy="50%"><stop offset="0%" stop-color="#FF1744"/><stop offset="100%" stop-color="#8B0000"/></radialGradient>
<filter id="pShadow"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity="0.35"/></filter>
</defs>
<!-- Base -->
<g filter="url(#pShadow)">
<ellipse cx="120" cy="360" rx="70" ry="15" fill="url(#pg2)"/>
<rect x="65" y="335" width="110" height="25" rx="6" fill="url(#pg1)" stroke="url(#pg2)" stroke-width="2"/>
</g>
<!-- Pot -->
<g filter="url(#pShadow)">
<path d="M 70 335 Q 55 300 58 265 Q 62 230 75 200 Q 90 170 110 150 Q 120 142 130 150 Q 150 170 165 200 Q 178 230 182 265 Q 185 300 170 335 Z" fill="url(#pg1)" stroke="url(#pg2)" stroke-width="3"/>
<rect x="90" y="135" width="60" height="18" rx="4" fill="url(#pg1)" stroke="url(#pg2)" stroke-width="2.5"/>
<ellipse cx="120" cy="135" rx="40" ry="10" fill="url(#pg1)" stroke="url(#pg2)" stroke-width="2.5"/>
<ellipse cx="120" cy="135" rx="35" ry="7" fill="url(#pg2)" opacity="0.5"/>
<path d="M 80 180 Q 120 175 160 180" stroke="url(#pg2)" stroke-width="2" fill="none"/>
<path d="M 70 220 Q 120 213 170 220" stroke="url(#pg2)" stroke-width="2" fill="none"/>
<path d="M 62 260 Q 120 252 178 260" stroke="url(#pg2)" stroke-width="2" fill="none"/>
<path d="M 58 300 Q 120 292 182 300" stroke="url(#pg2)" stroke-width="2" fill="none"/>
<circle cx="120" cy="210" r="7" fill="url(#pg1)" stroke="url(#pg2)" stroke-width="1.5"/>
</g>
<!-- Coconut -->
<g filter="url(#pShadow)">
<circle cx="120" cy="125" r="18" fill="url(#pg2)"/>
<path d="M 120 107 Q 112 115 120 125 Q 128 115 120 107" fill="url(#pg1)"/>
</g>
<!-- Mango leaves -->
<g opacity="0.9" filter="url(#pShadow)">
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
<g opacity="0.85" filter="url(#pShadow)">
<circle cx="120" cy="80" r="8" fill="url(#pRuby)"/>
<circle cx="90" cy="85" r="6" fill="url(#pRuby)"/>
<circle cx="150" cy="85" r="6" fill="url(#pRuby)"/>
<circle cx="75" cy="95" r="5" fill="url(#pRuby)" opacity="0.7"/>
<circle cx="165" cy="95" r="5" fill="url(#pRuby)" opacity="0.7"/>
</g>
</svg>`;

const SVG_LIYAWALA = `<svg viewBox="0 0 800 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
<defs>
<linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" stop-color="#D4A844"/><stop offset="50%" stop-color="#FFD700"/>
<stop offset="100%" stop-color="#D4A844"/>
</linearGradient>
<radialGradient id="lRuby" cx="50%" cy="50%"><stop offset="0%" stop-color="#FF1744"/><stop offset="100%" stop-color="#8B0000"/></radialGradient>
<filter id="lShadow"><feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000" flood-opacity="0.3"/></filter>
</defs>
<g filter="url(#lShadow)">
<path d="M 0 40 Q 40 25 80 40 Q 120 55 160 40 Q 200 25 240 40 Q 280 55 320 40 Q 360 25 400 40 Q 440 55 480 40 Q 520 25 560 40 Q 600 55 640 40 Q 680 25 720 40 Q 760 55 800 40" fill="none" stroke="url(#lg1)" stroke-width="4" stroke-linecap="round"/>
<path d="M 15 40 Q 8 32 12 24 Q 18 18 26 22 Q 32 28 28 36" fill="none" stroke="url(#lg1)" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="30" cy="36" r="5" fill="url(#lg1)"/>
<path d="M 100 30 Q 95 22 98 14 Q 104 8 110 12 Q 114 18 110 26" fill="url(#lg1)" stroke="url(#lg1)" stroke-width="1.5"/>
<path d="M 180 50 Q 175 58 178 66 Q 184 72 190 68 Q 194 62 190 54" fill="url(#lg1)" stroke="url(#lg1)" stroke-width="1.5"/>
<path d="M 260 35 Q 255 28 258 20 Q 264 15 270 20 Q 274 28 270 35" fill="url(#lg1)"/>
<circle cx="264" cy="38" r="3.5" fill="url(#lg1)"/>
<path d="M 340 45 Q 335 38 338 30 Q 344 24 350 28 Q 354 35 350 42" fill="url(#lg1)" stroke="url(#lg1)" stroke-width="1.5"/>
<path d="M 420 35 Q 415 28 418 20 Q 424 14 430 18 Q 434 26 430 33" fill="url(#lg1)" stroke="url(#lg1)" stroke-width="1.5"/>
<path d="M 500 50 Q 495 43 498 35 Q 504 30 510 35 Q 514 43 510 50" fill="url(#lg1)"/>
<circle cx="504" cy="53" r="3.5" fill="url(#lg1)"/>
<path d="M 580 30 Q 575 22 578 14 Q 584 8 590 12 Q 594 18 590 26" fill="url(#lg1)" stroke="url(#lg1)" stroke-width="1.5"/>
<path d="M 660 50 Q 655 58 658 66 Q 664 72 670 68 Q 674 62 670 54" fill="url(#lg1)" stroke="url(#lg1)" stroke-width="1.5"/>
<path d="M 740 35 Q 735 28 738 20 Q 744 15 750 20 Q 754 28 750 35" fill="url(#lg1)"/>
<circle cx="744" cy="38" r="3.5" fill="url(#lg1)"/>
<path d="M 785 40 Q 792 32 788 24 Q 782 18 774 22 Q 768 28 772 36" fill="none" stroke="url(#lg1)" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="770" cy="36" r="5" fill="url(#lg1)"/>
<g transform="translate(400,40)">
<path d="M 0 -12 Q -8 -5 0 0 Q 8 -5 0 -12" fill="url(#lRuby)"/>
<path d="M -12 0 Q -5 -8 0 0 Q -5 8 -12 0" fill="url(#lg1)"/>
<path d="M 12 0 Q 5 -8 0 0 Q 5 8 12 0" fill="url(#lg1)"/>
<path d="M 0 12 Q -8 5 0 0 Q 8 5 0 12" fill="url(#lRuby)"/>
<circle cx="0" cy="0" r="5" fill="#FFD700"/>
</g>
<circle cx="200" cy="40" r="4" fill="url(#lRuby)" opacity="0.6"/>
<circle cx="600" cy="40" r="4" fill="url(#lRuby)" opacity="0.6"/>
</g>
</svg>`;

const SVG_LAMP = `<svg viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
<defs>
<linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#FFD700"/><stop offset="25%" stop-color="#D4A844"/>
<stop offset="50%" stop-color="#B8860B"/><stop offset="75%" stop-color="#D4A844"/>
<stop offset="100%" stop-color="#8B6914"/>
</linearGradient>
<radialGradient id="flame1" cx="50%" cy="70%"><stop offset="0%" stop-color="#FFF7DA"/><stop offset="40%" stop-color="#FFD700"/><stop offset="70%" stop-color="#FF8C00"/><stop offset="100%" stop-color="#FF4500"/></radialGradient>
<filter id="flameGlow"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="lShadow2"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.35"/></filter>
</defs>
<g class="flame" filter="url(#flameGlow)">
<ellipse cx="50" cy="35" rx="14" ry="28" fill="url(#flame1)" opacity="0.95"/>
<ellipse cx="50" cy="38" rx="9" ry="20" fill="#FFF7DA" opacity="0.85"/>
<ellipse cx="50" cy="40" rx="5" ry="12" fill="#FFF" opacity="0.7"/>
</g>
<rect x="46" y="63" width="8" height="14" fill="url(#lg1)" filter="url(#lShadow2)"/>
<g filter="url(#lShadow2)">
<ellipse cx="50" cy="80" rx="32" ry="10" fill="url(#lg1)" stroke="#8B6914" stroke-width="2"/>
<path d="M 18 80 Q 50 72 82 80" fill="url(#lg1)"/>
<ellipse cx="50" cy="78" rx="28" ry="6" fill="#8B6914" opacity="0.4"/>
</g>
<rect x="46" y="92" width="8" height="45" fill="url(#lg1)" filter="url(#lShadow2)"/>
<ellipse cx="50" cy="105" rx="14" ry="4" fill="none" stroke="#8B6914" stroke-width="1.5"/>
<ellipse cx="50" cy="120" rx="16" ry="5" fill="none" stroke="#8B6914" stroke-width="1.5"/>
<g filter="url(#lShadow2)">
<ellipse cx="50" cy="137" rx="28" ry="9" fill="url(#lg1)" stroke="#8B6914" stroke-width="2"/>
<path d="M 22 137 Q 50 130 78 137" fill="url(#lg1)"/>
<path d="M 30 145 Q 50 152 70 145" fill="none" stroke="#8B6914" stroke-width="2"/>
<circle cx="50" cy="150" r="4" fill="url(#lg1)"/>
</g>
</svg>`;

// ═══════════════════════════════════════════════════════════════════
// ORNAMENT FUNCTIONS — Dual-Render (PNG → SVG fallback)
// ═══════════════════════════════════════════════════════════════════

export function makaraThorana(cls = 'makara-thorana') {
  const style = 'width:100%;max-width:700px;height:auto;display:block;filter:drop-shadow(0 10px 30px rgba(139,105,20,0.4))';
  return `<div class="${cls}"><img src="${IMG_PATHS.makaraThorana[0]}" alt="Makara Thorana" style="${style}" onerror="var i=this;var p=${JSON.stringify(IMG_PATHS.makaraThorana.slice(1))};var x=0;(function n(){if(x<p.length){i.src=p[x];x++;}else{i.parentElement.innerHTML='${SVG_MAKARA.replace(/'/g, "\\'")}';i.parentElement.firstChild.style.cssText='${style}';}})();"/></div>`;
}

export function sesath(cls = 'sesath') {
  const style = 'width:100%;max-width:280px;height:auto;display:block;filter:drop-shadow(0 15px 35px rgba(139,105,20,0.5))';
  return `<div class="${cls}"><img src="${IMG_PATHS.sesath[0]}" alt="Sesath" style="${style}" onerror="var i=this;var p=${JSON.stringify(IMG_PATHS.sesath.slice(1))};var x=0;(function n(){if(x<p.length){i.src=p[x];x++;}else{i.parentElement.innerHTML='${SVG_SESATH.replace(/'/g, "\\'")}';i.parentElement.firstChild.style.cssText='${style}';}})();"/></div>`;
}

export function punkalasa(cls = 'punkalasa') {
  const style = 'width:100%;max-width:180px;height:auto;display:block;filter:drop-shadow(0 12px 28px rgba(139,105,20,0.45))';
  return `<div class="${cls}"><img src="${IMG_PATHS.punkalasa[0]}" alt="Punkalasa" style="${style}" onerror="var i=this;var p=${JSON.stringify(IMG_PATHS.punkalasa.slice(1))};var x=0;(function n(){if(x<p.length){i.src=p[x];x++;}else{i.parentElement.innerHTML='${SVG_PUNKALASA.replace(/'/g, "\\'")}';i.parentElement.firstChild.style.cssText='${style}';}})();"/></div>`;
}

export function liyawala(cls = 'liyawala') {
  const style = 'width:100%;max-width:600px;height:auto;display:block;margin:2rem auto;filter:drop-shadow(0 8px 20px rgba(139,105,20,0.35))';
  return `<div class="${cls}"><img src="${IMG_PATHS.liyawala[0]}" alt="Liyawala" style="${style}" onerror="var i=this;var p=${JSON.stringify(IMG_PATHS.liyawala.slice(1))};var x=0;(function n(){if(x<p.length){i.src=p[x];x++;}else{i.parentElement.innerHTML='${SVG_LIYAWALA.replace(/'/g, "\\'")}';i.parentElement.firstChild.style.cssText='${style}';}})();"/></div>`;
}

export function mangalaLamp(cls = 'mangala-lamp') {
  const style = 'width:100%;max-width:140px;height:auto;display:block;filter:drop-shadow(0 0 25px rgba(255,215,0,0.6)) drop-shadow(0 12px 28px rgba(139,105,20,0.4))';
  return `<div class="${cls}"><img src="${IMG_PATHS.mangalaLamp[0]}" alt="Mangala Lamp" style="${style}" onerror="var i=this;var p=${JSON.stringify(IMG_PATHS.mangalaLamp.slice(1))};var x=0;(function n(){if(x<p.length){i.src=p[x];x++;}else{i.parentElement.innerHTML='${SVG_LAMP.replace(/'/g, "\\'")}';i.parentElement.firstChild.style.cssText='${style}';}})();"/></div>`;
}

export function sandakadaPahana(cls = 'sandakada-pahana') {
  const style = 'width:100%;max-width:400px;height:auto;display:block;margin:2rem auto;filter:drop-shadow(0 10px 30px rgba(62,34,21,0.4))';
  return `<div class="${cls}"><img src="${IMG_PATHS.sandakadaPahana[0]}" alt="Sandakada Pahana" style="${style}" onerror="var i=this;var p=${JSON.stringify(IMG_PATHS.sandakadaPahana.slice(1))};var x=0;(function n(){if(x<p.length){i.src=p[x];x++;}else{i.parentElement.innerHTML='<div style=\\'font-size:4rem;text-align:center;color:#D4A844\\'>🪨</div>';;}})();"/></div>`;
}

export function cornerOrnament(cls = 'corner-ornament') {
  const style = 'width:100%;max-width:80px;height:auto;display:block;filter:drop-shadow(0 6px 18px rgba(139,105,20,0.4))';
  return `<div class="${cls}"><img src="${IMG_PATHS.cornerOrnament[0]}" alt="" style="${style}" onerror="this.style.display='none'"/></div>`;
}

export function lotusFlower(cls = 'lotus-flower') {
  const style = 'width:100%;max-width:100px;height:auto;display:block;filter:drop-shadow(0 8px 20px rgba(139,105,20,0.4))';
  return `<div class="${cls}"><img src="${IMG_PATHS.lotusFlower[0]}" alt="Lotus" style="${style}" onerror="this.style.display='none'"/></div>`;
}

export function templeBorder(cls = 'temple-border') {
  const style = 'width:100%;max-width:600px;height:auto;display:block;margin:1rem auto;filter:drop-shadow(0 6px 18px rgba(139,105,20,0.35))';
  return `<div class="${cls}"><img src="${IMG_PATHS.templeBorder[0]}" alt="" style="${style}" onerror="this.style.display='none'"/></div>`;
}

export function templePattern(cls = 'temple-pattern') {
  return `<div class="${cls}" style="width:100%;height:100%;background:radial-gradient(ellipse at center,rgba(212,168,68,0.1) 0%,transparent 70%),repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(139,105,20,0.05) 35px,rgba(139,105,20,0.05) 70px);pointer-events:none;"></div>`;
}

export function vesCrown(cls = 'ves-crown') {
  return punkalasa(cls);
}
