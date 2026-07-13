/**
 * ═══════════════════════════════════════════════════════════════════
 * හෙළ සිරිත · Kandyan Royal Ornaments — Authentic SVG Generators
 * ═══════════════════════════════════════════════════════════════════
 * Realistic Kandyan royal art: Makara Thorana, Sesath, Sandakada
 * Pahana, Punkalasa, Liyawala, Ves Crown, Temple patterns.
 * ═══════════════════════════════════════════════════════════════════
 */

/**
 * මකර තොරණ — Makara Thorana
 * The iconic dragon arch from Kandyan temples & royal ceremonies.
 * Two makara (mythical sea-dragons) facing each other with an
 * ornate arch between them, featuring traditional scrollwork.
 */
export function makaraThorana(classNames = 'orn-makara') {
  return `<svg class="${classNames}" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#F4D03F;stop-opacity:1"/>
        <stop offset="25%" style="stop-color:#D4A844;stop-opacity:1"/>
        <stop offset="50%" style="stop-color:#C4953A;stop-opacity:1"/>
        <stop offset="75%" style="stop-color:#B8860B;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#D4A844;stop-opacity:1"/>
      </linearGradient>
      <linearGradient id="darkGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#8B6914;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#6B4E0A;stop-opacity:1"/>
      </linearGradient>
      <filter id="emboss">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
        <feOffset dx="1" dy="2" result="offsetblur"/>
        <feFlood flood-color="#000" flood-opacity="0.3"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Base platform -->
    <g filter="url(#emboss)">
      <rect x="50" y="460" width="500" height="30" rx="4" fill="url(#darkGold)" opacity="0.8"/>
      <rect x="60" y="465" width="480" height="20" rx="3" fill="url(#goldGrad)" opacity="0.9"/>
      <!-- Lotus base decorations -->
      <path d="M 100 470 Q 110 465 120 470" stroke="#8B6914" stroke-width="1.5" fill="none"/>
      <path d="M 480 470 Q 490 465 500 470" stroke="#8B6914" stroke-width="1.5" fill="none"/>
    </g>

    <!-- LEFT MAKARA -->
    <g transform="translate(80, 380) scale(-1, 1)">
      <!-- Makara body - main curve -->
      <path d="M 0 0 Q -20 -40 -15 -80 Q -10 -120 0 -160 Q 10 -200 30 -240 Q 50 -280 80 -310 Q 110 -340 150 -360 Q 190 -380 230 -390" 
            fill="none" stroke="url(#goldGrad)" stroke-width="18" stroke-linecap="round"/>
      <!-- Makara head -->
      <path d="M 230 -390 Q 240 -395 250 -392 Q 260 -388 265 -380 Q 270 -370 268 -360 Q 265 -350 258 -345 Q 250 -340 242 -342 Q 235 -345 232 -352 Q 230 -360 230 -370 Z" 
            fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="2"/>
      <!-- Makara eye -->
      <circle cx="250" cy="-365" r="6" fill="#8B6914"/>
      <circle cx="252" cy="-367" r="2" fill="#F4D03F"/>
      <!-- Makara teeth/fangs -->
      <path d="M 258 -345 L 262 -335 L 256 -340" fill="url(#goldGrad)"/>
      <path d="M 265 -350 L 270 -342 L 263 -345" fill="url(#goldGrad)"/>
      <!-- Makara trunk/curl -->
      <path d="M 230 -390 Q 220 -400 225 -410 Q 232 -418 242 -415 Q 250 -410 248 -400" 
            fill="none" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round"/>
      <!-- Makara scales/patterns on body -->
      <path d="M 50 -200 Q 55 -195 60 -200" stroke="#8B6914" stroke-width="1.5" fill="none"/>
      <path d="M 100 -280 Q 105 -275 110 -280" stroke="#8B6914" stroke-width="1.5" fill="none"/>
      <path d="M 150 -340 Q 155 -335 160 -340" stroke="#8B6914" stroke-width="1.5" fill="none"/>
      <!-- Makara leg/claw -->
      <path d="M 20 -100 Q 10 -110 5 -120 Q 0 -130 5 -140" 
            fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round"/>
      <!-- Decorative scrolls from makara -->
      <path d="M 80 -310 Q 70 -320 75 -330 Q 82 -338 92 -335" 
            fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round"/>
    </g>

    <!-- RIGHT MAKARA (mirrored) -->
    <g transform="translate(520, 380)">
      <!-- Makara body - main curve -->
      <path d="M 0 0 Q -20 -40 -15 -80 Q -10 -120 0 -160 Q 10 -200 30 -240 Q 50 -280 80 -310 Q 110 -340 150 -360 Q 190 -380 230 -390" 
            fill="none" stroke="url(#goldGrad)" stroke-width="18" stroke-linecap="round"/>
      <!-- Makara head -->
      <path d="M 230 -390 Q 240 -395 250 -392 Q 260 -388 265 -380 Q 270 -370 268 -360 Q 265 -350 258 -345 Q 250 -340 242 -342 Q 235 -345 232 -352 Q 230 -360 230 -370 Z" 
            fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="2"/>
      <!-- Makara eye -->
      <circle cx="250" cy="-365" r="6" fill="#8B6914"/>
      <circle cx="252" cy="-367" r="2" fill="#F4D03F"/>
      <!-- Makara teeth/fangs -->
      <path d="M 258 -345 L 262 -335 L 256 -340" fill="url(#goldGrad)"/>
      <path d="M 265 -350 L 270 -342 L 263 -345" fill="url(#goldGrad)"/>
      <!-- Makara trunk/curl -->
      <path d="M 230 -390 Q 220 -400 225 -410 Q 232 -418 242 -415 Q 250 -410 248 -400" 
            fill="none" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round"/>
      <!-- Makara scales/patterns on body -->
      <path d="M 50 -200 Q 55 -195 60 -200" stroke="#8B6914" stroke-width="1.5" fill="none"/>
      <path d="M 100 -280 Q 105 -275 110 -280" stroke="#8B6914" stroke-width="1.5" fill="none"/>
      <path d="M 150 -340 Q 155 -335 160 -340" stroke="#8B6914" stroke-width="1.5" fill="none"/>
      <!-- Makara leg/claw -->
      <path d="M 20 -100 Q 10 -110 5 -120 Q 0 -130 5 -140" 
            fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round"/>
      <!-- Decorative scrolls from makara -->
      <path d="M 80 -310 Q 70 -320 75 -330 Q 82 -338 92 -335" 
            fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round"/>
    </g>

    <!-- ARCH between makaras -->
    <g filter="url(#emboss)">
      <!-- Main arch -->
      <path d="M 230 -390 Q 300 -420 370 -390" 
            fill="none" stroke="url(#goldGrad)" stroke-width="16" stroke-linecap="round"/>
      <!-- Inner arch decoration -->
      <path d="M 240 -385 Q 300 -410 360 -385" 
            fill="none" stroke="url(#darkGold)" stroke-width="6" stroke-linecap="round"/>
      <!-- Arch ornaments - lotus buds -->
      <circle cx="300" cy="-415" r="8" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1.5"/>
      <path d="M 295 -415 Q 300 -425 305 -415" fill="url(#goldGrad)"/>
      
      <!-- Side arch decorations -->
      <circle cx="265" cy="-400" r="5" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1"/>
      <circle cx="335" cy="-400" r="5" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1"/>
    </g>

    <!-- Vertical pillars behind makaras -->
    <g opacity="0.7">
      <rect x="70" y="100" width="20" height="360" rx="3" fill="url(#goldGrad)"/>
      <rect x="510" y="100" width="20" height="360" rx="3" fill="url(#goldGrad)"/>
      <!-- Pillar decorations -->
      <rect x="75" y="150" width="10" height="40" rx="2" fill="url(#darkGold)"/>
      <rect x="515" y="150" width="10" height="40" rx="2" fill="url(#darkGold)"/>
      <rect x="75" y="250" width="10" height="40" rx="2" fill="url(#darkGold)"/>
      <rect x="515" y="250" width="10" height="40" rx="2" fill="url(#darkGold)"/>
      <rect x="75" y="350" width="10" height="40" rx="2" fill="url(#darkGold)"/>
      <rect x="515" y="350" width="10" height="40" rx="2" fill="url(#darkGold)"/>
    </g>

    <!-- Decorative hanging elements -->
    <g opacity="0.6">
      <line x1="200" y1="100" x2="200" y2="140" stroke="url(#goldGrad)" stroke-width="2"/>
      <circle cx="200" cy="145" r="4" fill="url(#goldGrad)"/>
      <line x1="400" y1="100" x2="400" y2="140" stroke="url(#goldGrad)" stroke-width="2"/>
      <circle cx="400" cy="145" r="4" fill="url(#goldGrad)"/>
    </g>
  </svg>`;
}

/**
 * සේසත් — Multi-tiered Royal Umbrella (7 tiers)
 * The sacred ceremonial umbrella used in Kandyan royal processions.
 * Each tier represents royal status and divine protection.
 */
export function sesath(classNames = 'orn-sesath', tiers = 7) {
  let tiersHTML = '';
  const tierWidth = 140;
  const tierHeight = 25;
  const startY = 80;
  
  for (let i = 0; i < tiers; i++) {
    const y = startY + (i * tierHeight);
    const width = tierWidth - (i * 12);
    const x = 70 - (width / 2);
    
    // Tier umbrella shape
    tiersHTML += `
      <ellipse cx="70" cy="${y}" rx="${width/2}" ry="8" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1.5"/>
      <path d="M ${x} ${y} Q 70 ${y-12} ${x + width} ${y}" 
            fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1.5"/>
      <!-- Hanging decorations -->
      <line x1="${x + 10}" y1="${y}" x2="${x + 10}" y2="${y + 12}" stroke="url(#goldGrad)" stroke-width="1"/>
      <circle cx="${x + 10}" cy="${y + 14}" r="2" fill="url(#goldGrad)"/>
      <line x1="${x + width - 10}" y1="${y}" x2="${x + width - 10}" y2="${y + 12}" stroke="url(#goldGrad)" stroke-width="1"/>
      <circle cx="${x + width - 10}" cy="${y + 14}" r="2" fill="url(#goldGrad)"/>
    `;
  }
  
  return `<svg class="${classNames}" viewBox="0 0 140 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#F4D03F;stop-opacity:1"/>
        <stop offset="25%" style="stop-color:#D4A844;stop-opacity:1"/>
        <stop offset="50%" style="stop-color:#C4953A;stop-opacity:1"/>
        <stop offset="75%" style="stop-color:#B8860B;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#D4A844;stop-opacity:1"/>
      </linearGradient>
      <linearGradient id="darkGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#8B6914;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#6B4E0A;stop-opacity:1"/>
      </linearGradient>
    </defs>
    
    <!-- Top finial (kotha) -->
    <g>
      <circle cx="70" cy="40" r="12" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="2"/>
      <path d="M 70 28 Q 65 35 70 42 Q 75 35 70 28" fill="url(#goldGrad)"/>
      <circle cx="70" cy="50" r="6" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1.5"/>
    </g>
    
    <!-- Central pole -->
    <rect x="68" y="60" width="4" height="320" fill="url(#darkGold)"/>
    
    <!-- Tiers -->
    <g>${tiersHTML}</g>
    
    <!-- Base -->
    <ellipse cx="70" cy="380" rx="25" ry="8" fill="url(#darkGold)" opacity="0.8"/>
    <path d="M 45 380 Q 70 370 95 380" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1.5"/>
  </svg>`;
}

/**
 * සඳකඩ පහන — Sandakada Pahana (Moonstone)
 * The semi-circular carved stone at temple entrances.
 * Features the traditional four animals in procession.
 */
export function sandakadaPahana(classNames = 'orn-sandakada') {
  return `<svg class="${classNames}" viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#F5ECD7;stop-opacity:1"/>
        <stop offset="50%" style="stop-color:#E8D9B8;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#D4C4A0;stop-opacity:1"/>
      </linearGradient>
      <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#D4A844;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#B8860B;stop-opacity:1"/>
      </linearGradient>
    </defs>
    
    <!-- Outer semi-circle -->
    <path d="M 10 150 A 140 140 0 0 1 290 150 L 280 150 A 130 130 0 0 0 20 150 Z" 
          fill="url(#stoneGrad)" stroke="url(#goldAccent)" stroke-width="2"/>
    
    <!-- Concentric rings -->
    <path d="M 30 150 A 120 120 0 0 1 270 150" 
          fill="none" stroke="url(#goldAccent)" stroke-width="3"/>
    <path d="M 50 150 A 100 100 0 0 1 250 150" 
          fill="none" stroke="url(#goldAccent)" stroke-width="2"/>
    <path d="M 70 150 A 80 80 0 0 1 230 150" 
          fill="none" stroke="url(#goldAccent)" stroke-width="2"/>
    
    <!-- Lotus petals in outer ring -->
    ${Array.from({length: 24}, (_, i) => {
      const angle = (i * 7.5 * Math.PI) / 180;
      const x = 150 + 125 * Math.cos(angle);
      const y = 150 - 125 * Math.sin(angle);
      return `<ellipse cx="${x}" cy="${y}" rx="8" ry="4" fill="url(#goldAccent)" opacity="0.7" 
              transform="rotate(${-i * 7.5} ${x} ${y})"/>`;
    }).join('')}
    
    <!-- Animals procession (simplified but recognizable) -->
    <!-- Elephant -->
    <g transform="translate(90, 90) scale(0.5)">
      <path d="M 0 0 Q -5 -10 -8 -15 L -6 -15 Q -4 -12 0 -5 L 5 -5 Q 8 -12 6 -15 L 8 -15 Q 5 -10 0 0 Z" 
            fill="url(#goldAccent)"/>
      <ellipse cx="0" cy="5" rx="12" ry="8" fill="url(#goldAccent)"/>
      <rect x="-10" y="10" width="4" height="10" fill="url(#goldAccent)"/>
      <rect x="-4" y="10" width="4" height="10" fill="url(#goldAccent)"/>
      <rect x="2" y="10" width="4" height="10" fill="url(#goldAccent)"/>
      <rect x="8" y="10" width="4" height="10" fill="url(#goldAccent)"/>
    </g>
    
    <!-- Horse -->
    <g transform="translate(130, 85) scale(0.5)">
      <ellipse cx="0" cy="5" rx="10" ry="6" fill="url(#goldAccent)"/>
      <path d="M -8 5 Q -12 0 -10 -5 L -8 -3 Q -6 2 -5 5" fill="url(#goldAccent)"/>
      <rect x="-8" y="10" width="3" height="12" fill="url(#goldAccent)"/>
      <rect x="-3" y="10" width="3" height="12" fill="url(#goldAccent)"/>
      <rect x="3" y="10" width="3" height="12" fill="url(#goldAccent)"/>
      <rect x="8" y="10" width="3" height="12" fill="url(#goldAccent)"/>
    </g>
    
    <!-- Lion -->
    <g transform="translate(170, 85) scale(0.5)">
      <ellipse cx="0" cy="5" rx="10" ry="6" fill="url(#goldAccent)"/>
      <circle cx="-8" cy="0" r="5" fill="url(#goldAccent)"/>
      <path d="M -8 -5 Q -10 -8 -8 -10 Q -6 -8 -8 -5" fill="url(#goldAccent)"/>
      <rect x="-8" y="10" width="3" height="12" fill="url(#goldAccent)"/>
      <rect x="-3" y="10" width="3" height="12" fill="url(#goldAccent)"/>
      <rect x="3" y="10" width="3" height="12" fill="url(#goldAccent)"/>
      <rect x="8" y="10" width="3" height="12" fill="url(#goldAccent)"/>
    </g>
    
    <!-- Bull -->
    <g transform="translate(210, 90) scale(0.5)">
      <ellipse cx="0" cy="5" rx="10" ry="6" fill="url(#goldAccent)"/>
      <path d="M -8 5 Q -10 2 -12 0 M -8 5 Q -10 8 -12 10" 
            stroke="url(#goldAccent)" stroke-width="2" fill="none"/>
      <rect x="-8" y="10" width="3" height="10" fill="url(#goldAccent)"/>
      <rect x="-3" y="10" width="3" height="10" fill="url(#goldAccent)"/>
      <rect x="3" y="10" width="3" height="10" fill="url(#goldAccent)"/>
      <rect x="8" y="10" width="3" height="10" fill="url(#goldAccent)"/>
    </g>
    
    <!-- Center lotus -->
    <circle cx="150" cy="120" r="15" fill="url(#goldAccent)" opacity="0.8"/>
    <path d="M 150 105 Q 145 115 150 120 Q 155 115 150 105" fill="url(#goldAccent)"/>
    <path d="M 135 120 Q 145 115 150 120 Q 145 125 135 120" fill="url(#goldAccent)"/>
    <path d="M 165 120 Q 155 115 150 120 Q 155 125 165 120" fill="url(#goldAccent)"/>
    <path d="M 150 135 Q 145 125 150 120 Q 155 125 150 135" fill="url(#goldAccent)"/>
  </svg>`;
}

/**
 * පුංකලස — Punkalasa (Pot of Prosperity)
 * The sacred pot with coconut, mango leaves, and flowers.
 * Symbolizes abundance, prosperity, and auspiciousness.
 */
export function punkalasa(classNames = 'orn-punkalasa') {
  return `<svg class="${classNames}" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#F4D03F;stop-opacity:1"/>
        <stop offset="50%" style="stop-color:#D4A844;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#B8860B;stop-opacity:1"/>
      </linearGradient>
      <linearGradient id="darkGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#8B6914;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#6B4E0A;stop-opacity:1"/>
      </linearGradient>
    </defs>
    
    <!-- Base pedestal -->
    <ellipse cx="60" cy="170" rx="30" ry="6" fill="url(#darkGold)"/>
    <rect x="35" y="160" width="50" height="10" rx="2" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1"/>
    
    <!-- Pot body -->
    <path d="M 35 160 Q 30 140 32 120 Q 35 100 45 85 Q 55 75 60 75 Q 65 75 75 85 Q 85 100 88 120 Q 90 140 85 160 Z" 
          fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="2"/>
    
    <!-- Pot neck -->
    <rect x="45" y="70" width="30" height="8" rx="2" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1.5"/>
    
    <!-- Pot rim -->
    <ellipse cx="60" cy="70" rx="20" ry="5" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1.5"/>
    
    <!-- Decorative bands on pot -->
    <path d="M 40 100 Q 60 95 80 100" fill="none" stroke="url(#darkGold)" stroke-width="1.5"/>
    <path d="M 38 120 Q 60 115 82 120" fill="none" stroke="url(#darkGold)" stroke-width="1.5"/>
    <path d="M 36 140 Q 60 135 84 140" fill="none" stroke="url(#darkGold)" stroke-width="1.5"/>
    
    <!-- Coconut on top -->
    <circle cx="60" cy="65" r="10" fill="url(#darkGold)"/>
    <path d="M 60 55 Q 55 60 60 65 Q 65 60 60 55" fill="url(#goldGrad)"/>
    
    <!-- Mango leaves -->
    <g opacity="0.9">
      <path d="M 50 60 Q 45 50 40 40" fill="none" stroke="#2D5A27" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="40" cy="38" rx="6" ry="10" fill="#2D5A27" transform="rotate(-20 40 38)"/>
      
      <path d="M 60 55 Q 60 45 60 35" fill="none" stroke="#2D5A27" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="60" cy="32" rx="6" ry="10" fill="#2D5A27"/>
      
      <path d="M 70 60 Q 75 50 80 40" fill="none" stroke="#2D5A27" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="80" cy="38" rx="6" ry="10" fill="#2D5A27" transform="rotate(20 80 38)"/>
    </g>
    
    <!-- Flowers -->
    <g opacity="0.8">
      <circle cx="45" cy="45" r="4" fill="#E74C3C"/>
      <circle cx="75" cy="45" r="4" fill="#E74C3C"/>
      <circle cx="60" cy="40" r="4" fill="#F39C12"/>
    </g>
    
    <!-- Pot decorations (lotus pattern) -->
    <path d="M 50 90 Q 55 85 60 90 Q 65 85 70 90" fill="none" stroke="url(#darkGold)" stroke-width="1.5"/>
    <circle cx="60" cy="95" r="3" fill="url(#goldGrad)"/>
  </svg>`;
}

/**
 * ලියවැල — Liyawala (Traditional Kandyan Creeper/Vine Pattern)
 * The elegant scrolling vine pattern used to frame panels and sections.
 */
export function liyawala(classNames = 'orn-liyawala') {
  return `<svg class="${classNames}" viewBox="0 0 600 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#D4A844;stop-opacity:1"/>
        <stop offset="50%" style="stop-color:#F4D03F;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#D4A844;stop-opacity:1"/>
      </linearGradient>
    </defs>
    
    <!-- Main vine stem -->
    <path d="M 0 30 Q 50 20 100 30 Q 150 40 200 30 Q 250 20 300 30 Q 350 40 400 30 Q 450 20 500 30 Q 550 40 600 30" 
          fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Left scrollwork -->
    <path d="M 10 30 Q 5 25 8 20 Q 12 15 18 18 Q 22 22 20 28" 
          fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="22" cy="28" r="3" fill="url(#goldGrad)"/>
    
    <!-- Decorative leaves and scrolls -->
    <g opacity="0.8">
      <!-- Leaf 1 -->
      <path d="M 80 25 Q 75 20 78 15 Q 82 12 86 15 Q 88 20 85 25" 
            fill="url(#goldGrad)" stroke="url(#goldGrad)" stroke-width="1"/>
      
      <!-- Scroll 1 -->
      <path d="M 150 35 Q 145 40 148 45 Q 152 48 156 45 Q 158 40 155 35" 
            fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Lotus bud -->
      <path d="M 220 28 Q 215 23 218 18 Q 222 15 226 18 Q 228 23 225 28" 
            fill="url(#goldGrad)"/>
      <circle cx="222" cy="30" r="2" fill="url(#goldGrad)"/>
      
      <!-- Leaf 2 -->
      <path d="M 300 32 Q 295 27 298 22 Q 302 19 306 22 Q 308 27 305 32" 
            fill="url(#goldGrad)" stroke="url(#goldGrad)" stroke-width="1"/>
      
      <!-- Scroll 2 -->
      <path d="M 370 28 Q 365 23 368 18 Q 372 15 376 18 Q 378 23 375 28" 
            fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Lotus bud 2 -->
      <path d="M 450 32 Q 445 27 448 22 Q 452 19 456 22 Q 458 27 455 32" 
            fill="url(#goldGrad)"/>
      <circle cx="452" cy="34" r="2" fill="url(#goldGrad)"/>
      
      <!-- Leaf 3 -->
      <path d="M 520 25 Q 515 20 518 15 Q 522 12 526 15 Q 528 20 525 25" 
            fill="url(#goldGrad)" stroke="url(#goldGrad)" stroke-width="1"/>
    </g>
    
    <!-- Right scrollwork -->
    <path d="M 590 30 Q 595 25 592 20 Q 588 15 582 18 Q 578 22 580 28" 
          fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="578" cy="28" r="3" fill="url(#goldGrad)"/>
    
    <!-- Center ornament (large lotus) -->
    <g transform="translate(300, 30)">
      <path d="M 0 -8 Q -5 -3 0 0 Q 5 -3 0 -8" fill="url(#goldGrad)"/>
      <path d="M -8 0 Q -3 -5 0 0 Q -3 5 -8 0" fill="url(#goldGrad)"/>
      <path d="M 8 0 Q 3 -5 0 0 Q 3 5 8 0" fill="url(#goldGrad)"/>
      <path d="M 0 8 Q -5 3 0 0 Q 5 3 0 8" fill="url(#goldGrad)"/>
      <circle cx="0" cy="0" r="3" fill="#F4D03F"/>
    </g>
  </svg>`;
}

/**
 * වෙස් මුකුල — Ves Crown (Traditional Kandyan dancer's headdress)
 * The ornate crown worn in Kandyan dance ceremonies.
 */
export function vesCrown(classNames = 'orn-ves') {
  return `<svg class="${classNames}" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#F4D03F;stop-opacity:1"/>
        <stop offset="50%" style="stop-color:#D4A844;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#B8860B;stop-opacity:1"/>
      </linearGradient>
      <linearGradient id="darkGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#8B6914;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#6B4E0A;stop-opacity:1"/>
      </linearGradient>
    </defs>
    
    <!-- Base band -->
    <path d="M 20 100 Q 70 110 120 100 L 118 90 Q 70 100 22 90 Z" 
          fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="2"/>
    
    <!-- Main crown body -->
    <path d="M 22 90 Q 30 70 40 50 Q 50 35 70 30 Q 90 35 100 50 Q 110 70 118 90" 
          fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="2"/>
    
    <!-- Central spike -->
    <path d="M 70 30 L 70 15 L 72 10 L 70 5 L 68 10 L 70 15" 
          fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1.5"/>
    <circle cx="70" cy="5" r="3" fill="url(#goldGrad)"/>
    
    <!-- Side spikes -->
    <path d="M 40 50 L 35 35 L 37 30 L 40 50" fill="url(#goldGrad)"/>
    <path d="M 100 50 L 105 35 L 103 30 L 100 50" fill="url(#goldGrad)"/>
    
    <!-- Decorative elements -->
    <circle cx="70" cy="50" r="8" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1.5"/>
    <circle cx="70" cy="50" r="4" fill="#E74C3C"/>
    
    <circle cx="50" cy="65" r="5" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1"/>
    <circle cx="90" cy="65" r="5" fill="url(#goldGrad)" stroke="url(#darkGold)" stroke-width="1"/>
    
    <!-- Hanging decorations -->
    <line x1="30" y1="95" x2="30" y2="105" stroke="url(#goldGrad)" stroke-width="1.5"/>
    <circle cx="30" cy="108" r="3" fill="url(#goldGrad)"/>
    
    <line x1="70" y1="105" x2="70" y2="115" stroke="url(#goldGrad)" stroke-width="1.5"/>
    <circle cx="70" cy="118" r="3" fill="url(#goldGrad)"/>
    
    <line x1="110" y1="95" x2="110" y2="105" stroke="url(#goldGrad)" stroke-width="1.5"/>
    <circle cx="110" cy="108" r="3" fill="url(#goldGrad)"/>
    
    <!-- Filigree patterns -->
    <path d="M 45 60 Q 50 55 55 60" fill="none" stroke="url(#darkGold)" stroke-width="1.5"/>
    <path d="M 85 60 Q 90 55 95 60" fill="none" stroke="url(#darkGold)" stroke-width="1.5"/>
  </svg>`;
}

/**
 * නේකමි පෙති — Traditional Kandyan Temple Wall Pattern
 * Geometric pattern inspired by Kandyan temple wall paintings.
 */
export function templePattern(classNames = 'orn-temple-pattern') {
  return `<svg class="${classNames}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#D4A844;stop-opacity:0.3"/>
        <stop offset="100%" style="stop-color:#B8860B;stop-opacity:0.3"/>
      </linearGradient>
    </defs>
    
    <!-- Diamond pattern -->
    <path d="M 50 10 L 90 50 L 50 90 L 10 50 Z" 
          fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
    <path d="M 50 25 L 75 50 L 50 75 L 25 50 Z" 
          fill="none" stroke="url(#goldGrad)" stroke-width="1.5"/>
    
    <!-- Corner lotus petals -->
    <path d="M 50 10 Q 45 20 50 25 Q 55 20 50 10" fill="url(#goldGrad)"/>
    <path d="M 90 50 Q 80 45 75 50 Q 80 55 90 50" fill="url(#goldGrad)"/>
    <path d="M 50 90 Q 45 80 50 75 Q 55 80 50 90" fill="url(#goldGrad)"/>
    <path d="M 10 50 Q 20 45 25 50 Q 20 55 10 50" fill="url(#goldGrad)"/>
    
    <!-- Center lotus -->
    <circle cx="50" cy="50" r="8" fill="url(#goldGrad)"/>
    <path d="M 50 42 Q 47 47 50 50 Q 53 47 50 42" fill="url(#goldGrad)" opacity="0.8"/>
    <path d="M 42 50 Q 47 47 50 50 Q 47 53 42 50" fill="url(#goldGrad)" opacity="0.8"/>
    <path d="M 58 50 Q 53 47 50 50 Q 53 53 58 50" fill="url(#goldGrad)" opacity="0.8"/>
    <path d="M 50 58 Q 47 53 50 50 Q 53 53 50 58" fill="url(#goldGrad)" opacity="0.8"/>
  </svg>`;
}

/**
 * මංගල පහන — Mangala Pahana (Traditional Brass Oil Lamp)
 * The sacred oil lamp used in all auspicious ceremonies.
 */
export function mangalaLamp(classNames = 'orn-lamp') {
  return `<svg class="${classNames}" viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#D4A844;stop-opacity:1"/>
        <stop offset="50%" style="stop-color:#B8860B;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#8B6914;stop-opacity:1"/>
      </linearGradient>
      <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#FFF7DA;stop-opacity:1"/>
        <stop offset="50%" style="stop-color:#F4D03F;stop-opacity:0.9"/>
        <stop offset="100%" style="stop-color:#E67E22;stop-opacity:0.7"/>
      </radialGradient>
    </defs>
    
    <!-- Flame -->
    <g class="flame">
      <ellipse cx="30" cy="20" rx="8" ry="15" fill="url(#flameGrad)" opacity="0.9"/>
      <ellipse cx="30" cy="22" rx="5" ry="10" fill="#FFF7DA" opacity="0.8"/>
    </g>
    
    <!-- Wick holder -->
    <rect x="28" y="35" width="4" height="8" fill="url(#brassGrad)"/>
    
    <!-- Oil bowl -->
    <ellipse cx="30" cy="45" rx="18" ry="6" fill="url(#brassGrad)" stroke="#8B6914" stroke-width="1"/>
    <path d="M 12 45 Q 30 40 48 45" fill="url(#brassGrad)"/>
    
    <!-- Stem -->
    <rect x="28" y="50" width="4" height="25" fill="url(#brassGrad)"/>
    
    <!-- Base -->
    <ellipse cx="30" cy="75" rx="15" ry="5" fill="url(#brassGrad)" stroke="#8B6914" stroke-width="1"/>
    <path d="M 15 75 Q 30 70 45 75" fill="url(#brassGrad)"/>
    
    <!-- Decorative rings -->
    <ellipse cx="30" cy="60" rx="8" ry="2" fill="none" stroke="#8B6914" stroke-width="1"/>
    <ellipse cx="30" cy="68" rx="10" ry="2.5" fill="none" stroke="#8B6914" stroke-width="1"/>
    
    <!-- Base ornament -->
    <path d="M 20 80 Q 30 85 40 80" fill="none" stroke="#8B6914" stroke-width="1.5"/>
  </svg>`;
}
