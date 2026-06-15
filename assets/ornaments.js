/* ════════════════════════════════════════════════════════════════════════
   හෙළ සිරිත · Helasiritha — Kandyan Ornament Library  (assets/ornaments.js)
   Hand-built, fully scalable inline-SVG cultural motifs. No external assets.
   Every motif uses metallic brass gradients + soft shadows for an EMBOSSED feel.
   Exposed on  window.ORN.*  — pure functions returning SVG markup strings.
   ════════════════════════════════════════════════════════════════════════ */
(function (w) {
  "use strict";

  /* Re-usable brass/gold gradient + emboss filter, id-suffixed so multiple
     instances on one page never collide. */
  function defs(s) {
    return (
      '<defs>' +
      '<linearGradient id="brass' + s + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#F6E3B0"/>' +
        '<stop offset=".34" stop-color="#D9B25F"/>' +
        '<stop offset=".62" stop-color="#B6852F"/>' +
        '<stop offset=".84" stop-color="#8A5E1E"/>' +
        '<stop offset="1" stop-color="#6B4717"/>' +
      '</linearGradient>' +
      '<linearGradient id="brassH' + s + '" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#8A5E1E"/>' +
        '<stop offset=".5" stop-color="#F2D88F"/>' +
        '<stop offset="1" stop-color="#8A5E1E"/>' +
      '</linearGradient>' +
      '<radialGradient id="halo' + s + '" cx=".5" cy=".42" r=".62">' +
        '<stop offset="0" stop-color="#FFF4D6"/>' +
        '<stop offset=".55" stop-color="#E9C879"/>' +
        '<stop offset="1" stop-color="#A9772E"/>' +
      '</radialGradient>' +
      '<linearGradient id="flame' + s + '" x1="0" y1="1" x2="0" y2="0">' +
        '<stop offset="0" stop-color="#B6361B"/>' +
        '<stop offset=".45" stop-color="#F08A1D"/>' +
        '<stop offset="1" stop-color="#FFE8A3"/>' +
      '</linearGradient>' +
      '<filter id="emb' + s + '" x="-20%" y="-20%" width="140%" height="140%">' +
        '<feDropShadow dx="0" dy="1.4" stdDeviation="1.1" flood-color="#3a230c" flood-opacity=".55"/>' +
      '</filter>' +
      '</defs>'
    );
  }

  /* ── Liyawela : weaving vine divider band ─────────────────────────────── */
  function liyawela(opts) {
    opts = opts || {};
    var s = opts.s || "lw";
    var unit =
      '<path d="M0 20 C 10 4, 26 4, 30 20 C 34 36, 50 36, 60 20" ' +
        'fill="none" stroke="url(#brassH' + s + ')" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M30 20 c 4 -10 16 -10 14 2 c -1 7 -10 7 -10 -1" ' +
        'fill="none" stroke="url(#brassH' + s + ')" stroke-width="1.7"/>' +
      '<circle cx="30" cy="20" r="2.4" fill="url(#brass' + s + ')"/>' +
      '<path d="M0 20 c -4 -10 -16 -10 -14 2 c 1 7 10 7 10 -1" ' +
        'fill="none" stroke="url(#brassH' + s + ')" stroke-width="1.7"/>';
    return (
      '<svg class="orn orn-liyawela" viewBox="0 0 60 40" width="100%" height="22" ' +
        'preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      defs(s) +
      '<pattern id="lwp' + s + '" width="60" height="40" patternUnits="userSpaceOnUse">' + unit + '</pattern>' +
      '<rect x="0" y="0" width="60" height="40" fill="url(#lwp' + s + ')"/>' +
      '<circle cx="30" cy="20" r="3.4" fill="none" stroke="url(#brass' + s + ')" stroke-width="1"/>' +
      '</svg>'
    );
  }

  /* ── Mandala : concentric decorative disc (Kandyan card motif) ─────────── */
  function mandala(opts) {
    opts = opts || {};
    var s = opts.s || "md";
    var pet = "";
    var i, n = 16;
    for (i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2;
      var x1 = 60 + Math.cos(a) * 30, y1 = 60 + Math.sin(a) * 30;
      var x2 = 60 + Math.cos(a) * 50, y2 = 60 + Math.sin(a) * 50;
      pet += '<path d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) +
        ' Q' + (60 + Math.cos(a + 0.16) * 44).toFixed(1) + ' ' + (60 + Math.sin(a + 0.16) * 44).toFixed(1) +
        ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1) +
        ' Q' + (60 + Math.cos(a - 0.16) * 44).toFixed(1) + ' ' + (60 + Math.sin(a - 0.16) * 44).toFixed(1) +
        ' ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Z" fill="url(#brass' + s + ')" opacity=".92"/>';
    }
    var dots = "";
    for (i = 0; i < 24; i++) {
      var d = (i / 24) * Math.PI * 2;
      dots += '<circle cx="' + (60 + Math.cos(d) * 24).toFixed(1) + '" cy="' + (60 + Math.sin(d) * 24).toFixed(1) + '" r="1.5" fill="url(#brass' + s + ')"/>';
    }
    return (
      '<svg class="orn orn-mandala" viewBox="0 0 120 120" width="100%" height="100%" ' +
        'preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      defs(s) +
      '<g filter="url(#emb' + s + ')">' +
      pet +
      '<circle cx="60" cy="60" r="30" fill="none" stroke="url(#brass' + s + ')" stroke-width="2.4"/>' +
      dots +
      '<circle cx="60" cy="60" r="17" fill="none" stroke="url(#brass' + s + ')" stroke-width="2"/>' +
      '<circle cx="60" cy="60" r="9" fill="url(#halo' + s + ')"/>' +
      '<circle cx="60" cy="60" r="3" fill="#5A1A1A"/>' +
      '</g></svg>'
    );
  }

  /* ── Makara Thorana : majestic dragon-arch CROWN (sits atop framed content) */
  function makaraThorana(opts) {
    opts = opts || {};
    var s = opts.s || "mt";
    // Kirtimukha sun-burst apex
    var rays = "";
    for (var i = 0; i < 19; i++) {
      var a = (-Math.PI) + (i / 18) * Math.PI; // top half
      rays += '<line x1="200" y1="62" x2="' + (200 + Math.cos(a) * 56).toFixed(1) +
        '" y2="' + (62 + Math.sin(a) * 56).toFixed(1) + '" stroke="url(#brass' + s + ')" stroke-width="3" stroke-linecap="round"/>';
    }
    return (
      '<svg class="orn orn-thorana" viewBox="0 0 400 150" width="100%" ' +
        'preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">' +
      defs(s) +
      '<g filter="url(#emb' + s + ')">' +
      // sun rays + apex jewel
      '<g opacity=".96">' + rays + '</g>' +
      '<circle cx="200" cy="62" r="16" fill="url(#halo' + s + ')" stroke="url(#brass' + s + ')" stroke-width="2.4"/>' +
      '<circle cx="200" cy="62" r="6" fill="#5A1A1A"/>' +
      // arch sweep
      '<path d="M40 150 C 40 70, 130 34, 200 34 C 270 34, 360 70, 360 150" ' +
        'fill="none" stroke="url(#brassH' + s + ')" stroke-width="9" stroke-linecap="round"/>' +
      '<path d="M58 150 C 58 84, 138 52, 200 52 C 262 52, 342 84, 342 150" ' +
        'fill="none" stroke="url(#brass' + s + ')" stroke-width="3.4" opacity=".85"/>' +
      // scroll-work flames along the arch
      scrollFlames(s) +
      // Makara (dragon) heads at the two springers
      makaraHead(58, 132, false, s) +
      makaraHead(342, 132, true, s) +
      '</g></svg>'
    );
  }
  function scrollFlames(s) {
    var out = "", pts = [[120,60],[160,46],[200,42],[240,46],[280,60]];
    pts.forEach(function (p) {
      out += '<path d="M' + p[0] + ' ' + p[1] + ' c -7 -12 8 -20 10 -7 c 1 8 -8 9 -9 2" ' +
        'fill="none" stroke="url(#brass' + s + ')" stroke-width="2.2"/>';
    });
    return out;
  }
  function makaraHead(x, y, flip, s) {
    var t = 'translate(' + x + ',' + y + ')' + (flip ? ' scale(-1,1)' : '');
    return (
      '<g transform="' + t + '">' +
      '<path d="M0 0 c -22 2 -34 -8 -40 -26 c 14 8 22 6 30 -2 c -10 -2 -14 -10 -10 -20 c 8 12 18 12 26 6 c 6 16 4 30 -6 42 Z" ' +
        'fill="url(#brass' + s + ')"/>' +
      '<path d="M-6 -34 q 16 -10 30 2" fill="none" stroke="url(#brass' + s + ')" stroke-width="2.4"/>' +
      '<circle cx="-20" cy="-22" r="3.1" fill="#5A1A1A"/>' +
      '<path d="M-40 -26 q -10 6 -6 18" fill="none" stroke="url(#brass' + s + ')" stroke-width="2.2"/>' +
      '</g>'
    );
  }

  /* ── Sesath : tall ceremonial fan, standing proud on a pole ───────────── */
  function sesath(opts) {
    opts = opts || {};
    var s = opts.s || "ss";
    var ringDots = function (r, cnt, rad) {
      var o = "";
      for (var i = 0; i < cnt; i++) {
        var a = (i / cnt) * Math.PI * 2;
        o += '<circle cx="' + (60 + Math.cos(a) * r).toFixed(1) + '" cy="' + (66 + Math.sin(a) * r).toFixed(1) + '" r="' + rad + '" fill="url(#brass' + s + ')"/>';
      }
      return o;
    };
    var scallop = "";
    for (var i = 0; i < 28; i++) {
      var a = (i / 28) * Math.PI * 2;
      scallop += '<circle cx="' + (60 + Math.cos(a) * 50).toFixed(1) + '" cy="' + (66 + Math.sin(a) * 50).toFixed(1) + '" r="6" fill="url(#brass' + s + ')" opacity=".95"/>';
    }
    return (
      '<svg class="orn orn-sesath" viewBox="0 0 120 300" width="100%" height="100%" ' +
        'preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">' +
      defs(s) +
      '<g filter="url(#emb' + s + ')">' +
      // pole
      '<rect x="57" y="120" width="6" height="176" rx="3" fill="url(#brass' + s + ')"/>' +
      '<circle cx="60" cy="296" r="7" fill="url(#brass' + s + ')"/>' +
      // fan body
      scallop +
      '<circle cx="60" cy="66" r="50" fill="url(#halo' + s + ')" stroke="url(#brass' + s + ')" stroke-width="3"/>' +
      '<circle cx="60" cy="66" r="40" fill="none" stroke="url(#brass' + s + ')" stroke-width="2"/>' +
      ringDots(40, 20, 1.7) +
      '<circle cx="60" cy="66" r="27" fill="#FBF0D6" stroke="url(#brass' + s + ')" stroke-width="2"/>' +
      ringDots(27, 14, 1.5) +
      '<circle cx="60" cy="66" r="14" fill="url(#halo' + s + ')" stroke="url(#brass' + s + ')" stroke-width="1.8"/>' +
      '<circle cx="60" cy="66" r="5" fill="#5A1A1A"/>' +
      // finial
      '<path d="M60 12 l5 8 h-10 Z" fill="url(#brass' + s + ')"/>' +
      '</g></svg>'
    );
  }

  /* ── Pun Kalasa : brass pot of prosperity w/ coconut flower & leaves ───── */
  function punKalasa(opts) {
    opts = opts || {};
    var s = opts.s || "pk";
    return (
      '<svg class="orn orn-kalasa" viewBox="0 0 120 160" width="100%" height="100%" ' +
        'preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      defs(s) +
      '<g filter="url(#emb' + s + ')">' +
      // mango leaves
      '<path d="M60 70 C 30 52 22 26 40 20 C 50 44 58 52 60 70 Z" fill="url(#brass' + s + ')" opacity=".9"/>' +
      '<path d="M60 70 C 90 52 98 26 80 20 C 70 44 62 52 60 70 Z" fill="url(#brass' + s + ')" opacity=".9"/>' +
      '<path d="M60 72 C 52 40 60 18 60 10 C 60 18 68 40 60 72 Z" fill="url(#brass' + s + ')"/>' +
      // coconut flower (pohottuwa)
      '<circle cx="60" cy="14" r="8" fill="url(#halo' + s + ')" stroke="url(#brass' + s + ')" stroke-width="1.6"/>' +
      // pot
      '<path d="M36 78 q24 -16 48 0 l6 10 q-30 16 -60 0 Z" fill="url(#brass' + s + ')"/>' +
      '<path d="M30 92 q30 22 60 0 c 8 18 4 44 -30 50 c -34 -6 -38 -32 -30 -50 Z" fill="url(#brass' + s + ')"/>' +
      '<ellipse cx="60" cy="92" rx="30" ry="8" fill="#FBF0D6" opacity=".55"/>' +
      '<path d="M44 118 q16 10 32 0" fill="none" stroke="#FBF0D6" stroke-width="2" opacity=".6"/>' +
      '<path d="M40 104 q20 12 40 0" fill="none" stroke="#FBF0D6" stroke-width="2" opacity=".5"/>' +
      '</g></svg>'
    );
  }

  /* ── Pala Pethi : lotus-petal cluster accent (corners / buttons) ──────── */
  function palaPethi(opts) {
    opts = opts || {};
    var s = opts.s || "pp";
    var petal = function (rot) {
      return '<path transform="rotate(' + rot + ' 30 34)" d="M30 34 C 22 18 24 4 30 0 C 36 4 38 18 30 34 Z" ' +
        'fill="url(#brass' + s + ')"/>';
    };
    return (
      '<svg class="orn orn-pethi" viewBox="0 0 60 40" width="100%" height="100%" ' +
        'preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      defs(s) +
      '<g filter="url(#emb' + s + ')">' +
      petal(-50) + petal(-25) + petal(0) + petal(25) + petal(50) +
      '<circle cx="30" cy="34" r="3" fill="url(#halo' + s + ')"/>' +
      '</g></svg>'
    );
  }

  /* ── Mangala Pahana : tiered brass oil-lamp with living flame ─────────── */
  function pahana(opts) {
    opts = opts || {};
    var s = opts.s || "ph";
    var flame =
      '<g class="orn-flame">' +
      '<path d="M60 18 C 70 30 70 44 60 52 C 50 44 50 30 60 18 Z" fill="url(#flame' + s + ')"/>' +
      '<path d="M60 30 C 65 36 65 44 60 50 C 55 44 55 36 60 30 Z" fill="#FFF3C8"/>' +
      '</g>';
    return (
      '<svg class="orn orn-pahana" viewBox="0 0 120 180" width="100%" height="100%" ' +
        'preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      defs(s) +
      '<g filter="url(#emb' + s + ')">' +
      flame +
      '<ellipse cx="60" cy="58" rx="30" ry="9" fill="url(#brass' + s + ')"/>' +
      '<path d="M30 58 q30 18 60 0 v6 q-30 16 -60 0 Z" fill="url(#brass' + s + ')"/>' +
      '<rect x="56" y="70" width="8" height="34" fill="url(#brass' + s + ')"/>' +
      '<ellipse cx="60" cy="74" rx="14" ry="5" fill="url(#brass' + s + ')"/>' +
      '<path d="M36 104 q24 18 48 0 l8 10 q-32 16 -64 0 Z" fill="url(#brass' + s + ')"/>' +
      '<path d="M26 116 q34 22 68 0 c 6 16 0 30 -34 36 c -34 -6 -40 -20 -34 -36 Z" fill="url(#brass' + s + ')"/>' +
      // little bird finial on a stem
      '<path d="M60 58 q2 -10 -2 -16" fill="none" stroke="url(#brass' + s + ')" stroke-width="2"/>' +
      '</g></svg>'
    );
  }

  /* ── Perahera band : procession silhouette (drummer · dancer · gajaa · flag) */
  function perahera(opts) {
    opts = opts || {};
    var s = opts.s || "pr";
    // simplified, dignified silhouettes in brass
    var flag =
      '<g transform="translate(24,0)">' +
      '<rect x="14" y="6" width="3" height="64" fill="url(#brass' + s + ')"/>' +
      '<path d="M17 8 q18 6 0 16 q-2 -8 0 -16 Z" fill="url(#brass' + s + ')"/>' +
      '<circle cx="9" cy="58" r="6" fill="url(#brass' + s + ')"/><path d="M3 64 h12 v6 h-12 Z" fill="url(#brass' + s + ')"/>' +
      '</g>';
    var drummer =
      '<g transform="translate(86,0)">' +
      '<circle cx="10" cy="20" r="7" fill="url(#brass' + s + ')"/>' +
      '<path d="M3 30 q7 -6 14 0 l3 24 h-20 Z" fill="url(#brass' + s + ')"/>' +
      '<ellipse cx="22" cy="42" rx="9" ry="6" fill="url(#brass' + s + ')"/>' +
      '<path d="M2 70 h20 v-2 h-20 Z" fill="url(#brass' + s + ')"/>' +
      '</g>';
    var dancer =
      '<g transform="translate(150,0)">' +
      '<circle cx="14" cy="16" r="7" fill="url(#brass' + s + ')"/>' +
      '<path d="M14 9 l8 -8 M14 9 l-8 -8 M14 9 l0 -10" stroke="url(#brass' + s + ')" stroke-width="2"/>' +
      '<path d="M6 26 q8 -6 16 0 l-2 22 h-12 Z" fill="url(#brass' + s + ')"/>' +
      '<path d="M6 30 l-10 8 M22 30 l10 8" stroke="url(#brass' + s + ')" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M8 70 h12 v-2 h-12 Z" fill="url(#brass' + s + ')"/>' +
      '</g>';
    var gaja =
      '<g transform="translate(210,0)">' +
      '<path d="M6 36 q4 -20 26 -20 q26 0 30 22 l0 26 h-56 Z" fill="url(#brass' + s + ')"/>' +
      '<path d="M6 40 q-8 4 -6 22 l6 0 Z" fill="url(#brass' + s + ')"/>' + // trunk
      '<path d="M58 40 q10 2 10 -8" fill="none" stroke="url(#brass' + s + ')" stroke-width="3"/>' + // tail
      '<rect x="14" y="30" width="34" height="12" rx="3" fill="#5A1A1A" opacity=".5"/>' + // caparison
      '<path d="M12 64 h10 v6 h-10 Z M44 64 h10 v6 h-10 Z" fill="url(#brass' + s + ')"/>' +
      '<circle cx="20" cy="30" r="2" fill="#5A1A1A"/>' +
      '</g>';
    return (
      '<svg class="orn orn-perahera" viewBox="0 0 300 80" width="100%" ' +
        'preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">' +
      defs(s) +
      '<g filter="url(#emb' + s + ')" opacity=".95">' + flag + drummer + dancer + gaja + '</g>' +
      '</svg>'
    );
  }

  /* ── Small line-icons for the agenda timeline ─────────────────────────── */
  function icon(name, s) {
    s = s || ("ic" + Math.floor(Math.random() * 1e6));
    var inner = {
      sesath: '<circle cx="24" cy="20" r="13" fill="none" stroke="url(#brass' + s + ')" stroke-width="2.4"/><circle cx="24" cy="20" r="6" fill="url(#halo' + s + ')"/><rect x="22" y="30" width="4" height="14" fill="url(#brass' + s + ')"/>',
      poruwa: '<rect x="8" y="16" width="32" height="6" fill="url(#brass' + s + ')"/><path d="M12 22 v18 M36 22 v18 M10 40 h28" stroke="url(#brass' + s + ')" stroke-width="2.4" fill="none"/><path d="M14 16 q10 -10 20 0" fill="none" stroke="url(#brass' + s + ')" stroke-width="2.2"/>',
      ring: '<circle cx="18" cy="26" r="10" fill="none" stroke="url(#brass' + s + ')" stroke-width="2.6"/><circle cx="30" cy="26" r="10" fill="none" stroke="url(#brass' + s + ')" stroke-width="2.6"/><path d="M30 12 l3 6 h-6 Z" fill="url(#brass' + s + ')"/>',
      lamp: '<path d="M16 30 q8 8 16 0 c2 8 -4 14 -8 15 c-4 -1 -10 -7 -8 -15 Z" fill="url(#brass' + s + ')"/><path d="M24 8 c4 5 4 10 0 14 c-4 -4 -4 -9 0 -14 Z" fill="url(#flame' + s + ')"/><rect x="22" y="44" width="4" height="4" fill="url(#brass' + s + ')"/>',
      feast: '<circle cx="24" cy="26" r="13" fill="none" stroke="url(#brass' + s + ')" stroke-width="2.4"/><circle cx="24" cy="26" r="5" fill="url(#brass' + s + ')"/><path d="M8 14 v10 M40 14 v10" stroke="url(#brass' + s + ')" stroke-width="2.4"/>',
      mayura: '<path d="M24 40 c-10 0 -16 -8 -16 -18 c0 -8 6 -14 12 -12 c-2 6 2 10 8 8 c-2 8 -2 16 -4 22 Z" fill="url(#brass' + s + ')"/><circle cx="14" cy="14" r="3" fill="url(#halo' + s + ')"/><path d="M14 14 q-6 -6 -2 -10" fill="none" stroke="url(#brass' + s + ')" stroke-width="2"/>'
    }[name] || '';
    return (
      '<svg class="orn orn-icon" viewBox="0 0 48 48" width="100%" height="100%" ' +
        'preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      defs(s) + '<g filter="url(#emb' + s + ')">' + inner + '</g></svg>'
    );
  }

  w.ORN = {
    liyawela: liyawela, mandala: mandala, makaraThorana: makaraThorana,
    sesath: sesath, punKalasa: punKalasa, palaPethi: palaPethi,
    pahana: pahana, perahera: perahera, icon: icon
  };
})(window);
