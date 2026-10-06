/* ===== 背景場景（SVG）===== viewBox 1600x1000，底部對齊、裁切兩側 */
const SCENES = (() => {
  const O = '#4A3443';
  const rnd = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
  const sky = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".75" stop-color="${b}"/></linearGradient></defs><rect width="1600" height="1000" fill="url(#${id})"/>`;
  const cloud = (x, y, s = 1, o = .9) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}" fill="#fff"><rect x="-90" y="-10" width="180" height="56" rx="28"/><circle cx="-30" cy="-6" r="40"/><circle cx="30" cy="2" r="30"/></g>`;
  const sun = (x, y, r = 70, c = '#FFC93C') => `<circle cx="${x}" cy="${y}" r="${r * 1.35}" fill="${c}" opacity=".3"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
  const hill = (cx, cy, rx, ry, c) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`;
  const flower = (x, y, c) => `<g transform="translate(${x} ${y})"><circle r="9" cx="0" cy="-10" fill="${c}"/><circle r="9" cx="10" cy="0" fill="${c}"/><circle r="9" cx="0" cy="10" fill="${c}"/><circle r="9" cx="-10" cy="0" fill="${c}"/><circle r="7" fill="#FFE07A"/></g>`;
  const pine = (x, y, s, c, snow) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-10" width="20" height="40" fill="#8A5A36"/>
    <path d="M0 -190 L70 -60 L40 -60 L90 10 L-90 10 L-40 -60 L-70 -60 Z" fill="${c}"/>${snow ? '<path d="M0 -190 L34 -128 Q18 -118 0 -130 Q-18 -118 -34 -128 Z M-50 -68 Q0 -50 50 -68 L60 -60 L-60 -60 Z" fill="#fff"/>' : ''}</g>`;
  const round = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-12" y="-20" width="24" height="70" rx="8" fill="#8A5A36"/><circle cx="0" cy="-70" r="70" fill="${c}"/><circle cx="-50" cy="-30" r="45" fill="${c}"/><circle cx="50" cy="-30" r="45" fill="${c}"/></g>`;
  const grass = (x, y, c) => `<path d="M${x - 14} ${y} Q${x - 10} ${y - 26} ${x - 4} ${y - 34} Q${x - 2} ${y - 16} ${x} ${y - 4} Q${x + 4} ${y - 30} ${x + 14} ${y - 38} Q${x + 10} ${y - 14} ${x + 14} ${y} Z" fill="${c}"/>`;

  // 小動物客串：把 Q 版動物縮小放進背景裡（固定表情、不會動）
  const cam = (k, x, y, w, flip) => typeof ART === 'undefined' ? '' :
    ART.svg(k).replace('<svg class="critter-svg ', `<svg x="${x}" y="${y}" width="${w}" height="${w * 1.1}" class="cameo ${flip ? 'flip ' : ''}`);
  const butterfly = (x, y, c, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-14" cy="-6" rx="14" ry="11" fill="${c}" stroke="${O}" stroke-width="3"/><ellipse cx="14" cy="-6" rx="14" ry="11" fill="${c}" stroke="${O}" stroke-width="3"/><ellipse cx="-10" cy="10" rx="9" ry="8" fill="${c}" stroke="${O}" stroke-width="3"/><ellipse cx="10" cy="10" rx="9" ry="8" fill="${c}" stroke="${O}" stroke-width="3"/><rect x="-3" y="-14" width="6" height="30" rx="3" fill="${O}"/></g>`;
  const fish = (x, y, c, s = 1, left) => `<g transform="translate(${x} ${y}) scale(${left ? -s : s} ${s})"><path d="M-30 0 Q0 -26 26 0 Q0 26 -30 0 Z" fill="${c}" stroke="${O}" stroke-width="4"/><path d="M-28 0 L-50 -16 L-46 0 L-50 16 Z" fill="${c}" stroke="${O}" stroke-width="4" stroke-linejoin="round"/><circle cx="12" cy="-4" r="4" fill="${O}"/></g>`;
  const bubble = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="3" opacity=".8"/>`;
  const leaf = (x, y, r, s, c) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0 0 Q60 -70 160 -20 Q80 40 0 0 Z" fill="${c}" stroke="#2F6B3E" stroke-width="5"/><path d="M10 -2 Q80 -30 150 -20" stroke="#2F6B3E" stroke-width="4" fill="none"/></g>`;

  const S = {
    meadow: () => sky('skm', '#8FD6F5', '#E6F7FC') + sun(1320, 170) + cloud(360, 180) + cloud(980, 260, .75, .75) +
      hill(1250, 1000, 760, 380, '#A6DB8C') + hill(350, 1060, 900, 420, '#7CC86A') +
      [[180, 820, '#FF9EC7'], [420, 900, '#fff'], [1300, 860, '#FFB443'], [1460, 930, '#FF9EC7'], [660, 960, '#fff']].map(f => flower(...f)).join(''),
    farm: () => sky('skf', '#9ADCF7', '#EAF8FC') + sun(250, 160, 60) + cloud(800, 160, .8) + cloud(1350, 240, .6, .8) +
      hill(1100, 900, 900, 260, '#B5E08F') +
      `<g transform="translate(1260 470)"><path d="M-150 120 L-150 -40 L0 -140 L150 -40 L150 120 Z" fill="#E8574A" stroke="${O}" stroke-width="8" stroke-linejoin="round"/>
        <path d="M-170 -30 L0 -160 L170 -30" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="-55" y="20" width="110" height="100" fill="#B33D33" stroke="${O}" stroke-width="7"/><path d="M-55 20 L55 120 M55 20 L-55 120" stroke="#fff" stroke-width="8"/>
        <rect x="-30" y="-70" width="60" height="50" fill="#FFF3D6" stroke="${O}" stroke-width="6"/></g>` +
      `<rect x="0" y="600" width="1600" height="400" fill="#8FD06C"/>` +
      Array.from({length: 18}, (_, i) => `<rect x="${i * 95 + 10}" y="560" width="22" height="90" rx="6" fill="#FFF3D6" stroke="${O}" stroke-width="5"/>`).join('') +
      `<rect x="0" y="580" width="1600" height="16" fill="#FFF3D6" stroke="${O}" stroke-width="5"/><rect x="0" y="616" width="1600" height="16" fill="#FFF3D6" stroke="${O}" stroke-width="5"/>` +
      `<g transform="translate(240 720)"><rect x="-90" y="-60" width="180" height="120" rx="30" fill="#F2C75C" stroke="${O}" stroke-width="7"/><path d="M-60 -60 L-60 60 M60 -60 L60 60" stroke="#D9A73A" stroke-width="8"/></g>` +
      [[700, 900], [1000, 960], [1480, 880], [420, 980]].map(([x, y]) => grass(x, y, '#6DB955')).join(''),
    forest: () => sky('skr', '#BCE6D6', '#EEF8F0') + sun(1300, 150, 55, '#FFE08A') +
      [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => pine(i * 200 + 40, 600, .9, '#9ACFA6')).join('') +
      hill(800, 1000, 1100, 420, '#79C478') +
      [[140, 760, 1.2], [1460, 740, 1.3], [480, 690, .9], [1180, 700, 1]].map(([x, y, s]) => pine(x, y, s, '#4E9E63')).join('') +
      round(820, 660, .9, '#5BB06A') +
      `<g transform="translate(330 900)"><rect x="-14" y="-10" width="28" height="44" rx="10" fill="#FFF3D6" stroke="${O}" stroke-width="5"/><path d="M-50 -6 Q0 -70 50 -6 Z" fill="#E8574A" stroke="${O}" stroke-width="5"/><circle cx="-18" cy="-24" r="7" fill="#fff"/><circle cx="14" cy="-30" r="6" fill="#fff"/></g>` +
      `<g transform="translate(1290 930) scale(.8)"><rect x="-14" y="-10" width="28" height="44" rx="10" fill="#FFF3D6" stroke="${O}" stroke-width="5"/><path d="M-50 -6 Q0 -70 50 -6 Z" fill="#FFB443" stroke="${O}" stroke-width="5"/><circle cx="-18" cy="-24" r="7" fill="#fff"/></g>`,
    beach: () => sky('skb', '#7FD1F7', '#DDF4FD') + sun(1280, 170, 75) + cloud(420, 200, .9) + cloud(900, 140, .6, .7) +
      `<rect x="0" y="560" width="1600" height="200" fill="#4DB6E8"/>` +
      `<path d="M0 560 ${Array.from({length: 17}, (_, i) => `Q${i * 100 + 50} 540 ${i * 100 + 100} 560`).join(' ')} L1600 600 L0 600 Z" fill="#7FCDF0"/>` +
      `<path d="M0 640 ${Array.from({length: 17}, (_, i) => `Q${i * 100 + 50} 625 ${i * 100 + 100} 640`).join(' ')}" fill="none" stroke="#fff" stroke-width="6" opacity=".6"/>` +
      `<path d="M0 720 Q400 680 800 710 Q1200 740 1600 700 L1600 1000 L0 1000 Z" fill="#F7E0A6"/>` +
      `<g transform="translate(200 760)"><path d="M0 0 Q20 -160 60 -300" stroke="#9C6B47" stroke-width="30" fill="none" stroke-linecap="round"/>
        <g transform="translate(60 -300)" fill="#5DBB4F"><path d="M0 0 Q-90 -40 -160 30 Q-80 0 0 0"/><path d="M0 0 Q90 -50 170 20 Q80 -5 0 0"/><path d="M0 0 Q-30 -100 -100 -120 Q-30 -60 0 0"/><path d="M0 0 Q40 -100 110 -110 Q40 -50 0 0"/></g></g>` +
      `<g transform="translate(1350 900)"><path d="M-40 20 Q0 -50 40 20 Z" fill="#FFB3C6" stroke="${O}" stroke-width="5"/><path d="M-20 15 L-8 -20 M0 18 L0 -28 M20 15 L8 -20" stroke="${O}" stroke-width="3"/></g>` +
      `<circle cx="560" cy="930" r="14" fill="#fff" stroke="${O}" stroke-width="4"/><circle cx="1080" cy="960" r="10" fill="#FFD3A0" stroke="${O}" stroke-width="4"/>`,
    snow: () => sky('sks', '#C6E6F7', '#F2FAFE') + `<circle cx="1300" cy="160" r="60" fill="#FFF6D0"/>` +
      Array.from({length: 40}, (_, i) => `<circle cx="${rnd(i) * 1600 | 0}" cy="${rnd(i + 99) * 560 | 0}" r="${4 + (i % 4) * 2}" fill="#fff" opacity=".9"/>`).join('') +
      hill(1200, 900, 800, 300, '#EAF5FC') + hill(300, 880, 700, 260, '#F6FBFF') +
      [[140, 700, 1], [1450, 680, 1.1], [1250, 660, .7], [380, 650, .7]].map(([x, y, s]) => pine(x, y, s, '#5FA77A', true)).join('') +
      hill(800, 1080, 1200, 420, '#FFFFFF') +
      `<g transform="translate(1180 820)"><path d="M-120 60 A120 120 0 0 1 120 60 Z" fill="#fff" stroke="#9CC6E0" stroke-width="7"/>
        <path d="M-85 10 L85 10 M-110 40 L110 40 M-40 -50 L-40 10 M40 -50 L40 10 M0 10 L0 40 M-70 40 L-70 60 M70 40 L70 60" stroke="#B5D7EC" stroke-width="5"/>
        <path d="M-36 60 A36 40 0 0 1 36 60 Z" fill="#7BA9C9"/></g>`,
    savanna: () => sky('skv', '#FFD39A', '#FFF3DD') + sun(1180, 300, 110, '#FF9F45') + cloud(400, 200, .7, .6) +
      hill(1300, 760, 700, 140, '#E9B96A') + `<rect x="0" y="640" width="1600" height="360" fill="#E8C46A"/>` +
      hill(500, 1050, 1000, 330, '#DDB656') +
      `<g transform="translate(330 640)" fill="#7E5B34"><path d="M-10 0 L-6 -130 L-40 -190 M-6 -130 L40 -200 L46 -210 M-6 -100 L-60 -150" stroke="#7E5B34" stroke-width="14" fill="none" stroke-linecap="round"/>
        <ellipse cx="-50" cy="-200" rx="90" ry="26" fill="#6E9E46"/><ellipse cx="50" cy="-215" rx="100" ry="28" fill="#7BAE50"/></g>` +
      `<g transform="translate(1420 680) scale(.7)" fill="#7E5B34"><path d="M-10 0 L-6 -130 L-40 -190 M-6 -130 L40 -200" stroke="#7E5B34" stroke-width="14" fill="none" stroke-linecap="round"/>
        <ellipse cx="-40" cy="-200" rx="80" ry="24" fill="#6E9E46"/><ellipse cx="40" cy="-210" rx="90" ry="26" fill="#7BAE50"/></g>` +
      [[200, 900], [700, 860], [1100, 940], [1500, 880], [880, 990]].map(([x, y]) => grass(x, y, '#C99A3E')).join(''),
    night: () => sky('skn', '#2E3A73', '#7A6BB5') +
      Array.from({length: 46}, (_, i) => `<circle cx="${rnd(i + 7) * 1600 | 0}" cy="${rnd(i + 300) * 600 | 0}" r="${2 + (i % 3) * 1.5}" fill="#FFF6C8" opacity="${.5 + (i % 5) / 10}"/>`).join('') +
      `<defs><mask id="moonm"><rect width="1600" height="1000" fill="#fff"/><circle cx="1300" cy="150" r="70" fill="#000"/></mask></defs><circle cx="1260" cy="180" r="80" fill="#FFF1B8" mask="url(#moonm)"/>` +
      hill(1250, 1000, 760, 380, '#3E7A58') + hill(350, 1060, 900, 420, '#2F6648') +
      `<g fill="#FFE98A">${[[300, 800], [520, 760], [1180, 820], [1400, 780], [900, 900]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7"/><circle cx="${x}" cy="${y}" r="18" opacity=".25"/>`).join('')}</g>`,
    bathroom: () => `<rect width="1600" height="1000" fill="#D3EEF8"/>` +
      `<g stroke="#BFE2F0" stroke-width="5">${Array.from({length: 17}, (_, i) => `<path d="M${i * 100} 0 V700"/>`).join('')}${Array.from({length: 8}, (_, i) => `<path d="M0 ${i * 100} H1600"/>`).join('')}</g>` +
      `<rect x="0" y="690" width="1600" height="310" fill="#F7D9E2"/>` +
      `<g stroke="#F0C3D1" stroke-width="5">${Array.from({length: 9}, (_, i) => `<path d="M${i * 200} 690 V1000"/>`).join('')}<path d="M0 845 H1600"/></g>` +
      `<rect x="0" y="680" width="1600" height="16" fill="#fff"/>` +
      `<g transform="translate(230 210)"><rect x="-130" y="-110" width="260" height="220" rx="24" fill="#9ADCF7" stroke="#fff" stroke-width="18"/>
        <path d="M0 -110 V110 M-130 0 H130" stroke="#fff" stroke-width="12"/><circle cx="60" cy="-55" r="28" fill="#FFE08A"/></g>` +
      `<g transform="translate(1350 260)"><rect x="-150" y="-8" width="300" height="16" rx="8" fill="#C9A884"/>
        <path d="M-110 8 h70 v150 q-35 20 -70 0 Z" fill="#FF9EC7"/><path d="M-20 8 h70 v130 q-35 20 -70 0 Z" fill="#9ADCF7"/><path d="M70 8 h60 v110 q-30 16 -60 0 Z" fill="#FFE07A"/></g>` +
      `<g transform="translate(1300 600)"><rect x="-120" y="-10" width="240" height="20" rx="8" fill="#fff"/><g transform="translate(-60 -40)">
        <ellipse cx="0" cy="10" rx="34" ry="24" fill="#FFD84D" stroke="${O}" stroke-width="5"/><circle cx="18" cy="-18" r="20" fill="#FFD84D" stroke="${O}" stroke-width="5"/>
        <path d="M34 -16 L50 -12 L34 -6 Z" fill="#FF9F3D" stroke="${O}" stroke-width="4"/><circle cx="22" cy="-22" r="4" fill="${O}"/></g>
        <rect x="20" y="-70" width="40" height="60" rx="10" fill="#8FD3FF" stroke="${O}" stroke-width="5"/><rect x="30" y="-86" width="20" height="18" rx="4" fill="#FF9EC7" stroke="${O}" stroke-width="4"/></g>` +
      Array.from({length: 9}, (_, i) => `<circle cx="${180 + i * 160}" cy="${120 + (i % 3) * 120}" r="${14 + (i % 3) * 8}" fill="#fff" opacity=".55" stroke="#fff" stroke-width="3"/>`).join(''),

    /* ---- 動物主題背景 ---- */
    zoo: () => sky('skz', '#9ADCF7', '#EAF8FC') + sun(1340, 150, 60) + cloud(320, 170, .8) + cloud(900, 120, .55, .8) +
      hill(800, 1000, 1200, 420, '#8FD06C') +
      `<g transform="translate(800 470)"><rect x="-260" y="-150" width="40" height="300" rx="10" fill="#C98A55" stroke="${O}" stroke-width="7"/><rect x="220" y="-150" width="40" height="300" rx="10" fill="#C98A55" stroke="${O}" stroke-width="7"/>
        <path d="M-280 -150 Q0 -290 280 -150 L280 -100 Q0 -230 -280 -100 Z" fill="#5DBB4F" stroke="${O}" stroke-width="7" stroke-linejoin="round"/>
        ${[-170, -60, 60, 170].map((x, i) => `<circle cx="${x}" cy="${-170 - (i === 1 || i === 2 ? 40 : 0)}" r="26" fill="#FFE07A" stroke="${O}" stroke-width="5"/><path d="M${x - 8} ${-166 - (i === 1 || i === 2 ? 40 : 0)} a8 8 0 1 0 16 0" fill="${O}"/>`).join('')}</g>` +
      `<g stroke="${O}" stroke-width="5">${Array.from({length: 7}, (_, i) => `<rect x="${i * 48 + 10}" y="560" width="14" height="140" rx="6" fill="#B9A98F"/>`).join('')}${Array.from({length: 7}, (_, i) => `<rect x="${1260 + i * 48}" y="560" width="14" height="140" rx="6" fill="#B9A98F"/>`).join('')}</g>` +
      `<rect x="0" y="580" width="340" height="14" fill="#B9A98F" stroke="${O}" stroke-width="5"/><rect x="1260" y="580" width="340" height="14" fill="#B9A98F" stroke="${O}" stroke-width="5"/>` +
      cam('giraffe', 90, 380, 220) + cam('elephant', 1300, 470, 220) +
      `<g transform="translate(560 300)"><path d="M0 60 Q-6 140 4 220" stroke="${O}" stroke-width="3" fill="none"/><ellipse cx="0" cy="20" rx="40" ry="48" fill="#FF6B8B" stroke="${O}" stroke-width="5"/></g>` +
      `<g transform="translate(1060 260)"><path d="M0 60 Q8 140 -2 220" stroke="${O}" stroke-width="3" fill="none"/><ellipse cx="0" cy="20" rx="36" ry="44" fill="#8FD3FF" stroke="${O}" stroke-width="5"/></g>`,
    pond: () => sky('skp', '#A6E0F5', '#EEF9F2') + sun(1300, 160, 60) + cloud(420, 190, .8) +
      hill(1200, 880, 800, 280, '#A8DB8A') + `<rect x="0" y="620" width="1600" height="380" fill="#86CD6A"/>` +
      `<ellipse cx="800" cy="800" rx="640" ry="150" fill="#5DB7E4" stroke="#3E95C4" stroke-width="8"/><ellipse cx="760" cy="780" rx="520" ry="100" fill="#79C9EE"/>` +
      [[430, 790, 1], [1150, 830, .9], [820, 740, .7], [600, 860, .8]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 m-70 0 a70 34 0 1 0 140 0 a70 34 0 1 0 -140 0 Z M0 0 L60 -14 L58 10 Z" fill="#5DBB4F" stroke="#3F8F3E" stroke-width="5" fill-rule="evenodd"/></g>`).join('') +
      `<g transform="translate(1000 760)"><circle r="18" fill="#FF9EC7" stroke="${O}" stroke-width="4"/><circle r="8" fill="#FFE07A"/></g>` +
      [[160, 760], [200, 770], [1440, 760], [1490, 770]].map(([x, y]) => `<path d="M${x} ${y} Q${x - 6} ${y - 140} ${x + 4} ${y - 200}" stroke="#4E9E43" stroke-width="8" fill="none"/><rect x="${x - 10}" y="${y - 230}" width="22" height="60" rx="11" fill="#8A5A36"/>`).join('') +
      cam('frog', 360, 640, 150) + cam('duck', 1080, 690, 140, true),
    underwater: () => `<defs><linearGradient id="skw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5CC3EE"/><stop offset="1" stop-color="#1F78B8"/></linearGradient></defs><rect width="1600" height="1000" fill="url(#skw)"/>` +
      [200, 600, 1000, 1400].map(x => `<path d="M${x} 0 L${x + 120} 0 L${x + 300} 760 L${x + 140} 760 Z" fill="#fff" opacity=".08"/>`).join('') +
      `<path d="M0 820 Q300 770 600 810 Q1000 860 1300 800 Q1450 780 1600 810 L1600 1000 L0 1000 Z" fill="#F2D59A"/>` +
      [[120, 820, '#FF8FA3'], [1460, 810, '#FFB443'], [330, 850, '#B48CF2']].map(([x, y, c]) => `<g transform="translate(${x} ${y})" stroke="${O}" stroke-width="6" stroke-linecap="round" fill="none"><path d="M0 0 V-120 M0 -60 Q-50 -80 -50 -140 M0 -80 Q40 -100 46 -160" stroke="${c}" stroke-width="22"/></g>`).join('') +
      [[240, 830], [1300, 820], [1380, 830]].map(([x, y]) => `<path d="M${x} ${y} Q${x - 30} ${y - 80} ${x} ${y - 160} Q${x + 30} ${y - 240} ${x} ${y - 300}" stroke="#4DAA6A" stroke-width="16" fill="none" stroke-linecap="round"/>`).join('') +
      fish(520, 240, '#FFB443', 1.2) + fish(1180, 330, '#FF8FA3', 1, true) + fish(360, 470, '#8FD3FF', .9, true) + fish(1420, 520, '#FFE07A', .9) +
      [[300, 300, 14], [320, 250, 9], [1100, 200, 16], [1120, 150, 10], [800, 120, 12]].map(([x, y, r]) => bubble(x, y, r)).join('') +
      cam('octopus', 1320, 600, 180) + cam('turtle', 60, 600, 170),
    jungle: () => sky('skj', '#9FDCB8', '#E3F6E8') + sun(1250, 140, 55, '#FFE08A') +
      hill(800, 1000, 1200, 420, '#4FA35E') +
      [[-40, 300, 20, 1.6, '#3E8F4E'], [1640, 260, 160, 1.6, '#3E8F4E'], [0, 700, -10, 1.4, '#5DB86A'], [1600, 680, 190, 1.4, '#5DB86A'], [100, 140, 40, 1.2, '#6CC277'], [1500, 120, 140, 1.2, '#6CC277']].map(a => leaf(...a)).join('') +
      `<path d="M380 0 Q360 160 400 280 Q420 340 400 400" stroke="#6E9E46" stroke-width="12" fill="none"/><path d="M1220 0 Q1250 140 1210 260" stroke="#6E9E46" stroke-width="12" fill="none"/>` +
      [[392, 140], [404, 230], [1238, 120], [1222, 200]].map(([x, y]) => `<ellipse cx="${x + 18}" cy="${y}" rx="18" ry="9" fill="#7BAE50" transform="rotate(-30 ${x + 18} ${y})"/>`).join('') +
      `<g transform="translate(1210 300)"><ellipse cx="0" cy="0" rx="32" ry="44" fill="#E8453C" stroke="${O}" stroke-width="5"/><circle cx="6" cy="-34" r="26" fill="#E8453C" stroke="${O}" stroke-width="5"/><path d="M26 -38 Q48 -30 30 -18 Z" fill="#FFE07A" stroke="${O}" stroke-width="4"/><circle cx="12" cy="-40" r="5" fill="${O}"/><path d="M-20 30 L-34 80 M0 40 L-6 90" stroke="#5BC0F0" stroke-width="12" stroke-linecap="round"/></g>` +
      cam('monkey', 300, 300, 170) + cam('tiger', 1340, 620, 210, true),
    garden: () => sky('skg', '#A9E2F7', '#F0FAF4') + sun(250, 150, 60) + cloud(900, 160, .8) + cloud(1350, 230, .6, .8) +
      hill(800, 1000, 1200, 420, '#8BD06B') +
      [[120, 760, '#FF9EC7', 1.4], [260, 820, '#FFE07A', 1.2], [1350, 770, '#B48CF2', 1.4], [1480, 830, '#FF9EC7', 1.2], [700, 940, '#fff', 1], [960, 900, '#FFB443', 1.1]].map(([x, y, c, s]) =>
        `<path d="M${x} ${y} V${y + 120}" stroke="#4E9E43" stroke-width="8"/><g transform="translate(${x} ${y}) scale(${s})">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-22" rx="16" ry="24" fill="${c}" stroke="${O}" stroke-width="4" transform="rotate(${a})"/>`).join('')}<circle r="14" fill="#FFC93C" stroke="${O}" stroke-width="4"/></g>`).join('') +
      butterfly(520, 330, '#FF9EC7', 1.2) + butterfly(1100, 420, '#8FD3FF') + butterfly(1250, 300, '#FFE07A', .9) +
      `<g transform="translate(700 520)"><ellipse rx="22" ry="16" fill="#FFD84D" stroke="${O}" stroke-width="4"/><path d="M-6 -15 V15 M6 -15 V15" stroke="${O}" stroke-width="5"/><ellipse cx="-6" cy="-20" rx="10" ry="8" fill="#fff" opacity=".85" stroke="${O}" stroke-width="3"/><ellipse cx="8" cy="-20" rx="10" ry="8" fill="#fff" opacity=".85" stroke="${O}" stroke-width="3"/></g>` +
      `<g transform="translate(480 930)"><path d="M-26 0 A26 22 0 0 1 26 0 Z" fill="#E8453C" stroke="${O}" stroke-width="4"/><circle cx="-8" cy="-10" r="4" fill="${O}"/><circle cx="8" cy="-8" r="4" fill="${O}"/></g>` +
      cam('rabbit', 30, 600, 180) + cam('hedgehog', 1400, 650, 170, true),
  };
  const cache = {};
  function svg(name) {
    if (!cache[name]) cache[name] = `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${S[name]()}</svg>`;
    return cache[name];
  }
  return {svg, names: Object.keys(S)};
})();
