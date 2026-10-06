(() => {
  /* ================= data ================= */
  // 每隻動物有好幾種愛吃的食物（食物不會跟其他動物重複）
  const F = (f, n, m) => ({f, n, m});
  // h = 住在哪裡（送動物回家用）：farm 農場 / forest 森林 / water 水邊 / snow 冰天雪地 / savanna 大草原
  const ANIMALS = [
    {a:'🐵', k:'monkey',  h:'forest',  name:'小猴子', foods:[F('🍌','香蕉','根'), F('🍑','桃子','顆'), F('🥭','芒果','顆')]},
    {a:'🐰', k:'rabbit',  h:'farm',    name:'小兔子', foods:[F('🥕','紅蘿蔔','根'), F('🥬','青菜','把'), F('🍓','草莓','顆')]},
    {a:'🐶', k:'dog',     h:'farm',    name:'小狗狗', foods:[F('🦴','骨頭','根'), F('🍖','肉','塊'), F('🍗','雞腿','隻')]},
    {a:'🐱', k:'cat',     h:'farm',    name:'小貓咪', foods:[F('🐟','魚','條'), F('🦐','蝦子','隻'), F('🥛','牛奶','杯')]},
    {a:'🐘', k:'elephant',h:'savanna', name:'大象',   foods:[F('🍉','西瓜','片'), F('🍎','蘋果','顆'), F('🥜','花生','顆')]},
    {a:'🐭', k:'mouse',   h:'farm',    name:'小老鼠', foods:[F('🧀','起司','塊'), F('🍪','餅乾','片'), F('🌰','栗子','顆')]},
    {a:'🐻', k:'bear',    h:'forest',  name:'小熊',   foods:[F('🍯','蜂蜜','罐'), F('🫐','藍莓','顆'), F('🍇','葡萄','串')]},
    {a:'🐔', k:'chick',   h:'farm',    name:'小雞',   foods:[F('🌽','玉米','根'), F('🐛','蟲蟲','隻'), F('🍚','米飯','碗')]},
    {a:'🐷', k:'pig',     h:'farm',    name:'小豬',   foods:[F('🍠','地瓜','條'), F('🥔','馬鈴薯','顆'), F('🍞','麵包','片')]},
    {a:'🐴', k:'horse',   h:'farm',    name:'小馬',   foods:[F('🌾','牧草','把'), F('🍬','方糖','顆'), F('🍐','梨子','顆')]},
    {a:'🐧', k:'penguin', h:'snow',    name:'企鵝',   foods:[F('🦑','魷魚','隻'), F('🦀','螃蟹','隻'), F('🍣','壽司','個')]},
    {a:'🦒', k:'giraffe', h:'savanna', name:'長頸鹿', foods:[F('🌿','葉子','片'), F('🌸','花','朵'), F('🥝','奇異果','顆')]},
    {a:'🐼', k:'panda',   h:'forest',  name:'熊貓',   foods:[F('🎋','竹子','根'), F('🥦','花椰菜','朵'), F('🍙','飯糰','個')]},
    {a:'🐸', k:'frog',    h:'water',   name:'青蛙',   foods:[F('🪰','蒼蠅','隻'), F('🦗','蟋蟀','隻'), F('🦟','蚊子','隻')]},
    {a:'🐹', k:'hamster', h:'farm',    name:'倉鼠',   foods:[F('🌻','葵花子','顆'), F('🥒','小黃瓜','條'), F('🫘','豆子','顆')]},
    {a:'🐮', k:'cow',     h:'farm',    name:'乳牛',   foods:[F('🍀','幸運草','片'), F('🍈','哈密瓜','顆'), F('🎃','南瓜','顆')]},
    {a:'🦁', k:'lion',    h:'savanna', name:'獅子',   foods:[F('🥩','牛排','塊'), F('🍔','漢堡','個'), F('🌭','熱狗','根')]},
    {a:'🐯', k:'tiger',   h:'savanna', name:'老虎',   foods:[F('🥓','培根','片'), F('🍕','披薩','片'), F('🥟','餃子','顆')]},
    {a:'🦊', k:'fox',     h:'forest',  name:'狐狸',   foods:[F('🍒','櫻桃','顆'), F('🥚','蛋','顆'), F('🥐','可頌','個')]},
    {a:'🐨', k:'koala',   h:'forest',  name:'無尾熊', foods:[F('🧁','杯子蛋糕','個'), F('🍮','布丁','個'), F('🍵','熱茶','杯')]},
    {a:'🐑', k:'sheep',   h:'farm',    name:'綿羊',   foods:[F('🥗','沙拉','碗'), F('🌼','小黃花','朵'), F('🧇','鬆餅','片')]},
    {a:'🦆', k:'duck',    h:'water',   name:'鴨子',   foods:[F('🍜','麵','碗'), F('🐌','蝸牛','隻'), F('🥯','貝果','個')]},
    {a:'🦉', k:'owl',     h:'forest',  name:'貓頭鷹', foods:[F('🍤','炸蝦','隻'), F('🍡','糰子','串'), F('🥨','蝴蝶餅','個')]},
    {a:'🐢', k:'turtle',  h:'water',   name:'烏龜',   foods:[F('🍅','番茄','顆'), F('🍆','茄子','條'), F('🥑','酪梨','顆')]},
    {a:'🐙', k:'octopus', h:'water',   name:'章魚',   foods:[F('🦪','生蠔','個'), F('🍥','魚板','片'), F('🍱','便當','個')]},
    {a:'🦭', k:'seal',    h:'snow',    name:'海豹',   foods:[F('🐠','熱帶魚','條'), F('🍢','關東煮','串'), F('🦞','龍蝦','隻')]},
    {a:'🐿️', k:'squirrel',h:'forest',  name:'松鼠',   foods:[F('🍄','蘑菇','朵'), F('🍿','爆米花','桶'), F('🥥','椰子','顆')]},
    {a:'🦔', k:'hedgehog',h:'forest',  name:'刺蝟',   foods:[F('🍰','蛋糕','塊'), F('🍩','甜甜圈','個'), F('🍦','冰淇淋','支')]},
    {a:'🦝', k:'raccoon', h:'forest',  name:'浣熊',   foods:[F('🌮','塔可','個'), F('🥪','三明治','個'), F('🍟','薯條','包')]},
    {a:'🦌', k:'deer',    h:'forest',  name:'小鹿',   foods:[F('🍘','仙貝','片'), F('🍍','鳳梨','顆'), F('🥖','法國麵包','條')]},
    {a:'🦖', k:'dino',    h:null,      name:'小恐龍', foods:[F('🌵','仙人掌','株'), F('🍧','刨冰','碗'), F('🥞','煎餅','片')]},
    {a:'🦄', k:'unicorn', h:null,      name:'獨角獸', foods:[F('🍭','棒棒糖','支'), F('🍫','巧克力','塊'), F('🥧','派','個')]},
  ];
  const HABITATS = {
    farm:    {name:'農場',     scene:'farm',    icon:'🏡'},
    forest:  {name:'森林',     scene:'forest',  icon:'🌲'},
    water:   {name:'水邊',     scene:'beach',   icon:'🌊'},
    snow:    {name:'冰天雪地', scene:'snow',    icon:'❄️'},
    savanna: {name:'大草原',   scene:'savanna', icon:'🌞'},
  };
  const sceneFor = a => a.h ? HABITATS[a.h].scene : (a.k === 'unicorn' ? 'night' : 'meadow');
  const COLORS = [
    {name:'紅色', hex:'#E8453C', foods:['🍎','🍓','🍒','🍅']},
    {name:'黃色', hex:'#FFC93C', foods:['🍌','🍋','🌽','🧀','🍍']},
    {name:'綠色', hex:'#5DBB4F', foods:['🥦','🥒','🍐','🥝','🥬']},
    {name:'紫色', hex:'#9B59D0', foods:['🍇','🍆']},
    {name:'橘色', hex:'#FF8A3D', foods:['🥕','🍊','🎃']},
  ];
  const BATH_ANIMALS = ANIMALS.filter(x => !['octopus', 'turtle'].includes(x.k));
  const STICKERS = [
    ['🦁','獅子'],['🐯','老虎'],['🦒','長頸鹿'],['🦓','斑馬'],['🐨','無尾熊'],['🐼','熊貓'],
    ['🦊','狐狸'],['🐸','青蛙'],['🐧','企鵝'],['🐳','鯨魚'],['🐙','章魚'],['🐢','烏龜'],
    ['🦋','蝴蝶'],['🐞','瓢蟲'],['🦄','獨角獸'],['🦖','恐龍'],['🐬','海豚'],['🦉','貓頭鷹'],
    ['🦔','刺蝟'],['🐝','蜜蜂'],['🦩','紅鶴'],['🐿️','松鼠'],['🦥','樹懶'],['🐥','小雞'],
  ];
  const CN = ['零','一','兩','三','四'];
  const COUNT_SAY = ['', '一！', '二！', '三！', '四！'];
  const FEED_ROUNDS = 5, BATH_ROUNDS = 3, SORT_ROUNDS = 6;

  /* ================= helpers ================= */
  const $ = id => document.getElementById(id);
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = arr => arr[Math.random() * arr.length | 0];
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
  let timers = [];
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, d) { try { const v = localStorage.getItem('feed-animals:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('feed-animals:' + k, JSON.stringify(v)); } catch (e) {} },
  };
  const savedSettings = store.get('settings', {});
  let settings = Object.assign({levels: ['1'], rest: 10, pairs: 10, bg: 'random'}, savedSettings);
  if (!Array.isArray(savedSettings.levels) || !savedSettings.levels.length) {
    settings.levels = settings.level === 'mix' ? ['1', '2', '3', '4'] : [String(settings.level || '1')];
  }
  delete settings.level;
  let stickers = store.get('stickers', {});
  const freshStats = () => ({feed: {}, bath: {}, sort: {}, match: {}, games: {}, playMs: 0, daily: {}, dailyGames: {}, opens: 0, firstDay: null,
    feedRight: 0, feedWrong: 0, feedLevels: {}, sortRight: 0, sortWrong: 0, matchSizes: {}, bookOpens: 0});
  let stats = Object.assign(freshStats(), store.get('stats', {}));
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  stats.opens++;
  if (!stats.firstDay) stats.firstDay = dayKey();
  store.set('stats', stats);
  function record(kind, emoji) {
    stats[kind][emoji] = (stats[kind][emoji] || 0) + 1;
    store.set('stats', stats);
  }
  function gameStat(g) { return (stats.games[g] = stats.games[g] || {started: 0, done: 0, ms: 0}); }
  function gameStarted(g) {
    const s = gameStat(g), k = dayKey(), day = (stats.dailyGames[k] = stats.dailyGames[k] || {});
    s.started++; s.last = k;
    day[g] = (day[g] || 0) + 1;
    store.set('stats', stats);
  }
  function gameDone(g) { if (g) { gameStat(g).done++; store.set('stats', stats); } }

  /* ================= sound ================= */
  let ctx = null;
  function ac() {
    if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C(); }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freq, at, dur, type = 'sine', vol = .22, slideTo) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .05);
  }
  function noise(at, dur, filterType, freq, vol) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + at, len = Math.max(1, c.sampleRate * dur | 0);
    const buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (let k = 0; k < len; k++) d[k] = (Math.random() * 2 - 1) * (1 - k / len);
    const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = buf; f.type = filterType; f.frequency.value = freq; f.Q.value = .9; g.gain.value = vol;
    src.connect(f).connect(g).connect(c.destination); src.start(t);
  }
  const sfx = {
    pick:  () => tone(500, 0, .12, 'triangle', .18, 760),
    back:  () => tone(720, 0, .3, 'sine', .14, 330),
    no:    () => { tone(330, 0, .18, 'sine', .2, 260); tone(260, .2, .3, 'sine', .2, 190); },
    crunch:() => { for (let i = 0; i < 3; i++) noise(i * .3, .09, 'bandpass', 1400 + Math.random() * 900, .5); },
    gulp:  () => { noise(0, .08, 'bandpass', 1800, .45); tone(260, .05, .15, 'sine', .15, 180); },
    happy: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .09, .22, 'triangle', .18)),
    win:   () => [523, 587, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i * .14, .3, 'triangle', .18)),
    scrub: () => { noise(0, .06, 'bandpass', 2600 + Math.random() * 1200, .14); if (Math.random() < .5) tone(900 + Math.random() * 600, 0, .08, 'sine', .07, 1600); },
    water: () => noise(0, .14, 'lowpass', 1100, .22),
    sparkle: () => [1319, 1568, 2093].forEach((f, i) => tone(f, i * .07, .25, 'sine', .1)),
    pop:   () => { tone(900, 0, .07, 'sine', .25, 1800); noise(0, .04, 'highpass', 2500, .3); },
    plip:  () => tone(1000 + Math.random() * 700, 0, .06, 'sine', .08, 2200),
    giggle:() => [0, .09, .18].forEach(d => tone(700 + Math.random() * 120, d, .08, 'triangle', .07, 1000)),
  };

  /* ================= voice ================= */
  let voice = null;
  function pickVoice() {
    try {
      const vs = speechSynthesis.getVoices();
      voice = vs.find(v => /zh[-_]TW/i.test(v.lang)) || vs.find(v => /zh[-_](HK|Hant)/i.test(v.lang)) || vs.find(v => /^zh/i.test(v.lang)) || null;
    } catch (e) {}
  }
  if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function say(text) {
    try {
      if (!('speechSynthesis' in window)) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice ? voice.lang : 'zh-TW'; if (voice) u.voice = voice;
      u.rate = .9; u.pitch = 1.3;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ================= effects ================= */
  const fx = $('fx');
  function burst(x, y, chars, count, spread, rise, size = [3, 7]) {
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.textContent = pick(chars);
      s.style.cssText = `left:${x}px;top:${y}px;font-size:${size[0] + Math.random() * (size[1] - size[0])}vmin`;
      fx.appendChild(s);
      const dx = (Math.random() - .5) * spread, dy = -rise * (.6 + Math.random() * .8);
      s.animate([
        {transform:'translate(-50%,-50%) scale(.3)', opacity:1},
        {transform:`translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`, opacity:1, offset:.6},
        {transform:`translate(calc(-50% + ${dx * 1.2}px), calc(-50% + ${dy * 1.3}px)) scale(.8)`, opacity:0},
      ], {duration: 900 + Math.random() * 600, easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish = () => s.remove();
    }
  }
  function drip(x, y) {
    const s = document.createElement('span');
    s.textContent = '💧';
    s.style.cssText = `left:${x + (Math.random() - .5) * 60}px;top:${y}px;font-size:${2.5 + Math.random() * 2}vmin`;
    fx.appendChild(s);
    s.animate([{transform:'translate(-50%,-50%)', opacity:1}, {transform:`translate(-50%, ${120 + Math.random() * 80}px)`, opacity:0}],
      {duration: 600, easing:'ease-in'}).onfinish = () => s.remove();
  }
  function restartAnim(el, base, name) {
    el.className = base;
    void el.offsetWidth;
    if (name) el.classList.add(name);
  }

  /* ================= screens ================= */
  let screen = 'home', mode = null, busy = true, activeId = null;
  const SCREENS = ['home', 'feed', 'bath', 'sort', 'match', 'book'];
  let bgOn = null, sceneNow = null;
  function setScene(name) {
    if (name === sceneNow) return;
    sceneNow = name;
    const next = bgOn === $('bgA') ? $('bgB') : $('bgA');
    next.innerHTML = SCENES.svg(name);
    next.classList.add('on');
    if (bgOn) bgOn.classList.remove('on');
    bgOn = next;
  }
  function show(name) {
    SCREENS.forEach(s => $(s).classList.toggle('hidden', s !== name));
    if (name !== 'book') $('book').classList.remove('placing');
    screen = name;
    if (name === 'bath') setScene('bathroom');
    else if (name === 'home' || name === 'book' || name === 'sort') setScene(randomScene());
  }
  function goHome() {
    clearTimers(); stopFeedIdle(); stopBathIdle();
    cardTimers.forEach(clearTimeout); cardTimers = []; clearTimeout(placeHint); placingSticker = null; clearTimeout(sortHint); tdrag = null; clearTimeout(matchHint);
    busy = true; activeId = null;
    $('reward').classList.add('hidden');
    $('afterPlace').classList.add('hidden');
    $('cursor').style.display = 'none';
    finger = null; cancelAnimationFrame(rafId); phase = 'idle'; $('stream').style.display = 'none';
    document.querySelectorAll('.big-bubble').forEach(b => b.remove());
    $('stickerCount').textContent = Object.keys(stickers).length;
    show('home');
  }
  document.querySelectorAll('[data-home]').forEach(b => b.addEventListener('click', () => { ac(); goHome(); }));
  $('goFeed').addEventListener('click', () => { ac(); $('soundNote').classList.add('hidden'); startFeed(); });
  $('goBath').addEventListener('click', () => { ac(); $('soundNote').classList.add('hidden'); startBath(); });
  $('goBook').addEventListener('click', () => { ac(); openBook(); });
  $('againBtn').addEventListener('click', () => { ac(); ({feed: startFeed, bath: startBath, sort: startSort, match: startMatch})[lastGame](); });
  $('goSort').addEventListener('click', () => { ac(); $('soundNote').classList.add('hidden'); startSort(); });
  $('goMatch').addEventListener('click', () => { ac(); $('soundNote').classList.add('hidden'); startMatch(); });
  let lastGame = 'feed';

  function critter(el, kind) {
    el.innerHTML = ART.svg(kind);
    el.dataset.mood = 'normal'; el.dataset.wet = '0';
    el.style.setProperty('--blink-delay', (-Math.random() * 4).toFixed(2) + 's');
  }
  function mood(el, m, ms) {
    el.dataset.mood = m;
    clearTimeout(el._moodT);
    if (ms) el._moodT = setTimeout(() => { el.dataset.mood = 'normal'; }, ms);
  }
  function look(el, x, y) {
    const r = el.getBoundingClientRect();
    const ex = r.left + r.width / 2, ey = r.top + r.height * .42;
    const dx = x - ex, dy = y - ey, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 160) * 4.5;
    el.style.setProperty('--px', (dx / d * k).toFixed(2) + 'px');
    el.style.setProperty('--py', (dy / d * k).toFixed(2) + 'px');
  }
  function unlook(el) { el.style.setProperty('--px', '0px'); el.style.setProperty('--py', '0px'); }
  document.querySelectorAll('[data-art]').forEach(s => { s.innerHTML = ART.svg(s.dataset.art); });

  function makeDots(el, n) {
    el.innerHTML = '';
    el.classList.toggle('many', n > 6);
    for (let i = 0; i < n; i++) { const d = document.createElement('div'); d.className = 'dot e'; el.appendChild(d); }
  }
  function fillDot(el, i, kind) {
    const d = el.children[i]; if (!d) return;
    d.innerHTML = ART.svg(kind); d.classList.add('fed');
  }

  /* ================= decks ================= */
  function makeDeck(list) {
    let deck = [], last = null;
    return n => {
      const out = [];
      while (out.length < n) {
        if (!deck.length) { deck = shuffle(list); if (deck.length > 1 && deck[deck.length - 1] === last) deck.unshift(deck.pop()); }
        const x = deck.pop();
        if (!out.includes(x)) out.push(x);
      }
      last = out[out.length - 1];
      return out;
    };
  }
  const drawAnimals = makeDeck(ANIMALS);
  const drawBath = makeDeck(BATH_ANIMALS);
  const OUTDOOR = ['meadow', 'farm', 'forest', 'beach', 'snow', 'savanna', 'night', 'zoo', 'pond', 'underwater', 'jungle', 'garden'];
  const drawScene = makeDeck(OUTDOOR);
  const randomScene = () => drawScene(1)[0];

  /* ================= FEED ================= */
  const animalsEl = $('animals'), matEl = $('mat'), feedProgress = $('feedProgress');
  let round = 0, eaters = [], drag = null, feedIdle = [], feedLevel = '1';

  function startFeed() {
    mode = 'feed'; lastGame = 'feed'; clearTimers(); gameStarted('feed');
    round = 0;
    makeDots(feedProgress, FEED_ROUNDS);
    show('feed');
    nextRound();
  }

  function otherFoods(eaterAnimals, n) {
    return shuffle(ANIMALS.filter(x => !eaterAnimals.includes(x)).map(x => pick(x.foods).f)).slice(0, n);
  }

  function buildRound() {
    const level = pick(settings.levels);
    if (level === '1') {
      const [a] = drawAnimals(1), fd = pick(a.foods);
      return {level, foods: shuffle([fd.f, ...otherFoods([a], 2)]),
        eaters: [{a, accepts: f => f === fd.f, need: 1, tokens: [fd.f], showBubble: false, ask: `${a.name}想吃${fd.n}`}],
        voice: `${a.name}肚子餓了，想吃${fd.n}`};
    }
    if (level === '2') {
      const [a] = drawAnimals(1), fd = pick(a.foods), n = 2 + (Math.random() * 2 | 0);
      return {level, foods: shuffle([...Array(n).fill(fd.f), ...otherFoods([a], 1)]),
        eaters: [{a, accepts: f => f === fd.f, need: n, tokens: Array(n).fill(fd.f), showBubble: true, ask: `${a.name}要吃${CN[n]}${fd.m}${fd.n}`}],
        voice: `${a.name}要吃${CN[n]}${fd.m}${fd.n}`};
    }
    if (level === '3') {
      const [a] = drawAnimals(1), col = pick(COLORS);
      const targets = shuffle(col.foods).slice(0, 2);
      const others = shuffle(COLORS.filter(c => c !== col)).slice(0, 2).map(c => pick(c.foods));
      return {level, foods: shuffle([...targets, ...others]),
        eaters: [{a, accepts: f => col.foods.includes(f), need: 2, tokens: [{blob: col.hex}, {blob: col.hex}], showBubble: true, ask: `${a.name}想吃${col.name}的`}],
        voice: `${a.name}想吃${col.name}的`};
    }
    const [a, b] = drawAnimals(2), fa = pick(a.foods), fb = pick(b.foods);
    return {level, foods: shuffle([fa.f, fb.f, ...otherFoods([a, b], 1)]),
      eaters: [
        {a, accepts: f => f === fa.f, need: 1, tokens: [fa.f], showBubble: false, ask: `${a.name}想吃${fa.n}`},
        {a: b, accepts: f => f === fb.f, need: 1, tokens: [fb.f], showBubble: false, ask: `${b.name}想吃${fb.n}`}],
      voice: `${a.name}想吃${fa.n}，${b.name}想吃${fb.n}`};
  }

  function nextRound() {
    const r = buildRound();
    feedLevel = r.level;
    setScene(settings.bg === 'habitat' ? sceneFor(r.eaters[0].a) : randomScene());
    animalsEl.innerHTML = '';
    animalsEl.classList.toggle('duo', r.eaters.length > 1);
    eaters = r.eaters.map((e, i) => {
      const wrap = document.createElement('div'); wrap.className = 'eater';
      const bubble = document.createElement('div'); bubble.className = 'bubble';
      e.tokenEls = e.tokens.map(() => {
        const s = document.createElement('span');
        s.className = 'token mystery';           // empty slot: shows how many, not what
        bubble.appendChild(s); return s;
      });
      const an = document.createElement('div'); an.className = 'animal critter enter'; critter(an, e.a.k);
      an.style.animationDelay = (i * .15) + 's';
      an.setAttribute('role', 'img'); an.setAttribute('aria-label', e.a.name);
      an.addEventListener('click', () => {
        if (busy || activeId !== null) return;
        restartAnim(an, 'animal critter', 'happy'); mood(an, 'happy', 1000);
        say(e.got >= e.need ? '我吃飽了' : e.ask);
      });
      const sh = document.createElement('div'); sh.className = 'shadow';
      wrap.append(bubble, an, sh); animalsEl.appendChild(wrap);
      return Object.assign(e, {got: 0, el: an, bubble});
    });
    later(() => eaters.forEach(e => e.showBubble && e.bubble.classList.add('show')), 800);
    layFoods(r.foods);
    busy = false;
    later(() => say(r.voice), 500);
    armFeedIdle();
  }

  function layFoods(foods) {
    matEl.innerHTML = '';
    matEl.className = 'mat' + (foods.length === 4 ? ' n4' : '');
    foods.forEach((food, i) => {
      const slot = document.createElement('div'); slot.className = 'slot';
      const el = document.createElement('div');
      el.className = 'food e appear';
      el.style.animationDelay = (.25 + i * .1) + 's';
      el.textContent = food; el.dataset.food = food;
      el.addEventListener('pointerdown', onFoodDown);
      slot.appendChild(el); matEl.appendChild(slot);
    });
  }

  function stopFeedIdle() { feedIdle.forEach(clearTimeout); feedIdle = []; document.querySelectorAll('.food.wiggle').forEach(f => f.classList.remove('wiggle')); }
  function armFeedIdle() {
    stopFeedIdle();
    feedIdle.push(setTimeout(() => {
      if (busy || screen !== 'feed') return;
      const hungry = eaters.find(e => e.got < e.need);
      if (hungry) say(hungry.ask);
    }, 8000));
    feedIdle.push(setTimeout(() => {
      if (busy || screen !== 'feed') return;
      const hungry = eaters.find(e => e.got < e.need); if (!hungry) return;
      const f = [...matEl.querySelectorAll('.food')].find(el => !el.classList.contains('eaten') && hungry.accepts(el.dataset.food));
      if (f) f.classList.add('wiggle');
      say(hungry.a.name + '還是好餓喔');
      revealHints(hungry); hungry.bubble.classList.add('show');
    }, 12000));
  }

  function revealHints(e) {
    e.tokenEls.forEach((s, i) => {
      if (s.classList.contains('filled')) return;
      const h = e.tokens[i];
      if (typeof h === 'string') { s.className = 'token e revealed'; s.textContent = h; s.style.background = ''; }
      else { s.className = 'token blob revealed'; s.textContent = ''; s.style.background = h.blob; }
    });
  }
  function fillSlot(s, food) {
    s.className = 'token e filled'; s.style.background = ''; s.textContent = food;
  }

  function mouthOf(e) {
    const r = e.el.getBoundingClientRect();
    return {x: r.left + r.width / 2, y: r.top + r.height * .54, rad: r.width * .48};
  }
  function nearestEater() {
    const x = drag.cx + drag.dx, y = drag.cy + drag.dy;
    let best = null, bd = Infinity;
    eaters.forEach(e => { const m = mouthOf(e), d = Math.hypot(x - m.x, y - m.y); if (d < m.rad && d < bd) { bd = d; best = e; } });
    return best;
  }

  function onFoodDown(e) {
    if (busy || activeId !== null || screen !== 'feed') return;
    e.preventDefault();
    const el = e.currentTarget;
    activeId = e.pointerId;
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
    stopFeedIdle();
    el.classList.remove('home', 'appear', 'wiggle');
    const r = el.getBoundingClientRect();
    drag = {el, sx: e.clientX, sy: e.clientY, cx: r.left + r.width / 2, cy: r.top + r.height / 2, dx: 0, dy: 0};
    el.classList.add('dragging');
    el.style.transform = 'scale(1.18)';
    sfx.pick();
    el.addEventListener('pointermove', onFoodMove);
    el.addEventListener('pointerup', onFoodUp);
    el.addEventListener('pointercancel', onFoodCancel);
  }
  function onFoodMove(e) {
    if (!drag || e.pointerId !== activeId) return;
    drag.dx = e.clientX - drag.sx; drag.dy = e.clientY - drag.sy;
    drag.el.style.transform = `translate(${drag.dx}px,${drag.dy}px) scale(1.18)`;
    const n = nearestEater();
    const fx_ = drag.cx + drag.dx, fy_ = drag.cy + drag.dy;
    eaters.forEach(x => {
      x.el.classList.toggle('near', x === n);
      look(x.el, fx_, fy_);
      if (x === n && x.got < x.need) { if (x.el.dataset.mood === 'normal') mood(x.el, 'open'); }
      else if (x.el.dataset.mood === 'open') mood(x.el, 'normal');
    });
  }
  function releaseFood() {
    const el = drag.el;
    el.removeEventListener('pointermove', onFoodMove);
    el.removeEventListener('pointerup', onFoodUp);
    el.removeEventListener('pointercancel', onFoodCancel);
    el.classList.remove('dragging');
    activeId = null;
    eaters.forEach(x => { x.el.classList.remove('near'); unlook(x.el); if (x.el.dataset.mood === 'open') mood(x.el, 'normal'); });
    const d = drag; drag = null; return d;
  }
  function foodHome(el) {
    el.classList.add('home'); el.style.transform = '';
    setTimeout(() => el.classList.remove('home'), 520);
  }
  function onFoodCancel(e) {
    if (!drag || e.pointerId !== activeId) return;
    foodHome(releaseFood().el); armFeedIdle();
  }
  function onFoodUp(e) {
    if (!drag || e.pointerId !== activeId) return;
    const target = nearestEater();
    const d = releaseFood();
    if (!target) { foodHome(d.el); sfx.back(); armFeedIdle(); return; }
    if (target.got < target.need && target.accepts(d.el.dataset.food)) eatFood(target, d);
    else rejectFood(target, d);
  }

  function eatFood(eater, d) {
    busy = true; stopFeedIdle();
    stats.feedRight++;
    const m = mouthOf(eater);
    d.el.classList.add('eaten');
    d.el.style.transform = `translate(${m.x - d.cx}px,${m.y - d.cy}px) scale(.2)`;
    eater.got++;
    const tok = eater.tokenEls[eater.got - 1]; if (tok) fillSlot(tok, d.el.dataset.food);
    const full = eater.got >= eater.need;
    const allFull = eaters.every(x => x.got >= x.need);
    burst(m.x, m.y, ['·', '•', '✦'], 8, m.rad * 1.6, m.rad * .5);
    if (full) {
      restartAnim(eater.el, 'animal critter', 'chomp'); sfx.crunch(); mood(eater.el, 'eat');
      record('feed', eater.a.a);
      later(() => {
        restartAnim(eater.el, 'animal critter', 'happy'); sfx.happy(); mood(eater.el, 'happy');
        eater.bubble.classList.remove('show');
        burst(m.x, m.y - m.rad * .6, ['💗', '💛', '⭐'], 7, m.rad * 2, m.rad * 1.6);
        if (allFull) say(pick(['好好吃！謝謝你', '好吃好吃！', '謝謝你！我吃飽了']));
        else say(eater.a.name + '吃飽了！');
      }, 950);
      if (allFull) {
        record('feedLevels', feedLevel);
        later(() => fillDot(feedProgress, round, eaters[0].a.k), 950);
        later(() => {
          round++;
          if (round >= FEED_ROUNDS) { finishSet('feed'); return; }
          eaters.forEach(x => restartAnim(x.el, 'animal critter', 'leave'));
          later(nextRound, 520);
        }, 2900);
      } else later(() => { busy = false; armFeedIdle(); }, 1500);
    } else {
      restartAnim(eater.el, 'animal critter', 'chomp'); sfx.gulp(); mood(eater.el, 'eat', 800);
      say(COUNT_SAY[eater.got] || '');
      later(() => { busy = false; armFeedIdle(); }, 800);
    }
  }

  function rejectFood(eater, d) {
    busy = true;
    stats.feedWrong++; store.set('stats', stats);
    restartAnim(eater.el, 'animal critter', 'no'); sfx.no(); mood(eater.el, 'no', 900);
    foodHome(d.el);
    if (eater.got >= eater.need) say('我吃飽了');
    else { revealHints(eater); eater.bubble.classList.add('show'); say(pick(['嗯～我不要這個', '我想吃別的', '不是這個喔'])); }
    later(() => { restartAnim(eater.el, 'animal critter'); busy = false; armFeedIdle(); }, 650);
  }

  /* ================= BATH ================= */
  // flow per animal: scrub the mud (sponge) → pop the floating bubbles → rinse the foam (shower) → shake dry
  const bathStage = $('bathStage'), bather = $('bather'), bathBody = $('bathBody'), bathAnimal = $('bathAnimal'),
        mudCv = $('mudCv'), foamCv = $('foamCv'), pad = $('touchPad'), giggleEl = $('giggle'),
        toolBadge = $('toolBadge'), cursor = $('cursor'), bathProgress = $('bathProgress');
  let bathRound = 0, bathQueue = [], phase = 'idle', base = 1, bathIdle = [];
  let geo = null, finger = null, lastPt = null, rafId = 0;
  let lastSfx = 0, lastCheck = 0, lastFx = 0, lastTickle = 0, lastTalk = 0, poppedLeft = 0;

  function startBath() {
    mode = 'bath'; lastGame = 'bath'; clearTimers(); gameStarted('bath');
    bathRound = 0;
    bathQueue = drawBath(BATH_ROUNDS);
    makeDots(bathProgress, BATH_ROUNDS);
    show('bath');
    nextBath();
  }

  function layoutBath() {
    // sizes from layout boxes (not transformed rects) so the animal can keep swimming
    const ow = bathAnimal.offsetWidth, oh = bathAnimal.offsetHeight;
    const padX = ow * .1, padY = oh * .08;
    const box = {left: -padX, top: -padY, w: ow + padX * 2, h: oh + padY * 2};
    const dpr = Math.min(devicePixelRatio || 1, 2);
    [mudCv, foamCv, pad].forEach(el => Object.assign(el.style, {left: box.left + 'px', top: box.top + 'px', width: box.w + 'px', height: box.h + 'px'}));
    [mudCv, foamCv].forEach(c => { c.width = box.w * dpr | 0; c.height = box.h * dpr | 0; });
    // dirty areas: the big head and the part of the tummy above the water line
    const cx = (padX + ow * .5) * dpr;
    geo = {dpr, w: mudCv.width, h: mudCv.height, cx,
      head: {cx, cy: (padY + oh * .42) * dpr, rx: ow * .31 * dpr, ry: oh * .26 * dpr},
      belly: {cx, cy: (padY + oh * .74) * dpr, rx: ow * .24 * dpr, ry: oh * .16 * dpr},
      cut: (padY + oh * .86) * dpr, rx: ow * .31 * dpr};
  }
  const inEll = (e, x, y, k) => ((x - e.cx) / (e.rx * k)) ** 2 + ((y - e.cy) / (e.ry * k)) ** 2 <= 1;
  function inFace(x, y, k = 1) { return inEll(geo.head, x, y, k) || (inEll(geo.belly, x, y, k) && y < geo.cut); }
  function randInFace(k) {
    const top = geo.head.cy - geo.head.ry, bot = geo.cut, left = geo.cx - geo.head.rx, right = geo.cx + geo.head.rx;
    let x, y; do { x = left + Math.random() * (right - left); y = top + Math.random() * (bot - top); } while (!inFace(x, y, k)); return {x, y};
  }

  function paintMud() {
    const c = mudCv.getContext('2d');
    c.clearRect(0, 0, geo.w, geo.h);
    const unit = geo.rx;
    for (let b = 0; b < 9; b++) {
      const p = randInFace(.85);
      c.fillStyle = pick(['#8A5A33', '#7A4E2B', '#9A6A3E']);
      for (let k = 0; k < 7; k++) { c.beginPath(); c.arc(p.x + (Math.random() - .5) * unit * .35, p.y + (Math.random() - .5) * unit * .3, unit * (.08 + Math.random() * .1), 0, Math.PI * 2); c.fill(); }
      for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(p.x + (Math.random() - .5) * unit * .8, p.y + (Math.random() - .5) * unit * .7, unit * (.02 + Math.random() * .03), 0, Math.PI * 2); c.fill(); }
    }
  }
  function coverage(cv) {
    const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
    let n = 0; for (let i = 3; i < d.length; i += 24) if (d[i] > 40) n++;
    return n;
  }
  function foamAt(x, y, r, count) {
    const c = foamCv.getContext('2d');
    for (let i = 0; i < count; i++) {
      const bx = x + (Math.random() - .5) * r * 1.4, by = y + (Math.random() - .5) * r * 1.4;
      if (!inFace(bx, by, 1.1)) continue;
      const br = r * (.18 + Math.random() * .3);
      c.beginPath(); c.arc(bx, by, br, 0, Math.PI * 2);
      c.fillStyle = 'rgba(255,255,255,.93)'; c.fill();
      c.lineWidth = Math.max(1, br * .12); c.strokeStyle = 'rgba(140,195,230,.85)'; c.stroke();
      c.beginPath(); c.arc(bx - br * .35, by - br * .35, br * .2, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill();
    }
  }

  function nextBath() {
    const a = bathQueue[bathRound];
    critter(bathAnimal, a.k); bathAnimal.setAttribute('aria-label', a.name);
    bather.className = 'bather';
    restartAnim(bathBody, 'bath-body', 'enter');
    mudCv.style.transition = foamCv.style.transition = 'none';
    mudCv.style.opacity = foamCv.style.opacity = '0';
    phase = 'wait';
    setTool('🧽', false);
    later(() => {
      layoutBath();
      paintMud();
      foamCv.getContext('2d').clearRect(0, 0, geo.w, geo.h);
      mudCv.style.transition = 'opacity .4s'; mudCv.style.opacity = '1'; foamCv.style.opacity = '1';
      base = Math.max(1, coverage(mudCv));
      phase = 'scrub'; busy = false;
      bather.classList.add('swim');                 // the animal splashes around in the tub
      say(`${a.name}玩泥巴，變得髒兮兮！幫牠洗澡吧`);
      armBathIdle();
    }, 750);
  }

  function setTool(ch, animate = true) {
    toolBadge.textContent = ch; cursor.textContent = ch;
    if (animate) restartAnim(toolBadge, 'tool-badge e', 'swap');
  }
  function stopBathIdle() { bathIdle.forEach(clearTimeout); bathIdle = []; toolBadge.classList.remove('wiggle'); }
  function armBathIdle() {
    stopBathIdle();
    bathIdle.push(setTimeout(() => {
      if (busy || screen !== 'bath') return;
      toolBadge.classList.add('wiggle');
      if (phase === 'scrub') say('用手指搓一搓');
      else if (phase === 'rinse') say('用手指沖一沖');
    }, 7000));
    // now and then the animal does something silly on its own
    bathIdle.push(setTimeout(function silly() {
      if (screen !== 'bath' || !(phase === 'scrub' || phase === 'rinse')) return;
      if (!finger) {
        const r = bathAnimal.getBoundingClientRect();
        restartAnim(bathBody, 'bath-body', 'dunk'); mood(bathAnimal, 'calm', 1100);
        later(() => { sfx.water(); burst(r.left + r.width / 2, r.bottom - r.height * .05, ['💧'], 8, r.width * 1.4, r.height * .5, [2.5, 4]); }, 400);
      }
      bathIdle.push(setTimeout(silly, 6000 + Math.random() * 4000));
    }, 5000));
  }

  /* ---- scrubbing / rinsing: follows the finger even while the animal moves ---- */
  function canvasPoint(cx, cy) {
    const r = pad.getBoundingClientRect();
    return {x: (cx - r.left) / r.width * geo.w, y: (cy - r.top) / r.height * geo.h};
  }
  pad.addEventListener('pointerdown', e => {
    if (busy || activeId !== null || !(phase === 'scrub' || phase === 'rinse')) return;
    e.preventDefault();
    activeId = e.pointerId;
    try { pad.setPointerCapture(e.pointerId); } catch (_) {}
    stopBathIdle();
    finger = {x: e.clientX, y: e.clientY, moved: true};
    lastPt = canvasPoint(e.clientX, e.clientY);
    cursor.style.display = 'block'; moveCursor(e.clientX, e.clientY);
    bather.classList.add('fast');
    mood(bathAnimal, phase === 'rinse' ? 'calm' : 'tickle');
    if (phase === 'rinse') { stream.style.display = 'block'; moveStream(e.clientX, e.clientY); }
    cancelAnimationFrame(rafId); rafId = requestAnimationFrame(scrubLoop);
  });
  pad.addEventListener('pointermove', e => {
    if (e.pointerId !== activeId || !finger) return;
    finger.x = e.clientX; finger.y = e.clientY; finger.moved = true;
    moveCursor(e.clientX, e.clientY); moveStream(e.clientX, e.clientY);
  });
  const padEnd = e => {
    if (e.pointerId !== activeId) return;
    activeId = null; finger = null; cancelAnimationFrame(rafId);
    cursor.style.display = 'none'; stream.style.display = 'none';
    bather.classList.remove('fast');
    if (phase === 'scrub' || phase === 'rinse') mood(bathAnimal, 'happy', 900);
    if (phase === 'scrub' || phase === 'rinse') { checkProgress(); armBathIdle(); }
  };
  pad.addEventListener('pointerup', padEnd);
  pad.addEventListener('pointercancel', padEnd);
  const stream = $('stream');
  let wob = 0;
  function moveCursor(x, y) {
    cursor.style.left = x + 'px'; cursor.style.top = (y - (phase === 'rinse' ? 80 : 20)) + 'px';
    wob += .6;   // the sponge wobbles as you rub
    cursor.style.transform = `translate(-50%,-50%) rotate(${phase === 'rinse' ? -20 : Math.sin(wob) * 18}deg)`;
  }
  function moveStream(x, y) { stream.style.left = (x + 6) + 'px'; stream.style.top = (y - 55) + 'px'; }
  function foamSlide(x, y) {
    const s = document.createElement('div'), size = 8 + Math.random() * 14;
    s.className = 'foam-drop';
    s.style.cssText = `left:${x + (Math.random() - .5) * 50}px;top:${y + 10}px;width:${size}px;height:${size}px`;
    fx.appendChild(s);
    s.animate([{transform:'translate(-50%,-50%)', opacity:1}, {transform:`translate(-50%, ${90 + Math.random() * 90}px) scale(.6)`, opacity:0}],
      {duration: 900 + Math.random() * 400, easing:'cubic-bezier(.5,0,.9,.6)'}).onfinish = () => s.remove();
  }

  function scrubLoop() {
    if (!finger || !(phase === 'scrub' || phase === 'rinse')) return;
    const p = canvasPoint(finger.x, finger.y);
    const dist = Math.hypot(p.x - lastPt.x, p.y - lastPt.y);
    if (dist > 1) { stroke(lastPt, p, dist); lastPt = p; }
    rafId = requestAnimationFrame(scrubLoop);
  }

  function stroke(a, b, dist) {
    const brush = geo.rx * .42;
    const c = (phase === 'scrub' ? mudCv : foamCv).getContext('2d');
    c.save();
    c.globalCompositeOperation = 'destination-out';
    c.lineCap = 'round'; c.lineJoin = 'round'; c.lineWidth = brush;
    c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x + .01, b.y); c.stroke();
    c.restore();
    const now = performance.now(), onBody = inFace(b.x, b.y, 1.15);
    if (phase === 'scrub') {
      foamAt(b.x, b.y, brush * .7, 2);
      if (now - lastSfx > 110) { sfx.scrub(); lastSfx = now; try { navigator.vibrate && navigator.vibrate(8); } catch (_) {} }
      if (now - lastFx > 140) { lastFx = now; floatBubble(finger.x, finger.y); if (onBody) mudSplat(finger.x, finger.y); }
    } else {
      if (now - lastSfx > 90) { sfx.water(); lastSfx = now; if (Math.random() < .5) sfx.plip(); }
      if (now - lastFx > 70) { lastFx = now; drip(finger.x, finger.y + 10); if (onBody) foamSlide(finger.x, finger.y); }
    }
    if (onBody && now - lastTickle > 2200) { lastTickle = now; tickle(); }
    if (now - lastCheck > 300) { lastCheck = now; checkProgress(); }
  }

  function tickle() {
    restartAnim(bathBody, 'bath-body', 'tickle');
    if (finger) mood(bathAnimal, phase === 'rinse' ? 'calm' : 'tickle');
    giggleEl.textContent = phase === 'rinse' ? pick(['😌', '🥰', '😊']) : pick(['😆', '🤭', '😂']);
    restartAnim(giggleEl, 'giggle e', 'show');
    sfx.giggle();
    const now = performance.now();
    if (now - lastTalk > 5000) {
      lastTalk = now;
      say(phase === 'rinse' ? pick(['好舒服～', '水水的好好玩', '嘩啦嘩啦']) : pick(['好癢喔！嘻嘻', '哈哈哈，好癢', '搓搓搓～']));
    }
  }
  function floatBubble(x, y) {
    const s = document.createElement('span');
    s.textContent = '🫧';
    s.style.cssText = `left:${x + (Math.random() - .5) * 50}px;top:${y}px;font-size:${2.5 + Math.random() * 3}vmin`;
    fx.appendChild(s);
    s.animate([{transform:'translate(-50%,-50%) scale(.4)', opacity:.95},
               {transform:`translate(calc(-50% + ${(Math.random() - .5) * 60}px), ${-140 - Math.random() * 120}px) scale(1.1)`, opacity:0}],
      {duration: 1300 + Math.random() * 600, easing:'ease-out'}).onfinish = () => s.remove();
  }
  function mudSplat(x, y) {
    for (let i = 0; i < 2; i++) {
      const s = document.createElement('div'), size = 6 + Math.random() * 10;
      s.className = 'mud-drop';
      s.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px`;
      fx.appendChild(s);
      const dx = (Math.random() - .5) * 220, up = 40 + Math.random() * 60;
      s.animate([{transform:'translate(-50%,-50%)', opacity:1},
                 {transform:`translate(calc(-50% + ${dx * .6}px), calc(-50% - ${up}px))`, opacity:1, offset:.4},
                 {transform:`translate(calc(-50% + ${dx}px), calc(-50% + 120px))`, opacity:0}],
        {duration: 700, easing:'ease-in'}).onfinish = () => s.remove();
    }
  }

  function checkProgress() {
    if (!(phase === 'scrub' || phase === 'rinse')) return;
    const left = coverage(phase === 'scrub' ? mudCv : foamCv) / base;
    if (left > .14) return;
    if (phase === 'scrub') toPop(); else bathDone();
  }

  /* ---- bubbles float up: tap to pop ---- */
  function toPop() {
    phase = 'pop'; busy = true;
    activeId = null; finger = null; cancelAnimationFrame(rafId); cursor.style.display = 'none';
    bather.classList.remove('fast');
    mudCv.style.opacity = '0';
    for (let i = 0; i < 70; i++) { const p = randInFace(1); foamAt(p.x, p.y, geo.rx * .25, 1); }
    sfx.sparkle();
    say('哇！泡泡飛起來了，戳破它！');
    mood(bathAnimal, 'happy');
    const sr = bathStage.getBoundingClientRect(), tub = document.querySelector('.tub').getBoundingClientRect();
    const COUNT = 7; poppedLeft = COUNT;
    for (let i = 0; i < COUNT; i++) {
      later(() => {
        const b = document.createElement('div');
        b.className = 'big-bubble';
        const size = Math.min(sr.width, sr.height) * (.13 + Math.random() * .07);
        const x0 = tub.left - sr.left + tub.width * (.15 + Math.random() * .7) - size / 2;
        const y0 = tub.top - sr.top - size * .3;
        Object.assign(b.style, {left: x0 + 'px', top: y0 + 'px', width: size + 'px', height: size + 'px'});
        bathStage.appendChild(b);
        const sway = (Math.random() - .5) * 160, rise = y0 + size * 1.2;
        const anim = b.animate([
          {transform:'translate(0,0) scale(.3)', offset:0},
          {transform:`translate(${sway * .3}px, ${-rise * .25}px) scale(1)`, offset:.15},
          {transform:`translate(${-sway * .4}px, ${-rise * .6}px) scale(1)`, offset:.55},
          {transform:`translate(${sway}px, ${-rise}px) scale(1.05)`, offset:1}],
          {duration: 6500 + Math.random() * 2500, easing:'linear', fill:'forwards'});
        const done = () => { if (!b.isConnected) return; b.remove(); if (--poppedLeft <= 0) afterPop(); };
        anim.onfinish = done;
        b.addEventListener('pointerdown', ev => {
          ev.preventDefault();
          const r = b.getBoundingClientRect();
          anim.cancel(); b.remove();
          sfx.pop();
          burst(r.left + r.width / 2, r.top + r.height / 2, ['✨', '🫧', '💦'], 6, r.width * 1.6, r.height * .8, [2.5, 4.5]);
          if (--poppedLeft <= 0) afterPop();
        });
      }, 300 + i * 650);
    }
  }
  function afterPop() {
    if (phase !== 'pop') return;
    phase = 'switch';
    say('換蓮蓬頭沖水囉'); mood(bathAnimal, 'normal');
    later(() => {
      setTool('🚿');
      base = Math.max(1, coverage(foamCv));
      phase = 'rinse'; busy = false;
      armBathIdle();
    }, 1000);
  }

  function bathDone() {
    phase = 'done'; busy = true;
    record('bath', bathQueue[bathRound].a);
    activeId = null; finger = null; cancelAnimationFrame(rafId); cursor.style.display = 'none';
    stopBathIdle();
    bather.className = 'bather';
    foamCv.style.transition = 'opacity .4s'; foamCv.style.opacity = '0';
    stream.style.display = 'none';
    bathAnimal.dataset.wet = '1'; mood(bathAnimal, 'calm');      // dripping wet…
    later(() => { restartAnim(bathBody, 'bath-body', 'shakeoff'); mood(bathAnimal, 'tickle'); sfx.water(); }, 500);
    later(() => { bathAnimal.dataset.wet = '0'; mood(bathAnimal, 'happy'); }, 1600);
    later(() => {
      const r = bathAnimal.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height * .45, ['💧'], 18, r.width * 2.4, r.height * .7, [2.5, 4]);
    }, 800);
    later(() => {
      const r = bathAnimal.getBoundingClientRect();
      sfx.happy();
      burst(r.left + r.width / 2, r.top + r.height * .4, ['✨', '⭐', '💗'], 12, r.width * 1.4, r.height * .8);
      say(pick(['洗好了！好香喔', '好乾淨！謝謝你', '香噴噴的！']));
      fillDot(bathProgress, bathRound, bathQueue[bathRound].k);
    }, 1700);
    later(() => {
      bathRound++;
      if (bathRound >= BATH_ROUNDS) { finishSet('bath'); return; }
      restartAnim(bathBody, 'bath-body', 'leave');
      later(nextBath, 520);
    }, 4000);
  }

  /* ================= TAKE ANIMALS HOME 送動物回家 ================= */
  const traveler = $('traveler'), cardA = $('cardA'), cardB = $('cardB'), sortProgress = $('sortProgress');
  const drawHomeAnimal = makeDeck(ANIMALS.filter(x => x.h));
  let sortRound = 0, residents = {}, traveling = null, tdrag = null, sortHint = null, cards = [];
  function startSort() {
    mode = 'sort'; lastGame = 'sort'; clearTimers(); gameStarted('sort');
    sortRound = 0; residents = {};
    makeDots(sortProgress, SORT_ROUNDS);
    show('sort');
    nextSort();
  }
  function renderCard(el, hab) {
    const H = HABITATS[hab];
    el.dataset.hab = hab;
    el.innerHTML = `<div class="mini">${SCENES.svg(H.scene)}</div><div class="icon e">${H.icon}</div><div class="residents"></div>`;
    const res = el.querySelector('.residents');
    (residents[hab] || []).slice(-3).forEach(k => { const d = document.createElement('div'); d.className = 'critter'; d.innerHTML = ART.svg(k); res.appendChild(d); });
    el.setAttribute('aria-label', H.name);
  }
  function nextSort() {
    const [a] = drawHomeAnimal(1);
    traveling = a;
    const other = pick(Object.keys(HABITATS).filter(h => h !== a.h));
    const pair = shuffle([a.h, other]);
    renderCard(cardA, pair[0]); renderCard(cardB, pair[1]);
    cards = [cardA, cardB];
    cards.forEach((c, i) => { restartAnim(c, 'home-card', 'enter'); c.style.animationDelay = (i * .12) + 's'; });
    critter(traveler, a.k);
    traveler.style.transform = '';
    restartAnim(traveler, 'traveler critter', 'enter');
    busy = false;
    later(() => say(`${a.name}要回家，牠住在哪裡呢？`), 500);
    armSortHint();
  }
  function armSortHint() {
    clearTimeout(sortHint);
    sortHint = setTimeout(() => {
      if (busy || screen !== 'sort' || !traveling) return;
      const c = cards.find(x => x.dataset.hab === traveling.h);
      if (c) c.classList.add('hint');
      say(`${traveling.name}住在${HABITATS[traveling.h].name}`);
    }, 10000);
  }
  function cardAt(x, y) {
    return cards.find(c => { const r = c.getBoundingClientRect(); return x > r.left - 20 && x < r.right + 20 && y > r.top - 20 && y < r.bottom + 20; });
  }
  traveler.addEventListener('pointerdown', e => {
    if (busy || activeId !== null || screen !== 'sort') return;
    e.preventDefault();
    activeId = e.pointerId;
    try { traveler.setPointerCapture(e.pointerId); } catch (_) {}
    clearTimeout(sortHint);
    traveler.classList.remove('home', 'enter');
    tdrag = {sx: e.clientX, sy: e.clientY};
    mood(traveler, 'happy'); sfx.pick();
  });
  traveler.addEventListener('pointermove', e => {
    if (!tdrag || e.pointerId !== activeId) return;
    traveler.style.transform = `translate(${e.clientX - tdrag.sx}px,${e.clientY - tdrag.sy}px) scale(.9)`;
    const c = cardAt(e.clientX, e.clientY);
    cards.forEach(x => x.classList.toggle('near', x === c));
  });
  function travelerHome() {
    traveler.classList.add('home'); traveler.style.transform = '';
    setTimeout(() => traveler.classList.remove('home'), 520);
  }
  function endTravel(e, cancelled) {
    if (!tdrag || e.pointerId !== activeId) return;
    activeId = null; tdrag = null;
    cards.forEach(x => x.classList.remove('near'));
    const c = cancelled ? null : cardAt(e.clientX, e.clientY);
    if (!c) { travelerHome(); mood(traveler, 'normal'); sfx.back(); armSortHint(); return; }
    if (c.dataset.hab !== traveling.h) {
      restartAnim(c, 'home-card', 'no'); restartAnim(traveler, 'traveler critter', 'no'); mood(traveler, 'no', 900);
      sfx.no(); travelerHome();
      stats.sortWrong++; store.set('stats', stats);
      say(`${traveling.name}不住這裡喔`);
      armSortHint(); return;
    }
    goHomeCard(c);
  }
  traveler.addEventListener('pointerup', e => endTravel(e, false));
  traveler.addEventListener('pointercancel', e => endTravel(e, true));
  function goHomeCard(c) {
    busy = true;
    const a = traveling;
    const tr = traveler.getBoundingClientRect(), cr = c.getBoundingClientRect();
    const cur = traveler.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
    const bx = cur ? +cur[1] : 0, by = cur ? +cur[2] : 0;
    traveler.classList.add('going');
    traveler.style.transform = `translate(${bx + cr.left + cr.width / 2 - (tr.left + tr.width / 2)}px,${by + cr.bottom - cr.height * .25 - (tr.top + tr.height / 2)}px) scale(.3)`;
    (residents[a.h] = residents[a.h] || []).push(a.k);
    stats.sortRight++; record('sort', a.a);
    later(() => {
      renderCard(c, a.h);
      c.className = 'home-card';
      const last = c.querySelector('.residents .critter:last-child');
      if (last) { last.dataset.mood = 'happy'; last.animate([{transform:'scale(0)'}, {transform:'scale(1.2)'}, {transform:'scale(1)'}], {duration: 500, easing:'ease-out'}); }
      sfx.happy();
      burst(cr.left + cr.width / 2, cr.top + cr.height * .6, ['💗', '⭐', '✨'], 8, cr.width, cr.height * .8);
      say(`${a.name}回到${HABITATS[a.h].name}了！`);
      fillDot(sortProgress, sortRound, a.k);
    }, 450);
    later(() => {
      sortRound++;
      if (sortRound >= SORT_ROUNDS) { finishSet('sort'); return; }
      nextSort();
    }, 2400);
  }

  /* ================= MEMORY MATCH 配對翻牌 ================= */
  const matchGrid = $('matchGrid'), matchProgress = $('matchProgress');
  let mcards = [], firstPick = null, pairsFound = 0, pairsTotal = 10, matchHint = null, matchTries = 0;
  function layoutMatch() {
    const n = mcards.length; if (!n) return;
    const portrait = innerHeight > innerWidth;
    const cols = portrait ? ({8: 2, 12: 3, 20: 4})[n] : ({8: 4, 12: 4, 20: 5})[n];
    const rows = Math.ceil(n / cols);
    const top = matchGrid.getBoundingClientRect().top;
    const gap = Math.max(8, Math.min(innerWidth, innerHeight) * .018);
    const availW = innerWidth * .94, availH = innerHeight - top - innerHeight * .04;
    const w = Math.floor(Math.min((availW - gap * (cols - 1)) / cols, (availH - gap * (rows - 1)) / rows / 1.1));
    matchGrid.style.setProperty('--mgap', gap + 'px');
    matchGrid.style.setProperty('--mw', w + 'px');
    matchGrid.style.gridTemplateColumns = `repeat(${cols}, ${w}px)`;
    matchGrid.style.gridAutoRows = Math.round(w * 1.1) + 'px';
  }
  function startMatch() {
    mode = 'match'; lastGame = 'match'; clearTimers(); clearTimeout(matchHint); gameStarted('match');
    show('match');
    setScene(randomScene());
    pairsTotal = +settings.pairs || 10; pairsFound = 0; firstPick = null; busy = true; matchTries = 0;
    makeDots(matchProgress, pairsTotal);
    const animals = drawAnimals(pairsTotal);
    const deck = shuffle([...animals, ...animals]);
    matchGrid.innerHTML = '';
    mcards = deck.map((a, i) => {
      const b = document.createElement('button');
      b.className = 'mcard deal';
      b.style.animationDelay = (i * .03) + 's';
      b.setAttribute('aria-label', '翻開卡片');
      b.innerHTML = '<div class="in"><div class="face back e">🐾</div><div class="face front"><div class="critter"></div></div></div>';
      const cr = b.querySelector('.critter'); critter(cr, a.k);
      const card = {el: b, a, cr, up: false, done: false};
      b.addEventListener('click', () => flipCard(card));
      matchGrid.appendChild(b);
      return card;
    });
    layoutMatch();
    // quick peek at every card first, then they turn over
    const peekMs = 1800 + pairsTotal * 160;
    later(() => { mcards.forEach(c => c.el.classList.add('up')); say('記住牠們在哪裡喔'); }, 700);
    later(() => {
      mcards.forEach(c => c.el.classList.remove('up'));
      sfx.back();
      later(() => { busy = false; say('翻翻看，找到一樣的動物'); armMatchHint(); }, 600);
    }, 700 + peekMs);
  }
  function armMatchHint() {
    clearTimeout(matchHint);
    matchHint = setTimeout(() => {
      if (busy || screen !== 'match') return;
      const left = mcards.filter(c => !c.done && !c.up);
      if (!left.length) return;
      const a = pick(left).a;
      left.filter(c => c.a === a).forEach(c => restartAnim(c.el, 'mcard', 'wiggle'));
    }, 12000);
  }
  function flipCard(c) {
    if (busy || resting || c.up || c.done || screen !== 'match') return;
    clearTimeout(matchHint);
    c.up = true; c.el.className = 'mcard up';
    sfx.pick();
    mood(c.cr, 'happy', 700);
    if (!firstPick) { firstPick = c; say(c.a.name); armMatchHint(); return; }
    const a = firstPick, b = c; firstPick = null; busy = true;
    matchTries++;
    if (a.a === b.a) {
      later(() => {
        [a, b].forEach(x => { x.done = true; x.el.className = 'mcard up matched'; mood(x.cr, 'happy'); });
        sfx.happy();
        const r = b.el.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2, ['⭐', '✨', '💛'], 8, r.width * 2, r.height);
        say(`兩隻${a.a.name}！`);
        fillDot(matchProgress, pairsFound, a.a.k);
        pairsFound++;
        record('match', a.a.a);
        if (pairsFound >= pairsTotal) {
          const ms = (stats.matchSizes[pairsTotal] = stats.matchSizes[pairsTotal] || {done: 0, best: 0});
          ms.done++; if (!ms.best || matchTries < ms.best) ms.best = matchTries;
          store.set('stats', stats);
          later(() => { say('全部配對成功！好厲害'); mcards.forEach((x, i) => setTimeout(() => restartAnim(x.el, 'mcard up matched', 'wiggle'), i * 40)); }, 900);
          later(() => finishSet('match'), 3000);
        } else { busy = false; armMatchHint(); }
      }, 450);
    } else {
      say(b.a.name);
      later(() => {
        [a, b].forEach(x => { x.up = false; x.el.className = 'mcard'; mood(x.cr, 'normal'); });
        sfx.back();
        busy = false; armMatchHint();
      }, 1300);
    }
  }
  addEventListener('resize', () => { if (screen === 'match') layoutMatch(); });

  /* ================= stickers: draw a card, then place it ================= */
  let cardTimers = [];
  function chooseSticker() {
    const missing = STICKERS.filter(s => !stickers[s[0]]);
    return missing.length ? pick(missing) : pick(STICKERS);
  }
  function finishSet(which) {
    gameDone(which);
    busy = true; stopFeedIdle(); stopBathIdle();
    const cards = $('cards'); cards.innerHTML = '';
    cards.className = 'cards cards-enter';
    let picked = false;
    for (let i = 0; i < 3; i++) {
      const c = document.createElement('button');
      c.className = 'card'; c.setAttribute('aria-label', '選一張卡片');
      c.style.animationDelay = (i * .12) + 's';
      c.innerHTML = '<div class="card-inner"><div class="card-face card-back e">⭐</div><div class="card-face card-front e"></div></div>';
      c.addEventListener('click', () => {
        if (picked) return; picked = true;
        cardTimers.forEach(clearTimeout); cardTimers = [];
        cards.querySelectorAll('.card').forEach(x => x.classList.remove('wiggle'));
        const s = chooseSticker();
        stickers[s[0]] = (stickers[s[0]] || 0) + 1;      // saved right away, even if they leave now
        store.set('stickers', stickers);
        c.querySelector('.card-front').textContent = s[0];
        c.classList.add('flipped');
        cards.querySelectorAll('.card').forEach(x => x !== c && x.classList.add('fade'));
        sfx.sparkle();
        later(() => { sfx.happy(); say(`是${s[1]}！`); }, 500);
        later(() => startPlacing(s), 2400);
      });
      cards.appendChild(c);
    }
    $('reward').classList.remove('hidden');
    sfx.win();
    say('好棒！選一張卡片');
    if (!reduceMotion) confetti();
    // gently invite a tap, one card at a time
    let k = 0;
    const nudge = () => {
      if (picked) return;
      const all = cards.querySelectorAll('.card');
      all.forEach(x => x.classList.remove('wiggle'));
      all[k % 3].classList.add('wiggle'); k++;
      cardTimers.push(setTimeout(nudge, 1600));
    };
    cardTimers.push(setTimeout(nudge, 1800));
  }
  function confetti() {
    const canvas = $('confetti'), c = canvas.getContext('2d'), dpr = devicePixelRatio || 1;
    const w = canvas.width = innerWidth * dpr, h = canvas.height = innerHeight * dpr;
    const colors = ['#FF8A3D', '#FFC93C', '#7CC86A', '#8FD6F5', '#FF6B8B', '#B48CF2'];
    const ps = Array.from({length: 140}, () => ({
      x: Math.random() * w, y: -Math.random() * h * .6, vx: (Math.random() - .5) * 3 * dpr, vy: (2 + Math.random() * 4) * dpr,
      s: (6 + Math.random() * 8) * dpr, r: Math.random() * 6, vr: (Math.random() - .5) * .3, col: pick(colors)}));
    const end = performance.now() + 4500;
    (function frame(t) {
      c.clearRect(0, 0, w, h);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.r += p.vr; c.save(); c.translate(p.x, p.y); c.rotate(p.r); c.fillStyle = p.col; c.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); c.restore(); });
      if (t < end && !$('reward').classList.contains('hidden')) requestAnimationFrame(frame); else c.clearRect(0, 0, w, h);
    })(performance.now());
  }

  function renderBook(placing) {
    const page = $('bookPage'); page.innerHTML = '';
    STICKERS.forEach(([ch, name], i) => {
      let n = stickers[ch] || 0;
      if (placing && ch === placing[0]) n -= 1;          // the new one isn't stuck in yet
      const b = document.createElement('button');
      b.className = 'sticker e ' + (n ? 'got' : 'empty');
      b.textContent = ch; b.dataset.ch = ch; b.dataset.name = name;
      b.style.transform = n ? `rotate(${(i * 37 % 15) - 7}deg)` : '';
      b.setAttribute('aria-label', n ? name : '還沒有的貼紙');
      if (n > 1) { const c = document.createElement('span'); c.className = 'count'; c.textContent = '×' + n; b.appendChild(c); }
      b.addEventListener('click', () => {
        if (b.classList.contains('empty')) { sfx.back(); return; }
        restartAnim(b, 'sticker e got', 'boing'); sfx.pick(); say(name);
      });
      page.appendChild(b);
    });
  }
  function openBook() {
    mode = 'book';
    stats.bookOpens++; store.set('stats', stats);
    $('book').classList.remove('placing');
    renderBook(null);
    show('book');
    const got = Object.keys(stickers).length;
    say(got ? `你有${got}張貼紙` : '玩遊戲就可以拿到貼紙喔');
  }

  /* ---- drag the new sticker to its matching silhouette ---- */
  const floatEl = $('floatSticker');
  let placingSticker = null, pdrag = null, placeHint = null;
  function startPlacing(s) {
    $('reward').classList.add('hidden');
    placingSticker = s;
    renderBook(s);
    $('book').classList.add('placing');
    show('book');
    $('afterPlace').classList.add('hidden');
    floatEl.textContent = s[0];
    floatEl.style.transform = '';
    restartAnim(floatEl, 'float-sticker e', 'enter');
    busy = false;
    say(`把${s[1]}貼到貼紙簿裡`);
    armPlaceHint();
  }
  function targetSlot() { return document.querySelector(`.sticker[data-ch="${placingSticker[0]}"]`); }
  function armPlaceHint() {
    clearTimeout(placeHint);
    placeHint = setTimeout(() => { if (placingSticker) { const t = targetSlot(); if (t && t.classList.contains('empty')) t.classList.add('hint'); } }, 6000);
  }
  floatEl.addEventListener('pointerdown', e => {
    if (!placingSticker || activeId !== null) return;
    e.preventDefault();
    activeId = e.pointerId;
    try { floatEl.setPointerCapture(e.pointerId); } catch (_) {}
    clearTimeout(placeHint);
    floatEl.classList.remove('home', 'enter');
    floatEl.classList.add('dragging');
    pdrag = {sx: e.clientX, sy: e.clientY};
    sfx.pick();
  });
  floatEl.addEventListener('pointermove', e => {
    if (!pdrag || e.pointerId !== activeId) return;
    floatEl.style.transform = `translate(${e.clientX - pdrag.sx}px,${e.clientY - pdrag.sy}px) scale(1.1)`;
  });
  function slotAt(x, y) {
    let best = null, bd = Infinity;
    document.querySelectorAll('#bookPage .sticker').forEach(b => {
      const r = b.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const d = Math.hypot(x - cx, y - cy);
      if (d < Math.max(r.width, r.height) * .75 && d < bd) { bd = d; best = b; }
    });
    return best;
  }
  function floatHome() {
    floatEl.classList.add('home'); floatEl.style.transform = '';
    setTimeout(() => floatEl.classList.remove('home'), 520);
  }
  function endPlaceDrag(e, cancelled) {
    if (!pdrag || e.pointerId !== activeId) return;
    activeId = null; floatEl.classList.remove('dragging');
    const slot = cancelled ? null : slotAt(e.clientX, e.clientY);
    pdrag = null;
    if (!slot) { floatHome(); sfx.back(); armPlaceHint(); return; }
    if (slot.dataset.ch !== placingSticker[0]) {
      restartAnim(slot, slot.className.replace(/\s*(no|boing|hint)\b/g, ''), 'no');
      sfx.no(); floatHome();
      say('不是這裡喔，找找看一樣的形狀');
      armPlaceHint(); return;
    }
    stickIn(slot);
  }
  floatEl.addEventListener('pointerup', e => endPlaceDrag(e, false));
  floatEl.addEventListener('pointercancel', e => endPlaceDrag(e, true));

  function stickIn(slot) {
    const s = placingSticker; placingSticker = null;
    const fr = floatEl.getBoundingClientRect(), sr = slot.getBoundingClientRect();
    const cur = floatEl.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
    const bx = cur ? +cur[1] : 0, by = cur ? +cur[2] : 0;
    const dx = bx + (sr.left + sr.width / 2) - (fr.left + fr.width / 2), dy = by + (sr.top + sr.height / 2) - (fr.top + fr.height / 2);
    floatEl.classList.add('placed');
    floatEl.style.transform = `translate(${dx}px,${dy}px) scale(.6)`;
    setTimeout(() => {
      floatEl.classList.add('hidden');
      const n = stickers[s[0]] || 1, i = STICKERS.findIndex(x => x[0] === s[0]);
      slot.className = 'sticker e got';
      slot.style.transform = `rotate(${(i * 37 % 15) - 7}deg)`;
      slot.setAttribute('aria-label', s[1]);
      slot.querySelectorAll('.count').forEach(c => c.remove());
      if (n > 1) { const c = document.createElement('span'); c.className = 'count'; c.textContent = '×' + n; slot.appendChild(c); }
      restartAnim(slot, 'sticker e got', 'boing');
      sfx.happy();
      burst(sr.left + sr.width / 2, sr.top + sr.height / 2, ['✨', '⭐', '💛'], 10, sr.width * 3, sr.height * 2);
      say(`貼好了！好棒`);
      $('stickerCount').textContent = Object.keys(stickers).length;
      setTimeout(() => $('afterPlace').classList.remove('hidden'), 900);
    }, 300);
  }

  /* ================= rest reminder ================= */
  let playMs = 0, resting = false, tick = performance.now(), statTick = 0;
  addEventListener('pagehide', () => store.set('stats', stats));
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') store.set('stats', stats); });
  setInterval(() => {
    const now = performance.now(), dt = now - tick; tick = now;
    const playing = ['feed', 'bath', 'sort', 'match'].includes(screen) && $('reward').classList.contains('hidden') && !resting && document.visibilityState === 'visible';
    if (playing) {
      const d = Math.min(dt, 2000);
      playMs += d;
      stats.playMs += d;
      const k = dayKey(); stats.daily[k] = (stats.daily[k] || 0) + d;
      gameStat(screen).ms += d;
      if (++statTick % 15 === 0) {            // save every ~15 s
        const keep = Object.keys(stats.daily).sort().slice(-30);
        stats.daily = Object.fromEntries(keep.map(x => [x, stats.daily[x]]));
        const keepG = Object.keys(stats.dailyGames).sort().slice(-30);
        stats.dailyGames = Object.fromEntries(keepG.map(x => [x, stats.dailyGames[x]]));
        store.set('stats', stats);
      }
    }
    const limit = (+settings.rest) * 60 * 1000;
    if (limit && playing && !busy && activeId === null && playMs >= limit) {
      resting = true; stopFeedIdle(); stopBathIdle();
      $('rest').classList.remove('hidden');
      say('我們休息一下吧');
    }
  }, 1000);

  function holdButton(btn, ring, ms, onDone) {
    const CIRC = 113.1; let start = 0, raf = 0;
    const tickHold = t => {
      const p = Math.min((t - start) / ms, 1);
      ring.style.strokeDashoffset = CIRC * (1 - p);
      if (p >= 1) { end(); onDone(); return; }
      raf = requestAnimationFrame(tickHold);
    };
    const end = () => { cancelAnimationFrame(raf); ring.style.strokeDashoffset = CIRC; };
    btn.addEventListener('pointerdown', e => { e.preventDefault(); start = performance.now(); raf = requestAnimationFrame(tickHold); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => btn.addEventListener(ev, end));
  }
  holdButton($('holdBtn'), $('restRing'), 3000, () => {
    resting = false; playMs = 0; $('rest').classList.add('hidden');
    if (screen === 'feed') armFeedIdle(); else if (screen === 'bath') armBathIdle(); else if (screen === 'sort') armSortHint(); else if (screen === 'match') armMatchHint();
  });

  /* ================= settings ================= */
  function syncChoices() {
    document.querySelectorAll('[data-level]').forEach(b => b.setAttribute('aria-pressed', String(settings.levels.includes(b.dataset.level))));
    document.querySelectorAll('[data-rest]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.rest === +settings.rest)));
    document.querySelectorAll('[data-pairs]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.pairs === +settings.pairs)));
    document.querySelectorAll('[data-bg]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.bg === settings.bg)));
  }
  const GAME_INFO = {feed: ['🐵', '餵小動物'], bath: ['🛁', '幫動物洗澡'], sort: ['🏠', '送動物回家'], match: ['🃏', '配對翻牌']};
  const FEED_LEVELS = {1: '找食物', 2: '數數看', 3: '認顏色', 4: '分給兩隻'};
  const GAME_EXTRA = {
    feed: () => Object.entries(FEED_LEVELS).map(([k, n]) => `${n} <b>${stats.feedLevels[k] || 0}</b> 題`),
    sort: () => [`送對 <b>${stats.sortRight}</b> 次`, `送錯 <b>${stats.sortWrong}</b> 次`],
    match: () => Object.entries(stats.matchSizes).sort((x, y) => x[0] - y[0])
      .map(([n, m]) => `${n} 對完成 <b>${m.done}</b> 次（最快翻 ${m.best} 次）`),
  };
  function fmtTime(ms) {
    const m = Math.round(ms / 60000);
    if (m < 1) return ms > 0 ? '不到 1 分' : '0 分';
    return m < 60 ? `${m} 分` : `${Math.floor(m / 60)} 小時 ${m % 60} 分`;
  }
  function renderStats() {
    const box = $('statsBox');
    const totalStarted = Object.values(stats.games).reduce((n, g) => n + g.started, 0);
    const totalDone = Object.values(stats.games).reduce((n, g) => n + g.done, 0);
    const pct = (ok, bad) => ok + bad ? Math.round(ok / (ok + bad) * 100) + '%' : '—';
    const rate = pct(stats.feedRight, stats.feedWrong);
    const today = dayKey();
    const days = Array.from({length: 7}, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d; });
    const maxDay = Math.max(1, ...days.map(d => stats.daily[dayKey(d)] || 0));
    const WD = '日一二三四五六';
    let html = `<div class="sum">
      <div><b>${fmtTime(stats.playMs)}</b><span>總共玩了</span></div>
      <div><b>${fmtTime(stats.daily[today] || 0)}</b><span>今天玩了</span></div>
      <div><b>${totalStarted} 次</b><span>開始遊戲</span></div>
      <div><b>${totalDone} 次</b><span>完成遊戲</span></div>
      <div><b>${stats.opens} 次</b><span>打開 App</span></div>
      <div><b>${Object.keys(stickers).length} / ${STICKERS.length}</b><span>收集的貼紙</span></div>
      <div><b>${rate}</b><span>餵食答對率</span></div>
      <div><b>${pct(stats.sortRight, stats.sortWrong)}</b><span>送回家答對率</span></div>
      <div><b>${stats.firstDay ? stats.firstDay.slice(5).replace('-', '/') : '—'}</b><span>開始玩的日子</span></div>
    </div>
    <p class="sub-h">最近 7 天（分鐘）</p>
    <div class="week">${days.map(d => { const k = dayKey(d), v = stats.daily[k] || 0;
      return `<div class="col${k === today ? ' today' : ''}"><span class="v">${Math.round(v / 60000)}</span><div class="bar" style="height:${Math.max(3, v / maxDay * 70)}px"></div><span>${k === today ? '今天' : WD[d.getDay()]}</span></div>`; }).join('')}</div>
    <p class="sub-h">各個遊戲</p>
    <div class="games">${Object.entries(GAME_INFO).map(([g, [ic, nm]]) => { const s = stats.games[g] || {started: 0, done: 0, ms: 0};
      const todayN = (stats.dailyGames[today] || {})[g] || 0;
      const more = [`今天 <b>${todayN}</b> 次`, s.last ? `上次 ${s.last.slice(5).replace('-', '/')}` : '還沒玩過', ...(GAME_EXTRA[g] ? GAME_EXTRA[g]() : [])];
      return `<div class="row"><span class="e">${ic}</span><span>${nm}<br>玩 <b>${s.started}</b> 次・完成 <b>${s.done}</b> 次・${fmtTime(s.ms)}<small>${more.join('・')}</small></span></div>`; }).join('')}
      <div class="row"><span class="e">📒</span><span>貼紙簿<br>打開 <b>${stats.bookOpens}</b> 次・收集 <b>${Object.keys(stickers).length}</b> 張</span></div></div>
    <p class="sub-h">每隻動物</p>
    <div class="stats" id="statsList"></div>`;
    box.innerHTML = html;
    const list = $('statsList');
    const names = {};
    ANIMALS.forEach(x => names[x.a] = x.name);
    const KINDS = [['feed', '餵'], ['bath', '洗'], ['sort', '送回家'], ['match', '配對']];
    const total = k => KINDS.reduce((n, [kind]) => n + (stats[kind][k] || 0), 0);
    const all = [...new Set(KINDS.flatMap(([kind]) => Object.keys(stats[kind])))].sort((x, y) => total(y) - total(x));
    if (!all.length) { list.innerHTML = '<p class="stats-empty">還沒有紀錄，玩過之後這裡會顯示每隻動物被餵、洗、送回家和配對了幾次。</p>'; return; }
    all.forEach(k => {
      const d = document.createElement('div'); d.className = 'stat';
      const parts = KINDS.filter(([kind]) => stats[kind][k]).map(([kind, nm]) => `${nm} <b>${stats[kind][k]}</b> 次`);
      d.innerHTML = `<span class="e">${k}</span><span class="nums">${names[k] || ''}<br>${parts.join('・')}</span>`;
      list.appendChild(d);
    });
  }
  holdButton($('gearBtn'), $('gearRing'), 2000, () => { syncChoices(); renderStats(); $('settings').classList.remove('hidden'); });
  document.querySelectorAll('[data-level]').forEach(b => b.addEventListener('click', () => {
    const lv = b.dataset.level, on = settings.levels.includes(lv);
    if (on && settings.levels.length === 1) { b.animate([{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}], 250); return; }
    settings.levels = on ? settings.levels.filter(x => x !== lv) : [...settings.levels, lv].sort();
    store.set('settings', settings); syncChoices();
  }));
  document.querySelectorAll('[data-rest]').forEach(b => b.addEventListener('click', () => { settings.rest = +b.dataset.rest; store.set('settings', settings); syncChoices(); }));
  document.querySelectorAll('[data-pairs]').forEach(b => b.addEventListener('click', () => { settings.pairs = +b.dataset.pairs; store.set('settings', settings); syncChoices(); }));
  document.querySelectorAll('[data-bg]').forEach(b => b.addEventListener('click', () => { settings.bg = b.dataset.bg; store.set('settings', settings); syncChoices(); }));
  function confirmButton(btn, label, onClear) {
    let armed = false;
    btn.addEventListener('click', () => {
      if (!armed) { armed = true; btn.textContent = '再按一次確認'; btn.classList.add('danger'); return; }
      armed = false; onClear(); btn.textContent = '已清除'; btn.classList.remove('danger');
    });
    btn.reset = () => { armed = false; btn.textContent = label; btn.classList.remove('danger'); };
  }
  confirmButton($('clearBtn'), '清除貼紙簿', () => { stickers = {}; store.set('stickers', stickers); $('stickerCount').textContent = '0'; });
  confirmButton($('clearStatsBtn'), '清除紀錄', () => { stats = freshStats(); stats.firstDay = dayKey(); store.set('stats', stats); renderStats(); });
  $('closeSet').addEventListener('click', () => {
    $('settings').classList.add('hidden');
    $('clearBtn').reset(); $('clearStatsBtn').reset();
  });

  /* ================= guards ================= */
  addEventListener('resize', () => { if (screen === 'bath' && (phase === 'scrub' || phase === 'rinse' || phase === 'pop')) { document.querySelectorAll('.big-bubble').forEach(b => b.remove()); /* keep simple: restart this animal */ clearTimers(); stopBathIdle(); nextBath(); } });
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('dblclick', e => e.preventDefault());

  $('stickerCount').textContent = Object.keys(stickers).length;
  show('home');
})();

/* PWA：註冊 service worker（離線可玩、可安裝） */
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
