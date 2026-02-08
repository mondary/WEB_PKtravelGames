import './style.css'

const app = document.querySelector('#app')

let db = null;
let state = {
  view: 'home',
  gameData: null,
  score: 0,
  timer: 0,
  step: 'question',
  shuffledIndices: [],
  currentCardPointer: 0,
  players: [],
  undercoverCount: 1,
  whiteCount: 0,
  currentPlayerIndex: 0,
  revealPhase: false,
  childMode: false,
  dbReady: false
}

// Initialize SQLite
async function initDatabase() {
  try {
    const initSqlJs = window.initSqlJs;
    const SQL = await initSqlJs({
      locateFile: file => `/${file}`
    });

    const response = await fetch('/games.db');
    const arrayBuffer = await response.arrayBuffer();
    db = new SQL.Database(new Uint8Array(arrayBuffer));

    state.dbReady = true;
    render();
  } catch (err) {
    console.error("Failed to load database:", err);
    app.innerHTML = `<div class="screen"><div class="card">Erreur de chargement de la base de données.</div></div>`;
  }
}

function setState(newState) {
  state = { ...state, ...newState }
  render()
}

function render() {
  app.innerHTML = ''

  if (!state.dbReady) {
    app.innerHTML = `
      <div class="screen">
        <div class="title-container">
          <h1 class="app-title">Chargement...</h1>
          <p style="color: rgba(255,255,255,0.5);">Préparation de la base de données</p>
        </div>
      </div>
    `;
    return;
  }

  switch (state.view) {
    case 'home': renderHome(); break
    case 'pigeon': renderPigeon(); break
    case 'heads-up': renderHeadsUp(); break
    case 'undercover': renderUndercover(); break
  }
}

function renderHome() {
  const view = document.createElement('div')
  view.className = 'screen'
  view.innerHTML = `
    <img src="/logo.png" alt="Travel Games Logo" class="hero-logo">
    <div class="title-container">
      <h1 class="app-title">Travel Games</h1>
      <p style="color: rgba(255,255,255,0.5); font-weight: 500; font-size: 0.9rem; margin-top: 0.5rem;">BY POUARK</p>
    </div>
    <div class="menu-grid">
      <button class="button menu-item" id="btn-pigeon" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; align-items: stretch;">
        <img src="/pigeon.png" style="width: 100%; height: 60%; object-fit: cover;">
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 800;">
          LE PIGEON
        </div>
      </button>

      <button class="button secondary menu-item" id="btn-heads-up" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; align-items: stretch;">
        <img src="/frontal.png" style="width: 100%; height: 60%; object-fit: cover;">
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 800;">
          LE FRONTAL
        </div>
      </button>

      <button class="button menu-item" id="btn-undercover" style="background: linear-gradient(135deg, #374151 0%, #111827 100%); padding: 0; overflow: hidden; display: flex; flex-direction: column; align-items: stretch;">
        <img src="/espion.png" style="width: 100%; height: 60%; object-fit: cover;">
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-weight: 800;">
          L'ESPION
        </div>
      </button>
    </div>
  `
  app.appendChild(view)

  document.querySelector('#btn-pigeon').onclick = () => {
    startPigeon();
  }

  document.querySelector('#btn-heads-up').onclick = () => startHeadsUp()
  document.querySelector('#btn-undercover').onclick = () => setState({ view: 'undercover', step: 'setup', players: [] })
}

function startPigeon() {
  const mode = state.childMode ? 'kids' : 'adult';
  const res = db.exec(`SELECT id FROM pigeon WHERE mode = '${mode}'`);
  const ids = res[0].values.map(v => v[0]);

  // Shuffle
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]]
  }

  setState({
    view: 'pigeon',
    shuffledIndices: ids,
    currentCardPointer: 0
  })
}

// --- PIGEON ---
function renderPigeon() {
  const currentId = state.shuffledIndices[state.currentCardPointer];
  const res = db.exec(`SELECT * FROM pigeon WHERE id = ${currentId}`);
  const qData = res[0].values[0];
  const q = {
    id: qData[0],
    question: qData[1],
    answer: qData[2],
    fakes: [qData[3], qData[4]],
    mode: qData[5]
  };

  const totalPossible = state.childMode ? 100 : 500;

  const view = document.createElement('div')
  view.className = 'screen'

  view.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 0.5rem;">
      <button class="ghost close-btn" id="btn-back-home" style="padding: 0.5rem;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>

      <div class="toggle-container" style="margin-bottom: 0;">
        <span class="label" style="margin-bottom:0; font-size:0.7rem;">Mode Enfant</span>
        <label class="switch">
          <input type="checkbox" id="child-mode-toggle" ${state.childMode ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div style="text-align: center; margin-bottom: 1.5rem;">
      <div class="score-badge">CARTE ${state.currentCardPointer + 1} / ${totalPossible} ${state.childMode ? '<span class="child-tag">Aidé</span>' : ''}</div>
    </div>

    <div class="card">
      <span class="label">Question</span>
      <div class="question-text">${q.question}</div>
      
      <span class="label">La réponse (vrai) :</span>
      <div class="answer-preview" style="font-size: 1.2rem; margin-bottom: 2rem;">${q.answer}</div>
      
      <div style="display: flex; flex-direction: column; gap: 0.8rem;">
        <div class="player-item" style="border-style: ${state.childMode ? 'solid' : 'dashed'}; opacity: ${state.childMode ? '1' : '0.6'};">
          <span style="font-size: 0.9rem; color: ${state.childMode ? 'var(--primary-light)' : 'var(--secondary)'};">
            ${state.childMode ? q.fakes[0] : '[ Mensonge 1 à inventer ]'}
          </span>
        </div>
        <div class="player-item" style="border-style: ${state.childMode ? 'solid' : 'dashed'}; opacity: ${state.childMode ? '1' : '0.6'};">
          <span style="font-size: 0.9rem; color: ${state.childMode ? 'var(--primary-light)' : 'var(--secondary)'};">
            ${state.childMode ? q.fakes[1] : '[ Mensonge 2 à inventer ]'}
          </span>
        </div>
      </div>
    </div>

    <div style="margin-top: 1.5rem; width: 100%;">
      <button class="button" id="btn-next-pigeon" style="width: 100%; height: 60px; font-size: 1.2rem; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">SUIVANT ✨</button>
    </div>
  `
  app.appendChild(view)

  document.querySelector('#child-mode-toggle').onchange = (e) => {
    state.childMode = e.target.checked;
    startPigeon();
  }

  document.querySelector('#btn-back-home').onclick = () => setState({ view: 'home' })
  document.querySelector('#btn-next-pigeon').onclick = () => {
    if (state.currentCardPointer < state.shuffledIndices.length - 1) {
      setState({ currentCardPointer: state.currentCardPointer + 1 })
    } else {
      alert("🏆 Deck terminé ! On remélange ?")
      startPigeon();
    }
  }
}

// --- HEADS UP ---
let headsUpTimer = null
let headsUpCards = []
let lastTilt = 0

function startHeadsUp() {
  setState({ view: 'heads-up', step: 'setup' })
}

function confirmStartHeadsUp() {
  const category = state.childMode ? 'kids' : 'standard';
  const res = db.exec(`SELECT content FROM heads_up WHERE category = '${category}'`);
  headsUpCards = res[0].values.map(v => v[0]).sort(() => Math.random() - 0.5);

  setState({ step: 'countdown', timer: 60, score: 0, currentCardIndex: 0 })
  setTimeout(() => { setState({ step: 'active' }); startTimer(); initMotion(); }, 2000)
}

function startTimer() {
  headsUpTimer = setInterval(() => { if (state.timer > 0) setState({ timer: state.timer - 1 }); else endHeadsUp(); }, 1000)
}

function endHeadsUp() {
  clearInterval(headsUpTimer); window.removeEventListener('deviceorientation', handleOrientation)
  alert(`🏁 SCORE : ${state.score}`); setState({ view: 'home' })
}

function initMotion() {
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission().then(r => { if (r == 'granted') window.addEventListener('deviceorientation', handleOrientation) })
  } else window.addEventListener('deviceorientation', handleOrientation)
}

function handleOrientation(event) {
  const beta = event.beta; if (state.step !== 'active') return;
  if (beta > 130 && lastTilt === 0) { lastTilt = 1; handleHeadsUpAction(true); }
  else if (beta < 40 && lastTilt === 0) { lastTilt = -1; handleHeadsUpAction(false); }
  else if (beta > 70 && beta < 110) lastTilt = 0;
}

function handleHeadsUpAction(isSuccess) {
  if (isSuccess) { state.score++; if (navigator.vibrate) navigator.vibrate(100); }
  else { if (navigator.vibrate) navigator.vibrate([50, 50]); }
  state.currentCardIndex++; if (state.currentCardIndex >= headsUpCards.length) endHeadsUp(); else render();
}

function renderHeadsUp() {
  const view = document.createElement('div'); view.className = 'screen'

  if (state.step === 'setup') {
    view.innerHTML = `
      <div class="card" style="text-align:center;">
        <div class="icon-circle" style="margin: 0 auto 1.5rem;">📱</div>
        <h2 class="app-title" style="font-size: 2rem; margin-bottom: 2rem;">Le Frontal</h2>
        
        <div class="toggle-container" style="justify-content: center; margin-bottom: 2rem;">
          <span class="label" style="margin-bottom:0; font-size:1rem;">Mode Enfant 👶</span>
          <label class="switch">
            <input type="checkbox" id="heads-up-child-toggle" ${state.childMode ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>
        
        <p style="color:rgba(255,255,255,0.5); font-size:0.9rem; margin-bottom:2rem;">
          Place le téléphone sur ton front.<br>
          Tes amis doivent te faire deviner le mot !
        </p>
        
        <button class="button" id="hu-start-btn" style="width:100%">C'EST PARTI !</button>
      </div>
      <button class="button ghost" id="hu-back-btn">RETOUR</button>
    `
    app.appendChild(view)
    document.querySelector('#heads-up-child-toggle').onchange = (e) => setState({ childMode: e.target.checked })
    document.querySelector('#hu-start-btn').onclick = () => confirmStartHeadsUp()
    document.querySelector('#hu-back-btn').onclick = () => setState({ view: 'home' })

  } else if (state.step === 'countdown') {
    view.innerHTML = `<div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;"><div style="font-size: 6rem; font-weight: 900; color: var(--accent); animation: pulse 1s infinite;">3</div><p class="label">SUR LE FRONT !</p></div>`
    app.appendChild(view)
  } else {
    const card = headsUpCards[state.currentCardIndex]
    view.innerHTML = `<div style="text-align: center;"><div class="timer-pill">${state.timer}S</div></div><div class="huge-card card">${card}</div><div style="text-align: center;"><div class="score-badge">SCORE: ${state.score} ${state.childMode ? '<span class="child-tag">Kids</span>' : ''}</div><div class="label" style="margin-top: 2rem; opacity: 0.5;">↑ TILT ARRIÈRE = OK<br>↓ TILT AVANT = PASSER</div></div>`
    app.appendChild(view)
  }
}

// --- UNDERCOVER ---
function initUndercover(playerNames, undercoverCount, whiteCount) {
  const res = db.exec("SELECT word1, word2 FROM undercover ORDER BY RANDOM() LIMIT 1");
  const pair = res[0].values[0];
  const [wordA, wordB] = Math.random() > 0.5 ? pair : [pair[1], pair[0]]

  let roles = []; for (let i = 0; i < undercoverCount; i++) roles.push({ type: 'undercover', word: wordB });
  for (let i = 0; i < whiteCount; i++) roles.push({ type: 'white', word: '???' });
  while (roles.length < playerNames.length) roles.push({ type: 'civil', word: wordA });
  roles.sort(() => Math.random() - 0.5);
  const players = playerNames.map((name, i) => ({ name, role: roles[i].type, word: roles[i].word, eliminated: false, id: i }))
  setState({ view: 'undercover', step: 'distribution', players, currentPlayerIndex: 0, revealPhase: false, civilWord: wordA })
}

function renderUndercover() {
  const view = document.createElement('div'); view.className = 'screen'
  if (state.step === 'setup') {
    view.innerHTML = `<div class="card"><span class="label">Joueurs (${state.players.length})</span><div class="input-group" style="display:flex; gap:0.5rem;"><input type="text" id="new-player-name" placeholder="Nom..." style="flex:1;"><button class="button" id="add-player" style="padding:0 1rem;">+</button></div><div class="player-list" style="max-height: 200px; overflow-y: auto; margin-bottom: 2rem;">${state.players.map((name, i) => `<div class="player-item"><span class="player-name">${name}</span><button class="ghost" onclick="window.removePlayer(${i})" style="color:var(--secondary);">X</button></div>`).join('')}${state.players.length === 0 ? '<p style="text-align:center; opacity:0.3;">3 joueurs min.</p>' : ''}</div><div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1.5rem;"><div><span class="label">Infiltrés</span><input type="number" id="uc-under" value="${Math.max(1, Math.floor(state.players.length / 4))}" min="1" style="width:100%; padding:0.8rem; border-radius:12px; background:rgba(0,0,0,0.2); color:white;"></div><div><span class="label">M. White</span><input type="number" id="uc-white" value="0" min="0" style="width:100%; padding:0.8rem; border-radius:12px; background:rgba(0,0,0,0.2); color:white;"></div></div><button class="button" id="uc-start" style="width: 100%" ${state.players.length < 3 ? 'disabled style="opacity:0.3;"' : ''}>LANCER</button></div><button class="button ghost" id="hu-back-btn">RETOUR</button>`
    window.removePlayer = (index) => { const n = [...state.players]; n.splice(index, 1); setState({ players: n }) }
    const input = document.querySelector('#new-player-name');
    const add = () => { const n = input.value.trim(); if (n) setState({ players: [...state.players, n] }) }
    document.querySelector('#add-player').onclick = add; input.onkeypress = (e) => { if (e.key === 'Enter') add() }
    document.querySelector('#uc-start').onclick = () => initUndercover(state.players, parseInt(document.querySelector('#uc-under').value), parseInt(document.querySelector('#uc-white').value))
    document.querySelector('#hu-back-btn').onclick = () => setState({ view: 'home' })
  } else if (state.step === 'distribution') {
    const player = state.players[state.currentPlayerIndex]
    view.innerHTML = `<div class="card" style="text-align:center;"><span class="label">SECRET</span><div class="question-text">Passe à...</div><h2 class="app-title">${player.name}</h2>${state.revealPhase ? `<div class="answer-preview" style="font-size: 2.5rem; color: white;">${player.word}</div><button class="button" id="uc-next" style="width:100%">OK</button>` : `<button class="button secondary" id="uc-reveal" style="width:100%; height:80px;">VOIR MON MOT</button>`}</div>`
    if (document.querySelector('#uc-reveal')) document.querySelector('#uc-reveal').onclick = () => setState({ revealPhase: true })
    if (document.querySelector('#uc-next')) document.querySelector('#uc-next').onclick = () => { if (state.currentPlayerIndex < state.players.length - 1) setState({ currentPlayerIndex: state.currentPlayerIndex + 1, revealPhase: false }); else setState({ step: 'gameplay' }) }
  } else if (state.step === 'gameplay') {
    const alive = state.players.filter(p => !p.eliminated)
    view.innerHTML = `<div class="title-container"><h2 class="app-title">Décrivez !</h2></div><div class="card"><div class="player-list">${alive.map(p => `<div class="player-item"><span>${p.name}</span></div>`).join('')}</div><button class="button secondary" id="uc-goto-vote" style="width:100%; margin-top:1.5rem;">VOTE 🗳️</button></div>`
    document.querySelector('#uc-goto-vote').onclick = () => setState({ step: 'vote' })
  } else if (state.step === 'vote') {
    const alive = state.players.filter(p => !p.eliminated)
    view.innerHTML = `<div class="title-container"><h2 class="app-title">Élimination</h2></div><div class="voting-grid">${alive.map(p => `<button class="button vote-btn uc-eliminate" data-id="${p.id}"><span>${p.name}</span></button>`).join('')}</div><button class="button ghost" id="uc-cancel-vote" style="margin-top:2rem;">RETOUR</button>`
    document.querySelectorAll('.uc-eliminate').forEach(btn => { btn.onclick = () => eliminatePlayer(parseInt(btn.dataset.id)) })
    document.querySelector('#uc-cancel-vote').onclick = () => setState({ step: 'gameplay' })
  }
}

function eliminatePlayer(id) {
  const p = state.players.find(x => x.id === id); p.eliminated = true
  if (p.role === 'white') {
    const g = prompt(`Mot des civils ?`); if (g && g.toLowerCase() === state.civilWord.toLowerCase()) { alert("VICTOIRE MR WHITE !"); setState({ view: 'home' }); return; }
  } else alert(`${p.name} était ${p.role.toUpperCase()} !`)
  checkUndercoverWin()
}

function checkUndercoverWin() {
  const a = state.players.filter(p => !p.eliminated); const c = a.filter(p => p.role === 'civil'); const i = a.filter(p => p.role !== 'civil')
  if (i.length === 0) { alert("VICTOIRE CIVILS !"); setState({ view: 'home' }); }
  else if (c.length <= 1) { alert("VICTOIRE INFILTRÉS !"); setState({ view: 'home' }); }
  else setState({ step: 'gameplay' });
}

initDatabase();
