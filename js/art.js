/* ===== Q 版動物（SVG 產生器）=====
   viewBox 0 0 200 220；大頭小身體坐姿。
   表情由外層 data-mood 控制：normal / open / eat / happy / no / tickle / calm
*/
const ART = (() => {
  const O = '#4A3443';            // 描邊色
  const PINK = '#FF9DB0';
  const E = (cx, cy, rx, ry, fill, sw = 4, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${O}" stroke-width="${sw}" ${x}/>`;
  const Ef = (cx, cy, rx, ry, fill, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${x}/>`;
  const C = (cx, cy, r, fill, sw = 4, x = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${O}" stroke-width="${sw}" ${x}/>`;
  const P = (d, fill, sw = 4, x = '') => `<path d="${d}" fill="${fill}" stroke="${O}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round" ${x}/>`;
  const L = (d, sw = 3.5, col = O) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const rot = (a, cx, cy) => `transform="rotate(${a} ${cx} ${cy})"`;

  /* ---------- shared pieces ---------- */
  function eyes({y = 92, dx = 24, s = 9, line = '#2B2030', dark = '#2B2030', ring = ''}) {
    const xs = [100 - dx, 100 + dx];
    const open = xs.map(x => `
      <g class="blinker" style="transform-origin:${x}px ${y}px">
        <ellipse cx="${x}" cy="${y}" rx="${s * .78}" ry="${s}" fill="${dark}" ${ring}/>
        <circle cx="${x + s * .28}" cy="${y - s * .38}" r="${s * .32}" fill="#fff"/>
        <circle cx="${x - s * .3}" cy="${y + s * .4}" r="${s * .14}" fill="#fff"/>
      </g>`).join('');
    const happy = xs.map(x => L(`M${x - s} ${y + 3} Q${x} ${y - s * 1.3} ${x + s} ${y + 3}`, 4.5, line)).join('');
    const closed = xs.map(x => L(`M${x - s} ${y - 1} Q${x} ${y + s} ${x + s} ${y - 1}`, 4.5, line)).join('');
    const sq = s * .9;
    const squint = L(`M${xs[0] - sq} ${y - sq * .8} L${xs[0] + sq * .6} ${y} L${xs[0] - sq} ${y + sq * .8}`, 4.5, line) +
                   L(`M${xs[1] + sq} ${y - sq * .8} L${xs[1] - sq * .6} ${y} L${xs[1] + sq} ${y + sq * .8}`, 4.5, line);
    return `<g class="eye-open"><g class="pupils">${open}</g></g>
      <g class="eye-happy">${happy}</g><g class="eye-closed">${closed}</g><g class="eye-squint">${squint}</g>`;
  }
  function cheeks(y = 110, dx = 40, r = 10) {
    return Ef(100 - dx, y, r * 1.2, r * .7, PINK, 'opacity=".6"') + Ef(100 + dx, y, r * 1.2, r * .7, PINK, 'opacity=".6"');
  }
  function mouth({x = 100, y = 116, w = 10, teeth = false}) {
    const smile = L(`M${x - w} ${y} Q${x - w / 2} ${y + 7} ${x} ${y + 1} Q${x + w / 2} ${y + 7} ${x + w} ${y}`) +
      (teeth ? `<rect x="${x - 5}" y="${y + 2}" width="10" height="8" rx="2" fill="#fff" stroke="${O}" stroke-width="2.5"/>` : '');
    const open = `<g class="m-open-shape" style="transform-origin:${x}px ${y - 1}px">` +
      P(`M${x - w - 2} ${y - 1} Q${x} ${y + 24} ${x + w + 2} ${y - 1} Q${x} ${y + 3} ${x - w - 2} ${y - 1} Z`, '#9B3343', 3.5) +
      Ef(x, y + 11, w * .55, 4.5, '#FF8FA3') + '</g>';
    const frown = L(`M${x - w + 1} ${y + 7} Q${x} ${y - 3} ${x + w - 1} ${y + 7}`);
    return `<g class="m-smile">${smile}</g><g class="m-open">${open}</g><g class="m-frown">${frown}</g>`;
  }
  function beak({y = 110, col = '#FF9F3D'}) {
    const closed = P(`M88 ${y} Q100 ${y - 10} 112 ${y} Q100 ${y + 12} 88 ${y} Z`, col, 3.5) + L(`M89 ${y} L111 ${y}`, 2.5);
    const open = `<g class="m-open-shape" style="transform-origin:100px ${y}px">` +
      P(`M87 ${y - 2} Q100 ${y - 13} 113 ${y - 2} Z`, col, 3.5) +
      P(`M89 ${y + 3} L111 ${y + 3} Q100 ${y + 17} 89 ${y + 3} Z`, col, 3.5) + Ef(100, y + 2, 9, 3, '#9B3343') + '</g>';
    return `<g class="m-smile">${closed}</g><g class="m-open">${open}</g><g class="m-frown">${closed}</g>`;
  }
  const nose = (y = 104, w = 7, col = O) => Ef(100, y, w, w * .7, col) + Ef(100 - w * .3, y - w * .25, w * .3, w * .2, '#fff', 'opacity=".6"');
  const whiskers = (y = 110) => L(`M48 ${y - 4} L24 ${y - 9} M48 ${y + 4} L23 ${y + 6} M152 ${y - 4} L176 ${y - 9} M152 ${y + 4} L177 ${y + 6}`, 3);
  function bodyBase({col, belly, arm = col, foot = col, footPad = null, wings = false}) {
    let s = '';
    s += E(100, 172, 50, 40, col);                                   // body
    if (belly) s += Ef(100, 180, 31, 26, belly);
    if (wings) {
      s += P('M54 150 Q34 168 48 190 Q58 182 62 166 Z', arm, 4) + P('M146 150 Q166 168 152 190 Q142 182 138 166 Z', arm, 4);
    } else {
      s += E(60, 170, 13, 19, arm, 4, rot(18, 60, 170)) + E(140, 170, 13, 19, arm, 4, rot(-18, 140, 170));
    }
    s += E(74, 205, 19, 11, foot) + E(126, 205, 19, 11, foot);
    if (footPad) s += Ef(74, 205, 8, 5, footPad) + Ef(126, 205, 8, 5, footPad);
    return s;
  }
  const head = (col, rx = 70, ry = 60, cy = 92) => E(100, cy, rx, ry, col);
  const wet = `<g class="wet">${[[60, 70], [138, 60], [118, 150], [74, 160], [150, 120], [52, 118], [100, 45]].map(([x, y]) =>
    `<path d="M${x} ${y - 7} Q${x + 5} ${y} ${x} ${y + 4} Q${x - 5} ${y} ${x} ${y - 7} Z" fill="#9FD8FF" stroke="#5AA9E6" stroke-width="1.5"/>`).join('')}</g>`;

  /* ---------- species ---------- */
  const S = {};

  S.monkey = () => {
    const c = '#B87A4B', f = '#F7D7B0';
    return {
      back: P('M140 190 Q186 196 182 160 Q178 136 160 146', 'none', 7) + L('M140 190 Q186 196 182 160 Q178 136 160 146', 3, c),
      body: bodyBase({col: c, belly: f, foot: f}),
      headBack: C(32, 96, 19, c) + Ef(32, 96, 11, 11, f) + C(168, 96, 19, c) + Ef(168, 96, 11, 11, f),
      head: head(c, 66, 58) +
        P('M100 76 Q86 58 68 66 Q46 78 54 104 Q60 136 100 138 Q140 136 146 104 Q154 78 132 66 Q114 58 100 76 Z', f, 0) +
        L('M98 50 Q102 40 110 44', 3.5),
      face: eyes({y: 92, dx: 22}) + cheeks(112, 36) + Ef(94, 106, 2.5, 2, O) + Ef(106, 106, 2.5, 2, O) + mouth({y: 116}),
    };
  };
  S.rabbit = () => {
    const c = '#F6F2F6', in_ = '#FFC4D2';
    return {
      back: C(150, 190, 13, '#fff', 4),
      body: bodyBase({col: c, belly: '#fff', footPad: in_}),
      headBack: E(76, 24, 15, 42, c, 4, rot(-8, 76, 24)) + Ef(76, 26, 7, 30, in_, rot(-8, 76, 26)) +
                E(124, 24, 15, 42, c, 4, rot(8, 124, 24)) + Ef(124, 26, 7, 30, in_, rot(8, 124, 26)),
      head: head(c, 64, 56, 96),
      face: eyes({y: 94, dx: 24}) + cheeks(112, 38) + Ef(100, 106, 6, 4.5, '#FF8FA3') + mouth({y: 112, teeth: true}),
    };
  };
  S.dog = () => {
    const c = '#F3D6A7', e = '#9C6B47';
    return {
      back: L('M144 188 Q174 184 170 156', 12, O) + L('M144 188 Q174 184 170 156', 6, c),
      body: bodyBase({col: c, belly: '#FFF3DE', footPad: '#E8B985'}),
      headBack: '',
      head: head(c, 66, 58) + Ef(124, 88, 18, 16, '#E0B07A', rot(20, 124, 88)) +
        Ef(100, 114, 28, 20, '#FFF3DE'),
      front: E(40, 104, 17, 34, e, 4, rot(16, 40, 104)) + E(160, 104, 17, 34, e, 4, rot(-16, 160, 104)),
      face: eyes({y: 90, dx: 24}) + cheeks(112, 42) + nose(104, 9) + mouth({y: 116, w: 11}),
    };
  };
  S.cat = () => {
    const c = '#F7B24F', w = '#FFF3E0';
    return {
      back: L('M146 194 Q186 194 178 156 Q174 140 186 132', 12, O) + L('M146 194 Q186 194 178 156 Q174 140 186 132', 6, c),
      body: bodyBase({col: c, belly: w, foot: w}),
      headBack: P('M44 72 L40 22 L82 44 Z', c) + P('M50 62 L48 34 L72 48 Z', '#FFC4D2', 0) +
                P('M156 72 L160 22 L118 44 Z', c) + P('M150 62 L152 34 L128 48 Z', '#FFC4D2', 0),
      head: head(c, 68, 56, 94) + Ef(100, 114, 26, 18, w) +
        L('M100 42 L100 56 M86 44 L89 56 M114 44 L111 56', 4, '#D9862C'),
      face: eyes({y: 92, dx: 25}) + cheeks(110, 42) + Ef(100, 105, 5, 4, '#FF8FA3') + mouth({y: 110, w: 9}) + whiskers(110),
    };
  };
  S.elephant = () => {
    const c = '#AFC0D6', in_ = '#F6C3D2';
    return {
      back: '',
      body: bodyBase({col: c, belly: '#C7D5E6', footPad: '#E8EEF6'}),
      headBack: E(34, 96, 36, 42, c) + Ef(38, 98, 22, 28, in_) + E(166, 96, 36, 42, c) + Ef(162, 98, 22, 28, in_),
      head: head(c, 60, 56, 92),
      face: eyes({y: 86, dx: 24}) + cheeks(106, 38) +
        P('M88 100 Q86 128 92 140 Q98 152 110 146 Q116 142 112 136 Q104 140 102 132 Q100 120 112 100 Z', c, 4) +
        mouth({x: 124, y: 120, w: 7}),
    };
  };
  S.mouse = () => {
    const c = '#C9C3D2', in_ = '#FFC4D2';
    return {
      back: L('M146 196 Q190 200 184 168 Q180 150 192 142', 4, '#E6A0B4'),
      body: bodyBase({col: c, belly: '#ECE8F0', footPad: in_}),
      headBack: C(46, 44, 30, c) + C(46, 46, 19, in_, 0) + C(154, 44, 30, c) + C(154, 46, 19, in_, 0),
      head: head(c, 62, 54, 98),
      face: eyes({y: 96, dx: 23}) + cheeks(114, 38) + Ef(100, 110, 5.5, 4.5, '#FF8FA3') + mouth({y: 116, w: 8, teeth: true}) + whiskers(114),
    };
  };
  S.bear = () => {
    const c = '#A9744C', in_ = '#E5C39E';
    return {
      back: '',
      body: bodyBase({col: c, belly: in_, footPad: in_}),
      headBack: C(44, 42, 22, c) + C(44, 44, 12, in_, 0) + C(156, 42, 22, c) + C(156, 44, 12, in_, 0),
      head: head(c, 66, 58, 94) + Ef(100, 114, 26, 20, in_),
      face: eyes({y: 90, dx: 25}) + cheeks(110, 42) + nose(106, 8) + mouth({y: 118, w: 9}),
    };
  };
  S.chick = () => {
    const c = '#FFD84D';
    return {
      back: '',
      body: bodyBase({col: c, belly: '#FFE98A', arm: '#FFCB2E', foot: '#FF9F3D', wings: true}),
      headBack: P('M98 40 Q90 18 102 20 Q100 30 104 38 Q108 14 118 24 Q108 30 108 42 Z', c, 4),
      head: head(c, 64, 58, 94),
      face: eyes({y: 90, dx: 24}) + cheeks(112, 40) + beak({y: 110}),
    };
  };
  S.pig = () => {
    const c = '#FBBACB', d = '#F393AE';
    return {
      back: L('M146 186 q14 -2 12 -12 q-2 -8 -10 -4 q-6 4 2 10 q10 6 18 -4', 4, O),
      body: bodyBase({col: c, belly: '#FFD3DE', footPad: d}),
      headBack: P('M46 60 L36 24 L78 44 Z', c) + P('M48 52 L44 34 L66 44 Z', d, 0) +
                P('M154 60 L164 24 L122 44 Z', c) + P('M152 52 L156 34 L134 44 Z', d, 0),
      head: head(c, 68, 58, 94),
      face: eyes({y: 88, dx: 27}) + cheeks(108, 46) + E(100, 108, 20, 14, d, 3.5) + Ef(93, 108, 3.5, 5, '#B85A78') + Ef(107, 108, 3.5, 5, '#B85A78') +
        mouth({y: 128, w: 9}),
    };
  };
  S.horse = () => {
    const c = '#D3965F', m = '#7A4A2E';
    return {
      back: P('M144 180 Q180 186 172 214 Q164 200 150 198 Z', m, 4),
      body: bodyBase({col: c, belly: '#E8B887', foot: m}),
      headBack: P('M60 56 L52 18 L84 40 Z', c) + P('M140 56 L148 18 L116 40 Z', c),
      head: head(c, 62, 58, 94) + P('M70 44 Q86 26 104 34 Q118 24 132 42 Q120 40 112 52 Q104 42 94 52 Q86 42 70 44 Z', m, 4) +
        E(100, 118, 34, 22, '#F2CFA6', 4),
      face: eyes({y: 86, dx: 24}) + cheeks(104, 44) + Ef(88, 116, 3.5, 4.5, O) + Ef(112, 116, 3.5, 4.5, O) + mouth({y: 126, w: 9}),
    };
  };
  S.penguin = () => {
    const c = '#3F4C70', w = '#FFFFFF';
    return {
      back: '',
      body: bodyBase({col: c, belly: w, arm: c, foot: '#FF9F3D', wings: true}),
      headBack: '',
      head: head(c, 64, 58, 94) +
        P('M100 80 Q88 60 70 66 Q50 76 56 104 Q62 136 100 140 Q138 136 144 104 Q150 76 130 66 Q112 60 100 80 Z', w, 0),
      face: eyes({y: 96, dx: 22}) + cheeks(116, 36) + beak({y: 114}),
    };
  };
  S.giraffe = () => {
    const c = '#F7CB5E', sp = '#D58A45';
    return {
      back: '',
      body: bodyBase({col: c, belly: '#FBE3A4', foot: sp}) + Ef(66, 156, 9, 7, sp) + Ef(134, 160, 8, 6, sp) + Ef(118, 194, 7, 5, sp),
      headBack: L('M80 44 L74 16', 6) + C(74, 14, 8, sp, 4) + L('M120 44 L126 16', 6) + C(126, 14, 8, sp, 4) +
        E(34, 80, 20, 11, c, 4, rot(-20, 34, 80)) + E(166, 80, 20, 11, c, 4, rot(20, 166, 80)),
      head: head(c, 62, 58, 94) + Ef(64, 64, 9, 7, sp) + Ef(138, 70, 7, 6, sp) + Ef(104, 46, 8, 6, sp) +
        Ef(100, 118, 30, 19, '#FBE3A4'),
      face: eyes({y: 88, dx: 24}) + cheeks(106, 42) + Ef(92, 114, 3, 3.5, O) + Ef(108, 114, 3, 3.5, O) + mouth({y: 124, w: 9}),
    };
  };
  S.panda = () => {
    const w = '#FFFFFF', b = '#2E2A33';
    return {
      back: '',
      body: bodyBase({col: w, belly: null, arm: b, foot: b, footPad: '#5A5560'}),
      headBack: C(44, 44, 22, b) + C(156, 44, 22, b),
      head: head(w, 68, 58, 94) + Ef(75, 92, 16, 20, b, rot(30, 75, 92)) + Ef(125, 92, 16, 20, b, rot(-30, 125, 92)),
      face: eyes({y: 92, dx: 25, s: 8, line: '#fff', dark: '#fff', ring: ''}).replace(/fill="#fff"\/>/g, 'fill="#2B2030"/>') +
        cheeks(116, 46) + nose(108, 7) + mouth({y: 118, w: 8}),
    };
  };
  S.frog = () => {
    const c = '#86CD63', b = '#D8F3B9';
    return {
      back: '',
      body: bodyBase({col: c, belly: b}),
      headBack: C(66, 54, 26, c) + C(134, 54, 26, c),
      head: head(c, 72, 52, 100) + C(66, 54, 18, '#fff', 0) + C(134, 54, 18, '#fff', 0),
      face: eyes({y: 54, dx: 34, s: 10}) + cheeks(112, 48) + Ef(92, 98, 2.5, 2, O) + Ef(108, 98, 2.5, 2, O) + mouth({y: 110, w: 18}),
    };
  };
  S.hamster = () => {
    const c = '#F2B66C', w = '#FFF4E4';
    return {
      back: '',
      body: bodyBase({col: c, belly: w, foot: '#FFC4D2'}),
      headBack: C(50, 48, 18, c) + C(50, 50, 10, '#FFC4D2', 0) + C(150, 48, 18, c) + C(150, 50, 10, '#FFC4D2', 0),
      head: head(c, 70, 58, 96) + Ef(64, 112, 24, 20, w) + Ef(136, 112, 24, 20, w) + Ef(100, 112, 20, 18, w),
      face: eyes({y: 90, dx: 26}) + cheeks(116, 44, 11) + Ef(100, 104, 5, 4, '#FF8FA3') + mouth({y: 110, w: 8, teeth: true}),
    };
  };
  S.cow = () => {
    const w = '#FFFFFF', b = '#3B3440', m = '#FFC2CF';
    return {
      back: L('M146 190 Q174 192 170 166', 4) + Ef(170, 162, 6, 8, b),
      body: bodyBase({col: w, belly: null, foot: b}) + Ef(76, 160, 14, 10, b, rot(-20, 76, 160)) + Ef(130, 186, 11, 8, b),
      headBack: P('M70 46 Q58 24 66 16 Q72 30 82 38 Z', '#FFF0C9', 3.5) + P('M130 46 Q142 24 134 16 Q128 30 118 38 Z', '#FFF0C9', 3.5) +
        E(32, 82, 22, 11, w, 4, rot(-24, 32, 82)) + Ef(34, 82, 12, 5, m, rot(-24, 34, 82)) +
        E(168, 82, 22, 11, w, 4, rot(24, 168, 82)) + Ef(166, 82, 12, 5, m, rot(24, 166, 82)),
      head: head(w, 64, 56, 94) + P('M124 44 Q150 50 156 76 Q140 82 128 70 Q118 58 124 44 Z', b, 0) +
        E(100, 120, 34, 21, m, 4),
      face: eyes({y: 86, dx: 25}) + cheeks(104, 44) + Ef(88, 118, 4, 5, '#C9798E') + Ef(112, 118, 4, 5, '#C9798E') + mouth({y: 128, w: 9}),
    };
  };

  S.lion = () => {
    const c = '#F6BE55', m = '#D0782F';
    const bumps = Array.from({length: 14}, (_, i) => { const a = i / 14 * Math.PI * 2; return C(100 + Math.cos(a) * 66, 94 + Math.sin(a) * 60, 22, m, 4); }).join('');
    return {
      back: L('M146 192 Q180 196 178 168', 5) + C(178, 162, 10, m, 4),
      body: bodyBase({col: c, belly: '#FCE3A8', footPad: '#E9A548'}),
      headBack: bumps + E(100, 94, 74, 66, m, 0),
      head: C(52, 52, 14, c) + C(148, 52, 14, c) + head(c, 60, 54, 96) + Ef(100, 116, 24, 17, '#FFF0CC'),
      face: eyes({y: 92, dx: 22}) + cheeks(110, 38) + nose(106, 7) + mouth({y: 118, w: 9}),
    };
  };
  S.tiger = () => {
    const c = '#F7A243', w = '#FFF6E8', st = '#4A3443';
    return {
      back: L('M146 192 Q182 194 178 160', 12, O) + L('M146 192 Q182 194 178 160', 6, c) + L('M170 190 l4 -8 M178 176 l-7 -3', 3, st),
      body: bodyBase({col: c, belly: w, foot: w}) + L('M54 160 l10 4 M146 160 l-10 4 M58 178 l9 2 M142 178 l-9 2', 3.5, st),
      headBack: C(46, 46, 18, c) + C(46, 48, 9, w, 0) + C(154, 46, 18, c) + C(154, 48, 9, w, 0),
      head: head(c, 68, 58, 94) + Ef(100, 114, 28, 19, w) +
        L('M100 40 L100 54 M88 42 L92 54 M112 42 L108 54 M34 88 L48 90 M36 102 L50 100 M166 88 L152 90 M164 102 L150 100', 4, st),
      face: eyes({y: 90, dx: 25}) + cheeks(108, 42) + Ef(100, 105, 6, 4.5, '#FF8FA3') + mouth({y: 112, w: 9}) + whiskers(112),
    };
  };
  S.fox = () => {
    const c = '#F2813E', w = '#FFF6EC';
    return {
      back: P('M142 196 Q196 196 186 146 Q182 128 170 124 Q176 150 150 172 Z', c, 4) + P('M174 128 Q186 132 186 148 Q178 142 170 134 Z', w, 0),
      body: bodyBase({col: c, belly: w, foot: '#5B3A3A'}),
      headBack: P('M42 74 L44 18 L86 46 Z', c) + P('M50 62 L50 30 L74 48 Z', '#5B3A3A', 0) +
                P('M158 74 L156 18 L114 46 Z', c) + P('M150 62 L150 30 L126 48 Z', '#5B3A3A', 0),
      head: head(c, 68, 56, 94) + P('M34 100 Q60 98 100 126 Q140 98 166 100 Q160 140 100 148 Q40 140 34 100 Z', w, 0),
      face: eyes({y: 90, dx: 25}) + cheeks(112, 44) + nose(112, 7) + mouth({y: 122, w: 8}),
    };
  };
  S.koala = () => {
    const c = '#A8A8B8', w = '#EFEFF5';
    return {
      back: '',
      body: bodyBase({col: c, belly: w, footPad: '#7E7E90'}),
      headBack: C(36, 66, 32, c) + C(36, 68, 20, w, 0) + C(164, 66, 32, c) + C(164, 68, 20, w, 0),
      head: head(c, 66, 58, 96),
      face: eyes({y: 90, dx: 30, s: 8}) + cheeks(114, 44) + E(100, 106, 15, 19, '#4A3E52', 3.5) + Ef(95, 99, 4, 6, '#fff', 'opacity=".4"') + mouth({y: 130, w: 8}),
    };
  };
  S.sheep = () => {
    const wool = '#FFFFFF', f = '#F5E1CF', leg = '#5B4A55';
    const puffs = (pts, r) => pts.map(([x, y]) => C(x, y, r, wool, 4)).join('') + pts.map(([x, y]) => C(x, y, r - 2.5, wool, 0)).join('');
    return {
      back: '',
      body: E(74, 205, 14, 10, leg) + E(126, 205, 14, 10, leg) +
        puffs([[60, 160], [80, 146], [100, 142], [120, 146], [140, 160], [146, 182], [130, 198], [100, 202], [70, 198], [54, 182], [100, 172]], 20),
      headBack: E(36, 96, 22, 11, f, 4, rot(-20, 36, 96)) + E(164, 96, 22, 11, f, 4, rot(20, 164, 96)),
      head: head(f, 56, 54, 100) + puffs([[62, 56], [82, 44], [100, 40], [118, 44], [138, 56], [100, 60], [76, 62], [124, 62]], 17),
      face: eyes({y: 98, dx: 22}) + cheeks(116, 36) + Ef(100, 112, 5, 4, '#FF8FA3') + mouth({y: 120, w: 8}),
    };
  };
  S.duck = () => {
    const c = '#FFFFFF', b = '#FF9F3D';
    const closed = E(100, 112, 24, 9, b, 3.5) + L('M80 112 L120 112', 2.5);
    const open = `<g class="m-open-shape" style="transform-origin:100px 108px">` + E(100, 106, 24, 8, b, 3.5) + E(100, 120, 20, 7, b, 3.5) + Ef(100, 113, 14, 3, '#9B3343') + '</g>';
    return {
      back: P('M144 176 Q170 166 172 150 Q160 160 148 160 Z', c, 4),
      body: bodyBase({col: c, belly: '#F4F7FB', arm: c, foot: b, wings: true}),
      headBack: P('M100 38 Q96 22 106 22 Q104 30 110 36 Z', c, 4),
      head: head(c, 62, 56, 94),
      face: eyes({y: 88, dx: 24}) + cheeks(106, 42) + `<g class="m-smile">${closed}</g><g class="m-open">${open}</g><g class="m-frown">${closed}</g>`,
    };
  };
  S.owl = () => {
    const c = '#A27A5B', f = '#F3E1C8';
    return {
      back: '',
      body: bodyBase({col: c, belly: f, arm: '#8A6347', foot: '#FFB443', wings: true}) + L('M88 170 l6 6 l6 -6 l6 6 l6 -6 M84 186 l6 6 l6 -6 l6 6 l6 -6 l6 6', 3, '#C9A884'),
      headBack: P('M38 56 L40 18 L74 42 Z', c) + P('M162 56 L160 18 L126 42 Z', c),
      head: head(c, 70, 58, 92) + C(72, 90, 26, f, 0) + C(128, 90, 26, f, 0),
      face: eyes({y: 90, dx: 28, s: 12}) + cheeks(116, 50) + beak({y: 108, col: '#FFB443'}),
    };
  };
  S.turtle = () => {
    const c = '#9DD47C', sh = '#5FA25A', bel = '#F6E6A6';
    return {
      back: E(100, 166, 66, 46, sh, 4) + L('M100 126 L100 140 M70 140 L60 128 M130 140 L140 128 M58 176 L40 180 M142 176 L160 180 M80 150 L120 150 L130 172 L100 186 L70 172 Z', 3.5, '#3F7A3E'),
      body: Ef(100, 182, 34, 28, bel) + L('M100 156 L100 208 M70 182 L130 182', 2.5, '#D9C17A') + E(100, 182, 34, 28, 'none', 3.5) +
        E(58, 176, 13, 17, c, 4, rot(25, 58, 176)) + E(142, 176, 13, 17, c, 4, rot(-25, 142, 176)) + E(74, 205, 18, 10, c) + E(126, 205, 18, 10, c),
      headBack: '',
      head: head(c, 60, 52, 92),
      face: eyes({y: 88, dx: 23}) + cheeks(106, 40) + Ef(94, 100, 2.5, 2, O) + Ef(106, 100, 2.5, 2, O) + mouth({y: 110, w: 12}),
    };
  };
  S.octopus = () => {
    const c = '#F78FB8', d = '#E26E9C';
    const tent = [40, 66, 92, 118, 144].map((x, i) => P(`M${x + 8} 140 Q${x - 4} 180 ${x + 6} 200 Q${x + 14} 214 ${x + 22} 204 Q${x + 12} 190 ${x + 22} 150 Z`, c, 4)).join('');
    return {
      back: '',
      body: tent + [48, 74, 100, 126, 152].map(x => Ef(x + 6, 190, 3, 3, d)).join(''),
      headBack: '',
      head: E(100, 88, 66, 64, c) + Ef(70, 50, 10, 7, d, 'opacity=".6"') + Ef(130, 56, 7, 5, d, 'opacity=".6"'),
      face: eyes({y: 96, dx: 24}) + cheeks(114, 40) + mouth({y: 120, w: 8}),
    };
  };
  S.seal = () => {
    const c = '#B6C7D2', w = '#E4EDF3';
    return {
      back: '',
      body: E(100, 172, 50, 40, c) + Ef(100, 180, 30, 26, w) + P('M58 166 Q34 182 42 196 Q56 192 64 180 Z', c) + P('M142 166 Q166 182 158 196 Q144 192 136 180 Z', c) +
        P('M76 206 Q60 216 56 206 Q64 196 84 198 Z', c) + P('M124 206 Q140 216 144 206 Q136 196 116 198 Z', c),
      headBack: '',
      head: head(c, 64, 58, 94) + C(88, 114, 14, w, 0) + C(112, 114, 14, w, 0),
      face: eyes({y: 88, dx: 25}) + cheeks(108, 44) + Ef(100, 104, 8, 6, O) + L('M84 114 L64 110 M84 120 L64 122 M116 114 L136 110 M116 120 L136 122', 2.5) + mouth({y: 124, w: 7}),
    };
  };
  S.squirrel = () => {
    const c = '#C97A40', w = '#FCE7CF';
    return {
      back: P('M138 196 Q196 190 188 120 Q184 70 146 76 Q168 96 160 124 Q152 150 132 168 Z', c, 4) + L('M170 92 Q180 120 168 150', 3, '#A35E2E'),
      body: bodyBase({col: c, belly: w, foot: c}),
      headBack: P('M52 56 L50 22 L76 44 Z', c) + P('M148 56 L150 22 L124 44 Z', c),
      head: head(c, 62, 56, 96) + Ef(100, 116, 26, 18, w),
      face: eyes({y: 92, dx: 24}) + cheeks(112, 40, 11) + Ef(100, 106, 5, 4, O) + mouth({y: 114, w: 8, teeth: true}),
    };
  };
  S.hedgehog = () => {
    const f = '#F4D7B6', sp = '#8A6249';
    const spikes = Array.from({length: 13}, (_, i) => { const a = Math.PI * (1.02 + i / 12 * .96); const x = 100 + Math.cos(a) * 70, y = 98 + Math.sin(a) * 64, x2 = 100 + Math.cos(a) * 96, y2 = 98 + Math.sin(a) * 88;
      const a1 = a - .14, a2 = a + .14; return `${100 + Math.cos(a1) * 66} ${98 + Math.sin(a1) * 60} L${x2} ${y2} L${100 + Math.cos(a2) * 66} ${98 + Math.sin(a2) * 60}`; });
    return {
      back: P('M40 150 L30 140 L46 136 L38 120 L56 124 L60 110 L140 110 L144 124 L162 120 L154 136 L170 140 L160 150 Q170 190 140 200 L60 200 Q30 190 40 150 Z', sp, 4),
      body: bodyBase({col: f, belly: '#FFF4E6', arm: f, foot: f}),
      headBack: P('M' + spikes.join(' L') + ' Z', sp, 4),
      head: head(f, 64, 56, 98) + C(54, 58, 10, f) + C(146, 58, 10, f),
      face: eyes({y: 96, dx: 23}) + cheeks(114, 40) + nose(108, 6) + mouth({y: 118, w: 8}),
    };
  };
  S.raccoon = () => {
    const c = '#A3A1AF', m = '#4A4250', w = '#F4F3F7';
    return {
      back: L('M146 192 Q186 194 180 152', 14, O) + L('M146 192 Q186 194 180 152', 8, c) + L('M162 194 l2 -10 M176 186 l-8 -6 M180 168 l-9 -1', 5, m),
      body: bodyBase({col: c, belly: w, foot: m}),
      headBack: P('M44 66 L46 22 L84 44 Z', c) + P('M52 58 L52 34 L72 46 Z', w, 0) + P('M156 66 L154 22 L116 44 Z', c) + P('M148 58 L148 34 L128 46 Z', w, 0),
      head: head(c, 68, 56, 94) + P('M36 92 Q60 70 100 86 Q140 70 164 92 Q150 112 122 104 Q100 96 78 104 Q50 112 36 92 Z', m, 0) +
        L('M60 72 Q74 66 86 72 M114 72 Q126 66 140 72', 4, w) + Ef(100, 116, 24, 16, w),
      face: eyes({y: 90, dx: 26, s: 8}).replace(/fill="#2B2030"/g, 'fill="#2B2030" stroke="#fff" stroke-width="2"') + cheeks(112, 44) + nose(110, 7) + mouth({y: 120, w: 8}),
    };
  };
  S.deer = () => {
    const c = '#CD8C56', w = '#FBEBD6', an = '#8A5A36';
    return {
      back: '',
      body: bodyBase({col: c, belly: w, foot: an}) + C(68, 154, 4, w, 0) + C(134, 158, 4, w, 0) + C(76, 168, 3, w, 0),
      headBack: L('M74 46 L60 10 M66 26 L50 24 M62 16 L72 6', 6, an) + L('M126 46 L140 10 M134 26 L150 24 M138 16 L128 6', 6, an) +
        E(32, 86, 24, 11, c, 4, rot(-24, 32, 86)) + Ef(34, 86, 13, 5, '#FFC4D2', rot(-24, 34, 86)) + E(168, 86, 24, 11, c, 4, rot(24, 168, 86)) + Ef(166, 86, 13, 5, '#FFC4D2', rot(24, 166, 86)),
      head: head(c, 60, 56, 94) + Ef(100, 116, 24, 17, w) + C(80, 58, 4, w, 0) + C(120, 60, 3.5, w, 0) + C(100, 50, 3, w, 0),
      face: eyes({y: 90, dx: 23}) + cheeks(108, 40) + nose(108, 7) + mouth({y: 120, w: 8}),
    };
  };
  S.dino = () => {
    const c = '#86CF95', sp = '#F7C94E';
    return {
      back: P('M140 186 Q190 190 196 160 Q176 176 146 168 Z', c, 4) +
        [[60, 44], [82, 30], [106, 26], [130, 32], [150, 48]].map(([x, y]) => P(`M${x - 11} ${y + 14} L${x} ${y - 10} L${x + 11} ${y + 14} Z`, sp, 3.5)).join(''),
      body: bodyBase({col: c, belly: '#D8F2C7', footPad: '#5FA76E'}) + L('M88 168 L112 168 M86 182 L114 182 M90 196 L110 196', 2.5, '#A8DCA0'),
      headBack: '',
      head: head(c, 70, 58, 96),
      face: eyes({y: 90, dx: 26}) + cheeks(112, 44) + Ef(92, 104, 2.5, 2, O) + Ef(108, 104, 2.5, 2, O) + mouth({y: 116, w: 16}),
    };
  };
  S.unicorn = () => {
    const c = '#FFFFFF', mane = ['#FF9EC7', '#C69CFF', '#8FD3FF', '#FFE07A'];
    return {
      back: mane.map((m, i) => L(`M146 ${178 + i * 4} Q${176 + i * 3} ${186 + i * 6} ${168 + i * 4} ${212}`, 7, m)).join(''),
      body: bodyBase({col: c, belly: '#FFF5FB', foot: '#FFB3D1'}),
      headBack: P('M60 56 L52 18 L84 40 Z', c) + P('M140 56 L148 18 L116 40 Z', c) +
        P('M90 40 L100 0 L110 40 Z', '#FFD45E', 3.5) + L('M93 30 L106 26 M95 20 L105 17', 2.5, '#E8A92E'),
      head: head(c, 62, 58, 94) +
        mane.map((m, i) => P(`M${64 + i * 8} ${50 + i * 4} Q${86 + i * 6} ${34 + i * 2} ${108 + i * 6} ${44 + i * 3} Q${92 + i * 6} ${46 + i * 3} ${70 + i * 8} ${62 + i * 5} Z`, m, 0)).join('') +
        E(100, 118, 32, 21, '#FFF0F6', 4),
      face: eyes({y: 88, dx: 24}) + cheeks(106, 44) + Ef(90, 116, 3, 4, '#E58FB0') + Ef(110, 116, 3, 4, '#E58FB0') + mouth({y: 126, w: 9}),
    };
  };

  function svg(kind, cls = '') {
    const p = S[kind]();
    return `<svg class="critter-svg ${cls}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g class="breathe">${p.back || ''}${p.body}${p.headBack || ''}${p.head}${p.front || ''}${p.face}${wet}</g></svg>`;
  }
  return {svg, kinds: Object.keys(S)};
})();
