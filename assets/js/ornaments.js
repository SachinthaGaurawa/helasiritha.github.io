/**
 * හෙළ සිරිත · Kandyan Royal Ornaments
 * Genuine SVG - Naturally Transparent, Infinitely Scalable
 */

// ─── MAKARA THORANA ───
export function makaraThorana(className = '') {
  return `
  <svg class="${className}" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
    <defs>
      <linearGradient id="gold1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF6DC"/>
        <stop offset="50%" stop-color="#D4A844"/>
        <stop offset="100%" stop-color="#8B6914"/>
      </linearGradient>
      <filter id="glow1">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Left Makara Dragon -->
    <g filter="url(#glow1)">
      <!-- Body -->
      <path d="M 150 350 Q 140 280 160 220 Q 180 160 220 120 Q 260 80 300 60 Q 340 50 360 45" 
            fill="none" stroke="url(#gold1)" stroke-width="35" stroke-linecap="round"/>
      <!-- Head -->
      <path d="M 360 45 Q 380 35 400 50 Q 415 65 420 80 Q 422 95 410 105 Q 395 110 380 105 Q 370 95 368 80 Z" 
            fill="url(#gold1)"/>
      <!-- Horns -->
      <path d="M 385 50 Q 390 30 385 20 Q 380 18 382 28" fill="url(#gold1)"/>
      <path d="M 395 55 Q 405 35 400 25 Q 395 22 397 32" fill="url(#gold1)"/>
      <!-- Eye -->
      <ellipse cx="400" cy="75" rx="8" ry="10" fill="#2C1810"/>
      <ellipse cx="402" cy="73" rx="4" ry="6" fill="#FFD700"/>
      <!-- Open mouth -->
      <path d="M 415 85 Q 425 82 430 78 Q 435 74 432 70" fill="none" stroke="url(#gold1)" stroke-width="6" stroke-linecap="round"/>
      <!-- Curled trunk -->
      <path d="M 360 45 Q 350 25 355 10 Q 365 5 375 8 Q 382 18 378 28" 
            fill="none" stroke="url(#gold1)" stroke-width="12" stroke-linecap="round"/>
      <!-- Leg -->
      <path d="M 200 260 Q 185 240 180 220 Q 178 205 188 190" 
            fill="none" stroke="url(#gold1)" stroke-width="10" stroke-linecap="round"/>
      <!-- Scales -->
      <g opacity="0.6">
        <path d="M 180 320 q 5 -5 10 0"/>
        <path d="M 190 290 q 5 -5 10 0"/>
        <path d="M 210 250 q 5 -5 10 0"/>
        <path d="M 240 200 q 5 -5 10 0"/>
        <path d="M 280 150 q 5 -5 10 0"/>
      </g>
    </g>
    
    <!-- Right Makara Dragon (mirrored) -->
    <g filter="url(#glow1)" transform="translate(800,0) scale(-1,1)">
      <path d="M 150 350 Q 140 280 160 220 Q 180 160 220 120 Q 260 80 300 60 Q 340 50 360 45" 
            fill="none" stroke="url(#gold1)" stroke-width="35" stroke-linecap="round"/>
      <path d="M 360 45 Q 380 35 400 50 Q 415 65 420 80 Q 422 95 410 105 Q 395 110 380 105 Q 370 95 368 80 Z" 
            fill="url(#gold1)"/>
      <path d="M 385 50 Q 390 30 385 20 Q 380 18 382 28" fill="url(#gold1)"/>
      <path d="M 395 55 Q 405 35 400 25 Q 395 22 397 32" fill="url(#gold1)"/>
      <ellipse cx="400" cy="75" rx="8" ry="10" fill="#2C1810"/>
      <ellipse cx="402" cy="73" rx="4" ry="6" fill="#FFD700"/>
      <path d="M 415 85 Q 425 82 430 78 Q 435 74 432 70" fill="none" stroke="url(#gold1)" stroke-width="6" stroke-linecap="round"/>
      <path d="M 360 45 Q 350 25 355 10 Q 365 5 375 8 Q 382 18 378 28" 
            fill="none" stroke="url(#gold1)" stroke-width="12" stroke-linecap="round"/>
      <path d="M 200 260 Q 185 240 180 220 Q 178 205 188 190" 
            fill="none" stroke="url(#gold1)" stroke-width="10" stroke-linecap="round"/>
      <g opacity="0.6">
        <path d="M 180 320 q 5 -5 10 0"/>
        <path d="M 190 290 q 5 -5 10 0"/>
        <path d="M 210 250 q 5 -5 10 0"/>
        <path d="M 240 200 q 5 -5 10 0"/>
        <path d="M 280 150 q 5 -5 10 0"/>
      </g>
    </g>
    
    <!-- Arch connecting dragons -->
    <g filter="url(#glow1)">
      <path d="M 360 45 Q 420 10 480 5 Q 540 3 600 5 Q 660 10 720 45" 
            fill="none" stroke="url(#gold1)" stroke-width="28" stroke-linecap="round"/>
      <!-- Central lotus -->
      <circle cx="540" cy="8" r="20" fill="url(#gold1)"/>
      <path d="M 540 -8 Q 530 0 540 8 Q 550 0 540 -8" fill="#FF1744"/>
      <path d="M 528 8 Q 535 0 540 8 Q 535 16 528 8" fill="#00E676"/>
      <path d="M 552 8 Q 545 0 540 8 Q 545 16 552 8" fill="#00E676"/>
      <path d="M 540 24 Q 530 16 540 8 Q 550 16 540 24" fill="#FF1744"/>
    </g>
    
    <!-- Base pillars -->
    <rect x="140" y="260" width="35" height="120" rx="5" fill="url(#gold1)"/>
    <rect x="625" y="260" width="35" height="120" rx="5" fill="url(#gold1)"/>
  </svg>`;
}

// ─── SESATH (Royal Umbrella) ───
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
    
    <!-- Top finial -->
    <circle cx="100" cy="30" r="15" fill="url(#gold2)"/>
    <path d="M 100 15 Q 95 22 100 30 Q 105 22 100 15" fill="url(#gold2)"/>
    <circle cx="100" cy="45" r="8" fill="url(#gold2)"/>
    
    <!-- Pole -->
    <rect x="97" y="55" width="6" height="350" fill="#8B6914"/>
    
    <!-- Tiers -->
    ${tiers}
    
    <!-- Base -->
    <ellipse cx="100" cy="420" rx="40" ry="12" fill="#8B6914"/>
    <rect x="80" y="405" width="40" height="15" rx="3" fill="url(#gold2)"/>
  </svg>`;
}

// ─── PUNKALASA (Prosperity Pot) ───
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
    
    <!-- Base -->
    <ellipse cx="90" cy="260" rx="50" ry="12" fill="#8B6914"/>
    <rect x="50" y="245" width="80" height="15" rx="4" fill="url(#gold3)"/>
    
    <!-- Pot -->
    <path d="M 55 245 Q 45 220 48 195 Q 52 170 62 150 Q 72 130 82 115 Q 88 110 92 115 Q 102 130 112 150 Q 122 170 126 195 Q 129 220 119 245 Z" 
          fill="url(#gold3)"/>
    <rect x="70" y="105" width="40" height="12" rx="3" fill="url(#gold3)"/>
    <ellipse cx="90" cy="105" rx="25" ry="7" fill="url(#gold3)"/>
    
    <!-- Coconut -->
    <circle cx="90" cy="95" r="14" fill="#8B6914"/>
    <path d="M 90 81 Q 85 88 90 95 Q 95 88 90 81" fill="url(#gold3)"/>
    
    <!-- Mango leaves -->
    <path d="M 90 81 Q 90 65 90 50" stroke="#2D5A27" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="90" cy="45" rx="10" ry="18" fill="#2D5A27"/>
    <path d="M 82 85 Q 72 72 65 60" stroke="#2D5A27" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="62" cy="57" rx="9" ry="16" fill="#2D5A27" transform="rotate(-25 62 57)"/>
    <path d="M 98 85 Q 108 72 115 60" stroke="#2D5A27" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="118" cy="57" rx="9" ry="16" fill="#2D5A27" transform="rotate(25 118 57)"/>
    
    <!-- Flowers -->
    <circle cx="90" cy="65" r="6" fill="#FF1744"/>
    <circle cx="72" cy="70" r="5" fill="#FF1744"/>
    <circle cx="108" cy="70" r="5" fill="#FF1744"/>
  </svg>`;
}

// ─── LIYAWALA (Vine Pattern) ───
export function liyawala(className = '') {
  return `
  <svg class="${className}" viewBox="0 0 600 60" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:1rem auto;">
    <defs>
      <linearGradient id="gold4" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4A844"/>
        <stop offset="50%" stop-color="#FFF6DC"/>
        <stop offset="100%" stop-color="#D4A844"/>
      </linearGradient>
    </defs>
    
    <path d="M 0 30 Q 30 18 60 30 Q 90 42 120 30 Q 150 18 180 30 Q 210 42 240 30 Q 270 18 300 30 Q 330 42 360 30 Q 390 18 420 30 Q 450 42 480 30 Q 510 18 540 30 Q 570 42 600 30" 
          fill="none" stroke="url(#gold4)" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Lotus buds -->
    <path d="M 200 25 Q 197 20 199 16 Q 202 13 205 16 Q 207 20 205 25" fill="url(#gold4)"/>
    <circle cx="202" cy="27" r="2.5" fill="url(#gold4)"/>
    
    <path d="M 400 35 Q 397 30 399 26 Q 402 23 405 26 Q 407 30 405 35" fill="url(#gold4)"/>
    <circle cx="402" cy="37" r="2.5" fill="url(#gold4)"/>
    
    <!-- Center ornament -->
    <g transform="translate(300,30)">
      <path d="M 0 -10 Q -6 -4 0 0 Q 6 -4 0 -10" fill="#FF1744"/>
      <path d="M -10 0 Q -4 -6 0 0 Q -4 6 -10 0" fill="url(#gold4)"/>
      <path d="M 10 0 Q 4 -6 0 0 Q 4 6 10 0" fill="url(#gold4)"/>
      <path d="M 0 10 Q -6 4 0 0 Q 6 4 0 10" fill="#FF1744"/>
      <circle cx="0" cy="0" r="4" fill="#FFD700"/>
    </g>
  </svg>`;
}

// ─── MANGALA LAMP ───
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
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Flame -->
    <g class="flame" filter="url(#flameGlow)">
      <ellipse cx="40" cy="28" rx="11" ry="22" fill="url(#flame)" opacity="0.95"/>
      <ellipse cx="40" cy="30" rx="7" ry="16" fill="#FFF7DA" opacity="0.85"/>
    </g>
    
    <!-- Wick -->
    <rect x="37" y="50" width="6" height="10" fill="url(#gold5)"/>
    
    <!-- Bowl -->
    <ellipse cx="40" cy="62" rx="24" ry="8" fill="url(#gold5)"/>
    <path d="M 16 62 Q 40 56 64 62" fill="url(#gold5)"/>
    
    <!-- Stem -->
    <rect x="37" y="72" width="6" height="35" fill="url(#gold5)"/>
    
    <!-- Base -->
    <ellipse cx="40" cy="107" rx="20" ry="7" fill="url(#gold5)"/>
    <path d="M 20 107 Q 40 102 60 107" fill="url(#gold5)"/>
  </svg>`;
}
