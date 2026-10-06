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
  };
  const cache = {};
  function svg(name) {
    if (!cache[name]) cache[name] = `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${S[name]()}</svg>`;
    return cache[name];
  }
  return {svg, names: Object.keys(S)};
})();
