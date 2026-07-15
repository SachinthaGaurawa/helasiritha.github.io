/**
 * හෙළ සිරිත · Authentic Kandyan Royal Ornaments
 * Using YOUR Cloudinary images with proper CSS transformations
 */

const CDN = "https://res.cloudinary.com/dzrfpc9be/image/upload";

// ─── GATEWAY ARCH (Sandakada Pahana rotated 180°) ───
export function gatewayArch(className = '') {
  return `<div class="${className}">
    <img src="${CDN}/v1784079458/Photoroom_20260715_020528_kfm0vq.png" 
      alt="Gateway Arch"
      style="width:100%;max-width:700px;height:auto;display:block;
      transform:rotate(180deg);
      filter:invert(1) brightness(1.3) sepia(0.4) hue-rotate(340deg) saturate(2);
      mix-blend-mode:screen;
      opacity:0.3;"/>
  </div>`;
}

// ─── SECTION DIVIDER (Makara Thorana) ───
export function sectionDivider(className = '') {
  return `<div class="${className}">
    <img src="${CDN}/v1784079459/IMG_9974_fk1bfu.png" 
      alt="Makara Thorana Divider"
      style="width:100%;max-width:900px;height:auto;display:block;margin:2rem auto;
      filter:invert(1) brightness(1.2) sepia(0.3) hue-rotate(340deg) saturate(1.8);
      mix-blend-mode:multiply;
      opacity:0.85;"/>
  </div>`;
}

// ─── FLORAL BORDER (cloud1.jpg) ───
export function floralBorder(className = '') {
  return `<div class="${className}">
    <img src="${CDN}/v1784079451/IMG_9964_crpqqm.jpg" 
      alt="Kandyan Floral Border"
      style="width:100%;max-width:100%;height:auto;display:block;margin:1.5rem auto;
      filter:contrast(1.15) saturate(1.3);
      opacity:0.9;"/>
  </div>`;
}

// ─── PINEAPPLE BORDER (cloud2.png) ───
export function pineappleBorder(className = '') {
  return `<div class="${className}">
    <img src="${CDN}/v1784079452/IMG_9965_swzusp.png" 
      alt="Kandyan Pineapple Border"
      style="width:100%;max-width:1400px;height:auto;display:block;margin:2rem auto;
      filter:contrast(1.2) saturate(1.4);
      opacity:0.95;"/>
  </div>`;
}

// ─── SESATH (SVG - Royal Umbrella) ───
export function sesath(className = '') {
  const tiers = Array.from({length: 7}, (_, i) => {
    const y = 60 + i * 45;
    const w = 180 - i * 20;
    const x = 100 - w/2;
    return `
      <ellipse cx="100" cy="${y}" rx="${w/2}" ry="12" fill="url(#gold2)" stroke="#8B6914" stroke-width="2"/>
      <line x1="${x+15}" y1="${y}" x2="${x+15}" y2="${y+18}" stroke="url(#gold2)" stroke-width="1.5"/>
      <circle cx="${x+15}" cy="${y+20}" r="3" fill="url(#gold2)"/>
      <line x1="${x+w-15}" y1="${y}" x2="${x+w-15}" y2="${y+18}" stroke="url(#gold2)" stroke-width="1.5"/>
      <circle cx="${x+w-15}" cy="${y+20}" r="3" fill="url(#gold2)"/>`;
  }).join('');
  
  return `
  <svg class="${className}" viewBox="0 0 200 450" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
    <defs>
      <linearGradient id="gold2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF6DC"/>
        <stop offset="50%" stop-color="#D4A844"/>
        <stop offset="100%" stop-color="#8B6914"/>
      </linearGradient>
    </defs>
    <circle cx="100" cy="30" r="15" fill="url(#gold2)"/>
    <path d="M 100 15 Q 95 22 100 30 Q 105 22 100 15" fill="url(#gold2)"/>
    <circle cx="100" cy="45" r="8" fill="url(#gold2)"/>
    <rect x="97" y="55" width="6" height="350" fill="#8B6914"/>
    ${tiers}
    <ellipse cx="100" cy="420" rx="40" ry="12" fill="#8B6914"/>
    <rect x="80" y="405" width="40" height="15" rx="3" fill="url(#gold2)"/>
  </svg>`;
}

// ─── PUNKALASA (SVG - Prosperity Pot) ───
export function punkalasa(className = '') {
  return `
  <svg class="${className}" viewBox="0 0 180 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
    <defs>
      <linearGradient id="gold3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF6DC"/>
        <stop offset="50%" stop-color="#D4A844"/>
        <stop offset="100%" stop-color="#8B6914"/>
      </linearGradient>
    </defs>
    <ellipse cx="90" cy="260" rx="50" ry="12" fill="#8B6914"/>
    <rect x="50" y="245" width="80" height="15" rx="4" fill="url(#gold3)"/>
    <path d="M 55 245 Q 45 220 48 195 Q 52 170 62 150 Q 72 130 82 115 Q 88 110 92 115 Q 102 130 112 150 Q 122 170 126 195 Q 129 220 119 245 Z" fill="url(#gold3)"/>
    <rect x="70" y="105" width="40" height="12" rx="3" fill="url(#gold3)"/>
    <ellipse cx="90" cy="105" rx="25" ry="7" fill="url(#gold3)"/>
    <circle cx="90" cy="95" r="14" fill="#8B6914"/>
    <path d="M 90 81 Q 85 88 90 95 Q 95 88 90 81" fill="url(#gold3)"/>
    <path d="M 90 81 Q 90 65 90 50" stroke="#2D5A27" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="90" cy="45" rx="10" ry="18" fill="#2D5A27"/>
    <path d="M 82 85 Q 72 72 65 60" stroke="#2D5A27" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="62" cy="57" rx="9" ry="16" fill="#2D5A27" transform="rotate(-25 62 57)"/>
    <path d="M 98 85 Q 108 72 115 60" stroke="#2D5A27" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="118" cy="57" rx="9" ry="16" fill="#2D5A27" transform="rotate(25 118 57)"/>
    <circle cx="90" cy="65" r="6" fill="#FF1744"/>
    <circle cx="72" cy="70" r="5" fill="#FF1744"/>
    <circle cx="108" cy="70" r="5" fill="#FF1744"/>
  </svg>`;
}

// ─── MANGALA LAMP (SVG) ───
export function mangalaLamp(className = '') {
  return `
  <svg class="${className}" viewBox="0 0 80 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
    <defs>
      <linearGradient id="gold5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF6DC"/>
        <stop offset="50%" stop-color="#D4A844"/>
        <stop offset="100%" stop-color="#8B6914"/>
      </linearGradient>
      <radialGradient id="flame">
        <stop offset="0%" stop-color="#FFF7DA"/>
        <stop offset="40%" stop-color="#FFD700"/>
        <stop offset="100%" stop-color="#FF4500"/>
      </radialGradient>
      <filter id="flameGlow">
        <feGaussianBlur stdDeviation="2"/>
        <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <g class="flame" filter="url(#flameGlow)">
      <ellipse cx="40" cy="28" rx="11" ry="22" fill="url(#flame)" opacity="0.95"/>
      <ellipse cx="40" cy="30" rx="7" ry="16" fill="#FFF7DA" opacity="0.85"/>
    </g>
    <rect x="37" y="50" width="6" height="10" fill="url(#gold5)"/>
    <ellipse cx="40" cy="62" rx="24" ry="8" fill="url(#gold5)"/>
    <path d="M 16 62 Q 40 56 64 62" fill="url(#gold5)"/>
    <rect x="37" y="72" width="6" height="35" fill="url(#gold5)"/>
    <ellipse cx="40" cy="107" rx="20" ry="7" fill="url(#gold5)"/>
    <path d="M 20 107 Q 40 102 60 107" fill="url(#gold5)"/>
  </svg>`;
}
